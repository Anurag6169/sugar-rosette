'use client';

import React from 'react';
import Navbar from "../components/layout/Navbar";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import { sampleProducts } from "../data/products";

export default function Products() {
  const [loading, setLoading] = React.useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-20 lg:pt-24 pb-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4A2E2A] mb-4">
            Our Products
          </h1>
          <p className="text-lg sm:text-xl text-[#4A2E2A]/80 max-w-2xl mx-auto">
            Discover our premium collection of artisanal confections, crafted with love and attention to detail
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {sampleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showRating={true}
                  showTags={true}
                  showMicrocopy={true}
                />
              ))}
            </div>
          )}

          {/* Showcase Different States */}
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-[#4A2E2A] mb-8 text-center">
              Component States Showcase
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Available Product */}
              <ProductCard
                product={sampleProducts[0]}
                showRating={true}
                showTags={true}
                showMicrocopy={true}
              />

              {/* Coming Soon Product */}
              <ProductCard
                product={sampleProducts[4]}
                showRating={true}
                showTags={true}
                showMicrocopy={true}
              />

              {/* Out of Stock Product */}
              <ProductCard
                product={sampleProducts[5]}
                showRating={true}
                showTags={true}
                showMicrocopy={true}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
