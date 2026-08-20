import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/server/otpService";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body?.email || "").trim().toLowerCase();
  const otp = String(body?.otp || "").trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{6}$/.test(otp)) {
    return NextResponse.json({ success: false, message: "Invalid email or OTP." }, { status: 400 });
  }

  const ok = await verifyOtp("email", email, otp);
  if (!ok) {
    return NextResponse.json({ success: false, message: "Invalid or expired OTP." }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Email OTP verified successfully." });
}
