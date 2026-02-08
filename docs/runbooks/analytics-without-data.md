# Runbook: Analíticas sin datos

## Objetivo
Diagnosticar y recuperar eventos de analítica cuando dashboards o reportes muestran tráfico/eventos en cero o muy por debajo de lo esperado.

## Alcance
- Frontend web de Vibe Flow.
- Integraciones de analítica (GA4 y capa de eventos del proyecto).
- Incidencias detectadas en producción, preview o entorno local.

## Triage

### 1) Síntomas
- En GA4 no aparecen sesiones, pageviews ni eventos recientes.
- El tráfico existe (usuarios reportan uso), pero los paneles están vacíos.
- Caída abrupta de métricas tras un deploy.

### 2) Causas probables
- ID de medición (`G-XXXX`) faltante o incorrecto en variables de entorno.
- Inicialización de analítica no ejecutada (hook o script no cargado).
- Eventos bloqueados por consentimiento/cookie banner.
- Bloqueo por ad blockers, CSP o error JavaScript en runtime.
- Cambios de rutas que no disparan `page_view` en navegación SPA.

### 3) Comandos y verificaciones
```bash
$ npm run dev
$ npm run build
$ npm run test
```

Verificar:
- Variables de entorno en el entorno afectado (`.env`, Vercel env vars).
- Consola del navegador: errores JS/CSP al cargar analítica.
- Network tab: requests a endpoints de analítica (`collect`, `g/collect`, etc.).
- Configuración de consentimiento: si el usuario no acepta cookies, validar comportamiento esperado.
- Hook de analítica y disparo de eventos de página/evento custom.

### 4) Fix recomendado
1. Corregir ID de medición y redeploy si la variable era inválida.
2. Asegurar inicialización única del tracking en el arranque de app.
3. Revalidar flujo de consentimiento y fallback para eventos permitidos.
4. Añadir logs temporales para confirmar emisión de eventos clave (`page_view`, `contact_submit`, etc.).
5. Confirmar recepción en DebugView/tiempo real antes de cerrar el incidente.

### 5) Rollback
- Revertir commit o configuración de analítica al último estado conocido estable.
- Reaplicar variables de entorno previas.
- Redeploy de la versión estable y revalidar datos en tiempo real.

## Criterio de cierre
- Eventos visibles en tiempo real/debug en la herramienta de analítica.
- Dashboard principal recupera señal dentro de la ventana esperada.
- Se documenta causa raíz y acción preventiva.

> Última actualización: 2026-02-08
