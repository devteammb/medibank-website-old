import crypto from "crypto";
import { NextResponse } from "next/server";

import { saveRegistrationDraft } from "@/lib/server/tempRegistrationStore";

export const runtime = "nodejs";

function buildRegistrationId() {
  return `REG${Date.now().toString().slice(-8)}${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function splitName(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "-",
  };
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const normalizedMobile = String(payload.mobile || "").replace(/\D/g, "").slice(-10);

    if (!String(payload.fullName || "").trim()) {
      return NextResponse.json({ success: false, message: "Full name is required." }, { status: 400 });
    }

    if (!/^[6-9]\d{9}$/.test(normalizedMobile)) {
      return NextResponse.json({ success: false, message: "Valid mobile number is required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(payload.email || ""))) {
      return NextResponse.json({ success: false, message: "Valid email is required." }, { status: 400 });
    }

    const normalizedEmail = String(payload.email || "").trim();
    const registrationId = buildRegistrationId();
    const { firstName, lastName } = splitName(payload.fullName);
    const baseDraft = {
      registrationId,
      fullName: String(payload.fullName || "").trim(),
      firstName,
      lastName,
      dob: String(payload.dob || ""),
      gender: String(payload.gender || ""),
      mobile: normalizedMobile,
      email: normalizedEmail,
      referralCode: String(payload.referralCode || "").trim(),
      state: String(payload.state || "").trim(),
      city: String(payload.city || "").trim(),
      createdAt: new Date().toISOString(),
      flowStatus: "PROFILE_CAPTURED",
    };

    // const registerResponse = await registerPatient(toPatientRegisterPayload(baseDraft));
    // const patientUuid =
    //   registerResponse?.patient?.uuid ||
    //   registerResponse?.patient?.user_uuid;
    // if (!patientUuid) throw new Error("Patient API register response did not include patient uuid");

    const draft = await saveRegistrationDraft(
      registrationId,
      {
        ...baseDraft,
        flowStatus: "PATIENT_CAPTURED",
      },
      undefined,
      { requireRedis: true },
    );

    return NextResponse.json({
      success: true,
      message: "Registration draft saved.",
      data: {
        registrationId: draft.registrationId,
        fullName: draft.fullName,
        email: draft.email,
        mobile: draft.mobile,
        storage: "redis",
      },
    });
  } catch (error) {
    const statusCode = Number(error?.responseStatus || 0);
    const isClientError = statusCode >= 400 && statusCode < 500;

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to save registration draft.",
      },
      { status: isClientError ? 400 : 500 },
    );
  }
}
