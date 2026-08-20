import crypto from "crypto";

import { getRedisUrl, sendRedisCommand } from "@/lib/server/redisClient";

const attempts = new Map();
const audits = new Map();

const DEFAULT_TTL_SECONDS = Number(process.env.PAYMENT_ATTEMPT_TTL_SECONDS || 60 * 60 * 24);
const MEMORY_FALLBACK_ENABLED = process.env.PAYMENT_ATTEMPT_ALLOW_MEMORY_FALLBACK === "true" || process.env.NODE_ENV !== "production";
const PENDING_STATES = ["PENDING", "REDIRECTED", "RECONCILING", "INITIATED"];

function buildAttemptKey(merchantTxnNo) {
  return `payment:attempt:${merchantTxnNo}`;
}

function buildAuditKey(merchantTxnNo) {
  return `payment:audit:${merchantTxnNo}`;
}

function buildPendingSetKey() {
  return "payment:pending";
}

function isRedisConfigured() {
  return Boolean(getRedisUrl());
}

function resolveStorageBackend() {
  if (isRedisConfigured()) return "redis";
  if (MEMORY_FALLBACK_ENABLED) return "memory";
  throw new Error(
    "Payment storage is not configured. Set REDIS_URL (recommended) or PAYMENT_ATTEMPT_ALLOW_MEMORY_FALLBACK=true.",
  );
}

function shouldFallbackToMemory(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("fetch failed") ||
    message.includes("network") ||
    message.includes("econn") ||
    message.includes("enotfound") ||
    message.includes("timed out") ||
    message.includes("socket") ||
    message.includes("tls")
  );
}

function safeParseJson(raw, fallback = null) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeAttemptToRedis(attempt, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const key = buildAttemptKey(attempt.merchantTxnNo);
  const pendingSetKey = buildPendingSetKey();
  const setResult = await sendRedisCommand(["SET", key, JSON.stringify(attempt), "EX", String(ttlSeconds)]);
  if (setResult !== "OK") throw new Error("Redis SET failed for payment attempt.");

  if (PENDING_STATES.includes(attempt.state)) {
    await sendRedisCommand(["SADD", pendingSetKey, attempt.merchantTxnNo]);
  } else {
    await sendRedisCommand(["SREM", pendingSetKey, attempt.merchantTxnNo]);
  }
}

export class InMemoryPaymentRepository {
  async createAttempt(input) {
    const now = new Date().toISOString();
    const attempt = { ...input, createdAt: now, updatedAt: now, id: input.id || crypto.randomUUID() };

    const storageBackend = resolveStorageBackend();

    if (storageBackend === "redis") {
      try {
        await writeAttemptToRedis(attempt);
        return attempt;
      } catch (error) {
        if (!MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
        console.warn("Redis unavailable while creating payment attempt, using in-memory fallback.", error);
      }
    }

    attempts.set(attempt.merchantTxnNo, attempt);
    return attempt;
  }

  async findByMerchantTxnNo(merchantTxnNo) {
    const storageBackend = resolveStorageBackend();

    if (storageBackend === "redis") {
      try {
        const raw = await sendRedisCommand(["GET", buildAttemptKey(merchantTxnNo)]);
        return safeParseJson(raw, null);
      } catch (error) {
        if (!MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
        console.warn("Redis unavailable while reading payment attempt, using in-memory fallback.", error);
      }
    }

    return attempts.get(merchantTxnNo) || null;
  }

  async updateAttempt(merchantTxnNo, update) {
    const current = await this.findByMerchantTxnNo(merchantTxnNo);
    if (!current) throw new Error(`Attempt not found for ${merchantTxnNo}`);

    const next = { ...current, ...update, merchantTxnNo, updatedAt: new Date().toISOString() };
    const storageBackend = resolveStorageBackend();

    if (storageBackend === "redis") {
      try {
        await writeAttemptToRedis(next);
        return next;
      } catch (error) {
        if (!MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
        console.warn("Redis unavailable while updating payment attempt, using in-memory fallback.", error);
      }
    }

    attempts.set(merchantTxnNo, next);
    return next;
  }

  async appendAuditLog(merchantTxnNo, event, payload) {
    const row = { at: new Date().toISOString(), event, payload };
    const storageBackend = resolveStorageBackend();

    if (storageBackend === "redis") {
      try {
        const key = buildAuditKey(merchantTxnNo);
        await sendRedisCommand(["RPUSH", key, JSON.stringify(row)]);
        await sendRedisCommand(["LTRIM", key, "-200", "-1"]);
        await sendRedisCommand(["EXPIRE", key, String(DEFAULT_TTL_SECONDS)]);
        return;
      } catch (error) {
        if (!MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
        console.warn("Redis unavailable while appending payment audit log, using in-memory fallback.", error);
      }
    }

    const current = audits.get(merchantTxnNo) || [];
    current.push(row);
    audits.set(merchantTxnNo, current.slice(-200));
  }

  async findPendingForReconciliation(limit) {
    const cappedLimit = Math.max(1, Number(limit) || 25);
    const storageBackend = resolveStorageBackend();

    if (storageBackend === "redis") {
      try {
        const pending = await sendRedisCommand(["SMEMBERS", buildPendingSetKey()]);
        const merchantTxnNos = Array.isArray(pending) ? pending.slice(0, cappedLimit) : [];

        const rows = await Promise.all(merchantTxnNos.map((merchantTxnNo) => this.findByMerchantTxnNo(merchantTxnNo)));
        return rows.filter((row) => row && PENDING_STATES.includes(row.state)).slice(0, cappedLimit);
      } catch (error) {
        if (!MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
        console.warn("Redis unavailable while listing pending attempts, using in-memory fallback.", error);
      }
    }

    return Array.from(attempts.values())
      .filter((a) => PENDING_STATES.includes(a.state))
      .slice(0, cappedLimit);
  }
}

let singleton = null;
export function getPaymentRepository() {
  if (!singleton) singleton = new InMemoryPaymentRepository();
  return singleton;
}
