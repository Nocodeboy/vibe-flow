# Guía de Contribución

> Cómo contribuir al proyecto Vibe Flow

---

## Bienvenido

Gracias por tu interés en contribuir a Vibe Flow. Esta guía te ayudará a entender cómo puedes participar de manera efectiva.

---

## Código de Conducta

### Principios

- **Respeto**: Trata a todos con respeto y profesionalismo
- **Colaboración**: Ayuda a otros cuando puedas
- **Constructividad**: Las críticas deben ser constructivas
- **Inclusión**: Ambiente acogedor para todos

### Comportamiento Esperado

- Comunicación clara y profesional
- Aceptar feedback constructivo
- Enfocarse en lo mejor para el proyecto
- Respetar opiniones diferentes

---

## Formas de Contribuir

### 1. Reportar Bugs

**Antes de reportar:**
- Busca si ya existe un issue similar
- Verifica que ocurre en la última versión
- Intenta reproducir el problema

**Información a incluir:**

```markdown
## Descripción del Bug
[Descripción clara y concisa]

## Pasos para Reproducir
1. Ir a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

## Comportamiento Esperado
[Qué debería pasar]

## Comportamiento Actual
[Qué pasa realmente]

## Screenshots
[Si aplica]

## Entorno
- OS: [ej. macOS 14.0]
- Browser: [ej. Chrome 120]
- Node: [ej. 20.10.0]
```

### 2. Sugerir Features

**Antes de sugerir:**
- Verifica que no existe ya
- Considera si encaja con el proyecto

**Información a incluir:**

```markdown
## Descripción de la Feature
[Qué propones]

## Problema que Resuelve
[Por qué es útil]

## Solución Propuesta
[Cómo debería funcionar]

## Alternativas Consideradas
[Otras opciones]

## Contexto Adicional
[Mockups, ejemplos, referencias]
```

### 3. Mejorar Documentación

- Corregir errores tipográficos
- Aclarar secciones confusas
- Añadir ejemplos
- Traducir contenido

### 4. Escribir Código

- Implementar features nuevas
- Corregir bugs
- Mejorar rendimiento
- Añadir tests

---

## Setup del Entorno

### Requisitos

- Node.js 18+
- npm 9+
- Git

### Pasos

```bash
# 1. Fork del repositorio en GitHub

# 2. Clonar tu fork
git clone https://github.com/TU_USUARIO/vibe-flow.git
cd vibe-flow

# 3. Añadir upstream
git remote add upstream https://github.com/Nocodeboy/vibe-flow.git

# 4. Instalar dependencias
npm install

# 5. Configurar entorno
cp .env.example .env

# 6. Verificar instalación
npm run dev
npm run test
npm run lint
```

---

## Flujo de Contribución

### 1. Sincronizar Fork

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### 2. Crear Rama

```bash
# Nomenclatura
git checkout -b feature/nombre-descriptivo
git checkout -b fix/descripcion-del-bug
git checkout -b docs/que-documentas
```

### 3. Desarrollar

Seguir los [estándares de código](./code-style.md):

- TypeScript estricto
- Componentes con tipos
- Tests para nueva funcionalidad
- Código formateado

### 4. Verificar

```bash
# Antes de commit
npm run type-check    # Sin errores de tipos
npm run lint          # Sin errores de linting
npm run test          # Tests pasando
npm run build         # Build exitoso
```

### 5. Commit

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat(component): add new button variant"
```

### 6. Push

```bash
git push origin feature/nombre-descriptivo
```

### 7. Pull Request

- Ir a GitHub
- Click "Compare & pull request"
- Completar plantilla
- Esperar review

---

## Estándares de Código

### TypeScript

```typescript
// ✅ Tipos explícitos
interface Props {
  title: string;
  onClick?: () => void;
}

const Component: React.FC<Props> = ({ title, onClick }) => {
  // ...
};
```

### React

```tsx
// ✅ Componentes funcionales con hooks
const Component: React.FC<Props> = ({ data }) => {
  const [state, setState] = useState(initial);

  useEffect(() => {
    // Effect logic
  }, [dependency]);

  return <div>{state}</div>;
};
```

### Tailwind

```tsx
// ✅ Clases organizadas
<button
  className={`
    px-4 py-2 rounded-lg
    bg-primary text-black
    hover:bg-primary/90
    transition-colors
  `}
>
```

### Tests

```typescript
// ✅ Tests descriptivos
describe('Button', () => {
  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Checklist de PR

### Antes de Crear PR

- [ ] Código compila sin errores
- [ ] Todos los tests pasan
- [ ] Sin errores de linting
- [ ] Tipos TypeScript correctos
- [ ] Documentación actualizada si necesario
- [ ] Commits siguen Conventional Commits

### En el PR

- [ ] Título descriptivo
- [ ] Descripción clara de cambios
- [ ] Screenshots si hay cambios visuales
- [ ] Referencia a issue si existe

---

## Review de Código

### Qué Revisamos

1. **Funcionalidad**: ¿Hace lo que dice?
2. **Código**: ¿Sigue estándares?
3. **Tests**: ¿Tiene tests adecuados?
4. **Rendimiento**: ¿Hay impacto negativo?
5. **Accesibilidad**: ¿Es accesible?

### Responder a Feedback

- Responde a todos los comentarios
- Pregunta si algo no está claro
- Haz cambios solicitados o explica por qué no
- Re-request review cuando esté listo

---

## Tipos de Contribuciones

### Good First Issues

Para nuevos contribuidores, busca issues etiquetados:
- `good first issue`
- `help wanted`
- `documentation`

### Contribuciones Avanzadas

- Nuevos componentes
- Optimizaciones de rendimiento
- Features complejas
- Refactoring arquitectónico

---

## Contacto

### Preguntas

- Abre un issue con etiqueta `question`
- Sé específico sobre lo que necesitas

### Discusiones

- Usa GitHub Discussions para temas amplios
- Issues para bugs y features específicas

---

## Reconocimiento

Todos los contribuidores son reconocidos:
- En el README del proyecto
- En los releases notes
- En la documentación

---

¡Gracias por contribuir a Vibe Flow!

---

*Última actualización: Enero 2026*
