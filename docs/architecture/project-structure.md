# Estructura del Proyecto

> Organización completa de archivos y directorios

---

## Visión General

```
vibe-flow/
├── src/                    # Código fuente principal
├── public/                 # Assets estáticos
├── api/                    # Funciones serverless
├── docs/                   # Documentación
├── dist/                   # Build de producción (generado)
└── node_modules/           # Dependencias (generado)
```

---

## Directorio `src/`

```
src/
├── components/             # Componentes React
│   ├── atoms/             # Elementos básicos
│   ├── molecules/         # Combinaciones simples
│   ├── organisms/         # Secciones complejas
│   └── layout/            # Componentes estructurales
├── pages/                  # Páginas/Rutas
├── hooks/                  # Custom React hooks
├── contexts/               # React Context providers
├── utils/                  # Funciones de utilidad
├── styles/                 # Estilos y animaciones
├── data/                   # Datos estáticos
├── types/                  # Definiciones TypeScript
├── test/                   # Configuración de testing
├── App.tsx                 # Componente raíz
├── index.tsx               # Entry point
└── index.css               # Estilos globales
```

---

## Componentes (`src/components/`)

### Atoms (`components/atoms/`)

Elementos UI básicos e indivisibles:

| Archivo | Descripción |
|---------|-------------|
| `Button.tsx` | Botón con variantes (primary, secondary, outline, ghost, glass) |
| `Badge.tsx` | Insignia/etiqueta |
| `AnimatedCounter.tsx` | Contador con animación |
| `KineticChar.tsx` | Carácter con animación kinética |
| `CustomCursor.tsx` | Cursor personalizado |
| `Magnetic.tsx` | Wrapper con efecto magnético |
| `Skeleton.tsx` | Placeholder de carga |
| `Spotlight.tsx` | Efecto de spotlight |
| `NoiseOverlay.tsx` | Overlay con textura de ruido |

### Molecules (`components/molecules/`)

Combinaciones de atoms con funcionalidad:

| Archivo | Descripción |
|---------|-------------|
| `Card.tsx` | Tarjeta base con variantes |
| `FAQItem.tsx` | Item expandible de FAQ |
| `TestimonialCard.tsx` | Tarjeta de testimonio |
| `ServiceCard.tsx` | Tarjeta de servicio |
| `BlogCard.tsx` | Tarjeta de artículo |

### Organisms (`components/organisms/`)

Secciones completas de página:

| Archivo | Descripción |
|---------|-------------|
| `Navbar.tsx` | Barra de navegación |
| `Footer.tsx` | Pie de página |
| `Hero.tsx` | Sección hero principal |
| `HeroVideoB.tsx` | Hero alternativo con video |
| `ContactSection.tsx` | Formulario de contacto |
| `StackingProjects.tsx` | Galería de proyectos |
| `LearningModules.tsx` | Módulos educativos |
| `ServiceModal.tsx` | Modal de servicio |
| `MembershipSection.tsx` | Sección de membresía |
| `Testimonials.tsx` | Sección de testimonios |
| `ComparisonSection.tsx` | Comparativa |
| `RoadmapSection.tsx` | Roadmap visual |
| `AboutSection.tsx` | Sobre los fundadores |
| `TeamSection.tsx` | Equipo |
| `FAQSection.tsx` | Preguntas frecuentes |
| `BlogSection.tsx` | Listado de blog |
| `TargetAudienceSection.tsx` | Público objetivo |
| `CaseStudies.tsx` | Estudios de caso |
| `ProjectDetail.tsx` | Detalle de proyecto |
| `BrandVisuals.tsx` | Visuales de marca |
| `Process.tsx` | Proceso de trabajo |
| `VibeFlowSection.tsx` | Sección personalizada |

### Layout (`components/layout/`)

Componentes estructurales:

| Archivo | Descripción |
|---------|-------------|
| `SmoothScroll.tsx` | Wrapper de scroll suave (Lenis) |
| `PageTransition.tsx` | Transiciones entre páginas |
| `ErrorBoundary.tsx` | Manejo de errores React |
| `GlobalBackground.tsx` | Fondos animados globales |

---

## Páginas (`src/pages/`)

| Archivo | Ruta | Descripción |
|---------|------|-------------|
| `Home.tsx` | `/` | Página principal |
| `Work.tsx` | `/proyectos` | Galería de proyectos |
| `ProjectPage.tsx` | `/proyectos/:id` | Detalle de proyecto |
| `Services.tsx` | `/servicios` | Servicios ofrecidos |
| `Methodology.tsx` | `/metodologia` | Metodología de trabajo |
| `Community.tsx` | `/comunidad` | Información de comunidad |
| `About.tsx` | `/nosotros` | Sobre el equipo |
| `Blog.tsx` | `/blog` | Listado de artículos |
| `BlogPostPage.tsx` | `/blog/:slug` | Artículo individual |
| `Contact.tsx` | `/contacto` | Formulario de contacto |
| `LegalNotice.tsx` | `/aviso-legal` | Aviso legal |
| `PrivacyPolicy.tsx` | `/politica-privacidad` | Política de privacidad |

