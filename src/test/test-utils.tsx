import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BackgroundProvider } from '../contexts/BackgroundContext';

/**
 * Custom render function that wraps components with necessary providers
 */
interface WrapperProps {
  children: React.ReactNode;
}

const AllProviders: React.FC<WrapperProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <BackgroundProvider>{children}</BackgroundProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Override render method
export { customRender as render };

/**
 * Helper to create a mock function with type inference
 */
export const createMockFn = <T extends (...args: unknown[]) => unknown>() => {
  return vi.fn() as unknown as T;
};

/**
 * Helper to wait for animations to complete
 */
export const waitForAnimation = () => new Promise((resolve) => setTimeout(resolve, 100));

/**
 * Helper to mock window.innerWidth for responsive tests
 */
export const setViewportWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize'));
};

/**
 * Helper to reset viewport
 */
export const resetViewport = () => {
  setViewportWidth(1024);
};
