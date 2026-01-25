# Vibe Flow — Brand Guidelines

> Manual de identidad visual y sistema de diseño para Vibe Flow.

---

## 1. Marca

### 1.1 Nombre
**Vibe Flow** — siempre escrito con espacio, capitalizado.

### 1.2 Tagline
*"La comunidad de élite para creadores digitales"*

### 1.3 Propuesta de Valor
Automatización e IA que transforma negocios. Aprende con la comunidad o contrata a nuestro equipo.

---

## 2. Logo

### 2.1 Versión Principal
```
VF.
```
- Tipografía: **Space Mono** (italic, bold)
- El punto es parte del logo
- Color: Blanco sobre fondo oscuro

### 2.2 Uso del Logo
| Contexto | Versión |
|----------|---------|
| Navbar | `VF.` con punto verde |
| Favicon | `VF` en cuadrado |
| Redes sociales | Logo completo centrado |

### 2.3 Espacio de Respeto
Mínimo de 1x la altura de la "V" alrededor del logo.

---

## 3. Colores

### 3.1 Paleta Principal

| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| **Primary** | `#98e710` | `152, 231, 16` | CTAs, acentos, hover, highlights |
| **Background** | `#030303` | `3, 3, 3` | Fondo principal |
| **Surface** | `#0A0A0A` | `10, 10, 10` | Cards, elementos elevados |
| **Text** | `#fefefe` | `254, 254, 254` | Texto principal |

### 3.2 Opacidades

```
Texto:
  100% → Títulos principales
  60%  → Subtítulos
  40%  → Texto secundario
  20%  → Texto terciario

Primary:
  100% → Botones
  30%  → Glows
  10%  → Hover sutiles
  5%   → Ambient lighting

Bordes:
  border-white/5   → Sutil
  border-white/10  → Normal
  border-primary/30 → Hover
```

### 3.3 Gradientes

```css
/* Card hover */
bg-gradient-to-br from-primary/10 to-transparent

/* Fade inferior */
bg-gradient-to-b from-transparent to-black/40

/* Viñeta radial */
bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]
```

---

## 4. Tipografía

### 4.1 Familias

| Tipo | Fuente | Peso | Uso |
|------|--------|------|-----|
| **Display** | Space Mono | Bold Italic | Títulos, headlines |
| **Body** | Inter | Regular, Light | Párrafos, UI |

### 4.2 Escala Tipográfica

```
Hero:        text-[18vw] md:text-[14vw]
Sección:     text-5xl md:text-8xl
Subsección:  text-4xl md:text-6xl
Card:        text-2xl md:text-3xl
Lead:        text-xl md:text-2xl
Body:        text-base
Caption:     text-xs uppercase tracking-[0.2em]
Label:       text-[10px] uppercase tracking-[0.4em]
```

### 4.3 Características

- Títulos: **Italic + Bold** siempre
- Tracking apretado en títulos: `tracking-tighter`
- Tracking ancho en labels: `tracking-[0.4em]`
- Line height: `leading-[0.85]` para títulos, `leading-relaxed` para cuerpo

---

## 5. Espaciado

### 5.1 Contenedores

```
Max width:    max-w-7xl (1280px)
Padding:      px-6
Narrow:       max-w-4xl
```

### 5.2 Secciones

```
Vertical:     py-32
Header gap:   mb-20
Card gap:     gap-6 md:gap-8
```

### 5.3 Border Radius

```
Pequeño:   rounded-lg (1.5rem)
Mediano:   rounded-xl (2rem)
Grande:    rounded-[2rem]
Full:      rounded-full (pills, botones)
```

---

## 6. Componentes

### 6.1 Botones

**Primary CTA**
```jsx
className="
  px-10 py-5 rounded-full 
  bg-primary text-black 
  font-bold uppercase tracking-widest text-sm 
  hover:shadow-[0_0_60px_rgba(152,231,16,0.4)]
"
```

**Secondary CTA**
```jsx
className="
  px-10 py-4 rounded-full 
  border border-white/20 bg-white/5 backdrop-blur-md 
  text-white font-bold uppercase tracking-widest text-xs 
  hover:bg-white hover:text-black
"
```

### 6.2 Cards

```jsx
className="
  p-8 rounded-[2rem] 
  bg-gradient-to-br from-white/[0.03] to-white/[0.01] 
  border border-white/[0.06] 
  backdrop-blur-sm
"
```

