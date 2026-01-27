import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceCard from './ServiceCard';
import { Service } from '../../data/services';

// Mock service data
const mockService: Service = {
  id: 'web-development',
  num: '01',
  title: 'Desarrollo Web',
  desc: 'Creamos sitios web modernos y funcionales.',
  icon: <span data-testid="service-icon">🌐</span>,
  color: '#98e710',
  features: ['React', 'TypeScript', 'Tailwind'],
  priceRange: '€2,000 - €5,000',
  deliveryTime: '2-4 semanas',
  process: [
    {
      step: 'Diseño',
      description: 'Diseñamos la interfaz',
    },
  ],
  benefits: ['Responsive', 'SEO optimized'],
  idealFor: ['Startups', 'PYMES'],
};

describe('ServiceCard', () => {
  const defaultProps = {
    service: mockService,
    index: 0,
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render service title', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.getByText(mockService.title)).toBeInTheDocument();
    });

    it('should render service description', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.getByText(mockService.desc)).toBeInTheDocument();
    });

    it('should render service number', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.getByText(mockService.num)).toBeInTheDocument();
    });

    it('should render service price range', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.getByText(mockService.priceRange)).toBeInTheDocument();
    });

    it('should render service icon', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.getByTestId('service-icon')).toBeInTheDocument();
    });

    it('should render all features as pills', () => {
      render(<ServiceCard {...defaultProps} />);
      mockService.features.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });
  });

  describe('interactions', () => {
    it('should call onClick when clicked', () => {
      const onClick = vi.fn();
      render(<ServiceCard {...defaultProps} onClick={onClick} />);

      const card = screen.getByText(mockService.title).closest('.group');
      fireEvent.click(card!);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should have cursor-pointer class', () => {
      render(<ServiceCard {...defaultProps} />);
      const card = screen.getByText(mockService.title).closest('.group');
      expect(card).toHaveClass('cursor-pointer');
    });
  });

  describe('styling', () => {
    it('should have group class for hover effects', () => {
      render(<ServiceCard {...defaultProps} />);
      const card = screen.getByText(mockService.title).closest('.group');
      expect(card).toBeInTheDocument();
    });

    it('should have relative positioning', () => {
      render(<ServiceCard {...defaultProps} />);
      const card = screen.getByText(mockService.title).closest('.group');
      expect(card).toHaveClass('relative');
    });

    it('should render card container with proper styles', () => {
      render(<ServiceCard {...defaultProps} />);
      const container = screen.getByText(mockService.title).closest('.rounded-\\[2rem\\]');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('border');
      expect(container).toHaveClass('backdrop-blur-sm');
    });

    it('should apply service color to icon container', () => {
      render(<ServiceCard {...defaultProps} />);
      const icon = screen.getByTestId('service-icon');
      const iconContainer = icon.parentElement;
      expect(iconContainer).toHaveStyle({
        borderColor: `${mockService.color}30`,
        background: `${mockService.color}10`,
        color: mockService.color,
      });
    });

    it('should apply service color to price badge', () => {
      render(<ServiceCard {...defaultProps} />);
      const priceBadge = screen.getByText(mockService.priceRange);
      expect(priceBadge).toHaveStyle({
        borderColor: `${mockService.color}40`,
        color: mockService.color,
      });
    });
  });

  describe('features', () => {
    it('should render features with pill styling', () => {
      render(<ServiceCard {...defaultProps} />);
      const feature = screen.getByText('React');
      expect(feature).toHaveClass('px-3');
      expect(feature).toHaveClass('py-1.5');
      expect(feature).toHaveClass('rounded-full');
      expect(feature).toHaveClass('uppercase');
      expect(feature).toHaveClass('tracking-wider');
    });

    it('should render all features in a flex container', () => {
      render(<ServiceCard {...defaultProps} />);
      const feature = screen.getByText('React');
      expect(feature.parentElement).toHaveClass('flex');
      expect(feature.parentElement).toHaveClass('flex-wrap');
      expect(feature.parentElement).toHaveClass('gap-2');
    });
  });

  describe('visual elements', () => {
    it('should have icon container with rounded corners', () => {
      render(<ServiceCard {...defaultProps} />);
      const icon = screen.getByTestId('service-icon');
      const iconContainer = icon.parentElement;
      expect(iconContainer).toHaveClass('rounded-2xl');
      expect(iconContainer).toHaveClass('w-14');
      expect(iconContainer).toHaveClass('h-14');
    });

    it('should render title with proper heading level', () => {
      render(<ServiceCard {...defaultProps} />);
      const title = screen.getByText(mockService.title);
      expect(title.tagName).toBe('H3');
    });

    it('should have title with font styles', () => {
      render(<ServiceCard {...defaultProps} />);
      const title = screen.getByText(mockService.title);
      expect(title).toHaveClass('font-display');
      expect(title).toHaveClass('font-bold');
      expect(title).toHaveClass('italic');
    });
  });

  describe('motion effects', () => {
    it('should respond to mouse events', () => {
      render(<ServiceCard {...defaultProps} />);
      const card = screen.getByText(mockService.title).closest('.group');

      // Should not throw when mouse events fire
      expect(() => {
        fireEvent.mouseMove(card!, { clientX: 100, clientY: 100 });
        fireEvent.mouseLeave(card!);
      }).not.toThrow();
    });
  });

  describe('index-based animation', () => {
    it('should render with different indices', () => {
      const { rerender } = render(<ServiceCard {...defaultProps} index={0} />);
      expect(screen.getByText(mockService.title)).toBeInTheDocument();

      rerender(<ServiceCard {...defaultProps} index={3} />);
      expect(screen.getByText(mockService.title)).toBeInTheDocument();
    });
  });
});
