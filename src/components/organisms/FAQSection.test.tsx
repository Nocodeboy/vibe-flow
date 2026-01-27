import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FAQSection from './FAQSection';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('FAQSection', () => {
  describe('rendering', () => {
    it('should render the section', () => {
      renderWithRouter(<FAQSection />);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should render section title', () => {
      renderWithRouter(<FAQSection />);
      expect(screen.getByText(/¿Tienes/i)).toBeInTheDocument();
      expect(screen.getByText(/Preguntas\?/i)).toBeInTheDocument();
    });

    it('should render section subtitle', () => {
      renderWithRouter(<FAQSection />);
      expect(
        screen.getByText(/Tenemos respuestas claras. Si necesitas más ayuda, contáctanos./i)
      ).toBeInTheDocument();
    });

    it('should render section badge', () => {
      renderWithRouter(<FAQSection />);
      expect(screen.getByText('Resolvemos tus dudas')).toBeInTheDocument();
    });
  });

  describe('FAQ items', () => {
    it('should render all FAQ questions', () => {
      renderWithRouter(<FAQSection />);

      expect(screen.getByText('¿Qué es exactamente Vibe Flow?')).toBeInTheDocument();
      expect(
        screen.getByText('¿Esto es para principiantes o necesito experiencia previa?')
      ).toBeInTheDocument();
      expect(screen.getByText('¿Qué incluye la membresía de $24/mes?')).toBeInTheDocument();
      expect(screen.getByText('¿Si me atasco, qué tan rápido me ayudan?')).toBeInTheDocument();
      expect(screen.getByText('¿Y si solo quiero que lo hagan por mí?')).toBeInTheDocument();
    });

    it('should render 5 FAQ items', () => {
      renderWithRouter(<FAQSection />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(5);
    });
  });

  describe('FAQ interaction', () => {
    it('should expand FAQ item when clicked', async () => {
      renderWithRouter(<FAQSection />);

      // Click the button containing the question
      const buttons = screen.getAllByRole('button');
      fireEvent.click(buttons[0]);

      await waitFor(() => {
        expect(screen.getByText(/creadores digitales y automatizadores/i)).toBeInTheDocument();
      });
    });

    it('should show highlighted text in answers', async () => {
      renderWithRouter(<FAQSection />);

      const firstQuestion = screen.getByText('¿Qué es exactamente Vibe Flow?');
      fireEvent.click(firstQuestion);

      await waitFor(() => {
        const highlight = screen.getByText('creadores digitales y automatizadores');
        expect(highlight).toHaveClass('text-primary');
        expect(highlight).toHaveClass('font-bold');
      });
    });

    it('should render link to services in last FAQ', async () => {
      renderWithRouter(<FAQSection />);

      const lastQuestion = screen.getByText('¿Y si solo quiero que lo hagan por mí?');
      fireEvent.click(lastQuestion);

      await waitFor(() => {
        const servicesLink = screen.getByRole('link', { name: 'Servicios' });
        expect(servicesLink).toBeInTheDocument();
        expect(servicesLink).toHaveAttribute('href', '/servicios');
      });
    });

    it('should collapse FAQ item when clicked twice', async () => {
      renderWithRouter(<FAQSection />);

      const buttons = screen.getAllByRole('button');
      const firstButton = buttons[0];

      // Open
      fireEvent.click(firstButton);
      await waitFor(() => {
        expect(screen.getByText(/creadores digitales y automatizadores/i)).toBeInTheDocument();
      });

      // Close - check aria-expanded attribute instead of waiting for animation exit
      fireEvent.click(firstButton);
      expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('styling', () => {
    it('should have section id for navigation', () => {
      const { container } = renderWithRouter(<FAQSection />);
      const section = container.querySelector('#faq');
      expect(section).toBeInTheDocument();
    });

    it('should have max-width container', () => {
      const { container } = renderWithRouter(<FAQSection />);
      const maxWidthContainer = container.querySelector('.max-w-4xl');
      expect(maxWidthContainer).toBeInTheDocument();
    });

    it('should have centered header', () => {
      const { container } = renderWithRouter(<FAQSection />);
      const centeredDiv = container.querySelector('.text-center');
      expect(centeredDiv).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderWithRouter(<FAQSection />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should have buttons for FAQ items', () => {
      renderWithRouter(<FAQSection />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-expanded');
      });
    });
  });
});
