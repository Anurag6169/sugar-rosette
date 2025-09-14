'use client';

import React from 'react';
import Link from 'next/link';
import FeaturedProductCard from '../cards/FeaturedProductCard';
import { featuredProducts } from '../../data/featured';

interface FeaturedAndRecommendedProps {
  className?: string;
  showAll?: boolean;
}

export default function FeaturedAndRecommended({ 
  className = '', 
  showAll = false 
}: FeaturedAndRecommendedProps) {
  // Show 6 products by default, or all if showAll is true
  const productsToShow = showAll ? featuredProducts : featuredProducts.slice(0, 6);

  return (
    <section 
      className={`w-full py-12 sm:py-16 lg:py-20 ${className}`}
      aria-labelledby="featured-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 
            id="featured-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#4A2E2A] mb-4"
          >
            Featured & Recommended
          </h2>
          <p className="text-base sm:text-lg text-[#4A2E2A]/80 max-w-2xl mx-auto mb-6">
            Handpicked favourites from our luxury collections.
          </p>
          
          {/* View All Link */}
          <Link
            href="/collections/featured"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#C9A14A] hover:text-[#4A2E2A] transition-colors duration-200 border-b border-transparent hover:border-[#C9A14A]"
          >
            View all
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {productsToShow.map((product, index) => (
            <FeaturedProductCard
              key={product.slug}
              product={product}
              priority={index < 3} // Prioritize first 3 images for above-the-fold
              className="featured-card"
            />
          ))}
        </div>

        {/* Show More Button (if not showing all) */}
        {!showAll && featuredProducts.length > 6 && (
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/collections/featured"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-[#C9A14A] text-[#4A2E2A] font-semibold rounded-xl hover:bg-[#C9A14A] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
            >
              <span>View More Featured Items</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
