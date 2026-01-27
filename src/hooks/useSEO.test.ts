import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSEO } from './useSEO';

describe('useSEO', () => {
  const originalTitle = document.title;

  beforeEach(() => {
    // Reset document head
    document.title = '';
    // Remove any existing meta tags we might have added
    const metas = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], meta[name="description"]');
    metas.forEach((meta) => meta.remove());
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  describe('title', () => {
    it('should set default title when no props provided', () => {
      renderHook(() => useSEO());
      expect(document.title).toBe('Vibe Flow | Comunidad de IA y Automatización');
    });

    it('should set custom title with suffix', () => {
      renderHook(() => useSEO({ title: 'Servicios' }));
      expect(document.title).toBe('Servicios | Vibe Flow');
    });

    it('should update title when props change', () => {
      const { rerender } = renderHook(({ title }) => useSEO({ title }), {
        initialProps: { title: 'Page 1' },
      });

      expect(document.title).toBe('Page 1 | Vibe Flow');

      rerender({ title: 'Page 2' });
      expect(document.title).toBe('Page 2 | Vibe Flow');
    });
  });

  describe('meta description', () => {
    it('should set default description when no props provided', () => {
      renderHook(() => useSEO());

      const meta = document.querySelector('meta[name="description"]');
      expect(meta?.getAttribute('content')).toContain('comunidad de élite');
    });

    it('should set custom description', () => {
      renderHook(() => useSEO({ description: 'Custom description' }));

      const meta = document.querySelector('meta[name="description"]');
      expect(meta?.getAttribute('content')).toBe('Custom description');
    });
  });

  describe('Open Graph tags', () => {
    it('should set og:title', () => {
      renderHook(() => useSEO({ title: 'Test Page' }));

      const meta = document.querySelector('meta[property="og:title"]');
      expect(meta?.getAttribute('content')).toBe('Test Page | Vibe Flow');
    });

    it('should set og:description', () => {
      renderHook(() => useSEO({ description: 'Test description' }));

      const meta = document.querySelector('meta[property="og:description"]');
      expect(meta?.getAttribute('content')).toBe('Test description');
    });

    it('should set og:image', () => {
      renderHook(() => useSEO({ image: 'https://example.com/image.jpg' }));

      const meta = document.querySelector('meta[property="og:image"]');
      expect(meta?.getAttribute('content')).toBe('https://example.com/image.jpg');
    });

    it('should set og:url', () => {
      renderHook(() => useSEO({ url: 'https://example.com/page' }));

      const meta = document.querySelector('meta[property="og:url"]');
      expect(meta?.getAttribute('content')).toBe('https://example.com/page');
    });

    it('should set og:type to website by default', () => {
      renderHook(() => useSEO());

      const meta = document.querySelector('meta[property="og:type"]');
      expect(meta?.getAttribute('content')).toBe('website');
    });

    it('should set og:type to article when specified', () => {
      renderHook(() => useSEO({ type: 'article' }));

      const meta = document.querySelector('meta[property="og:type"]');
      expect(meta?.getAttribute('content')).toBe('article');
    });
  });

  describe('Twitter tags', () => {
    it('should set twitter:title', () => {
      renderHook(() => useSEO({ title: 'Test Page' }));

      const meta = document.querySelector('meta[name="twitter:title"]');
      expect(meta?.getAttribute('content')).toBe('Test Page | Vibe Flow');
    });

    it('should set twitter:description', () => {
      renderHook(() => useSEO({ description: 'Test description' }));

      const meta = document.querySelector('meta[name="twitter:description"]');
      expect(meta?.getAttribute('content')).toBe('Test description');
    });

    it('should set twitter:image', () => {
      renderHook(() => useSEO({ image: 'https://example.com/image.jpg' }));

      const meta = document.querySelector('meta[name="twitter:image"]');
      expect(meta?.getAttribute('content')).toBe('https://example.com/image.jpg');
    });
  });

  describe('article metadata', () => {
    it('should set article:published_time when provided', () => {
      renderHook(() =>
        useSEO({
          type: 'article',
          article: {
            publishedTime: '2026-01-15T10:00:00Z',
          },
        })
      );

      const meta = document.querySelector('meta[property="article:published_time"]');
      expect(meta?.getAttribute('content')).toBe('2026-01-15T10:00:00Z');
    });

    it('should set article:author when provided', () => {
      renderHook(() =>
        useSEO({
          type: 'article',
          article: {
            author: 'John Doe',
          },
        })
      );

      const meta = document.querySelector('meta[property="article:author"]');
      expect(meta?.getAttribute('content')).toBe('John Doe');
    });

    it('should set article:section when provided', () => {
      renderHook(() =>
        useSEO({
          type: 'article',
          article: {
            section: 'Technology',
          },
        })
      );

      const meta = document.querySelector('meta[property="article:section"]');
      expect(meta?.getAttribute('content')).toBe('Technology');
    });
  });
});
