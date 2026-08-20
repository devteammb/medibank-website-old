"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createGsapContext } from "@/lib/gsap";

const heroImages = ["/images/doctorhero2.webp"];
const heroMessages = [
  "When doctors don't have complete patient history, they are forced to guess.",
  "Was this condition chronic?",
  "Was there a serious allergy or prior complication?",
];
const typingSpeed = 45;
const messageHoldDelay = 1800;

export default function DoctorHero() {

  const sectionRef = useRef(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [typedCharacters, setTypedCharacters] = useState(0);

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
      gsap.fromTo(
        ".hero-animate",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setActiveImageIndex((i) => (i === heroImages.length - 1 ? 0 : i + 1));
    }, 3000);

    return () => clearInterval(carouselInterval);
  }, []);

  useEffect(() => {
    setTypedCharacters(0);
  }, [activeMessageIndex]);

  useEffect(() => {
    const currentMessage = heroMessages[activeMessageIndex];

    if (typedCharacters < currentMessage.length) {
      const typingTimeout = setTimeout(() => {
        setTypedCharacters((count) => count + 1);
      }, typingSpeed);

      return () => clearTimeout(typingTimeout);
    }

    const messageTimeout = setTimeout(() => {
      setActiveMessageIndex((index) => (index + 1) % heroMessages.length);
    }, messageHoldDelay);

    return () => clearTimeout(messageTimeout);
  }, [activeMessageIndex, typedCharacters]);

  const activeMessage = heroMessages[activeMessageIndex];
  const visibleMessage = activeMessage.slice(0, typedCharacters);
  const isTypingComplete = typedCharacters >= activeMessage.length;

  return (
    <section ref={sectionRef} className="min-h-[100dvh] bg-white pt-[22px] pb-2 md:min-h-screen md:pt-[104px] md:pb-5">
      <div className="mx-auto w-full px-3 md:px-6">
        {/* Rounded hero frame */}
        <div className="relative overflow-hidden rounded-[24px] min-h-[calc(100dvh-94px)] md:rounded-[28px] md:min-h-0">
          {/* ===== Desktop background (UNCHANGED UI) ===== */}
          <div className="hidden md:block">
            {heroImages.map((heroImage, index) => (
              <Image
                key={heroImage}
                src={heroImage}
                alt={`Hero background ${index + 1}`}
                fill
                priority={index === 0}
                className={`object-cover object-top !top-[-0px] !h-[calc(100%+70px)] transition-opacity duration-700 ${
                  index === activeImageIndex ? "opacity-100" : "opacity-0"
                }`}
                sizes="100vw"
              />
            ))}

            {/* Soft left fade (same as your original) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/55 via-white/15 to-transparent" />
          </div>

          {/* ===== Mobile image at top (object-contain) ===== */}
          <div className="relative md:hidden">
            <div
              className="
                relative h-[30dvh] min-h-[180px] max-h-[250px] w-full
              "
            >
              {heroImages.map((heroImage, index) => (
                <Image
                  key={`${heroImage}-mobile`}
                  src={heroImage}
                  alt={`Hero image ${index + 1}`}
                  fill
                  priority={index === 0}
                  className={`object-contain object-top transition-opacity duration-700 ${
                    index === activeImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                  sizes="100vw"
                />
              ))}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
            </div>
          </div>

          {/* Content */}
          <div
            className="
              relative z-20
              grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr]
              items-center
              h-full
              gap-1
              md:min-h-[calc(100vh-124px)]
            "
          >
            {/* Left content */}
            <div className="px-4 pb-4 pt-1.5 md:px-10 md:py-16">
              <p className="hero-animate text-[12px] font-semibold text-[#282672] md:text-sm">
                
                India&apos;s First Health Identity Infrastructure &nbsp;
                
              </p>

              <h1 className="hero-animate mt-4 text-[30px] font-aptos-black leading-[1.05] text-wave md:text-[60px]">
                Blind Consultations<br /> are Dangerous Consultations
              </h1>

              <div className="hero-animate mt-5 min-h-[72px] max-w-xl text-[14px] leading-relaxed text-[#7B1FA2] md:min-h-[56px] md:text-[15px]">
                <p
                  className={`font-semibold ${activeMessageIndex === 1 ? "font-extrabold" : ""}`}
                  aria-live="polite"
                >
                  {visibleMessage}
                  {!isTypingComplete && (
                    <span className="ml-0.5 inline-block animate-pulse">|</span>
                  )}
                </p>
              </div>

              {/* <div className="hero-animate mt-7 flex flex-wrap items-center gap-4">
                <a
                  href="/claim"
                  className="h-[44px] md:h-[48px]
                    inline-flex items-center justify-center !cursor-pointer
                    rounded-2xl md:px-8 md:py-3 px-4 py-2
                    font-semibold text-white text-sm
                    bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3]
                    shadow-[0_12px_30px_rgba(123,31,162,0.45)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:shadow-[0_22px_50px_rgba(216,27,96,0.6)]
                    hover:brightness-110
                    active:scale-[0.97]
                  "
                >
                  Claim Your Health Identity
                </a>

                <a
                  href="/doctors"
                  className="h-[44px] md:h-[48px]
                    inline-flex items-center justify-center !cursor-pointer
                    rounded-2xl border-2 border-[#5a1ac6] md:px-8 md:py-3 px-4 py-2
                    font-semibold text-[#4d189e] text-sm
                    backdrop-blur-[1px]
                    shadow-[0_8px_22px_rgba(76,22,167,0.2)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-1 hover:bg-white
                    hover:shadow-[0_14px_30px_rgba(76,22,167,0.28)]
                    active:scale-[0.97]
                  "
                >
                  For Doctors
                </a>
              </div> */}
            </div>

            {/* Right side kept mostly visual (optional) */}
            <div className="hidden md:block" />
          </div>

          {/* Subtle vignette like mock (same) */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/40" />

          {/* Long ocean-wave strip (same) */}
          {/* <div className="pointer-events-none absolute inset-x-0 z-10 bottom-0 hidden h-[88px] overflow-hidden md:block">
            <div className="herowavebackground" aria-hidden="true" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
