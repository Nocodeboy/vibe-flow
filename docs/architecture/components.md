# Sistema de Componentes

> Arquitectura de componentes basada en Atomic Design

---

## Atomic Design

El proyecto implementa **Atomic Design**, una metodología que organiza los componentes en cinco niveles de abstracción:

```
┌─────────────────────────────────────────────────────────────────┐
│                         PAGES                                    │
│   Instancias concretas de templates con contenido real          │
│   Ejemplo: Home, Services, Contact                              │
├─────────────────────────────────────────────────────────────────┤
│                       TEMPLATES                                  │
│   Layouts de página que definen la estructura                   │
│   (Implícito en Pages en este proyecto)                         │
├─────────────────────────────────────────────────────────────────┤
│                       ORGANISMS                                  │
│   Secciones complejas compuestas de molecules y atoms           │
│   Ejemplo: Hero, Navbar, Footer, ContactSection                 │
├─────────────────────────────────────────────────────────────────┤
│                       MOLECULES                                  │
│   Grupos de atoms que funcionan como unidad                     │
│   Ejemplo: Card, FAQItem, TestimonialCard                       │
├─────────────────────────────────────────────────────────────────┤
│                         ATOMS                                    │
│   Elementos UI fundamentales e indivisibles                     │
│   Ejemplo: Button, Badge, Skeleton                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Atoms

### Descripción

Los **atoms** son los bloques de construcción más básicos. No se pueden descomponer más sin perder su función.

### Características

- Sin estado interno complejo
- Altamente reutilizables
- Props simples y bien definidas
- Estilizados con Tailwind

### Inventario de Atoms

#### Button

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}
```

**Variantes visuales:**

| Variante | Uso |
|----------|-----|
| `primary` | CTAs principales, acciones primarias |
| `secondary` | Acciones secundarias |
| `outline` | Acciones alternativas |
| `ghost` | Acciones sutiles |
| `glass` | Efecto glassmorphism |

#### Badge

```tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'outline';
}
```

#### Skeleton

```tsx
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}
```

#### CustomCursor

Cursor personalizado que:
- Se mueve con el mouse
- Cambia de color en hover (blanco → verde)
- Escala en elementos interactivos
- Se oculta en dispositivos touch

#### Magnetic

```tsx
interface MagneticProps {
  children: React.ReactNode;
  intensity?: number;
}
```

Wrapper que añade efecto magnético a elementos.

---

## Molecules

### Descripción

Las **molecules** son combinaciones de atoms que forman unidades funcionales más complejas.

### Características

- Composición de múltiples atoms
- Pueden tener estado interno simple
- Reutilizables en diferentes contextos
- Lógica de presentación encapsulada

### Inventario de Molecules

#### Card

```tsx
interface CardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'outline';
  className?: string;
  hover?: boolean;
}
```

**Estructura recomendada:**

```tsx
<Card variant="glass" hover>
  <div className="card-header">...</div>
  <div className="card-content">...</div>
  <div className="card-footer">...</div>
</Card>
```

#### FAQItem

```tsx
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}
```

Componente expandible con animación suave.

#### TestimonialCard

```tsx
interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  stat?: string;
  metric?: string;
}
```

#### ServiceCard

```tsx
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  onClick?: () => void;
}
```

Incluye efecto 3D tilt en hover.

#### BlogCard

```tsx
interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  image?: string;
}
```

---

## Organisms

### Descripción

Los **organisms** son secciones complejas que combinan molecules y atoms para crear partes significativas de la interfaz.

### Características

- Auto-contenidos
- Pueden conectarse a datos y estado
- Representan secciones completas de página
- Animaciones y transiciones complejas

### Inventario de Organisms

#### Navbar

```tsx
// No requiere props - usa React Router para navegación
```

Características:
- Sticky al scroll
- Mobile responsive (hamburger menu)
- Animación de entrada
- Enlaces activos destacados

#### Footer

Footer completo con:
- Logo
- Enlaces de navegación
- Redes sociales
- Copyright

