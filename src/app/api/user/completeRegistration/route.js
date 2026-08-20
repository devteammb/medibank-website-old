import { NextResponse } from "next/server";
import { PaymentService } from "@/lib/payments/payment-service";
import {
  registerPatient,
  toPatientRegisterPayload,
  recordPatientPayment,
  toPatientMidPayload,
  createInlinePasswordSetupSession,
} from "@/lib/server/patientApiService";
import {
  getRegistrationDraft,
  saveRegistrationDraft,
} from "@/lib/server/tempRegistrationStore";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const merchantTxnNo = String(body.merchantTxnNo || "").trim();

    if (!merchantTxnNo) {
      return NextResponse.json(
        { success: false, message: "merchantTxnNo is required" },
        { status: 400 }
      );
    }

    const paymentService = new PaymentService();
    const attempt = await paymentService.getStatus(merchantTxnNo);

    if (!attempt) {
      return NextResponse.json(
        { success: false, message: "Payment attempt not found" },
        { status: 404 }
      );
    }

    if (attempt.state !== "SUCCESS") {
      return NextResponse.json(
        { success: false, message: `Payment state is ${attempt.state}` },
        { status: 400 }
      );
    }

    const draft = await getRegistrationDraft(attempt.registrationId);

    if (!draft) {
      return NextResponse.json(
        { success: false, message: "Registration draft expired or missing" },
        { status: 404 }
      );
    }

    if (draft.flowStatus === "FINALIZED" && draft.midResponse) {
      const passwordSetup = await createInlinePasswordSetupSession({
        patientUuid: draft.patientUuid,
        email: draft.email,
      });

      return NextResponse.json({
        success: true,
        message: "Registration already completed",
        data: draft.midResponse,
        passwordSetup: {
          required: true,
          setupUuid: passwordSetup?.setupUuid,
          expiresIn: passwordSetup?.expiresIn,
        },
      });
    }

    const registerResponse = await registerPatient(
      toPatientRegisterPayload(draft)
    );

    console.log(
      "=== PATIENT REGISTER RESPONSE ===",
      JSON.stringify(registerResponse, null, 2)
    );
    

    const patientUuid =
      registerResponse?.patient?.uuid ||
      registerResponse?.patient?.user_uuid ||
      registerResponse?.patient?.id ||
      registerResponse?.user?.uuid ||
      registerResponse?.user?.user_uuid ||
      registerResponse?.user?.patient_uuid ||
      registerResponse?.user?.id ||
      registerResponse?.uuid ||
      registerResponse?.user_uuid ||
      registerResponse?.patient_uuid ||
      registerResponse?.id;

    if (!patientUuid) {
      console.error(
        "=== UUID EXTRACTION FAILED ===",
        JSON.stringify(registerResponse, null, 2)
      );

      throw new Error(
        "Patient API register response did not include patient uuid"
      );
    }

    const midPayload = toPatientMidPayload({
      attempt,
      callbackPayload: {},
    });

    const midResponse = await recordPatientPayment(patientUuid, midPayload);

    const passwordSetup = await createInlinePasswordSetupSession({
      patientUuid,
      email: draft.email,
    });

    await saveRegistrationDraft(attempt.registrationId, {
      ...draft,
      flowStatus: "FINALIZED",
      finalizedAt: new Date().toISOString(),
      patientUuid,
      externalApiResponse: registerResponse,
      midRequestPayload: midPayload,
      midResponse,
      passwordSetupCreatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Registration completed successfully",
      data: midResponse,
      passwordSetup: {
        required: true,
        setupUuid: passwordSetup?.setupUuid,
        expiresIn: passwordSetup?.expiresIn,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to complete registration",
      },
      { status: 500 }
    );
  }
}