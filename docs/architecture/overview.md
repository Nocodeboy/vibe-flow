# Arquitectura del Sistema

> Visión general de la arquitectura técnica de Vibe Flow

---

## Resumen Ejecutivo

Vibe Flow es una **Single Page Application (SPA)** construida con React 19 y TypeScript, desplegada en Vercel con funciones Edge para el backend. La aplicación sigue los principios de **Atomic Design** para componentes y está optimizada para rendimiento y accesibilidad.

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENTE                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     React 19 + TypeScript                     │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │   │
│  │  │  Pages  │  │ Routing │  │ Context │  │ State (Hooks)   │ │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────────┬────────┘ │   │
│  │       │            │            │                 │          │   │
│  │  ┌────▼────────────▼────────────▼─────────────────▼────┐    │   │
│  │  │              COMPONENTES (Atomic Design)             │    │   │
│  │  │  ┌────────┐  ┌───────────┐  ┌───────────┐  ┌──────┐ │    │   │
│  │  │  │ Atoms  │  │ Molecules │  │ Organisms │  │Layout│ │    │   │
│  │  │  └────────┘  └───────────┘  └───────────┘  └──────┘ │    │   │
│  │  └──────────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Build & Bundling                          │   │
│  │  ┌─────────┐  ┌───────────┐  ┌──────────┐  ┌────────────┐  │   │
│  │  │  Vite   │  │ TypeScript│  │ Tailwind │  │ PostCSS    │  │   │
│  │  └─────────┘  └───────────┘  └──────────┘  └────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          SERVIDOR (Vercel)                           │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      Edge Network                             │   │
│  │  ┌─────────────────┐  ┌────────────────┐  ┌──────────────┐  │   │
│  │  │  Static Assets  │  │  Edge Functions │  │ CDN Cache    │  │   │
│  │  │   (HTML, CSS,   │  │  (api/contact)  │  │              │  │   │
│  │  │    JS, Images)  │  │                 │  │              │  │   │
│  │  └─────────────────┘  └────────┬────────┘  └──────────────┘  │   │
│  └────────────────────────────────┼─────────────────────────────┘   │
└───────────────────────────────────┼─────────────────────────────────┘
                                    │
                                    │ Webhook
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       SERVICIOS EXTERNOS                             │
│  ┌─────────────────┐                                                │
│  │    Airtable     │  (Almacenamiento de contactos)                 │
│  └─────────────────┘                                                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Stack Tecnológico

### Frontend

| Categoría | Tecnología | Propósito |
|-----------|------------|-----------|
| **Framework** | React 19 | UI Library |
| **Lenguaje** | TypeScript 5.8 | Type Safety |
| **Build** | Vite 6 | Bundling y Dev Server |
| **Estilos** | Tailwind CSS 3.4 | Utility-first CSS |
| **Animaciones** | Framer Motion 12 | Animaciones declarativas |
| **Scroll** | Lenis 1.3 | Smooth scrolling |
| **Routing** | React Router 7 | Client-side routing |
| **Iconos** | Lucide React | Iconos SVG |

### Backend

| Tecnología | Propósito |
|------------|-----------|
| Vercel Edge Functions | API serverless |
| Airtable | Base de datos de contactos |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| ESLint 9 | Linting de código |
| Prettier 3 | Formateo de código |
| Vitest 4 | Testing |
| TypeScript | Type checking |

---

## Patrones de Arquitectura

### 1. Atomic Design

Los componentes siguen la metodología Atomic Design:

```
Atoms      →  Elementos UI indivisibles (Button, Badge, Input)
     ↓
Molecules  →  Combinaciones simples de atoms (Card, FAQItem)
     ↓
Organisms  →  Secciones complejas (Hero, Footer, ContactSection)
     ↓
Templates  →  Layouts de página (no implementado explícitamente)
     ↓
Pages      →  Páginas finales (Home, Services, Contact)
```

### 2. Component Composition

```tsx
// Composición sobre herencia
<Card variant="glass">
  <CardHeader>
    <Badge variant="primary">Nuevo</Badge>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Contenido...
  </CardContent>
</Card>
```

### 3. Container/Presentational Pattern

