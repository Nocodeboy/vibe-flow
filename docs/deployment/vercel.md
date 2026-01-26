# Despliegue en Vercel

> Configuración y despliegue en Vercel

---

## Setup Inicial

### 1. Crear Cuenta

Si no tienes cuenta, regístrate en [vercel.com](https://vercel.com) (puedes usar GitHub).

### 2. Importar Proyecto

1. Dashboard > "Add New Project"
2. "Import Git Repository"
3. Seleccionar `Nocodeboy/vibe-flow`
4. Click "Import"

### 3. Configuración Automática

Vercel detecta automáticamente:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 4. Variables de Entorno

Antes del primer deploy, configurar:

| Variable | Valor |
|----------|-------|
| `VITE_CONTACT_ENDPOINT` | URL del webhook de contacto |

---

## Configuración de Proyecto

### vercel.json

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

### Headers de Seguridad

| Header | Función |
|--------|---------|
| X-Frame-Options | Previene clickjacking |
| X-Content-Type-Options | Previene MIME sniffing |
| Referrer-Policy | Controla referer |
| X-XSS-Protection | Protección XSS |
| Permissions-Policy | Restringe APIs |

### Rewrites

El rewrite `/((?!api/).*)` → `/index.html` permite que React Router maneje todas las rutas excepto `/api/*`.

---

## Edge Functions

### Estructura

```
api/
└── contact.ts    # POST /api/contact
```

### Función de Contacto

```typescript
// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validación
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    // Enviar a webhook
    await fetch(process.env.CONTACT_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}
```

---

## Dominios

### Dominio de Vercel

Por defecto: `proyecto.vercel.app`

### Dominio Personalizado

1. Settings > Domains
2. Añadir dominio (ej: `vibeflow.es`)
3. Configurar DNS:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`

### SSL

Vercel genera certificado SSL automáticamente para todos los dominios.

---

## Preview Deployments

### Funcionamiento

- Cada PR genera una URL de preview
- URL: `proyecto-git-branch-user.vercel.app`
- Se actualiza con cada commit

### Comentarios en PR

Vercel bot comenta automáticamente en PRs con:
- Link al preview
- Métricas de build
- Cambios de tamaño

---

## Monitorización

### Analytics

En Dashboard > Analytics:
- Web Vitals (LCP, FID, CLS)
- Visitas y pageviews
- Países y dispositivos

### Logs

En Dashboard > Deployments > Functions:
- Logs de Edge Functions
- Errores y warnings
- Tiempo de respuesta

---

## Rollback

### Desde Dashboard

1. Deployments
2. Seleccionar deployment anterior
3. "Promote to Production"

### Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Listar deployments
vercel ls

# Promover deployment específico
vercel promote [deployment-url]
```

---

## Optimizaciones

### Caching

Headers de cache automáticos:
- Assets con hash: `Cache-Control: public, max-age=31536000, immutable`
- HTML: `Cache-Control: public, max-age=0, must-revalidate`

### Compression

- Brotli y Gzip automáticos
- Sin configuración adicional

### Edge Network

- CDN global con 30+ ubicaciones
- Assets servidos desde edge más cercano

---

## Troubleshooting

### Build Falla

```bash
# Verificar build local
npm run build

# Ver logs en Vercel
# Dashboard > Deployment > Build Logs
```

### 404 en Rutas

Verificar que `vercel.json` tiene el rewrite correcto:
```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

### Variables de Entorno No Funcionan

- Verificar que tienen prefijo `VITE_` para cliente
- Redeplegar después de cambiar variables
- Variables sin `VITE_` solo disponibles en Edge Functions

### Edge Function Timeout

- Timeout por defecto: 10s (Hobby), 60s (Pro)
- Optimizar llamadas a APIs externas
- Usar edge runtime si es posible

---

## CLI de Vercel

### Instalación

```bash
npm i -g vercel
```

### Comandos Útiles

```bash
# Login
vercel login

# Deploy desde local
vercel

# Deploy a producción
vercel --prod

# Ver logs
vercel logs

# Listar deployments
vercel ls

# Variables de entorno
vercel env ls
vercel env add NOMBRE_VARIABLE
vercel env rm NOMBRE_VARIABLE
```

---

*Última actualización: Enero 2026*
