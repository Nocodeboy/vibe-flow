# Runbook: Problemas de formularios y eventos

## Objetivo
Diagnosticar fallos en formularios (validación, envío, feedback al usuario) y eventos asociados (tracking, callbacks, webhooks).

## Alcance
- Formularios del frontend (contacto, suscripción u otros).
- Integración backend/serverless de envío.
- Eventos de éxito/error y analítica relacionada.

## Triage

### 1) Síntomas
- El botón de envío no hace nada o queda en loading infinito.
- Se pierde información del formulario o llega incompleta.
- Usuario ve mensaje de éxito pero no hay registro backend.
- Eventos de `submit`/`success` no aparecen en analítica.

### 2) Causas probables
- Validaciones frontend bloquean envío por esquema desactualizado.
- Error en endpoint/API (`4xx`, `5xx`, timeout, CORS).
- Cambios en payload no sincronizados entre frontend y backend.
- Manejo de estado roto (disabled/loading/reset).
- Eventos disparados en orden incorrecto o no disparados.

### 3) Comandos y verificaciones
```bash
$ npm run dev
$ npm run test
$ npm run build
```

Verificar:
- Consola y Network: request del formulario, status code y payload.
- Logs de API/serverless para correlacionar request-id.
- Reglas de validación (`src/utils/validation.ts`) y tests asociados.
- UX de error/success visible y consistente para el usuario.
- Emisión de eventos de analítica en submit, success y failure.

### 4) Fix recomendado
1. Corregir validación de campos y mensajes de error accionables.
2. Alinear contrato frontend-backend (payload, headers, respuesta).
3. Asegurar timeout/retry razonable y manejo explícito de errores.
4. Garantizar estados UI correctos (loading, disabled, success, reset).
5. Añadir tests unitarios o de integración del flujo de envío.

### 5) Rollback
- Restaurar versión previa del formulario/API que sí procesaba envíos.
- Revertir cambios de esquema/payload incompatibles.
- Mantener feature flag o deshabilitar temporalmente flujo afectado.

## Criterio de cierre
- Formulario envía correctamente en happy path y en errores controlados.
- Registros llegan al backend de forma consistente.
- Eventos de analítica reflejan el flujo real de usuario.

> Última actualización: 2026-02-08
