# Animaciones

> Sistema de animaciones con Framer Motion

---

## Overview

El proyecto usa **Framer Motion 12** para todas las animaciones, proporcionando:
- API declarativa integrada con React
- Animaciones de layout automáticas
- Gestures (hover, tap, drag)
- Exit animations con AnimatePresence

---

## Constantes de Animación

### Easing Functions

```typescript
// src/styles/animation.ts
export const EASE_ELITE = [0.22, 1, 0.36, 1];  // Expo out - suave y premium
export const EASE_SPRING = [0.16, 1, 0.3, 1];  // Para rebotes sutiles
```

### Duraciones

```typescript
export const DURATION = {
  fast: 0.3,      // Transiciones rápidas
  normal: 0.5,    // Transiciones estándar
  slow: 0.8,      // Transiciones lentas
  ambient: 8,     // Loops de fondo
};
```

---

## Variants Reutilizables

### Container Variants (Stagger)

```typescript
// src/styles/variants.ts
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
```

### Item Variants

```typescript
export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: 'blur(10px)',
  },
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
```

### Fade Variants

```typescript
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};
```

---

## Patrones de Uso

### Entrada con Stagger

```tsx
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/styles/variants';

const Section: React.FC = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 variants={itemVariants}>
        Título
      </motion.h2>
      <motion.p variants={itemVariants}>
        Descripción
      </motion.p>
      <motion.div variants={itemVariants}>
        <Button>CTA</Button>
      </motion.div>
    </motion.section>
  );
};
```

### Scroll-Triggered

```tsx
<motion.div
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.8, ease: EASE_ELITE }}
>
  Contenido que aparece al scroll
</motion.div>
```

### Hover Effects

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

### Exit Animations

```tsx
import { AnimatePresence, motion } from 'framer-motion';

const Modal: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          Modal content
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

---

## Animaciones Específicas

### Hover de Letras (Kinetic Text)

```tsx
const KineticChar: React.FC<{ char: string; index: number }> = ({ char, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -6 : 0,
        scale: isHovered ? 1.05 : 1,
        color: isHovered ? '#98e710' : '#ffffff',
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 0.8,
      }}
    >
      {char}
    </motion.span>
  );
};
```

### 3D Tilt en Cards

```tsx
const TiltCard: React.FC = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 20);
    y.set((e.clientY - centerY) / 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: y,
        rotateY: x,
        transformStyle: 'preserve-3d',
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};
```

### Ambient Lighting (Glows)

```tsx
<motion.div
  animate={{
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
  className="
    absolute top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    w-[800px] h-[800px]
    bg-primary/20
    rounded-full blur-[180px]
    pointer-events-none
  "
/>
```

### Page Transitions

```tsx
// src/components/layout/PageTransition.tsx
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_ELITE,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
```

---

## Accesibilidad

### Respetar Reduced Motion

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

const AnimatedComponent: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 60 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
    >
      Content
    </motion.div>
  );
};
```

### Hook useReducedMotion

```typescript
// src/hooks/useReducedMotion.ts
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
```

---

## Rendimiento

### Optimizar Animaciones

```tsx
// ✅ Animar propiedades baratas (transform, opacity)
animate={{ x: 100, opacity: 0.5 }}

// ❌ Evitar animar propiedades caras (width, height, layout)
animate={{ width: '100%' }}
```

### Layout Animations con Cuidado

```tsx
// Usar layoutId para transiciones de layout
<motion.div layoutId="card">
  {/* Content */}
</motion.div>

// O layout prop para auto-layout
<motion.div layout>
  {/* Content que cambia de tamaño */}
</motion.div>
```

### Memoizar Variants

```tsx
// ✅ Definir variants fuera del componente
const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Card: React.FC = () => (
  <motion.div variants={cardVariants} />
);

// ❌ Evitar crear variants inline
const Card: React.FC = () => (
  <motion.div variants={{ hidden: { opacity: 0 } }} />  // Se recrea cada render
);
```

---

## Debugging

### Visualizar Animaciones

```tsx
// Añadir outline temporal
<motion.div
  style={{ outline: '1px solid red' }}
  animate={{ x: 100 }}
>
```

### Ralentizar Animaciones

```tsx
// Duplicar duración para debug
<motion.div
  transition={{ duration: 2 }} // Normalmente 1
>
```

### Log de Animaciones

```tsx
<motion.div
  onAnimationStart={() => console.log('Animation started')}
  onAnimationComplete={() => console.log('Animation completed')}
>
```

---

## Recursos

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Motion Design Principles](https://material.io/design/motion/)
- [Easing Functions](https://easings.net/)

---

*Última actualización: Enero 2026*
