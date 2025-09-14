import { MenuProduct } from './chocolates';

export const cakes: MenuProduct[] = [
  {
    id: 'cake-1',
    slug: 'chocolate-truffle-cake',
    name: 'Chocolate Truffle Cake',
    categoryOrBrand: 'Signature Cakes',
    imageUrl: 'https://picsum.photos/400/400?random=21',
    currentPrice: 2499,
    currency: 'INR',
    facts: ['Rich Chocolate', '8 inches', 'Serves 8-10'],
    description: 'Decadent chocolate cake with layers of rich truffle and chocolate ganache.'
  },
  {
    id: 'cake-2',
    slug: 'red-velvet-celebration',
    name: 'Red Velvet Celebration',
    categoryOrBrand: 'Designer Cakes',
    imageUrl: 'https://picsum.photos/400/400?random=22',
    currentPrice: 1999,
    mrp: 2299,
    currency: 'INR',
    facts: ['Classic Recipe', 'Cream Cheese Frosting', '6 inches'],
    description: 'Classic red velvet cake with cream cheese frosting and decorative elements.'
  },
  {
    id: 'cake-3',
    slug: 'vanilla-berry-cake',
    name: 'Vanilla Berry Cake',
    categoryOrBrand: 'Fresh Cakes',
    imageUrl: 'https://picsum.photos/400/400?random=23',
    currentPrice: 1799,
    currency: 'INR',
    facts: ['Fresh Berries', 'Vanilla Sponge', '7 inches'],
    description: 'Light and airy vanilla sponge with fresh mixed berries and whipped cream.'
  },
  {
    id: 'cake-4',
    slug: 'tiramisu-luxury',
    name: 'Tiramisu Luxury',
    categoryOrBrand: 'Italian Classics',
    imageUrl: 'https://picsum.photos/400/400?random=24',
    currentPrice: 2199,
    currency: 'INR',
    facts: ['Coffee Infused', 'Mascarpone', '6 inches'],
    description: 'Authentic Italian tiramisu with layers of coffee-soaked ladyfingers and mascarpone.'
  },
  {
    id: 'cake-5',
    slug: 'carrot-walnut-cake',
    name: 'Carrot Walnut Cake',
    categoryOrBrand: 'Healthy Options',
    imageUrl: 'https://picsum.photos/400/400?random=25',
    currentPrice: 1599,
    currency: 'INR',
    facts: ['Carrot & Walnut', 'Cream Cheese', '8 inches'],
    description: 'Moist carrot cake with walnuts and cream cheese frosting.'
  },
  {
    id: 'cake-6',
    slug: 'strawberry-shortcake',
    name: 'Strawberry Shortcake',
    categoryOrBrand: 'Seasonal Specials',
    imageUrl: 'https://picsum.photos/400/400?random=26',
    currentPrice: 1899,
    currency: 'INR',
    facts: ['Fresh Strawberries', 'Shortcake Base', '6 inches'],
    description: 'Light and fluffy shortcake with fresh strawberries and whipped cream.'
  }
];
