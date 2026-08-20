"use client";

import Image from "next/image";
import React from "react";
import GradientBadge from "../ui/GradientBadge";

const steps = [
  {
    icon: "/images/UserAdd.png",
    title: "Claim Your Health Identity",
    desc: "Create your secure, lifetime health identity in minutes. No paperwork, no hassle.",
  },
  {
    icon: "/images/UploadOutline.png",
    title: "Upload or Pull Records",
    desc: "Import existing records or connect with hospitals to automatically sync your data.",
  },
  {
    icon: "/images/Share.png",
    title: "Share with Consent",
    desc: "Grant temporary or permanent access to doctors, hospitals, or family members.",
  },
  {
    icon: "/images/ChartSquareBar.png",
    title: "AI Monitors Trends",
    desc: "Intelligent analysis spots patterns and potential concerns before they escalate.",
  },
  {
    icon: "/images/ShieldCheck.png",
    title: "Stay Protected Always",
    desc: "Your complete health story stays secure and accessible whenever you need it.",
  },
];

/* ---------------- COMPONENT ---------------- */

const Howitworks = () => {
  return (
    <section
      className="
        relative overflow-hidden py-16 md:py-20
        bg-[radial-gradient(circle_at_center,_#4E0663_0%,_#060B45_55%)]
      "
    >
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <GradientBadge innerClassName="bg-[#1A1D8A] px-5 text-white/95">
          How It Works
        </GradientBadge>

        <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
          Simple, Safe, Control-Focused
        </h2>

        <p className="mt-3 text-lg text-white/90 md:mt-4 md:text-3xl">
          Your health deserves that.
        </p>
      </div>

      {/* Cards */}
      <div
        className="
          mx-auto mt-10 grid max-w-7xl gap-5 px-4 sm:mt-14 sm:gap-6 sm:px-6
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-5
        "
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className="
              relative rounded-2xl bg-white px-5 pb-8 pt-10 text-left sm:px-6 sm:pb-10
              shadow-[0_25px_60px_rgba(0,0,0,0.15)]
            "
          >
            {/* Step pill */}
            <span
              className="
                absolute -top-5 left-1/2 -translate-x-1/2
                whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-[#0B137A]
                bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500
              "
            >
              Step {index + 1}
            </span>

            {/* Icon */}
            {/* Icon */}
            <div
              className="
    flex h-14 w-14 items-center justify-center rounded-2xl
    bg-[linear-gradient(180deg,rgba(159,2,141,0.2)_0%,rgba(14,24,150,0.2)_105%)]
  "
            >
              <Image
                src={step.icon}
                alt={`Step ${index + 1} icon`}
                width={30}
                height={35}
              />
            </div>

            {/* Content */}
            <h3 className="mt-4 text-xl font-semibold leading-snug text-[#0B137A] sm:text-2xl">
              {step.title}
            </h3>

            <p className="mt-2 text-base leading-relaxed text-[#0B137A]/80 sm:text-lg">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Howitworks;
