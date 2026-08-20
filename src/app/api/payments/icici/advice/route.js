import { NextResponse } from "next/server";

import { getIciciConfig } from "@/lib/payments/icici/config";
import {
  buildInboundHashFieldsFromPayload,
  HmacSha256HashAdapter,
} from "@/lib/payments/icici/hash";
import { PaymentService } from "@/lib/payments/payment-service";

export const runtime = "nodejs";

export async function POST(request) {
  const service = new PaymentService();
  const config = getIciciConfig();

  try {
    const rawPayload = await parseInboundPayload(request);

    verifyInboundSecureHash(rawPayload, config.merchantKey);

    const result = await service.processAdvice(rawPayload);

    return NextResponse.json({
      success: true,
      merchantTxnNo: result.merchantTxnNo,
      paymentState: result.state,
      paymentStatus: result.state === "SUCCESS" ? "success" : "failed",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "advice failed",
      },
      { status: 400 }
    );
  }
}

function verifyInboundSecureHash(rawPayload, merchantKey) {
  const secureHash = rawPayload.secureHash || rawPayload.SecureHash || "";
  const hashAdapter = new HmacSha256HashAdapter(merchantKey);

  const orderedFieldValues = buildInboundHashFieldsFromPayload(rawPayload);
  const isValid = hashAdapter.verify(orderedFieldValues, secureHash);

  if (!isValid) {
    throw new Error("Inbound secure hash mismatch");
  }
}

async function parseInboundPayload(request) {
  const ct = request.headers.get("content-type") || "";

  if (ct.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    return Object.fromEntries(
      Array.from(form.entries()).map(([k, v]) => [k, String(v)])
    );
  }

  if (ct.includes("application/json")) {
    const json = await request.json();
    return Object.fromEntries(
      Object.entries(json).map(([k, v]) => [k, String(v)])
    );
  }

  const raw = await request.text();

  if (!raw.trim()) return {};

  try {
    const json = JSON.parse(raw);
    if (json && typeof json === "object") {
      return Object.fromEntries(
        Object.entries(json).map(([k, v]) => [k, String(v)])
      );
    }
  } catch (_error) {
    // fallback to parsing urlencoded payload
  }

  return Object.fromEntries(new URLSearchParams(raw).entries());
}