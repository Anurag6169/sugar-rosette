export interface Product {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  categoryOrBrand: string;
  currentPrice: number;
  mrp?: number | null;
  currency?: 'INR';
  status?: 'available' | 'sold_out';
  href?: string;
  summary?: string; // Optional for backward compatibility
  badges?: string[]; // Optional for backward compatibility
  tags?: string[]; // Optional for backward compatibility
  rating?: {
    value: number;
    count: number;
  };
  microcopy?: string;
}

export interface ProductCardProps {
  product: Product;
  className?: string;
  showTaxText?: boolean;
}

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'muted';
}

export interface OverflowBadgeProps {
  count: number;
  className?: string;
}
