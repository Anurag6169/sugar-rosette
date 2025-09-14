import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard, { ProductCardSkeleton } from '../ProductCard';
import { Product } from '../../types/product';
import '@testing-library/jest-dom';

// Mock next/link and next/image
jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock('next/image', () => {
  return ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  );
});

const mockProduct: Product = {
  id: '1',
  slug: 'neuhaus-milk-collection-24pc',
  name: 'Neuhaus Milk Collection 24pc 265g',
  imageUrl: 'https://images.unsplash.com/photo-1542444459-db63c55b2c37',
  categoryOrBrand: 'Neuhaus',
  currentPrice: 2999,
  mrp: 3499,
  currency: 'INR',
  status: 'available'
};

const mockDisabledProduct: Product = {
  ...mockProduct,
  status: 'sold_out'
};

const mockSaleProduct: Product = {
  id: '2',
  slug: 'ferrero-rocher-t30-375g',
  name: 'Ferrero Rocher T30 375g',
  imageUrl: 'https://images.unsplash.com/photo-1541976076758-347942db1970',
  categoryOrBrand: 'Ferrero',
  currentPrice: 1999,
  mrp: 2499,
  currency: 'INR',
  status: 'available'
};

describe('ProductCard Accessibility', () => {
  it('should render with proper semantic structure', () => {
    render(<ProductCard product={mockProduct} />);
    
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveAttribute('aria-label', `Product: ${mockProduct.name}`);
    
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(mockProduct.name);
  });

  it('should have accessible link with proper aria-label', () => {
    render(<ProductCard product={mockProduct} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/products/${mockProduct.slug}`);
    expect(link).toHaveAttribute('aria-label', `View ${mockProduct.name}`);
    expect(link).toHaveAttribute('tabIndex', '0');
  });

  it('should have accessible image with proper alt text', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.imageUrl);
  });

  it('should display category/brand label correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    const categoryLabel = screen.getByText(mockProduct.categoryOrBrand);
    expect(categoryLabel).toBeInTheDocument();
    expect(categoryLabel).toHaveClass('uppercase');
  });

  it('should display sale pricing correctly', () => {
    render(<ProductCard product={mockSaleProduct} />);
    
    // Check current price
    const currentPrice = screen.getByText('₹1,999');
    expect(currentPrice).toBeInTheDocument();
    
    // Check MRP (strike-through)
    const mrp = screen.getByText('₹2,499');
    expect(mrp).toBeInTheDocument();
    
    // Check discount badge
    const discountBadge = screen.getByText('-20%');
    expect(discountBadge).toBeInTheDocument();
  });

  it('should display regular pricing correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    const price = screen.getByText('₹2,999');
    expect(price).toBeInTheDocument();
    
    // Should not show discount badge
    const discountBadge = screen.queryByText(/-%\d+/);
    expect(discountBadge).not.toBeInTheDocument();
  });

  it('should be keyboard navigable', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} />);
    
    const link = screen.getByRole('link');
    
    // Focus the link
    await user.tab();
    expect(link).toHaveFocus();
    
    // Activate with Enter
    await user.keyboard('{Enter}');
    // Note: In a real test, you'd verify navigation occurred
  });

  it('should show visible focus outline on keyboard focus', () => {
    render(<ProductCard product={mockProduct} />);
    
    const link = screen.getByRole('link');
    fireEvent.focus(link);
    
    expect(link).toHaveClass('focus-visible:ring-2');
    expect(link).toHaveClass('focus-visible:ring-[#C9A14A]');
  });

  it('should handle sold out state accessibility', () => {
    render(<ProductCard product={mockDisabledProduct} />);
    
    const link = screen.getByRole('link');
    const soldOutBadge = screen.getByText('Sold Out');
    
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabIndex', '-1');
    expect(soldOutBadge).toBeInTheDocument();
  });

  it('should handle image error state with fallback', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByAltText(mockProduct.name);
    
    // Simulate image error
    fireEvent.error(image);
    
    // Should show fallback with initials
    expect(screen.getByText('NM')).toBeInTheDocument();
  });

  it('should respect reduced motion preferences', () => {
    // Mock prefers-reduced-motion
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

    render(<ProductCard product={mockProduct} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('motion-reduce:transition-none');
    expect(article).toHaveClass('motion-reduce:hover:translate-y-0');
    expect(article).toHaveClass('motion-reduce:focus-within:translate-y-0');
  });

  it('should display tax text when enabled', () => {
    render(<ProductCard product={mockProduct} showTaxText={true} />);
    
    const taxText = screen.getByText('inclusive of taxes');
    expect(taxText).toBeInTheDocument();
  });

  it('should hide tax text by default', () => {
    render(<ProductCard product={mockProduct} />);
    
    const taxText = screen.queryByText('inclusive of taxes');
    expect(taxText).not.toBeInTheDocument();
  });
});

describe('ProductCardSkeleton Accessibility', () => {
  it('should render skeleton with proper structure', () => {
    render(<ProductCardSkeleton />);
    
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('animate-pulse');
  });

  it('should provide compact skeleton variant', () => {
    render(<ProductCardSkeleton variant="compact" />);
    
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
  });
});
