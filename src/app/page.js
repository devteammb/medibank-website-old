"use client";
import { useEffect, useRef } from "react";
import Hero from "@/components/Home/Hero";
import ReportCarouselSection from "@/components/Home/ReportCarouselSection";
import HealthIdentitySection from "@/components/Home/HealthIdentitySection";
import LovedOnesSection from "@/components/Home/LovedOnesSection";
import DataControlSection from "@/components/Home/DataControlSection";
import Howitworks from "@/components/Home/Howitworks";
import Realconsequences from "@/components/Home/Realconsequences";
import Subscription from "@/components/Home/Subscription";
import { createGsapContext } from "@/lib/gsap";

export default function Home() {
  const containerRef = useRef(null);
  const stickyPanelClass = "stack-panel sticky h-[100svh] md:h-screen z-0";

  // As each panel gets covered by the next one on scroll, shrink + fade it
  // so the outgoing slide visibly "minimizes" into the stack.
  useEffect(() => {
    return createGsapContext(containerRef, (gsap) => {
      const panels = gsap.utils.toArray(".stack-panel");

      panels.forEach((panel) => {
        const inner = panel.firstElementChild;
        if (!inner) return;

        gsap.set(inner, { transformOrigin: "center center", willChange: "transform" });
        gsap.to(inner, {
          scale: 0.9,
          opacity: 0.5,
          borderRadius: 28,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "+=100%",
            scrub: true,
          },
        });
      });
    });
  }, []);

  return (
    <>
      {/* Sticky stack panels */}
      <div ref={containerRef} className="relative isolate overflow-x-clip">
        <div className={`${stickyPanelClass} top-0 md:top-[5px]`}>
          <Hero />
        </div>

        <div className={`${stickyPanelClass} top-0 md:top-[5px] bg-white py-6 md:py-12 px-4 md:px-8`}>
          <ReportCarouselSection />
        </div>
        <div className={`${stickyPanelClass} top-0 md:top-[5px] bg-white`}>
          <Realconsequences />
        </div>
        <div className={`${stickyPanelClass} top-0 md:top-[45px] bg-white py-6 md:py-12 px-4 md:px-8`}>
          <HealthIdentitySection />
        </div>


        {/* <div className="sticky top-[5px] h-screen z-0">
          <Howitworks />
        </div> */}

        <div className={`${stickyPanelClass} top-0 md:top-[5px] bg-white py-6 md:py-12 px-4 md:px-8`}>
          <LovedOnesSection />
        </div>

        {/* <div className="sticky top-[5px] h-screen z-0">
          <Subscription />
        </div> */}

         {/* Normal scrolling section after sticky stack ends */}
      <div className="bg-white py-6 md:py-12 px-4 md:px-8 sticky top-0 md:top-5 ">
        <DataControlSection />
      </div>
      </div>

     
    </>
  );
}
