# Guía de Contribución

Gracias por tu interés en contribuir a **Vibe Flow**. Esta guía te ayudará a entender cómo contribuir de manera efectiva al proyecto.

## Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estándares de Código](#estándares-de-código)
- [Guía de Commits](#guía-de-commits)
- [Pull Requests](#pull-requests)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Features](#solicitar-features)

## Código de Conducta

Este proyecto sigue un código de conducta basado en el respeto mutuo. Esperamos que todos los contribuidores:

- Sean respetuosos y profesionales
- Acepten críticas constructivas
- Se enfoquen en lo mejor para la comunidad
- Muestren empatía hacia otros miembros

## Cómo Contribuir

Hay varias formas de contribuir:

1. **Reportar bugs:** Encontrar y documentar errores
2. **Sugerir mejoras:** Proponer nuevas funcionalidades
3. **Mejorar documentación:** Corregir o expandir docs
4. **Escribir código:** Implementar features o fixes
5. **Revisar PRs:** Ayudar a revisar pull requests

## Configuración del Entorno

### Requisitos

- Node.js 18.x o superior
- npm 9.x o superior
- Git

### Pasos

1. **Fork del repositorio:**

   Haz click en "Fork" en la página del repositorio en GitHub.

2. **Clonar tu fork:**
   ```bash
   git clone https://github.com/TU_USUARIO/vibe-flow.git
   cd vibe-flow
   ```

3. **Añadir upstream:**
   ```bash
   git remote add upstream https://github.com/Nocodeboy/vibe-flow.git
   ```

4. **Instalar dependencias:**
   ```bash
   npm install
   ```

5. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```

6. **Verificar instalación:**
   ```bash
   npm run dev
   npm run test
   npm run lint
   ```

## Flujo de Trabajo

### 1. Sincronizar con upstream

Antes de empezar, asegúrate de tener la última versión:

```bash
git checkout main
git fetch upstream
git merge upstream/main
```

### 2. Crear una rama

Usa nombres descriptivos siguiendo la convención:

```bash
# Para features
git checkout -b feature/nombre-descriptivo

# Para bugs
git checkout -b fix/descripcion-del-bug

# Para documentación
git checkout -b docs/que-documentas

# Para refactoring
git checkout -b refactor/que-refactorizas
```

### 3. Hacer cambios

- Sigue los [estándares de código](#estándares-de-código)
- Escribe tests para nuevas funcionalidades
- Mantén los commits atómicos y descriptivos

### 4. Verificar cambios

Antes de hacer commit, ejecuta:

```bash
# Verificar tipos TypeScript
npm run type-check

# Ejecutar linter
npm run lint

# Ejecutar tests
npm run test

# Formatear código
npm run format
```

### 5. Crear Pull Request

- Push a tu fork
- Crea un PR hacia `main` del repositorio original
- Completa la plantilla del PR

## Estándares de Código

### TypeScript

```typescript
// ✅ Correcto: Tipos explícitos
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  // ...
};

// ❌ Incorrecto: Sin tipos
const Button = ({ label, onClick, disabled }) => {
  // ...
};
```

### Componentes React

```typescript
// ✅ Correcto: Componente funcional con tipos
import React, { memo } from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <article className="card">
      <h2>{title}</h2>
      {children}
    </article>
  );
};

export default memo(Card);
```

### Hooks Personalizados

```typescript
// ✅ Correcto: Hook con tipos de retorno claros
import { useState, useCallback } from 'react';

