import net from "net";
import tls from "tls";

const DEFAULT_TIMEOUT_MS = Number(process.env.REDIS_COMMAND_TIMEOUT_MS || 7000);

function clean(value) {
  return String(value || "").trim().replace(/\\n/g, "").replace(/\/+$/, "");
}

export function normalizeRedisUrl(rawUrl) {
  const sanitized = clean(rawUrl);
  if (!sanitized) return "";

  if (/^rediss?:\/\//i.test(sanitized)) return sanitized;
  if (/^https?:\/\//i.test(sanitized)) return sanitized.replace(/^https?/i, "rediss");

  return `rediss://${sanitized}`;
}

export function getRedisUrl() {
  const url =
    process.env.REDIS_URL ||
    process.env.REDIS_CLOUD_URL ||
    process.env.REDIS_TLS_URL ||
    process.env.REDIS_CONNECTION_STRING ||
    process.env.REDIS_CLOUD_REST_URL ||
    process.env.REDIS_REST_URL ||
    process.env.REDIS_API_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_PRIVATE_URL ||
    process.env.REDIS_PUBLIC_URL ||
    "";

  return normalizeRedisUrl(url);
}

function parseRedisConnectionUrl(redisUrl) {
  const url = new URL(redisUrl);
  return {
    host: url.hostname,
    port: Number(url.port || (url.protocol === "rediss:" ? 6380 : 6379)),
    tlsEnabled: url.protocol === "rediss:",
    username: decodeURIComponent(url.username || ""),
    password: decodeURIComponent(url.password || ""),
    db: Number((url.pathname || "/0").replace("/", "") || 0),
  };
}

function encodeRespCommand(parts) {
  const body = parts
    .map((part) => {
      const value = String(part);
      return `$${Buffer.byteLength(value)}\r\n${value}\r\n`;
    })
    .join("");

  return `*${parts.length}\r\n${body}`;
}

function parseSimpleLine(payload, offset) {
  const lineEnd = payload.indexOf("\r\n", offset);
  if (lineEnd === -1) return null;
  return {
    line: payload.slice(offset, lineEnd),
    next: lineEnd + 2,
  };
}

function parseResp(payload, offset = 0) {
  if (offset >= payload.length) return null;

  const prefix = payload[offset];
  if (prefix === "+" || prefix === "-" || prefix === ":") {
    const parsed = parseSimpleLine(payload, offset + 1);
    if (!parsed) return null;

    if (prefix === "-") throw new Error(`Redis error: ${parsed.line}`);
    if (prefix === ":") return { value: Number(parsed.line), next: parsed.next };
    return { value: parsed.line, next: parsed.next };
  }

  if (prefix === "$") {
    const header = parseSimpleLine(payload, offset + 1);
    if (!header) return null;

    const size = Number(header.line);
    if (size === -1) return { value: null, next: header.next };

    const end = header.next + size;
    if (payload.length < end + 2) return null;

    return {
      value: payload.slice(header.next, end),
      next: end + 2,
    };
  }

  if (prefix === "*") {
    const header = parseSimpleLine(payload, offset + 1);
    if (!header) return null;

    const count = Number(header.line);
    if (count === -1) return { value: null, next: header.next };

    let cursor = header.next;
    const values = [];
    for (let i = 0; i < count; i += 1) {
      const item = parseResp(payload, cursor);
      if (!item) return null;
      values.push(item.value);
      cursor = item.next;
    }

    return { value: values, next: cursor };
  }

  throw new Error("Unsupported Redis RESP response.");
}

function writeAndRead(socket, parts, timeoutMs = DEFAULT_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    let responseBuffer = "";

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Redis command timed out after ${timeoutMs}ms.`));
      socket.destroy();
    }, timeoutMs);

    const cleanup = () => {
      clearTimeout(timer);
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("close", onClose);
    };

    const onData = (chunk) => {
      responseBuffer += chunk.toString("utf8");
      try {
        const parsed = parseResp(responseBuffer);
        if (!parsed) return;
        cleanup();
        resolve(parsed.value);
      } catch (error) {
        cleanup();
        reject(error);
      }
    };

    const onError = (error) => {
      cleanup();
      reject(error);
    };

    const onClose = () => {
      cleanup();
      if (!responseBuffer) reject(new Error("Redis connection closed before response."));
    };

    socket.on("data", onData);
    socket.on("error", onError);
    socket.on("close", onClose);

    socket.write(encodeRespCommand(parts));
  });
}

export async function sendRedisCommand(parts) {
  const url = getRedisUrl();
  if (!url) return null;

  const conn = parseRedisConnectionUrl(url);

  return new Promise((resolve, reject) => {
    const socket = (conn.tlsEnabled ? tls : net).connect(
      conn.tlsEnabled
        ? {
            host: conn.host,
            port: conn.port,
            servername: conn.host,
            minVersion: "TLSv1.2",
          }
        : {
            host: conn.host,
            port: conn.port,
          },
      async () => {
        try {
          if (conn.password) {
            const auth = conn.username ? ["AUTH", conn.username, conn.password] : ["AUTH", conn.password];
            const authResp = await writeAndRead(socket, auth);
            if (authResp !== "OK") throw new Error("Redis AUTH failed.");
          }

          if (Number.isInteger(conn.db) && conn.db > 0) {
            const selectResp = await writeAndRead(socket, ["SELECT", String(conn.db)]);
            if (selectResp !== "OK") throw new Error(`Redis SELECT ${conn.db} failed.`);
          }

          const response = await writeAndRead(socket, parts);
          socket.end();
          resolve(response);
        } catch (error) {
          socket.destroy();
          reject(error);
        }
      },
    );

    socket.once("error", (error) => reject(error));
  });
}
