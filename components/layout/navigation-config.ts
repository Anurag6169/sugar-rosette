export interface NavigationItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

export interface NavigationConfig {
  mainLinks: NavigationItem[];
  ctaButton: NavigationItem;
}

export const navigationConfig: NavigationConfig = {
  mainLinks: [
    { name: 'Menu', href: '/menu' },
    { name: 'Products', href: '/products' },
    { name: 'Chocolates', href: '/chocolates' },
    { name: 'Hampers', href: '/hampers' },
    { name: 'Cakes', href: '/cakes' },
    { name: 'Bakery', href: '/bakery' },
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
