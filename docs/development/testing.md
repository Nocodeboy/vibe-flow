# Testing

> Estrategia y guía de testing para Vibe Flow

---

## Stack de Testing

| Herramienta | Propósito |
|-------------|-----------|
| **Vitest** | Test runner (compatible con Jest) |
| **React Testing Library** | Testing de componentes |
| **jsdom** | Simulación del DOM |

---

## Ejecutar Tests

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar en modo watch
npm run test -- --watch

# Ejecutar con cobertura
npm run test:coverage

# Ejecutar test específico
npm run test -- validation

# Ejecutar tests de un archivo
npm run test -- src/utils/validation.test.ts
```

---

## Estructura de Tests

### Ubicación

Los tests se ubican junto a los archivos que prueban:

```
src/
├── utils/
│   ├── validation.ts
│   └── validation.test.ts    # ✅ Junto al archivo
├── hooks/
│   ├── useFocusTrap.ts
│   └── useFocusTrap.test.ts  # ✅ Junto al hook
└── test/
    └── setup.ts              # Configuración global
```

### Nombrado

```typescript
// Archivo: nombre.test.ts o nombre.spec.ts
validation.test.ts
useFocusTrap.test.ts
Button.test.tsx  // Para componentes
```

---

## Escribir Tests

### Test Básico

```typescript
import { describe, it, expect } from 'vitest';
import { validateEmail } from './validation';

describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('should return false for invalid email', () => {
    expect(validateEmail('invalid')).toBe(false);
  });
});
```

### Test de Componente

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Test de Hook

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('should start with initial value', () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);
  });
});
```

---

## Patrones de Testing

### Arrange-Act-Assert (AAA)

```typescript
it('should submit form with valid data', async () => {
  // Arrange - Preparar
  const onSubmit = vi.fn();
  render(<ContactForm onSubmit={onSubmit} />);

  // Act - Actuar
  await userEvent.type(screen.getByLabelText('Name'), 'John');
  await userEvent.type(screen.getByLabelText('Email'), 'john@test.com');
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  // Assert - Verificar
  expect(onSubmit).toHaveBeenCalledWith({
    name: 'John',
    email: 'john@test.com',
  });
});
```

### Test Cases Agrupados

```typescript
describe('validateContactForm', () => {
  describe('name validation', () => {
    it('should reject empty name', () => { /* ... */ });
    it('should reject name with only spaces', () => { /* ... */ });
    it('should accept valid name', () => { /* ... */ });
  });

  describe('email validation', () => {
    it('should reject invalid email', () => { /* ... */ });
    it('should accept valid email', () => { /* ... */ });
  });
});
```

### Mocking

```typescript
import { vi } from 'vitest';

// Mock de función
const mockFn = vi.fn();
mockFn.mockReturnValue('value');
mockFn.mockResolvedValue('async value');

// Mock de módulo
vi.mock('@/utils/api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'test' }),
}));

// Mock de timer
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();
```

---

## Testing React Components

### Queries Preferidas

```typescript
// 1. Por role (más accesible)
screen.getByRole('button', { name: 'Submit' });
screen.getByRole('textbox', { name: 'Email' });

// 2. Por label (para formularios)
screen.getByLabelText('Email');

// 3. Por texto
screen.getByText('Welcome');

// 4. Por test-id (último recurso)
screen.getByTestId('custom-element');
```

### Queries Asíncronas

```typescript
// Esperar a que aparezca
const element = await screen.findByText('Loaded');

// Verificar que no existe
await waitFor(() => {
  expect(screen.queryByText('Loading')).not.toBeInTheDocument();
});
```

### User Events

```typescript
import userEvent from '@testing-library/user-event';

// Setup
const user = userEvent.setup();

// Click
await user.click(button);

// Typing
await user.type(input, 'Hello');

// Clear and type
await user.clear(input);
await user.type(input, 'New value');

// Keyboard
await user.keyboard('{Enter}');
await user.keyboard('{Escape}');

// Tab
await user.tab();
```

---

## Testing Específico

### Testing de Animaciones

```typescript
// Mock de Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// O desactivar animaciones
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});
```

### Testing de Routing

```typescript
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

it('navigates on click', async () => {
  renderWithRouter(<Navbar />);
  await userEvent.click(screen.getByText('Contact'));
  expect(window.location.pathname).toBe('/contacto');
});
```

### Testing de Context

```typescript
import { BackgroundProvider } from '@/contexts/BackgroundContext';

const renderWithContext = (component: React.ReactElement) => {
  return render(
    <BackgroundProvider>
      {component}
    </BackgroundProvider>
  );
};

it('uses context value', () => {
  renderWithContext(<ComponentUsingContext />);
  // ...
});
```

---

## Cobertura de Tests

### Ejecutar con Cobertura

```bash
npm run test:coverage
```

### Interpretar Resultados

```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   75.5  |   60.2   |   70.1  |   75.5  |
 validation.ts      |   100   |   100    |   100   |   100   |
 useFocusTrap.ts    |   85.7  |   75.0   |   100   |   85.7  |
--------------------|---------|----------|---------|---------|
```

### Métricas Objetivo

| Métrica | Objetivo | Crítico |
|---------|----------|---------|
| Statements | > 70% | > 50% |
| Branches | > 60% | > 40% |
| Functions | > 70% | > 50% |
| Lines | > 70% | > 50% |

---

## Buenas Prácticas

### Do's

- ✅ Testear comportamiento, no implementación
- ✅ Un assert lógico por test
- ✅ Nombres descriptivos
- ✅ Tests independientes (no dependen de orden)
- ✅ Testear edge cases

### Don'ts

- ❌ No testear detalles de implementación
- ❌ No testear librerías de terceros
- ❌ No hacer tests que siempre pasan
- ❌ No ignorar tests que fallan

### Ejemplo de Buen Test

```typescript
// ✅ Descriptivo, testea comportamiento
it('should show error message when email is invalid', async () => {
  render(<ContactForm />);

  await userEvent.type(screen.getByLabelText('Email'), 'invalid');
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  expect(screen.getByText('Por favor, introduce un email válido')).toBeInTheDocument();
});
```

### Ejemplo de Mal Test

```typescript
// ❌ Testea implementación, no comportamiento
it('should call setError with correct value', () => {
  const setError = vi.fn();
  // Exponer internos para testear...
});
```

---

## Configuración

### `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

### `src/test/setup.ts`

```typescript
import '@testing-library/jest-dom';

// Configuración global
beforeAll(() => {
  // Setup antes de todos los tests
});

afterEach(() => {
  // Cleanup después de cada test
});
```

---

*Última actualización: Enero 2026*
