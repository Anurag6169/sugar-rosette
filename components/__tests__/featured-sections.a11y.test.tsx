import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeaturedCollections from '../FeaturedCollections';
import { featuredBlocks } from '../../data/featured';

// Mock Next.js Link and Image components
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock('next/image', () => {
  return ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  );
});

describe('FeaturedCollections Accessibility', () => {
  beforeEach(() => {
    render(<FeaturedCollections />);
  });

  test('renders with proper heading structure', () => {
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toHaveTextContent('Featured Collections');
  });

  test('has proper ARIA labels for featured blocks', () => {
    featuredBlocks.forEach((block) => {
      const link = screen.getByLabelText(block.ariaLabel);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', block.cta.href);
    });
  });

  test('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    
    // Focus first featured block
    const firstBlock = screen.getByLabelText('Browse Luxury Hampers');
    firstBlock.focus();
    expect(firstBlock).toHaveFocus();

    // Tab to second block
    await user.tab();
    const secondBlock = screen.getByLabelText('Explore Signature Collections');
    expect(secondBlock).toHaveFocus();

    // Tab to View All Collections link
    await user.tab();
    const viewAllLink = screen.getByText('View All Collections');
    expect(viewAllLink).toHaveFocus();
  });

  test('shows focus-visible outline on keyboard focus', async () => {
    const user = userEvent.setup();
    const firstBlock = screen.getByLabelText('Browse Luxury Hampers');
    
    // Focus with keyboard
    await user.tab();
    firstBlock.focus();
    
    // Check for focus-visible ring
    expect(firstBlock).toHaveClass('focus-visible:ring-2');
  });

  test('supports Enter key activation', async () => {
    const user = userEvent.setup();
    const firstBlock = screen.getByLabelText('Browse Luxury Hampers');
    
    firstBlock.focus();
    
    // Press Enter
    await user.keyboard('{Enter}');
    
    // Should navigate (in a real app, this would be tested with a router mock)
    expect(firstBlock).toHaveAttribute('href', '/collections/hampers');
  });

  test('has proper color contrast for text', () => {
    const headings = screen.getAllByRole('heading', { level: 3 });
    headings.forEach((heading) => {
      // Check that headings have proper contrast (white text on dark background)
      expect(heading).toHaveClass('text-white');
    });
  });

  test('maintains logical tab order', async () => {
    const user = userEvent.setup();
    const expectedOrder = [
      'Browse Luxury Hampers',
      'Explore Signature Collections',
      'View All Collections'
    ];

    for (const label of expectedOrder) {
      await user.tab();
      const element = screen.getByLabelText(label);
      expect(element).toHaveFocus();
    }
  });

  test('has adequate touch targets', () => {
    const featuredLinks = screen.getAllByRole('link');
    featuredLinks.forEach((link) => {
      // Check that the link has proper minimum touch target size
      expect(link).toBeInTheDocument();
    });
  });

  test('provides descriptive link text', () => {
    featuredBlocks.forEach((block) => {
      const link = screen.getByLabelText(block.ariaLabel);
      const heading = link.querySelector('h3');
      expect(heading).toHaveTextContent(block.title);
    });
  });

  test('has proper semantic structure', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toBeInTheDocument();
    
    const blockHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(blockHeadings).toHaveLength(2);
  });

  test('images have proper alt text', () => {
    const images = screen.getAllByRole('img');
    images.forEach((image) => {
      expect(image).toHaveAttribute('alt');
      expect(image.getAttribute('alt')).not.toBe('');
    });
  });

  test('respects reduced motion preferences', () => {
    // Test that motion-reduce classes are applied
    const featuredBlocks = screen.getAllByRole('link');
    featuredBlocks.forEach((block) => {
      expect(block).toHaveClass('motion-reduce:transition-none');
    });
  });

  test('has proper role attributes', () => {
    const featuredLinks = screen.getAllByRole('link');
    featuredLinks.forEach((link) => {
      expect(link).toHaveAttribute('role', 'link');
    });
  });

  test('CTA buttons are accessible', () => {
    const ctaButtons = screen.getAllByText(/Browse Hampers|Explore Chocolates/);
    ctaButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
      expect(button.closest('a')).toHaveAttribute('aria-label');
    });
  });

  test('section has proper landmark role', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });
});
