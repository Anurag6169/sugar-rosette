'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types/product';

interface SimilarProductsProps {
  currentProduct: Product;
  allProducts: Product[];
  className?: string;
}

export default function SimilarProducts({ 
  currentProduct, 
  allProducts, 
  className = '' 
}: SimilarProductsProps) {
  
  // Find similar products based on category, tags, and price range
  const getSimilarProducts = (): Product[] => {
    const similarProducts = allProducts
      .filter(product => product.id !== currentProduct.id && product.status === 'available')
      .map(product => {
        let score = 0;
        
        // Same category/brand gets highest score
        if (product.categoryOrBrand === currentProduct.categoryOrBrand) {
          score += 10;
        }
        
        // Similar price range (within 50% of current price)
        const priceDiff = Math.abs(product.currentPrice - currentProduct.currentPrice);
        const avgPrice = (product.currentPrice + currentProduct.currentPrice) / 2;
        const priceSimilarity = 1 - (priceDiff / avgPrice);
        if (priceSimilarity > 0.5) {
          score += 5;
        }
        
        // Common tags
        if (currentProduct.tags && product.tags) {
          const commonTags = currentProduct.tags.filter(tag => 
            product.tags!.includes(tag)
          ).length;
          score += commonTags * 3;
        }
        
        // Common badges
        if (currentProduct.badges && product.badges) {
          const commonBadges = currentProduct.badges.filter(badge => 
            product.badges!.includes(badge)
          ).length;
          score += commonBadges * 2;
        }
        
        return { ...product, similarityScore: score };
      })
      .sort((a, b) => (b as any).similarityScore - (a as any).similarityScore)
      .slice(0, 4); // Show top 4 similar products
    
    return similarProducts;
  };

  const similarProducts = getSimilarProducts();

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2E2A] mb-4">
            You May Also Like
          </h2>
          <p className="text-[#4A2E2A]/70 max-w-2xl mx-auto">
            Discover more premium chocolates and confections that match your taste
          </p>
        </div>

        {/* Similar Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {similarProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showTaxText={true}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <a
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-[#C9A14A] text-[#4A2E2A] font-semibold rounded-xl hover:bg-[#C9A14A] hover:text-white transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 group"
          >
            <span>View All Products</span>
            <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
