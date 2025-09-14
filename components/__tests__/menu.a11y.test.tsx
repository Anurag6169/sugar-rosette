import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Menu from '../../pages/menu';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
    pathname: '/menu',
  }),
}));

// Mock components that might have complex dependencies
jest.mock('../../components/layout/Navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navbar</nav>;
  };
});

jest.mock('../../components/layout/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

describe('Menu Accessibility Tests', () => {
  beforeEach(() => {
    // Mock scroll methods
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true
    });
    
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true
    });
    
    Object.defineProperty(document, 'getElementById', {
      value: jest.fn(() => ({
        offsetTop: 100,
        offsetHeight: 500,
        focus: jest.fn()
      })),
      writable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<Menu />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper semantic landmarks', () => {
    render(<Menu />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should have proper heading hierarchy', () => {
    render(<Menu />);
    
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Menu');
    
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s).toHaveLength(4); // Chocolates, Hampers, Cakes, Bakery
    
    expect(h2s[0]).toHaveTextContent('Chocolates');
    expect(h2s[1]).toHaveTextContent('Hampers');
    expect(h2s[2]).toHaveTextContent('Cakes');
    expect(h2s[3]).toHaveTextContent('Bakery');
  });

  it('should have proper section IDs for anchor navigation', () => {
    render(<Menu />);
    
    expect(document.getElementById('chocolates')).toBeInTheDocument();
    expect(document.getElementById('hampers')).toBeInTheDocument();
    expect(document.getElementById('cakes')).toBeInTheDocument();
    expect(document.getElementById('bakery')).toBeInTheDocument();
  });

  it('should have proper ARIA labels for navigation buttons', () => {
    render(<Menu />);
    
    const navButtons = screen.getAllByLabelText(/Jump to .* section/);
    expect(navButtons).toHaveLength(4);
    
    expect(screen.getByLabelText('Jump to Chocolates section')).toBeInTheDocument();
    expect(screen.getByLabelText('Jump to Hampers section')).toBeInTheDocument();
    expect(screen.getByLabelText('Jump to Cakes section')).toBeInTheDocument();
    expect(screen.getByLabelText('Jump to Bakery section')).toBeInTheDocument();
  });

  it('should support keyboard navigation for section buttons', async () => {
    render(<Menu />);
    
    const chocolatesButton = screen.getByLabelText('Jump to Chocolates section');
    
    // Focus the button
    chocolatesButton.focus();
    expect(chocolatesButton).toHaveFocus();
    
    // Test Enter key activation
    fireEvent.keyDown(chocolatesButton, { key: 'Enter', code: 'Enter' });
    
    // Test Space key activation
    fireEvent.keyDown(chocolatesButton, { key: ' ', code: 'Space' });
    
    // Both should trigger scroll (mocked)
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('should have proper focus management after section navigation', async () => {
    render(<Menu />);
    
    const chocolatesButton = screen.getByLabelText('Jump to Chocolates section');
    fireEvent.click(chocolatesButton);
    
    // Should call focus on the target heading after scroll
    await waitFor(() => {
      expect(document.getElementById).toHaveBeenCalledWith('chocolates-heading');
    });
  });

  it('should have proper ARIA current attributes for active sections', () => {
    render(<Menu />);
    
    const navButtons = screen.getAllByRole('button');
    const sectionButtons = navButtons.filter(button => 
      button.getAttribute('aria-label')?.includes('Jump to')
    );
    
    // At least one should be marked as current
    const currentButton = sectionButtons.find(button => 
      button.getAttribute('aria-current') === 'true'
    );
    
    expect(currentButton).toBeInTheDocument();
  });

  it('should have accessible back to top button', () => {
    render(<Menu />);
    
    // Initially hidden
    expect(screen.queryByLabelText('Back to top')).not.toBeInTheDocument();
    
    // Simulate scroll to show button
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
    
    // Re-render to trigger state change
    const { rerender } = render(<Menu />);
    rerender(<Menu />);
    
    const backToTopButton = screen.getByLabelText('Back to top');
    expect(backToTopButton).toBeInTheDocument();
    expect(backToTopButton).toHaveAttribute('aria-label', 'Back to top');
  });

  it('should have proper tab order for interactive elements', () => {
    render(<Menu />);
    
    const interactiveElements = screen.getAllByRole('button');
    
    // All buttons should be focusable
    interactiveElements.forEach(element => {
      expect(element).not.toHaveAttribute('tabindex', '-1');
    });
  });

  it('should have proper focus visible states', () => {
    render(<Menu />);
    
    const navButtons = screen.getAllByLabelText(/Jump to .* section/);
    const firstButton = navButtons[0];
    
    // Focus the button
    firstButton.focus();
    
    // Should have focus styles (tested via CSS classes)
    expect(firstButton).toHaveClass('focus:ring-2', 'focus:ring-[#C9A14A]');
  });

  it('should respect reduced motion preferences', () => {
    // Mock prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
      writable: true
    });

    render(<Menu />);
    
    // Should still render without errors
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should have proper section descriptions for screen readers', () => {
    render(<Menu />);
    
    const sections = screen.getAllByRole('region');
    
    sections.forEach(section => {
      const heading = section.querySelector('h2');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAttribute('id');
    });
  });

  it('should have accessible filter buttons', () => {
    render(<Menu />);
    
    const filterButtons = screen.getAllByRole('button');
    const disabledButtons = filterButtons.filter(button => 
      button.hasAttribute('disabled')
    );
    
    // Filter buttons should be disabled (non-functional as specified)
    expect(disabledButtons.length).toBeGreaterThan(0);
    
    // Should still have proper labels
    disabledButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });
});
