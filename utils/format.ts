/**
 * Truncate text to a specified number of characters
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Format price string (placeholder for future currency formatting)
 */
export function formatPrice(price: string | null | undefined): string {
  if (!price) return '';
  
  // Remove any existing currency symbols and clean the string
  const cleanPrice = price.replace(/[^\d.,]/g, '');
  
  // For now, just return as-is. In the future, this could:
  // - Add currency symbols
  // - Handle different locales
  // - Format decimals consistently
  return cleanPrice;
}

/**
 * Generate product initials for fallback display
 */
export function getProductInitials(title: string): string {
  return title
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Validate image URL
 */
export function isValidImageUrl(url: string): boolean {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|webp|avif)$/i.test(url);
  } catch {
    return false;
  }
}

/**
 * Generate accessible alt text for product images
 */
export function generateImageAltText(title: string, badges: string[]): string {
  const badgeText = badges.length > 0 ? ` (${badges.join(', ')})` : '';
  return `${title}${badgeText}`;
}