---

## Hooks (`src/hooks/`)

| Archivo | Propósito |
|---------|-----------|
| `useSEO.ts` | Gestión de meta tags y SEO |
| `useFocusTrap.ts` | Focus trap para modales |
| `useReducedMotion.ts` | Detecta `prefers-reduced-motion` |
| `useIsMobile.ts` | Detecta viewport móvil |

Tests asociados:
- `useFocusTrap.test.ts`

---

## Contexts (`src/contexts/`)

| Archivo | Propósito |
|---------|-----------|
| `BackgroundContext.tsx` | Gestiona el tema de fondo global |

```tsx
// Temas disponibles
type BackgroundTheme = 'nebula' | 'cyber' | 'void' | 'warm' | 'default';
```

---

## Utilidades (`src/utils/`)

| Archivo | Propósito |
|---------|-----------|
| `validation.ts` | Validación de formularios, sanitización, rate limiting |

Tests asociados:
- `validation.test.ts`

---

## Estilos (`src/styles/`)

| Archivo | Propósito |
|---------|-----------|
| `animation.ts` | Constantes de animación (EASE_ELITE, duraciones) |
| `variants.ts` | Variantes de Framer Motion reutilizables |

---

## Datos (`src/data/`)

| Archivo | Contenido |
|---------|-----------|
| `projects.ts` | Proyectos del portafolio |
| `services.tsx` | Servicios con iconos y precios |
| `posts.ts` | Artículos del blog |

---

## Tipos (`src/types/`)

| Archivo | Contenido |
|---------|-----------|
| `index.ts` | Interfaces y tipos principales |

```typescript
// Tipos principales
interface Project { id, title, category, img, description, tags, challenge?, solution?, impact? }
interface Service { id, icon, title, desc, tags, img, color }
interface Review { text, author, pos, stat, metric }
type BackgroundTheme = 'nebula' | 'cyber' | 'void' | 'warm' | 'default';
```

---

## Testing (`src/test/`)

| Archivo | Propósito |
|---------|-----------|
| `setup.ts` | Configuración global de Vitest |

---

## Directorio `public/`

```
public/
├── fonts/                  # Tipografías (Space Mono, Inter)
├── images/                 # Imágenes del sitio
│   ├── projects/          # Imágenes de proyectos
│   ├── team/              # Fotos del equipo
│   └── og-image.jpg       # Imagen Open Graph
├── favicon.ico            # Favicon
└── robots.txt             # Instrucciones para bots
```

---

## Directorio `api/`

```
api/
└── contact.ts              # Edge Function para formulario de contacto
```

La función se despliega como Vercel Edge Function y maneja:
- Validación de datos
- Reenvío a webhook de Airtable
- Rate limiting

---

## Archivos de Configuración (Raíz)

| Archivo | Propósito |
|---------|-----------|
| `package.json` | Dependencias y scripts npm |
| `package-lock.json` | Lock file de dependencias |
| `vite.config.ts` | Configuración de Vite |
| `vitest.config.ts` | Configuración de Vitest |
| `tsconfig.json` | Configuración de TypeScript |
| `tsconfig.node.json` | TypeScript para Node (Vite config) |
| `tailwind.config.js` | Configuración de Tailwind CSS |
| `postcss.config.js` | Configuración de PostCSS |
| `eslint.config.js` | Configuración de ESLint |
| `.prettierrc` | Configuración de Prettier |
| `.env.example` | Ejemplo de variables de entorno |
| `.gitignore` | Archivos ignorados por Git |
| `vercel.json` | Configuración de Vercel |
| `index.html` | HTML principal (entry point) |

---

## Convenciones de Nombrado

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `ServiceCard.tsx` |
| Hooks | camelCase con `use` | `useFocusTrap.ts` |
| Utilidades | camelCase | `validation.ts` |
| Tests | `.test.ts` suffix | `validation.test.ts` |
| Tipos | PascalCase | `ServiceModalProps` |
| Constantes | SCREAMING_SNAKE | `EASE_ELITE` |
| CSS classes | kebab-case | `.section-title` |

---

## Imports y Exports

### Path Aliases

```tsx
// Configurado en tsconfig.json y vite.config.ts
import { Button } from '@/components/atoms/Button';
import { useSEO } from '@/hooks/useSEO';
```

### Exports por Defecto vs Named

```tsx
// Componentes: default export
export default Button;

// Hooks y utils: named export
export { useSEO };
export { validateContactForm };
```

---

*Última actualización: Enero 2026*
