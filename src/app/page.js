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

  // Clean PowerPoint-style slide change: as the next panel scrolls up to cover
  // the current one, the outgoing slide shrinks slightly (a subtle "minimize")
  // while staying fully opaque — no fade, so nothing looks washed out.
  useEffect(() => {
    return createGsapContext(containerRef, (gsap) => {
      const panels = gsap.utils.toArray(".stack-panel");

      panels.forEach((panel) => {
        const inner = panel.firstElementChild;
        if (!inner) return;

        gsap.set(inner, { transformOrigin: "center center" });
        gsap.to(inner, {
          scale: 0.94,
          borderRadius: 24,
          ease: "power1.out",
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "+=100%",
            scrub: 0.5,
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
