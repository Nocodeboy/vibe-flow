# Organisms

> Secciones completas de página

---

## Navbar

Barra de navegación principal.

### Uso

```tsx
import Navbar from '@/components/organisms/Navbar';

// En el layout principal
<Navbar />
```

### Características

- **Sticky**: Se mantiene fijo al scroll
- **Responsive**: Menú hamburguesa en móvil
- **Animado**: Entrada con fade
- **Accesible**: Navegación por teclado

### Rutas

| Ruta | Label |
|------|-------|
| `/` | Inicio |
| `/proyectos` | Proyectos |
| `/servicios` | Servicios |
| `/comunidad` | Comunidad |
| `/nosotros` | Nosotros |
| `/contacto` | Contacto |

---

## Footer

Pie de página del sitio.

### Uso

```tsx
import Footer from '@/components/organisms/Footer';

// En el layout principal
<Footer />
```

### Secciones

- Logo y tagline
- Enlaces de navegación
- Redes sociales
- Páginas legales
- Copyright

### Efecto Especial

"Sticky reveal" en desktop: el footer se revela al hacer scroll hasta el final.

---

## Hero / HeroVideoB

Sección hero principal.

### Props

```typescript
interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  videoSrc?: string;  // Solo HeroVideoB
}
```

### Uso

```tsx
import Hero from '@/components/organisms/Hero';

<Hero
  title="Vibe Flow"
  subtitle="La comunidad de élite para creadores digitales"
  ctaText="Únete ahora"
  ctaLink="/comunidad"
/>
```

### Características

- Título con texto kinético
- Ambient lighting (glows)
- CTA prominente
- Scroll indicator
- Video de fondo opcional (HeroVideoB)

---

## ContactSection

Formulario de contacto completo.

### Props

```typescript
interface ContactSectionProps {
  className?: string;
}
```

### Uso

```tsx
import ContactSection from '@/components/organisms/ContactSection';

<ContactSection />
```

### Características

- Campos: nombre, email, mensaje
- Validación en tiempo real
- Rate limiting (3 envíos/min)
- Estados: idle, loading, success, error
- Animaciones de feedback

### Campos

| Campo | Tipo | Validación |
|-------|------|------------|
| Nombre | text | Min 2 caracteres |
| Email | email | Formato válido |
| Mensaje | textarea | Min 10, max 5000 caracteres |

---

## StackingProjects

Galería de proyectos con efecto stacking.

### Props

```typescript
interface StackingProjectsProps {
  projects?: Project[];
  className?: string;
}
```

### Uso

```tsx
import StackingProjects from '@/components/organisms/StackingProjects';
import { projects } from '@/data/projects';

<StackingProjects projects={projects} />
```

### Características

- Cards que se apilan al scroll
- Scroll-triggered animations
- Link a detalle de proyecto
- Responsive (grid en móvil)

---

## ServiceModal

Modal expandido de servicio.

### Props

```typescript
interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}
```

### Uso

```tsx
import ServiceModal from '@/components/organisms/ServiceModal';

const [selectedService, setSelectedService] = useState<Service | null>(null);

<ServiceModal
  service={selectedService}
  isOpen={!!selectedService}
  onClose={() => setSelectedService(null)}
/>
```

### Características

- Focus trap para accesibilidad
- Cierre con Escape
- Click fuera para cerrar
- Animación de entrada/salida
- Contenido completo del servicio

---

## Testimonials

Sección de testimonios.

### Props

```typescript
interface TestimonialsProps {
  testimonials?: Review[];
  className?: string;
}
```

### Uso

```tsx
import Testimonials from '@/components/organisms/Testimonials';

<Testimonials />
```

### Características

- Grid responsivo
- Stagger animation
- Estadísticas destacadas
- Diseño premium

---

## FAQSection

Sección de preguntas frecuentes.

### Props

```typescript
interface FAQSectionProps {
  faqs?: FAQ[];
  title?: string;
  className?: string;
}
```

### Uso

```tsx
import FAQSection from '@/components/organisms/FAQSection';

<FAQSection
  title="Preguntas Frecuentes"
  faqs={customFAQs}
/>
```

### Características

- Acordeón controlado (uno a la vez)
- Animaciones suaves
- Accesible con teclado

---

## MembershipSection

Sección de planes de membresía.

### Uso

```tsx
import MembershipSection from '@/components/organisms/MembershipSection';

<MembershipSection />
```

### Características

- Planes con precios
- Comparativa de features
- CTA destacado
- Badge de plan recomendado

---

## RoadmapSection

Visualización del roadmap.

### Uso

```tsx
import RoadmapSection from '@/components/organisms/RoadmapSection';

<RoadmapSection />
```

### Características

- Timeline visual
- Hitos por trimestre
- Indicador de progreso
- Animaciones scroll-triggered

---

## AboutSection / TeamSection

Secciones sobre el equipo.

### Uso

```tsx
import AboutSection from '@/components/organisms/AboutSection';
import TeamSection from '@/components/organisms/TeamSection';

<AboutSection />
<TeamSection />
```

### Características

- Fotos del equipo
- Biografías
- Redes sociales
- Animaciones de entrada

---

## Layout Components

### SmoothScroll

```tsx
import SmoothScroll from '@/components/layout/SmoothScroll';

<SmoothScroll>
  <App />
</SmoothScroll>
```

Implementa scroll suave con Lenis.

### PageTransition

```tsx
import PageTransition from '@/components/layout/PageTransition';

<PageTransition>
  <Page />
</PageTransition>
```

Animaciones de entrada/salida entre páginas.

### ErrorBoundary

```tsx
import ErrorBoundary from '@/components/layout/ErrorBoundary';

<ErrorBoundary fallback={<ErrorPage />}>
  <Component />
</ErrorBoundary>
```

Captura errores de React y muestra fallback.

### GlobalBackground

```tsx
import GlobalBackground from '@/components/layout/GlobalBackground';

<GlobalBackground />
```

Fondos animados según el tema activo.

---

*Última actualización: Enero 2026*
