# Arquitectura de la aplicación

Este documento resume cómo está organizada Vibe Flow en frontend y cómo viajan los datos entre rutas, hooks, componentes y API.

## Vista general

- **Stack principal:** React 19 + TypeScript + Vite.
- **Routing:** `react-router-dom` con `BrowserRouter` y rutas lazy.
- **UI:** Atomic Design (`atoms`, `molecules`, `organisms`, `layout`).
- **Estado transversal:** `BackgroundContext` para tema visual global.
- **Datos dinámicos:** endpoints internos `/api/posts` y `/api/post` consumidos desde `src/services/airtable.ts`.

---

## 1) Rutas principales

Las rutas se definen en `src/App.tsx` dentro de `Routes` y cada página se carga con `React.lazy` para code splitting.

| Ruta | Página | Objetivo |
|------|--------|----------|
| `/` | `Home` | Landing principal |
| `/proyectos` | `Work` | Portafolio/proyectos |
| `/proyectos/:id` | `ProjectPage` | Detalle de proyecto |
| `/servicios` | `Services` | Oferta de servicios |
| `/metodologia` | `Methodology` | Proceso/metodología |
| `/comunidad` | `Community` | Propuesta de comunidad |
| `/nosotros` | `About` | Información institucional |
| `/blog` | `Blog` | Listado de artículos |
| `/blog/:slug` | `BlogPostPage` | Detalle de artículo |
| `/contacto` | `Contact` | Contacto |
| `/aviso-legal` | `LegalNotice` | Legal |
| `/politica-privacidad` | `PrivacyPolicy` | Privacidad |
| `/politica-cookies` | `CookiePolicy` | Cookies |

> El shell global (navbar, fondo, footer, loader, banner de cookies) se monta en `AppContent` para mantener coherencia visual entre páginas.

---

## 2) Módulos y responsabilidades

## 2.1 Layout (`src/components/layout`)

- `ErrorBoundary`: captura errores de renderizado en toda la app.
- `SmoothScroll`: inicializa desplazamiento suave y envuelve el contenido.
- `PageTransition`: transición de entrada/salida entre rutas.
- `GlobalBackground`: renderiza fondo dinámico según contexto de tema.

## 2.2 Componentes UI (`src/components`)

- **Atoms:** primitives reutilizables (`Button`, `Badge`, `Skeleton`, `CustomCursor`, etc.).
- **Molecules:** composición funcional (`FAQItem`, `CookieBanner`, `BlogCard`, `ServiceCard`).
- **Organisms:** secciones completas (`Navbar`, `Footer`, `BlogGrid`, `ContactSection`, etc.).

## 2.3 Hooks (`src/hooks`)

- `useAnalytics`: carga Google Analytics y expone `trackEvent` / `trackPageView` respetando consentimiento de cookies.
- `useSEO`: actualiza `<title>`, meta tags OG/Twitter, canonical y JSON-LD para artículos.
- `useIsMobile`: adapta comportamientos de layout (ej. footer sticky solo desktop).
- `useReducedMotion`: respeta preferencia de accesibilidad para animaciones.
- `useFocusTrap`: mantiene foco dentro de modales/overlays.

## 2.4 Datos y servicios

- `src/services/airtable.ts`: capa de fetch para blog (`getPosts`, `getPostBySlug`) contra endpoints internos.
- `src/data/*`: fuentes estáticas (servicios, proyectos, posts fallback/estructura).
- `api/*`: funciones serverless que materializan los endpoints consumidos desde frontend.

---

## 3) Flujo de datos (end-to-end)

## 3.1 Navegación y analítica

1. Usuario navega a una ruta.
2. `AppContent` detecta cambio de `location.pathname`.
3. `useAnalytics().trackPageView(...)` emite evento si hay consentimiento.

## 3.2 Flujo del blog

1. `Blog` llama `getPosts()` al montar.
2. `getPosts()` hace fetch a `/api/posts`.
3. Respuesta JSON se guarda en estado local (`posts`, `filteredPosts`).
4. Filtros de búsqueda + paginación se resuelven en cliente.
5. En detalle, `BlogPostPage` llama `getPostBySlug(slug)`.
6. `getPostBySlug()` consulta `/api/post?slug=...` y devuelve post + navegación prev/next.

## 3.3 SEO por página

1. Cada página invoca `useSEO(...)` con metadatos.
2. Hook actualiza título, meta tags y canonical.
3. Si es artículo, añade/actualiza JSON-LD tipo `Article`.

## 3.4 Contexto visual global

1. `BackgroundProvider` envuelve toda la app.
2. `GlobalBackground` consume `theme` desde contexto.
3. Se aplica render de fondo consistente sin prop drilling.

---

## 4) Principios de diseño técnico

- **Composición por capas (Atomic Design):** reduce acoplamiento y aumenta reutilización.
- **Rutas lazy + Suspense:** mejora rendimiento inicial.
- **Responsabilidad única por módulo:** hooks para lógica transversal, componentes para UI, servicios para IO.
- **Shell global persistente:** transiciones y experiencia consistentes entre páginas.

---

## 5) Referencias rápidas

- Punto de entrada: `src/index.tsx`
- Enrutador y shell principal: `src/App.tsx`
- Servicios de datos: `src/services/airtable.ts`
- Contexto global: `src/contexts/BackgroundContext.tsx`
