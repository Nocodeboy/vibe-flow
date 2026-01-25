
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    suffix = '',
    prefix = '',
    duration = 2,
    className = ''
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hasAnimated, setHasAnimated] = useState(false);

    const spring = useSpring(0, {
        duration: duration * 1000,
        bounce: 0
    });

    const display = useTransform(spring, (current) =>
        Math.round(current).toLocaleString()
    );

    useEffect(() => {
        if (isInView && !hasAnimated) {
            spring.set(value);
            setHasAnimated(true);
        }
    }, [isInView, value, spring, hasAnimated]);

    return (
        <motion.span ref={ref} className={`inline-block font-display tabular-nums ${className}`}>
            {prefix}
            <motion.span>{display}</motion.span>
            {suffix}
        </motion.span>
    );
};

export default AnimatedCounter;
