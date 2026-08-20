import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/server/otpService";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const mobile = String(body?.mobile || "").replace(/\D/g, "").slice(-10);
  const otp = String(body?.otp || "").trim();

  if (!/^[6-9]\d{9}$/.test(mobile) || !/^\d{6}$/.test(otp)) {
    return NextResponse.json({ success: false, message: "Invalid mobile number or OTP." }, { status: 400 });
  }

  const result = await verifyOtp("mobile", mobile, otp);
  if (!result.isValid) {
    const message = result.reason === "max_attempts"
      ? "Maximum OTP verification attempts reached. Please request a new OTP."
      : "Invalid or expired OTP.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "OTP verified successfully." });
}
