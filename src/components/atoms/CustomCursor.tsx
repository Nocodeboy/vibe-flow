import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';

const CustomCursor: React.FC = () => {
  const isMobile = useIsMobile();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    // Don't add event listeners on mobile/touch devices
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);

    const interactables = document.querySelectorAll('button, a, .hover-trigger');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, [cursorX, cursorY, isMobile]);

  // Don't render cursor on mobile/touch devices
  if (isMobile) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: isHovering ? '#98e710' : '#ffffff'
        }}
        animate={{
          scale: isHovering ? 3 : 1,
          opacity: 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9998]"
        style={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          borderColor: isHovering ? 'rgba(152, 231, 16, 0.5)' : 'rgba(255, 255, 255, 0.3)'
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5
        }}
        transition={{ type: 'spring', damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
