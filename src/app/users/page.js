"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createGsapContext } from "@/lib/gsap";
import Howitworks from "@/components/Home/Howitworks";

const DEMO_VIDEO_URL =
  "https://www.youtube.com/embed/N5_dq0VgBYQ?si=OuzzsAPhXUtaYySh&autoplay=1&rel=0";

function PhoneMockup({ children, className = "" }) {
  return (
    <div
      className={`
        relative mx-auto aspect-[0.515/1] w-full max-w-[290px]
        rounded-[48px]
        bg-[#6f566f]
        p-[3px]
        shadow-[0_0_0_1px_rgba(60,35,60,0.55),0_12px_30px_rgba(0,0,0,0.18)]
        ${className}
      `}
    >
      {/* metallic outer rim */}
      <div className="absolute inset-0 rounded-[48px] bg-[linear-gradient(180deg,#9b7b99_0%,#6b4f69_18%,#3f2d42_52%,#7d627b_82%,#a1839f_100%)]" />

      {/* outer highlight */}
      <div className="pointer-events-none absolute inset-[2px] rounded-[46px] border border-white/20" />

      {/* left side buttons */}
      <div className="absolute left-[-2px] top-[150px] h-[42px] w-[4px] rounded-l-full rounded-r-sm bg-[#4b364b] shadow-[inset_1px_0_0_rgba(255,255,255,0.18)]" />
      <div className="absolute left-[-2px] top-[225px] h-[74px] w-[4px] rounded-l-full rounded-r-sm bg-[#4b364b] shadow-[inset_1px_0_0_rgba(255,255,255,0.18)]" />
      <div className="absolute left-[-2px] top-[308px] h-[74px] w-[4px] rounded-l-full rounded-r-sm bg-[#4b364b] shadow-[inset_1px_0_0_rgba(255,255,255,0.18)]" />

      {/* right side button */}
      <div className="absolute right-[-2px] top-[222px] h-[96px] w-[4px] rounded-r-full rounded-l-sm bg-[#4b364b] shadow-[inset_-1px_0_0_rgba(255,255,255,0.18)]" />

      {/* black bezel */}
      <div className="relative z-10 h-full w-full rounded-[45px] bg-[#1a1a1a] p-[11px]">
        {/* screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-[#f2f2f2]">
          {/* dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-[12px] z-20 -translate-x-1/2">
            <div className="relative h-[18px] w-[78px] rounded-full bg-[#151515]">
              <div className="absolute right-[9px] top-1/2 h-[6px] w-[6px] -translate-y-1/2 rounded-full bg-[#0c1b2e] shadow-[0_0_0_1px_rgba(45,88,150,0.6)]" />
            </div>
          </div>

          {/* optional content area */}
          <div className="relative h-full w-full rounded-[36px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
function PhoneScreen({ src, alt }) {
  return (
    <div className="relative h-full w-full bg-white">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
      />
    </div>
  );
}
function PhoneScreenImage({ src, alt }) {
  return (
    <div className="relative h-full w-full bg-white">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
      />
    </div>
  );
}

function HeroWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100vh] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#C9C6EA_0%,#E8C9DF_55%,#F3E6F2_100%)]" />

      <svg
        className="hero-band hero-band-top absolute inset-x-0 h-[40%] w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <g className="wave-track wave-track-top">
          <path
            d="M0,140 C240,90 520,90 720,135 C940,185 1180,185 1440,135 L1440,0 L0,0 Z"
            fill="#FFFFFF"
            fillOpacity="0.34"
          />
          <path
            d="M1440,135 C1680,90 1960,90 2160,135 C2380,185 2620,185 2880,135 L2880,0 L1440,0 Z"
            fill="#FFFFFF"
            fillOpacity="0.34"
          />
        </g>
      </svg>

      <svg
        className="hero-band hero-band-mid absolute inset-x-0 top-[24%] h-[50%] w-full"
        viewBox="0 0 1440 340"
        preserveAspectRatio="none"
      >
        <g className="wave-track wave-track-mid">
          <path
            d="M0,155 C260,215 520,215 740,165 C980,110 1210,115 1440,165 L1440,340 L0,340 Z"
            fill="#FFFFFF"
            fillOpacity="0.42"
          />
          <path
            d="M1440,165 C1700,215 1960,215 2180,165 C2420,110 2650,115 2880,165 L2880,340 L1440,340 Z"
            fill="#FFFFFF"
            fillOpacity="0.42"
          />
        </g>
      </svg>

      <svg
        className="hero-band hero-band-bottom absolute inset-x-0 bottom-0 h-[48%] w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <g className="wave-track wave-track-bottom">
          <path
            d="M0,110 C250,35 520,40 720,105 C950,180 1180,185 1440,115 L1440,320 L0,320 Z"
            fill="#FFFFFF"
            fillOpacity="0.98"
          />
          <path
            d="M1440,115 C1690,35 1960,40 2160,105 C2390,180 2620,185 2880,115 L2880,320 L1440,320 Z"
            fill="#FFFFFF"
            fillOpacity="0.98"
          />
        </g>
      </svg>

      <style jsx>{`
        .hero-band {
          will-change: transform;
          mix-blend-mode: screen;
          animation: bandFloat 7.5s ease-in-out infinite;
        }

        .hero-band-top {
          filter: drop-shadow(0 10px 28px rgba(255, 255, 255, 0.45));
        }

        .hero-band-mid {
          filter: drop-shadow(0 12px 30px rgba(255, 255, 255, 0.5));
          animation-delay: -1.8s;
        }

        .hero-band-bottom {
          filter: drop-shadow(0 14px 30px rgba(255, 255, 255, 0.55));
          animation-delay: -3.4s;
        }

        .wave-track {
          will-change: transform;
          transform: translateX(0);
        }

        .wave-track-top {
          animation: waveSlideLeft 12s linear infinite;
        }

        .wave-track-mid {
          animation: waveSlideRight 15s linear infinite;
        }

        .wave-track-bottom {
          animation: waveSlideLeft 9s linear infinite;
        }

        @keyframes bandFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, 12px, 0);
          }
        }

        @keyframes waveSlideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1440px);
          }
        }

        @keyframes waveSlideRight {
          0% {
            transform: translateX(-1440px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

function RowPillIndicators({ activeIndex = 0 }) {
  return (
    <div className="mt-6 hidden items-center gap-2 md:flex" aria-hidden="true">
      {[0, 1, 2].map((index) => {
        const isActive = index === activeIndex;

        return (
          <span
            key={index}
            className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
              isActive ? "w-10 bg-[#8F129A]" : "w-5 bg-[#E9DEF5]"
            }`}
          >
            {isActive ? (
              <span className="users-pill-fill absolute inset-y-0 left-0 rounded-full" />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

function DemoVideoModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 md:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <motion.button
            type="button"
            aria-label="Close video popup"
            className="absolute inset-0 cursor-default bg-[#090314]/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Watch demo video"
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(245,236,255,0.92))] shadow-[0_40px_120px_rgba(31,9,81,0.35)]"
            initial={{ opacity: 0, y: 36, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(167,76,255,0.2),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,24,150,0.2),transparent_30%)]" />

            <div className="relative flex flex-col gap-5 p-4 sm:p-5 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8F129A]">
                    Android Application Demo
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold leading-tight text-[#1F1350] md:text-3xl">
                    Experience the user journey
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E5D8F8] bg-white/80 text-[#4D267F] shadow-[0_14px_30px_rgba(119,75,166,0.18)] transition duration-300 hover:scale-105 hover:bg-white"
                  aria-label="Close demo video"
                >
                  <span className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(159,2,141,0.12),rgba(14,24,150,0.12))] opacity-0 transition duration-300 group-hover:opacity-100" />
                  <svg
                    className="relative h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 5L15 15M15 5L5 15"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative overflow-hidden rounded-[24px] border border-white/60 bg-[#140B2F] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_25px_60px_rgba(17,7,42,0.35)] md:p-3">
                <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(196,136,255,0.22),transparent_68%)]" />
                <div className="relative aspect-video overflow-hidden rounded-[18px] bg-black">
                  <iframe
                    src={DEMO_VIDEO_URL}
                    title="Medi Log user app demo"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function UsersPage() {
  const showcaseRef = useRef(null);
  const pinPanelRef = useRef(null);
  const phoneScreensRef = useRef(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const showcaseHeadingClassName =
    "text-3xl sm:text-3xl md:text-4xl font-extrabold leading-tight bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)] bg-clip-text text-transparent";

  const showcaseSubheadingClassName =
    "mt-2 text-lg md:text-lg font-normal leading-snug bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)] bg-clip-text text-transparent";

  const showcaseBodyClassName =
    "mt-1 md:mt-4 max-w-[430px] text-sm text-[#0B137A]";

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    return createGsapContext(showcaseRef, (gsap) => {
      const ScrollTrigger = window.ScrollTrigger;
      const rows = gsap.utils.toArray(".users-showcase-row");

      if (
        !ScrollTrigger ||
        !rows.length ||
        !pinPanelRef.current ||
        !showcaseRef.current ||
        !phoneScreensRef.current
      ) {
        return;
      }

      const totalSteps = rows.length - 1;

      gsap.set(rows, { position: "absolute", inset: 0 });
      gsap.set(rows, { autoAlpha: 0, yPercent: 14 });
      gsap.set(rows[0], { autoAlpha: 1, yPercent: 0 });
      gsap.set(phoneScreensRef.current, { yPercent: 0 });

      let currentIndex = 0;

      const showIndex = (nextIndex) => {
        if (nextIndex === currentIndex) return;

        gsap.killTweensOf(rows);
        gsap.killTweensOf(phoneScreensRef.current);

        gsap.to(rows[currentIndex], {
          autoAlpha: 0,
          yPercent: -12,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(rows[nextIndex], {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(phoneScreensRef.current, {
          yPercent: -(nextIndex * 100),
          duration: 0.7,
          ease: "power2.inOut",
          overwrite: "auto",
        });

        currentIndex = nextIndex;
      };

      ScrollTrigger.create({
        trigger: showcaseRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * rows.length}`,
        pin: pinPanelRef.current,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = gsap.utils.clamp(
            0,
            totalSteps,
            Math.floor(self.progress * (totalSteps + 1))
          );
          showIndex(idx);
        },
        onLeave: () => showIndex(totalSteps),
        onEnterBack: () => showIndex(currentIndex),
      });
    });
  }, []);

  return (
    <>
      <main className="relative isolate overflow-x-hidden overflow-y-clip bg-[#F4F4F8] pt-20 text-[#220A56] md:pt-24">
        <HeroWaveBackground />

        <section className="relative isolate h-[100vh] overflow-hidden pt-12 md:pt-16">
          <div className="relative z-10 mx-auto flex min-h-[65vh] max-w-6xl flex-col items-center justify-center px-6 text-center md:min-h-[70vh]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#282672]">
              INDIA&apos;S FIRST HEALTH IDENTITY INFRASTRUCTURE
            </p>

            <h1
              className="
                mx-auto mt-4 max-w-4xl
                text-5xl md:text-7xl
                font-extrabold
                leading-[1.05]
                tracking-[-0.02em]
                bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
                bg-clip-text text-transparent
              "
            >
              Sneak Peek of
              <br />
              What You Get
            </h1>

            <div className="mt-7 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="
                  group relative overflow-hidden rounded-xl p-[1.5px]
                  bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
                  shadow-[0_16px_38px_rgba(87,35,148,0.18)]
                  transition duration-300
                  hover:-translate-y-0.5 hover:brightness-110
                "
              >
                <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.3),transparent,rgba(255,255,255,0.28))] opacity-0 transition duration-500 group-hover:opacity-100 group-hover:animate-[shimmer_1.4s_ease-in-out]" />
                <span
                  className="
                    relative flex h-full w-full items-center justify-center gap-2
                    rounded-[10px]
                    bg-white/90
                    px-8 py-3
                    text-sm font-semibold
                    text-[#4D267F]
                    shadow-sm
                  "
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)] text-white shadow-[0_10px_24px_rgba(110,33,158,0.3)]">
                    <svg
                      className="ml-0.5 h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.5 3.8C4.5 2.97 5.4 2.45 6.12 2.87L12.18 6.57C12.88 6.99 12.88 8.01 12.18 8.43L6.12 12.13C5.4 12.55 4.5 12.03 4.5 11.2V3.8Z" />
                    </svg>
                  </span>
                  Watch Demo
                </span>
              </button>
            </div>

            <p className="mt-14 text-sm font-medium text-[#282672] md:text-base">
              See how the app works in just a few scrolls.
            </p>

            <div className="mt-10" aria-hidden="true">
              <svg
                className="scroll-indicator"
                width="30"
                height="36"
                viewBox="0 0 50 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="scroll-indicator-chevron"
                  d="M12 8L25 21L38 8"
                  stroke="#8F129A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ "--chevron-delay": "0s" }}
                />
                <path
                  className="scroll-indicator-chevron"
                  d="M12 24L25 37L38 24"
                  stroke="#BB79C7"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ "--chevron-delay": "0.2s" }}
                />
                <path
                  className="scroll-indicator-chevron"
                  d="M12 40L25 53L38 40"
                  stroke="#D9B8DD"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ "--chevron-delay": "0.4s" }}
                />
              </svg>
            </div>
          </div>
        </section>

        <section
          ref={showcaseRef}
          className="relative mx-auto mt-20 h-auto max-w-6xl bg-[#F4F4F8] px-6 sm:mt-20 md:mt-10 md:h-[400vh]"
        >
          <div
            ref={pinPanelRef}
            className="relative h-auto overflow-visible py-6 md:h-[100svh] md:overflow-hidden md:py-0"
          >
            {/* Shared desktop phone */}
            <div className="pointer-events-none hidden md:absolute md:right-0 md:top-1/2 md:z-20 md:block md:w-[240px] md:-translate-y-1/2">
              <PhoneMockup className="md:mx-0">
                <div
                  ref={phoneScreensRef}
                  className="absolute inset-0 flex flex-col will-change-transform"
                >
                  <div className="relative h-full min-h-full w-full shrink-0">
                    <PhoneScreenImage
                      src="/images/users/phone-mock-1.svg"
                      alt="Smart Health Overview mobile dashboard"
                      priority
                    />
                  </div>

                  <div className="relative h-full min-h-full w-full shrink-0">
                    <PhoneScreenImage
                      src="/images/users/phonemock2.svg"
                      alt="Discover nearby mobile dashboard"
                      priority
                    />
                  </div>

                  <div className="relative h-full min-h-full w-full shrink-0">
                    <PhoneScreenImage
                      src="/images/users/phonemock3.svg"
                      alt="Centralized Overview mobile dashboard"
                      priority
                    />
                  </div>
                </div>
              </PhoneMockup>
            </div>

            {/* Row 1 */}
            <div className="users-showcase-row relative grid items-start gap-8 px-0 py-0 md:absolute md:inset-0 md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:gap-12">
              <div>
                <h2 className={showcaseHeadingClassName}>Smart Health Overview</h2>

                <p className={showcaseSubheadingClassName}>
                  Track appointments, vitals, and daily health
                  <br />
                  insights in one place.
                </p>

                <p className={showcaseBodyClassName}>
                  A personalized multidimensional record of your ecosystem&apos;s
                  daily health journey, and your vital trends.
                </p>

                <RowPillIndicators activeIndex={0} />
              </div>

              {/* Mobile only */}
              <div className="mx-auto w-[185px] sm:w-[205px] md:hidden">
                <PhoneMockup>
                  <PhoneScreenImage
                    src="/images/users/phone-mock-1.svg"
                    alt="Smart Health Overview mobile dashboard"
                    priority
                  />
                </PhoneMockup>
              </div>
            </div>

            {/* Row 2 */}
            <div className="users-showcase-row relative mt-12 grid items-start gap-8 px-0 py-0 md:absolute md:inset-0 md:mt-0 md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:gap-12">
              <div>
                <h2 className={showcaseHeadingClassName}>
                  Discover Nearby
                  <br />
                  Healthcare Providers
                </h2>

                <p className={showcaseSubheadingClassName}>
                  Search doctors, labs, and hospitals around your
                  <br />
                  location.
                </p>

                <p className={showcaseBodyClassName}>
                  An interactive map-based directory to explore, view
                  availability, and book appointments with nearby providers.
                </p>

                <RowPillIndicators activeIndex={1} />
              </div>

              {/* Mobile only */}
              <div className="mx-auto w-[185px] sm:w-[205px] md:hidden">
                <PhoneMockup>
                  <PhoneScreenImage
                    src="/images/users/phonemock2.svg"
                    alt="Discover nearby mobile dashboard"
                    priority
                  />
                </PhoneMockup>
              </div>
            </div>

            {/* Row 3 */}
            <div className="users-showcase-row relative mt-12 grid items-start gap-8 px-0 py-0 md:absolute md:inset-0 md:mt-0 md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:gap-12">
              <div>
                <h2 className={showcaseHeadingClassName}>
                  Centralized Health
                  <br />
                  Records
                </h2>

                <p className={showcaseSubheadingClassName}>
                  Access appointments, lab reports, and hospital
                  <br />
                  documents anytime.
                </p>

                <p className={showcaseBodyClassName}>
                  A structured record management center for securely viewing and
                  managing essential reports with clarity.
                </p>

                <RowPillIndicators activeIndex={2} />
              </div>

              {/* Mobile only */}
              <div className="mx-auto w-[185px] sm:w-[205px] md:hidden">
                <PhoneMockup>
                  <PhoneScreenImage
                    src="/images/users/phonemock3.svg"
                    alt="Centralized Overview mobile dashboard"
                    priority
                  />
                </PhoneMockup>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Howitworks />
        </section>

        <style jsx>{`
          .users-pill-fill {
            background: linear-gradient(90deg, #9f028d 0%, #0e1896 100%);
            animation: pillFill 2.4s ease-in-out infinite;
            transform-origin: left;
          }

          @keyframes pillFill {
            0% {
              transform: scaleX(0.1);
              opacity: 0.7;
            }
            65% {
              transform: scaleX(1);
              opacity: 1;
            }
            100% {
              transform: scaleX(1);
              opacity: 1;
            }
          }

          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </main>

      <DemoVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
}