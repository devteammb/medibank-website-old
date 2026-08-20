import { getRedisUrl, sendRedisCommand } from "@/lib/server/redisClient";

const inMemoryStore = new Map();

const DEFAULT_TTL_SECONDS = Number(process.env.REGISTRATION_DRAFT_TTL_SECONDS || 60 * 60 * 6);
const MEMORY_FALLBACK_ENABLED = process.env.REGISTRATION_DRAFT_ALLOW_MEMORY_FALLBACK === "true" || process.env.NODE_ENV !== "production";

function buildDraftKey(registrationId) {
  return `registration:draft:${registrationId}`;
}

function isRedisConfigured() {
  return Boolean(getRedisUrl());
}

function resolveStorageBackend() {
  if (isRedisConfigured()) return "redis";
  if (MEMORY_FALLBACK_ENABLED) return "memory";
  throw new Error(
    "Redis draft storage is not configured. Set REDIS_URL to a rediss:// connection string (or enable REGISTRATION_DRAFT_ALLOW_MEMORY_FALLBACK=true).",
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

export async function saveRegistrationDraft(registrationId, data, ttlSeconds = DEFAULT_TTL_SECONDS, options = {}) {
  const { requireRedis = false } = options;
  const payload = {
    ...data,
    registrationId,
    updatedAt: new Date().toISOString(),
  };

  const key = buildDraftKey(registrationId);
  const storageBackend = resolveStorageBackend();

  if (requireRedis && storageBackend !== "redis") {
    throw new Error("Registration draft storage must use Redis. Please configure REDIS_URL (rediss://...) and try again.");
  }

  if (storageBackend === "redis") {
    try {
      const result = await sendRedisCommand(["SET", key, JSON.stringify(payload), "EX", String(ttlSeconds)]);
      if (result !== "OK") throw new Error("Redis SET failed.");
      return payload;
    } catch (error) {
      if (requireRedis || !MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
      console.warn("Redis unavailable while saving registration draft, using in-memory fallback.", error);
    }
  }

  inMemoryStore.set(key, { value: payload, expiresAt: Date.now() + ttlSeconds * 1000 });
  return payload;
}

export async function getRegistrationDraft(registrationId) {
  const key = buildDraftKey(registrationId);

  if (resolveStorageBackend() === "redis") {
    try {
      const raw = await sendRedisCommand(["GET", key]);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (error) {
      if (!MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
      console.warn("Redis unavailable while reading registration draft, using in-memory fallback.", error);
    }
  }

  const stored = inMemoryStore.get(key);
  if (!stored) return null;
  if (stored.expiresAt < Date.now()) {
    inMemoryStore.delete(key);
    return null;
  }
  return stored.value;
}

export async function deleteRegistrationDraft(registrationId) {
  const key = buildDraftKey(registrationId);

  if (resolveStorageBackend() === "redis") {
    try {
      await sendRedisCommand(["DEL", key]);
      return true;
    } catch (error) {
      if (!MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
      console.warn("Redis unavailable while deleting registration draft, using in-memory fallback.", error);
    }
  }

  return inMemoryStore.delete(key);
}

export function getRegistrationDraftStorageBackend() {
  return resolveStorageBackend();
}
