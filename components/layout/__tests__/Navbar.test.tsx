import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar';
import { navigationConfig } from '../navigation-config';

// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Navbar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Reset body overflow
    document.body.style.overflow = 'unset';
  });

  it('renders the brand logo', () => {
    render(<Navbar />);
    
    const brandLink = screen.getByRole('link', { name: /sugar rosette/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('renders all navigation items on desktop', () => {
    render(<Navbar />);
    
    // Check that all navigation items are present (they appear in both desktop and mobile)
    navigationConfig.mainLinks.forEach(item => {
      const elements = screen.getAllByText(item.name);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('renders the Enquire button', () => {
    render(<Navbar />);
    
    const enquireButton = screen.getAllByText(navigationConfig.ctaButton.name);
    expect(enquireButton.length).toBeGreaterThan(0);
    
    // Check desktop version
    const desktopEnquireButton = enquireButton.find(button => 
      button.closest('a')?.className.includes('px-6 py-2.5')
    );
    expect(desktopEnquireButton).toBeTruthy();
    expect(desktopEnquireButton?.closest('a')).toHaveAttribute('href', navigationConfig.ctaButton.href);
  });

  it('shows hamburger menu button on mobile', () => {
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button', { name: /toggle main menu/i });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button', { name: /toggle main menu/i });
    
    await user.click(menuButton);
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    // Check that mobile menu is visible
    const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
    expect(mobileMenu).toHaveClass('max-h-screen', 'opacity-100');
  });

  it('closes mobile menu when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button', { name: /toggle main menu/i });
    
    // Open menu
    await user.click(menuButton);
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    // Close menu
    await user.click(menuButton);
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button', { name: /toggle main menu/i });
    
    // Open menu
    await user.click(menuButton);
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    // Click on a navigation link (mobile version)
    const chocolatesLinks = screen.getAllByRole('link', { name: /chocolates/i });
    const mobileChocolatesLink = chocolatesLinks.find(link => 
      link.className.includes('block px-4 py-3 rounded-2xl')
    );
    expect(mobileChocolatesLink).toBeTruthy();
    await user.click(mobileChocolatesLink!);
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('closes mobile menu when escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button', { name: /toggle main menu/i });
    
    // Open menu
    await user.click(menuButton);
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    // Press escape key
    await user.keyboard('{Escape}');
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('shows active link styling when on current page', () => {
    mockUsePathname.mockReturnValue('/chocolates');
    render(<Navbar />);
    
    const chocolatesLinks = screen.getAllByRole('link', { name: /chocolates/i });
    
    // Check desktop version has active styling
    const desktopLink = chocolatesLinks.find(link => 
      link.className.includes('relative px-4 py-2.5 text-sm font-medium')
    );
    expect(desktopLink).toBeTruthy();
    expect(desktopLink).toHaveClass('text-[#4A2E2A]');
    
    // Check mobile version has active styling
    const mobileLink = chocolatesLinks.find(link => 
      link.className.includes('block px-4 py-3 rounded-2xl')
    );
    expect(mobileLink).toBeTruthy();
    expect(mobileLink).toHaveClass('text-[#4A2E2A]', 'bg-gradient-to-r', 'from-[#F7F3EE]', 'to-[#E8DFD6]', 'border-l-4', 'border-[#C9A14A]');
  });

  it('applies correct styling for non-active links', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Navbar />);
    
    const chocolatesLinks = screen.getAllByRole('link', { name: /chocolates/i });
    
    // Check desktop version
    const desktopLink = chocolatesLinks.find(link => 
      link.className.includes('relative px-4 py-2.5 text-sm font-medium')
    );
    expect(desktopLink).toBeTruthy();
    expect(desktopLink).toHaveClass('text-gray-700', 'hover:text-[#4A2E2A]');
    expect(desktopLink).not.toHaveClass('text-[#4A2E2A]');
    
    // Check mobile version
    const mobileLink = chocolatesLinks.find(link => 
      link.className.includes('block px-4 py-3 rounded-2xl')
    );
    expect(mobileLink).toBeTruthy();
    expect(mobileLink).toHaveClass('text-gray-700', 'hover:text-[#4A2E2A]');
    expect(mobileLink).not.toHaveClass('text-[#4A2E2A]', 'bg-gradient-to-r');
  });

  it('handles keyboard navigation correctly', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button', { name: /toggle main menu/i });
    
    // Focus and activate with Enter key
    menuButton.focus();
    await user.keyboard('{Enter}');
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });
    
    // Close with Space key
    await user.keyboard(' ');
    
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('prevents body scroll when mobile menu is open', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const menuButton = screen.getByRole('button', { name: /toggle main menu/i });
    
    await user.click(menuButton);
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });
    
    // Close menu
    await user.click(menuButton);
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  it('applies scroll effect styling when scrolled', async () => {
    render(<Navbar />);
    
    const nav = screen.getByRole('navigation');
    
    // Initially should have subtle shadow
    expect(nav).toHaveClass('bg-gradient-to-r', 'from-white/95', 'via-white/90', 'to-white/95', 'shadow-sm');
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100
    });
    
    fireEvent.scroll(window);
    
    await waitFor(() => {
      expect(nav).toHaveClass('bg-white/90', 'backdrop-blur-xl', 'shadow-lg');
    });
  });

  it('has proper accessibility attributes', () => {
    render(<Navbar />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    
    const menuButton = screen.getByRole('button', { name: /toggle main menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    
    const mobileMenu = screen.getByRole('navigation').querySelector('#mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const customClass = 'custom-navbar-class';
    render(<Navbar className={customClass} />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass(customClass);
  });
});
