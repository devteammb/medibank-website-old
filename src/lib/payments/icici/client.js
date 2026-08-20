import { getIciciConfig } from "./config";
import { validateIciciInitiateRequest } from "./types";

export class IciciApiError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "IciciApiError";
    this.details = details;
  }
}

export class IciciClient {
  constructor() {
    this.config = getIciciConfig();
  }

  async initiateSale(input) {
    const payload = validateIciciInitiateRequest(input);
    return this.postJson(this.config.initiateSalePath, payload);
  }

  async transactionStatus(input) {
    if (!input?.merchantId || !input?.aggregatorID || !input?.merchantTxnNo || !input?.originalTxnNo || !input?.transactionType || !input?.secureHash) {
      throw new Error("Invalid transaction status request");
    }
    return this.postJson(this.config.transactionStatusPath, input);
  }

  async postJson(path, body) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.requestTimeoutMs);
    try {
      const response = await fetch(new URL(path, this.config.baseUrl), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const raw = await response.json().catch(() => {
        throw new IciciApiError(`ICICI API non-JSON response: ${response.status}`, {
          type: "non_json_response",
          httpStatus: response.status,
          path,
        });
      });
      if (!response.ok) {
        throw new IciciApiError(`ICICI API error ${response.status}`, {
          type: "http_error",
          httpStatus: response.status,
          path,
          raw,
        });
      }
      return raw;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new IciciApiError(`ICICI API timeout after ${this.config.requestTimeoutMs}ms`, {
          type: "timeout",
          timeoutMs: this.config.requestTimeoutMs,
          path,
        });
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}
