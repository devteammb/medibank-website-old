"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import IcePatientLookupScreens from "@/components/IcePatientLookupScreens";

const citizenSteps = [
  {
    label: "Step 1",
    content: (
      <>
        Scan the <span className="font-extrabold">QR Code</span> of the person
      </>
    ),
  },
  {
    label: "Step 2",
    content:
      "Instantly view their complete medical history along with any ongoing consultation they are going through.",
  },
];

function HowItWorks() {
  return (
    <div className="mt-9 rounded-[20px] border border-[#e8c2ed] bg-white px-5 py-8 shadow-[0_18px_50px_rgba(14,24,150,0.06)] sm:px-7">
      <h2 className="text-center text-[20px] font-extrabold text-[#071f9f]">
        How it works?
      </h2>

      <div className="mt-8 space-y-8">
        {citizenSteps.map((step) => (
          <div
            key={step.label}
            className="grid grid-cols-[70px_1fr] items-start gap-3 text-[#071f9f] sm:grid-cols-[96px_1fr] sm:gap-4"
          >
            <span className="inline-flex h-[34px] items-center justify-center rounded-full bg-[#0e2aa9] px-4 text-[11px] font-extrabold text-white shadow-[0_10px_20px_rgba(14,42,169,0.16)] sm:px-5 sm:text-[12px]">
              {step.label}
            </span>
            <p className="min-h-[34px] pt-[6px] text-[12px] font-medium leading-[1.12] sm:text-[15px]">
              {step.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function IceLanding({ onStart }) {
  return (
    <div className="w-full max-w-[430px] bg-white px-2 py-4 sm:px-4">
      <div className="mx-auto max-w-[360px] text-center">
        <h1 className="text-[26px] font-extrabold leading-[1.06] text-wave sm:text-[32px]">
          ICE <br /> In Case of Emergencies
        </h1>

        <p className="mx-auto mt-5 max-w-[320px] text-[13px] font-medium leading-[1.1] text-[#a2028f] sm:text-[15px]">
          Medical history instantly accessible when it matters the most -
          Emergencies. Simply scan the QR code of the person to view their vital
          health information - fast and secure.
        </p>

        <button
          type="button"
          onClick={onStart}
          className="mx-auto mt-8 inline-flex h-[50px] min-w-[260px] items-center justify-center gap-2 rounded-[18px] bg-gradient-to-b from-[#a2028f] to-[#0e1896] px-8 text-[16px] font-semibold text-white shadow-[0_16px_28px_rgba(14,24,150,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(14,24,150,0.28)] focus:outline-none focus:ring-4 focus:ring-[#d6dbff]"
        >
          Check It Now
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>

      <HowItWorks />
    </div>
  );
}

export default function IceEmergencySection() {
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <div className="w-full max-w-[430px] rounded-[34px] bg-white px-2 py-4 sm:px-4">
        <IcePatientLookupScreens />
      </div>
    );
  }

  return <IceLanding onStart={() => setStarted(true)} />;
}
