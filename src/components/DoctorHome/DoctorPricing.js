"use client";

import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";

const basicFeatures = [
  { text: "Consultation access", included: true },
  { text: "Follow-up appointments", included: true },
  { text: "Patient self-booking of appointments", included: false },
  { text: "Rescheduled appointments", included: false },
  { text: "Access to all clinic features", included: false },
];

const proFeatures = [
  { text: "Consultation access", included: true },
  { text: "Follow-up appointments", included: true },
  { text: "Patient self-booking of appointments", included: true },
  { text: "Rescheduled appointments", included: true },
  { text: "Access to all clinic features", included: true },
];

function FeatureList({ items, dark = false }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item.text} className="flex items-center gap-3 text-base leading-tight md:text-lg">
          <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold text-white ${
              item.included ? "bg-[#05a718]" : "bg-[#d90101]"
            }`}
            aria-hidden="true"
          >
            {item.included ? "✓" : "✕"}
          </span>
          <span className={dark ? "text-white" : "text-[#1f2160]"}>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DoctorPricing() {
  const sectionRef = useRef(null);

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
      gsap.fromTo(
        ".pricing-animate",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f2f2f5] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="pricing-animate text-center text-3xl font-extrabold text-wave md:text-5xl">Our Pricing</h2>

        <div className="mt-10 grid gap-5 md:mt-12 md:gap-7 lg:grid-cols-2">
          <div className="pricing-animate rounded-[18px] border border-[#a74dd4] bg-[#f7f7fb] px-4 py-6 sm:px-7 sm:py-8 md:px-9">
            <p className="text-base text-[#1f2160] md:text-xl">Basic Plan</p>
            <p className="mt-1 flex items-end gap-1 text-[#101454]">
              <span className="text-4xl font-bold sm:text-5xl md:text-7xl">Rs. 200</span>
              <span className="mb-1 text-lg sm:text-xl md:text-2xl">/month</span>
            </p>

            <h3 className="mt-7 text-2xl font-semibold text-[#11175e] sm:text-3xl">Features</h3>
            <FeatureList items={basicFeatures} />

            <button
              type="button"
              className="mt-8 w-full rounded-xl bg-[linear-gradient(0deg,#3D0F93_0%,#94008E_100%)] py-2 text-center text-xl font-semibold text-white shadow-[0_6px_18px_rgba(86,4,145,0.25)] sm:text-2xl md:text-3xl"
            >
              Buy Basic Plan
            </button>
          </div>

          <div className="pricing-animate rounded-[18px] bg-[linear-gradient(130deg,#080247_0%,#2d0c6f_45%,#5f1f82_100%)] [border-image:linear-gradient(0deg,#3D0F93_0%,#94008E_100%)_1] px-4 py-6 shadow-[0_18px_35px_rgba(92,35,142,0.35)] sm:px-7 sm:py-8 md:px-9">
            <p className="text-base text-white/90 md:text-xl">Pro Plan</p>
            <p className="mt-1 flex items-end gap-1 text-white">
              <span className="text-4xl font-bold sm:text-5xl md:text-7xl">Rs. 500</span>
              <span className="mb-1 text-lg sm:text-xl md:text-2xl">/month</span>
            </p>

            <h3 className="mt-7 text-2xl font-semibold text-white sm:text-3xl">Features</h3>
            <FeatureList items={proFeatures} dark />

            <button
              type="button"
              className="mt-8 w-full rounded-xl bg-white py-2 text-center text-xl font-semibold text-[#1e2c7a] sm:text-2xl md:text-3xl"
            >
              👑 Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
