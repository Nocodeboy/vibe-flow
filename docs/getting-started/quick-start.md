# Inicio Rápido

> Comienza a trabajar con Vibe Flow en 5 minutos

---

## TL;DR

```bash
# 1. Clonar e instalar
git clone https://github.com/Nocodeboy/vibe-flow.git
cd vibe-flow
npm install

# 2. Configurar entorno
cp .env.example .env

# 3. Iniciar desarrollo
npm run dev
# Abrir http://localhost:3000
```

---

## Estructura Básica del Proyecto

```
vibe-flow/
├── src/
│   ├── components/          # Componentes React (Atomic Design)
│   │   ├── atoms/          # Elementos básicos (Button, Badge)
│   │   ├── molecules/      # Combinaciones (Card, FAQItem)
│   │   ├── organisms/      # Secciones (Hero, Footer)
│   │   └── layout/         # Estructurales (ErrorBoundary)
│   ├── pages/              # Páginas/Rutas
│   ├── hooks/              # Custom hooks
│   ├── contexts/           # React Context
│   ├── utils/              # Utilidades
│   ├── data/               # Datos estáticos
│   ├── types/              # Tipos TypeScript
│   └── styles/             # Estilos y animaciones
├── public/                 # Assets estáticos
├── api/                    # Funciones serverless (Vercel)
└── docs/                   # Documentación
```

---

## Flujo de Trabajo Básico

### 1. Crear un Nuevo Componente

Los componentes siguen Atomic Design. Ejemplo de un nuevo átomo:

```tsx
// src/components/atoms/MyButton.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface MyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const MyButton: React.FC<MyButtonProps> = ({
  children,
  onClick,
  variant = 'primary'
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm
        transition-all duration-300
        ${variant === 'primary'
          ? 'bg-primary text-black hover:shadow-[0_0_40px_rgba(152,231,16,0.3)]'
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
        }
      `}
    >
      {children}
    </motion.button>
  );
};

export default MyButton;
```

### 2. Añadir una Nueva Página

```tsx
// src/pages/NewPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { itemVariants, containerVariants } from '../styles/variants';

const NewPage: React.FC = () => {
  useSEO({
    title: 'Nueva Página | Vibe Flow',
    description: 'Descripción de la nueva página',
  });

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-32 px-6"
    >
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-display italic font-bold">
          Nueva Página
        </h1>
      </motion.div>
    </motion.main>
  );
};

export default NewPage;
```

### 3. Registrar la Ruta

```tsx
// src/App.tsx
import { lazy } from 'react';

const NewPage = lazy(() => import('./pages/NewPage'));

// En el Router, añadir:
<Route path="/nueva-pagina" element={<NewPage />} />
```

---

## Scripts Esenciales

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo (puerto 3000) |
| `npm run build` | Genera build de producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run lint` | Verifica código con ESLint |
| `npm run lint:fix` | Corrige errores de ESLint automáticamente |
| `npm run format` | Formatea código con Prettier |
| `npm run test` | Ejecuta tests con Vitest |
| `npm run type-check` | Verifica tipos TypeScript |

---

## Patrones Comunes

### Usar el Sistema de Animaciones

```tsx
import { motion } from 'framer-motion';
import { itemVariants, containerVariants, EASE_ELITE } from '../styles/variants';

// En el componente:
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.p variants={itemVariants}>
    Contenido animado
  </motion.p>
</motion.div>
```

### Usar el Hook de SEO

```tsx
import { useSEO } from '../hooks/useSEO';

// En el componente:
useSEO({
  title: 'Título de la Página | Vibe Flow',
  description: 'Descripción para motores de búsqueda',
  ogImage: '/images/og-image.jpg',
});
```

### Detectar Movimiento Reducido

```tsx
import { useReducedMotion } from '../hooks/useReducedMotion';

const prefersReducedMotion = useReducedMotion();

// Usar para desactivar animaciones:
<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
>
```

### Usar el Contexto de Background

```tsx
import { useBackground } from '../contexts/BackgroundContext';

const { setTheme } = useBackground();

// Cambiar tema de fondo:
setTheme('nebula'); // 'nebula' | 'cyber' | 'void' | 'warm' | 'default'
```

---

## Estilos con Tailwind

### Colores del Proyecto

```jsx
// Color primario (verde lima)
className="bg-primary text-primary border-primary"

// Fondos
className="bg-background"  // #030303
className="bg-surface"     // #0A0A0A

// Opacidades de texto
className="text-white"      // 100%
className="text-white/60"   // 60%
className="text-white/40"   // 40%
```

### Tipografía

```jsx
// Títulos (Space Mono)
className="font-display italic font-bold"

// Cuerpo (Inter)
className="font-body"  // o sin especificar (es el default)
```

### Componentes Comunes

```jsx
// Card con glass effect
className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"

// Botón primary
className="px-8 py-4 rounded-full bg-primary text-black font-bold uppercase tracking-wider hover:shadow-[0_0_60px_rgba(152,231,16,0.4)]"

// Badge
className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-wider"
```

---

## Desarrollo Efectivo

### Hot Module Replacement (HMR)

El servidor de desarrollo incluye HMR. Los cambios en:
- Componentes React → Se actualizan sin recargar
- CSS/Tailwind → Se actualizan instantáneamente
- Tipos TypeScript → Se verifican en tiempo real

### Debugging

1. **React DevTools**: Instala la extensión del navegador
2. **Console logging**: Usa `console.log` (ESLint advertirá, pero funciona)
3. **TypeScript**: Los errores aparecen en el terminal y el IDE

### Testing Rápido

```bash
# Ejecutar tests en modo watch
npm run test -- --watch

# Ejecutar test específico
npm run test -- validation

# Ver cobertura
npm run test:coverage
```

---

## Siguientes Pasos

1. 📖 Lee la [Arquitectura del Proyecto](../architecture/overview.md)
2. 🎨 Explora el [Sistema de Componentes](../architecture/components.md)
3. 📝 Revisa los [Estándares de Código](../development/code-style.md)
4. ✨ Aprende sobre [Animaciones](../guides/animations.md)

---

*Última actualización: Enero 2026*
