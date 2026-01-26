# Instalación

> Guía completa para instalar y configurar el proyecto Vibe Flow

---

## Requisitos del Sistema

### Software Requerido

| Software | Versión Mínima | Recomendada |
|----------|----------------|-------------|
| Node.js | 18.x | 20.x LTS |
| npm | 9.x | 10.x |
| Git | 2.30+ | Última |

### Verificar Requisitos

```bash
# Verificar Node.js
node --version
# Salida esperada: v18.x.x o superior

# Verificar npm
npm --version
# Salida esperada: 9.x.x o superior

# Verificar Git
git --version
# Salida esperada: git version 2.30.x o superior
```

### Sistemas Operativos Soportados

- ✅ macOS 12+ (Monterey o superior)
- ✅ Windows 10/11 (con WSL2 recomendado)
- ✅ Linux (Ubuntu 20.04+, Debian 11+, Fedora 35+)

---

## Instalación Paso a Paso

### 1. Clonar el Repositorio

```bash
# Clonar con HTTPS
git clone https://github.com/Nocodeboy/vibe-flow.git

# O clonar con SSH (si tienes configurado SSH keys)
git clone git@github.com:Nocodeboy/vibe-flow.git

# Navegar al directorio
cd vibe-flow
```

### 2. Instalar Dependencias

```bash
# Instalar todas las dependencias
npm install

# Esto instalará:
# - Dependencias de producción (React, Framer Motion, etc.)
# - Dependencias de desarrollo (Vite, TypeScript, ESLint, etc.)
```

**Tiempo estimado:** 1-3 minutos dependiendo de la conexión

### 3. Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

Editar `.env` con tus valores:

```env
# Endpoint para el formulario de contacto (Airtable webhook)
VITE_CONTACT_ENDPOINT=https://tu-endpoint-de-contacto

# (Opcional) Otras variables según necesidad
```

> **Nota:** Las variables con prefijo `VITE_` son accesibles en el cliente. No pongas secretos sensibles aquí.

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

---

## Verificación de la Instalación

### Comprobaciones Básicas

```bash
# 1. Verificar que el servidor inicia correctamente
npm run dev

# 2. Verificar tipos TypeScript
npm run type-check

# 3. Verificar linting
npm run lint

# 4. Ejecutar tests
npm run test
```

### Checklist de Verificación

- [ ] El servidor inicia sin errores
- [ ] La página carga en `http://localhost:3000`
- [ ] No hay errores de TypeScript
- [ ] ESLint no reporta errores críticos
- [ ] Los tests pasan correctamente

---

## Resolución de Problemas

### Error: Node.js version incompatible

```bash
# Solución: Usar nvm para cambiar versión
nvm install 20
nvm use 20
```

### Error: EACCES permission denied

```bash
# Solución en macOS/Linux
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
npm install
```

### Error: Module not found

```bash
# Solución: Limpiar caché e reinstalar
rm -rf node_modules
rm package-lock.json
npm install
```

### Error: Port 3000 already in use

```bash
# Opción 1: Matar el proceso en el puerto
lsof -ti:3000 | xargs kill -9

# Opción 2: Usar otro puerto
npm run dev -- --port 3001
```

### Error: CORS en desarrollo

Si ves errores de CORS al conectar con APIs externas:

1. Verifica que la URL en `.env` es correcta
2. Para desarrollo local, puedes necesitar un proxy (ya configurado en Vite)

---

## Instalación para Producción

Para generar un build de producción:

```bash
# Generar build optimizado
npm run build

# Los archivos se generan en ./dist/

# Previsualizar el build localmente
npm run preview
```

---

## Configuración de IDE

### Visual Studio Code (Recomendado)

**Extensiones recomendadas:**

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag"
  ]
}
```

**Configuración de workspace (.vscode/settings.json):**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### WebStorm / IntelliJ IDEA

1. Habilitar ESLint: `Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint`
2. Habilitar Prettier: `Settings > Languages & Frameworks > JavaScript > Prettier`
3. Configurar auto-format on save

---

## Siguiente Paso

Una vez instalado, continúa con la [Guía de Inicio Rápido](./quick-start.md) para familiarizarte con el proyecto.

---

*Última actualización: Enero 2026*
