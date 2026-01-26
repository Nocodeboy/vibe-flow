# Seguridad

> Prácticas de seguridad implementadas en Vibe Flow

---

## Resumen

El proyecto implementa múltiples capas de seguridad:
- Validación de entrada
- Protección XSS
- Rate limiting
- Security headers
- Manejo seguro de secretos

---

## Validación de Formularios

### Validación Client-Side

```typescript
// src/utils/validation.ts

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): ValidationResult {
  // Validar nombre
  if (!data.name || data.name.trim().length < 2) {
    return { isValid: false, error: 'El nombre debe tener al menos 2 caracteres' };
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { isValid: false, error: 'Por favor, introduce un email válido' };
  }

  // Validar mensaje
  if (!data.message || data.message.trim().length < 10) {
    return { isValid: false, error: 'El mensaje debe tener al menos 10 caracteres' };
  }

  // Validar longitud máxima
  if (data.message.length > 5000) {
    return { isValid: false, error: 'El mensaje es demasiado largo' };
  }

  return { isValid: true };
}
```

### Sanitización de Entrada

```typescript
// Sanitizar texto para prevenir XSS básico
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Detectar posibles ataques XSS
export function containsXSS(input: string): boolean {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /on\w+\s*=/gi,
    /javascript:/gi,
    /data:/gi,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}
```

---

## Rate Limiting

### Implementación Client-Side

```typescript
// src/utils/validation.ts

const RATE_LIMIT = 3;           // Máximo de envíos
const RATE_WINDOW = 60 * 1000;  // Ventana de 1 minuto

let submissions: number[] = [];

export function canSubmit(): boolean {
  const now = Date.now();
  // Limpiar envíos antiguos
  submissions = submissions.filter(time => now - time < RATE_WINDOW);
  return submissions.length < RATE_LIMIT;
}

export function recordSubmission(): void {
  submissions.push(Date.now());
}

export function getRemainingAttempts(): number {
  const now = Date.now();
  submissions = submissions.filter(time => now - time < RATE_WINDOW);
  return Math.max(0, RATE_LIMIT - submissions.length);
}
```

### Uso en Componente

```tsx
const ContactForm: React.FC = () => {
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit()) {
      setError('Has enviado demasiados mensajes. Espera un momento.');
      return;
    }

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setError(validation.error!);
      return;
    }

    recordSubmission();
    // Enviar...
  };
};
```

---

## Security Headers

### Configuración en Vercel

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"
        }
      ]
    }
  ]
}
```

### Explicación de Headers

| Header | Propósito |
|--------|-----------|
| `X-Frame-Options: DENY` | Previene clickjacking |
| `X-Content-Type-Options: nosniff` | Previene MIME sniffing |
| `Referrer-Policy` | Controla información del referer |
| `X-XSS-Protection` | Activa protección XSS del navegador |
| `Permissions-Policy` | Restringe APIs del navegador |
| `Content-Security-Policy` | Controla recursos permitidos |

---

## Variables de Entorno

### Manejo Seguro

```bash
# .env (NO commitear)
VITE_CONTACT_ENDPOINT=https://api.example.com/contact

# .env.example (commitear como template)
VITE_CONTACT_ENDPOINT=https://tu-endpoint-aqui
```

### Reglas Importantes

1. **Variables `VITE_`** son públicas (incluidas en el bundle)
2. **Nunca** poner API keys privadas con prefijo `VITE_`
3. **Siempre** usar `.gitignore` para archivos `.env`

```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

### Acceso en Código

```typescript
// ✅ Acceso seguro con fallback
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT ?? '';

if (!endpoint) {
  console.error('Contact endpoint not configured');
  return;
}
```

---

## API Edge Function

### Validación Server-Side

```typescript
// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validar campos requeridos
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  // Validar longitud
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  try {
    // Enviar a webhook
    const response = await fetch(process.env.CONTACT_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      throw new Error('Webhook failed');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

---

## Dependencias

### Auditar Vulnerabilidades

```bash
# Verificar vulnerabilidades
npm audit

# Corregir automáticamente (si es posible)
npm audit fix

# Forzar corrección (puede romper compatibilidad)
npm audit fix --force
```

### Mantener Actualizadas

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar (con cuidado)
npm update

# Actualizar major versions (revisar changelog primero)
npm install package@latest
```

### Lock File

**Siempre** commitear `package-lock.json` para builds reproducibles.

---

## Protección contra Ataques Comunes

### XSS (Cross-Site Scripting)

1. React escapa automáticamente el contenido en JSX
2. Nunca usar `dangerouslySetInnerHTML` sin sanitizar
3. Validar y sanitizar entrada del usuario

```tsx
// ❌ Peligroso
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Seguro (si es necesario)
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### CSRF (Cross-Site Request Forgery)

- Las Edge Functions de Vercel usan tokens implícitos
- Para APIs más complejas, implementar tokens CSRF explícitos

### Clickjacking

- Header `X-Frame-Options: DENY` previene embedding en iframes

### Injection

- Usar queries parametrizadas (si hay base de datos)
- Nunca concatenar input del usuario en queries

---

## Checklist de Seguridad

### Desarrollo

- [ ] Validación de entrada en cliente
- [ ] Validación de entrada en servidor
- [ ] Sanitización de datos
- [ ] Rate limiting implementado
- [ ] Sin `console.log` de datos sensibles

### Configuración

- [ ] Variables de entorno seguras
- [ ] `.env` en `.gitignore`
- [ ] Security headers configurados
- [ ] HTTPS forzado

### Dependencias

- [ ] `npm audit` sin vulnerabilidades críticas
- [ ] Dependencias actualizadas
- [ ] Lock file commiteado

### Producción

- [ ] Sourcemaps deshabilitados
- [ ] Console logs eliminados
- [ ] Error messages genéricos para usuarios

---

## Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Vercel Security](https://vercel.com/docs/security)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)

---

*Última actualización: Enero 2026*
