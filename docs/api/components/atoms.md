# Atoms

> Componentes básicos e indivisibles

---

## Button

Botón con múltiples variantes visuales.

### Props

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

### Uso

```tsx
import Button from '@/components/atoms/Button';

// Primary (default)
<Button onClick={handleClick}>
  Enviar
</Button>

// Secondary
<Button variant="secondary">
  Cancelar
</Button>

// Con tamaño
<Button variant="primary" size="lg">
  CTA Grande
</Button>

// Deshabilitado
<Button disabled>
  No disponible
</Button>
```

### Variantes

| Variante | Estilo | Uso |
|----------|--------|-----|
| `primary` | Verde sólido | CTAs principales |
| `secondary` | Borde blanco | Acciones secundarias |
| `outline` | Solo borde | Acciones alternativas |
| `ghost` | Transparente | Acciones sutiles |
| `glass` | Glassmorphism | Efectos premium |

---

## Badge

Insignia para etiquetas y estados.

### Props

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'outline';
  className?: string;
}
```

### Uso

```tsx
import Badge from '@/components/atoms/Badge';

<Badge>Nuevo</Badge>
<Badge variant="primary">Activo</Badge>
<Badge variant="outline">Beta</Badge>
```

---

## Skeleton

Placeholder animado para estados de carga.

### Props

```typescript
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}
```

### Uso

```tsx
import Skeleton from '@/components/atoms/Skeleton';

// Texto
<Skeleton variant="text" width="200px" />

// Avatar
<Skeleton variant="circular" width={48} height={48} />

// Card
<Skeleton variant="rectangular" width="100%" height={200} />
```

---

## CustomCursor

Cursor personalizado que sigue el mouse.

### Props

```typescript
// No requiere props, se usa como wrapper global
```

### Uso

```tsx
import CustomCursor from '@/components/atoms/CustomCursor';

// En App.tsx o layout
<CustomCursor />
```

### Comportamiento

- **Default**: Círculo blanco pequeño
- **Hover**: Se agranda y cambia a verde
- **Click**: Animación de pulso
- **Mobile**: Se oculta automáticamente

---

## Magnetic

Wrapper que añade efecto magnético a elementos.

### Props

```typescript
interface MagneticProps {
  children: React.ReactNode;
  intensity?: number;  // Fuerza del efecto (default: 0.3)
  className?: string;
}
```

### Uso

```tsx
import Magnetic from '@/components/atoms/Magnetic';

<Magnetic intensity={0.5}>
  <Button>Botón magnético</Button>
</Magnetic>
```

---

## AnimatedCounter

Contador numérico con animación.

### Props

```typescript
interface AnimatedCounterProps {
  value: number;
  duration?: number;    // Duración en segundos
  prefix?: string;      // Ej: "$"
  suffix?: string;      // Ej: "+"
  className?: string;
}
```

### Uso

```tsx
import AnimatedCounter from '@/components/atoms/AnimatedCounter';

<AnimatedCounter value={500} suffix="+" />
// Muestra: 500+

<AnimatedCounter value={15000} prefix="$" duration={2} />
// Muestra: $15,000
```

---

## KineticChar

Carácter individual con animación de hover.

### Props

```typescript
interface KineticCharProps {
  char: string;
  index: number;
  baseColor?: string;
  hoverColor?: string;
}
```

### Uso

```tsx
import KineticChar from '@/components/atoms/KineticChar';

// Normalmente usado para crear texto animado
const text = "VIBE FLOW";
{text.split('').map((char, i) => (
  <KineticChar
    key={i}
    char={char}
    index={i}
    hoverColor="#98e710"
  />
))}
```

---

## Spotlight

Efecto de spotlight que sigue el cursor.

### Props

```typescript
interface SpotlightProps {
  size?: number;        // Tamaño del spotlight (default: 400)
  intensity?: number;   // Intensidad (default: 0.15)
  className?: string;
}
```

### Uso

```tsx
import Spotlight from '@/components/atoms/Spotlight';

<div className="relative">
  <Spotlight size={500} intensity={0.2} />
  <Card>Contenido con spotlight</Card>
</div>
```

---

## NoiseOverlay

Overlay con textura de ruido para efecto vintage.

### Props

```typescript
interface NoiseOverlayProps {
  opacity?: number;     // Opacidad (default: 0.03)
  className?: string;
}
```

### Uso

```tsx
import NoiseOverlay from '@/components/atoms/NoiseOverlay';

<section className="relative">
  <NoiseOverlay opacity={0.05} />
  {/* Contenido */}
</section>
```

---

## Mejores Prácticas

### Composición

```tsx
// ✅ Combinar atoms
<Magnetic>
  <Button variant="primary" size="lg">
    <Badge variant="primary">New</Badge>
    Explorar
  </Button>
</Magnetic>
```

### Accesibilidad

```tsx
// ✅ Siempre incluir aria-label cuando sea necesario
<Button aria-label="Cerrar modal">
  <X aria-hidden="true" />
</Button>
```

### Performance

```tsx
// ✅ Memoizar cuando recibe callbacks
const MemoizedButton = memo(Button);

<MemoizedButton onClick={stableCallback}>
  Click
</MemoizedButton>
```

---

*Última actualización: Enero 2026*
