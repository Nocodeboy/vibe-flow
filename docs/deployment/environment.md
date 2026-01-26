# Variables de Entorno

> Configuración de variables de entorno

---

## Resumen

| Variable | Requerida | Entorno | Descripción |
|----------|-----------|---------|-------------|
| `VITE_CONTACT_ENDPOINT` | Sí | Cliente | URL del webhook de contacto |
| `CONTACT_WEBHOOK` | No | Servidor | URL interna del webhook (Edge Functions) |

---

## Variables de Cliente

Las variables con prefijo `VITE_` son incluidas en el bundle y accesibles en el navegador.

### VITE_CONTACT_ENDPOINT

URL del endpoint para el formulario de contacto.

```env
VITE_CONTACT_ENDPOINT=https://hooks.airtable.com/workflows/v1/xxxxx
```

**Acceso en código:**

```typescript
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
```

**Seguridad:**
- Esta variable es **pública** (visible en el bundle)
- Solo usar para endpoints públicos
- No poner API keys aquí

---

## Variables de Servidor

Variables sin prefijo `VITE_` solo están disponibles en Edge Functions.

### CONTACT_WEBHOOK

URL interna del webhook (si es diferente del público).

```env
CONTACT_WEBHOOK=https://api.internal.example.com/webhook
```

**Acceso en Edge Function:**

```typescript
// api/contact.ts
const webhook = process.env.CONTACT_WEBHOOK;
```

---

## Configuración por Entorno

### Desarrollo Local

1. Crear archivo `.env`:
   ```bash
   cp .env.example .env
   ```

2. Editar `.env`:
   ```env
   VITE_CONTACT_ENDPOINT=https://tu-endpoint-de-prueba
   ```

### Producción (Vercel)

1. Dashboard > Settings > Environment Variables
2. Añadir cada variable
3. Seleccionar entornos (Production, Preview, Development)
4. Guardar y redeplegar

---

## Archivos de Entorno

### .env.example

Template para nuevos desarrolladores (commitear):

```env
# Endpoint para formulario de contacto
# Obtener de Airtable/Make/Zapier
VITE_CONTACT_ENDPOINT=https://tu-endpoint-aqui
```

### .env

Valores reales (NO commitear):

```env
VITE_CONTACT_ENDPOINT=https://hooks.airtable.com/workflows/v1/real-token
```

### .gitignore

```gitignore
# Environment files
.env
.env.local
.env.*.local
```

---

## Acceso en TypeScript

### Tipado de Variables

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_ENDPOINT: string;
  // Añadir más variables aquí
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### Uso Seguro

```typescript
// Con fallback
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT ?? '';

// Con validación
if (!import.meta.env.VITE_CONTACT_ENDPOINT) {
  console.error('VITE_CONTACT_ENDPOINT not configured');
  throw new Error('Missing environment variable');
}
```

---

## Validación en Build

### Verificar Variables Requeridas

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  // Cargar env
  const env = loadEnv(mode, process.cwd(), '');

  // Validar en producción
  if (mode === 'production') {
    if (!env.VITE_CONTACT_ENDPOINT) {
      throw new Error('VITE_CONTACT_ENDPOINT is required');
    }
  }

  return {
    // config...
  };
});
```

---

## Webhooks Soportados

### Airtable

```env
VITE_CONTACT_ENDPOINT=https://hooks.airtable.com/workflows/v1/[workflow-id]
```

### Make (Integromat)

```env
VITE_CONTACT_ENDPOINT=https://hook.eu1.make.com/[webhook-id]
```

### Zapier

```env
VITE_CONTACT_ENDPOINT=https://hooks.zapier.com/hooks/catch/[account-id]/[hook-id]
```

### n8n

```env
VITE_CONTACT_ENDPOINT=https://tu-instancia.n8n.cloud/webhook/[id]
```

---

## Troubleshooting

### Variable No Disponible

1. Verificar prefijo `VITE_`
2. Reiniciar servidor de desarrollo
3. Verificar `.env` está en la raíz

### Variable en Vercel No Funciona

1. Verificar que se añadió correctamente
2. Redeplegar después de añadir
3. Verificar entorno (Production vs Preview)

### Exponer Secreto por Error

Si commits un secreto:

1. Regenerar el token/key inmediatamente
2. Usar `git filter-branch` o BFG para limpiar historial
3. Force push (con cuidado)

```bash
# Eliminar archivo del historial
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env' \
  --prune-empty --tag-name-filter cat -- --all
```

---

## Mejores Prácticas

1. **Nunca** commitear `.env` con valores reales
2. **Siempre** tener `.env.example` actualizado
3. **Validar** variables requeridas en build
4. **Documentar** cada variable en este archivo
5. **Rotar** secretos periódicamente
6. **Usar** variables diferentes por entorno

---

*Última actualización: Enero 2026*
