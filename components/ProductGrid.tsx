'use client';

import React from 'react';
import ProductCard, { ProductCardSkeleton } from './ProductCard';
import { Product } from '../types/product';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  className?: string;
}

export default function ProductGrid({ 
  products, 
  loading = false, 
  className = '' 
}: ProductGridProps) {
  
  if (loading) {
    return (
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-[#E8DFD6] rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-[#4A2E2A]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-semibold text-[#4A2E2A] mb-2">
            No products found
          </h3>
          <p className="text-[#4A2E2A]/70 mb-6 max-w-md mx-auto">
            Try adjusting your filters to see more products in this collection.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-[#C9A14A] text-white font-medium rounded-lg hover:bg-[#E8DFD6] hover:text-[#4A2E2A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
          >
            Clear Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showTaxText={true}
          />
        ))}
      </div>
    </div>
  );
}
