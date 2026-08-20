import { NextResponse } from "next/server";
import { issueOtp } from "@/lib/server/otpService";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body?.email || "").trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: "Enter a valid email address." }, { status: 400 });
  }

  const { otp } = await issueOtp("email", email);
  console.info(`[OTP][email] ${email} => ${otp}`);

  return NextResponse.json({ success: true, message: "Email OTP sent successfully." });
}
