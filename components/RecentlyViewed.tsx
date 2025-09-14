'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { sampleProducts } from '../data/products';

interface RecentlyViewedProps {
  currentProductId?: string;
  className?: string;
}

export default function RecentlyViewed({ currentProductId, className = '' }: RecentlyViewedProps) {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [viewedProducts, setViewedProducts] = useState<any[]>([]);

  useEffect(() => {
    // Get recently viewed from localStorage
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      const viewedIds = JSON.parse(stored);
      setRecentlyViewed(viewedIds);
      
      // Filter out current product and get products
      const filteredIds = viewedIds.filter((id: string) => id !== currentProductId).slice(0, 4);
      const products = filteredIds
        .map((id: string) => sampleProducts.find(p => p.id === id))
        .filter(Boolean);
      
      setViewedProducts(products);
    }
  }, [currentProductId]);

  // Add current product to recently viewed
  useEffect(() => {
    if (currentProductId) {
      const stored = localStorage.getItem('recentlyViewed');
      const viewedIds = stored ? JSON.parse(stored) : [];
      
      // Remove if already exists and add to front
      const filteredIds = viewedIds.filter((id: string) => id !== currentProductId);
      const newViewed = [currentProductId, ...filteredIds].slice(0, 10); // Keep last 10
      
      localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
    }
  }, [currentProductId]);

  if (viewedProducts.length === 0) {
    return null;
  }

  return (
    <section 
      className={`w-full py-12 sm:py-16 lg:py-20 ${className}`}
      aria-labelledby="recently-viewed-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 id="recently-viewed-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#4A2E2A] mb-4">
            Recently Viewed
          </h2>
          <p className="text-base sm:text-lg text-[#4A2E2A]/80 max-w-2xl mx-auto">
            Continue exploring products you've shown interest in
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {viewedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showTaxText={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
