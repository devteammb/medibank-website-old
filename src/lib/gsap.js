export const createGsapContext = (containerRef, setupAnimations) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  let ctx;
  let intervalId;

  const init = () => {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger) return false;

    gsap.registerPlugin(ScrollTrigger);
    ctx = gsap.context(() => setupAnimations(gsap), containerRef);
    return true;
  };

  if (!init()) {
    intervalId = window.setInterval(() => {
      if (init()) {
        window.clearInterval(intervalId);
      }
    }, 120);
  }

  return () => {
    if (intervalId) {
      window.clearInterval(intervalId);
    }
    if (ctx) {
      ctx.revert();
    }
  };
};
