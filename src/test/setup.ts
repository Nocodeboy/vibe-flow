import '@testing-library/jest-dom';
import { vi, afterEach, beforeEach } from 'vitest';

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor() {}

  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver {
  constructor() {}
  disconnect() {}
  unobserve() {}
  observe() {}
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock window.matchMedia
const createMatchMedia = (matches: boolean) => (query: string) => ({
  matches,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(() => false),
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: createMatchMedia(false),
});

// Helper to change matchMedia mock
export const setMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: createMatchMedia(matches),
  });
};

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock requestAnimationFrame - use setTimeout for async behavior to avoid Framer Motion infinite loops
let rafId = 0;
window.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
  rafId++;
  const id = rafId;
  setTimeout(() => callback(performance.now()), 0);
  return id;
});

window.cancelAnimationFrame = vi.fn();

// Mock fetch
global.fetch = vi.fn();

// Clean up mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});
