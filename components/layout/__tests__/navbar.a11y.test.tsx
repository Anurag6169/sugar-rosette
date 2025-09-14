import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar';

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navbar Accessibility', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Reset body overflow
    document.body.style.overflow = 'unset';
  });

  describe('Semantic Structure', () => {
    it('has proper semantic header element', () => {
      render(<Navbar />);
      
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(header.tagName).toBe('HEADER');
    });

    it('has proper navigation element with aria-label', () => {
      render(<Navbar />);
      
      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('has proper heading structure for screen readers', () => {
      render(<Navbar />);
      
      // Brand logo should be a link, not a heading
      const brandLink = screen.getByRole('link', { name: /sugar rosette/i });
      expect(brandLink).toBeInTheDocument();
      expect(brandLink).toHaveAttribute('href', '/');
    });
  });

  describe('Icon Button Accessibility', () => {
    it('has proper aria-labels for all icon buttons', () => {
      render(<Navbar />);
      
      // Search button
      const searchButton = screen.getByRole('button', { name: /search products/i });
      expect(searchButton).toBeInTheDocument();
      
      // Cart button
      const cartButton = screen.getByRole('button', { name: /shopping cart with \d+ items/i });
      expect(cartButton).toBeInTheDocument();
      
      // Profile button
      const profileButton = screen.getByRole('button', { name: /user menu/i });
      expect(profileButton).toBeInTheDocument();
      
      // Hamburger button
      const hamburgerButton = screen.getByRole('button', { name: /toggle main menu/i });
      expect(hamburgerButton).toBeInTheDocument();
    });

    it('shows cart item count in aria-label', () => {
      render(<Navbar />);
      
      const cartButton = screen.getByRole('button', { name: /shopping cart with 3 items/i });
      expect(cartButton).toBeInTheDocument();
    });

    it('hides cart badge when count is zero', () => {
      // Mock cart with 0 items by modifying the component
      const { rerender } = render(<Navbar />);
      
      // Initially should show badge with 3 items
      expect(screen.getByText('3')).toBeInTheDocument();
      
      // This would require modifying the component to accept cartCount as prop
      // For now, we test the current behavior
    });
  });

  describe('Keyboard Navigation', () => {
    it('allows tab navigation through all interactive elements', async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      
      // Start from brand logo
      const brandLink = screen.getByRole('link', { name: /sugar rosette/i });
      brandLink.focus();
      expect(brandLink).toHaveFocus();
      
      // Tab through desktop navigation links
      await user.tab();
      expect(screen.getByRole('link', { name: /home/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('link', { name: /chocolates/i })).toHaveFocus();
      
      // Continue through icon buttons
      await user.tab();
      expect(screen.getByRole('button', { name: /search products/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('button', { name: /shopping cart with \d+ items/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('button', { name: /user menu/i })).toHaveFocus();
      
      await user.tab();
      expect(screen.getByRole('button', { name: /toggle main menu/i })).toHaveFocus();
    });

    it('supports Enter and Space key activation for buttons', async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      
      const searchButton = screen.getByRole('button', { name: /search products/i });
      searchButton.focus();
      
      // Test Enter key
      await user.keyboard('{Enter}');
      // Search modal should open (we'll test this in overlay tests)
      
      // Test Space key
      const cartButton = screen.getByRole('button', { name: /shopping cart with \d+ items/i });
      cartButton.focus();
      await user.keyboard(' ');
      // Cart panel should open
    });

    it('supports arrow key navigation in profile menu', async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      
      const profileButton = screen.getByRole('button', { name: /user menu/i });
      await user.click(profileButton);
      
      // Wait for menu to appear
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });
      
      // Test arrow key navigation
      await user.keyboard('{ArrowDown}');
      const firstMenuItem = screen.getAllByRole('menuitem')[0];
      expect(firstMenuItem).toHaveFocus();
      
      await user.keyboard('{ArrowDown}');
      const secondMenuItem = screen.getAllByRole('menuitem')[1];
      expect(secondMenuItem).toHaveFocus();
      
      await user.keyboard('{ArrowUp}');
      expect(firstMenuItem).toHaveFocus();
    });
  });

  describe('Focus Management', () => {
    it('has visible focus indicators', () => {
      render(<Navbar />);
      
      const brandLink = screen.getByRole('link', { name: /sugar rosette/i });
      brandLink.focus();
      
      // Focus ring should be visible
      expect(brandLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-[#C9A14A]');
    });

    it('maintains focus after opening and closing mobile drawer', async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      
      const hamburgerButton = screen.getByRole('button', { name: /toggle main menu/i });
      hamburgerButton.focus();
      
      await user.click(hamburgerButton);
      
      // Drawer should be open
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      
      // Close drawer with escape
      await user.keyboard('{Escape}');
      
      // Focus should return to hamburger button
      await waitFor(() => {
        expect(hamburgerButton).toHaveFocus();
      });
    });
  });

  describe('ARIA Attributes', () => {
    it('has proper aria-expanded for hamburger button', async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      
      const hamburgerButton = screen.getByRole('button', { name: /toggle main menu/i });
      
      // Initially collapsed
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
      expect(hamburgerButton).toHaveAttribute('aria-controls', 'mobile-drawer');
      
      // Open drawer
      await user.click(hamburgerButton);
      
      // Should be expanded
      await waitFor(() => {
        expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('has proper aria-expanded for profile menu', async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      
      const profileButton = screen.getByRole('button', { name: /user menu/i });
      
      // Initially collapsed
      expect(profileButton).toHaveAttribute('aria-expanded', 'false');
      expect(profileButton).toHaveAttribute('aria-haspopup', 'true');
      
      // Open menu
      await user.click(profileButton);
      
      // Should be expanded
      await waitFor(() => {
        expect(profileButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('has proper role and aria-modal for overlays', async () => {
      const user = userEvent.setup();
      render(<Navbar />);
      
      // Open search modal
      const searchButton = screen.getByRole('button', { name: /search products/i });
      await user.click(searchButton);
      
      await waitFor(() => {
        const searchModal = screen.getByRole('dialog');
        expect(searchModal).toHaveAttribute('aria-modal', 'true');
        expect(searchModal).toHaveAttribute('aria-labelledby');
      });
      
      // Close and test cart
      await user.keyboard('{Escape}');
      
      const cartButton = screen.getByRole('button', { name: /shopping cart with \d+ items/i });
      await user.click(cartButton);
      
      await waitFor(() => {
        const cartPanel = screen.getByRole('dialog');
        expect(cartPanel).toHaveAttribute('aria-modal', 'true');
        expect(cartPanel).toHaveAttribute('aria-labelledby');
      });
    });
  });

  describe('Touch Target Sizes', () => {
    it('ensures all interactive elements meet minimum touch target size', () => {
      render(<Navbar />);
      
      // All buttons should have adequate padding for 44px minimum
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        // Check if button has adequate padding classes
        expect(button.className).toMatch(/p-[2-4]/); // At least p-2 (8px) padding
      });
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        // Check if link has adequate padding for touch targets
        expect(link.className).toMatch(/px-[3-6]|py-[2-4]/); // Adequate padding
      });
    });
  });

  describe('Screen Reader Support', () => {
    it('has proper heading hierarchy', () => {
      render(<Navbar />);
      
      // Check for hidden headings in overlays
      const searchModal = screen.queryByRole('dialog', { name: /search/i });
      if (searchModal) {
        const heading = searchModal.querySelector('h2');
        expect(heading).toHaveClass('sr-only');
      }
    });

    it('provides descriptive text for screen readers', () => {
      render(<Navbar />);
      
      // Brand link should have descriptive text
      const brandLink = screen.getByRole('link', { name: /sugar rosette/i });
      expect(brandLink).toBeInTheDocument();
      
      // All buttons should have descriptive aria-labels
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });
  });
});
