import { NextResponse } from "next/server";

import { PaymentService } from "@/lib/payments/payment-service";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const service = new PaymentService();
  const attempt = await service.getStatus(params.merchantTxnNo);

  if (!attempt) {
    return NextResponse.json({ success: false, message: "Payment not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: {
      merchantTxnNo: attempt.merchantTxnNo,
      state: attempt.state,
      amountPaise: attempt.amountPaise,
      updatedAt: attempt.updatedAt,
      responseCode: attempt.gatewayResponseCode,
      responseMessage: attempt.gatewayResponseMessage,
    },
  });
}
