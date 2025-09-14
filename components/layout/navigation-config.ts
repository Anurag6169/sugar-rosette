export interface NavigationItem {
  name: string;
  href: string;
  isExternal?: boolean;
  children?: NavigationItem[];
}

export interface NavigationConfig {
  mainLinks: NavigationItem[];
  ctaButton: NavigationItem;
}

export const navigationConfig: NavigationConfig = {
  mainLinks: [
    { name: 'Menu', href: '/menu' },
    { 
      name: 'Products', 
      href: '/products',
      children: [
        { 
          name: 'Cakes', 
          href: '/cakes',
          children: [
            { name: 'Trending Cakes', href: '/cakes/trending' },
            { name: 'Bento Cakes', href: '/cakes/bento' },
            { name: 'Bomb Cakes', href: '/cakes/bomb' },
            { name: 'Cricket Cakes', href: '/cakes/cricket' },
            { name: 'Drip Cakes', href: '/cakes/drip' },
            { name: 'Gourmet Cakes', href: '/cakes/gourmet' },
            { name: 'Labubu Cakes', href: '/cakes/labubu' },
            { name: 'Pinata Cakes', href: '/cakes/pinata' },
            { name: 'Pull Me Up Cakes', href: '/cakes/pull-me-up' },
          ]
        },
        { 
          name: 'Desserts', 
          href: '/desserts',
          children: [
            { name: 'All Desserts', href: '/desserts' },
            { name: 'Brownies', href: '/desserts/brownies' },
            { name: 'Cheese Cake', href: '/desserts/cheese-cake' },
            { name: 'Cookies', href: '/desserts/cookies' },
            { name: 'Cup Cakes', href: '/desserts/cupcakes' },
            { name: 'Jar Cakes', href: '/desserts/jar-cakes' },
            { name: 'Pastries', href: '/desserts/pastries' },
            { name: 'Tea Cakes', href: '/desserts/tea-cakes' },
          ]
        },
        { 
          name: 'Chocolates', 
          href: '/chocolates',
          children: [
            { name: 'Chocolate Cubes', href: '/chocolates/cubes' },
            { name: 'Chocolate Bars', href: '/chocolates/bars' },
            { name: 'Chocolate Balls', href: '/chocolates/balls' },
            { name: 'Cocoa', href: '/chocolates/cocoa' },
            { name: 'Cocoa Clusters', href: '/chocolates/cocoa-clusters' },
          ]
        },
      ]
    },
    { name: 'Hampers', href: '/hampers' },
    { 
      name: 'Occasions', 
      href: '/occasions',
      children: [
        { name: 'Indian Festives', href: '/occasions/indian-festives' },
        { name: 'Birthdays', href: '/occasions/birthdays' },
        { name: 'Anniversary', href: '/occasions/anniversary' },
        { name: 'Valentines Day', href: '/occasions/valentines-day' },
        { name: 'Weddings', href: '/occasions/weddings' },
        { name: 'Baby Shower', href: '/occasions/baby-shower' },
        { name: 'House Warming', href: '/occasions/house-warming' },
      ]
    },
    { name: 'Corporate Gifting', href: '/corporate-gifting' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  ctaButton: {
    name: 'Enquire',
    href: '/enquire',
  },
};

// Utility function to check if a link is active
export const isActiveLink = (href: string, currentPath: string | null): boolean => {
  if (!currentPath) {
    return false;
  }
  if (href === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(href);
};
