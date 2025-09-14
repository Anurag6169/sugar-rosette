export interface MenuProduct {
  id: string;
  slug: string;
  name: string;
  categoryOrBrand: string;
  imageUrl: string;
  currentPrice?: number;
  mrp?: number;
  currency?: string;
  facts: string[];
  description?: string;
}

export const chocolates: MenuProduct[] = [
  {
    id: 'choc-1',
    slug: 'neuhaus-milk-collection-24pc',
    name: 'Neuhaus Milk Collection 24pc',
    categoryOrBrand: 'Neuhaus',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    currentPrice: 2999,
    mrp: 3499,
    currency: 'INR',
    facts: ['Milk Chocolate', 'Box of 24', '265g'],
    description: 'A luxurious collection of premium milk chocolates, crafted with the finest Belgian cocoa.'
  },
  {
    id: 'choc-2',
    slug: 'ferrero-rocher-t30',
    name: 'Ferrero Rocher T30',
    categoryOrBrand: 'Ferrero',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    currentPrice: 1999,
    mrp: 2499,
    currency: 'INR',
    facts: ['Hazelnut', '30 pieces', '375g'],
    description: 'The iconic golden wrapped hazelnut chocolates in a premium gift box.'
  },
  {
    id: 'choc-3',
    slug: 'after-eight-mint-thins',
    name: 'After Eight Mint Chocolate Thins',
    categoryOrBrand: 'After Eight',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    currentPrice: 799,
    currency: 'INR',
    facts: ['Dark Chocolate', 'Mint Filling', '200g'],
    description: 'Elegant dark chocolate thins with refreshing mint cream center.'
  },
  {
    id: 'choc-4',
    slug: 'rhine-valley-snacking-rocher',
    name: 'Rhine Valley Snacking Rocher',
    categoryOrBrand: 'Rhine Valley',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    currentPrice: 399,
    mrp: 499,
    currency: 'INR',
    facts: ['Milk Chocolate', 'Almond', '150g'],
    description: 'Delicious milk chocolate with crunchy almond pieces.'
  },
  {
    id: 'choc-5',
    slug: 'godiva-assorted-truffles',
    name: 'Godiva Assorted Truffles',
    categoryOrBrand: 'Godiva',
    imageUrl: 'https://picsum.photos/400/400?random=5',
    currentPrice: 2499,
    mrp: 2999,
    currency: 'INR',
    facts: ['Premium Truffles', '12 pieces', '180g'],
    description: 'Handcrafted truffles with exotic flavors and premium Belgian chocolate.'
  },
  {
    id: 'choc-6',
    slug: 'lindt-excellence-70-dark',
    name: 'Lindt Excellence 70% Dark',
    categoryOrBrand: 'Lindt',
    imageUrl: 'https://picsum.photos/400/400?random=6',
    currentPrice: 649,
    currency: 'INR',
    facts: ['70% Dark', 'Single Origin', '100g'],
    description: 'Intense dark chocolate with 70% cocoa content from premium beans.'
  },
  {
    id: 'choc-7',
    slug: 'toblerone-milk-chocolate',
    name: 'Toblerone Milk Chocolate',
    categoryOrBrand: 'Toblerone',
    imageUrl: 'https://picsum.photos/400/400?random=7',
    currentPrice: 899,
    mrp: 1099,
    currency: 'INR',
    facts: ['Milk Chocolate', 'Honey Almond', '360g'],
    description: 'The iconic triangular chocolate with honey and almond nougat.'
  },
  {
    id: 'choc-8',
    slug: 'cadbury-dairy-milk-luxury',
    name: 'Cadbury Dairy Milk Luxury',
    categoryOrBrand: 'Cadbury',
    imageUrl: 'https://picsum.photos/400/400?random=8',
    currentPrice: 449,
    currency: 'INR',
    facts: ['Milk Chocolate', 'Luxury Blend', '120g'],
    description: 'Premium milk chocolate with a smooth, creamy texture.'
  }
];
