"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";
import GradientBadge from "@/components/ui/GradientBadge";

const identityItems = [
  { title: "Past Treatments", icon: "/images/promise1.png" },
  { title: "Medical History", icon: "/images/promise2.png" },
  { title: "Doctor Notes", icon: "/images/promise3.png" },
  { title: "Prescriptions", icon: "/images/promise4.png" },
  { title: "Allergies", icon: "/images/promise5.png" },
  { title: "Scans", icon: "/images/promise6.png" },
  { title: "Diagnoses", icon: "/images/promise7.png" },
  { title: "Medications", icon: "/images/promise8.png" },
  { title: "Lab reports", icon: "/images/promise9.png" },
];

export default function HealthIdentitySection() {
  const pinWrapRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    return createGsapContext(pinWrapRef, (gsap) => {
     const cardsRaw = gsap.utils.toArray(".identity-card");
const cards = Array.isArray(cardsRaw) ? cardsRaw : [cardsRaw];
      const entryVariants = [
        { y: 88, rotation: -10, scale: 0.82, filter: "blur(10px)" },
        { x: -90, y: 44, rotation: 14, scale: 0.85, filter: "blur(8px)" },
        { x: 95, y: 48, rotation: -14, scale: 0.82, filter: "blur(8px)" },
        { y: -70, rotationX: 28, scale: 0.78, filter: "blur(9px)" },
        { x: -74, y: 82, rotation: -12, scale: 0.8, filter: "blur(9px)" },
        { x: 85, y: -42, rotation: 16, scale: 0.8, filter: "blur(10px)" },
        { y: 100, rotationY: -24, scale: 0.76, filter: "blur(9px)" },
        { x: -80, y: -60, rotation: 12, scale: 0.83, filter: "blur(8px)" },
        { x: 78, y: 78, rotation: -16, scale: 0.8, filter: "blur(10px)" },
      ];

      gsap.set(cards, {
        opacity: 0,
        transformOrigin: "50% 80%",
      });

      gsap.set([".identity-heading", ".identity-subheading", ".identity-grid-title"], {
        opacity: 1,
      });

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      cards.forEach((card, index) => {
        revealTimeline.fromTo(
          card,
          {
            ...entryVariants[index % entryVariants.length],
            opacity: 0,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "back.out(1.45)",
          },
          index * 0.16
        );
      });
    });
  }, []);

  return (
    <div ref={pinWrapRef} className="relative">
      <section
        ref={sectionRef}
        className="rounded-[56px] bg-[radial-gradient(54.48%_98.43%_at_99.17%_1.57%,_#9F028D_0%,_#070F6E_100%)] px-4 py-8 md:rounded-[80px] md:px-0 md:py-6"
      >
        <div className="identity-heading mx-auto flex max-w-6xl flex-col items-center px-2 text-center md:px-8">
          <GradientBadge innerClassName="bg-[#1A1D8A] px-5 text-white/95">
            The Promise
          </GradientBadge>

          <h2 className="mt-4 text-xl font-medium leading-snug text-white md:mt-6 md:text-4xl">
            With MediBank, your <span className="font-aptos-black">&quot;what if&quot;</span>{" "}
            becomes
            <span className="font-aptos-black"> &quot;we&apos;re ready&quot;</span>
          </h2>

          <p className="identity-subheading mt-3 leading-relaxed text-white/85 md:mt-6 md:text-3xl">
            No Missing Reports &nbsp; | &nbsp; No blind emergencies &nbsp; | &nbsp;
            No guesswork &nbsp; | &nbsp; No repeated tests
          </p>
        </div>

        <div className="relative mx-auto mt-6 w-full max-w-[1120px] rounded-[30px] px-3 pb-6 pt-8 md:mt-10 md:rounded-[44px] md:px-8 md:pb-10 md:pt-16">
          {/* Outer border */}
          <div className="pointer-events-auto absolute inset-0 rounded-[30px] border border-[#BC4AE7]/55 md:rounded-[44px]" />

          {/* subtle inner glow like reference */}
          <div className="pointer-events-auto absolute inset-0 rounded-[30px] [box-shadow:inset_0_0_0_1px_rgba(188,74,231,0.15),inset_0_0_120px_rgba(188,74,231,0.10)] md:rounded-[44px]" />

          {/* Title sits on border with cut-out */}
          <div className="absolute left-1/2 top-0 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center">
            {/* Mask plate to “cut” the border behind text */}
            <div className="absolute inset-0 -z-10 rounded-full px-6 py-3" />
            <h3 className="mx-2 shrink-0 whitespace-nowrap rounded-2xl bg-[radial-gradient(54.48%_98.43%_at_99.17%_1.57%,_#9F028D_0%,_#070F6E_100%)] px-3 py-1 text-center text-[14px] font-normal text-white md:mx-4 md:px-4 md:py-0 md:text-[22px]">
              Everything in One Place
            </h3>
          </div>

          {/* Grid wrapper */}
          <div className="relative z-10 mt-2 md:mt-0">
            {/* Row 1: 4 cards (mobile = 2x2, desktop intact) */}
            <div className="hidden gap-5 md:grid md:grid-cols-4">
              {identityItems.slice(0, 4).map((item) => (
                <div
                  key={item.title}
                  className="identity-card group relative mt-10 flex min-h-[100px] w-full flex-col items-center justify-end rounded-[26px] px-4 pb-5 pt-10 text-center md:w-[255px]"
                >
                  {/* card body with exact “purple slab” look */}
                  <div className="absolute inset-0 rounded-[26px] bg-[linear-gradient(2400deg,#9F028D_0%,#630B91_20%,#0E1896_100%)] shadow-[0_20px_40px_rgba(10,8,45,0.55)]" />

                  {/* top highlight + edge glow */}
                  <div className="pointer-events-auto absolute inset-0 rounded-[26px] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.20),0_0_0_1px_rgba(188,74,231,0.12)]" />

                  <div className="pointer-events-auto absolute -inset-6 rounded-[34px] bg-[radial-gradient(circle_at_50%_10%,rgba(188,74,231,0.45)_0%,rgba(188,74,231,0.0)_65%)] opacity-40 blur-2xl" />

                  {/* Floating icon */}
                  <div className="absolute -top-12 grid h-[105px] w-[102px] place-items-center">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={106}
                      height={106}
                      className="h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.35)]"
                    />
                  </div>

                  <span className="relative z-10 text-[15px] font-medium leading-tight text-white/95 md:text-[17px]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 2: 5 cards (mobile = 2 columns; md keeps desktop intact; no sm used) */}
            <div className="hidden gap-5 md:grid md:grid-cols-5">
              {identityItems.slice(4).map((item) => (
                <div
                  key={item.title}
                  className="identity-card group relative mt-12 flex min-h-[100px] w-full flex-col items-center justify-end rounded-[26px] px-4 pb-5 pt-10 text-center md:w-[185px]"
                >
                  <div className="absolute inset-0 rounded-[26px] bg-[linear-gradient(2400deg,#9F028D_0%,#630B91_20%,#0E1896_100%)] shadow-[0_20px_40px_rgba(10,8,45,0.55)]" />

                  <div className="pointer-events-auto absolute inset-0 rounded-[26px] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.20),0_0_0_1px_rgba(188,74,231,0.12)]" />

                  <div className="pointer-events-auto absolute -inset-6 rounded-[34px] bg-[radial-gradient(circle_at_50%_10%,rgba(188,74,231,0.45)_0%,rgba(188,74,231,0.0)_65%)] opacity-40 blur-2xl" />

                  <div className="absolute -top-12 grid h-[92px] w-[102px] place-items-center">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={106}
                      height={106}
                      className="h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.35)]"
                    />
                  </div>

                  <span className="relative z-10 text-[15px] font-medium leading-tight text-white/95 md:text-[17px]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile: spacious 2-column grid for better readability and alignment */}
            <div className="grid grid-cols-3 gap-5 md:hidden">
              {identityItems.map((item, index) => (
                <div
                  key={item.title}
                  className="identity-card group relative flex h-[80px] w-full flex-col items-center justify-center rounded-[20px] px-5 py-4 text-center"
                >
                  <div className="absolute inset-0 rounded-[20px] bg-[linear-gradient(2400deg,#9F028D_0%,#630B91_20%,#0E1896_100%)] shadow-[0_12px_24px_rgba(10,8,45,0.42)]" />

                  <div className="pointer-events-auto absolute inset-0 rounded-[20px] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.25),0_0_0_1px_rgba(188,74,231,0.16)]" />

                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={42}
                    height={42}
                    className="relative z-10 h-[42px] w-[42px] object-contain"
                  />

                  <span className="relative z-10 mt-2 text-[12px] font-medium leading-tight text-white/95">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
