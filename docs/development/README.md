# Guías de Desarrollo

> Documentación para desarrolladores que trabajan en Vibe Flow

---

## Índice

| Documento | Descripción |
|-----------|-------------|
| [Estándares de Código](./code-style.md) | Convenciones y estilo de código |
| [Testing](./testing.md) | Estrategia y guía de testing |
| [Flujo de Git](./git-workflow.md) | Flujo de trabajo con Git |
| [Contribuir](./contributing.md) | Guía de contribución |

---

## Configuración del Entorno

### Requisitos

- Node.js 18+
- npm 9+
- Git 2.30+
- VS Code (recomendado)

### Setup Inicial

```bash
# Clonar repositorio
git clone https://github.com/Nocodeboy/vibe-flow.git
cd vibe-flow

# Instalar dependencias
npm install

# Configurar entorno
cp .env.example .env

# Iniciar desarrollo
npm run dev
```

---

## Scripts de Desarrollo

| Script | Descripción | Uso |
|--------|-------------|-----|
| `npm run dev` | Servidor de desarrollo | Desarrollo diario |
| `npm run build` | Build de producción | Antes de deploy |
| `npm run preview` | Preview del build | Verificar build |
| `npm run lint` | Verificar código | Antes de commit |
| `npm run lint:fix` | Corregir linting | Corrección automática |
| `npm run format` | Formatear código | Consistencia |
| `npm run test` | Ejecutar tests | Verificación |
| `npm run test:coverage` | Tests con cobertura | Métricas |
| `npm run type-check` | Verificar tipos | TypeScript check |

---

## Flujo de Trabajo Diario

### 1. Actualizar Rama Principal

```bash
git checkout main
git pull origin main
```

### 2. Crear Rama de Feature

```bash
git checkout -b feature/nombre-descriptivo
```

### 3. Desarrollar

```bash
# Iniciar servidor
npm run dev

# Hacer cambios...

# Verificar antes de commit
npm run type-check
npm run lint
npm run test
```

### 4. Commit y Push

```bash
git add .
git commit -m "feat: descripción del cambio"
git push -u origin feature/nombre-descriptivo
```

### 5. Crear Pull Request

Crear PR en GitHub con:
- Descripción clara
- Screenshots si hay cambios visuales
- Checklist completado

---

## Debugging

### React DevTools

Instala la extensión de navegador para:
- Inspeccionar componentes
- Ver props y state
- Profiling de rendimiento

### Framer Motion DevTools

```tsx
// Activar debug mode en desarrollo
<motion.div
  layoutId="unique-id"
  style={{ outline: '1px solid red' }} // Temporal para debug
>
```

### Console Debugging

```tsx
// Usar con moderación (ESLint advertirá)
console.log('Debug:', variable);

// Mejor: Usar debugger
debugger; // Pausa ejecución en DevTools
```

### TypeScript Errors

```bash
# Ver todos los errores de tipo
npm run type-check

# En VS Code: Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

---

## Estructura de Archivos Nuevos

### Nuevo Componente

```
src/components/[nivel]/
└── NuevoComponente.tsx
```

### Nuevo Hook

```
src/hooks/
├── useNuevoHook.ts
└── useNuevoHook.test.ts
```

### Nueva Página

```
src/pages/
└── NuevaPagina.tsx
```

Registrar en `App.tsx`:

```tsx
const NuevaPagina = lazy(() => import('./pages/NuevaPagina'));
// ...
<Route path="/nueva-ruta" element={<NuevaPagina />} />
```

---

## Dependencias

### Añadir Dependencia

```bash
# Producción
npm install nombre-paquete

# Desarrollo
npm install -D nombre-paquete
```

### Actualizar Dependencias

```bash
# Ver outdated
npm outdated

# Actualizar (con cuidado)
npm update
```

### Importante

- No añadir dependencias sin justificación
- Preferir soluciones nativas cuando sea posible
- Verificar bundle size antes de añadir: [bundlephobia.com](https://bundlephobia.com)

---

## Recursos

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vitest Documentation](https://vitest.dev/)

---

*Última actualización: Enero 2026*
