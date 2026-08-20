"use client";

import { usePathname } from "next/navigation";
import { APP_SIGNUP_URL } from "@/lib/appLinks";

export default function FloatingClaimButton() {
  const pathname = usePathname();

  if (pathname === "/doctors" || pathname === "/doctors/") {
    return null;
  }

  return (
    <a
      href={APP_SIGNUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 left-12 z-40 rounded-2xl bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(123,31,162,0.45)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(216,27,96,0.6)] hover:brightness-110"
    >
      Claim your health identity
    </a>
  );
}
