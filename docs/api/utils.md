# Utilidades

> Funciones de utilidad del proyecto

---

## Validación (`src/utils/validation.ts`)

### validateContactForm

Valida los datos del formulario de contacto.

```typescript
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

function validateContactForm(data: ContactFormData): ValidationResult
```

#### Uso

```tsx
import { validateContactForm } from '@/utils/validation';

const handleSubmit = (formData: ContactFormData) => {
  const result = validateContactForm(formData);

  if (!result.isValid) {
    setError(result.error);
    return;
  }

  // Enviar formulario...
};
```

#### Validaciones

| Campo | Regla | Error |
|-------|-------|-------|
| name | Min 2 caracteres | "El nombre debe tener al menos 2 caracteres" |
| email | Formato válido | "Por favor, introduce un email válido" |
| message | Min 10 caracteres | "El mensaje debe tener al menos 10 caracteres" |
| message | Max 5000 caracteres | "El mensaje es demasiado largo" |

---

### validateEmail

Valida formato de email.

```typescript
function validateEmail(email: string): boolean
```

#### Uso

```tsx
import { validateEmail } from '@/utils/validation';

if (!validateEmail(email)) {
  setError('Email inválido');
}
```

---

### sanitizeInput

Sanitiza texto para prevenir XSS básico.

```typescript
function sanitizeInput(input: string): string
```

#### Uso

```tsx
import { sanitizeInput } from '@/utils/validation';

const safeName = sanitizeInput(userInput);
// Escapa: < > " ' /
```

#### Transformaciones

| Input | Output |
|-------|--------|
| `<script>` | `&lt;script&gt;` |
| `"quoted"` | `&quot;quoted&quot;` |
| `it's` | `it&#x27;s` |

---

### containsXSS

Detecta posibles patrones XSS.

```typescript
function containsXSS(input: string): boolean
```

#### Uso

```tsx
import { containsXSS } from '@/utils/validation';

if (containsXSS(userInput)) {
  setError('Contenido no permitido');
  return;
}
```

#### Patrones Detectados

- `<script>` tags
- Event handlers (`onclick=`, `onerror=`, etc.)
- `javascript:` URLs
- `data:` URLs

---

## Rate Limiting

### canSubmit

Verifica si se puede realizar un envío (rate limiting).

```typescript
function canSubmit(): boolean
```

#### Uso

```tsx
import { canSubmit, recordSubmission } from '@/utils/validation';

const handleSubmit = () => {
  if (!canSubmit()) {
    setError('Has enviado demasiados mensajes. Espera un momento.');
    return;
  }

  // Enviar...
  recordSubmission();
};
```

---

### recordSubmission

Registra un envío para el rate limiting.

```typescript
function recordSubmission(): void
```

#### Configuración

| Constante | Valor | Descripción |
|-----------|-------|-------------|
| `RATE_LIMIT` | 3 | Máximo de envíos |
| `RATE_WINDOW` | 60000ms | Ventana de tiempo (1 minuto) |

---

### getRemainingAttempts

Obtiene el número de intentos restantes.

```typescript
function getRemainingAttempts(): number
```

#### Uso

```tsx
import { getRemainingAttempts } from '@/utils/validation';

const remaining = getRemainingAttempts();
if (remaining === 0) {
  setWarning('No te quedan intentos. Espera un momento.');
}
```

---

## Animaciones (`src/styles/animation.ts`)

### Constantes de Easing

```typescript
export const EASE_ELITE = [0.22, 1, 0.36, 1];   // Expo out suave
export const EASE_SPRING = [0.16, 1, 0.3, 1];  // Spring sutil
```

### Uso con Framer Motion

```tsx
import { EASE_ELITE } from '@/styles/animation';

<motion.div
  transition={{ duration: 0.8, ease: EASE_ELITE }}
>
```

---

## Variants (`src/styles/variants.ts`)

### containerVariants

Para animaciones stagger de contenedores.

```typescript
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};
```

### itemVariants

Para elementos hijos con animación de entrada.

```typescript
export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: EASE_ELITE,
    },
  },
};
```

### Uso Combinado

```tsx
import { containerVariants, itemVariants } from '@/styles/variants';

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.h1 variants={itemVariants}>Título</motion.h1>
  <motion.p variants={itemVariants}>Descripción</motion.p>
  <motion.button variants={itemVariants}>CTA</motion.button>
</motion.div>
```

---

## Funciones de Utilidad Comunes

### Formatear Fecha

```typescript
function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

// Uso
formatDate('2026-01-15'); // "15 de enero de 2026"
```

### Slugify

```typescript
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Uso
slugify('¿Cómo automatizar tu negocio?'); // "como-automatizar-tu-negocio"
```

### Truncar Texto

```typescript
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Uso
truncate('Este es un texto muy largo', 20); // "Este es un texto..."
```

### Debounce

```typescript
function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T {
  let timeoutId: ReturnType<typeof setTimeout>;

  return ((...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }) as T;
}

// Uso
const debouncedSearch = debounce((query: string) => {
  search(query);
}, 300);
```

---

*Última actualización: Enero 2026*
