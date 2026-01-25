# CLAUDE.md - AI Assistant Guide for VibeFlow

This document provides comprehensive guidance for AI assistants working with the VibeFlow codebase.

## Project Overview

**VibeFlow** is a premium, Awwwards-quality portfolio website for an AI Digitalization Consultant and the VibeFlow community - an elite community for learning AI and automation through hands-on project building.

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 12
- **Routing:** React Router 7

## Quick Commands

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build
npm run preview   # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── atoms/        # Base UI elements (Button, Badge, CustomCursor, etc.)
│   ├── molecules/    # Composed components (Card, ServiceCard, FAQItem)
│   ├── organisms/    # Complex sections (Navbar, Hero, Footer, etc.)
│   └── layout/       # Layout wrappers (SmoothScroll, PageTransition)
├── pages/            # Route page components
├── data/             # Static data (projects.ts, services.tsx, posts.ts)
├── hooks/            # Custom hooks (useSEO.ts)
├── contexts/         # React Context (BackgroundContext.tsx)
├── types/            # TypeScript interfaces
├── styles/           # Animation tokens and CSS variables
├── App.tsx           # Main router
└── index.tsx         # React mount point

docs/
├── core/             # Vision, mission, roadmap documentation
└── design/           # Brand guidelines, style guide, component docs
```

## Architecture Pattern: Atomic Design

The codebase follows Atomic Design principles:

1. **Atoms** (`components/atoms/`) - Basic building blocks
   - Button, Badge, Skeleton, CustomCursor, KineticChar, AnimatedCounter, Magnetic, Spotlight, NoiseOverlay

2. **Molecules** (`components/molecules/`) - Composed from atoms
   - Card, ServiceCard, BlogCard, TestimonialCard, FAQItem

3. **Organisms** (`components/organisms/`) - Complex sections
   - Navbar, Hero, Footer, ServiceModal, StackingProjects, FAQSection, etc.

## Design System

### Colors

```
Primary (Verde Lima): #98e710   → CTAs, highlights, accents
Background:          #030303   → Main dark background
Surface:             #0A0A0A   → Cards, elevated elements
Text:                #fefefe   → Default text color
```

### Typography

- **Display Font:** Space Mono (monospace) - headings, titles, numbers
- **Body Font:** Inter (sans-serif) - text content, UI labels

### Animation Tokens

Located in `src/styles/animation.ts`:

```typescript
EASE_ELITE: [0.16, 1, 0.3, 1]  // Custom easing curve
DURATION: {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
  VERY_SLOW: 1.2
}
```

## Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Landing page |
| `/work` | Work | Projects showcase |
| `/work/:id` | ProjectPage | Project details |
| `/services` | Services | Service offerings |
| `/methodology` | Methodology | Process docs |
| `/community` | Community | VibeFlow community |
| `/about` | About | Company info |
| `/blog` | Blog | Blog articles |
| `/blog/:slug` | BlogPostPage | Blog post |
| `/contact` | Contact | Contact form |

## Key Conventions

### Component Structure

```typescript
import { motion } from 'framer-motion';

interface ComponentNameProps {
  // Props with TypeScript types
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Component logic
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Tailwind classes
      className="..."
    >
      {/* Content */}
    </motion.div>
  );
}
```

### Naming Conventions

- **Components:** PascalCase (e.g., `ServiceCard.tsx`)
- **Functions/Variables:** camelCase
- **Constants:** CONSTANT_CASE
- **Files:** Match component names

### Styling Approach

1. **Tailwind-first** - Use utility classes for styling
2. **Custom CSS** - Only for complex patterns in `index.css`
3. **Framer Motion** - For dynamic animation styles
4. **Responsive pattern:** `text-sm md:text-lg lg:text-2xl`

### Custom CSS Classes

```css
.glass          /* Glass morphism with backdrop blur */
.dashed-line    /* Dashed border pattern */
.modal-scrollbar /* Custom scrollbar styling */
```

## State Management

- **BackgroundContext** - Manages background theme variants ('nebula', 'cyber', 'void', 'warm', 'default')
- **Component state** - React hooks (useState, useEffect, useRef)
- **Static data** - Files in `/src/data`

## Custom Hooks

### useSEO

```typescript
useSEO({
  title: 'Page Title',
  description: 'Page description',
  image: 'og-image.jpg',
  url: '/page-url',
  type: 'website' | 'article',
  article: { publishedTime, modifiedTime, tags }
});
```

## Key Features

1. **Smooth Scroll** - Lenis integration in `SmoothScroll.tsx`
2. **Page Transitions** - Blur + opacity animations via `PageTransition.tsx`
3. **Custom Cursor** - Green glow cursor in `CustomCursor.tsx`
4. **3D Card Tilt** - Mouse-based rotation in `ServiceCard.tsx`
5. **Kinetic Text** - Character animations in `KineticChar.tsx`
6. **Glass Morphism** - Frosted glass effects
7. **Dynamic Background** - Theme-aware animated background

## TypeScript Types

Located in `src/types/index.ts`:

```typescript
interface Project {
  id: string;
  title: string;
  category: string;
  img: string;
  description: string;
  tags: string[];
  challenge?: string;
  solution?: string;
  impact?: string[];
}

