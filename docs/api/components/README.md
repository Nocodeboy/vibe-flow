# Componentes

> Documentación de componentes React

---

## Arquitectura

El proyecto sigue **Atomic Design**:

```
Atoms      →  Elementos básicos indivisibles
     ↓
Molecules  →  Combinaciones de atoms
     ↓
Organisms  →  Secciones complejas
     ↓
Pages      →  Páginas completas
```

---

## Índice de Componentes

### [Atoms](./atoms.md)

| Componente | Descripción |
|------------|-------------|
| `Button` | Botón con variantes |
| `Badge` | Insignia/etiqueta |
| `Skeleton` | Placeholder de carga |
| `CustomCursor` | Cursor personalizado |
| `Magnetic` | Efecto magnético |
| `AnimatedCounter` | Contador animado |
| `KineticChar` | Carácter animado |
| `Spotlight` | Efecto spotlight |
| `NoiseOverlay` | Textura de ruido |

### [Molecules](./molecules.md)

| Componente | Descripción |
|------------|-------------|
| `Card` | Tarjeta con variantes |
| `FAQItem` | Item expandible de FAQ |
| `TestimonialCard` | Tarjeta de testimonio |
| `ServiceCard` | Tarjeta de servicio |
| `BlogCard` | Tarjeta de artículo |

### [Organisms](./organisms.md)

| Componente | Descripción |
|------------|-------------|
| `Navbar` | Barra de navegación |
| `Footer` | Pie de página |
| `Hero` | Sección hero |
| `ContactSection` | Formulario de contacto |
| `StackingProjects` | Galería de proyectos |
| `ServiceModal` | Modal de servicio |
| `Testimonials` | Sección de testimonios |
| `FAQSection` | Preguntas frecuentes |

---

## Convenciones

### Props Interface

```tsx
interface ComponentProps {
  required: string;
  optional?: number;
  children?: React.ReactNode;
}
```

### Export Default

```tsx
const Component: React.FC<Props> = (props) => {
  // ...
};

export default Component;
```

### Memoización

```tsx
import { memo } from 'react';

export default memo(Component);
```

---

*Última actualización: Enero 2026*
