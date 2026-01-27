import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Button from './Button';

// Wrapper for components using React Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Button', () => {
  describe('rendering', () => {
    it('should render button with children', () => {
      renderWithRouter(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should render with default props', () => {
      renderWithRouter(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary'); // primary variant
      expect(button).toHaveClass('rounded-full'); // pill shape
    });

    it('should apply custom className', () => {
      renderWithRouter(<Button className="custom-class">Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it('should render primary variant', () => {
      renderWithRouter(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-primary');
    });

    it('should render secondary variant', () => {
      renderWithRouter(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-white');
    });

    it('should render outline variant', () => {
      renderWithRouter(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-transparent');
      expect(screen.getByRole('button')).toHaveClass('border');
    });

    it('should render ghost variant', () => {
      renderWithRouter(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-transparent');
    });

    it('should render glass variant', () => {
      renderWithRouter(<Button variant="glass">Glass</Button>);
      expect(screen.getByRole('button')).toHaveClass('glass');
    });
  });

  describe('sizes', () => {
    it('should render small size', () => {
      renderWithRouter(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-6');
      expect(screen.getByRole('button')).toHaveClass('py-3');
    });

    it('should render medium size (default)', () => {
      renderWithRouter(<Button size="md">Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-8');
      expect(screen.getByRole('button')).toHaveClass('py-4');
    });

    it('should render large size', () => {
      renderWithRouter(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-10');
      expect(screen.getByRole('button')).toHaveClass('py-5');
    });

    it('should render icon size', () => {
      renderWithRouter(<Button size="icon">Icon</Button>);
      expect(screen.getByRole('button')).toHaveClass('p-3');
    });
  });

  describe('shapes', () => {
    it('should render pill shape (default)', () => {
      renderWithRouter(<Button shape="pill">Pill</Button>);
      expect(screen.getByRole('button')).toHaveClass('rounded-full');
    });

    it('should render rounded shape', () => {
      renderWithRouter(<Button shape="rounded">Rounded</Button>);
      expect(screen.getByRole('button')).toHaveClass('rounded-lg');
    });

    it('should render square shape', () => {
      renderWithRouter(<Button shape="square">Square</Button>);
      expect(screen.getByRole('button')).toHaveClass('rounded-none');
    });

    it('should render circle shape', () => {
      renderWithRouter(<Button shape="circle">Circle</Button>);
      expect(screen.getByRole('button')).toHaveClass('rounded-full');
      expect(screen.getByRole('button')).toHaveClass('aspect-square');
    });
  });

  describe('loading state', () => {
    it('should show loading spinner when isLoading is true', () => {
      renderWithRouter(<Button isLoading>Loading</Button>);
      // Check for Loader2 icon (has animate-spin class)
      const spinner = screen.getByRole('button').querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should disable button when loading', () => {
      renderWithRouter(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should hide icon when loading', () => {
      renderWithRouter(
        <Button isLoading icon={<span data-testid="icon">→</span>}>
          Loading
        </Button>
      );
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('should render icon on the right by default', () => {
      renderWithRouter(
        <Button icon={<span data-testid="icon">→</span>}>With Icon</Button>
      );
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
      expect(icon.parentElement).toHaveClass('ml-2');
    });

    it('should render icon on the left when iconPosition is left', () => {
      renderWithRouter(
        <Button icon={<span data-testid="icon">←</span>} iconPosition="left">
          With Icon
        </Button>
      );
      const icon = screen.getByTestId('icon');
      expect(icon.parentElement).toHaveClass('mr-2');
    });
  });

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      renderWithRouter(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should have disabled styles', () => {
      renderWithRouter(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toHaveClass('disabled:opacity-50');
      expect(screen.getByRole('button')).toHaveClass('disabled:cursor-not-allowed');
    });
  });

  describe('fullWidth', () => {
    it('should apply full width when fullWidth is true', () => {
      renderWithRouter(<Button fullWidth>Full Width</Button>);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });
  });

  describe('interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      renderWithRouter(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = vi.fn();
      renderWithRouter(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', () => {
      const handleClick = vi.fn();
      renderWithRouter(
        <Button onClick={handleClick} isLoading>
          Loading
        </Button>
      );
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('link behavior', () => {
    it('should render as Link for internal href', () => {
      renderWithRouter(<Button href="/about">About</Button>);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/about');
    });

    it('should render as external link with href and external prop', () => {
      renderWithRouter(
        <Button href="https://example.com" external>
          External
        </Button>
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
