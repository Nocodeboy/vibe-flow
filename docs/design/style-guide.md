# Vibe Flow - Guía de Estilos

> Sistema de diseño completo para la web de Vibe Flow. Nivel Awwwards.

---

## 🎨 Paleta de Colores

### Colores Principales

| Nombre | Hex | RGB | Uso |
|--------|-----|-----|-----|
| **Primary (Verde Lima)** | `#98e710` | `rgb(152, 231, 16)` | CTAs, acentos, hover states, highlights |
| **Background** | `#030303` | `rgb(3, 3, 3)` | Fondo principal de la app |
| **Surface** | `#0A0A0A` | `rgb(10, 10, 10)` | Cards, modales, elementos elevados |
| **Text** | `#fefefe` | `rgb(254, 254, 254)` | Texto principal |

### Opacidades de Texto

```css
text-white          /* 100% - Títulos principales */
text-white/60       /* 60%  - Subtítulos, texto destacado */
text-white/40       /* 40%  - Texto secundario, descripciones */
text-white/20       /* 20%  - Texto terciario, separadores */
```

### Opacidades de Primary

```css
bg-primary          /* 100% - Botones principales */
bg-primary/20       /* 20%  - Glows de fondo */
bg-primary/10       /* 10%  - Hovers sutiles */
bg-primary/5        /* 5%   - Ambient lighting */
```

### Bordes

```css
border-white/5      /* Bordes sutiles */
border-white/10     /* Bordes normales */
border-white/20     /* Bordes destacados */
border-primary/30   /* Bordes hover con color */
```

---

## ✍️ Tipografía

### Familias

| Familia | Fuente | Uso |
|---------|--------|-----|
| **Display** | `Space Mono, monospace` | Títulos, headlines, números grandes |
| **Body** | `Inter, sans-serif` | Texto de cuerpo, párrafos, UI |

### Estilos de Títulos

```css
/* Hero Principal */
.hero-title {
    @apply text-[18vw] md:text-[14vw] font-display italic font-bold tracking-tighter;
}

/* Sección Principal */
.section-title {
    @apply text-5xl md:text-8xl font-display italic font-bold;
}

/* Subsección */
.subsection-title {
    @apply text-4xl md:text-6xl font-display italic font-bold;
}

/* Card Title */
.card-title {
    @apply text-2xl md:text-3xl font-display italic font-bold;
}
```

### Estilos de Texto

```css
/* Body grande */
.text-lead {
    @apply text-xl md:text-2xl text-white/60 font-light leading-relaxed;
}

/* Body normal */
.text-body {
    @apply text-base text-white/40 leading-relaxed;
}

/* Caption / Tags */
.text-caption {
    @apply text-xs uppercase tracking-[0.2em] font-medium text-white/70;
}

/* Label de sección */
.section-label {
    @apply text-primary font-bold uppercase tracking-[0.4em] text-[10px];
}
```

---

## 📐 Espaciado y Layout

### Contenedores

```css
.container-max {
    @apply max-w-7xl mx-auto px-6;
}

.container-narrow {
    @apply max-w-4xl mx-auto px-6;
}
```

### Espaciado de Secciones

```css
/* Sección estándar */
.section-spacing {
    @apply py-32 px-6;
}

/* Espacio entre header y contenido */
.section-header-gap {
    @apply mb-20;
}
```

### Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-lg` | `1.5rem` | Cards pequeñas |
| `rounded-xl` | `2rem` | Cards medianas |
| `rounded-2xl` | `2.5rem` | Cards grandes |
| `rounded-full` | `9999px` | Botones, badges, pills |

---

## 🎭 Componentes

### Botones

#### Primary CTA

```jsx
<button className="
    px-10 py-5 
    rounded-full 
    bg-primary text-black 
    font-bold uppercase tracking-widest text-sm 
    hover:shadow-[0_0_60px_rgba(152,231,16,0.4)] 
    transition-all duration-500
">
    Texto del Botón
</button>
```

#### Secondary CTA

```jsx
<button className="
    px-10 py-4 
    rounded-full 
    border border-white/20 
    bg-white/5 backdrop-blur-md 
    text-white font-bold uppercase tracking-widest text-xs 
    hover:bg-white hover:text-black 
    transition-all duration-500
">
    Texto del Botón
</button>
```

### Cards

#### Premium Card con Glass Effect

```jsx
<div className="
    relative p-8 
    rounded-[2rem] 
    bg-gradient-to-br from-white/[0.03] to-white/[0.01] 
    border border-white/[0.06] 
    backdrop-blur-sm 
    overflow-hidden
    group
">
    {/* Gradient hover */}
    <div className="
        absolute inset-0 
        bg-gradient-to-br from-primary/10 to-transparent 
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-500
    " />
    
    {/* Content */}
    <div className="relative z-10">
        ...
    </div>
</div>
```

