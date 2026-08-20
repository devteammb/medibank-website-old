import crypto from "crypto";

export class HmacSha256HashAdapter {
  constructor(secret) {
    this.secret = secret;
  }

  sign(fields) {
    const payload = fields.join("");
    return crypto
      .createHmac("sha256", this.secret)
      .update(payload, "utf8")
      .digest("hex");
  }

  verify(fields, receivedHash) {
    if (!receivedHash) return false;

    const expected = normalizeHashValue(this.sign(fields));
    const received = normalizeHashValue(receivedHash);

    return constantTimeCompare(expected, received);
  }
}

function normalizeHashValue(hash) {
  return String(hash || "").trim().toLowerCase();
}

export function constantTimeCompare(a, b) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");

  if (aBuf.length !== bBuf.length) return false;

  return crypto.timingSafeEqual(aBuf, bBuf);
}

/**
 * INITIATE HASH
 */
export function buildInitiateHashFields(input) {
  return [
    input.addlParam1,
    input.addlParam2,
    input.aggregatorID,
    input.amount,
    input.currencyCode,
    input.customerEmailID,
    input.customerMobileNo,
    input.customerName,
    input.merchantId,
    input.merchantTxnNo,
    input.payType,
    input.returnURL,
    input.transactionType,
    input.txnDate,
  ];
}

/**
 * STATUS HASH
 */
export function buildStatusRequestHashFields(input) {
  return [
    input.aggregatorID,
    input.merchantId,
    input.merchantTxnNo,
    input.originalTxnNo,
    input.transactionType,
  ];
}

/**
 * CALLBACK HASH LOGIC (FINAL CLEAN VERSION)
 */
export function getOrderedCallbackEntries(payload) {
  return Object.entries(payload || {})
    .filter(([key, value]) => {
      if (!key) return false;
      if (key.toLowerCase() === "securehash") return false;
      if (value == null) return false;
      return true;
    })
    .sort(([leftKey], [rightKey]) => compareIciciInboundKeys(leftKey, rightKey))
    .map(([key, value]) => [key, String(value)]);
}

export function buildInboundHashFieldsFromPayload(payload) {
  return getOrderedCallbackEntries(payload).map(([, value]) =>
    String(value)
  );
}

export function buildInboundHashPayloadString(payload) {
  return buildInboundHashFieldsFromPayload(payload).join("");
}

/**
 * KEY SORT RULE
 * 1. Capital letter keys first
 * 2. Then alphabetical
 */
function compareIciciInboundKeys(leftKey, rightKey) {
  const leftStartsWithUppercase = /^[A-Z]/.test(leftKey);
  const rightStartsWithUppercase = /^[A-Z]/.test(rightKey);

  if (leftStartsWithUppercase !== rightStartsWithUppercase) {
    return leftStartsWithUppercase ? -1 : 1;
  }

  return leftKey.localeCompare(rightKey);
}