"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";
import GradientBadge from "@/components/ui/GradientBadge";

const lovedOnes = [
  { label: "Parents", image: "/images/grandparents.png" },
  { label: "Partner", image: "/images/partner.png" },
  { label: "Children", image: "/images/children.png" },
  { label: "Grandparents", image: "/images/grandparents2.png" },
];

export default function LovedOnesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
      // Intro
      gsap.fromTo(
        ".loved-intro",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Diagram
      gsap.fromTo(
        ".loved-diagram",
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".loved-diagram",
            start: "top 80%",
          },
        }
      );

      const orbitItems = gsap.utils.toArray(".loved-orbit");

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          const getNum = (el, attr) => Number(el.getAttribute(attr) || 0);

          const orbitTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".loved-diagram",
              start: "top 75%",
            },
          });

          orbitTimeline
            .fromTo(
              ".loved-center",
              { scale: 0.9 },
              { scale: 1, duration: 0.45, ease: "power3.out" }
            )
            .to(
              ".loved-center",
              {
                keyframes: [
                  { rotation: 2 },
                  { rotation: -2 },
                  { rotation: 1 },
                  { rotation: -1 },
                  { rotation: 0 },
                ],
                duration: 0.6,
                ease: "power1.inOut",
              },
              "<"
            )
            .fromTo(
              orbitItems,
              {
                opacity: 0,
                scale: 0.6,
                x: (i, el) =>
                  isMobile ? getNum(el, "data-xm") : getNum(el, "data-x"),
                y: (i, el) =>
                  isMobile ? getNum(el, "data-ym") : getNum(el, "data-y"),
              },
              {
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                immediateRender: false,
                duration: 0.9,
                ease: "back.out(1.6)",
                stagger: 0.12,
              },
              "-=0.25"
            );
        }
      );

      return () => mm.revert();
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-12 md:py-20 overflow-x-clip">
      <div className="loved-intro mx-auto flex max-w-5xl flex-col items-center px-4 text-center md:px-8">
        <GradientBadge innerClassName="bg-white text-[#141E7A]">
          For Your Loved Ones
        </GradientBadge>

        <h2 className="mt-5 text-2xl font-medium bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
              bg-clip-text
              text-transparent md:text-4xl">
          Your Health Identity is Your&nbsp;
          <span className="font-aptos-black">“Protection”</span>
        </h2>

        <p className="mt-4 max-w-3xl text-sm text-[#000339] md:text-base">
          But your family&apos;s Health Identity is your <b>“Power”</b>. Create linked health
          identities for your parents, loved ones, and children so you are
          always prepared, even when they can&apos;t be.
        </p>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-4xl justify-center px-4 md:mt-12 md:px-8 min-w-0">
        {/* Smaller + clipped on mobile to avoid any horizontal expansion */}
        <div
          className="
            relative w-full max-w-[260px] md:max-w-[420px]
            overflow-hidden
            [clip-path:inset(0)]
            [contain:layout_paint]
            min-w-0
          "
        >
          <div className="loved-diagram relative h-[230px] w-full md:h-[340px]">
            {/* Lines (smaller on mobile) */}
            <div className="absolute left-1/2 top-1/2 h-[30px] w-px -translate-x-1/2 -translate-y-[calc(100%+22px)] bg-black md:h-[42px] md:-translate-y-[calc(100%+30px)]" />
            <div className="absolute left-1/2 top-1/2 h-[30px] w-px -translate-x-1/2 translate-y-[22px] bg-black md:h-[42px] md:translate-y-[30px]" />
            <div className="absolute left-1/2 top-1/2 h-px w-[44px] -translate-y-1/2 -translate-x-[calc(100%+26px)] bg-black md:w-[58px] md:-translate-x-[calc(100%+36px)]" />
            <div className="absolute left-1/2 top-1/2 h-px w-[44px] -translate-y-1/2 translate-x-[26px] bg-black md:w-[58px] md:translate-x-[36px]" />

            {/* Center (added loved-center class for your GSAP) */}
            <div className="loved-center absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center will-change-transform">
              <Image
                src="/images/medibank-grd-logo.png"
                alt="MediBank"
                width={96}
                height={96}
                className="h-[90px] w-[90px] object-contain md:h-[140px] md:w-[140px]"
              />
            </div>

            {/* Top */}
            <div
              className="loved-orbit absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center gap-1 md:gap-2 will-change-transform"
              data-ym="78"
              data-y="120"
            >
              <div className="h-10 w-10 overflow-hidden md:h-16 md:w-16">
                <Image
                  src={lovedOnes[0].image}
                  alt={lovedOnes[0].label}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-[10px] font-medium text-[#2D2261] md:text-xs">
                {lovedOnes[0].label}
              </span>
            </div>

            {/* Left */}
            <div
              className="loved-orbit absolute left-1 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1 md:left-0 md:gap-2 will-change-transform"
              data-xm="78"
              data-x="120"
            >
              <div className="h-10 w-10 overflow-hidden md:h-16 md:w-16">
                <Image
                  src={lovedOnes[1].image}
                  alt={lovedOnes[1].label}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-[10px] font-medium text-[#2D2261] md:text-xs">
                {lovedOnes[1].label}
              </span>
            </div>

            {/* Right */}
            <div
              className="loved-orbit absolute right-1 top-1/2 flex -translate-y-1/2 flex-col items-center gap-1 md:right-0 md:gap-2 will-change-transform"
              data-xm="-78"
              data-x="-120"
            >
              <div className="h-10 w-10 overflow-hidden md:h-16 md:w-16">
                <Image
                  src={lovedOnes[2].image}
                  alt={lovedOnes[2].label}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-[10px] font-medium text-[#2D2261] md:text-xs">
                {lovedOnes[2].label}
              </span>
            </div>

            {/* Bottom */}
            <div
              className="loved-orbit absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 md:gap-2 will-change-transform"
              data-ym="-78"
              data-y="-120"
            >
              <div className="h-10 w-10 overflow-hidden md:h-16 md:w-16">
                <Image
                  src={lovedOnes[3].image}
                  alt={lovedOnes[3].label}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-[10px] font-medium text-[#2D2261] md:text-xs">
                {lovedOnes[3].label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
