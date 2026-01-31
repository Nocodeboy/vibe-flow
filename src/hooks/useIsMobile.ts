import { useState } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Hook to detect if the device is mobile based on:
 * 1. Screen width (< 768px)
 * 2. Touch capability
 *
 * IMPORTANT: This value is determined ONCE on initial load and does NOT update
 * on window resize. This is intentional to prevent React crashes with framer-motion
 * MotionValues when components switch between mobile/desktop layouts.
 * 
 * For responsive layouts, use CSS media queries instead.
 */
export const useIsMobile = (): boolean => {
  const [isMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isSmallScreen || isTouchDevice;
  });

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

