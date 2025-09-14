'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { sampleProducts } from '../data/products';

interface PeopleAlsoViewedProps {
  currentProduct: any;
  className?: string;
}

export default function PeopleAlsoViewed({ currentProduct, className = '' }: PeopleAlsoViewedProps) {
  // Get similar products based on category, price range, and brand
  const getSimilarProducts = (product: any) => {
    const similarProducts = sampleProducts.filter(p => {
      if (p.id === product.id) return false;
      if (p.status === 'sold_out') return false;
      
      // Same category/brand gets highest priority
      if (p.categoryOrBrand === product.categoryOrBrand) return true;
      
      // Similar price range (±30%)
      const priceRange = product.currentPrice * 0.3;
      const priceSimilar = Math.abs(p.currentPrice - product.currentPrice) <= priceRange;
      
      // Similar product type (chocolate, cake, etc.)
      const productType = product.name.toLowerCase();
      const similarType = p.name.toLowerCase();
      const typeSimilar = productType.includes('chocolate') && similarType.includes('chocolate') ||
                         productType.includes('cake') && similarType.includes('cake') ||
                         productType.includes('truffle') && similarType.includes('truffle');
      
      return priceSimilar || typeSimilar;
    });

    // Sort by relevance: same category first, then by price similarity
    return similarProducts.sort((a, b) => {
      const aSameCategory = a.categoryOrBrand === product.categoryOrBrand ? 1 : 0;
      const bSameCategory = b.categoryOrBrand === product.categoryOrBrand ? 1 : 0;
      
      if (aSameCategory !== bSameCategory) {
        return bSameCategory - aSameCategory;
      }
      
      // Then by price similarity
      const aPriceDiff = Math.abs(a.currentPrice - product.currentPrice);
      const bPriceDiff = Math.abs(b.currentPrice - product.currentPrice);
      return aPriceDiff - bPriceDiff;
    }).slice(0, 4);
  };

  const similarProducts = getSimilarProducts(currentProduct);

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <section 
      className={`w-full py-12 sm:py-16 lg:py-20 ${className}`}
      aria-labelledby="people-also-viewed-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 id="people-also-viewed-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#4A2E2A] mb-4">
            People Also Viewed
          </h2>
          <p className="text-base sm:text-lg text-[#4A2E2A]/80 max-w-2xl mx-auto">
            Customers who viewed this item also explored these products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {similarProducts.map((product) => (
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
