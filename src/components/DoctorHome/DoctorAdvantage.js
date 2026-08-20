"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const advantageCards = [
  {
    title: "Access Existing Test History",
    icon: "/images/doctors/fordoctor1.svg",
  },
  {
    title: "A Full Picture Of Every Patient",
    icon: "/images/doctors/fordoctor2.svg",
  },
  {
    title: "Higher Patient Trust",
    icon: "/images/doctors/fordoctor3.svg",
  },
  {
    title: "Reduced Liability",
    icon: "/images/doctors/fordoctor4.svg",
  },
  {
    title: "Time Saved In Every Consultation",
    icon: "/images/doctors/fordoctor5.svg",
  },
  {
    title: "Better-Informed Decisions",
    icon: "/images/doctors/fordoctor6.svg",
  },
];

export default function DoctorAdvantage() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !cardsRef.current.length || !gsapLoaded || !window.gsap) {
      return undefined;
    }

    const gsap = window.gsap;
    gsap.set(cardsRef.current, { opacity: 0, y: 22, scale: 0.96 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [gsapLoaded]);

  return (
    <section ref={sectionRef} className="pb-16 pt-6 md:pt-10">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => setGsapLoaded(true)}
      />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto w-fit rounded-full bg-[linear-gradient(98.79deg,#FACC15_0%,#F87171_33.33%,#A855F7_66.67%,#3B82F6_100%)] p-[1.5px] shadow-sm">
          <div className="rounded-full bg-white px-5 py-1 text-xs font-medium text-[#282672]">
            MediBank&apos;s Advantage
          </div>
        </div>

        <h2 className="mt-4 text-center text-3xl font-aptos-extrabold text-wave md:text-5xl">
          MediBank Eliminates Uncertainty.
        </h2>
        <p className="mt-2 text-center text-sm text-[#1E1B6A] md:text-3xl">
          You see the whole patient, not fragments.
        </p>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:gap-4 lg:grid-cols-3">
          {advantageCards.map((card, index) => (
            <div
              key={card.title}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className="rounded-xl bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)] p-[1px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(159,2,141,0.35),0_10px_24px_rgba(41,33,125,0.18)] md:rounded-2xl"
            >
              <div className="flex min-h-[74px] items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-[0_6px_14px_rgba(41,33,125,0.12)] md:min-h-[92px] md:gap-3 md:rounded-2xl md:px-4 md:py-3">
                <div className="relative h-10 w-10 shrink-0 md:h-14 md:w-14">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <p className="text-base font-semibold leading-snug text-[#1B185B] md:text-xl">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
