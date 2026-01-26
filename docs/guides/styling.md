# Estilos y Tailwind CSS

> Sistema de estilos y configuración de Tailwind CSS

---

## Configuración de Tailwind

### Archivo de Configuración

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#98e710',
        background: '#030303',
        surface: '#0A0A0A',
      },
      fontFamily: {
        display: ['Space Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
};
```

---

## Sistema de Colores

### Paleta Principal

| Color | Hex | Variable | Uso |
|-------|-----|----------|-----|
| **Primary** | `#98e710` | `bg-primary` | CTAs, acentos, highlights |
| **Background** | `#030303` | `bg-background` | Fondo principal |
| **Surface** | `#0A0A0A` | `bg-surface` | Cards, elementos elevados |
| **Text** | `#fefefe` | `text-white` | Texto principal |

### Opacidades de Texto

```jsx
// Jerarquía de texto
<h1 className="text-white">Título principal</h1>           // 100%
<h2 className="text-white/60">Subtítulo</h2>               // 60%
<p className="text-white/40">Texto secundario</p>          // 40%
<span className="text-white/20">Texto terciario</span>     // 20%
```

### Opacidades de Primary

```jsx
// Usos del color primario
<button className="bg-primary">Botón sólido</button>           // 100%
<div className="bg-primary/20">Glow de fondo</div>             // 20%
<span className="bg-primary/10">Hover sutil</span>             // 10%
<div className="bg-primary/5">Ambient lighting</div>           // 5%
```

### Bordes

```jsx
// Sistema de bordes
<div className="border border-white/5">Borde sutil</div>
<div className="border border-white/10">Borde normal</div>
<div className="border border-white/20">Borde destacado</div>
<div className="border border-primary/30">Borde hover</div>
```

---

## Tipografía

### Familias

| Familia | Fuente | Uso |
|---------|--------|-----|
| `font-display` | Space Mono | Títulos, headlines |
| `font-body` | Inter | Párrafos, UI |

### Escala Tipográfica

```jsx
// Títulos
<h1 className="text-[18vw] md:text-[14vw] font-display italic font-bold">
  Hero
</h1>

<h2 className="text-5xl md:text-8xl font-display italic font-bold">
  Sección
</h2>

<h3 className="text-4xl md:text-6xl font-display italic font-bold">
  Subsección
</h3>

<h4 className="text-2xl md:text-3xl font-display italic font-bold">
  Card
</h4>

// Texto
<p className="text-xl md:text-2xl text-white/60 font-light">
  Lead paragraph
</p>

<p className="text-base text-white/40">
  Body text
</p>

// Labels
<span className="text-xs uppercase tracking-[0.2em] text-white/70">
  Caption
</span>

<span className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">
  Section label
</span>
```

### Características Tipográficas

```jsx
// Títulos siempre italic + bold
className="font-display italic font-bold"

// Tracking en títulos
className="tracking-tighter"  // Títulos grandes

// Tracking en labels
className="tracking-[0.2em]"  // Captions
className="tracking-[0.4em]"  // Labels

// Line height
className="leading-[0.85]"    // Títulos
className="leading-relaxed"   // Body text
```

---

## Espaciado

### Contenedores

```jsx
// Contenedor principal
<div className="max-w-7xl mx-auto px-6">

// Contenedor estrecho
<div className="max-w-4xl mx-auto px-6">
```

### Secciones

```jsx
// Sección estándar
<section className="py-32 px-6">

// Espacio entre header y contenido
<div className="mb-20">
```

### Border Radius

| Clase | Valor | Uso |
|-------|-------|-----|
| `rounded-lg` | 1.5rem | Cards pequeñas |
| `rounded-xl` | 2rem | Cards medianas |
| `rounded-[2rem]` | 2rem | Cards grandes |
| `rounded-full` | 9999px | Botones, badges |

---

## Componentes Predefinidos

### Botón Primary

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

### Botón Secondary

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

### Card Glass

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
    {children}
  </div>
</div>
```

### Badge

```jsx
<span className="
  inline-flex items-center gap-3
  px-6 py-2
  rounded-full
  border border-white/5
  bg-white/[0.03] backdrop-blur-md
">
  <span className="text-xs uppercase tracking-[0.2em] text-white/70">
    Texto
  </span>
</span>
```

### Tag/Pill

```jsx
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

## Efectos Visuales

### Glass Morphism

```css
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

```jsx
<div className="bg-white/[0.03] backdrop-blur-md border border-white/5">
```

### Button Glow

```jsx
<button className="
  hover:shadow-[0_0_60px_rgba(152,231,16,0.4)]
">
```

### Gradientes

```jsx
// Card hover gradient
<div className="bg-gradient-to-br from-primary/10 to-transparent" />

// Fade inferior
<div className="bg-gradient-to-b from-transparent to-black/40" />

// Viñeta radial
<div className="bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
```

### Selection Color

```css
::selection {
  background-color: rgba(152, 231, 16, 0.3);
  color: #ffffff;
}
```

---

## Responsive Design

### Breakpoints

| Breakpoint | Ancho | Clase |
|------------|-------|-------|
| sm | 640px | `sm:` |
| md | 768px | `md:` |
| lg | 1024px | `lg:` |
| xl | 1280px | `xl:` |
| 2xl | 1536px | `2xl:` |

### Patrones Comunes

```jsx
// Títulos responsivos
<h1 className="text-5xl md:text-8xl">

// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Spacing responsivo
<div className="p-6 md:p-10">

// Hero con viewport units
<h1 className="text-[18vw] md:text-[14vw]">

// Flex direction
<div className="flex flex-col md:flex-row">
```

---

## Orden de Clases

Seguir este orden para consistencia:

```jsx
className={`
  // 1. Layout
  flex flex-col relative

  // 2. Spacing
  mx-auto px-6 py-4

  // 3. Sizing
  w-full max-w-7xl h-auto

  // 4. Typography
  text-lg font-bold text-white/80

  // 5. Background & Border
  bg-surface border border-white/10 rounded-xl

  // 6. Effects
  shadow-lg backdrop-blur-sm

  // 7. Transitions
  transition-all duration-300

  // 8. States
  hover:bg-white/10 focus-visible:outline-2

  // 9. Responsive
  md:flex-row md:text-xl
`}
```

---

## CSS Personalizado

### Estilos Globales

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', sans-serif;
    background-color: #030303;
    color: #fefefe;
  }

  ::selection {
    background-color: rgba(152, 231, 16, 0.3);
    color: #ffffff;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

---

*Última actualización: Enero 2026*
