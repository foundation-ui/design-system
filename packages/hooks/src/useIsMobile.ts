import React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile({ breakpoint }: { breakpoint?: number }) {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const mobileBreakpoint = breakpoint || MOBILE_BREAKPOINT;

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const onChange = () => setIsMobile(window.innerWidth < mobileBreakpoint);

    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < mobileBreakpoint);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
