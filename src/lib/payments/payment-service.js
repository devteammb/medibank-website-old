import crypto from "crypto";

import { assertValidTransition } from "@/lib/payments/payment-state-machine";
import { getPaymentRepository } from "@/lib/payments/payment-repository";
import { getIciciConfig } from "@/lib/payments/icici/config";
import { IciciApiError, IciciClient } from "@/lib/payments/icici/client";
import {
  buildInboundHashFieldsFromPayload,
  buildInitiateHashFields,
  buildStatusRequestHashFields,
  HmacSha256HashAdapter,
} from "@/lib/payments/icici/hash";
import {
  buildRedirectUrl,
  mapStatusToState,
  sanitizeForLogs,
} from "@/lib/payments/icici/mapper";
import {
  normalizeKeyValues,
  validateInitiatePaymentInput,
} from "@/lib/payments/icici/types";

export class PaymentService {
  constructor() {
    this.repository = getPaymentRepository();
    this.config = getIciciConfig();
    this.client = new IciciClient();
    this.hashAdapter = new HmacSha256HashAdapter(this.config.merchantKey);
  }

  async initiatePayment(input) {
    let trusted;

    try {
      trusted = validateInitiatePaymentInput(input);
    } catch (error) {
      throw new InitiatePaymentError("InitiateSale validation failed", {
        reasonCode: "INPUT_VALIDATION_FAILED",
        reasons: [
          error instanceof Error
            ? error.message
            : "Invalid initiate payment input",
        ],
      });
    }

    const merchantTxnNo = generateMerchantTxnNo(trusted.orderId);

    const attempt = await this.repository.createAttempt({
      id: crypto.randomUUID(),
      orderId: trusted.orderId,
      registrationId: trusted.registrationId,
      planId: trusted.planId,
      merchantTxnNo,
      amountPaise: trusted.amountPaise,
      customerName: trusted.customerName,
      customerEmail: trusted.customerEmail,
      customerMobile: trusted.customerMobile,
      metadata: trusted.metadata,
      state: "CREATED",
    });

    await this.transition(attempt, "INITIATED", "attempt.initiated", trusted);

    const amount = formatPaise(trusted.amountPaise);
    const txnDate = formatTxnDateForIcici(new Date());

    const reqBody = {
      merchantId: this.config.merchantId,
      aggregatorID: this.config.aggregatorId,
      merchantTxnNo,
      amount,
      currencyCode: "356",
      payType: "0",
      customerEmailID: trusted.customerEmail,
      transactionType: "SALE",
      returnURL: this.config.returnUrl,
      paymentAdviceURL: this.config.paymentAdviceUrl,
      txnDate,
      customerMobileNo: trusted.customerMobile,
      customerName: trusted.customerName,
      addlParam1: trusted.registrationId,
      addlParam2: trusted.planId,
      secureHash: this.hashAdapter.sign(
        buildInitiateHashFields({
          addlParam1: trusted.registrationId,
          addlParam2: trusted.planId,
          aggregatorID: this.config.aggregatorId,
          amount,
          currencyCode: "356",
          customerEmailID: trusted.customerEmail,
          customerMobileNo: trusted.customerMobile,
          customerName: trusted.customerName,
          merchantId: this.config.merchantId,
          merchantTxnNo,
          payType: "0",
          returnURL: this.config.returnUrl,
          transactionType: "SALE",
          txnDate,
        })
      ),
    };

    let response;

    try {
      response = await this.client.initiateSale(reqBody);
    } catch (error) {
      if (error instanceof IciciApiError) {
        const reasons = extractGatewayFailureReasons(error.details?.raw);
        reasons.push(error.message);

        throw new InitiatePaymentError("InitiateSale request to ICICI failed", {
          reasonCode: "GATEWAY_REQUEST_FAILED",
          reasons: uniqueStrings(reasons),
          gateway: sanitizeForLogs(error.details?.raw),
          httpStatus: error.details?.httpStatus,
        });
      }

      throw error;
    }

    await this.repository.appendAuditLog(
      merchantTxnNo,
      "gateway.initiate.response",
      sanitizeForLogs(response)
    );

    if (!shouldRedirectToGateway(response)) {
      await this.repository.updateAttempt(merchantTxnNo, {
        state: "FAILED",
        gatewayResponseCode: response.responseCode,
        gatewayResponseMessage: response.responseMessage,
        rawInitiateRequest: sanitizeForLogs(reqBody),
        rawInitiateResponse: sanitizeForLogs(response),
      });

      throw new InitiatePaymentError("InitiateSale rejected by gateway", {
        reasonCode: "GATEWAY_REJECTED",
        reasons: uniqueStrings(extractGatewayFailureReasons(response)),
        gateway: sanitizeForLogs(response),
      });
    }

    if (!response.redirectURI || !response.tranCtx) {
      throw new InitiatePaymentError(
        "InitiateSale response missing redirect details",
        {
          reasonCode: "INCOMPLETE_GATEWAY_RESPONSE",
          reasons: ["ICICI response did not include redirectURI or tranCtx"],
          gateway: sanitizeForLogs(response),
        }
      );
    }

    const redirectUrl = buildRedirectUrl({
      redirectURI: response.redirectURI,
      tranCtx: response.tranCtx,
    });

    const updated = await this.repository.updateAttempt(merchantTxnNo, {
      state: "REDIRECTED",
      redirectUrl,
      rawInitiateRequest: sanitizeForLogs(reqBody),
      rawInitiateResponse: sanitizeForLogs(response),
      gatewayResponseCode: response.responseCode,
      gatewayResponseMessage: response.responseMessage,
    });

    return {
      merchantTxnNo: updated.merchantTxnNo,
      redirectUrl,
      state: updated.state,
    };
  }

