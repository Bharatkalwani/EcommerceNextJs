import { useState, useEffect } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

interface Breakpoints {
  mobile: number; // max-width for mobile
  tablet: number; // max-width for tablet
  desktop: number; // min-width for desktop
}

const defaultBreakpoints: Breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
};

const useResponsive = (bps: Breakpoints = defaultBreakpoints) => {
  const [screen, setScreen] = useState<Breakpoint>(() => {
    if (typeof window === "undefined") return "desktop"; // SSR fallback
    const width = window.innerWidth;
    if (width <= bps.mobile) return "mobile";
    if (width <= bps.tablet) return "tablet";
    return "desktop";
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= bps.mobile) setScreen("mobile");
      else if (width <= bps.tablet) setScreen("tablet");
      else setScreen("desktop");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [bps]);

  return screen;
};

export default useResponsive;
