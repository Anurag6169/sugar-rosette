export interface FeaturedBlock {
  id: string;
  title: string;
  copy: string;
  subcopy?: string;
  cta: {
    text: string;
    href: string;
  };
  image: string;
  ariaLabel: string;
  layout: 'large' | 'medium' | 'small';
  category: string;
}

export const featuredBlocks: FeaturedBlock[] = [
  {
    id: 'luxury-hampers',
    title: 'Luxury Hampers',
    copy: 'Curated gifts with artisanal assortments, hand-wrapped with love.',
    subcopy: 'Customizable. Premium packaging.',
    cta: {
      text: 'Browse Hampers',
      href: '/collections/hampers',
    },
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=600&fit=crop&crop=center',
    ariaLabel: 'Browse Luxury Hampers',
    layout: 'large',
    category: 'Gifts',
  },
  {
    id: 'signature-collections',
    title: 'Signature Collections',
    copy: 'Single-origin bars, artisanal truffles, and premium gift boxes.',
    cta: {
      text: 'Explore Chocolates',
      href: '/collections/chocolates',
    },
    image: 'https://images.unsplash.com/photo-1542444459-db63c55b2c37?w=600&h=600&fit=crop&crop=center',
    ariaLabel: 'Explore Signature Collections',
    layout: 'medium',
    category: 'Chocolates',
  },
  {
    id: 'wedding-cakes',
    title: 'Wedding Cakes',
    copy: 'Designer wedding cakes crafted for your special day.',
    subcopy: 'Custom designs. Fresh ingredients.',
    cta: {
      text: 'View Cakes',
      href: '/collections/wedding-cakes',
    },
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop&crop=center',
    ariaLabel: 'View Wedding Cakes',
    layout: 'medium',
    category: 'Cakes',
  },
  {
    id: 'artisan-bakery',
    title: 'Artisan Bakery',
    copy: 'Fresh pastries, cookies, and breads made daily.',
    cta: {
      text: 'Shop Bakery',
      href: '/collections/bakery',
    },
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=600&fit=crop&crop=center',
    ariaLabel: 'Shop Artisan Bakery',
    layout: 'small',
    category: 'Bakery',
  },
  {
    id: 'corporate-gifting',
    title: 'Corporate Gifting',
    copy: 'Premium corporate gifts and bulk orders for businesses.',
    subcopy: 'Branded packaging. Volume discounts.',
    cta: {
      text: 'Learn More',
      href: '/corporate-gifting',
    },
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=600&fit=crop&crop=center',
    ariaLabel: 'Learn about Corporate Gifting',
    layout: 'small',
    category: 'Corporate',
  },
] as const;
