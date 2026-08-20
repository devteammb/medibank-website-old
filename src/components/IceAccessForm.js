"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const OTP_LENGTH = 6;

export default function IceAccessForm({ onLoginSuccess }) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(""));
  const otpInputRefs = useRef([]);

  const maskedMobile = useMemo(() => {
    const digits = mobileNumber.replace(/\D/g, "").slice(-10);

    if (digits.length < 6) {
      return digits || "XXXXXXXXXX";
    }

    return `${digits.slice(0, 6)}XXXX`;
  }, [mobileNumber]);

  const focusOtpInput = (index) => {
    otpInputRefs.current[index]?.focus();
  };

  useEffect(() => {
    if (mobileNumber.length === 10 && !showOtp) {
      setShowOtp(true);
      requestAnimationFrame(() => focusOtpInput(0));
    }

    if (mobileNumber.length < 10 && showOtp) {
      setShowOtp(false);
      setOtpDigits(Array(OTP_LENGTH).fill(""));
    }
  }, [mobileNumber, showOtp]);

  const handleMobileChange = (event) => {
    setMobileNumber(event.target.value.replace(/\D/g, "").slice(0, 10));
  };

  const handleNext = (event) => {
    event.preventDefault();

    if (mobileNumber.length === 10) {
      setShowOtp(true);
      requestAnimationFrame(() => focusOtpInput(0));
    }
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtpDigits((currentDigits) => {
      const nextDigits = [...currentDigits];
      nextDigits[index] = digit;
      return nextDigits;
    });

    if (digit && index < OTP_LENGTH - 1) {
      focusOtpInput(index + 1);
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      focusOtpInput(index - 1);
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (!pastedDigits.length) return;

    setOtpDigits((currentDigits) => {
      const nextDigits = [...currentDigits];
      pastedDigits.forEach((digit, index) => {
        nextDigits[index] = digit;
      });
      return nextDigits;
    });

    focusOtpInput(Math.min(pastedDigits.length, OTP_LENGTH - 1));
  };

  const handleCancel = () => {
    setShowOtp(false);
    setOtpDigits(Array(OTP_LENGTH).fill(""));
    setMobileNumber("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (otpDigits.every(Boolean)) {
      onLoginSuccess?.();
    }
  };

  return (
    <form className="mt-12" onSubmit={showOtp ? handleSubmit : handleNext}>
      <label
        htmlFor="ice-mobile-number"
        className="mb-2 block text-[16px] font-extrabold text-[#071f9f]"
      >
        Mobile No.
      </label>
      <input
        id="ice-mobile-number"
        name="mobileNumber"
        type="tel"
        required
        pattern="[0-9]{10}"
        inputMode="numeric"
        autoComplete="tel"
        value={mobileNumber}
        onChange={handleMobileChange}
        placeholder="98898989XX"
        className="h-[54px] w-full rounded-[8px] border border-[#cbd1f4] bg-white px-5 text-[14px] font-medium text-[#071f9f] outline-none transition placeholder:text-[#a9b2e4] focus:border-[#3d4ed8] focus:ring-4 focus:ring-[#d6dbff]/70"
      />

      {showOtp ? (
        <div className="mt-4">
          <p className="mb-2 text-[12px] font-extrabold text-[#071f9f]">
            Enter OTP received on +91 {maskedMobile}
          </p>
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  otpInputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                aria-label={`OTP digit ${index + 1}`}
                value={digit}
                maxLength={1}
                onChange={(event) => handleOtpChange(index, event.target.value)}
                onKeyDown={(event) => handleOtpKeyDown(index, event)}
                onPaste={handleOtpPaste}
                className="h-11 w-10 rounded-lg border border-[#d7dcf5] bg-white text-center text-lg font-extrabold text-[#071f9f] outline-none transition focus:border-[#3d4ed8] focus:ring-2 focus:ring-[#d6dbff] sm:w-11"
              />
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="h-12 rounded-[16px] border border-[#ff6f82] bg-white text-[13px] font-extrabold text-[#e0273e] transition hover:bg-[#fff3f5] focus:outline-none focus:ring-4 focus:ring-[#ffd8df]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!otpDigits.every(Boolean)}
              className="h-12 rounded-[16px] bg-gradient-to-b from-[#a2028f] to-[#0e1896] text-[13px] font-extrabold text-white shadow-[0_14px_24px_rgba(14,24,150,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(14,24,150,0.28)] focus:outline-none focus:ring-4 focus:ring-[#d6dbff] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <button
          type="submit"
          disabled={mobileNumber.length !== 10}
          className="mt-6 h-[51px] w-full rounded-[18px] bg-gradient-to-b from-[#a2028f] to-[#0e1896] text-[20px] font-extrabold text-white shadow-[0_16px_28px_rgba(14,24,150,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(14,24,150,0.28)] focus:outline-none focus:ring-4 focus:ring-[#d6dbff] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Next
        </button>
      )}
    </form>
  );
}
