# Vibe Flow Docs Hub

> Índice principal y estándares de la documentación de Vibe Flow.

---

## Índice principal

### Getting Started

| Documento | Descripción |
| --- | --- |
| [Instalación](./getting-started/installation.md) | Preparar el entorno local. |
| [Quick Start](./getting-started/quick-start.md) | Levantar el proyecto en minutos. |
| [Configuración](./getting-started/configuration.md) | Variables, ajustes y defaults. |

### Arquitectura

| Documento | Descripción |
| --- | --- |
| [Overview](./architecture/overview.md) | Vista global del sistema. |
| [Project Structure](./architecture/project-structure.md) | Organización de carpetas y capas. |
| [Components](./architecture/components.md) | Sistema de componentes y patrones. |
| [ADRs](./architecture/decisions/README.md) | Decisiones de arquitectura registradas. |

### Operación

| Documento | Descripción |
| --- | --- |
| [Deployment](./deployment/README.md) | Flujo de despliegue oficial. |
| [Vercel](./deployment/vercel.md) | Configuración de plataforma. |
| [Environment](./deployment/environment.md) | Gestión de variables de entorno. |
| [Seguridad](./guides/security.md) | Buenas prácticas operativas de seguridad. |
| [Performance](./guides/performance.md) | Monitoreo y optimización operativa. |

### Producto

| Documento | Descripción |
| --- | --- |
| [Visión y misión](./business/vision-mission.md) | Objetivos y propósito del producto. |
| [Público objetivo](./business/target-audience.md) | Segmentos y personas clave. |
| [Roadmap](./business/roadmap.md) | Plan de evolución del producto. |
| [Brand guidelines](./design/brand-guidelines.md) | Sistema visual de marca. |

### QA

| Documento | Descripción |
| --- | --- |
| [Testing](./development/testing.md) | Estrategia de pruebas y cobertura. |
| [Accesibilidad](./guides/accessibility.md) | Criterios a11y y validación WCAG. |
| [Contributing](./development/contributing.md) | Flujo para aportar cambios de calidad. |

### Troubleshooting

| Documento | Descripción |
| --- | --- |
| [Runbook: Analíticas sin datos](./runbooks/analytics-without-data.md) | Diagnóstico de pérdida de eventos y tráfico en analítica. |
| [Runbook: Errores de build](./runbooks/build-errors.md) | Guía de triage para fallos de compilación local/CI. |
| [Runbook: Rutas rotas](./runbooks/broken-routes.md) | Resolución de 404, deep links y problemas de navegación. |
| [Runbook: Formularios y eventos](./runbooks/forms-and-events-issues.md) | Diagnóstico de envío, validación y tracking de formularios. |
| [Configuración](./getting-started/configuration.md) | Errores comunes al configurar el entorno. |
| [Deployment](./deployment/README.md) | Incidencias típicas de despliegue. |
| [Git workflow](./development/git-workflow.md) | Problemas frecuentes de ramas/PR. |
| [Guía de estilo de docs](./style-guide.md) | Criterios para mantener consistencia y evitar errores de documentación. |

---

## Plantilla estándar de documentos

Todos los documentos nuevos dentro de `docs/` deben seguir, como mínimo, esta estructura:

```md
# Título del documento

## Objetivo
Explica qué resuelve este documento y para quién.

## Prerequisitos
Lista de accesos, herramientas o conocimientos necesarios.

## Pasos
1. Paso concreto y verificable.
2. Paso concreto y verificable.
3. Paso concreto y verificable.

## Validación
Describe cómo comprobar que el resultado esperado se cumplió.

## Problemas comunes
- Problema: síntoma observable.
- Causa probable: por qué ocurre.
- Solución: acción recomendada.

> Última actualización: YYYY-MM-DD
```

---

## Convenciones de documentación

- **Idioma principal**: Español neutro.
- **Nombres de archivo**: `kebab-case.md` (por ejemplo: `release-checklist.md`).
- **Formato de comandos**: usar bloque fenced con `bash` y prompt `$`.

```bash
$ npm install
$ npm run dev
```

- **Bloque de actualización**: cerrar cada documento con el bloque:

```md
> Última actualización: YYYY-MM-DD
```

Para más detalle editorial y de formato, consultar la [guía de estilo mínima](./style-guide.md).
