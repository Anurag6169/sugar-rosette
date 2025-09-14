/**
 * Format price in Indian Rupees (INR)
 */
export function formatPrice(price: number, currency: 'INR' = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercent(currentPrice: number, mrp: number): number {
  if (mrp <= currentPrice) return 0;
  return Math.round(((mrp - currentPrice) / mrp) * 100);
}

/**
 * Check if product is on sale
 */
export function isOnSale(currentPrice: number, mrp?: number | null): boolean {
  return mrp !== null && mrp !== undefined && mrp > currentPrice;
}

/**
 * Format discount percentage for display
 */
export function formatDiscountPercent(currentPrice: number, mrp: number): string {
  const discount = calculateDiscountPercent(currentPrice, mrp);
  return `-${discount}%`;
}
