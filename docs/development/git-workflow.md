# Flujo de Trabajo Git

> Convenciones y flujo de trabajo con Git para Vibe Flow

---

## Flujo de Ramas

```
main (producción)
  │
  ├── feature/nueva-funcionalidad
  │
  ├── fix/correccion-bug
  │
  ├── docs/actualizacion-docs
  │
  └── refactor/mejora-componente
```

### Ramas Principales

| Rama | Propósito |
|------|-----------|
| `main` | Código en producción, siempre estable |

### Ramas de Trabajo

| Prefijo | Uso | Ejemplo |
|---------|-----|---------|
| `feature/` | Nueva funcionalidad | `feature/dark-mode` |
| `fix/` | Corrección de bug | `fix/form-validation` |
| `docs/` | Documentación | `docs/api-reference` |
| `refactor/` | Mejora de código | `refactor/hooks-cleanup` |
| `style/` | Cambios de estilo | `style/responsive-navbar` |
| `test/` | Añadir tests | `test/validation-utils` |
| `chore/` | Tareas de mantenimiento | `chore/update-deps` |

---

## Workflow Diario

### 1. Sincronizar con main

```bash
git checkout main
git pull origin main
```

### 2. Crear rama de trabajo

```bash
# Desde main
git checkout -b feature/nombre-descriptivo
```

### 3. Desarrollar

Hacer commits frecuentes y atómicos:

```bash
# Verificar estado
git status

# Añadir archivos
git add src/components/Button.tsx
git add src/components/Button.test.tsx

# O añadir todo (con cuidado)
git add .

# Commit
git commit -m "feat(button): add loading state"
```

### 4. Mantener rama actualizada

```bash
# Traer cambios de main
git fetch origin main
git rebase origin/main

# Resolver conflictos si los hay
# Editar archivos con conflictos
git add .
git rebase --continue
```

### 5. Push y Pull Request

```bash
# Primer push
git push -u origin feature/nombre-descriptivo

# Push subsecuentes
git push
```

---

## Commits

### Formato

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[pie opcional]
```

### Tipos de Commit

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat: add contact form` |
| `fix` | Corrección de bug | `fix: resolve scroll issue` |
| `docs` | Documentación | `docs: update README` |
| `style` | Formateo, sin cambio de lógica | `style: format code` |
| `refactor` | Mejora sin cambio de funcionalidad | `refactor: simplify hook` |
| `perf` | Mejora de rendimiento | `perf: optimize images` |
| `test` | Añadir o corregir tests | `test: add validation tests` |
| `chore` | Mantenimiento | `chore: update dependencies` |
| `ci` | CI/CD | `ci: add deploy workflow` |

### Alcance (Scope)

El alcance es opcional pero útil:

```bash
feat(auth): add Google login
fix(form): prevent double submission
docs(api): document hooks
refactor(navbar): extract menu component
```

### Ejemplos de Buenos Commits

```bash
# Feature
git commit -m "feat(contact): add form validation with rate limiting"

# Fix
git commit -m "fix(navbar): resolve mobile menu z-index issue"

# Refactor
git commit -m "refactor(hooks): extract useFocusTrap from ServiceModal"

# Con cuerpo explicativo
git commit -m "fix(animation): disable animations for reduced motion

Respect prefers-reduced-motion media query to improve
accessibility for users who are sensitive to motion.

Closes #42"
```

### Evitar

```bash
# ❌ Demasiado vago
git commit -m "fix stuff"
git commit -m "updates"

# ❌ Demasiado largo en una línea
git commit -m "fix: this commit fixes the bug where the form was not validating emails correctly and also adds a new feature for phone validation"

# ❌ Commits gigantes
# Un commit con 50 archivos cambiados
```

---

## Pull Requests

### Crear PR

1. Push de la rama
2. Ir a GitHub
3. Click en "Compare & pull request"
4. Completar la plantilla

### Plantilla de PR

```markdown
## Descripción

Breve descripción de los cambios.

## Tipo de Cambio

- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Documentación
- [ ] Refactoring

## Cómo Probar

1. Paso 1
2. Paso 2
3. Verificar que...

## Screenshots

(Si hay cambios visuales)

## Checklist

- [ ] Mi código sigue los estándares del proyecto
- [ ] He ejecutado `npm run lint` sin errores
- [ ] He ejecutado `npm run test` sin fallos
- [ ] He actualizado la documentación si es necesario
- [ ] Los commits siguen Conventional Commits
```

### Review Process

1. **Autor** crea PR y asigna reviewers
2. **Reviewers** revisan código y dejan comentarios
3. **Autor** responde y hace cambios necesarios
4. **Reviewer** aprueba
5. **Autor** hace merge (squash preferido)

---

## Resolución de Conflictos

### Durante Rebase

```bash
# Al hacer rebase, si hay conflictos:
git rebase origin/main

# Ver archivos en conflicto
git status

# Editar archivos (buscar <<<<<<< y >>>>>>>)
# Resolver conflictos manualmente

# Marcar como resuelto
git add <archivo>

# Continuar rebase
git rebase --continue

# Si quieres abortar
git rebase --abort
```

### En Pull Request

Si GitHub indica conflictos:

```bash
# Actualizar main
git checkout main
git pull

# Volver a tu rama
git checkout feature/mi-rama

# Rebase
git rebase main

# Resolver conflictos...

# Force push (solo en tu rama)
git push --force-with-lease
```

---

## Comandos Útiles

### Ver Estado

```bash
git status              # Estado actual
git log --oneline -10   # Últimos 10 commits
git diff                # Cambios no staged
git diff --staged       # Cambios staged
```

### Deshacer Cambios

```bash
# Deshacer cambios en archivo (no staged)
git checkout -- <archivo>

# Quitar de staging
git reset HEAD <archivo>

# Deshacer último commit (manteniendo cambios)
git reset --soft HEAD~1

# Deshacer último commit (descartando cambios)
git reset --hard HEAD~1  # ⚠️ Peligroso
```

### Stash

```bash
# Guardar cambios temporalmente
git stash

# Ver stashes
git stash list

# Recuperar último stash
git stash pop

# Aplicar sin eliminar
git stash apply
```

### Limpiar

```bash
# Eliminar ramas locales ya mergeadas
git branch --merged | grep -v main | xargs git branch -d

# Eliminar rama local
git branch -d feature/mi-rama

# Eliminar rama remota
git push origin --delete feature/mi-rama
```

---

## Buenas Prácticas

### Do's

- ✅ Commits pequeños y frecuentes
- ✅ Mensajes descriptivos
- ✅ Rebase antes de merge
- ✅ Una feature por rama
- ✅ Tests antes de push

### Don'ts

- ❌ Commit de archivos sensibles (.env)
- ❌ Force push en main
- ❌ Commits con código roto
- ❌ Ramas de larga duración sin merge
- ❌ Merge sin review

---

## .gitignore

Archivos ignorados por Git:

```gitignore
# Dependencies
node_modules/

# Build
dist/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Test coverage
coverage/
```

---

*Última actualización: Enero 2026*
