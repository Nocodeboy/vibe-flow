# Auditoría de documentación

Fecha de auditoría: 2026-02-08  
Alcance revisado: `README.md`, guías en raíz (`CONTRIBUTING.md`, `AUDIT_REPORT.md`) y toda la carpeta `docs/`.

## Criterios de estado
- **Vigente:** consistente con el código y flujo actual.
- **Desactualizado:** existe, pero requiere ajustes para reflejar la implementación actual.
- **Faltante:** no existe documentación para un tema crítico.

> Prioridad alta = bloquea onboarding u operación (setup local, variables de entorno, despliegue, analíticas GA4).

## Inventario

| Archivo | Propósito | Última actualización | Estado |
|---|---|---:|---|
| `README.md` | Guía principal de onboarding, comandos y arquitectura general. | 2026-01-26 | **Desactualizado (ALTA)** — referencia `VITE_CONTACT_ENDPOINT`, pero el código usa `/api/contact` + `AIRTABLE_WEBHOOK_URL`. |
| `CONTRIBUTING.md` | Flujo de contribución y checklist de calidad. | 2026-01-26 | **Vigente** |
| `AUDIT_REPORT.md` | Reporte técnico de calidad/riesgos y estado de mejoras. | 2026-02-08 | **Vigente** |
| `docs/README.md` | Índice central de documentación técnica y de negocio. | 2026-01-26 | **Vigente** |
| `docs/getting-started/quick-start.md` | Arranque rápido para nuevos colaboradores. | 2026-01-26 | **Vigente** |
| `docs/getting-started/installation.md` | Instalación local paso a paso y troubleshooting. | 2026-01-26 | **Desactualizado (ALTA)** — mantiene ejemplo de `VITE_CONTACT_ENDPOINT`. |
| `docs/getting-started/configuration.md` | Configuración inicial de variables y entorno local. | 2026-01-26 | **Desactualizado (ALTA)** — tabla de variables no refleja `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_WEBHOOK_URL`. |
| `docs/deployment/README.md` | Resumen del proceso de despliegue y checklist previa. | 2026-01-26 | **Desactualizado (ALTA)** — ejemplo de env para contacto no coincide con backend actual. |
| `docs/deployment/environment.md` | Detalle de variables de entorno cliente/servidor y validación. | 2026-01-26 | **Desactualizado (ALTA)** — centrado en `VITE_CONTACT_ENDPOINT`; faltan variables server-side actuales. |
| `docs/deployment/vercel.md` | Configuración de Vercel (proyecto, variables, API routes). | 2026-01-26 | **Desactualizado (ALTA)** — variable de entorno de contacto incorrecta para implementación vigente. |
| `docs/BLOG_INTEGRATION.md` | Integración Airtable ↔ API serverless para blog. | 2026-01-29 | **Vigente** |
| `docs/development/README.md` | Hub de desarrollo local y comandos de trabajo diario. | 2026-01-26 | **Vigente** |
| `docs/development/contributing.md` | Guía extendida de contribución dentro de docs/development. | 2026-01-26 | **Vigente** |
| `docs/development/git-workflow.md` | Convenciones de ramas, commits y PRs. | 2026-01-26 | **Vigente** |
| `docs/development/testing.md` | Estrategia y ejecución de tests. | 2026-01-26 | **Vigente** |
| `docs/development/code-style.md` | Estándares de estilo y prácticas de código. | 2026-01-26 | **Vigente** |
| `docs/architecture/overview.md` | Vista global de arquitectura y decisiones técnicas. | 2026-01-26 | **Vigente** |
| `docs/architecture/project-structure.md` | Estructura del repositorio y responsabilidades por carpeta. | 2026-01-26 | **Vigente** |
| `docs/architecture/components.md` | Mapa de componentes y organización UI. | 2026-01-26 | **Vigente** |
| `docs/architecture/decisions/README.md` | Registro ADR y rationale de decisiones. | 2026-01-26 | **Vigente** |
| `docs/api/README.md` | Índice de API interna y capas del frontend. | 2026-01-26 | **Vigente** |
| `docs/api/hooks.md` | Contratos y uso de hooks personalizados. | 2026-01-26 | **Desactualizado (MEDIA)** — no cubre `useAnalytics`/consentimiento GA4. |
| `docs/api/contexts.md` | Documentación de context providers. | 2026-01-26 | **Vigente** |
| `docs/api/utils.md` | Utilidades compartidas y su intención. | 2026-01-26 | **Vigente** |
| `docs/api/components/README.md` | Índice de componentes por nivel atómico. | 2026-01-26 | **Vigente** |
| `docs/api/components/atoms.md` | Catálogo de componentes atómicos. | 2026-01-26 | **Vigente** |
| `docs/api/components/molecules.md` | Catálogo de componentes molécula. | 2026-01-26 | **Vigente** |
| `docs/api/components/organisms.md` | Catálogo de componentes organismo. | 2026-01-26 | **Vigente** |
| `docs/guides/README.md` | Índice de guías transversales (perf, a11y, etc.). | 2026-01-26 | **Vigente** |
| `docs/guides/security.md` | Recomendaciones de seguridad, headers y secretos. | 2026-01-26 | **Desactualizado (ALTA)** — ejemplos de env de contacto apuntan a `VITE_CONTACT_ENDPOINT`. |
| `docs/guides/performance.md` | Buenas prácticas de performance frontend. | 2026-01-26 | **Vigente** |
| `docs/guides/accessibility.md` | Lineamientos de accesibilidad. | 2026-01-26 | **Vigente** |
| `docs/guides/animations.md` | Guía de animaciones y motion principles. | 2026-01-26 | **Vigente** |
| `docs/guides/styling.md` | Reglas de estilo visual y utilidades. | 2026-01-26 | **Vigente** |
| `docs/design/README.md` | Índice de documentación de diseño. | 2026-01-26 | **Vigente** |
| `docs/design/style-guide.md` | Guía de estilos UI/UX. | 2026-01-26 | **Vigente** |
| `docs/design/brand-guidelines.md` | Guía de marca y consistencia visual. | 2026-01-26 | **Vigente** |
| `docs/design/designer-prompt.md` | Prompt/brief para colaboración con diseño. | 2026-01-26 | **Vigente** |
| `docs/business/README.md` | Índice de documentación de negocio. | 2026-01-26 | **Vigente** |
| `docs/business/vision-mission.md` | Visión y misión del proyecto. | 2026-01-26 | **Vigente** |
| `docs/business/target-audience.md` | Segmentos y perfiles objetivo. | 2026-01-26 | **Vigente** |
| `docs/business/contact.md` | Información de contacto / canales. | 2026-01-26 | **Vigente** |
| `docs/business/roadmap.md` | Roadmap y estado de hitos de negocio. | 2026-01-26 | **Vigente** |
| `docs/analytics/ga4.md` | (No existe) Guía operativa GA4: ID, eventos, consentimiento, validación y ownership. | — | **Faltante (ALTA)** |
| `docs/getting-started/onboarding-checklist.md` | (No existe) Checklist operativo único de onboarding (setup local + env + smoke checks). | — | **Faltante (ALTA)** |

