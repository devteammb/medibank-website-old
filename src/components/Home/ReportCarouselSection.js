"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { createGsapContext } from "@/lib/gsap";
import GradientBadge from "@/components/ui/GradientBadge";

const slides = [
  {
    image: "/images/img-carousel1.webp",
    alt: "Person checking old health messages on phone",
    title: "your prescription history exists only in WhatsApp forwards?",
    description: "Scattered across 47 chats. None backed up.",
  },
  {
    image: "/images/img-carousel2.webp",
    alt: "Family and doctor discussing care",
    title: "the ER doctor doesn't know you're allergic to penicillin?",
    description: "And your family is too panicked to remember.",
  },
  {
    image: "/images/img-carousel3.webp",
    alt: "Patient and physician in consultation room",
    title: "your latest scan stays in one clinic's local system?",
    description: "And treatment is delayed while records are requested.",
  },
  {
    image: "/images/img-carousel4.webp",
    alt: "Clinician searching through scattered records",
    title: "your reports are scattered when every second matters?",
    description: "Critical decisions can't wait for file hunting.",
  },
  {
    image: "/images/img-carousel5.webp",
    alt: "Clinician searching through scattered records",
    title: "your Allergy report is buried in old emails?",
    description: "Emergency care needs immediate facts, not guesses.",
  },
  {
    image: "/images/img-carousel6.webp",
    alt: "Clinician searching through scattered records",
    title: "your medical timeline is split across three hospitals?",
    description: "Fragmented records lead to repeated tests and delays.",
  },
  {
    image: "/images/img-carousel7.webp",
    alt: "Clinician searching through scattered records",
    title: "the one report that could save your life isn't available?",
    description: "A missing document can change everything.",
  },
];

const getCircularDistance = (from, to, total) => {
  const forward = (to - from + total) % total;
  const backward = (from - to + total) % total;
  return Math.min(forward, backward);
};

export default function ReportCarouselSection() {
  const [api, setApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const autoplayRef = useRef(null);
  const isHoveredRef = useRef(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    handleSelect();
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    autoplayRef.current = setInterval(() => {
      if (!isHoveredRef.current) {
        api.scrollNext();
      }
    }, 6500);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [api]);

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
      gsap.fromTo(
        ".report-intro",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        ".report-carousel",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".report-carousel",
            start: "top 82%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white pt-[70px] md:pt-[60px]"
    >
      <div className="mx-auto flex min-h-[calc(100svh-88px)] w-full max-w-[1440px] flex-col px-4 pb-6 md:px-6 lg:px-8">
        <div className="report-intro flex shrink-0 flex-col items-center text-center">
          <GradientBadge innerClassName="bg-white text-[#141E7A]">
            The Moment No One Thinks About
          </GradientBadge>

          <h2
            className="mt-4 max-w-[1100px] text-center font-medium leading-[1.06] tracking-[-0.03em] 
              bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
              bg-clip-text 
              text-transparent
              text-2xl md:text-4xl"
          >
            <span className="font-aptos-black">&apos;What if&apos;</span> the one report that could save your life...
          </h2>

          <p
            className="mt-3 max-w-[900px] text-center font-normal leading-[1.08] text-[#111D89] md:text-3xl"
          >
            wasn&apos;t there when you needed it?
          </p>
        </div>

        <div className="report-carousel mt-8 flex min-h-0 flex-1 flex-col items-start">
          <Carousel
            opts={{ align: "center", loop: true }}
            setApi={setApi}
            className="w-full"
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
              setHoveredIndex(null);
            }}
          >
            <CarouselContent className="-ml-4 items-stretch">
              {slides.map((slide, index) => {
                const distanceFromActive = getCircularDistance(activeIndex, index, slides.length);
                const isActive = distanceFromActive === 0;
                const isAdjacent = distanceFromActive === 1;
                const showMagentaBorder = isActive && hoveredIndex === index;

                return (
                  <CarouselItem
                    key={`${slide.title}-${index}`}
                    className="pl-4 basis-[90%] sm:basis-[72%] md:basis-[52%] lg:basis-1/3"
                  >
                    <article
                      className={[
                        "group relative mx-auto flex h-[50svh] w-full max-w-[330px] min-h-[360px] max-h-[540px] flex-col overflow-hidden rounded-[28px] border-2 bg-[#D9C6E3] p-3 transition-all duration-500 ease-out",
                        isActive
                          ? showMagentaBorder
                            ? "border-[#C2188F] shadow-[0_25px_50px_rgba(123,31,162,0.2)]"
                            : "border-[#BFC0E4] shadow-[0_20px_45px_rgba(17,29,137,0.12)]"
                          : "border-white/60 shadow-none",
                        isActive ? "scale-100 opacity-100" : isAdjacent ? "scale-[0.94] opacity-100" : "scale-[0.9] opacity-0 md:opacity-70",
                      ].join(" ")}
                      onMouseEnter={() => {
                        if (isActive) {
                          setHoveredIndex(index);
                        }
                      }}
                      onMouseLeave={() => {
                        if (hoveredIndex === index) {
                          setHoveredIndex(null);
                        }
                      }}
                    >
                      <div className="relative h-[66%] w-full overflow-hidden rounded-[24px]">
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 52vw, 90vw"
                        />
                      </div>

                      {!isActive && isAdjacent ? (
                        <div className="pointer-events-none absolute inset-0 z-10 rounded-[28px] bg-white/55 backdrop-blur-[1px]" />
                      ) : null}

                      <div className="relative z-20 flex flex-1 flex-col px-2 pb-2 pt-4">
                        <h3 className="text-[clamp(1.1rem,1.2vw,1.6rem)] font-aptos-black leading-[1.14] text-[#252B7F]">
                          What if{" "}
                          <span className="font-medium text-[#282672]">
                            {slide.title}
                          </span>
                        </h3>

                        <p className="mt-3 text-[clamp(0.95rem,0.95vw,1.08rem)] font-semibold leading-[1.35] text-[#282672]">
                          {slide.description}
                        </p>
                      </div>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          <div className="mt-6 flex w-full flex-col items-center gap-4 text-[#2230B4] md:mt-8">
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                className="transition hover:opacity-70"
                aria-label="Previous card"
              >
                <ArrowLeft size={24} />
              </button>

              <div className="flex items-center gap-2" aria-label="Carousel position indicators">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      activeIndex === index ? "w-6 bg-[#2230B4]" : "w-2 bg-[#8E95DC]"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => api?.scrollNext()}
                className="transition hover:opacity-70"
                aria-label="Next card"
              >
                <ArrowRight size={24} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
