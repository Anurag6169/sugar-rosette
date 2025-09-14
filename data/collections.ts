import { Product } from '../types/product';

export { Product };

export interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
  category: string;
  products: Product[];
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

// Mock collections data
export const collections: Collection[] = [
  {
    slug: 'chocolates',
    name: 'Premium Chocolates',
    description: 'Handcrafted chocolates made with the finest cocoa and traditional techniques',
    image: 'https://images.unsplash.com/photo-1542444459-db63c55b2c37?w=800&h=600&fit=crop',
    category: 'Chocolates',
    products: [
      {
        id: '1',
        slug: 'neuhaus-milk-collection-24pc',
        name: 'Neuhaus Milk Collection 24pc 265g',
        imageUrl: 'https://images.unsplash.com/photo-1542444459-db63c55b2c37?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Neuhaus',
        currentPrice: 2999,
        mrp: 3499,
        currency: 'INR',
        status: 'available'
      },
      {
        id: '2',
        slug: 'ferrero-rocher-t30-375g',
        name: 'Ferrero Rocher T30 375g',
        imageUrl: 'https://images.unsplash.com/photo-1541976076758-347942db1970?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Ferrero',
        currentPrice: 1999,
        mrp: 2499,
        currency: 'INR',
        status: 'available'
      },
      {
        id: '3',
        slug: 'lindt-excellence-dark-70',
        name: 'Lindt Excellence Dark 70% 100g',
        imageUrl: 'https://images.unsplash.com/photo-1542444459-db63c55b2c37?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Lindt',
        currentPrice: 450,
        currency: 'INR',
        status: 'available'
      },
      {
        id: '4',
        slug: 'toblerone-milk-chocolate-360g',
        name: 'Toblerone Milk Chocolate 360g',
        imageUrl: 'https://images.unsplash.com/photo-1541976076758-347942db1970?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Toblerone',
        currentPrice: 699,
        mrp: 799,
        currency: 'INR',
        status: 'available'
      },
      {
        id: '5',
        slug: 'cadbury-dairy-milk-silk-150g',
        name: 'Cadbury Dairy Milk Silk 150g',
        imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Cadbury',
        currentPrice: 299,
        mrp: 349,
        currency: 'INR',
        status: 'available'
      }
    ]
  },
  {
    slug: 'hampers',
    name: 'Luxury Hampers',
    description: 'Curated gift hampers perfect for any special occasion',
    image: 'https://images.unsplash.com/photo-1541782814458-5015e6c9f658?w=800&h=600&fit=crop',
    category: 'Hampers',
    products: [
      {
        id: '6',
        slug: 'premium-chocolate-hamper',
        name: 'Premium Chocolate Hamper',
        imageUrl: 'https://images.unsplash.com/photo-1541782814458-5015e6c9f658?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Luxury',
        currentPrice: 4999,
        mrp: 5999,
        currency: 'INR',
        status: 'available'
      },
      {
        id: '7',
        slug: 'corporate-gift-hamper',
        name: 'Corporate Gift Hamper',
        imageUrl: 'https://images.unsplash.com/photo-1542444459-db63c55b2c37?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Corporate',
        currentPrice: 3499,
        currency: 'INR',
        status: 'available'
      }
    ]
  },
  {
    slug: 'cakes',
    name: 'Artisan Cakes',
    description: 'Freshly baked cakes made with premium ingredients',
    image: 'https://images.unsplash.com/photo-1541782814458-5015e6c9f658?w=800&h=600&fit=crop',
    category: 'Cakes',
    products: [
      {
        id: '8',
        slug: 'chocolate-truffle-cake',
        name: 'Chocolate Truffle Cake',
        imageUrl: 'https://images.unsplash.com/photo-1541782814458-5015e6c9f658?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Artisan',
        currentPrice: 1299,
        currency: 'INR',
        status: 'available'
      },
      {
        id: '9',
        slug: 'red-velvet-cake',
        name: 'Red Velvet Cake',
        imageUrl: 'https://images.unsplash.com/photo-1541976076758-347942db1970?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Classic',
        currentPrice: 999,
        mrp: 1199,
        currency: 'INR',
        status: 'available'
      }
    ]
  },
  {
    slug: 'bakery',
    name: 'Fresh Bakery',
    description: 'Daily fresh baked goods and pastries',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
    category: 'Bakery',
    products: [
      {
        id: '10',
        slug: 'artisan-croissants',
        name: 'Artisan Croissants (6pc)',
        imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Fresh',
        currentPrice: 399,
        currency: 'INR',
        status: 'available'
      },
      {
        id: '11',
        slug: 'chocolate-chip-cookies',
        name: 'Chocolate Chip Cookies (12pc)',
        imageUrl: 'https://images.unsplash.com/photo-1541976076758-347942db1970?w=400&h=400&fit=crop&crop=center',
        categoryOrBrand: 'Classic',
        currentPrice: 299,
        currency: 'INR',
        status: 'available'
      }
    ]
  }
];

// Filter options for collections
export const filterGroups: FilterGroup[] = [
  {
    key: 'type',
    label: 'Type',
    options: [
      { value: 'all', label: 'All Types', count: 11 },
      { value: 'chocolates', label: 'Chocolates', count: 5 },
      { value: 'hampers', label: 'Hampers', count: 2 },
      { value: 'cakes', label: 'Cakes', count: 2 },
      { value: 'bakery', label: 'Bakery', count: 2 }
    ]
  },
  {
    key: 'flavor',
    label: 'Flavor',
    options: [
      { value: 'all', label: 'All Flavors', count: 11 },
      { value: 'dark', label: 'Dark Chocolate', count: 3 },
      { value: 'milk', label: 'Milk Chocolate', count: 4 },
      { value: 'white', label: 'White Chocolate', count: 2 },
      { value: 'caramel', label: 'Caramel', count: 1 },
      { value: 'mint', label: 'Mint', count: 1 }
    ]
  },
  {
    key: 'occasion',
    label: 'Occasion',
    options: [
      { value: 'all', label: 'All Occasions', count: 11 },
      { value: 'birthday', label: 'Birthday', count: 8 },
      { value: 'anniversary', label: 'Anniversary', count: 6 },
      { value: 'festive', label: 'Festive', count: 7 },
      { value: 'corporate', label: 'Corporate', count: 4 },
      { value: 'weddings', label: 'Weddings', count: 5 }
    ]
  }
];

// Helper function to get collection by slug
export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(collection => collection.slug === slug);
}

// Helper function to get all collections
export function getAllCollections(): Collection[] {
  return collections;
}
