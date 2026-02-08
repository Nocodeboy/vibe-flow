# Runbook: Errores de build

## Objetivo
Resolver fallos de compilación en CI/CD o local de forma reproducible y con impacto mínimo en el flujo de entrega.

## Alcance
- Build frontend (Vite/TypeScript).
- Pipelines de validación (lint, test, build).
- Dependencias y configuración de toolchain.

## Triage

### 1) Síntomas
- El pipeline falla en `npm run build`.
- Error de TypeScript, módulos no encontrados o incompatibilidades de versión.
- Build local funciona pero falla en CI (o viceversa).

### 2) Causas probables
- Tipados rotos por cambios en interfaces/props.
- Imports con ruta incorrecta o archivo renombrado sin actualizar referencias.
- Diferencias de versión de Node/npm entre local y CI.
- Lockfile desactualizado o dependencias corruptas.
- Variables de entorno requeridas ausentes durante build.

### 3) Comandos y verificaciones
```bash
$ node -v
$ npm -v
$ npm ci
$ npm run lint
$ npm run test
$ npm run build
```

Verificar:
- Logs completos del pipeline para identificar primer error real.
- Consistencia entre `package-lock.json` y `package.json`.
- Configuración de `tsconfig.json` y aliases de import.
- Entorno de CI: versión de Node, variables y flags.

### 4) Fix recomendado
1. Corregir el primer error de compilación detectado (no síntomas en cascada).
2. Normalizar versión de Node en local/CI.
3. Regenerar lockfile solo si hay desalineación confirmada.
4. Añadir/ajustar tests o tipos para evitar regresión equivalente.
5. Reejecutar pipeline completo antes de merge.

### 5) Rollback
- Revertir el commit que introduce la rotura del build.
- Restaurar lockfile previo si el fallo fue por resolución de dependencias.
- Relanzar pipeline sobre el último commit verde.

## Criterio de cierre
- `lint`, `test` y `build` en verde en CI.
- Build reproducible en local con las mismas versiones.
- Causa raíz registrada con acción preventiva concreta.

> Última actualización: 2026-02-08
