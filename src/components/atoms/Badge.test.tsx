import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('should render badge with children', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('should render as a span element', () => {
      render(<Badge>Badge</Badge>);
      expect(screen.getByText('Badge').tagName).toBe('SPAN');
    });

    it('should apply custom className', () => {
      render(<Badge className="custom-class">Badge</Badge>);
      expect(screen.getByText('Badge')).toHaveClass('custom-class');
    });

    it('should apply custom style', () => {
      render(<Badge style={{ marginTop: '10px' }}>Badge</Badge>);
      expect(screen.getByText('Badge')).toHaveStyle({ marginTop: '10px' });
    });
  });

  describe('variants', () => {
    it('should render outline variant by default', () => {
      render(<Badge>Outline</Badge>);
      expect(screen.getByText('Outline')).toHaveClass('bg-transparent');
    });

    it('should render filled variant', () => {
      render(<Badge variant="filled">Filled</Badge>);
      expect(screen.getByText('Filled')).toHaveClass('text-black');
    });

    it('should render glass variant', () => {
      render(<Badge variant="glass">Glass</Badge>);
      expect(screen.getByText('Glass')).toHaveClass('glass');
    });

    it('should render live variant with indicator', () => {
      render(<Badge variant="live">Live</Badge>);
      const badge = screen.getByText('Live');
      expect(badge).toHaveClass('pl-3');
      // Check for live indicator (animated ping)
      const pingElement = badge.querySelector('.animate-ping');
      expect(pingElement).toBeInTheDocument();
    });
  });

  describe('colors', () => {
    it('should render primary color by default', () => {
      render(<Badge>Primary</Badge>);
      expect(screen.getByText('Primary')).toHaveClass('border-primary/50');
    });

    it('should render primary filled color', () => {
      render(<Badge variant="filled" color="primary">Primary Filled</Badge>);
      expect(screen.getByText('Primary Filled')).toHaveClass('bg-primary');
      expect(screen.getByText('Primary Filled')).toHaveClass('text-black');
    });

    it('should render white color', () => {
      render(<Badge color="white">White</Badge>);
      expect(screen.getByText('White')).toHaveClass('border-white/10');
    });

    it('should render white filled color', () => {
      render(<Badge variant="filled" color="white">White Filled</Badge>);
      expect(screen.getByText('White Filled')).toHaveClass('bg-white');
    });

    it('should render red color', () => {
      render(<Badge color="red">Red</Badge>);
      expect(screen.getByText('Red')).toHaveClass('border-red-500/50');
      expect(screen.getByText('Red')).toHaveClass('text-red-500');
    });

    it('should render red filled color', () => {
      render(<Badge variant="filled" color="red">Red Filled</Badge>);
      expect(screen.getByText('Red Filled')).toHaveClass('bg-red-500');
    });
  });

  describe('sizes', () => {
    it('should render small size by default', () => {
      render(<Badge>Small</Badge>);
      expect(screen.getByText('Small')).toHaveClass('text-[10px]');
      expect(screen.getByText('Small')).toHaveClass('px-3');
      expect(screen.getByText('Small')).toHaveClass('py-1');
    });

    it('should render medium size', () => {
      render(<Badge size="md">Medium</Badge>);
      expect(screen.getByText('Medium')).toHaveClass('text-[11px]');
      expect(screen.getByText('Medium')).toHaveClass('px-4');
    });

    it('should render large size', () => {
      render(<Badge size="lg">Large</Badge>);
      expect(screen.getByText('Large')).toHaveClass('text-xs');
      expect(screen.getByText('Large')).toHaveClass('px-5');
      expect(screen.getByText('Large')).toHaveClass('py-2');
    });
  });

  describe('icon', () => {
    it('should render icon when provided', () => {
      render(<Badge icon={<span data-testid="icon">★</span>}>With Icon</Badge>);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('should position icon before text', () => {
      render(<Badge icon={<span data-testid="icon">★</span>}>Text</Badge>);
      const badge = screen.getByText('Text');
      const icon = screen.getByTestId('icon');
      expect(icon.parentElement).toHaveClass('mr-2');
    });
  });

  describe('live indicator', () => {
    it('should show primary color indicator by default', () => {
      render(<Badge variant="live">Live</Badge>);
      const badge = screen.getByText('Live');
      const indicator = badge.querySelector('.bg-primary');
      expect(indicator).toBeInTheDocument();
    });

    it('should show white indicator for white color', () => {
      render(<Badge variant="live" color="white">Live</Badge>);
      const badge = screen.getByText('Live');
      const indicator = badge.querySelector('.bg-white');
      expect(indicator).toBeInTheDocument();
    });
  });

  describe('base styles', () => {
    it('should have font-bold and uppercase classes', () => {
      render(<Badge>Badge</Badge>);
      const badge = screen.getByText('Badge');
      expect(badge).toHaveClass('font-bold');
      expect(badge).toHaveClass('uppercase');
    });

    it('should have tracking and transition classes', () => {
      render(<Badge>Badge</Badge>);
      const badge = screen.getByText('Badge');
      expect(badge).toHaveClass('tracking-[0.2em]');
      expect(badge).toHaveClass('transition-all');
    });

    it('should be an inline-flex element', () => {
      render(<Badge>Badge</Badge>);
      expect(screen.getByText('Badge')).toHaveClass('inline-flex');
      expect(screen.getByText('Badge')).toHaveClass('items-center');
      expect(screen.getByText('Badge')).toHaveClass('justify-center');
    });
  });

  describe('HTML attributes', () => {
    it('should pass through additional HTML attributes', () => {
      render(<Badge data-testid="custom-badge" id="badge-1">Badge</Badge>);
      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('id', 'badge-1');
    });
  });
});
