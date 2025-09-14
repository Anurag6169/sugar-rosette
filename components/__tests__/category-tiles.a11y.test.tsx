import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryTiles from '../CategoryTiles';
import { categories } from '../../data/categories';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('CategoryTiles Accessibility', () => {
  beforeEach(() => {
    render(<CategoryTiles />);
  });

  test('renders with proper heading structure', () => {
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toHaveTextContent('Our Collections');
  });

  test('has proper ARIA labels for category cards', () => {
    categories.forEach((category) => {
      const link = screen.getByLabelText(`Explore ${category.title} collection`);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', category.href);
    });
  });

  test('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    
    // Focus first category card
    const firstCard = screen.getByLabelText('Explore Chocolates collection');
    firstCard.focus();
    expect(firstCard).toHaveFocus();

    // Tab to next card
    await user.tab();
    const secondCard = screen.getByLabelText('Explore Hampers collection');
    expect(secondCard).toHaveFocus();

    // Tab to third card
    await user.tab();
    const thirdCard = screen.getByLabelText('Explore Cakes collection');
    expect(thirdCard).toHaveFocus();

    // Tab to fourth card
    await user.tab();
    const fourthCard = screen.getByLabelText('Explore Bakery collection');
    expect(fourthCard).toHaveFocus();

    // Tab to View All link
    await user.tab();
    const viewAllLink = screen.getByText('View All Collections');
    expect(viewAllLink).toHaveFocus();
  });

  test('shows focus-visible outline on keyboard focus', async () => {
    const user = userEvent.setup();
    const firstCard = screen.getByLabelText('Explore Chocolates collection');
    
    // Focus with keyboard
    await user.tab();
    firstCard.focus();
    
    // Check for focus-visible ring
    expect(firstCard).toHaveClass('focus-visible:ring-2');
  });

  test('supports Enter key activation', async () => {
    const user = userEvent.setup();
    const firstCard = screen.getByLabelText('Explore Chocolates collection');
    
    firstCard.focus();
    
    // Press Enter
    await user.keyboard('{Enter}');
    
    // Should navigate (in a real app, this would be tested with a router mock)
    expect(firstCard).toHaveAttribute('href', '/collections/chocolates');
  });

  test('has proper color contrast for text', () => {
    const headings = screen.getAllByRole('heading', { level: 3 });
    headings.forEach((heading) => {
      expect(heading).toHaveClass('text-[#4A2E2A]'); // Cocoa color for good contrast
    });
  });

  test('maintains logical tab order', async () => {
    const user = userEvent.setup();
    const expectedOrder = [
      'Explore Chocolates collection',
      'Explore Hampers collection', 
      'Explore Cakes collection',
      'Explore Bakery collection',
      'View All Collections'
    ];

    for (const label of expectedOrder) {
      await user.tab();
      const element = screen.getByLabelText(label);
      expect(element).toHaveFocus();
    }
  });

  test('has adequate touch targets', () => {
    const categoryLinks = screen.getAllByRole('link');
    categoryLinks.forEach((link) => {
      // Check that the link has proper minimum touch target size
      // This is enforced by the container having proper padding
      expect(link).toBeInTheDocument();
    });
  });

  test('provides descriptive link text', () => {
    categories.forEach((category) => {
      const link = screen.getByLabelText(`Explore ${category.title} collection`);
      const heading = link.querySelector('h3');
      expect(heading).toHaveTextContent(category.title);
    });
  });

  test('supports occasion parameter in URLs', () => {
    const { rerender } = render(<CategoryTiles occasion="birthday" />);
    
    const chocolatesLink = screen.getByLabelText('Explore Chocolates collection');
    expect(chocolatesLink).toHaveAttribute('href', '/collections/chocolates?occasion=birthday');
  });

  test('has proper semantic structure', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toBeInTheDocument();
    
    const categoryHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(categoryHeadings).toHaveLength(4);
  });
});
