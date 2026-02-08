# Workflow de desarrollo y calidad

Guía práctica para saber **qué script ejecutar**, **en qué momento** y cómo resolver errores frecuentes de entorno local.

## Flujo recomendado (día a día)

1. **Preparar entorno**
   ```bash
   npm ci
   cp .env.example .env
   ```
2. **Desarrollo local**
   ```bash
   npm run dev
   ```
3. **Validación de calidad antes de commit**
   ```bash
   npm run lint
   npm run type-check
   npm run test
   ```
4. **Chequeo de build antes de PR/despliegue**
   ```bash
   npm run build
   npm run preview
   ```

---

## Scripts de calidad y cuándo usar cada uno

## `npm run lint`

- **Objetivo:** detectar problemas de estilo, buenas prácticas React y errores potenciales.
- **Cuándo usarlo:**
  - Antes de cada commit.
  - Tras refactors de componentes/hooks.
  - Antes de abrir PR.
- **Tip:** si hay errores corregibles automáticamente, usar `npm run lint:fix` y volver a ejecutar `npm run lint`.

## `npm run type-check`

- **Objetivo:** validar tipos TypeScript con `tsc --noEmit`.
- **Cuándo usarlo:**
  - Siempre que cambies tipos, props, hooks o contratos de datos.
  - Antes de merge a rama principal.
- **Tip:** ejecútalo junto con lint para cubrir errores de compilación silenciosos.

## `npm run test`

- **Objetivo:** ejecutar la suite de Vitest para validar comportamiento.
- **Cuándo usarlo:**
  - Antes de commit si tocaste lógica (`utils`, `hooks`, componentes con estado).
  - Antes de crear PR.
- **Variantes útiles:**
  - `npm run test -- --watch` para iterar en TDD.
  - `npm run test:coverage` para revisar cobertura en cambios sensibles.

---

## Matriz rápida de decisión

| Situación | Script mínimo |
|-----------|---------------|
| Cambié estilos/layout | `npm run lint` |
| Cambié props, interfaces o tipos | `npm run lint` + `npm run type-check` |
| Cambié lógica o comportamiento | `npm run lint` + `npm run type-check` + `npm run test` |
| Release/PR crítica | `npm run lint` + `npm run type-check` + `npm run test` + `npm run build` |

---

## Errores frecuentes (entorno local)

## 1) `npm ERR! ERESOLVE` o conflictos de dependencias

**Síntoma:** instalación falla por árbol de dependencias.

**Solución recomendada:**
```bash
rm -rf node_modules package-lock.json
npm install
```

Si trabajas en CI o quieres entorno limpio reproducible, usa:
```bash
npm ci
```

## 2) Puerto ocupado al levantar Vite

**Síntoma:** `Port 3000 is already in use`.

**Opciones:**
```bash
npm run dev -- --port 3001
```

O liberar el puerto en Linux/macOS:
```bash
lsof -ti:3000 | xargs kill -9
```

## 3) `Cannot find module` / errores tras cambiar de rama

**Síntoma:** imports rotos o paquetes faltantes después de `git pull`/checkout.

**Solución:**
```bash
npm ci
```

Si persiste:
```bash
rm -rf node_modules
npm install
```

## 4) Fallos de `type-check` por variables de entorno

**Síntoma:** uso de `import.meta.env.*` no definido o comportamiento inesperado.

**Solución:**
1. Verifica que existe `.env` (a partir de `.env.example`).
2. Asegura prefijo `VITE_` para variables expuestas al cliente.
3. Reinicia `npm run dev` tras cambiar `.env`.

## 5) Tests inestables por entorno de navegador

**Síntoma:** tests de hooks/componentes fallan de forma intermitente.

**Solución:**
- Ejecuta tests aislados para depurar:
  ```bash
  npm run test -- src/hooks/useFocusTrap.test.ts
  ```
- Revisa mocks de `window`, timers o APIs DOM.
- Confirma que la configuración global de tests está cargando (`src/test/setup.ts`).

---

## Checklist antes de abrir PR

- [ ] `npm run lint`
- [ ] `npm run type-check`
- [ ] `npm run test`
- [ ] `npm run build` (si el cambio impacta rutas, bundling o comportamiento de producción)
