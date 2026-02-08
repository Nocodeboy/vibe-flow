# Guía de estilo mínima para documentación

Esta guía define el mínimo obligatorio para cualquier documento en `docs/`.

## 1) Idioma y tono

- Idioma principal: **español neutro**.
- Tono: directo, accionable y sin ambigüedades.
- Términos técnicos estándar pueden mantenerse en inglés (`build`, `deploy`, `hook`, etc.).

## 2) Nombres de archivo

- Formato obligatorio: **`kebab-case.md`**.
- Reglas:
  - Solo minúsculas.
  - Sin espacios.
  - Separar palabras con `-`.
- Ejemplos:
  - ✅ `incident-response.md`
  - ✅ `release-checklist.md`
  - ❌ `ReleaseChecklist.md`
  - ❌ `release checklist.md`

## 3) Estructura mínima por documento

Usar siempre las siguientes secciones en este orden:

1. `## Objetivo`
2. `## Prerequisitos`
3. `## Pasos`
4. `## Validación`
5. `## Problemas comunes`

Plantilla base:

```md
# Título del documento

## Objetivo
...

## Prerequisitos
...

## Pasos
1. ...
2. ...

## Validación
...

## Problemas comunes
- Problema / causa / solución.

> Última actualización: YYYY-MM-DD
```

## 4) Formato de comandos

- Todos los comandos de terminal van en bloques fenced con lenguaje `bash`.
- Incluir prompt `$` para distinguir comando de salida.

```bash
$ npm ci
$ npm run test
```

Cuando se muestre salida, separarla claramente:

```bash
$ npm run build
```

```text
vite v6.x building for production...
✓ built in 2.30s
```

## 5) Bloque de “Última actualización”

- Obligatorio al final de cada documento.
- Formato ISO recomendado: `YYYY-MM-DD`.

Ejemplo:

```md
> Última actualización: 2026-02-08
```

## 6) Enlaces y referencias

- Enlaces internos: relativos a `docs/`.
- Enlaces externos: usar URL completa (`https://...`).
- Evitar enlaces rotos; validar antes de mergear.

> Última actualización: 2026-02-08