```tsx
// Container: Maneja lógica y estado
const ContactFormContainer: React.FC = () => {
  const [formData, setFormData] = useState({});
  const handleSubmit = async () => { /* ... */ };

  return <ContactForm data={formData} onSubmit={handleSubmit} />;
};

// Presentational: Solo UI
const ContactForm: React.FC<Props> = ({ data, onSubmit }) => {
  return <form onSubmit={onSubmit}>...</form>;
};
```

### 4. Custom Hooks para Lógica Reutilizable

```tsx
// Encapsular lógica de negocio
const useFocusTrap = (isActive: boolean) => { /* ... */ };
const useReducedMotion = () => { /* ... */ };
const useSEO = (config: SEOConfig) => { /* ... */ };
```

---

## Flujo de Datos

### Estado de Aplicación

```
┌─────────────────────────────────────────────────────────────┐
│                      Flujo de Estado                         │
│                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌────────────┐  │
│  │   Context    │ ←── │    Hooks     │ ←── │  Component │  │
│  │ (Background  │     │ (useSEO,     │     │   State    │  │
│  │   Theme)     │     │  useToggle)  │     │ (useState) │  │
│  └──────────────┘     └──────────────┘     └────────────┘  │
│         │                    │                    │         │
│         ▼                    ▼                    ▼         │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                    UI Components                       │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Datos Estáticos

Los datos que no cambian frecuentemente se almacenan en `/src/data/`:

- `projects.ts` - Proyectos del portafolio
- `services.tsx` - Servicios ofrecidos
- `posts.ts` - Artículos del blog

---

## Decisiones de Arquitectura

### ¿Por qué React 19?

- Hooks mejorados
- Server Components ready (futuro)
- Mejor rendimiento con concurrent features
- Ecosystem maduro

### ¿Por qué Vite sobre CRA/Next.js?

- **vs CRA**: Más rápido, mejor DX, ESM nativo
- **vs Next.js**: No necesitamos SSR para este caso de uso; SPA es suficiente

### ¿Por qué TypeScript Strict?

- Detección temprana de errores
- Mejor autocompletado
- Documentación implícita
- Refactoring seguro

### ¿Por qué Tailwind CSS?

- Desarrollo rápido
- CSS mínimo en producción (purging)
- Consistencia de diseño
- No conflictos de especificidad

### ¿Por qué Framer Motion?

- API declarativa
- Animaciones complejas simplificadas
- Gestos (drag, hover, tap)
- Layout animations
- Exit animations

---

## Seguridad

### Capas de Seguridad

1. **Cliente**
   - Validación de formularios
   - Sanitización de entrada
   - Rate limiting (3 envíos/minuto)

2. **Servidor (Vercel)**
   - Security headers (HSTS, CSP, etc.)
   - Edge Functions aisladas
   - Sin exposición de secretos

3. **Datos**
   - Variables de entorno para endpoints
   - No almacenamiento de datos sensibles en cliente

---

## Rendimiento

### Estrategias Implementadas

| Estrategia | Implementación |
|------------|----------------|
| Code Splitting | `manualChunks` en Vite |
| Lazy Loading | `React.lazy()` para rutas |
| Tree Shaking | ESM y Vite automático |
| Image Optimization | `loading="lazy"`, `decoding="async"` |
| Font Loading | `font-display: swap` |
| CSS Purging | Tailwind automático |

### Chunks Separados

```
vendor-react.js     →  React, ReactDOM, React Router
vendor-animation.js →  Framer Motion
vendor-ui.js        →  Lucide React
vendor-scroll.js    →  Lenis
```

---

## Escalabilidad

### Horizontal (Más Features)

- Añadir nuevas páginas con lazy loading
- Nuevos componentes siguiendo Atomic Design
- Nuevos hooks para lógica compartida

### Vertical (Más Complejidad)

- Migrar a Next.js si se necesita SSR
- Añadir state management (Zustand/Redux) si crece
- Implementar i18n si se requiere multi-idioma

---

## Referencias

- [Estructura del Proyecto](./project-structure.md)
- [Sistema de Componentes](./components.md)
- [Decisiones de Arquitectura (ADRs)](./decisions/README.md)

---

*Última actualización: Enero 2026*
