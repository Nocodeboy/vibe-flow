import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

// Mock useIsMobile hook
vi.mock('../../hooks/useIsMobile', () => ({
  useIsMobile: () => false,
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Footer', () => {
  describe('rendering', () => {
    it('should render the footer component', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText('VIBE FLOW')).toBeInTheDocument();
    });

    it('should render the call to action section', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText('¿Tienes una idea?')).toBeInTheDocument();
      expect(screen.getByText('Hagámosla realidad.')).toBeInTheDocument();
    });

    it('should render the contact button', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByRole('link', { name: /hablemos ahora/i })).toBeInTheDocument();
    });

    it('should have mailto link', () => {
      renderWithRouter(<Footer />);
      const contactLink = screen.getByRole('link', { name: /hablemos ahora/i });
      expect(contactLink).toHaveAttribute('href', 'mailto:contact@vibeflow.es');
    });
  });

  describe('navigation links', () => {
    it('should render sitemap section', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText('Sitemap')).toBeInTheDocument();
    });

    it('should render all sitemap links', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Servicios')).toBeInTheDocument();
      expect(screen.getByText('Comunidad')).toBeInTheDocument();
      expect(screen.getByText('Nosotros')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
    });

    it('should have correct hrefs for sitemap links', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '/');
      expect(screen.getByText('Servicios').closest('a')).toHaveAttribute('href', '/servicios');
    });
  });

  describe('social links', () => {
    it('should render social section', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText('Social')).toBeInTheDocument();
    });

    it('should render all social links', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('Instagram')).toBeInTheDocument();
      expect(screen.getByText('X')).toBeInTheDocument();
      expect(screen.getByText('YouTube')).toBeInTheDocument();
      expect(screen.getByText('TikTok')).toBeInTheDocument();
      expect(screen.getByText('Skool')).toBeInTheDocument();
    });

    it('should have external link attributes', () => {
      renderWithRouter(<Footer />);
      const linkedinLink = screen.getByText('LinkedIn').closest('a');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should have correct social hrefs', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText('LinkedIn').closest('a')).toHaveAttribute(
        'href',
        expect.stringContaining('linkedin.com')
      );
      expect(screen.getByText('Instagram').closest('a')).toHaveAttribute(
        'href',
        expect.stringContaining('instagram.com')
      );
    });
  });

  describe('legal section', () => {
    it('should render copyright', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText('© 2026 Vibe Flow')).toBeInTheDocument();
    });

    it('should render legal link', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByRole('link', { name: 'Legal' })).toBeInTheDocument();
    });

    it('should render privacy link', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByRole('link', { name: 'Privacidad' })).toBeInTheDocument();
    });

    it('should have correct legal hrefs', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByRole('link', { name: 'Legal' })).toHaveAttribute('href', '/aviso-legal');
      expect(screen.getByRole('link', { name: 'Privacidad' })).toHaveAttribute(
        'href',
        '/politica-privacidad'
      );
    });
  });

  describe('branding', () => {
    it('should render giant VIBE FLOW text', () => {
      renderWithRouter(<Footer />);
      const brandText = screen.getByText('VIBE FLOW');
      expect(brandText).toBeInTheDocument();
      expect(brandText).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have decorative styling on brand text', () => {
      renderWithRouter(<Footer />);
      const brandText = screen.getByText('VIBE FLOW');
      expect(brandText).toHaveClass('font-display');
      expect(brandText).toHaveClass('italic');
      expect(brandText).toHaveClass('font-bold');
      expect(brandText).toHaveClass('select-none');
    });
  });

  describe('accessibility', () => {
    it('should have proper link roles', () => {
      renderWithRouter(<Footer />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(5);
    });

    it('should have hover transition classes on links', () => {
      renderWithRouter(<Footer />);
      const inicio = screen.getByText('Inicio');
      expect(inicio).toHaveClass('hover:text-white');
      expect(inicio).toHaveClass('transition-colors');
    });
  });
});

describe('Footer mobile', () => {
  beforeEach(() => {
    vi.doMock('../../hooks/useIsMobile', () => ({
      useIsMobile: () => true,
    }));
  });

  it('should render on mobile', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('VIBE FLOW')).toBeInTheDocument();
  });
});
