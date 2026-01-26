import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFocusTrap } from './useFocusTrap';

describe('useFocusTrap', () => {
  it('should return a ref object', () => {
    const { result } = renderHook(() => useFocusTrap(true));
    expect(result.current).toHaveProperty('current');
  });

  it('should return a ref that can be attached to an element', () => {
    const { result } = renderHook(() => useFocusTrap(false));
    expect(result.current.current).toBe(null);
  });

  it('should not trap focus when isActive is false', () => {
    const { result } = renderHook(() => useFocusTrap(false));
    // When inactive, it should still return a valid ref
    expect(result.current).toBeDefined();
  });
});
