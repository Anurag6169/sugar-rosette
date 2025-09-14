'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductCardProps } from '../types/product';
import { formatPrice, isOnSale, formatDiscountPercent } from '../utils/price';

export default function ProductCard({
  product,
  className = '',
  showTaxText = false,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const isDisabled = product.status === 'sold_out';
  const onSale = isOnSale(product.currentPrice, product.mrp);
  const discountPercent = product.mrp ? formatDiscountPercent(product.currentPrice, product.mrp) : '';
  const href = product.href || `/products/${product.slug}`;

  return (
    <article 
      className={`group relative bg-[#F7F3EE] rounded-xl border border-[#1E1E1E]/10 shadow-sm hover:shadow-xl focus-within:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 active:scale-[0.98] motion-reduce:active:scale-100 ${isDisabled ? 'opacity-80' : ''} ${className}`}
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      <Link
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A14A] focus-visible:ring-offset-4 focus-visible:ring-offset-white rounded-xl"
        aria-label={`View ${product.name}`}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
      >
        
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-xl">
          {imageLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8DFD6] to-[#F7F3EE] animate-pulse" />
          )}
          
          {!imageError ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] group-focus-within:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100 ${isDisabled ? 'opacity-80' : ''}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              unoptimized={true}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8DFD6] to-[#F7F3EE] flex items-center justify-center">
              <span className="text-lg font-semibold text-[#4A2E2A]">
                {product.name.split(' ').map(word => word.charAt(0)).join('').slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Sold Out Badge */}
          {isDisabled && (
            <div className="absolute top-2 right-2 bg-[#4A2E2A] text-white px-2 py-1 rounded-full text-xs font-medium">
              Sold Out
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          
          {/* Category/Brand Label */}
          <div className="mb-1">
            <span className="text-xs font-medium text-[#4A2E2A]/70 tracking-wide uppercase">
              {product.categoryOrBrand}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-medium text-[#4A2E2A] mb-2 leading-tight line-clamp-2">
            {product.name}
          </h3>

          {/* Price Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Current Price */}
              <span className="text-base sm:text-lg font-semibold text-[#1E1E1E]">
                {formatPrice(product.currentPrice, product.currency)}
              </span>
              
              {/* MRP (if on sale) */}
              {onSale && product.mrp && (
                <span className="text-sm text-[#4A2E2A]/60 line-through">
                  {formatPrice(product.mrp, product.currency)}
                </span>
              )}
            </div>
            
            {/* Discount Badge */}
            {onSale && (
              <span className="text-xs font-semibold text-[#C9A14A] bg-[#C9A14A]/10 px-2 py-1 rounded-full border border-[#C9A14A]/20">
                {discountPercent}
              </span>
            )}
          </div>

          {/* Tax Text (optional) */}
          {showTaxText && (
            <div className="mt-1">
              <span className="text-xs text-[#4A2E2A]/60">
                inclusive of taxes
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </article>
  );
}

// Skeleton Component
export function ProductCardSkeleton({ className = '' }: { className?: string }) {
  return (
    <article className={`bg-[#F7F3EE] rounded-xl border border-[#1E1E1E]/10 shadow-sm animate-pulse ${className}`}>
      {/* Image Skeleton */}
      <div className="aspect-square bg-gradient-to-br from-[#E8DFD6] to-[#F7F3EE] rounded-t-xl" />
      
      {/* Content Skeleton */}
      <div className="p-3 sm:p-4">
        {/* Category skeleton */}
        <div className="h-3 bg-[#E8DFD6] rounded w-1/3 mb-2" />
        
        {/* Name skeleton */}
        <div className="space-y-1 mb-3">
          <div className="h-4 bg-[#E8DFD6] rounded w-full" />
          <div className="h-4 bg-[#E8DFD6] rounded w-2/3" />
        </div>
        
        {/* Price skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-[#E8DFD6] rounded w-1/4" />
          <div className="h-4 bg-[#E8DFD6] rounded w-1/6" />
        </div>
      </div>
    </article>
  );
}