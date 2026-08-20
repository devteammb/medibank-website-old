"use client";

import React from "react";

const CheckCircle = ({ className = "" }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z"
      fill="#F0F1FF"
    />
  </svg>
);

const SideSquiggle = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 1440 444"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M-287 1.97016C-287 1.97016 195.165 -16.286 195.165 75.8671C195.165 168.02 81.1438 267.128 243.685 315.378C406.226 363.629 1021.21 62.3913 1218.93 148.459C1416.65 234.527 1057 335.809 1322.64 400.142C1588.29 464.475 1860 234.527 1860 234.527"
      stroke="#9F028D"
    />
    <path
      d="M-290 10.9702C-290 10.9702 191.941 -7.28597 191.941 84.8671C191.941 177.02 77.9723 276.128 240.438 324.378C402.903 372.629 1017.61 71.3913 1215.23 157.459C1412.86 243.527 1053.37 344.809 1318.89 409.142C1584.42 473.475 1856 243.527 1856 243.527"
      stroke="#9F028D"
      strokeOpacity="0.5"
    />
    <path
      d="M-290 22.9702C-290 22.9702 191.941 4.71403 191.941 96.8671C191.941 189.02 77.9723 288.128 240.438 336.378C402.903 384.629 1017.61 83.3913 1215.23 169.459C1412.86 255.527 1053.37 356.809 1318.89 421.142C1584.42 485.475 1856 255.527 1856 255.527"
      stroke="#9F028D"
      strokeOpacity="0.3"
    />
    <path
      d="M-290 33.9702C-290 33.9702 191.941 15.714 191.941 107.867C191.941 200.02 77.9723 299.128 240.438 347.378C402.903 395.629 1017.61 94.3913 1215.23 180.459C1412.86 266.527 1053.37 367.809 1318.89 432.142C1584.42 496.475 1856 266.527 1856 266.527"
      stroke="#9F028D"
      strokeOpacity="0.1"
    />
  </svg>
);

export default function Subscription() {
  const features = [
    "All your medical records in one place",
    "Prescriptions, lab reports, scans, diagnoses, notes",
    "Book lab tests & auto-sync reports",
    "AI-based health trend monitoring",
    "Highest-grade encryption & security",
    "Share records with any doctor, anywhere",
    "Book doctor appointments",
  ];

  return (
    // ✅ removed overflow-hidden + added bottom padding for squiggle space
    <section className="relative bg-white py-10 md:py-14 lg:py-16 pb-24 md:pb-32 lg:pb-40">
      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[24px] font-extrabold tracking-[-0.02em] md:text-[42px] lg:text-[44px] lg:leading-[1.05]">
            <span className="bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)] bg-clip-text text-transparent">
              Healthcare Infrastructure
            </span>
            <span className="bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)] bg-clip-text text-transparent">
              , Not a Subscription
            </span>
          </h2>

          <p className="mt-2 text-[13px] leading-relaxed text-[#0B137A] md:mt-3 md:text-[15px] lg:text-[16px]">
            Lifetime access to your completed medical history—securely stored,
            instantly shareable, and fully under your control.
          </p>
        </div>

        {/* card wrapper */}
        <div className="relative mt-8 flex justify-center md:mt-10">
          <div className="relative w-full max-w-[860px]">
            {/* purple glow under card */}
            <div className="pointer-events-none absolute left-1/2 top-[62%] h-[120px] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-[40px] bg-[#8D1CB8]/35 blur-[32px]" />

            {/* card (kept on top) */}
            <div className="relative z-10 overflow-hidden rounded-[22px] bg-[linear-gradient(138.56deg,#02042B_0%,#060B4E_40%,#7D2A84_100%)] shadow-[0_22px_60px_rgba(30,10,80,0.28)]">
              {/* inner soft shine */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_240px_at_20%_20%,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_65%)]" />

              <div className="grid gap-6 p-5 md:grid-cols-[0.95fr_1.35fr] md:gap-8 md:p-7 lg:p-8">
                {/* left */}
                <div className="relative">
                  <div
                    className="
                        relative inline-flex items-center
                        rounded-full
                        px-3 py-1.5
                        text-[12px] font-semibold text-white/90
                        bg-white/5 backdrop-blur-[6px]

                        /* base border fallback */
                        border border-white/10

                        /* glass rim */
                        before:content-['']
                        before:absolute before:inset-0
                        before:rounded-full
                        before:p-[1px]
                        before:bg-[linear-gradient(180deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.12)_60%,rgba(255,255,255,0.08)_100%)]
                        before:[-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
                        before:[-webkit-mask-composite:xor]
                        before:[mask-composite:exclude]
                        before:pointer-events-none

                        /* top-left shine arc */
                        after:content-['']
                        after:absolute after:inset-0
                        after:rounded-full
                        after:p-[1px]
                        after:bg-[conic-gradient(from_215deg_at_20%_18%,rgba(255,255,255,0.85)_0deg,rgba(255,255,255,0.35)_38deg,rgba(255,255,255,0)_90deg,rgba(255,255,255,0)_360deg)]
                        after:opacity-90
                        after:[-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
                        after:[-webkit-mask-composite:xor]
                        after:[mask-composite:exclude]
                        after:pointer-events-none
                    "
                    >
                    Monthly Plan
                    </div>
                        

                  <div className="mt-5">
                    <div className="flex items-end gap-2">
                      <div className="text-[36px] font-extrabold tracking-[-0.02em] text-white md:text-[40px] lg:text-[44px]">
                        Rs. 100
                      </div>
                      <div className="pb-2 text-[12px] text-white/65">/mon</div>
                    </div>

                    <button
                      className="
                        mt-5 w-full max-w-[240px]
                        rounded-[10px] bg-white px-5 py-2.5
                        text-[12px] font-semibold text-[#0B137A]
                        shadow-[0_12px_28px_rgba(0,0,0,0.24)]
                        transition hover:brightness-105 active:scale-[0.99]
                      "
                    >
                      Claim Now
                    </button>
                  </div>

                  {/* divider (only md+) */}
                  <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-px bg-white/15 md:block" />
                </div>

                {/* right */}
                <div>
                  <div className="text-[12px] font-semibold tracking-wide text-white/90">
                    Features
                  </div>

                  <ul className="mt-3 space-y-2.5 md:mt-4">
                    {features.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle className="mt-[1px] shrink-0" />
                        <span className="text-[12px] leading-relaxed text-white/85 md:text-[13px] lg:text-[13px]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(to_top,rgba(0,0,0,0.24),rgba(0,0,0,0))]" />
            </div>

            {/* ✅ squiggle BELOW card, full width, visible */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[-10px]
                    z-0
                    w-[100vw]
                    -translate-x-1/2
                    -translate-y-4
                "
                >
                <SideSquiggle className="block h-[140px] w-full md:h-[180px] lg:h-[220px]" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