  async processCallback(rawPayload) {
  const payload = normalizeKeyValues(rawPayload);

  const attempt = await this.requireAttempt(payload.merchantTxnNo);

  const nextState = mapStatusToState({
    responseCode: payload.responseCode,
    status: payload.status,
    responseMessage: payload.responseMessage,
  });

  return this.transition(
    attempt,
    nextState,
    "callback.received",
    sanitizeForLogs(payload),
    {
      rawCallbackPayload: sanitizeForLogs(rawPayload),
      gatewayTxnRef: payload.bankTxnNo || payload.txnID || payload.txnAuthID,
      gatewayResponseCode: payload.responseCode,
      gatewayResponseMessage:
        payload.responseMessage || payload.respDescription,
    }
  );
}

async processAdvice(rawPayload) {
  const payload = normalizeKeyValues(rawPayload);

  const attempt = await this.requireAttempt(payload.merchantTxnNo);

  const nextState = mapStatusToState({
    responseCode: payload.responseCode,
    status: payload.status,
    responseMessage: payload.responseMessage,
  });

  return this.transition(
    attempt,
    nextState,
    "advice.received",
    sanitizeForLogs(payload),
    {
      rawAdvicePayload: sanitizeForLogs(rawPayload),
      gatewayTxnRef: payload.bankTxnNo || payload.txnID || payload.txnAuthID,
      gatewayResponseCode: payload.responseCode,
      gatewayResponseMessage:
        payload.responseMessage || payload.respDescription,
    }
  );
}

  async processAdvice(rawPayload) {
    verifyInboundHash(this.hashAdapter, rawPayload);

    const payload = normalizeKeyValues(rawPayload);
    const attempt = await this.requireAttempt(payload.merchantTxnNo);

    const nextState = mapStatusToState({
      responseCode: payload.responseCode,
      status: payload.status,
      responseMessage: payload.responseMessage,
    });

    return this.transition(
      attempt,
      nextState,
      "advice.received",
      sanitizeForLogs(payload),
      {
        rawAdvicePayload: sanitizeForLogs(rawPayload),
        gatewayTxnRef: payload.bankTxnNo || payload.txnID || payload.txnAuthID,
        gatewayResponseCode: payload.responseCode,
        gatewayResponseMessage:
          payload.responseMessage || payload.respDescription,
      }
    );
  }

  async reconcilePending(limit = 50) {
    const pending = await this.repository.findPendingForReconciliation(limit);
    const results = [];

    for (const item of pending) {
      await this.transition(item, "RECONCILING", "reconcile.started", {});

      const statusRequest = {
        merchantId: this.config.merchantId,
        aggregatorID: this.config.aggregatorId,
        merchantTxnNo: item.merchantTxnNo,
        originalTxnNo: item.merchantTxnNo,
        transactionType: "STATUS",
      };

      const secureHash = this.hashAdapter.sign(
        buildStatusRequestHashFields(statusRequest)
      );

      const status = await this.client.transactionStatus({
        ...statusRequest,
        secureHash,
      });

      const nextState = mapStatusToState(status);

      const updated = await this.transition(
        item,
        nextState,
        "reconcile.updated",
        sanitizeForLogs(status),
        {
          reconciledAt: new Date().toISOString(),
          gatewayTxnRef: status.bankTxnNo || status.txnID || status.txnAuthID,
          gatewayResponseCode:
            status.responseCode || status.txnResponseCode,
          gatewayResponseMessage:
            status.responseMessage ||
            status.respDescription ||
            status.txnRespDescription,
        }
      );

      results.push({
        merchantTxnNo: updated.merchantTxnNo,
        state: updated.state,
      });
    }

    return results;
  }

