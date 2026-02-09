import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile, isMobileDevice } from './useIsMobile';

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;
  let ontouchstartDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    // Store original ontouchstart descriptor
    ontouchstartDescriptor = Object.getOwnPropertyDescriptor(window, 'ontouchstart');

    // Reset to desktop by default - delete ontouchstart to make 'ontouchstart' in window return false
    delete (window as typeof window & { ontouchstart?: unknown }).ontouchstart;

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    Object.defineProperty(navigator, 'maxTouchPoints', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });

    // Restore ontouchstart
    if (ontouchstartDescriptor) {
      Object.defineProperty(window, 'ontouchstart', ontouchstartDescriptor);
    }
  });

  it('should return false for desktop viewport (> 768px)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true, configurable: true });
    delete (window as typeof window & { ontouchstart?: unknown }).ontouchstart;
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, writable: true, configurable: true });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true for mobile viewport (< 768px)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true, configurable: true });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return true for exactly 767px (below breakpoint)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 767, writable: true, configurable: true });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return false for exactly 768px (at breakpoint)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true, configurable: true });
    delete (window as typeof window & { ontouchstart?: unknown }).ontouchstart;
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, writable: true, configurable: true });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true when device has touch support via ontouchstart', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true, configurable: true });
    Object.defineProperty(window, 'ontouchstart', { value: () => {}, writable: true, configurable: true });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return true when device has touch support via maxTouchPoints', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true, configurable: true });
    delete (window as typeof window & { ontouchstart?: unknown }).ontouchstart;
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 5, writable: true, configurable: true });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should update on window resize from desktop to mobile', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true, configurable: true });
    delete (window as typeof window & { ontouchstart?: unknown }).ontouchstart;
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, writable: true, configurable: true });

    const { result } = renderHook(() => useIsMobile());

    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 375, writable: true, configurable: true });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(true);
  });

  it('should clean up resize listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useIsMobile());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});

describe('isMobileDevice', () => {
  let ontouchstartDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    ontouchstartDescriptor = Object.getOwnPropertyDescriptor(window, 'ontouchstart');
    delete (window as typeof window & { ontouchstart?: unknown }).ontouchstart;
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true, configurable: true });
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, writable: true, configurable: true });
  });

  afterEach(() => {
    if (ontouchstartDescriptor) {
      Object.defineProperty(window, 'ontouchstart', ontouchstartDescriptor);
    }
  });

  it('should return false for desktop', () => {
    expect(isMobileDevice()).toBe(false);
  });

  it('should return true for small screen', () => {
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true, configurable: true });
    expect(isMobileDevice()).toBe(true);
  });

  it('should return true for touch device via ontouchstart', () => {
    Object.defineProperty(window, 'ontouchstart', { value: () => {}, writable: true, configurable: true });
    expect(isMobileDevice()).toBe(true);
  });

  it('should return true for device with maxTouchPoints', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 5, writable: true, configurable: true });
    expect(isMobileDevice()).toBe(true);
  });
});
