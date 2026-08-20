"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createGsapContext } from "@/lib/gsap";

export default function Hero() {
  const heroImages = [
    "/images/1.webp",
    "/images/2.webp",
    "/images/3.webp",
    "/images/14.webp",
    "/images/5.webp",
  ];

  const firstLineText =
    "We ensure your complete medical history is always with you - in emergencies, in hospitals, across cities, and across time.";
  const secondLineText = "Because one missing detail can change everything...";
  const typingSpeed = 60;
  const typingLoopDelay = 4000;

  const sectionRef = useRef(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
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
  }, [heroImages.length]);

  useEffect(() => {
    const startTypingCycle = () => {
      setTypedCharacters(0);

      const typingInterval = setInterval(() => {
        setTypedCharacters((c) => {
          if (c >= secondLineText.length) {
            clearInterval(typingInterval);
            return c;
          }

          return c + 1;
        });
      }, typingSpeed);

      return typingInterval;
    };

    let typingInterval = startTypingCycle();

    const typingLoopInterval = setInterval(() => {
      clearInterval(typingInterval);
      typingInterval = startTypingCycle();
    }, typingLoopDelay);

    return () => {
      clearInterval(typingInterval);
      clearInterval(typingLoopInterval);
    };
  }, [secondLineText, typingSpeed, typingLoopDelay]);

  const secondLineVisible = secondLineText.slice(0, typedCharacters);
  const isTypingComplete = typedCharacters >= secondLineText.length;

  return (
    <section ref={sectionRef} className="min-h-[100dvh] bg-white pt-[82px] pb-2 md:min-h-screen md:pt-[104px] md:pb-5">
      <div className="mx-auto px-3 md:px-6">
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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/55 via-white/15 to-transparent z-0" />
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
                  className={`object-contain object-center transition-opacity duration-700 ${
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
              grid grid-cols-1 md:grid-cols-2
              items-center
              h-full
              gap-1
              md:min-h-[calc(100vh-124px)]
            "
          >
            {/* Left content */}
            <div className="px-4 pb-4 pt-1.5 md:px-10 md:py-16">
              <p className="hero-animate font-aptos-extrabold text-[10px] leading-snug text-[#282672] md:text-sm">
                <Image
                  src="/images/star.png"
                  width={40}
                  height={40}
                  alt="Hero star"
                  className="inline-block font-semibold !top-[-2px] !h-[14px] object-contain mr-1.5 md:mr-2 md:!h-[18px]"
                />
                India&apos;s 1st Health Identity Infrastructure 
                <Image
                  src="/images/star.png"
                  width={40}
                  height={40}
                  alt="Hero star"
                  className="inline-block !top-[-2px] !h-[14px] object-contain ml-1.5 md:ml-2 md:!h-[18px]"
                />
              </p>

              <h1 className="hero-animate font-aptos-black mt-2.5 text-[clamp(28px,8.5vw,36px)] leading-[1.05] text-wave md:mt-4 md:text-[60px] md:leading-[1.02]">
                Your Health Identity
                <br />
                for Life...
              </h1>

              <p className="hero-animate mt-2.5 max-w-xl text-[12px] font-normal leading-[1.45] text-[#282672] md:mt-5 md:text-[15px]">
                <span>{firstLineText}</span>
                <br />
                <span className="font-semibold">{secondLineVisible}</span>
                {!isTypingComplete && (
                  <span className="ml-0.5 inline-block animate-pulse">|</span>
                )}
              </p>

              {/* <div className="hero-animate mt-4 md:mt-7">
                <a
                  href="/claim"
                  className="
                    inline-flex items-center justify-center !cursor-pointer
                    rounded-2xl px-5 py-2.5 text-[13px] md:px-8 md:py-3 md:text-base
                    font-semibold text-white
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
              </div> */}
            </div>

            {/* Right side kept mostly visual (optional) */}
            <div className="hidden md:block" />
          </div>

          {/* Subtle vignette like mock (same) */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/40 " />

          {/* Long ocean-wave strip (same) */}
          {/* <div className="pointer-events-none absolute inset-x-0 z-10 bottom-0 hidden h-[88px] overflow-hidden md:block">
            <div className="herowavebackground" aria-hidden="true" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
