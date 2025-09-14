import { Category } from '../types/category';
import { categoryImages } from './images';

export const categories: Category[] = [
  {
    slug: 'chocolates',
    title: 'Chocolates',
    description: 'Single-origin bars, truffles, dragées.',
    image: categoryImages.chocolates,
    href: '/collections/chocolates',
  },
  {
    slug: 'hampers',
    title: 'Hampers',
    description: 'Curated gifts for every occasion.',
    image: categoryImages.hampers,
    href: '/collections/hampers',
  },
  {
    slug: 'cakes',
    title: 'Cakes',
    description: 'Designer cakes, handcrafted fresh.',
    image: categoryImages.cakes,
    href: '/collections/cakes',
  },
  {
    slug: 'bakery',
    title: 'Bakery',
    description: 'Cookies, pastries, and more.',
    image: categoryImages.bakery,
    href: '/collections/bakery',
  },
] as const;