Efecto "sticky reveal" en desktop.

#### Hero / HeroVideoB

Secciones hero con:
- Título animado (kinetic text)
- Subtítulo
- CTAs
- Ambient lighting (glows)
- Background opcional con video

#### ContactSection

Formulario completo con:
- Campos validados (nombre, email, mensaje)
- Rate limiting
- Estados de carga y éxito
- Animaciones de entrada

#### StackingProjects

Galería de proyectos con efecto de apilado al scroll:
- Scroll-triggered
- Cards que se apilan
- Links a detalle de proyecto

#### ServiceModal

Modal expandido de servicio:
- Focus trap para accesibilidad
- Animación de entrada/salida
- Cierre con Escape y click fuera

#### Testimonials

Sección de testimonios:
- Carousel o grid
- Animaciones staggered
- Responsive layout

---

## Layout Components

### Descripción

Componentes que definen la estructura y comportamiento global.

### SmoothScroll

```tsx
interface SmoothScrollProps {
  children: React.ReactNode;
}
```

Wrapper que implementa scroll suave con Lenis.

### PageTransition

```tsx
interface PageTransitionProps {
  children: React.ReactNode;
}
```

Animaciones de entrada/salida entre páginas.

### ErrorBoundary

```tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

Captura errores y muestra fallback.

### GlobalBackground

Fondos animados que cambian según el tema:
- `nebula`: Glows púrpura/azul
- `cyber`: Efectos verdes/neón
- `void`: Minimalista oscuro
- `warm`: Tonos cálidos
- `default`: Estándar

---

## Patrones de Componentes

### Props Interface Pattern

```tsx
// Siempre definir interface para props
interface ComponentProps {
  required: string;
  optional?: number;
  children?: React.ReactNode;
}

const Component: React.FC<ComponentProps> = ({ required, optional = 10, children }) => {
  // ...
};
```

### Composición Pattern

```tsx
// Preferir composición sobre configuración
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>

// En lugar de:
<Card
  title="Título"
  description="Descripción"
  content={...}
/>
```

### Render Props Pattern

```tsx
// Para lógica reutilizable
<Magnetic>
  {(ref) => <button ref={ref}>Click me</button>}
</Magnetic>
```

### Forward Ref Pattern

```tsx
// Para exponer refs
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <button ref={ref} {...props}>{children}</button>
  )
);
```

---

## Animaciones en Componentes

### Framer Motion Básico

```tsx
import { motion } from 'framer-motion';
import { itemVariants } from '@/styles/variants';

<motion.div
  variants={itemVariants}
  initial="hidden"
  animate="visible"
>
  Contenido animado
</motion.div>
```

### Stagger Children

```tsx
import { containerVariants, itemVariants } from '@/styles/variants';

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### Scroll-Triggered

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={itemVariants}
>
  Aparece al scroll
</motion.div>
```

---

## Testing de Componentes

### Estructura de Test

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Guía de Creación de Componentes

### Checklist para Nuevo Componente

1. **Definir el nivel** (atom, molecule, organism)
2. **Crear interface de props** con TypeScript
3. **Implementar versión básica** sin estilos
4. **Añadir estilos** con Tailwind
5. **Añadir animaciones** si aplica
6. **Verificar accesibilidad** (aria, keyboard)
7. **Escribir tests** básicos
8. **Documentar uso** en comentarios o Storybook

### Ejemplo Completo

```tsx
// src/components/atoms/Tag.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
  onClick?: () => void;
}

/**
 * Tag component for labels and categories.
 *
 * @example
 * <Tag variant="primary">React</Tag>
 */
const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  onClick,
}) => {
  const baseStyles = 'px-3 py-1.5 rounded-full text-xs uppercase tracking-wider';
  const variantStyles = {
    default: 'bg-white/5 border border-white/10 text-white/60',
    primary: 'bg-primary/10 border border-primary/30 text-primary',
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${onClick ? 'cursor-pointer' : ''}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.span>
  );
};

export default Tag;
```

---

*Última actualización: Enero 2026*
