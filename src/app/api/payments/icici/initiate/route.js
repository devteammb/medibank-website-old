import { NextResponse } from "next/server";

import { InitiatePaymentError, PaymentService } from "@/lib/payments/payment-service";
import { getRegistrationDraft, saveRegistrationDraft } from "@/lib/server/tempRegistrationStore";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const input = {
      registrationId: String(body.registrationId || "").trim(),
      planId: String(body.planId || "").trim(),
      amountPaise: Number(body.amountPaise),
      customerName: String(body.customerName || "").trim(),
      customerEmail: String(body.customerEmail || "").trim(),
      customerMobile: String(body.customerMobile || "").replace(/\D/g, "").slice(-10),
    };

    const draft = await getRegistrationDraft(input.registrationId);
    if (!draft) {
      return NextResponse.json({ success: false, message: "Registration draft missing or expired." }, { status: 404 });
    }

    await saveRegistrationDraft(input.registrationId, {
      ...draft,
      selectedPlanId: input.planId,
      selectedPlanAmountPaise: input.amountPaise,
      flowStatus: "PLAN_SELECTED",
    });

    const service = new PaymentService();
    const result = await service.initiatePayment({
      orderId: `REG-${input.registrationId}-${input.planId}`,
      registrationId: input.registrationId,
      planId: input.planId,
      amountPaise: input.amountPaise,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerMobile: input.customerMobile,
      metadata: { source: "registration_checkout" },
    });

    await saveRegistrationDraft(input.registrationId, {
      ...draft,
      selectedPlanId: input.planId,
      selectedPlanAmountPaise: input.amountPaise,
      merchantTxnNo: result.merchantTxnNo,
      flowStatus: "PAYMENT_INITIATED",
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof InitiatePaymentError) {
      const reasonCode = error.details?.reasonCode || "INITIATE_FAILED";
      const reasons = Array.isArray(error.details?.reasons) ? error.details.reasons : [error.message];
      const status = reasonCode === "INPUT_VALIDATION_FAILED" ? 400 : 502;
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          error: {
            code: reasonCode,
            reasons,
            gateway: error.details?.gateway,
          },
        },
        { status },
      );
    }

    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "initiate failed" }, { status: 400 });
  }
}
