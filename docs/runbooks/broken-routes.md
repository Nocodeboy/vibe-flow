# Runbook: Rutas rotas

## Objetivo
Recuperar navegación funcional cuando una o más URLs muestran 404, pantallas en blanco o componentes incorrectos.

## Alcance
- Rutas SPA en React.
- Deep links compartidos externamente.
- Configuración de reescrituras en hosting.

## Triage

### 1) Síntomas
- URLs válidas devuelven 404 en producción.
- Al recargar una ruta interna aparece error de not found.
- Enlaces del menú llevan a página incorrecta o vacía.

### 2) Causas probables
- Ruta eliminada o renombrada sin actualizar navegación.
- Error en configuración del router (path, params, fallback).
- Falta de rewrites en plataforma de despliegue para SPA.
- Links hardcodeados con typo o slug desactualizado.
- Regresión en componente de página objetivo.

### 3) Comandos y verificaciones
```bash
$ npm run dev
$ npm run build
$ npm run test
```

Verificar:
- Definición de rutas en `src/App.tsx` y páginas asociadas.
- Menú/navbar y CTAs con href/to correctos.
- `vercel.json` (u otro) con reglas de rewrite para SPA.
- Navegación directa + recarga en rutas críticas (`/`, `/services`, `/blog`, etc.).

### 4) Fix recomendado
1. Restaurar rutas eliminadas o actualizar referencias a los nuevos paths.
2. Corregir configuración de router y rutas dinámicas.
3. Añadir/ajustar rewrite de plataforma para servir `index.html`.
4. Validar con recorrido manual de navegación principal y enlaces internos.
5. Añadir test de smoke de rutas críticas si no existe.

### 5) Rollback
- Volver a la última versión con routing estable.
- Revertir cambios de navegación/estructura de páginas.
- Restaurar configuración de rewrites previa y redeploy.

## Criterio de cierre
- No hay 404 inesperados en rutas críticas.
- Recarga directa funciona en producción para rutas internas.
- Enlaces clave del sitio se validan de extremo a extremo.

> Última actualización: 2026-02-08
