# Deployment

> Guía de despliegue del proyecto

---

## Índice

| Documento | Descripción |
|-----------|-------------|
| [Vercel](./vercel.md) | Despliegue en Vercel |
| [Variables de Entorno](./environment.md) | Configuración de entorno |

---

## Resumen

El proyecto está configurado para desplegar en **Vercel** con:
- Build automático desde Git
- Edge Functions para API
- CDN global
- Preview deployments para PRs

---

## Quick Deploy

### 1. Conectar Repositorio

1. Ir a [vercel.com](https://vercel.com)
2. "Add New Project"
3. Importar repositorio de GitHub
4. Vercel detecta automáticamente Vite

### 2. Configurar Variables

En Settings > Environment Variables:

```
VITE_CONTACT_ENDPOINT = https://tu-webhook-aqui
```

### 3. Deploy

Vercel despliega automáticamente en cada push a `main`.

---

## Build Local

```bash
# Generar build de producción
npm run build

# Previsualizar localmente
npm run preview
```

Los archivos se generan en `./dist/`.

---

## Estructura del Build

```
dist/
├── index.html          # HTML principal
├── assets/
│   ├── index-[hash].js       # Bundle principal
│   ├── vendor-react-[hash].js
│   ├── vendor-animation-[hash].js
│   ├── vendor-ui-[hash].js
│   ├── vendor-scroll-[hash].js
│   └── index-[hash].css      # Estilos
├── images/             # Imágenes copiadas
└── fonts/              # Fuentes copiadas
```

---

## Checklist Pre-Deploy

- [ ] `npm run build` sin errores
- [ ] `npm run lint` sin errores
- [ ] `npm run test` tests pasando
- [ ] Variables de entorno configuradas
- [ ] Security headers en vercel.json
- [ ] Imágenes optimizadas

---

*Última actualización: Enero 2026*
