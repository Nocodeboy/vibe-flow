// Cubic bezier curve for the signature "Vibe Flow" managed stop
// This matches the "Elite Designer" prompt specification exactly.
// Origin: cubic-bezier(0.16, 1, 0.3, 1) - Expo Out / Snappy
export const EASE_ELITE = [0.16, 1, 0.3, 1];

// Standard durations to maintain rhythm
export const DURATION = {
    FAST: 0.3,
    NORMAL: 0.5,
    SLOW: 0.8,
    VERY_SLOW: 1.2
} as const;

export const TRANSITION_ELITE = {
    duration: DURATION.SLOW,
    ease: EASE_ELITE
};

export const TRANSITION_FAST = {
    duration: DURATION.FAST,
    ease: EASE_ELITE
};
