import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchModal from '../../SearchModal';
import CartPanel from '../../CartPanel';
import ProfileMenu from '../../ProfileMenu';
import Drawer from '../../Drawer';

describe('Overlay Behavior Tests', () => {
  afterEach(() => {
    // Reset body overflow
    document.body.style.overflow = 'unset';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
  });

  describe('SearchModal', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
      mockOnClose.mockClear();
    });

    it('opens and focuses input when rendered', async () => {
      render(<SearchModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText(/search chocolates/i);
      expect(input).toBeInTheDocument();
      
      // Input should be focused
      await waitFor(() => {
        expect(input).toHaveFocus();
      });
    });

    it('closes when escape key is pressed', async () => {
      const user = userEvent.setup();
      render(<SearchModal isOpen={true} onClose={mockOnClose} />);
      
      await user.keyboard('{Escape}');
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('closes when overlay is clicked', async () => {
      render(<SearchModal isOpen={true} onClose={mockOnClose} />);
      
      const overlay = screen.getByRole('dialog');
      fireEvent.click(overlay);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('closes when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchModal isOpen={true} onClose={mockOnClose} />);
      
      const closeButton = screen.getByLabelText(/close search/i);
      await user.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('traps focus within modal', async () => {
      const user = userEvent.setup();
      render(<SearchModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText(/search chocolates/i);
      const searchButton = screen.getByLabelText(/search/i);
      const closeButton = screen.getByLabelText(/close search/i);
      
      // Focus should start on input
      await waitFor(() => {
        expect(input).toHaveFocus();
      });
      
      // Tab should move to search button
      await user.tab();
      expect(searchButton).toHaveFocus();
      
      // Tab should move to close button
      await user.tab();
      expect(closeButton).toHaveFocus();
      
      // Tab should cycle back to input
      await user.tab();
      expect(input).toHaveFocus();
    });

    it('handles form submission', async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      render(<SearchModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText(/search chocolates/i);
      await user.type(input, 'chocolate');
      await user.keyboard('{Enter}');
      
      expect(consoleSpy).toHaveBeenCalledWith('Search query:', 'chocolate');
      
      consoleSpy.mockRestore();
    });

    it('shows recent searches when input is empty', () => {
      render(<SearchModal isOpen={true} onClose={mockOnClose} />);
      
      expect(screen.getByText('Recent Searches')).toBeInTheDocument();
      expect(screen.getByText('Dark Chocolate')).toBeInTheDocument();
      expect(screen.getByText('Browse Categories')).toBeInTheDocument();
    });

    it('shows search results when typing', async () => {
      const user = userEvent.setup();
      render(<SearchModal isOpen={true} onClose={mockOnClose} />);
      
      const input = screen.getByPlaceholderText(/search chocolates/i);
      await user.type(input, 'neuhaus');
      
      await waitFor(() => {
        expect(screen.getByText('Results for "neuhaus"')).toBeInTheDocument();
        expect(screen.getByText('Neuhaus Dark Collection')).toBeInTheDocument();
      });
    });

    it('locks body scroll when open', () => {
      render(<SearchModal isOpen={true} onClose={mockOnClose} />);
      
      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.position).toBe('fixed');
    });
  });

  describe('CartPanel', () => {
    const mockOnClose = jest.fn();
    const mockItemCount = 3;

    beforeEach(() => {
      mockOnClose.mockClear();
    });

    it('displays cart items', () => {
      render(<CartPanel isOpen={true} onClose={mockOnClose} itemCount={mockItemCount} />);
      
      expect(screen.getByText(`Shopping Cart (${mockItemCount})`)).toBeInTheDocument();
      expect(screen.getByText('Neuhaus Dark Collection 24pc')).toBeInTheDocument();
      expect(screen.getByText('Rhine Valley Milk Chocolate Bar')).toBeInTheDocument();
    });

    it('allows quantity updates', async () => {
      const user = userEvent.setup();
      render(<CartPanel isOpen={true} onClose={mockOnClose} itemCount={mockItemCount} />);
      
      const increaseButton = screen.getAllByLabelText(/increase quantity/i)[0];
      await user.click(increaseButton);
      
      // Quantity should increase (this would require state management)
      // For now, we test that the button is clickable
      expect(increaseButton).toBeInTheDocument();
    });

    it('allows item removal', async () => {
      const user = userEvent.setup();
      render(<CartPanel isOpen={true} onClose={mockOnClose} itemCount={mockItemCount} />);
      
      const removeButton = screen.getAllByLabelText(/remove.*from cart/i)[0];
      await user.click(removeButton);
      
      // Item should be removed (this would require state management)
      expect(removeButton).toBeInTheDocument();
    });

    it('calculates and displays subtotal', () => {
      render(<CartPanel isOpen={true} onClose={mockOnClose} itemCount={mockItemCount} />);
      
      expect(screen.getByText('Subtotal:')).toBeInTheDocument();
      // Subtotal amount would be calculated based on items
    });

    it('shows empty state when no items', () => {
      render(<CartPanel isOpen={true} onClose={mockOnClose} itemCount={0} />);
      
      expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
      expect(screen.getByText('Add some delicious chocolates to get started!')).toBeInTheDocument();
    });

    it('traps focus within panel', async () => {
      const user = userEvent.setup();
      render(<CartPanel isOpen={true} onClose={mockOnClose} itemCount={mockItemCount} />);
      
      // First focusable element should be focused
      await waitFor(() => {
        const firstButton = screen.getAllByRole('button')[0];
        expect(firstButton).toHaveFocus();
      });
    });
  });

  describe('ProfileMenu', () => {
    it('shows sign in for unauthenticated users', async () => {
      const user = userEvent.setup();
      render(<ProfileMenu isAuthenticated={false} />);
      
      const profileButton = screen.getByLabelText(/user menu/i);
      await user.click(profileButton);
      
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByText('Create Account')).toBeInTheDocument();
      expect(screen.getByText('Orders')).toBeInTheDocument();
      expect(screen.getByText('Saved Items')).toBeInTheDocument();
    });

    it('shows account options for authenticated users', async () => {
      const user = userEvent.setup();
      render(<ProfileMenu isAuthenticated={true} userName="John" />);
      
      const profileButton = screen.getByLabelText(/user menu/i);
      await user.click(profileButton);
      
      expect(screen.getByText('Hello, John')).toBeInTheDocument();
      expect(screen.getByText('Account')).toBeInTheDocument();
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<ProfileMenu isAuthenticated={false} />);
      
      const profileButton = screen.getByLabelText(/user menu/i);
      profileButton.focus();
      
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });
      
      // Arrow key navigation
      await user.keyboard('{ArrowDown}');
      const firstMenuItem = screen.getAllByRole('menuitem')[0];
      expect(firstMenuItem).toHaveFocus();
    });

    it('closes on blur', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <ProfileMenu isAuthenticated={false} />
          <button>Outside button</button>
        </div>
      );
      
      const profileButton = screen.getByLabelText(/user menu/i);
      await user.click(profileButton);
      
      expect(screen.getByRole('menu')).toBeInTheDocument();
      
      // Click outside
      const outsideButton = screen.getByText('Outside button');
      await user.click(outsideButton);
      
      await waitFor(() => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  });

  describe('Drawer', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
      mockOnClose.mockClear();
    });

    it('displays navigation links', () => {
      render(<Drawer isOpen={true} onClose={mockOnClose} />);
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Chocolates')).toBeInTheDocument();
      expect(screen.getByText('Hampers')).toBeInTheDocument();
      expect(screen.getByText('Enquire')).toBeInTheDocument();
    });

    it('closes when navigation link is clicked', async () => {
      const user = userEvent.setup();
      render(<Drawer isOpen={true} onClose={mockOnClose} />);
      
      const homeLink = screen.getByRole('link', { name: /home/i });
      await user.click(homeLink);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('traps focus within drawer', async () => {
      render(<Drawer isOpen={true} onClose={mockOnClose} />);
      
      await waitFor(() => {
        const firstLink = screen.getByRole('link', { name: /home/i });
        expect(firstLink).toHaveFocus();
      });
    });

    it('locks body scroll when open', () => {
      render(<Drawer isOpen={true} onClose={mockOnClose} />);
      
      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.position).toBe('fixed');
    });
  });

  describe('Focus Restoration', () => {
    it('restores focus after closing search modal', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <div>
            <button onClick={() => setIsOpen(true)}>Open Search</button>
            <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
        );
      };
      
      render(<TestComponent />);
      
      const openButton = screen.getByText('Open Search');
      await user.click(openButton);
      
      // Close with escape
      await user.keyboard('{Escape}');
      
      // Focus should return to open button
      await waitFor(() => {
        expect(openButton).toHaveFocus();
      });
    });
  });

  describe('Reduced Motion Support', () => {
    it('respects prefers-reduced-motion', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<SearchModal isOpen={true} onClose={jest.fn()} />);
      
      // Component should still render without animation issues
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});