interface Service {
  id: string;
  num: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
  priceRange: string;
  color: string;
  details: { fullDesc, deliverables, timeline, ideal };
}
```

## Development Guidelines

### When Adding New Components

1. **Determine atomic level** - Is it an atom, molecule, or organism?
2. **Use TypeScript** - Define proper prop interfaces
3. **Animate with Framer Motion** - Follow existing animation patterns
4. **Style with Tailwind** - Maintain consistency with design tokens
5. **Consider themes** - Support background context if applicable
6. **Mobile-first** - Design responsive from small screens up

### Performance Best Practices

1. Animate only `transform` and `opacity` for GPU acceleration
2. Use `ResizeObserver` for layout measurements
3. Implement lazy loading for large components
4. Minimize `backdrop-filter` usage on low-end devices

### Code Quality

1. **No inline styles** except Framer Motion dynamic values
2. **Extract reusable logic** into custom hooks
3. **Keep components focused** - Single responsibility
4. **Type everything** - No `any` types

## Environment Variables

```bash
GEMINI_API_KEY=your-api-key  # Google GenAI integration
```

Access in code:
```typescript
process.env.GEMINI_API_KEY
```

## Important Paths

| Path | Purpose |
|------|---------|
| `src/styles/animation.ts` | Animation easing and duration constants |
| `src/styles/tokens.css` | CSS custom properties |
| `tailwind.config.js` | Design system configuration |
| `vite.config.ts` | Build and dev server config |
| `docs/design/STYLE_GUIDE.md` | Comprehensive design documentation |

## Z-Index Layers

```
z-50   → Modals, overlays
z-10   → Navbar, floating elements
z-0    → Content
-z-50  → Background elements
```

## Language Notes

- **Primary language:** Spanish (content and documentation)
- **Code comments:** English preferred
- **Variable names:** English

## Testing

Currently no test configuration. When adding tests:
- Use Vitest (Vite-native)
- Add component tests with React Testing Library
- Place tests adjacent to components or in `__tests__` directories

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Use `useSEO` hook for meta tags
4. Wrap content in `PageTransition` if needed
5. Update Navbar links if visible in navigation

### Adding a New Component

1. Determine atomic level (atom/molecule/organism)
2. Create file: `src/components/{level}/ComponentName.tsx`
3. Define TypeScript interface for props
4. Implement with Framer Motion animations
5. Style with Tailwind classes

### Modifying Design Tokens

1. **Colors/Fonts:** Edit `tailwind.config.js`
2. **Animations:** Edit `src/styles/animation.ts`
3. **CSS Variables:** Edit `src/styles/tokens.css`

## Documentation Resources

- `docs/design/STYLE_GUIDE.md` - Full design system
- `docs/design/COMPONENTS.md` - Component catalog
- `docs/design/BRAND_GUIDELINES.md` - Brand identity
- `docs/core/vibeflow_vision_mision.md` - Project vision

## Do's and Don'ts

### Do

- Follow Atomic Design patterns
- Use Framer Motion for animations
- Type all props and state
- Keep components small and focused
- Use existing design tokens
- Test on mobile viewports

### Don't

- Add inline CSS (except Framer dynamic styles)
- Create duplicate utility functions
- Skip TypeScript types
- Ignore mobile responsiveness
- Over-engineer simple features
- Add dependencies without justification

## Quick Reference

```bash
# Development
npm run dev

# Build
npm run build

# Type checking
npx tsc --noEmit

# Preview build
npm run preview
```

---

*Last updated: 2026-01-25*
