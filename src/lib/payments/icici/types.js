export const PaymentStates = ["CREATED", "INITIATED", "REDIRECTED", "PENDING", "SUCCESS", "FAILED", "CANCELLED", "RECONCILING"];

export function assertPaymentState(state) {
  if (!PaymentStates.includes(state)) throw new Error(`Invalid payment state: ${state}`);
}

export function validateInitiatePaymentInput(input) {
  if (!input || typeof input !== "object") throw new Error("Invalid initiate input");
  const required = ["orderId", "registrationId", "planId", "customerName", "customerEmail", "customerMobile"];
  for (const key of required) if (!String(input[key] || "").trim()) throw new Error(`Missing ${key}`);
  if (!Number.isInteger(input.amountPaise) || input.amountPaise <= 0) throw new Error("Invalid amountPaise");
  if (!/^[6-9]\d{9}$/.test(String(input.customerMobile))) throw new Error("Invalid mobile");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(input.customerEmail))) throw new Error("Invalid email");
  return {
    ...input,
    metadata: input.metadata && typeof input.metadata === "object" ? input.metadata : {},
  };
}

export function validateIciciInitiateRequest(input) {
  const required = [
    "merchantId",
    "aggregatorID",
    "merchantTxnNo",
    "amount",
    "currencyCode",
    "payType",
    "customerEmailID",
    "transactionType",
    "returnURL",
    "txnDate",
    "customerMobileNo",
    "customerName",
    "secureHash",
  ];
  for (const key of required) if (!String(input?.[key] || "").trim()) throw new Error(`initiate request missing ${key}`);
  return input;
}

export function normalizeKeyValues(input) {
  if (!input || typeof input !== "object") return {};
  const normalized = Object.fromEntries(Object.entries(input).map(([k, v]) => [k, v == null ? "" : String(v)]));

  const aliases = {
    SecureHash: "secureHash",
    MerchantTxnNo: "merchantTxnNo",
    TxnId: "txnID",
    paymentDateTiime: "paymentDateTime",
    RespDescription: "respDescription",
    txnRespDescription: "responseMessage",
    txnResponseCode: "responseCode",
    txnStatus: "status",
    txnAuthID: "bankTxnNo",
  };

  for (const [from, to] of Object.entries(aliases)) {
    if (!normalized[to] && normalized[from]) normalized[to] = normalized[from];
  }

  if (!normalized.merchantTxnNo && normalized.merchanttxNo) normalized.merchantTxnNo = normalized.merchanttxNo;
  if (!normalized.responseMessage && normalized.respDescription) normalized.responseMessage = normalized.respDescription;
  if (!normalized.bankTxnNo && normalized.txnID) normalized.bankTxnNo = normalized.txnID;

  return normalized;
}
