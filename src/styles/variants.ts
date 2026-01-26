/**
 * Centralized animation variants for Framer Motion
 * Extracted from Hero.tsx and HeroVideoB.tsx to eliminate duplication
 */

import { EASE_ELITE } from './animation';

// Container variants for staggered animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Alternative container with longer delay (for video heroes)
export const containerVariantsDelayed = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

// Standard item fade-in with blur
export const itemVariants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: EASE_ELITE,
    },
  },
};

// Title entrance with scale
export const titleVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: EASE_ELITE,
    },
  },
};

// Fade in from left
export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: EASE_ELITE,
    },
  },
};

// Fade in from right
export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: EASE_ELITE,
    },
  },
};

// Fade in from bottom
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_ELITE,
    },
  },
};

// Scale in
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: EASE_ELITE,
    },
  },
};

// Modal backdrop
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Modal content
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_ELITE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 30,
  },
};

// Ambient glow animation (reduced motion aware)
export const getAmbientGlowAnimation = (shouldReduceMotion: boolean) => ({
  animate: shouldReduceMotion
    ? { scale: 1, opacity: 0.3 }
    : {
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      },
  transition: shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
});
