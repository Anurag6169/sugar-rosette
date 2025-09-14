import { MenuProduct } from './chocolates';

export const hampers: MenuProduct[] = [
  {
    id: 'hamper-1',
    slug: 'luxury-chocolate-hamper',
    name: 'Luxury Chocolate Hamper',
    categoryOrBrand: 'Curated Collection',
    imageUrl: 'https://picsum.photos/400/400?random=11',
    currentPrice: 4999,
    mrp: 5999,
    currency: 'INR',
    facts: ['Premium Selection', 'Gift Box', '1.2kg'],
    description: 'An exquisite collection of premium chocolates and confections in an elegant gift box.'
  },
  {
    id: 'hamper-2',
    slug: 'corporate-gifting-hamper',
    name: 'Corporate Gifting Hamper',
    categoryOrBrand: 'Corporate Collection',
    imageUrl: 'https://picsum.photos/400/400?random=12',
    currentPrice: 7999,
    currency: 'INR',
    facts: ['Business Gifts', 'Customizable', '2kg'],
    description: 'Professional gift hamper perfect for corporate occasions and business relationships.'
  },
  {
    id: 'hamper-3',
    slug: 'romantic-couple-hamper',
    name: 'Romantic Couple Hamper',
    categoryOrBrand: 'Romance Collection',
    imageUrl: 'https://picsum.photos/400/400?random=13',
    currentPrice: 3499,
    mrp: 3999,
    currency: 'INR',
    facts: ['Anniversary Gift', 'Premium Selection', '800g'],
    description: 'A romantic collection of chocolates and treats perfect for anniversaries and special moments.'
  },
  {
    id: 'hamper-4',
    slug: 'festive-celebration-hamper',
    name: 'Festive Celebration Hamper',
    categoryOrBrand: 'Festive Collection',
    imageUrl: 'https://picsum.photos/400/400?random=14',
    currentPrice: 5999,
    currency: 'INR',
    facts: ['Holiday Special', 'Mixed Selection', '1.5kg'],
    description: 'Celebrate festivals and holidays with this specially curated collection of sweets and treats.'
  }
];
