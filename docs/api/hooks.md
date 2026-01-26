# Hooks

> Custom React hooks del proyecto

---

## useSEO

Gestiona meta tags y SEO de forma dinámica.

### Firma

```typescript
interface SEOConfig {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noindex?: boolean;
}

function useSEO(config: SEOConfig): void
```

### Uso

```tsx
import { useSEO } from '@/hooks/useSEO';

const HomePage: React.FC = () => {
  useSEO({
    title: 'Vibe Flow | Comunidad de Creadores Digitales',
    description: 'La comunidad de élite para VibeCoders, NoCoders y Automatizadores.',
    ogImage: '/images/og-home.jpg',
  });

  return <main>...</main>;
};
```

### Para Artículos de Blog

```tsx
useSEO({
  title: `${post.title} | Blog Vibe Flow`,
  description: post.excerpt,
  ogType: 'article',
  ogImage: post.image,
  canonical: `https://vibeflow.es/blog/${post.slug}`,
});
```

### Características

- Actualiza `<title>` y meta tags
- Open Graph tags (og:title, og:description, etc.)
- Twitter Card tags
- Canonical URL
- Limpieza automática al desmontar

---

## useFocusTrap

Atrapa el foco dentro de un elemento (para modales).

### Firma

```typescript
function useFocusTrap<T extends HTMLElement>(
  isActive: boolean
): React.RefObject<T>
```

### Uso

```tsx
import { useFocusTrap } from '@/hooks/useFocusTrap';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Título del Modal</h2>
      <p>Contenido...</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};
```

### Comportamiento

1. Cuando `isActive` es `true`:
   - Enfoca el primer elemento focusable
   - Tab cicla dentro del contenedor
   - Shift+Tab cicla en reversa
2. Cuando `isActive` es `false`:
   - El trap se desactiva
   - Focus se comporta normalmente

### Elementos Focusables

Detecta automáticamente:
- `button`
- `[href]`
- `input`
- `select`
- `textarea`
- `[tabindex]:not([tabindex="-1"])`

---

## useReducedMotion

Detecta la preferencia de movimiento reducido del usuario.

### Firma

```typescript
function useReducedMotion(): boolean
```

### Uso

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion } from 'framer-motion';

const AnimatedSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
    >
      Contenido
    </motion.div>
  );
};
```

### Con Framer Motion Variants

```tsx
const prefersReducedMotion = useReducedMotion();

const variants = {
  hidden: prefersReducedMotion ? {} : { opacity: 0, y: 60 },
  visible: prefersReducedMotion
    ? {}
    : {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      },
};
```

### Comportamiento

- Escucha `prefers-reduced-motion: reduce`
- Se actualiza si el usuario cambia la preferencia
- Retorna `true` si prefiere movimiento reducido

---

## useIsMobile

Detecta si el viewport es móvil.

### Firma

```typescript
function useIsMobile(breakpoint?: number): boolean
```

### Uso

```tsx
import { useIsMobile } from '@/hooks/useIsMobile';

const ResponsiveComponent: React.FC = () => {
  const isMobile = useIsMobile(); // Default: 768px

  return (
    <div>
      {isMobile ? (
        <MobileNavigation />
      ) : (
        <DesktopNavigation />
      )}
    </div>
  );
};
```

### Con Breakpoint Personalizado

```tsx
// Considerar móvil hasta 1024px
const isMobile = useIsMobile(1024);
```

### Comportamiento

- Escucha cambios de viewport
- Se actualiza en resize
- SSR-safe (retorna `false` inicialmente)

---

## Creando Nuevos Hooks

### Estructura Recomendada

```typescript
// src/hooks/useCustomHook.ts
import { useState, useEffect, useCallback } from 'react';

interface UseCustomHookOptions {
  option1?: string;
  option2?: number;
}

interface UseCustomHookReturn {
  value: string;
  setValue: (v: string) => void;
  isLoading: boolean;
}

export function useCustomHook(
  options: UseCustomHookOptions = {}
): UseCustomHookReturn {
  const { option1 = 'default', option2 = 10 } = options;

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Effect logic
  }, [option1, option2]);

  const handleSetValue = useCallback((v: string) => {
    setValue(v);
  }, []);

  return {
    value,
    setValue: handleSetValue,
    isLoading,
  };
}
```

### Testing

```typescript
// src/hooks/useCustomHook.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('should return initial value', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.value).toBe('');
  });

  it('should update value', () => {
    const { result } = renderHook(() => useCustomHook());

    act(() => {
      result.current.setValue('new value');
    });

    expect(result.current.value).toBe('new value');
  });
});
```

---

*Última actualización: Enero 2026*
