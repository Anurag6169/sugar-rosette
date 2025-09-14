import { MenuProduct } from './chocolates';

export const bakery: MenuProduct[] = [
  {
    id: 'bakery-1',
    slug: 'chocolate-chip-cookies',
    name: 'Chocolate Chip Cookies',
    categoryOrBrand: 'Fresh Baked',
    imageUrl: 'https://picsum.photos/400/400?random=31',
    currentPrice: 299,
    currency: 'INR',
    facts: ['Fresh Daily', '12 pieces', 'Premium Chocolate'],
    description: 'Soft and chewy cookies loaded with premium chocolate chips.'
  },
  {
    id: 'bakery-2',
    slug: 'croissants-assorted',
    name: 'Croissants Assorted',
    categoryOrBrand: 'French Pastries',
    imageUrl: 'https://picsum.photos/400/400?random=32',
    currentPrice: 399,
    currency: 'INR',
    facts: ['Buttery Flaky', '6 pieces', 'Fresh Baked'],
    description: 'Authentic French croissants with buttery, flaky layers.'
  },
  {
    id: 'bakery-3',
    slug: 'macarons-collection',
    name: 'Macarons Collection',
    categoryOrBrand: 'Artisan Pastries',
    imageUrl: 'https://picsum.photos/400/400?random=33',
    currentPrice: 899,
    mrp: 1099,
    currency: 'INR',
    facts: ['6 Flavors', 'Delicate Shells', '12 pieces'],
    description: 'Colorful French macarons with various flavors and delicate shells.'
  },
  {
    id: 'bakery-4',
    slug: 'eclairs-chocolate',
    name: 'Chocolate Éclairs',
    categoryOrBrand: 'Classic Pastries',
    imageUrl: 'https://picsum.photos/400/400?random=34',
    currentPrice: 199,
    currency: 'INR',
    facts: ['Choux Pastry', 'Chocolate Ganache', '6 pieces'],
    description: 'Light choux pastry filled with cream and topped with chocolate ganache.'
  },
  {
    id: 'bakery-5',
    slug: 'danish-pastries',
    name: 'Danish Pastries',
    categoryOrBrand: 'European Baked',
    imageUrl: 'https://picsum.photos/400/400?random=35',
    currentPrice: 349,
    currency: 'INR',
    facts: ['Laminated Dough', '4 pieces', 'Various Fillings'],
    description: 'Flaky Danish pastries with various sweet fillings and toppings.'
  },
  {
    id: 'bakery-6',
    slug: 'muffins-variety',
    name: 'Muffins Variety Pack',
    categoryOrBrand: 'Morning Treats',
    imageUrl: 'https://picsum.photos/400/400?random=36',
    currentPrice: 449,
    currency: 'INR',
    facts: ['4 Varieties', 'Moist & Fluffy', '6 pieces'],
    description: 'Fresh baked muffins in various flavors perfect for breakfast or snack.'
  }
];
