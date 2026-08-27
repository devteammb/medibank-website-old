"use client";

import Image from "next/image";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GradientBadge from "../ui/GradientBadge";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const stories = [
  {
    title: "Pacemaker at 22?",
    description:
      "Her complete medical history was unavailable. A crucial report - showing that her symptoms were a medication side effect, not a heart condition - was missing because she did not carry it.",
    highlight: "MediBank prevents this.",
    image: "/images/story1.webp",
  },
  {
    title: "Unconscious in ER",
    description:
      "The patient arrived unconscious in ER with no accompanying files or no access to past diagnostics. Doctors lost precious minutes before understanding his blood group and pre-existing conditions.",
    highlight: "MediBank prevents this.",
    image: "/images/story2.webp",
  },
  {
    title: "Critical allergy missed",
    description:
      "A life-threatening allergy was buried in old records at another facility. With no instant visibility, treatment decisions became risky in a critical moment.",
    highlight: "MediBank prevents this.",
    image: "/images/story3.webp",
  },
];

const Realconsequences = () => {
  const [api, setApi] = React.useState(null);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const getSlidePosition = (index) => {
    const distance = (index - current + stories.length) % stories.length;
    return distance > stories.length / 2 ? distance - stories.length : distance;
  };

  return (
    <section className="overflow-hidden bg-white py-14 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center px-4">
          <GradientBadge innerClassName="bg-white text-[#2A2FAE] border border-[#F2A400] px-6 py-1 font-semibold">
            Real Consequences
          </GradientBadge>

          <h2
            className="
              mt-4 md:mt-6
              text-2xl md:text-4xl
              font-medium
              bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
              bg-clip-text
              text-transparent
            "
          >
            These stories happen <span className="font-aptos-black">every day</span> in hospitals across India
          </h2>

          <p className="mt-2 text-base md:mt-3 md:text-3xl text-[#111D89]">How MediBank Fixes Them</p>
        </div>

        <div className="relative mt-14 md:mt-20">
          <div className="pointer-events-none absolute inset-x-[15%] bottom-4 h-28 rounded-full bg-[#D8D9FF]/60 blur-3xl" />
          <Carousel
            opts={{ align: "center", loop: true, skipSnaps: false, dragFree: false }}
            setApi={setApi}
            className="w-full cursor-grab overflow-visible active:cursor-grabbing [&>div]:overflow-visible"
            aria-label="Real consequences stories"
          >
            <CarouselContent className="-ml-0 items-stretch overflow-visible py-12 md:py-16">
              {stories.map((story, index) => {
                const position = getSlidePosition(index);
                const isActive = position === 0;

                return (
                  <CarouselItem
                    key={story.title}
                    aria-label={`${index + 1} of ${stories.length}`}
                    aria-current={isActive ? "true" : undefined}
                    className="basis-[84%] px-2 sm:basis-[76%] md:basis-[68%] md:px-4 lg:basis-[62%]"
                  >
                    <article
                      className={`relative min-h-[390px] overflow-visible rounded-[28px] border border-[#BFC3FF]/60 bg-[linear-gradient(135deg,#F7F5FF_0%,#E6E2FA_100%)] px-6 pb-20 pt-24 shadow-[0_24px_70px_rgba(25,31,133,0.16)] transition-[transform,opacity,filter,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:ml-[100px] md:min-h-[330px] md:px-10 md:pb-20 md:pt-10 lg:ml-[140px] lg:pl-[190px] ${
                      isActive
                        ? "z-20 scale-100 rotate-0 opacity-100"
                        : position < 0
                          ? "z-10 -translate-y-1 rotate-[-5deg] scale-[0.91] opacity-70 saturate-[.8]"
                          : "z-10 -translate-y-1 rotate-[5deg] scale-[0.91] opacity-70 saturate-[.8]"
                    }`}
                    >
                    {/* Image */}
                    <div
                      className="
                        absolute left-1/2 top-[-36px] z-30
                        -translate-x-1/2
                        h-[116px] w-[116px] overflow-hidden rounded-[22px] border-[6px] border-white shadow-[0_16px_35px_rgba(14,24,150,0.2)]
                        md:left-[-100px] md:top-1/2 md:h-[250px] md:w-[250px] md:-translate-y-1/2 md:translate-x-0 md:rounded-[26px]
                        lg:left-[-90px]
                      "
                    >
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        sizes="(max-width: 768px) 108px, 250px"
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <h3 className="text-xl font-semibold text-[#0E1463] md:text-2xl">
                        {story.title}
                      </h3>

                      <p className="text-sm leading-6 text-[#141B63] md:max-w-2xl md:text-xl md:leading-relaxed">
                        {story.description}
                      </p>
                    </div>

                    <p
                      className="
                        absolute bottom-6 right-6
                        text-base font-semibold
                        md:text-2xl
                        bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
                        bg-clip-text text-transparent
                      "
                    >
                      | {story.highlight}
                    </p>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>


          <div className="mt-5 md:mt-8 flex items-center justify-center gap-4 md:gap-6 text-[#2230B4]">
            <button
              onClick={() => api?.scrollPrev()}
              className="grid h-11 w-11 place-items-center rounded-full border border-[#2230B4]/20 bg-white shadow-sm transition duration-300 hover:-translate-x-1 hover:bg-[#EEF0FF]"
              aria-label="Previous story"
            >
              <ArrowLeft size={24} />
            </button>

            <div className="flex items-center gap-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to story ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    current === index ? "w-6 bg-[#2230B4]" : "w-2 bg-[#8E95DC]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => api?.scrollNext()}
              className="grid h-11 w-11 place-items-center rounded-full border border-[#2230B4]/20 bg-white shadow-sm transition duration-300 hover:translate-x-1 hover:bg-[#EEF0FF]"
              aria-label="Next story"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Realconsequences;