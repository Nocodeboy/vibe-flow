# Configuración

> Configuración detallada del entorno de desarrollo y producción

---

## Variables de Entorno

### Archivo `.env`

El proyecto usa variables de entorno para configuración sensible. Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

### Variables Disponibles

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `VITE_CONTACT_ENDPOINT` | Sí | URL del webhook para el formulario de contacto |

### Ejemplo de `.env`

```env
# Endpoint para formulario de contacto (Airtable, Make, Zapier, etc.)
VITE_CONTACT_ENDPOINT=https://hooks.airtable.com/workflows/v1/xxxxx

# Nota: Todas las variables VITE_ son públicas (accesibles en el cliente)
```

### Seguridad de Variables

> **Importante:** Las variables con prefijo `VITE_` se incluyen en el bundle del cliente y son visibles públicamente. Nunca pongas:
> - API keys privadas
> - Credenciales de base de datos
> - Tokens de autenticación sensibles

---

## Configuración de TypeScript

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Características Clave

- **Strict Mode**: Habilitado para máxima seguridad de tipos
- **Path Aliases**: `@/*` mapea a `src/*` para imports limpios
- **ES2022**: Target moderno para mejor rendimiento

### Uso de Path Aliases

```tsx
// En lugar de:
import { Button } from '../../../components/atoms/Button';

// Usar:
import { Button } from '@/components/atoms/Button';
```

---

## Configuración de Vite

### `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animation': ['framer-motion'],
          'vendor-ui': ['lucide-react'],
          'vendor-scroll': ['lenis'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
```

### Opciones de Desarrollo

| Opción | Valor | Descripción |
|--------|-------|-------------|
| `server.port` | 3000 | Puerto del servidor de desarrollo |
| `server.host` | 0.0.0.0 | Accesible en la red local |

### Opciones de Build

| Opción | Descripción |
|--------|-------------|
| `manualChunks` | Divide el código en chunks separados |
| `sourcemap` | Deshabilitado en producción |

---

## Configuración de Tailwind CSS

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#98e710',
        background: '#030303',
        surface: '#0A0A0A',
      },
      fontFamily: {
        display: ['Space Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
```

### Colores Personalizados

```jsx
// Uso en componentes:
className="bg-primary"      // #98e710
className="bg-background"   // #030303
className="bg-surface"      // #0A0A0A
```

### Tipografías

```jsx
className="font-display"    // Space Mono
className="font-body"       // Inter
```

---

## Configuración de ESLint

### `eslint.config.js`

```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  }
);
```

### Reglas Importantes

| Regla | Nivel | Descripción |
|-------|-------|-------------|
| `no-console` | warn | Evita console.log en producción |
| `no-unused-vars` | warn | Variables con `_` prefijo permitidas |
| `react-hooks/*` | error | Reglas de hooks de React |

---

## Configuración de Prettier

### `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "jsxSingleQuote": false
}
```

### Integración con ESLint

Prettier y ESLint están configurados para trabajar juntos:

```bash
# Formatear código
npm run format

# Lint (no incluye formateo)
npm run lint
```

---

## Configuración de Vitest

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
  },
});
```

### Opciones de Testing

| Opción | Valor | Descripción |
|--------|-------|-------------|
| `environment` | jsdom | Simula el DOM del navegador |
| `globals` | true | `describe`, `it`, `expect` disponibles globalmente |
| `setupFiles` | setup.ts | Configuración inicial de tests |

---

## Configuración de Vercel

### `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
```

### Headers de Seguridad

| Header | Propósito |
|--------|-----------|
| `X-Frame-Options` | Previene clickjacking |
| `X-Content-Type-Options` | Previene MIME sniffing |
| `Referrer-Policy` | Controla información del referer |
| `X-XSS-Protection` | Protección XSS del navegador |
| `Permissions-Policy` | Restringe APIs del navegador |

---

## Configuración de IDE

### VS Code - `.vscode/settings.json`

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
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### VS Code - Extensiones Recomendadas

`.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

---

*Última actualización: Enero 2026*
