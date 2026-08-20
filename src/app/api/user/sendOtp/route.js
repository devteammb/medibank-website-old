import { NextResponse } from "next/server";
import { issueOtp } from "@/lib/server/otpService";
import { sendSmsCountryOtp } from "@/lib/server/smsCountryService";

async function dispatchMobileOtp(mobile, otp) {
  return sendSmsCountryOtp({ mobile, otp });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const mobile = String(body?.mobile || "").replace(/\D/g, "").slice(-10);

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return NextResponse.json({ success: false, message: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
  }

  const { otp } = await issueOtp("mobile", mobile);
  const dispatchResult = await dispatchMobileOtp(mobile, otp);

  if (!dispatchResult.success) {
    console.error(`[OTP][mobile] failed for ${mobile}: ${dispatchResult.debug}`);
    return NextResponse.json(
      {
        success: false,
        message: dispatchResult.message,
        debug: dispatchResult.debug,
      },
      { status: 502 }
    );
  }

  console.info(`[OTP][mobile] sent for ${mobile}`);
  return NextResponse.json({ success: true, message: "OTP sent successfully." });
}
