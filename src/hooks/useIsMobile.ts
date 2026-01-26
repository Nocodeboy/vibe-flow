import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Hook to detect if the device is mobile based on:
 * 1. Screen width (< 768px)
 * 2. Touch capability
 *
 * Used to disable heavy animations and effects on mobile devices.
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT || 'ontouchstart' in window;
  });

  useEffect(() => {
    const checkMobile = () => {
      const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isSmallScreen || isTouchDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

/**
 * Static check for mobile - useful for initial render decisions
 * Does not update on resize.
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINT || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export default useIsMobile;
