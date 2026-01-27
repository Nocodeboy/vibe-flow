import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skeleton, { PageSkeleton, PostSkeleton } from './Skeleton';

describe('Skeleton', () => {
  describe('rendering', () => {
    it('should render skeleton element', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<Skeleton className="w-full h-10" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('w-full');
      expect(skeleton).toHaveClass('h-10');
    });

    it('should have base styles', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('bg-white/5');
      expect(skeleton).toHaveClass('overflow-hidden');
      expect(skeleton).toHaveClass('relative');
    });
  });

  describe('rounded prop', () => {
    it('should apply rounded-lg by default', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('rounded-lg');
    });

    it('should apply rounded-sm', () => {
      const { container } = render(<Skeleton rounded="sm" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('rounded-sm');
    });

    it('should apply rounded-md', () => {
      const { container } = render(<Skeleton rounded="md" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('rounded-md');
    });

    it('should apply rounded-full', () => {
      const { container } = render(<Skeleton rounded="full" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('rounded-full');
    });

    it('should apply rounded-2xl', () => {
      const { container } = render(<Skeleton rounded="2xl" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('rounded-2xl');
    });

    it('should apply rounded-3xl', () => {
      const { container } = render(<Skeleton rounded="3xl" />);
      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass('rounded-3xl');
    });
  });

  describe('shimmer effect', () => {
    it('should have shimmer gradient element', () => {
      const { container } = render(<Skeleton />);
      const shimmer = container.querySelector('.bg-gradient-to-r');
      expect(shimmer).toBeInTheDocument();
    });

    it('should have absolute positioned shimmer', () => {
      const { container } = render(<Skeleton />);
      const shimmer = container.querySelector('.absolute.inset-0');
      expect(shimmer).toBeInTheDocument();
    });
  });
});

describe('PageSkeleton', () => {
  it('should render page skeleton layout', () => {
    const { container } = render(<PageSkeleton />);
    const minHeightElement = container.querySelector('.min-h-screen');
    expect(minHeightElement).toBeInTheDocument();
  });

  it('should have hero skeleton section', () => {
    const { container } = render(<PageSkeleton />);
    // Hero has text-center class
    const heroSection = container.querySelector('.text-center');
    expect(heroSection).toBeInTheDocument();
  });

  it('should render grid of card skeletons', () => {
    const { container } = render(<PageSkeleton />);
    // Should have 3 card skeletons in a grid
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('md:grid-cols-3');
  });

  it('should contain multiple skeleton elements', () => {
    const { container } = render(<PageSkeleton />);
    // Multiple skeleton elements with bg-white/5
    const skeletons = container.querySelectorAll('.bg-white\\/5');
    expect(skeletons.length).toBeGreaterThan(5);
  });
});

describe('PostSkeleton', () => {
  it('should render post skeleton layout', () => {
    const { container } = render(<PostSkeleton />);
    const minHeightElement = container.querySelector('.min-h-screen');
    expect(minHeightElement).toBeInTheDocument();
  });

  it('should have max-w-4xl container', () => {
    const { container } = render(<PostSkeleton />);
    const maxWidthContainer = container.querySelector('.max-w-4xl');
    expect(maxWidthContainer).toBeInTheDocument();
  });

  it('should have author section with avatar skeleton', () => {
    const { container } = render(<PostSkeleton />);
    // Avatar skeleton with w-10 h-10 and rounded-full
    const avatarSkeleton = container.querySelector('.w-10.h-10');
    expect(avatarSkeleton).toBeInTheDocument();
  });

  it('should have content skeleton sections', () => {
    const { container } = render(<PostSkeleton />);
    // Content sections (5 paragraph skeletons)
    const contentSection = container.querySelector('.space-y-6');
    expect(contentSection).toBeInTheDocument();
    const contentSkeletons = contentSection?.querySelectorAll('.bg-white\\/5');
    expect(contentSkeletons?.length).toBe(5);
  });

  it('should have featured image skeleton', () => {
    const { container } = render(<PostSkeleton />);
    // Featured image with aspect-[16/9]
    const imageSkeleton = container.querySelector('.aspect-\\[16\\/9\\]');
    expect(imageSkeleton).toBeInTheDocument();
  });
});
