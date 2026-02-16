import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { isMobileDevice } from '../../hooks/useIsMobile';

interface SmoothScrollProps {
    children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    useEffect(() => {
        // Disable Lenis on mobile for better performance
        // Native scroll is optimized by browsers for touch devices
        if (isMobileDevice()) {
            return;
        }

        const lenis = new Lenis({
            // Use lerp instead of duration — avoids forced reflow from measureScroll
            lerp: 0.1,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 2,
            autoResize: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