## Prioridad alta (bloqueantes)
1. **Variables de entorno y setup**: alinear `README.md`, `docs/getting-started/*`, `docs/deployment/*` y `docs/guides/security.md` con `.env.example` y API routes actuales.
2. **Despliegue Vercel**: actualizar guía de variables requeridas de runtime (`AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_WEBHOOK_URL`).
3. **Analíticas GA4**: crear documentación explícita de implementación, consentimiento de cookies y plan de eventos.
4. **Onboarding operativo**: consolidar checklist corto de primer arranque para reducir fricción de nuevos miembros.

## Responsables sugeridos por sección
- **Core onboarding y setup (`README.md`, `docs/getting-started/*`)**: **Tech Lead Frontend**.
- **Deployment y entornos (`docs/deployment/*`, fragmentos de seguridad)**: **DevOps / Platform Owner**.
- **Integraciones backend (Airtable + API routes)**: **Backend Integrations Owner**.
- **GA4 / consentimiento / métricas**: **Growth & Analytics Owner** + **Frontend Owner**.
- **Documentación de arquitectura y API interna**: **Frontend Architect**.
- **Guías de diseño y negocio**: **Design Lead** y **Product/Business Owner**.

## Siguiente iteración recomendada (7 días)
- Día 1-2: corregir docs de env/deploy/setup (prioridad alta).
- Día 3: publicar `docs/analytics/ga4.md` con eventos mínimos y validación en DebugView.
- Día 4: agregar `docs/getting-started/onboarding-checklist.md`.
- Día 5-7: revisión cruzada por responsables y cierre de inconsistencias.
