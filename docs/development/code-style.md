# Estándares de Código

> Convenciones y estilo de código para Vibe Flow

---

## Principios Generales

1. **Legibilidad** sobre brevedad
2. **Consistencia** en todo el codebase
3. **Tipado fuerte** con TypeScript
4. **Accesibilidad** desde el diseño
5. **Simplicidad** sobre abstracción prematura

---

## TypeScript

### Modo Estricto

El proyecto usa `strict: true`. Esto significa:

```typescript
// ❌ Incorrecto: any implícito
function processData(data) {
  return data.value;
}

// ✅ Correcto: tipos explícitos
function processData(data: { value: string }): string {
  return data.value;
}
```

### Interfaces vs Types

```typescript
// Usar interface para objetos
interface User {
  id: string;
  name: string;
  email: string;
}

// Usar type para unions, intersections, primitivos
type Status = 'pending' | 'active' | 'completed';
type Nullable<T> = T | null;
```

### Props de Componentes

```typescript
// Siempre definir interface para props
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
}) => {
  // ...
};
```

### Evitar `any`

```typescript
// ❌ Evitar
const data: any = fetchData();

// ✅ Mejor: tipo específico
const data: User[] = fetchData();

// ✅ Si no conoces el tipo: unknown
const data: unknown = fetchData();
if (isUserArray(data)) {
  // TypeScript sabe que es User[]
}
```

---

## React

### Componentes Funcionales

```typescript
// ✅ Usar componentes funcionales
const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

export default Component;
```

### Hooks

```typescript
// ✅ Llamar hooks al inicio del componente
const Component: React.FC = () => {
  const [state, setState] = useState(initial);
  const ref = useRef(null);
  const memoized = useMemo(() => compute(), [dep]);

  // Lógica...

  return <div>...</div>;
};
```

### Eventos

```typescript
// ✅ Tipar eventos correctamente
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

### Keys en Listas

```typescript
// ❌ No usar índice como key
{items.map((item, index) => (
  <Item key={index} data={item} />
))}

// ✅ Usar ID único
{items.map((item) => (
  <Item key={item.id} data={item} />
))}
```

---

## Convenciones de Nombrado

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| **Componentes** | PascalCase | `ServiceCard`, `HeroSection` |
| **Hooks** | camelCase + `use` prefix | `useFocusTrap`, `useSEO` |
| **Funciones** | camelCase | `validateEmail`, `formatDate` |
| **Variables** | camelCase | `userName`, `isLoading` |
| **Constantes** | SCREAMING_SNAKE_CASE | `API_URL`, `EASE_ELITE` |
| **Tipos/Interfaces** | PascalCase | `UserProps`, `ServiceData` |
| **Archivos componentes** | PascalCase.tsx | `Button.tsx` |
| **Archivos utils** | camelCase.ts | `validation.ts` |
| **CSS classes** | kebab-case | `.section-title` |

### Booleanos

```typescript
// Usar prefijos is/has/should/can
const isLoading = true;
const hasError = false;
const shouldRender = true;
const canSubmit = false;
```

### Handlers

```typescript
// Prefijo handle para funciones internas
const handleClick = () => {};
const handleSubmit = () => {};

// Prefijo on para props de callbacks
interface Props {
  onClick: () => void;
  onSubmit: (data: FormData) => void;
}
```

---

## Tailwind CSS

### Orden de Clases

Seguir orden lógico:

```tsx
className={`
  // 1. Layout (display, position)
  flex flex-col relative

  // 2. Spacing (margin, padding)
  mx-auto px-6 py-4

  // 3. Sizing (width, height)
  w-full max-w-7xl h-auto

  // 4. Typography
  text-lg font-bold text-white/80

  // 5. Background & Border
  bg-surface border border-white/10 rounded-xl

  // 6. Effects (shadow, opacity, blur)
  shadow-lg backdrop-blur-sm

  // 7. Transitions
  transition-all duration-300

  // 8. States (hover, focus, active)
  hover:bg-white/10 focus-visible:outline-2

  // 9. Responsive (sm:, md:, lg:)
  md:flex-row md:text-xl
`}
```

### Clases Condicionales

```tsx
// ✅ Con template literals
className={`
  px-4 py-2 rounded-lg
  ${variant === 'primary' ? 'bg-primary text-black' : 'bg-white/10 text-white'}
  ${disabled && 'opacity-50 cursor-not-allowed'}
`}

// ✅ Con clsx/classnames para casos complejos
import clsx from 'clsx';

className={clsx(
  'px-4 py-2 rounded-lg',
  {
    'bg-primary text-black': variant === 'primary',
    'bg-white/10 text-white': variant === 'secondary',
    'opacity-50 cursor-not-allowed': disabled,
  }
)}
```

---

## Imports

### Orden de Imports

```typescript
// 1. React y librerías core
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 2. Librerías de terceros
import { useNavigate } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

// 3. Componentes internos
import Button from '@/components/atoms/Button';
import Card from '@/components/molecules/Card';

// 4. Hooks internos
import { useSEO } from '@/hooks/useSEO';

// 5. Utils y constantes
import { validateEmail } from '@/utils/validation';
import { EASE_ELITE } from '@/styles/animation';

// 6. Tipos
import type { ServiceData } from '@/types';

// 7. Estilos (si aplica)
import './styles.css';
```

### Path Aliases

```typescript
// ✅ Usar alias
import { Button } from '@/components/atoms/Button';

// ❌ Evitar paths relativos largos
import { Button } from '../../../components/atoms/Button';
```

---

## Comentarios

### Cuándo Comentar

```typescript
// ✅ Comentar lógica compleja
// Calculamos el offset basado en el scroll position
// para crear el efecto parallax de 0.5x
const parallaxOffset = scrollY * 0.5;

// ✅ Comentar decisiones no obvias
// Usamos 300ms porque coincide con la transición del CSS
const ANIMATION_DURATION = 300;

// ❌ No comentar lo obvio
// Incrementa el contador
setCount(count + 1);
```

### JSDoc para Funciones Públicas

```typescript
/**
 * Validates a contact form submission.
 *
 * @param data - The form data to validate
 * @returns Validation result with isValid flag and optional error
 *
 * @example
 * const result = validateContactForm({ name: 'John', email: 'john@example.com', message: 'Hello' });
 * if (!result.isValid) {
 *   console.error(result.error);
 * }
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  // ...
}
```

---

## Errores y Edge Cases

### Error Handling

```typescript
// ✅ Manejar errores explícitamente
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return await response.json();
} catch (error) {
  if (error instanceof Error) {
    console.error('Fetch failed:', error.message);
  }
  throw error;
}
```

### Null Checks

```typescript
// ✅ Optional chaining
const userName = user?.profile?.name;

// ✅ Nullish coalescing
const displayName = userName ?? 'Anonymous';

// ✅ Early return
if (!data) {
  return null;
}
```

---

## Testing

### Nombrado de Tests

```typescript
describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should return false for invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
  });

  it('should handle empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});
```

### Estructura AAA

```typescript
it('should update state on click', async () => {
  // Arrange
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click</Button>);

  // Act
  await userEvent.click(screen.getByText('Click'));

  // Assert
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

---

## Checklist de Code Review

- [ ] TypeScript: Sin `any`, tipos correctos
- [ ] React: Hooks al inicio, keys únicos
- [ ] Tailwind: Clases organizadas
- [ ] Accesibilidad: aria-*, keyboard nav
- [ ] Nombrado: Descriptivo y consistente
- [ ] Tests: Casos relevantes cubiertos
- [ ] Sin console.log o código comentado

---

*Última actualización: Enero 2026*
