# Contexts

> React Context providers del proyecto

---

## BackgroundContext

Gestiona el tema de fondo global de la aplicación.

### Tipos

```typescript
type BackgroundTheme = 'nebula' | 'cyber' | 'void' | 'warm' | 'default';

interface BackgroundContextValue {
  theme: BackgroundTheme;
  setTheme: (theme: BackgroundTheme) => void;
}
```

### Provider

```tsx
// src/contexts/BackgroundContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

const BackgroundContext = createContext<BackgroundContextValue | undefined>(
  undefined
);

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<BackgroundTheme>('default');

  return (
    <BackgroundContext.Provider value={{ theme, setTheme }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export function useBackground(): BackgroundContextValue {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within BackgroundProvider');
  }
  return context;
}
```

### Setup

```tsx
// src/App.tsx
import { BackgroundProvider } from '@/contexts/BackgroundContext';

const App: React.FC = () => {
  return (
    <BackgroundProvider>
      <GlobalBackground />
      <Router>
        {/* Routes */}
      </Router>
    </BackgroundProvider>
  );
};
```

### Uso en Componentes

```tsx
import { useBackground } from '@/contexts/BackgroundContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useBackground();

  return (
    <div>
      <p>Tema actual: {theme}</p>
      <button onClick={() => setTheme('nebula')}>Nebula</button>
      <button onClick={() => setTheme('cyber')}>Cyber</button>
      <button onClick={() => setTheme('void')}>Void</button>
      <button onClick={() => setTheme('warm')}>Warm</button>
      <button onClick={() => setTheme('default')}>Default</button>
    </div>
  );
};
```

### Cambiar Tema por Página

```tsx
import { useEffect } from 'react';
import { useBackground } from '@/contexts/BackgroundContext';

const ServicesPage: React.FC = () => {
  const { setTheme } = useBackground();

  useEffect(() => {
    setTheme('cyber');
    return () => setTheme('default'); // Reset al salir
  }, [setTheme]);

  return <main>...</main>;
};
```

---

## Temas Disponibles

### nebula

Glows púrpura/azul con efecto nebulosa espacial.

```css
/* Colores aproximados */
--glow-1: rgba(139, 92, 246, 0.3);  /* Violeta */
--glow-2: rgba(59, 130, 246, 0.2);  /* Azul */
```

### cyber

Efectos verdes/neón con estética cyberpunk.

```css
--glow-1: rgba(152, 231, 16, 0.3);  /* Verde primary */
--glow-2: rgba(0, 255, 136, 0.15);  /* Verde neón */
```

### void

Minimalista y oscuro con sutiles sombras.

```css
--glow-1: rgba(255, 255, 255, 0.02);
--glow-2: rgba(255, 255, 255, 0.01);
```

### warm

Tonos cálidos con ambers y naranjas suaves.

```css
--glow-1: rgba(251, 191, 36, 0.15);  /* Amber */
--glow-2: rgba(249, 115, 22, 0.1);   /* Orange */
```

### default

Tema estándar con el verde primary de la marca.

```css
--glow-1: rgba(152, 231, 16, 0.2);
```

---

## GlobalBackground Component

El componente que renderiza los fondos animados:

```tsx
// src/components/layout/GlobalBackground.tsx
import { useBackground } from '@/contexts/BackgroundContext';
import { motion } from 'framer-motion';

const GlobalBackground: React.FC = () => {
  const { theme } = useBackground();

  const themeConfig = {
    nebula: {
      glows: [
        { color: 'rgba(139, 92, 246, 0.3)', size: 600 },
        { color: 'rgba(59, 130, 246, 0.2)', size: 500 },
      ],
    },
    cyber: {
      glows: [
        { color: 'rgba(152, 231, 16, 0.3)', size: 700 },
        { color: 'rgba(0, 255, 136, 0.15)', size: 400 },
      ],
    },
    // ... otros temas
  };

  const config = themeConfig[theme] || themeConfig.default;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {config.glows.map((glow, i) => (
        <motion.div
          key={`${theme}-${i}`}
          className="absolute rounded-full blur-[180px]"
          style={{
            backgroundColor: glow.color,
            width: glow.size,
            height: glow.size,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
```

---

## Creando Nuevos Contexts

### Template

```tsx
// src/contexts/NewContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Definir tipos
interface NewContextValue {
  state: string;
  setState: (value: string) => void;
}

// 2. Crear context
const NewContext = createContext<NewContextValue | undefined>(undefined);

// 3. Crear provider
export const NewProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState('initial');

  const value: NewContextValue = {
    state,
    setState,
  };

  return <NewContext.Provider value={value}>{children}</NewContext.Provider>;
};

// 4. Crear hook de acceso
export function useNewContext(): NewContextValue {
  const context = useContext(NewContext);
  if (!context) {
    throw new Error('useNewContext must be used within NewProvider');
  }
  return context;
}
```

### Añadir al App

```tsx
// src/App.tsx
import { NewProvider } from '@/contexts/NewContext';

const App: React.FC = () => {
  return (
    <BackgroundProvider>
      <NewProvider>
        {/* ... */}
      </NewProvider>
    </BackgroundProvider>
  );
};
```

---

*Última actualización: Enero 2026*
