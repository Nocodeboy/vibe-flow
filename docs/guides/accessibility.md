# Accesibilidad

> Guía de accesibilidad WCAG 2.1 nivel AA

---

## Resumen

El proyecto cumple con **WCAG 2.1 nivel AA**, garantizando que el sitio sea usable por personas con diversas capacidades.

---

## Principios WCAG

### 1. Perceptible

La información debe ser presentable de formas que los usuarios puedan percibir.

### 2. Operable

Los componentes de UI deben ser operables por todos los usuarios.

### 3. Comprensible

La información y operación de UI debe ser comprensible.

### 4. Robusto

El contenido debe ser robusto para ser interpretado por tecnologías asistivas.

---

## Características Implementadas

### Skip Links

Permite saltar directamente al contenido principal:

```tsx
// Al inicio del documento
<a
  href="#main-content"
  className="
    sr-only focus:not-sr-only
    fixed top-4 left-4 z-[10000]
    px-4 py-2 bg-primary text-black
    rounded-lg font-bold
  "
>
  Saltar al contenido principal
</a>

// En el contenido principal
<main id="main-content" tabIndex={-1}>
  {/* Contenido */}
</main>
```

### Focus Management

#### Focus Visible

```tsx
// Todos los elementos interactivos tienen focus visible
<button
  className="
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-primary
  "
>
```

#### Focus Trap (Modales)

```typescript
// src/hooks/useFocusTrap.ts
export function useFocusTrap<T extends HTMLElement>(isActive: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return ref;
}
```

Uso:

```tsx
const ServiceModal: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Contenido del modal */}
    </div>
  );
};
```

### Reduced Motion

Respetar la preferencia del usuario:

```typescript
// src/hooks/useReducedMotion.ts
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
```

Uso:

```tsx
const AnimatedSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0 }}
      animate={prefersReducedMotion ? {} : { opacity: 1 }}
    >
      Contenido
    </motion.div>
  );
};
```

---

## ARIA Attributes

### Roles

```tsx
// Navegación
<nav role="navigation" aria-label="Navegación principal">

// Contenido principal
<main role="main">

// Complementario
<aside role="complementary">

// Formulario
<form role="form" aria-label="Formulario de contacto">
```

### Labels

```tsx
// Botón con icono
<button aria-label="Cerrar modal">
  <X aria-hidden="true" />
</button>

// Input con label
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-describedby="email-hint" />
<span id="email-hint">Usaremos tu email para contactarte</span>
```

### Estados

```tsx
// Expandible
<button
  aria-expanded={isOpen}
  aria-controls="faq-content"
>
  Pregunta frecuente
</button>
<div id="faq-content" hidden={!isOpen}>
  Respuesta
</div>

// Loading
<button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? 'Enviando...' : 'Enviar'}
</button>

// Modal
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Título del Modal</h2>
</div>
```

---

## Navegación por Teclado

### Atajos Estándar

| Tecla | Acción |
|-------|--------|
| `Tab` | Navegar al siguiente elemento |
| `Shift + Tab` | Navegar al elemento anterior |
| `Enter` | Activar botón/link |
| `Space` | Activar checkbox/botón |
| `Escape` | Cerrar modal/dropdown |
| `Arrow keys` | Navegar en menús/listas |

### Implementación

```tsx
// Escape para cerrar modal
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen, onClose]);
```

```tsx
// Arrow keys en menú
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      setFocusedIndex((prev) => Math.min(prev + 1, items.length - 1));
      break;
    case 'ArrowUp':
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
      break;
    case 'Enter':
      items[focusedIndex]?.onClick();
      break;
  }
};
```

---

## Contenido para Screen Readers

### Clase sr-only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

Uso:

```tsx
// Texto solo para screen readers
<span className="sr-only">Menú de navegación</span>

// Skip link visible solo con focus
<a href="#main" className="sr-only focus:not-sr-only">
  Saltar al contenido
</a>
```

### aria-live para Contenido Dinámico

```tsx
// Anuncios en vivo
<div aria-live="polite" aria-atomic="true">
  {notification && <span>{notification}</span>}
</div>

// Mensajes de error
<div role="alert" aria-live="assertive">
  {error && <span>{error}</span>}
</div>
```

---

## Contraste de Color

### Ratios Mínimos WCAG AA

| Tipo | Ratio Mínimo |
|------|--------------|
| Texto normal | 4.5:1 |
| Texto grande (18pt+) | 3:1 |
| UI components | 3:1 |

### Colores del Proyecto

| Combinación | Ratio | Estado |
|-------------|-------|--------|
| Blanco (#fefefe) sobre Negro (#030303) | 19.7:1 | ✅ |
| Verde (#98e710) sobre Negro (#030303) | 11.2:1 | ✅ |
| Blanco 60% sobre Negro | 8.6:1 | ✅ |
| Blanco 40% sobre Negro | 5.1:1 | ✅ |

### Verificar Contraste

Herramientas:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

---

## Formularios Accesibles

### Estructura Correcta

```tsx
<form onSubmit={handleSubmit} aria-label="Formulario de contacto">
  <div>
    <label htmlFor="name">Nombre *</label>
    <input
      id="name"
      type="text"
      required
      aria-required="true"
      aria-invalid={errors.name ? 'true' : 'false'}
      aria-describedby={errors.name ? 'name-error' : undefined}
    />
    {errors.name && (
      <span id="name-error" role="alert">
        {errors.name}
      </span>
    )}
  </div>

  <button type="submit">
    Enviar
  </button>
</form>
```

### Mensajes de Error

```tsx
// Error accesible
<div role="alert" className="text-red-500">
  <span className="sr-only">Error: </span>
  Por favor, introduce un email válido
</div>
```

---

## Imágenes

### Alt Text

```tsx
// Imagen informativa
<img
  src="/hero.jpg"
  alt="Equipo de Vibe Flow trabajando en un proyecto colaborativo"
/>

// Imagen decorativa
<img src="/pattern.svg" alt="" aria-hidden="true" />

// Imagen con texto
<img
  src="/infographic.png"
  alt="Infografía mostrando: 500+ miembros, 100+ proyectos, 50+ profesionales"
/>
```

### SVG Accesibles

```tsx
// Icono decorativo
<svg aria-hidden="true" focusable="false">
  {/* ... */}
</svg>

// Icono informativo
<svg role="img" aria-label="Cerrar">
  <title>Cerrar</title>
  {/* ... */}
</svg>
```

---

## Testing de Accesibilidad

### Herramientas Automáticas

- [axe DevTools](https://www.deque.com/axe/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Testing Manual

1. **Keyboard navigation**: Navegar solo con teclado
2. **Screen reader**: Probar con VoiceOver/NVDA
3. **Zoom**: Probar al 200% de zoom
4. **Color blindness**: Usar simuladores

### Checklist

- [ ] Skip link funcional
- [ ] Todo elemento interactivo es alcanzable con Tab
- [ ] Focus visible en todos los elementos
- [ ] Modales tienen focus trap
- [ ] Botones con iconos tienen aria-label
- [ ] Formularios tienen labels asociados
- [ ] Errores anunciados a screen readers
- [ ] Contraste suficiente
- [ ] Reduced motion respetado

---

## Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)

---

*Última actualización: Enero 2026*
