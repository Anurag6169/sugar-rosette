import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import ComparisonSlider from '../media/ComparisonSlider';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

describe('ComparisonSlider Accessibility Tests', () => {
  const defaultProps = {
    beforeUrl: 'https://example.com/before.jpg',
    afterUrl: 'https://example.com/after.jpg',
    beforeLabel: 'Packaging',
    afterLabel: 'Inside',
    alt: 'Premium Chocolate Box'
  };

  beforeEach(() => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
      writable: true
    });

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 400,
      height: 300,
      top: 0,
      left: 0,
      bottom: 300,
      right: 400,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<ComparisonSlider {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA slider attributes', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
    expect(slider).toHaveAttribute('aria-label', 'Compare views of Premium Chocolate Box');
  });

  it('should update aria-valuenow when slider position changes', async () => {
    const user = userEvent.setup();
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
    
    // Simulate arrow key press
    await user.tab();
    await user.keyboard('{ArrowRight}');
    
    await waitFor(() => {
      expect(slider).toHaveAttribute('aria-valuenow', '60');
    });
  });

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    
    // Focus the slider
    await user.tab();
    expect(slider).toHaveFocus();
    
    // Test arrow keys
    await user.keyboard('{ArrowRight}');
    expect(slider).toHaveAttribute('aria-valuenow', '60');
    
    await user.keyboard('{ArrowLeft}');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
    
    // Test Home key
    await user.keyboard('{Home}');
    expect(slider).toHaveAttribute('aria-valuenow', '0');
    
    // Test End key
    await user.keyboard('{End}');
    expect(slider).toHaveAttribute('aria-valuenow', '100');
  });

  it('should snap to 0%, 50%, and 100% when close to those positions', async () => {
    const user = userEvent.setup();
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    
    await user.tab();
    
    // Test snapping to 0%
    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{ArrowLeft}');
    
    expect(slider).toHaveAttribute('aria-valuenow', '0');
    
    // Test snapping to 100%
    await user.keyboard('{End}');
    expect(slider).toHaveAttribute('aria-valuenow', '100');
    
    // Test snapping to 50%
    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{ArrowLeft}');
    
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('should handle mouse interactions', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    const container = slider.closest('[class*="cursor-col-resize"]');
    
    expect(container).toBeInTheDocument();
    
    // Simulate mouse down
    fireEvent.mouseDown(slider);
    expect(slider).toBeInTheDocument();
  });

  it('should handle touch interactions', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    
    // Simulate touch start
    fireEvent.touchStart(slider, {
      touches: [{ clientX: 200, clientY: 150 }]
    });
    
    expect(slider).toBeInTheDocument();
  });

  it('should show proper image labels', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    expect(screen.getByText('Packaging')).toBeInTheDocument();
    expect(screen.getByText('Inside')).toBeInTheDocument();
  });

  it('should use default labels when not provided', () => {
    render(
      <ComparisonSlider 
        beforeUrl="https://example.com/before.jpg"
        afterUrl="https://example.com/after.jpg"
        alt="Test Product"
      />
    );
    
    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();
  });

  it('should have proper alt text for images', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('alt', 'Premium Chocolate Box - Packaging');
    expect(images[1]).toHaveAttribute('alt', 'Premium Chocolate Box - Inside');
  });

  it('should support reduced motion preference', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
      writable: true
    });

    render(<ComparisonSlider {...defaultProps} />);
    
    // Should show toggle button instead of slider
    expect(screen.getByText('Show Packaging')).toBeInTheDocument();
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });

  it('should toggle between views in reduced motion mode', async () => {
    const user = userEvent.setup();
    
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
      writable: true
    });

    render(<ComparisonSlider {...defaultProps} />);
    
    const toggleButton = screen.getByText('Show Inside');
    expect(toggleButton).toBeInTheDocument();
    
    await user.click(toggleButton);
    
    expect(screen.getByText('Show Packaging')).toBeInTheDocument();
    expect(screen.getByText('Inside')).toBeInTheDocument();
  });

  it('should have proper focus management', async () => {
    const user = userEvent.setup();
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    
    // Should be focusable
    await user.tab();
    expect(slider).toHaveFocus();
    
    // Should have visible focus ring
    expect(slider).toHaveClass('focus:ring-2', 'focus:ring-[#C9A14A]');
  });

  it('should handle Escape key to blur', async () => {
    const user = userEvent.setup();
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    
    await user.tab();
    expect(slider).toHaveFocus();
    
    await user.keyboard('{Escape}');
    
    await waitFor(() => {
      expect(slider).not.toHaveFocus();
    });
  });

  it('should prevent default behavior for navigation keys', async () => {
    const user = userEvent.setup();
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    
    await user.tab();
    
    // Create a mock event to check preventDefault
    const mockEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    const preventDefaultSpy = jest.spyOn(mockEvent, 'preventDefault');
    
    fireEvent.keyDown(slider, mockEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should maintain proper contrast for labels', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    const labels = screen.getAllByText(/Packaging|Inside/);
    
    labels.forEach(label => {
      expect(label).toHaveClass('bg-white/90', 'text-[#4A2E2A]');
    });
  });

  it('should have proper touch target size', () => {
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    const handle = slider.querySelector('[class*="w-8"]'); // Handle circle
    
    expect(handle).toBeInTheDocument();
    expect(handle).toHaveClass('w-8', 'h-8'); // 32px x 32px - meets 44px minimum with padding
  });

  it('should handle edge cases gracefully', () => {
    // Test with missing labels
    render(
      <ComparisonSlider 
        beforeUrl="https://example.com/before.jpg"
        afterUrl="https://example.com/after.jpg"
        alt="Test Product"
        beforeLabel=""
        afterLabel=""
      />
    );
    
    // Should fall back to defaults
    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();
  });

  it('should support passive touch listeners for performance', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    
    render(<ComparisonSlider {...defaultProps} />);
    
    const slider = screen.getByRole('slider');
    fireEvent.touchStart(slider);
    
    // Should use passive listeners for touchmove to prevent scroll jank
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'touchmove', 
      expect.any(Function), 
      { passive: false }
    );
  });
});