### 6.3 Badges

```jsx
// Con dot pulsante
<div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.03]">
  <span className="animate-ping absolute h-2 w-2 rounded-full bg-primary opacity-75" />
  <span className="relative h-2 w-2 rounded-full bg-primary" />
  <span className="text-xs uppercase tracking-[0.2em]">Texto</span>
</div>
```

### 6.4 Tags/Pills

```jsx
className="
  px-3 py-1.5 rounded-full 
  bg-white/[0.03] border border-white/[0.06] 
  text-[11px] uppercase tracking-wider text-white/50
"
```

---

## 7. Animaciones

### 7.1 Easing

```
Expo out:   cubic-bezier(0.16, 1, 0.3, 1)
Spring:     cubic-bezier(0.22, 1, 0.36, 1)
```

### 7.2 Duraciones

```
Rápida:    300ms
Normal:    500ms
Lenta:     800ms - 1000ms
Ambient:   8s - 12s (loops)
```

### 7.3 Patrones de Entrada

```jsx
// Stagger container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

// Item con blur
const itemVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};
```

### 7.4 Hover de Letras

```jsx
animate={{
  y: isHovered ? -6 : 0,
  scale: isHovered ? 1.05 : 1,
  color: isHovered ? hoverColor : baseColor
}}
transition={{ type: "spring", stiffness: 200, damping: 20 }}
```

### 7.5 3D Tilt en Cards

```jsx
onMouseMove: rotateX/Y basado en posición del cursor
transformStyle: "preserve-3d"
Intensidad: dividir por 20
```

---

## 8. Efectos

### 8.1 Ambient Lighting

Glows animados de fondo en secciones hero:
- Tamaño: 500px - 800px
- Blur: 120px - 180px
- Opacidad: 0.2 - 0.5
- Animación: scale + opacity con duración 8-12s

### 8.2 Glass Morphism

```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.05);
```

### 8.3 Button Glow

```css
hover:shadow-[0_0_60px_rgba(152,231,16,0.4)]
```

### 8.4 Selection Color

```css
::selection {
  background-color: rgba(152, 231, 16, 0.3);
  color: #ffffff;
}
```

---

## 9. Cursor Personalizado

- **Default**: Círculo blanco 4px
- **Hover**: Verde (#98e710), scale 3x
- **Anillo exterior**: 8px, borde sutil, desaparece en hover
- Z-index: 9999

---

## 10. Responsive

### 10.1 Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### 10.2 Patrones Comunes

```jsx
// Títulos
text-5xl md:text-8xl

// Grid
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

// Hero viewport units
text-[18vw] md:text-[14vw]
```

---

## 11. Voz y Tono

### 11.1 Personalidad
- **Directo**: Sin rodeos, al grano
- **Técnico pero accesible**: Expertise sin arrogancia
- **Ambicioso**: Aspiracional, premium
- **Confiable**: Datos concretos, sin humo

### 11.2 Idioma
- **Español natural**: Evitar anglicismos innecesarios
- **Excepciones**: IA, CRM, API (términos técnicos universales)
- **Traducciones**:
  - Build in Public → Aprender haciendo
  - Templates → Plantillas
  - Coffee Hours → Cafés virtuales
  - Leads → Proyectos / Oportunidades

### 11.3 Frases Clave
- "La comunidad de élite para creadores digitales"
- "Lo hacemos por ti"
- "Nunca volverás a construir solo"
- "Sin código, sin límites"

---

## 12. Assets

### 12.1 Estructura de Archivos

```
src/
├── index.css           # Tailwind + base styles
├── styles/
│   └── tokens.css      # CSS variables
├── components/
│   ├── layout/         # Navbar, Footer
│   ├── sections/       # Hero, Cards, etc.
│   └── effects/        # Cursor, Background
└── tailwind.config.js
```

### 12.2 Fuentes

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
```

---

## 13. Checklist Awwwards

- [ ] Animaciones suaves con easing adecuado
- [ ] Hover en todos los elementos interactivos
- [ ] Cursor personalizado reactivo
- [ ] Glows y ambient lighting
- [ ] Tipografía con jerarquía clara
- [ ] Cards con efectos 3D/parallax
- [ ] Glass morphism
- [ ] Responsive perfecto
- [ ] Microinteracciones en botones
- [ ] Scroll-triggered animations
- [ ] Transiciones de página fluidas

---

*Última actualización: Enero 2026*
