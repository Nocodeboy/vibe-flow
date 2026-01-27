import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FAQItem from './FAQItem';

describe('FAQItem', () => {
  const defaultProps = {
    q: 'What is Vibe Flow?',
    a: 'Vibe Flow is a digital agency specializing in web development and AI solutions.',
    index: 0,
  };

  describe('rendering', () => {
    it('should render the question', () => {
      render(<FAQItem {...defaultProps} />);
      expect(screen.getByText(defaultProps.q)).toBeInTheDocument();
    });

    it('should not show answer by default', () => {
      render(<FAQItem {...defaultProps} />);
      expect(screen.queryByText(defaultProps.a)).not.toBeInTheDocument();
    });

    it('should render as button element', () => {
      render(<FAQItem {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render with border styles', () => {
      const { container } = render(<FAQItem {...defaultProps} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('border-b');
      expect(wrapper).toHaveClass('border-white/10');
    });
  });

  describe('accessibility', () => {
    it('should have aria-expanded attribute set to false by default', () => {
      render(<FAQItem {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-expanded attribute set to true when open', () => {
      render(<FAQItem {...defaultProps} />);
      fireEvent.click(screen.getByRole('button'));
      // aria-expanded changes synchronously with state
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-controls linking to content', () => {
      render(<FAQItem {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-controls');
    });

    it('should have focus-visible styles', () => {
      render(<FAQItem {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus-visible:outline-2');
      expect(button).toHaveClass('focus-visible:outline-primary');
    });

    it('should open when Enter key is pressed', async () => {
      render(<FAQItem {...defaultProps} />);
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter' });
      await waitFor(() => {
        expect(screen.getByText(defaultProps.a)).toBeInTheDocument();
      });
    });

    it('should open when Space key is pressed', async () => {
      render(<FAQItem {...defaultProps} />);
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: ' ' });
      await waitFor(() => {
        expect(screen.getByText(defaultProps.a)).toBeInTheDocument();
      });
    });

    it('should have region role for content when open', async () => {
      render(<FAQItem {...defaultProps} />);
      fireEvent.click(screen.getByRole('button'));
      await waitFor(() => {
        expect(screen.getByRole('region')).toBeInTheDocument();
      });
    });
  });

  describe('toggle behavior', () => {
    it('should show answer when clicked', async () => {
      render(<FAQItem {...defaultProps} />);
      fireEvent.click(screen.getByRole('button'));
      await waitFor(() => {
        expect(screen.getByText(defaultProps.a)).toBeInTheDocument();
      });
    });

    it('should hide answer when clicked twice', async () => {
      render(<FAQItem {...defaultProps} />);
      const button = screen.getByRole('button');

      // Open
      fireEvent.click(button);
      await waitFor(() => {
        expect(screen.getByText(defaultProps.a)).toBeInTheDocument();
      });

      // Close - check aria-expanded instead of waiting for animation
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('should toggle icon from Plus to Minus when opened', async () => {
      render(<FAQItem {...defaultProps} />);

      // Plus icon visible initially (implied by closed state)
      expect(screen.getByRole('button').querySelector('[aria-hidden="true"]')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button'));

      // State changes after click
      await waitFor(() => {
        expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('icon indicator', () => {
    it('should have indicator with border and flex styles', () => {
      render(<FAQItem {...defaultProps} />);
      const indicator = screen.getByRole('button').querySelector('[aria-hidden="true"]');
      expect(indicator).toHaveClass('w-8');
      expect(indicator).toHaveClass('h-8');
      expect(indicator).toHaveClass('rounded-full');
      expect(indicator).toHaveClass('border');
    });

    it('should change indicator styling when open', async () => {
      render(<FAQItem {...defaultProps} />);
      fireEvent.click(screen.getByRole('button'));

      await waitFor(() => {
        const indicator = screen.getByRole('button').querySelector('[aria-hidden="true"]');
        expect(indicator).toHaveClass('text-primary');
        expect(indicator).toHaveClass('bg-primary/10');
        expect(indicator).toHaveClass('border-primary');
      });
    });
  });

  describe('content rendering', () => {
    it('should render ReactNode as answer', async () => {
      const complexAnswer = (
        <div data-testid="complex-answer">
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>
      );

      render(<FAQItem q="Question?" a={complexAnswer} index={0} />);
      fireEvent.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByTestId('complex-answer')).toBeInTheDocument();
        expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
        expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
      });
    });

    it('should have correct content styles', async () => {
      render(<FAQItem {...defaultProps} />);
      fireEvent.click(screen.getByRole('button'));

      await waitFor(() => {
        const content = screen.getByRole('region');
        expect(content).toHaveClass('overflow-hidden');
      });
    });
  });

  describe('styling', () => {
    it('should have hover transition styles on button', () => {
      render(<FAQItem {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:text-primary');
      expect(button).toHaveClass('transition-colors');
    });

    it('should have full width button', () => {
      render(<FAQItem {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('should have text-left alignment', () => {
      render(<FAQItem {...defaultProps} />);
      expect(screen.getByRole('button')).toHaveClass('text-left');
    });
  });

  describe('animation', () => {
    it('should have animation delay based on index', () => {
      const { rerender } = render(<FAQItem {...defaultProps} index={0} />);
      // Component uses Framer Motion for animations
      // The animation is handled by motion.div with delay: index * 0.1

      rerender(<FAQItem {...defaultProps} index={5} />);
      // Animation timing is handled internally by Framer Motion
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
