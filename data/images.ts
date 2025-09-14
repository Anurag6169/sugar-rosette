// Sample royalty-free images from Unsplash
// These can be easily replaced with CMS assets later

export const categoryImages = {
  chocolates: 'https://images.unsplash.com/photo-1542444459-db63c55b2c37?w=800&h=800&fit=crop&crop=center',
  hampers: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=800&fit=crop&crop=center',
  cakes: 'https://images.unsplash.com/photo-1542826438-8b596f9a3f5f?w=800&h=800&fit=crop&crop=center',
  bakery: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=800&fit=crop&crop=center',
} as const;

export type CategoryImageKey = keyof typeof categoryImages;
