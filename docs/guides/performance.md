# Rendimiento

> Guía de optimización y rendimiento

---

## Métricas Objetivo

### Core Web Vitals

| Métrica | Objetivo | Descripción |
|---------|----------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **INP** | < 200ms | Interaction to Next Paint |
| **CLS** | < 0.1 | Cumulative Layout Shift |

### Otras Métricas

| Métrica | Objetivo |
|---------|----------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Total Bundle Size | < 500KB gzipped |

---

## Optimizaciones Implementadas

### Code Splitting

#### Manual Chunks en Vite

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['framer-motion'],
          'vendor-ui': ['lucide-react'],
          'vendor-scroll': ['lenis'],
        },
      },
    },
  },
});
```

Resultado:
- `vendor-react.js` - Core de React (~40KB gzip)
- `vendor-animation.js` - Framer Motion (~30KB gzip)
- `vendor-ui.js` - Iconos (~15KB gzip)
- `vendor-scroll.js` - Scroll (~5KB gzip)

#### Lazy Loading de Rutas

```tsx
// src/App.tsx
import { lazy, Suspense } from 'react';

// Lazy load de páginas
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));

// En el router
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/servicios" element={<Services />} />
    <Route path="/contacto" element={<Contact />} />
  </Routes>
</Suspense>
```

---

### Optimización de Imágenes

#### Atributos de Carga

```tsx
<img
  src="/images/hero.webp"
  alt="Hero image"
  loading="lazy"           // Carga diferida
  decoding="async"         // Decodificación asíncrona
  width={1200}             // Reserva espacio (evita CLS)
  height={800}
/>
```

#### Formatos Modernos

```tsx
<picture>
  <source srcSet="/images/hero.avif" type="image/avif" />
  <source srcSet="/images/hero.webp" type="image/webp" />
  <img src="/images/hero.jpg" alt="Hero" />
</picture>
```

#### Responsive Images

```tsx
<img
  src="/images/hero-small.webp"
  srcSet="
    /images/hero-small.webp 640w,
    /images/hero-medium.webp 1024w,
    /images/hero-large.webp 1920w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  alt="Hero"
/>
```

---

### Memoización

#### React.memo para Componentes

```tsx
import { memo } from 'react';

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

// Memoizar componente
export default memo(Card);

// Con comparador personalizado
export default memo(Card, (prevProps, nextProps) => {
  return prevProps.title === nextProps.title;
});
```

#### useMemo para Cálculos

```tsx
import { useMemo } from 'react';

const ExpensiveComponent: React.FC<{ items: Item[] }> = ({ items }) => {
  // Memoizar cálculo costoso
  const processedItems = useMemo(() => {
    return items
      .filter(item => item.active)
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 10);
  }, [items]);

  return (
    <ul>
      {processedItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
```

#### useCallback para Funciones

```tsx
import { useCallback } from 'react';

const Form: React.FC = () => {
  const [value, setValue] = useState('');

  // Memoizar handler
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return <input value={value} onChange={handleChange} />;
};
```

---

### Optimización de Animaciones

#### Propiedades Baratas

```tsx
// ✅ Animar transform y opacity (GPU-accelerated)
<motion.div
  animate={{ x: 100, opacity: 0.5 }}
/>

// ❌ Evitar animar propiedades que causan layout
<motion.div
  animate={{ width: '100%', height: 200 }}  // Costoso
/>
```

#### will-change

```css
/* Usar con moderación */
.animated-element {
  will-change: transform, opacity;
}
```

#### Reduced Motion

```tsx
const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={prefersReducedMotion ? {} : { y: -10 }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
/>
```

---

### Fonts

#### Font Display Swap

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter.woff2') format('woff2');
  font-display: swap;  /* Evita FOIT */
}
```

#### Preload de Fonts Críticas

```html
<link
  rel="preload"
  href="/fonts/Inter-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

#### Subset de Caracteres

Solo incluir caracteres necesarios (Latin extended para español):

```css
/* Inter Latin + Spanish characters only */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+00C0-00FF, U+0100-017F;
}
```

---

### CSS

#### Tailwind Purging

Tailwind automáticamente elimina clases no usadas:

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Tailwind analiza estos archivos y purga el resto
};
```

#### Critical CSS

El CSS crítico se incluye inline automáticamente por Vite en producción.

---

## Monitorización

### Lighthouse

```bash
# En Chrome DevTools > Lighthouse
# O via CLI:
npx lighthouse https://vibeflow.es --view
```

### Bundle Analyzer

```bash
# Instalar
npm install -D rollup-plugin-visualizer

# Añadir a vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
});

# Ejecutar build para ver análisis
npm run build
```

### Web Vitals en Código

```tsx
import { onCLS, onINP, onLCP } from 'web-vitals';

onCLS(console.log);
onINP(console.log);
onLCP(console.log);
```

---

## Checklist de Performance

### Build

- [ ] Code splitting configurado
- [ ] Lazy loading en rutas
- [ ] Tree shaking funcionando
- [ ] Sourcemaps deshabilitados en producción

### Assets

- [ ] Imágenes optimizadas (WebP/AVIF)
- [ ] Imágenes con dimensiones explícitas
- [ ] Lazy loading de imágenes
- [ ] Fonts con font-display: swap

### Código

- [ ] Componentes memoizados donde necesario
- [ ] useMemo/useCallback para cálculos costosos
- [ ] Event handlers optimizados
- [ ] Sin re-renders innecesarios

### Animaciones

- [ ] Solo animar transform/opacity
- [ ] Reduced motion respetado
- [ ] Animaciones deshabilitadas fuera de viewport

### Red

- [ ] Compresión gzip/brotli habilitada
- [ ] Cache headers configurados
- [ ] CDN para assets estáticos

---

## Herramientas

| Herramienta | Propósito |
|-------------|-----------|
| [Lighthouse](https://developers.google.com/web/tools/lighthouse) | Auditoría general |
| [WebPageTest](https://www.webpagetest.org/) | Testing detallado |
| [Bundle Analyzer](https://www.npmjs.com/package/rollup-plugin-visualizer) | Análisis de bundle |
| [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/) | Profiling |

---

*Última actualización: Enero 2026*