### Badges / Pills

```jsx
{/* Tech Badge */}
<span className="
    inline-flex items-center gap-3 
    px-6 py-2 
    rounded-full 
    border border-white/5 
    bg-white/[0.03] backdrop-blur-md
">
    <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/70">
        Texto
    </span>
</span>

{/* Tag pequeño */}
<span className="
    px-3 py-1.5 
    rounded-full 
    bg-white/[0.03] 
    border border-white/[0.06] 
    text-[11px] uppercase tracking-wider text-white/50
">
    Tag
</span>
```

---

## ✨ Animaciones

### Easing Curves

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);  /* Entradas suaves */
--ease-spring: cubic-bezier(0.22, 1, 0.36, 1);   /* Movimientos naturales */
```

### Framer Motion Variants

#### Entrada con Stagger

```jsx
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
```

#### Hover de Letras Kinéticas

```jsx
animate={{
    y: isHovered ? -6 : 0,
    scale: isHovered ? 1.05 : 1,
    color: isHovered ? hoverColor : baseColor,
}}
transition={{ 
    type: "spring", 
    stiffness: 200, 
    damping: 20,
    mass: 0.8
}}
```

#### 3D Tilt en Cards

```jsx
const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 20);
    y.set((e.clientY - centerY) / 20);
};

<motion.div
    style={{ 
        rotateX: y,
        rotateY: x,
        transformStyle: "preserve-3d"
    }}
>
```

### Transiciones CSS

```css
/* Transición estándar */
transition-all duration-500

/* Transición rápida */
transition-all duration-300

/* Transición premium para hovers */
transition-all duration-500 ease-[0.16,1,0.3,1]
```

---

## 🌟 Efectos Especiales

### Ambient Lighting (Glows de Fondo)

```jsx
{/* Glow principal */}
<motion.div
    animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
    }}
    transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut" 
    }}
    className="
        absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 
        w-[800px] h-[800px] 
        bg-primary/20 
        rounded-full blur-[180px]
    "
/>
```

### Glass Morphism

```css
.glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
}
```

### Button Glow on Hover

```css
hover:shadow-[0_0_60px_rgba(152,231,16,0.4)]
hover:shadow-[0_0_80px_rgba(152,231,16,0.5)]  /* Más intenso */
```

### Gradient Overlays

```jsx
{/* Fade to bottom */}
<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

{/* Radial vignette */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
```

---

## 🖱️ Cursor Personalizado

```jsx
const CustomCursor = () => {
    // Cursor principal - cambia a verde en hover
    <motion.div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-[9999]"
        style={{ 
            backgroundColor: isHovering ? '#98e710' : '#ffffff'
        }}
        animate={{
            scale: isHovering ? 3 : 1,
        }}
    />
    
    // Anillo exterior
    <motion.div
        className="fixed w-8 h-8 border rounded-full pointer-events-none z-[9998]"
        style={{
            borderColor: isHovering ? 'rgba(152, 231, 16, 0.5)' : 'rgba(255, 255, 255, 0.3)'
        }}
    />
};
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first */
sm: 640px   /* @media (min-width: 640px) */
md: 768px   /* @media (min-width: 768px) */
lg: 1024px  /* @media (min-width: 1024px) */
xl: 1280px  /* @media (min-width: 1280px) */
2xl: 1536px /* @media (min-width: 1536px) */
```

### Patrones Responsive Comunes

```jsx
{/* Títulos */}
text-5xl md:text-8xl

{/* Grid */}
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

{/* Spacing */}
p-6 md:p-10

{/* Hero title viewport units */}
text-[18vw] md:text-[14vw]
```

---

## 📁 Estructura de Archivos de Estilos

```
src/
├── index.css           # Tailwind imports + base styles
├── styles/
│   └── tokens.css      # CSS variables y tokens
└── tailwind.config.js  # Configuración de Tailwind
```

---

## ✅ Checklist de Calidad Awwwards

- [ ] Animaciones suaves con easing adecuado
- [ ] Efectos de hover en todos los elementos interactivos
- [ ] Transiciones entre páginas fluidas
- [ ] Cursor personalizado reactivo
- [ ] Glows y ambient lighting en secciones hero
- [ ] Tipografía con contraste jerárquico
- [ ] Cards con efectos 3D/parallax
- [ ] Glass morphism donde aplique
- [ ] Responsive perfecto en todos los breakpoints
- [ ] Microinteracciones en botones y links
- [ ] Scroll-triggered animations
- [ ] Loading states elegantes

---

*Última actualización: Enero 2026*
