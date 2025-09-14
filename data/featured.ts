export interface FeaturedProduct {
  slug: string;
  name: string;
  categoryOrBrand: string;
  currentPrice?: number;
  mrp?: number;
  currency?: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  meta?: string;
  tags?: string[];
}

export interface FeaturedBlock {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  layout: 'large' | 'medium' | 'small';
  textPosition: 'left' | 'right' | 'center';
  cta: {
    text: string;
    href: string;
  };
  ariaLabel: string;
}

export const featuredProducts: FeaturedProduct[] = [
  {
    slug: 'neuhaus-luxury-collection-32pc',
    name: 'Neuhaus Luxury Collection 32pc',
    categoryOrBrand: 'Neuhaus',
    currentPrice: 4499,
    mrp: 5299,
    currency: 'INR',
    beforeImageUrl: 'https://picsum.photos/600/400?random=1',
    afterImageUrl: 'https://picsum.photos/600/400?random=2',
    beforeLabel: 'Packaging',
    afterLabel: 'Inside',
    meta: 'Box of 32 - Premium Selection',
    tags: ['Premium', 'Belgian', 'Gift Box']
  },
  {
    slug: 'ferrero-rocher-golden-gift',
    name: 'Ferrero Rocher Golden Gift',
    categoryOrBrand: 'Ferrero',
    currentPrice: 2999,
    mrp: 3499,
    currency: 'INR',
    beforeImageUrl: 'https://picsum.photos/600/400?random=3',
    afterImageUrl: 'https://picsum.photos/600/400?random=4',
    beforeLabel: 'Packaging',
    afterLabel: 'Inside',
    meta: '48 pieces - Golden Wrapped',
    tags: ['Golden', 'Hazelnut', 'Premium']
  },
  {
    slug: 'artisan-chocolate-cake',
    name: 'Artisan Chocolate Cake',
    categoryOrBrand: 'Signature Cakes',
    currentPrice: 3499,
    currency: 'INR',
    beforeImageUrl: 'https://picsum.photos/600/400?random=5',
    afterImageUrl: 'https://picsum.photos/600/400?random=6',
    beforeLabel: 'Packaging',
    afterLabel: 'Inside',
    meta: '8 inches - Rich Chocolate',
    tags: ['Custom', 'Rich', 'Celebration']
  },
  {
    slug: 'luxury-hamper-collection',
    name: 'Luxury Hamper Collection',
    categoryOrBrand: 'Curated Collection',
    currentPrice: 6999,
    mrp: 7999,
    currency: 'INR',
    beforeImageUrl: 'https://picsum.photos/600/400?random=7',
    afterImageUrl: 'https://picsum.photos/600/400?random=8',
    beforeLabel: 'Packaging',
    afterLabel: 'Inside',
    meta: 'Premium Selection - 2kg',
    tags: ['Luxury', 'Gift', 'Assorted']
  },
  {
    slug: 'godiva-truffle-selection',
    name: 'Godiva Truffle Selection',
    categoryOrBrand: 'Godiva',
    currentPrice: 3999,
    mrp: 4599,
    currency: 'INR',
    beforeImageUrl: 'https://picsum.photos/600/400?random=9',
    afterImageUrl: 'https://picsum.photos/600/400?random=10',
    beforeLabel: 'Packaging',
    afterLabel: 'Inside',
    meta: '16 Truffles - Belgian Masterpiece',
    tags: ['Truffles', 'Belgian', 'Premium']
  },
  {
    slug: 'macaron-artisan-collection',
    name: 'Macaron Artisan Collection',
    categoryOrBrand: 'French Pastries',
    currentPrice: 1299,
    currency: 'INR',
    beforeImageUrl: 'https://picsum.photos/600/400?random=11',
    afterImageUrl: 'https://picsum.photos/600/400?random=12',
    beforeLabel: 'Packaging',
    afterLabel: 'Inside',
    meta: '12 Macarons - 6 Flavors',
    tags: ['French', 'Colorful', 'Delicate']
  },
  {
    slug: 'premium-birthday-cake',
    name: 'Premium Birthday Cake',
    categoryOrBrand: 'Custom Cakes',
    currentPrice: 2799,
    currency: 'INR',
    beforeImageUrl: 'https://picsum.photos/600/400?random=13',
    afterImageUrl: 'https://picsum.photos/600/400?random=14',
    beforeLabel: 'Packaging',
    afterLabel: 'Inside',
    meta: '10 inches - Custom Design',
    tags: ['Birthday', 'Custom', 'Celebration']
  },
  {
    slug: 'corporate-gift-hamper',
    name: 'Corporate Gift Hamper',
    categoryOrBrand: 'Corporate Collection',
    currentPrice: 5499,
    currency: 'INR',
    beforeImageUrl: 'https://picsum.photos/600/400?random=15',
    afterImageUrl: 'https://picsum.photos/600/400?random=16',
    beforeLabel: 'Packaging',
    afterLabel: 'Inside',
    meta: 'Professional Selection - 1.5kg',
    tags: ['Corporate', 'Professional', 'Gift']
  }
];

export const featuredBlocks: FeaturedBlock[] = [
  {
    id: 'luxury-hampers',
    title: 'Luxury Hampers',
    subtitle: 'Curated collections for every occasion',
    description: 'Discover our handpicked selection of premium gift hampers, perfect for celebrations and special moments.',
    image: 'https://images.unsplash.com/photo-1541782814458-5015e6c9f658?w=800&h=600&fit=crop',
    category: 'Hampers',
    layout: 'large',
    textPosition: 'left',
    cta: {
      text: 'Explore Hampers',
      href: '/collections/hampers'
    },
    ariaLabel: 'Explore our luxury hampers collection'
  },
  {
    id: 'signature-collections',
    title: 'Signature Collections',
    subtitle: 'Our finest chocolate assortments',
    description: 'Experience the art of chocolate making with our signature collections crafted by master chocolatiers.',
    image: 'https://images.unsplash.com/photo-1542444459-db63c55b2c37?w=800&h=600&fit=crop',
    category: 'Chocolates',
    layout: 'medium',
    textPosition: 'right',
    cta: {
      text: 'Shop Chocolates',
      href: '/collections/chocolates'
    },
    ariaLabel: 'Browse our signature chocolate collections'
  },
  {
    id: 'artisan-cakes',
    title: 'Artisan Cakes',
    subtitle: 'Custom celebration cakes',
    description: 'From birthdays to weddings, our artisan cakes are crafted with love and the finest ingredients.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
    category: 'Cakes',
    layout: 'small',
    textPosition: 'center',
    cta: {
      text: 'View Cakes',
      href: '/collections/cakes'
    },
    ariaLabel: 'Discover our artisan cake collection'
  },
  {
    id: 'fresh-bakery',
    title: 'Fresh Bakery',
    subtitle: 'Daily baked delights',
    description: 'Start your day with our freshly baked pastries, croissants, and artisan breads made daily.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
    category: 'Bakery',
    layout: 'small',
    textPosition: 'center',
    cta: {
      text: 'Browse Bakery',
      href: '/collections/bakery'
    },
    ariaLabel: 'Explore our fresh bakery items'
  }
];