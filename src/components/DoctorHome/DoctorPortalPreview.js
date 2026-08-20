"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createGsapContext } from "@/lib/gsap";

const previewSlides = [
  {
    badge: "Basic Plan",
    title: "Follow-Up Appointments Dashboard",
    subtitle: "Centralized view of patient visits with real-time status tracking",
    description:
      "A clean, structured doctor dashboard displaying scheduled followup appointments, patient details (MID, date, time, reason, type), and color-coded status indicators (Past Due, Upcoming, Completed) to streamline daily consultation management.",
    image: "/images/doctors/screenshot1.svg",
  },
  {
    badge: "Pro Plan",
    title: "Daily Appointments Dashboard",
    subtitle: "Advanced appointment intelligence for high-efficiency practices",
    description:
      "An exclusive Pro feature providing a centralized, real-time view of scheduled and follow-up appointments with patient details (MID, date, time, reason, type) and color-coded status indicators (Past Due, Upcoming, Completed) to help doctors manage consultations with precision and speed.",
    image: "/images/doctors/screenshot2.svg",
  },
];

export default function DoctorPortalPreview() {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
      gsap.fromTo(
        ".portal-preview-animate",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.05,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".portal-preview-image",
        { scale: 0.94, opacity: 0, rotate: -1.2 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".portal-preview-image-wrap",
            start: "top 82%",
          },
        }
      );
    });
  }, []);

  const goToNext = () => {
    setActiveSlide((prev) => (prev + 1) % previewSlides.length);
  };

  const goToPrevious = () => {
    setActiveSlide((prev) => (prev - 1 + previewSlides.length) % previewSlides.length);
  };

  const currentSlide = previewSlides[activeSlide];

  return (
    <section ref={sectionRef} className="pb-16 pt-8 md:pt-14">
      <div className="mx-auto max-w-8xl px-4 md:px-6">
        <div className="portal-preview-animate mx-auto w-fit rounded-full bg-[linear-gradient(98.79deg,#FACC15_0%,#F87171_33.33%,#A855F7_66.67%,#3B82F6_100%)] p-[1.5px] shadow-sm">
          <div className="rounded-full bg-white px-5 py-1 text-xs font-medium text-[#282672]">
            Doctor Portal Preview
          </div>
        </div>

        <h2 className="portal-preview-animate mt-4 text-center text-3xl font-aptos-extrabold text-wave md:text-5xl">
          Built for Doctors. Designed for Clinical Clarity.
        </h2>
        <p className="portal-preview-animate mt-2 text-center text-sm text-[#1E1B6A] md:text-3xl">
          MediBank isn&apos;t another software dashboard.
          <br className="hidden md:block" />
          It&apos;s a clinical decision-support system built around real consultation workflows.
        </p>

        <div className="mt-4 grid items-center gap-6 p-2 sm:p-4 md:grid-cols-[0.9fr_1.6fr] md:gap-8 md:p-10">
          <div className="portal-preview-animate">
            <div className="w-fit rounded-full border border-[#5946d2] bg-white px-4 py-1 text-xs font-semibold text-[#3d2b9e]">
              {currentSlide.badge}
            </div>
            <div className="portal-preview-image-wrap relative mt-5 h-[210px] sm:h-[300px] md:hidden">
              <Image
                src={currentSlide.image}
                alt={`${currentSlide.badge} portal preview`}
                fill
                sizes="100vw"
                className="portal-preview-image object-contain object-center transition-all duration-500"
                priority
              />
            </div>
            <h3 className="mt-4 text-2xl font-bold leading-tight text-[#6611a8] md:text-3xl">
              {currentSlide.title}
            </h3>
            <p className="mt-2 text-xl text-[#7b26b3] md:text-xl">{currentSlide.subtitle}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#1a1f73] md:text-md">
              {currentSlide.description}
            </p>

            <div className="mt-7 flex items-center gap-6">
              <div className="flex items-center gap-2">
                {previewSlides.map((slide, index) => (
                  <button
                    key={slide.badge}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeSlide ? "w-9 bg-[#8e12b7]" : "w-5 bg-[#d3b6e6]"
                    }`}
                    aria-label={`Go to ${slide.badge} slide`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous preview"
                className="text-4xl font-light text-[#6d1cb3] transition hover:-translate-x-0.5"
              >
                ←
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next preview"
                className="text-4xl font-light text-[#6d1cb3] transition hover:translate-x-0.5"
              >
                →
              </button>
            </div>

            <a
              href="/doctorRegistration"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-8 inline-flex items-center justify-center !cursor-pointer
                rounded-2xl px-8 py-3
                text-sm font-semibold text-white
                bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3]
                shadow-[0_12px_30px_rgba(123,31,162,0.45)]
                transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:shadow-[0_22px_50px_rgba(216,27,96,0.6)]
                hover:brightness-110
                active:scale-[0.97]
              "
            >
              Register Now
            </a>
          </div>

          <div className="portal-preview-image-wrap relative hidden h-[210px] sm:h-[300px] md:block md:h-[620px]">
            <Image
              src={currentSlide.image}
              alt={`${currentSlide.badge} portal preview`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="portal-preview-image object-contain object-center md:object-left transition-all duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
