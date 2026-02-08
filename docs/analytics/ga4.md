# Integración GA4 en `useAnalytics`

Este documento describe el flujo actual de Google Analytics 4 implementado en `src/hooks/useAnalytics.ts`, incluyendo inicialización, manejo de consentimiento y envío de eventos.

## Flujo actual en `src/hooks/useAnalytics.ts`

### 1) Inicialización (`init`)

La inicialización ocurre en dos momentos:

- En el `useEffect` del hook `useAnalytics`, que llama a `loadGoogleAnalytics()` al montar.
- En `setConsent()`, que vuelve a llamar `loadGoogleAnalytics()` antes de actualizar consentimiento.

`loadGoogleAnalytics()` hace lo siguiente:

1. Sale temprano en SSR (`typeof window === 'undefined'`).
2. Evita doble inicialización si `window.gtag` ya existe.
3. Inyecta `https://www.googletagmanager.com/gtag/js?id=<MEASUREMENT_ID>` si no existe el script.
4. Inicializa `window.dataLayer` y define `window.gtag()`.
5. Envía `gtag('consent', 'default', ...)` según consentimiento guardado.
6. Envía `gtag('js', new Date())`.
7. Envía `gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true })`.

### 2) Consentimiento: `default` y `update`

#### Consentimiento default

Al cargar GA, se consulta `localStorage` con clave `cookie-consent`:

- `accepted` => `granted`
- `rejected` o `null` => `denied`

Ese valor se aplica con:

```ts
gtag('consent', 'default', {
  analytics_storage: 'granted' | 'denied',
  ad_storage: 'granted' | 'denied',
  ad_user_data: 'granted' | 'denied',
  ad_personalization: 'granted' | 'denied'
})
```

#### Actualización de consentimiento

Cuando el usuario acepta o rechaza:

1. `setConsent(accepted)` guarda `accepted/rejected` en `localStorage`.
2. Ejecuta `loadGoogleAnalytics()` (si `gtag` no existe, lo inicializa).
3. Ejecuta `updateGoogleConsent(accepted)`, que envía:

```ts
gtag('consent', 'update', {
  analytics_storage: 'granted' | 'denied',
  ad_storage: 'granted' | 'denied',
  ad_user_data: 'granted' | 'denied',
  ad_personalization: 'granted' | 'denied'
})
```

### 3) Envío de eventos

El hook expone:

- `trackEvent(eventName, params?)`
- `trackPageView(path, title?)`

Ambos envían eventos **solo si**:

- `hasAnalyticsConsent()` es `true` (consentimiento `accepted`), y
- `window.gtag` está disponible.

Detalles:

- `trackEvent` envía `gtag('event', eventName, params)`.
- `trackPageView` envía un evento `page_view` con `page_path` y `page_title`.

## Dónde se define el Measurement ID y cómo cambiarlo por entorno

Actualmente el Measurement ID está hardcodeado en:

- `src/hooks/useAnalytics.ts`:

```ts
const GA_MEASUREMENT_ID = 'G-N2MBMH1DWS';
```

### Recomendación por entorno (staging/producción)

Mover el ID a variables de entorno de Vite:

```env
# .env.development
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# .env.staging
VITE_GA_MEASUREMENT_ID=G-YYYYYYYYYY

# .env.production
VITE_GA_MEASUREMENT_ID=G-ZZZZZZZZZZ
```

Y en el hook:

```ts
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
```

Opcionalmente proteger cuando falte valor:

- No inyectar script si no hay ID.
- Loggear warning en desarrollo para detectar configuración incompleta.

## Checklist de verificación

- [ ] `gtag.js` cargado en navegador:
  - En DevTools > Network aparece `googletagmanager.com/gtag/js?id=...` con estado 200.
  - En Elements existe el `<script async src="https://www.googletagmanager.com/gtag/js?id=...">`.
- [ ] Eventos visibles en DebugView de GA4:
  - Abrir GA4 > Admin > DebugView.
  - Navegar por la app y disparar eventos (`page_view` / custom).
- [ ] Estado de consentimiento correcto:
  - Verificar `localStorage.getItem('cookie-consent')` (`accepted` o `rejected`).
  - Verificar llamadas `gtag('consent', 'default' | 'update', ...)` con `granted/denied` esperado.
- [ ] Validación en navegador:
  - En consola, confirmar `window.gtag` y `window.dataLayer`.
  - Si hay consentimiento aceptado, confirmar que se agregan eventos al `dataLayer` tras interacción.

## Troubleshooting

### 1) “Tag presente pero sin datos”

Síntoma: se ve el script de GTM/gtag cargado, pero no llegan eventos en tiempo real.

Revisar:

1. Consentimiento: si está en `rejected`/`denied`, no se enviarán eventos.
2. Measurement ID: confirmar que corresponde a la propiedad correcta de GA4.
3. Filtros de propiedad/stream: revisar que no estén excluyendo tráfico.
4. Ad blockers / navegador estricto: probar en incógnito sin extensiones.
5. Tiempo de propagación: para algunos reportes estándar hay retraso; validar primero en DebugView.

### 2) “consent denied”

Síntoma: en `dataLayer` o logs, las señales aparecen como `denied`.

Revisar:

1. Valor de `cookie-consent` en `localStorage`.
2. Que `setConsent(true)` realmente se esté ejecutando al aceptar banner.
3. Que después de aceptar se llame `gtag('consent', 'update', { ... granted ... })`.
4. Que no exista lógica adicional que sobrescriba consentimiento a `denied`.

### 3) “entorno/staging vs producción”

Síntoma: eventos de staging aparecen en producción (o viceversa), o no aparecen donde esperas.

Revisar:

1. ID por entorno: usar `VITE_GA_MEASUREMENT_ID` diferente para cada entorno.
2. Variables en CI/CD: confirmar que cada deploy inyecta el `.env` correcto.
3. Cache del frontend: invalidar cache para asegurar bundle con variables actualizadas.
4. Validar en consola el ID efectivo del build desplegado.
