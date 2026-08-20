import { NextResponse } from "next/server";

import { checkPatientUser } from "@/lib/server/patientApiService";

export const runtime = "nodejs";

const DEFAULT_EMAIL_FOR_PHONE_CHECK = "user@user.com";
const DEFAULT_PHONE_FOR_EMAIL_CHECK = "99988877722";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

function normalizeConflict(conflict) {
  return String(conflict || "").trim().toLowerCase();
}

function hasFieldConflict({ duplicateCheck, field }) {
  if (!duplicateCheck.exists) return false;

  const conflict = normalizeConflict(duplicateCheck.conflict);
  if (!conflict) return true;

  if (field === "mobile") return ["mobile", "phone"].includes(conflict);
  return conflict === "email";
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const field = String(payload.field || "").trim().toLowerCase();

    if (field === "mobile") {
      const mobile = String(payload.mobile || "").replace(/\D/g, "").slice(-10);

      if (!/^[6-9]\d{9}$/.test(mobile)) {
        return NextResponse.json({ success: false, message: "Valid mobile number is required." }, { status: 400 });
      }

      const duplicateCheck = await checkPatientUser({
        phone: mobile,
        email: DEFAULT_EMAIL_FOR_PHONE_CHECK,
      });
      const duplicate = hasFieldConflict({ duplicateCheck, field });

      return NextResponse.json({
        success: true,
        field,
        duplicate,
        conflict: duplicate ? "mobile" : "",
        message: duplicate
          ? "An account with this mobile number is already registered."
          : "Mobile number is available.",
      });
    }

    if (field === "email") {
      const email = String(payload.email || "").trim().toLowerCase();

      if (!isValidEmail(email)) {
        return NextResponse.json({ success: false, message: "Valid email is required." }, { status: 400 });
      }

      const duplicateCheck = await checkPatientUser({
        phone: DEFAULT_PHONE_FOR_EMAIL_CHECK,
        email,
      });
      const duplicate = hasFieldConflict({ duplicateCheck, field });

      return NextResponse.json({
        success: true,
        field,
        duplicate,
        conflict: duplicate ? "email" : "",
        message: duplicate
          ? "An account with this email address is already registered."
          : "Email address is available.",
      });
    }

    return NextResponse.json({ success: false, message: "Field must be mobile or email." }, { status: 400 });
  } catch (error) {
    const statusCode = Number(error?.responseStatus || 0);
    const isClientError = statusCode >= 400 && statusCode < 500;

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to check duplicate details.",
      },
      { status: isClientError ? 400 : 500 },
    );
  }
}
