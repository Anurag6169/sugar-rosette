'use client';

import React from 'react';
import Link from 'next/link';
import ComparisonSlider from '../media/ComparisonSlider';

interface FeaturedProductCardProps {
  product: {
    slug: string;
    name: string;
    categoryOrBrand: string;
    currentPrice?: number;
    mrp?: number;
    currency?: string;
    beforeImageUrl: string;
    afterImageUrl: string;
    beforeLabel?: string;
    afterLabel?: string;
    meta?: string;
    tags?: string[];
  };
  priority?: boolean;
  className?: string;
}

export default function FeaturedProductCard({ 
  product, 
  priority = false, 
  className = '' 
}: FeaturedProductCardProps) {
  const isOnSale = product.mrp && product.currentPrice && product.mrp > product.currentPrice;
  const discountPercent = product.mrp && product.currentPrice 
    ? Math.round(((product.mrp - product.currentPrice) / product.mrp) * 100)
    : 0;

  return (
    <article 
      className={`group relative bg-[#F7F3EE] rounded-xl border border-[#1E1E1E]/10 shadow-sm hover:shadow-xl focus-within:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 active:scale-[0.98] motion-reduce:active:scale-100 ${className}`}
      role="article"
      aria-label={`Featured product: ${product.name}`}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A14A] focus-visible:ring-offset-4 focus-visible:ring-offset-white rounded-xl"
        aria-label={`View ${product.name}`}
      >
        {/* Comparison Slider Media */}
        <div className="relative overflow-hidden">
          <ComparisonSlider
            beforeUrl={product.beforeImageUrl}
            afterUrl={product.afterImageUrl}
            beforeLabel={product.beforeLabel}
            afterLabel={product.afterLabel}
            alt={product.name}
            priority={priority}
            className="w-full"
          />
          
          {/* Sale Badge */}
          {isOnSale && (
            <div className="absolute top-3 right-3 bg-[#C9A14A] text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
              -{discountPercent}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Category/Brand Label */}
          <div className="text-xs font-medium text-[#4A2E2A]/70 uppercase tracking-wide mb-2">
            {product.categoryOrBrand}
          </div>

          {/* Product Name */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#4A2E2A] mb-3 line-clamp-2 group-hover:text-[#C9A14A] transition-colors duration-300">
            {product.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A14A] transition-all duration-300 ease-out group-hover:w-full"></span>
          </h3>

          {/* Price Row */}
          {product.currentPrice && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-semibold text-[#4A2E2A]">
                ₹{product.currentPrice.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.currentPrice && (
                <>
                  <span className="text-sm text-[#4A2E2A]/60 line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs bg-[#C9A14A]/10 text-[#C9A14A] px-2 py-0.5 rounded-full">
                    Save ₹{(product.mrp - product.currentPrice).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>
          )}

          {/* Meta Line */}
          {product.meta && (
            <div className="text-sm text-[#4A2E2A]/70 mb-3">
              {product.meta}
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium bg-[#E8DFD6] text-[#4A2E2A] rounded-full border border-[#C9A14A]/20"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-[#E8DFD6] text-[#4A2E2A]/60 rounded-full border border-[#C9A14A]/20">
                  +{product.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
