# Architecture Decision Records (ADRs)

> Registro de decisiones arquitectónicas del proyecto

---

## ¿Qué es un ADR?

Un **Architecture Decision Record (ADR)** es un documento que captura una decisión arquitectónica importante junto con su contexto y consecuencias.

### Formato

Cada ADR sigue esta estructura:

```markdown
# ADR-XXX: Título

## Estado
[Propuesto | Aceptado | Deprecado | Supersedido]

## Contexto
¿Qué problema estamos tratando de resolver?

## Decisión
¿Qué decidimos hacer?

## Consecuencias
¿Cuáles son los resultados de esta decisión?
```

---

## Índice de ADRs

| ID | Título | Estado | Fecha |
|----|--------|--------|-------|
| [ADR-001](#adr-001-react-como-framework-frontend) | React como Framework Frontend | Aceptado | 2025-01 |
| [ADR-002](#adr-002-typescript-con-modo-estricto) | TypeScript con Modo Estricto | Aceptado | 2025-01 |
| [ADR-003](#adr-003-vite-como-build-tool) | Vite como Build Tool | Aceptado | 2025-01 |
| [ADR-004](#adr-004-tailwind-css-para-estilos) | Tailwind CSS para Estilos | Aceptado | 2025-01 |
| [ADR-005](#adr-005-framer-motion-para-animaciones) | Framer Motion para Animaciones | Aceptado | 2025-01 |
| [ADR-006](#adr-006-atomic-design-para-componentes) | Atomic Design para Componentes | Aceptado | 2025-01 |
| [ADR-007](#adr-007-vercel-para-deployment) | Vercel para Deployment | Aceptado | 2025-01 |
| [ADR-008](#adr-008-spa-sin-ssr) | SPA sin SSR | Aceptado | 2025-01 |

---

## ADR-001: React como Framework Frontend

### Estado
Aceptado

### Contexto
Necesitamos elegir un framework frontend para construir una aplicación web interactiva con animaciones complejas y buena experiencia de usuario.

**Opciones consideradas:**
- React
- Vue 3
- Svelte
- Vanilla JS

### Decisión
Usamos **React 19** como framework principal.

### Razones
1. **Ecosistema maduro**: Gran cantidad de librerías compatibles
2. **Framer Motion**: La mejor librería de animaciones está diseñada para React
3. **Conocimiento del equipo**: Experiencia previa con React
4. **Comunidad**: Amplia documentación y soporte
5. **Concurrent Features**: React 19 ofrece mejoras de rendimiento

### Consecuencias
- ✅ Desarrollo rápido con componentes reutilizables
- ✅ Fácil integración con Framer Motion
- ⚠️ Bundle size mayor que Svelte/Vue
- ⚠️ Requiere configuración adicional para optimización

---

## ADR-002: TypeScript con Modo Estricto

### Estado
Aceptado

### Contexto
Necesitamos decidir si usar JavaScript o TypeScript, y en caso de TypeScript, qué nivel de estrictez.

**Opciones consideradas:**
- JavaScript
- TypeScript (modo normal)
- TypeScript (modo estricto)

### Decisión
Usamos **TypeScript con `strict: true`** en la configuración.

### Razones
1. **Detección temprana de errores**: Menos bugs en producción
2. **Mejor DX**: Autocompletado y documentación inline
3. **Refactoring seguro**: Cambios con confianza
4. **Documentación implícita**: Tipos como documentación

### Consecuencias
- ✅ Código más robusto
- ✅ Mejor mantenibilidad a largo plazo
- ⚠️ Curva de aprendizaje inicial
- ⚠️ Más tiempo en desarrollo inicial

---

## ADR-003: Vite como Build Tool

### Estado
Aceptado

### Contexto
Necesitamos una herramienta de build rápida para desarrollo y producción.

**Opciones consideradas:**
- Create React App (CRA)
- Vite
- Next.js
- Parcel

### Decisión
Usamos **Vite 6** como build tool.

### Razones
1. **HMR instantáneo**: Desarrollo más rápido
2. **Build optimizado**: Rollup para producción
3. **ESM nativo**: Mejor rendimiento en desarrollo
4. **Configuración simple**: vs CRA/Webpack
5. **No necesitamos SSR**: Next.js es overkill

### Consecuencias
- ✅ Desarrollo significativamente más rápido
- ✅ Configuración más simple que Webpack
- ✅ Menor tiempo de build
- ⚠️ Algunos plugins de Webpack no disponibles
- ⚠️ Menos "batteries included" que Next.js

---

## ADR-004: Tailwind CSS para Estilos

### Estado
Aceptado

### Contexto
Necesitamos un sistema de estilos que permita desarrollo rápido y consistencia visual.

**Opciones consideradas:**
- CSS Modules
- Styled Components
- Tailwind CSS
- SCSS

### Decisión
Usamos **Tailwind CSS 3.4** con configuración personalizada.

### Razones
1. **Desarrollo rápido**: Clases utilitarias en HTML
2. **Sin conflictos**: No hay problemas de especificidad
3. **Purging automático**: CSS mínimo en producción
4. **Personalizable**: Fácil de extender con tema personalizado
5. **Consistencia**: Design tokens integrados

### Consecuencias
- ✅ Prototipado muy rápido
- ✅ CSS de producción muy pequeño (~10KB)
- ⚠️ HTML más verboso
- ⚠️ Curva de aprendizaje de clases

---

## ADR-005: Framer Motion para Animaciones

### Estado
Aceptado

### Contexto
El diseño requiere animaciones complejas y fluidas para alcanzar nivel Awwwards.

**Opciones consideradas:**
- CSS Animations
- GSAP
- Framer Motion
- React Spring

### Decisión
Usamos **Framer Motion 12** para todas las animaciones.

### Razones
1. **API declarativa**: Integración natural con React
2. **AnimatePresence**: Animaciones de exit fáciles
3. **Gestures**: Drag, hover, tap integrados
4. **Layout animations**: Animaciones de layout automáticas
5. **Variants**: Reutilización de animaciones

### Consecuencias
- ✅ Animaciones complejas simplificadas
- ✅ Código más mantenible
- ⚠️ Bundle size adicional (~30KB)
- ⚠️ Puede afectar rendimiento si se abusa

---

## ADR-006: Atomic Design para Componentes

### Estado
Aceptado

### Contexto
Necesitamos una metodología para organizar componentes de forma escalable.

**Opciones consideradas:**
- Organización por feature
- Atomic Design
- Flat structure
- Domain-driven

### Decisión
Usamos **Atomic Design** (Atoms, Molecules, Organisms, Pages).

### Razones
1. **Escalabilidad**: Clara organización a medida que crece
2. **Reutilización**: Fácil identificar componentes reutilizables
3. **Onboarding**: Nuevos devs entienden rápido la estructura
4. **Diseño**: Alineado con thinking de diseñadores

### Consecuencias
- ✅ Estructura predecible
- ✅ Mejor reutilización de componentes
- ⚠️ A veces no es claro si algo es molecule u organism
- ⚠️ Puede resultar en más archivos

---

## ADR-007: Vercel para Deployment

### Estado
Aceptado

### Contexto
Necesitamos una plataforma de deployment que soporte SPA y edge functions.

**Opciones consideradas:**
- Netlify
- Vercel
- AWS Amplify
- Cloudflare Pages

### Decisión
Usamos **Vercel** para hosting y edge functions.

### Razones
1. **Integración con Vite**: Detección automática
2. **Edge Functions**: Para API serverless
3. **Preview deployments**: PRs con preview automático
4. **Performance**: CDN global
5. **Free tier generoso**: Suficiente para el proyecto

### Consecuencias
- ✅ Deployment automático desde Git
- ✅ Previews para cada PR
- ✅ Edge functions para backend ligero
- ⚠️ Vendor lock-in parcial
- ⚠️ Límites en free tier para proyectos grandes

---

## ADR-008: SPA sin SSR

### Estado
Aceptado

### Contexto
Debemos decidir si la aplicación necesita Server-Side Rendering.

**Opciones consideradas:**
- SPA pura (Client-Side Rendering)
- SSR con Next.js
- SSG con Astro
- Hybrid (Next.js App Router)

### Decisión
Implementamos una **SPA sin SSR**, usando solo Client-Side Rendering.

### Razones
1. **No hay contenido dinámico SEO-crítico**: El contenido es mayormente estático
2. **Animaciones**: CSR permite animaciones más fluidas
3. **Simplicidad**: Menos complejidad de infraestructura
4. **Caching**: CDN puede cachear todo el bundle
5. **Interactividad**: La app es altamente interactiva

### Consecuencias
- ✅ Arquitectura más simple
- ✅ Deployment más sencillo
- ✅ Animaciones sin restricciones
- ⚠️ First paint más lento
- ⚠️ SEO depende de meta tags (implementado con useSEO)

---

## Proceso para Nuevos ADRs

1. **Identificar** la decisión a documentar
2. **Crear** nuevo archivo siguiendo el formato
3. **Discutir** con el equipo
4. **Aprobar** y cambiar estado a "Aceptado"
5. **Actualizar** este índice

---

*Última actualización: Enero 2026*
