"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import DoctorIceLoginForm from "@/components/DoctorIceLoginForm";
import IceAccessForm from "@/components/IceAccessForm";
import IcePatientLookupScreens from "@/components/IcePatientLookupScreens";

const userTypes = ["Citizen", "Doctor", "Staff"];

const citizenSteps = [
  {
    label: "Step 1",
    content: "Enter mobile number and OTP",
  },
  {
    label: "Step 2",
    content: (
      <>
        Scan the <span className="font-extrabold">QR Code</span> of patient or
        Enter <span className="font-extrabold">MID</span>
      </>
    ),
  },
  {
    label: "Step 3",
    content:
      "You will be able to see all the medical history of patient with any ongoing consultation he/she is going through.",
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

function IceLanding({ onCheckNow, onLogin }) {
  
  const handleCheckNow = () => {
    onLogin?.();
  };

  return (
    <div className="w-full max-w-[430px] bg-white px-2 py-4 sm:px-4">
      <div className="mx-auto max-w-[360px] text-center">
        <h1 className="text-[26px] font-extrabold leading-[1.06] text-wave sm:text-[32px]">
          ICE <br /> In Case of Emergencies
        </h1>

        <p className="mx-auto mt-5 max-w-[320px] text-[13px] font-medium leading-[1.1] text-[#a2028f] sm:text-[15px]">
          Medical history instantly accessible when it matters the most -
          Emergencies. Simply scan a QR code or ID to view vital health
          information - fast and secure.
        </p>

        <button
          type="button"
          onClick={handleCheckNow}
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
  const [selectedType, setSelectedType] = useState("Citizen");
  const [authenticatedType, setAuthenticatedType] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const showCredentialLogin =
    selectedType === "Doctor" || selectedType === "Staff";

  const handleLoginSuccess = (userType = selectedType) => {
    setAuthenticatedType(userType);
  };

  if (authenticatedType) {
    return (
      <div className="w-full max-w-[430px] rounded-[34px] bg-white px-2 py-4 sm:px-4">
        <IcePatientLookupScreens userType={authenticatedType} />
      </div>
    );
  }

  if (!showLoginForm) {
    return (
      <IceLanding
        onLogin={() => setShowLoginForm(true)}
      />
    );
  }

  return (
    <div className="w-full max-w-[430px] rounded-[34px] bg-white px-2 py-4 sm:px-4">
      <div className="text-center">
        <p className="mb-5 text-[25px] font-extrabold leading-tight text-wave sm:text-[28px]">
          Emergency Section
        </p>

        <div
          className="mx-auto flex w-full max-w-[240px] items-center justify-between rounded-full bg-[#d6dbff] p-[6px] text-[12px] text-[#071f9f] shadow-[0_14px_32px_rgba(14,24,150,0.10)] sm:max-w-[256px]"
          aria-label="Emergency user type selector"
          role="tablist"
        >
          {userTypes.map((type) => {
            const isSelected = selectedType === type;

            return (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedType(type)}
                className={`rounded-full px-4 py-2 text-[12px] font-medium transition sm:px-5 ${
                  isSelected
                    ? "bg-gradient-to-b from-[#a2028f] to-[#0e1896] text-white shadow-[0_8px_18px_rgba(14,24,150,0.25)]"
                    : "text-[#071f9f] hover:bg-white/45"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {showCredentialLogin ? (
        <DoctorIceLoginForm
          userType={selectedType}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <>
          <IceAccessForm onLoginSuccess={() => handleLoginSuccess("Citizen")} />
          <HowItWorks />
        </>
      )}
    </div>
  );
}
