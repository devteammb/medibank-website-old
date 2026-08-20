import crypto from "crypto";
import { sendRedisCommand } from "@/lib/server/redisClient";

const OTP_TTL_SECONDS = Number(process.env.OTP_EXPIRY_SECONDS || 300);
const OTP_MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS || 5);
const memoryStore = new Map();

function createOtp() {
  const value = crypto.randomInt(0, 1000000);
  return String(value).padStart(6, "0");
}

function scopeKey(scope, target) {
  return `otp:${scope}:${target}`;
}

function attemptsKey(scope, target) {
  return `otp_attempts:${scope}:${target}`;
}

function saveInMemory(key, otp) {
  memoryStore.set(key, { otp, expiresAt: Date.now() + OTP_TTL_SECONDS * 1000 });
}

function loadInMemory(key) {
  const record = memoryStore.get(key);
  if (!record) return null;
  if (record.expiresAt < Date.now()) {
    memoryStore.delete(key);
    return null;
  }
  return record.otp;
}

function deleteInMemory(key) {
  memoryStore.delete(key);
}

export async function issueOtp(scope, target) {
  const otp = createOtp();
  const key = scopeKey(scope, target);

  try {
    const result = await sendRedisCommand(["SET", key, otp, "EX", String(OTP_TTL_SECONDS)]);
    await sendRedisCommand(["DEL", attemptsKey(scope, target)]);
    if (result !== "OK") throw new Error("Redis SET failed");
  } catch (_error) {
    saveInMemory(key, otp);
  }

  return { otp, ttlSeconds: OTP_TTL_SECONDS };
}

export async function verifyOtp(scope, target, otp) {
  const key = scopeKey(scope, target);
  const attemptKey = attemptsKey(scope, target);
  const normalizedOtp = String(otp || "").trim();

  let savedOtp = null;
  let attempts = 0;
  try {
    savedOtp = await sendRedisCommand(["GET", key]);
    attempts = Number((await sendRedisCommand(["GET", attemptKey])) || 0);
  } catch (_error) {
    savedOtp = loadInMemory(key);
    attempts = Number(memoryStore.get(attemptKey) || 0);
  }

  if (!savedOtp) return { isValid: false, reason: "expired" };
  if (attempts >= OTP_MAX_ATTEMPTS) return { isValid: false, reason: "max_attempts" };

  const isValid = savedOtp === normalizedOtp;

  if (isValid) {
    try {
      await sendRedisCommand(["DEL", key]);
      await sendRedisCommand(["DEL", attemptKey]);
    } catch (_error) {
      deleteInMemory(key);
      deleteInMemory(attemptKey);
    }
    return { isValid: true, reason: "verified" };
  }

  try {
    const next = await sendRedisCommand(["INCR", attemptKey]);
    if (Number(next) === 1) await sendRedisCommand(["EXPIRE", attemptKey, String(OTP_TTL_SECONDS)]);
  } catch (_error) {
    const next = Number(memoryStore.get(attemptKey) || 0) + 1;
    memoryStore.set(attemptKey, next);
  }

  return { isValid: false, reason: "invalid" };
}