  async getStatus(merchantTxnNo) {
    return this.repository.findByMerchantTxnNo(merchantTxnNo);
  }

  async requireAttempt(merchantTxnNo) {
    const attempt = await this.repository.findByMerchantTxnNo(merchantTxnNo);
    if (!attempt) throw new Error(`Unknown merchantTxnNo: ${merchantTxnNo}`);
    return attempt;
  }

  async transition(current, nextState, event, eventPayload, update = {}) {
    assertValidTransition(current.state, nextState);

    const updated = await this.repository.updateAttempt(current.merchantTxnNo, {
      ...update,
      state: nextState,
    });

    await this.repository.appendAuditLog(
      current.merchantTxnNo,
      event,
      eventPayload
    );

    return updated;
  }
}

export class InitiatePaymentError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "InitiatePaymentError";
    this.details = details;
  }
}

export function generateMerchantTxnNo(orderId) {
  const prefix =
    String(orderId || "ORD")
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 10)
      .toUpperCase() || "ORD";

  const random = crypto.randomBytes(6).toString("hex").toUpperCase();

  return `${prefix}${Date.now().toString().slice(-8)}${random}`.slice(0, 30);
}

function formatTxnDateForIcici(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date).reduce((acc, part) => {
    if (part.type !== "literal") acc[part.type] = part.value;
    return acc;
  }, {});

  return `${parts.year}${parts.month}${parts.day}${parts.hour}${parts.minute}${parts.second}`;
}

function formatPaise(amountPaise) {
  return (amountPaise / 100).toFixed(2);
}

function verifyInboundHash(hashAdapter, rawPayload) {
  const secureHash = rawPayload.secureHash || rawPayload.SecureHash || "";
  const orderedFieldValues = buildInboundHashFieldsFromPayload(rawPayload);
  const isValid = hashAdapter.verify(orderedFieldValues, secureHash);

  if (!isValid) {
    throw new Error("Inbound secure hash mismatch");
  }
}

function extractGatewayFailureReasons(payload) {
  if (!payload || typeof payload !== "object") {
    return ["No structured response received from ICICI gateway"];
  }

  const reasons = [];
  const possibleKeys = [
    "responseMessage",
    "responseCode",
    "status",
    "error",
    "errorMessage",
    "errorDescription",
    "message",
    "reason",
    "reasonCode",
    "reasonMessage",
  ];

  for (const key of possibleKeys) {
    const value = payload[key];
    if (value != null && String(value).trim()) {
      reasons.push(`${key}: ${String(value).trim()}`);
    }
  }

  if (Array.isArray(payload.errors)) {
    for (const item of payload.errors) {
      if (typeof item === "string" && item.trim()) {
        reasons.push(item.trim());
      } else if (item && typeof item === "object") {
        reasons.push(JSON.stringify(item));
      }
    }
  }

  return reasons.length
    ? reasons
    : ["ICICI gateway did not provide an explicit failure reason"];
}

function uniqueStrings(values) {
  return [
    ...new Set(
      (values || []).filter(
        (item) => typeof item === "string" && item.trim()
      )
    ),
  ];
}

function shouldRedirectToGateway(response) {
  const responseCode = String(response?.responseCode || "")
    .trim()
    .toUpperCase();

  const showOTPCapturePage = String(response?.showOTPCapturePage || "")
    .trim()
    .toUpperCase();

  const isKnownSuccessCode = ["0", "00", "000", "0000", "SUCCESS"].includes(
    responseCode
  );

  const hasRedirectContext = Boolean(response?.redirectURI && response?.tranCtx);

  if (showOTPCapturePage === "N" && hasRedirectContext) return true;
  if (hasRedirectContext && responseCode === "R1000") return true;
  if (hasRedirectContext && isKnownSuccessCode) return true;

  return false;
}