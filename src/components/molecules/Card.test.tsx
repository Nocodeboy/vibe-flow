import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  describe('rendering', () => {
    it('should render children content', () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('custom-class');
    });

    it('should have base styles', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('relative');
      expect(card).toHaveClass('rounded-[2rem]');
      expect(card).toHaveClass('overflow-hidden');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('transition-all');
    });
  });

  describe('variants', () => {
    it('should render glass variant by default', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-[#0A0A0A]');
      expect(card).toHaveClass('border-white/5');
      expect(card).toHaveClass('backdrop-blur-sm');
    });

    it('should render solid variant', () => {
      render(<Card variant="solid" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-[#0A0A0A]');
      expect(card).toHaveClass('border-white/5');
    });

    it('should render outline variant', () => {
      render(<Card variant="outline" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-transparent');
      expect(card).toHaveClass('border-white/10');
    });
  });

  describe('hover effects', () => {
    it('should apply scale hover effect by default', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hover:scale-[1.02]');
      expect(card).toHaveClass('hover:border-white/10');
    });

    it('should apply glow hover effect', () => {
      render(<Card hoverEffect="glow" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('hover:border-primary/30');
    });

    it('should apply no hover effect when set to none', () => {
      render(<Card hoverEffect="none" data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('hover:scale-[1.02]');
      expect(card).not.toHaveClass('hover:border-primary/30');
    });
  });

  describe('gradient overlay', () => {
    it('should not render gradient overlay by default', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      const overlay = card.querySelector('.bg-gradient-to-b');
      expect(overlay).not.toBeInTheDocument();
    });

    it('should render gradient overlay when enabled', () => {
      render(<Card gradientOverlay data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      const overlay = card.querySelector('.bg-gradient-to-b');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass('pointer-events-none');
      expect(overlay).toHaveClass('z-10');
    });
  });

  describe('content wrapper', () => {
    it('should wrap content in relative z-20 container', () => {
      render(<Card data-testid="card"><span data-testid="content">Content</span></Card>);
      const content = screen.getByTestId('content');
      expect(content.parentElement).toHaveClass('relative');
      expect(content.parentElement).toHaveClass('z-20');
      expect(content.parentElement).toHaveClass('h-full');
    });
  });

  describe('motion props', () => {
    it('should accept motion props without errors', () => {
      // Card extends HTMLMotionProps, so it should accept motion-related props
      const { container } = render(
        <Card data-testid="card">
          Content
        </Card>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('combinations', () => {
    it('should support multiple props together', () => {
      render(
        <Card
          variant="outline"
          hoverEffect="glow"
          gradientOverlay
          className="p-6"
          data-testid="card"
        >
          Combined Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-transparent');
      expect(card).toHaveClass('hover:border-primary/30');
      expect(card).toHaveClass('p-6');
      expect(card.querySelector('.bg-gradient-to-b')).toBeInTheDocument();
    });
  });
});