interface UseToggleReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export function useToggle(initial = false): UseToggleReturn {
  const [isOpen, setIsOpen] = useState(initial);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, open, close };
}
```

### Estilos con Tailwind

```tsx
// ✅ Correcto: Clases organizadas y legibles
<button
  className={`
    px-4 py-2 rounded-lg
    bg-primary text-black
    hover:bg-primary/90
    focus-visible:outline-2 focus-visible:outline-offset-2
    transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
>
  Click me
</button>

// ❌ Incorrecto: Clases desordenadas
<button className="disabled:opacity-50 px-4 bg-primary hover:bg-primary/90 py-2 rounded-lg text-black">
```

### Accesibilidad

```tsx
// ✅ Correcto: Componente accesible
<button
  onClick={handleClick}
  aria-label="Cerrar modal"
  aria-expanded={isOpen}
  className="focus-visible:outline-2 focus-visible:outline-primary"
>
  <X aria-hidden="true" />
</button>

// ❌ Incorrecto: Sin accesibilidad
<div onClick={handleClick}>
  <X />
</div>
```

## Guía de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

### Formato

```
<tipo>[alcance opcional]: <descripción>

[cuerpo opcional]

[pie opcional]
```

### Tipos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Formateo, sin cambios de lógica |
| `refactor` | Refactorización de código |
| `perf` | Mejoras de rendimiento |
| `test` | Añadir o corregir tests |
| `chore` | Tareas de mantenimiento |
| `ci` | Cambios en CI/CD |

### Ejemplos

```bash
# Feature
git commit -m "feat(auth): add login with Google"

# Bug fix
git commit -m "fix(form): prevent double submission"

# Documentation
git commit -m "docs: update installation guide"

# Refactor
git commit -m "refactor(hooks): simplify useFocusTrap logic"

# Breaking change
git commit -m "feat(api)!: change response format

BREAKING CHANGE: API responses now use camelCase keys"
```

## Pull Requests

### Antes de crear un PR

- [ ] El código compila sin errores (`npm run build`)
- [ ] Todos los tests pasan (`npm run test`)
- [ ] No hay errores de linting (`npm run lint`)
- [ ] Los tipos son correctos (`npm run type-check`)
- [ ] La documentación está actualizada si es necesario

### Plantilla de PR

```markdown
## Descripción

[Describe los cambios realizados]

## Tipo de cambio

- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva feature (cambio que añade funcionalidad)
- [ ] Breaking change (cambio que rompe compatibilidad)
- [ ] Documentación
- [ ] Refactoring

## ¿Cómo se ha probado?

[Describe las pruebas realizadas]

## Checklist

- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado self-review de mi código
- [ ] He comentado mi código donde es necesario
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevos warnings
- [ ] He añadido tests que prueban mi fix/feature
- [ ] Los tests existentes pasan con mis cambios
```

### Proceso de Review

1. Un maintainer revisará tu PR
2. Pueden solicitar cambios o mejoras
3. Una vez aprobado, se hará merge

## Reportar Bugs

### Antes de reportar

1. Busca si el bug ya fue reportado
2. Intenta reproducirlo en la última versión
3. Prepara información sobre tu entorno

### Información a incluir

```markdown
**Descripción del bug**
[Descripción clara y concisa]

**Pasos para reproducir**
1. Ir a '...'
2. Hacer click en '...'
3. Ver el error

**Comportamiento esperado**
[Qué debería pasar]

**Comportamiento actual**
[Qué pasa realmente]

**Screenshots**
[Si aplica]

**Entorno**
- OS: [ej. macOS 14.0]
- Browser: [ej. Chrome 120]
- Node: [ej. 20.10.0]
- npm: [ej. 10.2.3]
```

## Solicitar Features

### Antes de solicitar

1. Verifica que no exista ya la feature
2. Busca si ya fue solicitada
3. Considera si encaja con el proyecto

### Información a incluir

```markdown
**Descripción de la feature**
[Descripción clara de lo que propones]

**Problema que resuelve**
[Qué problema soluciona esta feature]

**Solución propuesta**
[Cómo crees que debería funcionar]

**Alternativas consideradas**
[Otras opciones que consideraste]

**Contexto adicional**
[Mockups, ejemplos, referencias]
```

## Recursos Adicionales

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vitest Documentation](https://vitest.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

¿Tienes preguntas? Abre un issue o contacta a los maintainers.

**¡Gracias por contribuir a Vibe Flow!**
