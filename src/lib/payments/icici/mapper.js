import { mapIciciToInternalState } from "./status";

export function buildRedirectUrl({ redirectURI, tranCtx }) {
  const url = new URL(redirectURI);
  url.searchParams.set("tranCtx", tranCtx);
  return url.toString();
}

export function mapStatusToState(response) {
  return mapIciciToInternalState(
    response.txnStatus || response.status || response.txnResponseCode || response.responseCode || response.txnRespDescription || response.responseMessage,
  );
}

export function sanitizeForLogs(payload) {
  if (!payload || typeof payload !== "object") return payload;
  const clone = { ...payload };
  for (const key of ["secureHash", "merchantKey", "cvv", "cardNumber"]) {
    if (key in clone) clone[key] = "[REDACTED]";
  }
  return clone;
}
