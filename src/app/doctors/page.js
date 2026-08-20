"use client";

import DoctorHero from "@/components/DoctorHome/DoctorHero";
import DoctorAdvantage from "@/components/DoctorHome/DoctorAdvantage";
import DoctorPortalPreview from "@/components/DoctorHome/DoctorPortalPreview";
import DoctorPricing from "@/components/DoctorHome/DoctorPricing";

export default function Home() {
  return (
    <>
      <div className="relative isolate">
        <DoctorHero />
        <DoctorAdvantage />
        <DoctorPortalPreview />
        {/* <DoctorPricing /> */}
      </div>
    </>
  );
}
