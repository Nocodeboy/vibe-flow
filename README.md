# Vibe Flow

![Vibe Flow Banner](./public/og-image.jpg)

**Vibe Flow** es la comunidad de referencia en español para **VibeCoders, NoCoders y Automatizadores** que quieren construir negocios reales usando IA y automatización.

> **"NUNCA VOLVERÁS A CONSTRUIR SOLO"**

## Tabla de Contenidos

- [Visión y Misión](#-visión--misión)
- [Tech Stack](#-tech-stack)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Estándares de Código](#-estándares-de-código)
- [Testing](#-testing)
- [Accesibilidad](#-accesibilidad)
- [Seguridad](#-seguridad)
- [Rendimiento](#-rendimiento)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## Visión y Misión

**Nuestra misión** es eliminar la brecha entre "aprender NoCode/IA" y "ganar dinero con ello", creando un ecosistema de élite donde los miembros pasan de tutoriales a facturar proyectos reales.

**Vibe Flow no es un curso.** Es una plataforma de **construcción colectiva** donde:

- **Enseñamos haciendo:** Build in Public, sin teoría vacía.
- **Conectamos talento con oportunidad:** Acceso a leads reales de agencia.
- **Creamos accountability:** Sesiones en vivo y mentoría continua.
- **Implementamos lo que funciona HOY:** Tecnología y estrategias actuales.

### Valores Fundamentales

1. **Valor Real, Cero Humo:** 100% implementación práctica.
2. **Construcción Colectiva:** Compartimos wins y fracasos.
3. **Actualización Constante:** Nos adaptamos a la velocidad de la IA.
4. **Resultados Medibles:** De 0 a primer proyecto en 90 días.
5. **Élite Accesible:** Calidad premium sin barreras elitistas.

## Tech Stack

| Categoría | Tecnología | Versión |
|-----------|------------|---------|
| **Framework** | [React](https://react.dev/) | 19.x |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | 5.8.x |
| **Build Tool** | [Vite](https://vitejs.dev/) | 6.x |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 3.4.x |
| **Animaciones** | [Framer Motion](https://www.framer.com/motion/) | 12.x |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | 1.3.x |
| **Routing** | [React Router](https://reactrouter.com/) | 7.x |
| **Iconos** | [Lucide React](https://lucide.dev/) | 0.562.x |
| **Linting** | [ESLint](https://eslint.org/) | 9.x |
| **Formatting** | [Prettier](https://prettier.io/) | 3.x |
| **Testing** | [Vitest](https://vitest.dev/) | 4.x |

## Arquitectura

Este proyecto sigue el patrón **Atomic Design** para organizar los componentes de UI:

```
src/
├── components/
│   ├── atoms/        # Componentes básicos (Button, Badge, etc.)
│   ├── molecules/    # Combinaciones de atoms (Card, FAQItem, etc.)
│   ├── organisms/    # Secciones completas (Hero, Footer, etc.)
│   └── layout/       # Componentes estructurales (ErrorBoundary, etc.)
├── pages/            # Páginas/rutas de la aplicación
├── hooks/            # Custom React hooks
├── contexts/         # React Context providers
├── utils/            # Funciones de utilidad
├── styles/           # Estilos y variantes de animación
├── data/             # Datos estáticos y configuraciones
├── types/            # Definiciones de tipos TypeScript
└── test/             # Configuración y utilidades de testing
```

### Componentes por Capa

| Capa | Descripción | Ejemplos |
|------|-------------|----------|
| **Atoms** | Elementos UI básicos e indivisibles | `Button`, `Badge`, `Skeleton` |
| **Molecules** | Combinaciones de atoms con funcionalidad | `FAQItem`, `TestimonialCard`, `ServiceCard` |
| **Organisms** | Secciones completas de la página | `Hero`, `Footer`, `ContactSection` |
| **Layout** | Componentes estructurales y wrappers | `SmoothScroll`, `ErrorBoundary`, `PageTransition` |
| **Pages** | Componentes de página completa | `Home`, `Work`, `Services` |

## Instalación

### Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Nocodeboy/vibe-flow.git
   cd vibe-flow
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```

   Editar `.env` con tus valores:
   ```env
   VITE_CONTACT_ENDPOINT=https://tu-endpoint-de-contacto
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   El sitio estará disponible en `http://localhost:3000`.

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint para verificar código |
| `npm run lint:fix` | Ejecuta ESLint y corrige automáticamente |
| `npm run format` | Formatea código con Prettier |
| `npm run test` | Ejecuta tests con Vitest |
| `npm run test:coverage` | Ejecuta tests con reporte de cobertura |
| `npm run type-check` | Verifica tipos TypeScript |

## Estructura del Proyecto

```
vibe-flow/
├── public/               # Assets estáticos
│   ├── fonts/           # Fuentes personalizadas
│   └── images/          # Imágenes
├── src/
│   ├── components/      # Componentes React (Atomic Design)
│   ├── pages/           # Páginas de la aplicación
│   ├── hooks/           # Custom hooks
│   │   ├── useFocusTrap.ts      # Focus trap para modales
│   │   └── useReducedMotion.ts  # Detecta preferencia de movimiento
│   ├── contexts/        # Context providers
│   ├── utils/           # Utilidades
│   │   └── validation.ts        # Validación de formularios
│   ├── styles/          # Estilos y animaciones
│   │   ├── animation.ts         # Configuración de animaciones
│   │   └── variants.ts          # Variantes de Framer Motion
│   ├── data/            # Datos estáticos
│   ├── types/           # Definiciones TypeScript
│   ├── test/            # Configuración de testing
│   ├── App.tsx          # Componente raíz
│   ├── index.tsx        # Entry point
│   └── index.css        # Estilos globales
├── .prettierrc          # Configuración de Prettier
├── eslint.config.js     # Configuración de ESLint
├── tailwind.config.js   # Configuración de Tailwind
├── tsconfig.json        # Configuración de TypeScript
├── vite.config.ts       # Configuración de Vite
├── vitest.config.ts     # Configuración de Vitest
└── vercel.json          # Configuración de Vercel (headers de seguridad)
```

## Estándares de Código

### TypeScript

- Strict mode habilitado
- Tipos explícitos para props de componentes
- Interfaces preferidas sobre types para objetos

### ESLint

Configuración basada en:
- `@typescript-eslint/recommended`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`

```bash
# Verificar código
npm run lint

# Corregir automáticamente
npm run lint:fix
```

### Prettier

Configuración en `.prettierrc`:
- Semicolons: habilitados
- Single quotes: habilitados
- Tab width: 2 espacios
- Trailing comma: es5

```bash
# Formatear código
npm run format
```

### Convenciones de Nombrado

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `ServiceModal.tsx` |
| Hooks | camelCase con prefijo `use` | `useFocusTrap.ts` |
| Utilidades | camelCase | `validation.ts` |
| Constantes | SCREAMING_SNAKE_CASE | `EASE_ELITE` |
| Tipos/Interfaces | PascalCase | `ServiceModalProps` |

## Testing

Usamos **Vitest** con **React Testing Library** para testing.

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar con cobertura
npm run test:coverage

# Ejecutar en modo watch
npm run test -- --watch
```

### Estructura de Tests

```
src/
├── utils/
│   ├── validation.ts
│   └── validation.test.ts    # Test junto al archivo
├── hooks/
│   ├── useFocusTrap.ts
│   └── useFocusTrap.test.ts
└── test/
    └── setup.ts              # Configuración global
```

### Convenciones de Testing

- Tests ubicados junto a los archivos que prueban (`*.test.ts`)
- Usar `describe` para agrupar tests relacionados
- Nombres descriptivos: `it('should validate email format')`

## Accesibilidad

El proyecto cumple con **WCAG 2.1 nivel AA**:

### Características Implementadas

- **Skip links:** Navegación rápida al contenido principal
- **Focus trap:** Los modales atrapan el foco del teclado
- **ARIA attributes:** Labels, roles y estados correctos
- **Keyboard navigation:** Todos los elementos interactivos son accesibles
- **Focus visible:** Indicadores claros de foco para navegación por teclado
- **Reduced motion:** Respeta la preferencia `prefers-reduced-motion`
- **Semantic HTML:** Uso correcto de elementos semánticos
- **Screen reader support:** Clases `.sr-only` para contenido solo para lectores

### Hooks de Accesibilidad

```typescript
// Focus trap para modales
import { useFocusTrap } from './hooks/useFocusTrap';
const modalRef = useFocusTrap<HTMLDivElement>(isOpen);

// Detectar preferencia de movimiento reducido
import { useReducedMotion } from './hooks/useReducedMotion';
const prefersReducedMotion = useReducedMotion();
```

## Seguridad

### Medidas Implementadas

1. **Validación de formularios:**
   - Sanitización de entrada
   - Protección contra XSS
   - Rate limiting (3 envíos/minuto)

2. **Variables de entorno:**
   - Endpoints sensibles no expuestos en código
   - Uso de `VITE_` prefix para variables cliente

3. **Security Headers** (Vercel):
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `X-XSS-Protection: 1; mode=block`
   - `Permissions-Policy` restrictivo

### Uso de Validación

```typescript
import { validateContactForm, recordSubmission } from './utils/validation';

const result = validateContactForm({ name, email, message });
if (!result.isValid) {
  setError(result.error);
  return;
}
recordSubmission(); // Registrar para rate limiting
```

## Rendimiento

### Optimizaciones Implementadas

1. **Code Splitting:**
   ```typescript
   // vite.config.ts
   manualChunks: {
     'vendor-react': ['react', 'react-dom', 'react-router-dom'],
     'vendor-animation': ['framer-motion'],
     'vendor-ui': ['lucide-react'],
     'vendor-scroll': ['lenis'],
   }
   ```

2. **Lazy Loading:**
   - Imágenes con `loading="lazy"` y `decoding="async"`
   - Rutas con `React.lazy()` y `Suspense`

3. **Memoización:**
   - `React.memo()` en componentes pesados
   - Custom comparison functions donde necesario

4. **Animaciones Optimizadas:**
   - Variantes centralizadas en `src/styles/variants.ts`
   - Respeto a `prefers-reduced-motion`

## Despliegue

### Vercel (Recomendado)

1. Conectar repositorio en [Vercel](https://vercel.com)
2. Configurar variables de entorno
3. Deploy automático en cada push

### Build Manual

```bash
# Generar build
npm run build

# Previsualizar
npm run preview
```

Los archivos generados estarán en `dist/`.

## Contribuir

Consulta [CONTRIBUTING.md](./CONTRIBUTING.md) para guías detalladas.

### Quick Start

1. Fork del repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Hacer cambios siguiendo los estándares
4. Ejecutar tests: `npm run test`
5. Ejecutar linter: `npm run lint`
6. Commit: `git commit -m "feat: descripción"`
7. Push y crear Pull Request

### Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Formateo (no afecta lógica)
- `refactor:` Refactorización
- `test:` Tests
- `chore:` Tareas de mantenimiento

## Páginas Legales

El sitio cumple con la normativa española (LSSI/GDPR):

- **Aviso Legal:** `/aviso-legal`
- **Política de Privacidad:** `/politica-privacidad`

## Contacto

- **Sitio Web:** [vibeflow.es](https://vibeflow.es)
- **Email:** [contact@vibeflow.es](mailto:contact@vibeflow.es)

## Licencia

Copyright © 2026 Vibe Flow. Todos los derechos reservados.

---

**Vibe Flow** - La comunidad de élite para constructores digitales.
