# Vibe Flow - Componentes Reutilizables

> Catálogo de componentes UI del sistema de diseño.

---

## 🔘 Botones

### MagneticButton

Botón con efecto magnético que sigue el cursor.

```tsx
import { motion, useMotionValue } from 'framer-motion';

const MagneticButton = ({ children, className, href }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        x.set((clientX - center.x) * 0.35);
        y.set((clientY - center.y) * 0.35);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ x, y }}
            className={className}
        >
            {children}
        </motion.a>
    );
};
```

**Uso:**
```tsx
<MagneticButton 
    href="/services"
    className="px-10 py-5 rounded-full bg-primary text-black font-bold"
>
    Ver Servicios
</MagneticButton>
```

---

## ✨ Texto

### KineticChar

Letra individual con efecto hover de color y movimiento.

```tsx
const KineticChar: React.FC<{ char: string, baseColor: string }> = ({ char, baseColor }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverColor = baseColor === "#ffffff" ? "#98e710" : "#ffffff";

    return (
        <motion.span
            className="inline-block relative cursor-default select-none"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
                y: isHovered ? -6 : 0,
                scale: isHovered ? 1.05 : 1,
                color: isHovered ? hoverColor : baseColor,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
};
```

**Uso:**
```tsx
<h1 className="text-8xl font-display italic font-bold flex">
    {"VibeFlow".split("").map((char, i) => (
        <KineticChar key={i} char={char} baseColor="#ffffff" />
    ))}
</h1>
```

---

## 🃏 Cards

### ServiceCard (3D Tilt)

Card con efecto de inclinación 3D al mover el mouse.

```tsx
const ServiceCard = ({ service, index }) => {
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

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ 
                rotateX: y,
                rotateY: x,
                transformStyle: "preserve-3d"
            }}
            className="group relative"
        >
            <div className="
                relative h-full p-8 md:p-10 
                rounded-[2rem] 
                bg-gradient-to-br from-white/[0.03] to-white/[0.01] 
                border border-white/[0.06] 
                backdrop-blur-sm overflow-hidden
            ">
                {/* Hover gradient */}
                <div className="
                    absolute inset-0 
                    bg-gradient-to-br from-primary/10 to-transparent 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-500
                " />
                
                {/* Content with Z-depth */}
                <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
};
```

---

## 🏷️ Badges

### TechBadge

Badge con dot pulsante para indicar estado.

```tsx
const TechBadge = ({ text }) => (
    <div className="
        inline-flex items-center gap-3 
        px-6 py-2 
        rounded-full 
        border border-white/5 
        bg-white/[0.03] backdrop-blur-md 
        group cursor-default
        hover:border-white/10 hover:bg-white/[0.06] 
        transition-all duration-500
    ">
        {/* Pulsing dot */}
        <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </div>
        
        <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/70 group-hover:text-white transition-colors">
            {text}
        </span>
    </div>
);
```

---

## 🌈 Efectos de Fondo

### AmbientLighting

Glows animados de fondo para secciones hero.

```tsx
const AmbientLighting = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary glow - Green */}
        <motion.div
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="
                absolute top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2 
                w-[800px] h-[800px] 
                bg-primary/20 rounded-full blur-[180px]
            "
        />
        
        {/* Secondary glow */}
        <motion.div
            animate={{ 
                x: [0, 50, 0],
                y: [0, -30, 0],
                opacity: [0.2, 0.35, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="
                absolute -top-[20%] -right-[10%] 
                w-[600px] h-[600px] 
                bg-primary/15 rounded-full blur-[150px]
            "
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
);
```

---

## 📜 Scroll Indicator

Indicador de scroll animado para secciones hero.

```tsx
const ScrollIndicator = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent">
            <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-full h-1/2 bg-primary blur-[1px]"
            />
        </div>
    </motion.div>
);
```

---

## 🎯 Patrones de Animación

### Stagger Container

Para animar elementos hijos secuencialmente.

```tsx
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Uso
<motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
>
    <motion.div variants={itemVariants}>Item 1</motion.div>
    <motion.div variants={itemVariants}>Item 2</motion.div>
    <motion.div variants={itemVariants}>Item 3</motion.div>
</motion.div>
```

### Parallax con Scroll

```tsx
const { scrollYProgress } = useScroll({ 
    target: sectionRef, 
    offset: ["start start", "end start"] 
});

const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

<motion.div style={{ y, opacity }}>
    {/* Content with parallax */}
</motion.div>
```

---

## 📐 Layout Helpers

### Section Wrapper

```tsx
const Section = ({ children, className = "" }) => (
    <section className={`py-32 px-6 relative ${className}`}>
        <div className="max-w-7xl mx-auto relative z-10">
            {children}
        </div>
    </section>
);
```

### Section Header

```tsx
const SectionHeader = ({ label, title, subtitle }) => (
    <div className="text-center mb-20">
        <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
            {label}
        </span>
        <h2 className="text-4xl md:text-6xl font-display italic font-bold">
            {title} <span className="text-white/30">{subtitle}</span>
        </h2>
    </div>
);
```

---

*Última actualización: Enero 2026*
