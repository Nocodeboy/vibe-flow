# Molecules

> Combinaciones de atoms que forman unidades funcionales

---

## Card

Tarjeta contenedora con variantes visuales.

### Props

```typescript
interface CardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'outline';
  hover?: boolean;          // Efecto hover
  className?: string;
  onClick?: () => void;
}
```

### Uso

```tsx
import Card from '@/components/molecules/Card';

// Glass (default)
<Card>
  <h3>Título</h3>
  <p>Contenido de la tarjeta</p>
</Card>

// Con hover effect
<Card variant="glass" hover onClick={handleClick}>
  <h3>Card Interactiva</h3>
</Card>

// Solid
<Card variant="solid">
  <h3>Tarjeta Sólida</h3>
</Card>
```

### Variantes

| Variante | Estilo |
|----------|--------|
| `glass` | Glassmorphism con blur |
| `solid` | Fondo sólido surface |
| `outline` | Solo borde |

---

## FAQItem

Item expandible para secciones de FAQ.

### Props

```typescript
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
  index?: number;
}
```

### Uso

```tsx
import FAQItem from '@/components/molecules/FAQItem';

const [openIndex, setOpenIndex] = useState<number | null>(null);

<FAQItem
  question="¿Qué incluye la membresía?"
  answer="La membresía incluye acceso a..."
  isOpen={openIndex === 0}
  onToggle={() => setOpenIndex(openIndex === 0 ? null : 0)}
  index={0}
/>
```

### Características

- Animación suave de apertura/cierre
- Icono de rotación
- Accesible con teclado (Enter/Space)
- ARIA attributes correctos

---

## TestimonialCard

Tarjeta para mostrar testimonios de clientes.

### Props

```typescript
interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  company?: string;
  avatar?: string;
  stat?: string;
  metric?: string;
}
```

### Uso

```tsx
import TestimonialCard from '@/components/molecules/TestimonialCard';

<TestimonialCard
  quote="Vibe Flow transformó completamente nuestra forma de trabajar."
  author="María García"
  position="CEO"
  company="TechCo"
  stat="+40%"
  metric="productividad"
/>
```

### Características

- Diseño con quote icon
- Estadística destacada opcional
- Efecto 3D tilt en hover
- Responsive design

---

## ServiceCard

Tarjeta para mostrar servicios ofrecidos.

### Props

```typescript
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  priceRange?: string;
  onClick?: () => void;
  featured?: boolean;
}
```

### Uso

```tsx
import ServiceCard from '@/components/molecules/ServiceCard';
import { Code } from 'lucide-react';

<ServiceCard
  icon={<Code className="w-8 h-8" />}
  title="Desarrollo Web"
  description="Creamos aplicaciones web modernas..."
  tags={['React', 'TypeScript', 'Tailwind']}
  priceRange="3.000€ - 12.000€"
  onClick={() => openModal('web-dev')}
  featured
/>
```

### Características

- Efecto 3D tilt en hover
- Tags con estilo pill
- Rango de precios opcional
- Estado featured destacado

---

## BlogCard

Tarjeta para artículos del blog.

### Props

```typescript
interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar?: string;
  };
  image?: string;
  tags?: string[];
}
```

### Uso

```tsx
import BlogCard from '@/components/molecules/BlogCard';

<BlogCard
  title="Cómo automatizar tu negocio con IA"
  excerpt="Descubre las mejores herramientas para..."
  slug="automatizar-negocio-ia"
  date="2026-01-15"
  readTime="5 min"
  author={{ name: "Germán López" }}
  image="/images/blog/ai-automation.webp"
  tags={['IA', 'Automatización']}
/>
```

### Características

- Imagen de portada opcional
- Información de autor
- Tiempo de lectura
- Link a artículo completo
- Efecto hover con scale

---

## Patrones de Uso

### Composición de Cards

```tsx
// Grid de ServiceCards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {services.map((service) => (
    <ServiceCard
      key={service.id}
      {...service}
      onClick={() => handleServiceClick(service.id)}
    />
  ))}
</div>
```

### FAQ Controlada

```tsx
// Múltiples FAQItems con un solo abierto
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          index={index}
        />
      ))}
    </div>
  );
};
```

### Blog Grid con Skeleton

```tsx
// Mostrar skeleton mientras carga
const BlogGrid: React.FC<{ posts: Post[]; isLoading: boolean }> = ({
  posts,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <Skeleton variant="rectangular" height={200} />
            <div className="p-4 space-y-2">
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} {...post} />
      ))}
    </div>
  );
};
```

---

*Última actualización: Enero 2026*
