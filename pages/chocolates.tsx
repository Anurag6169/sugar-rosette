'use client';

import React from 'react';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import { sampleProducts } from "../data/products";

export default function Chocolates() {
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
            Premium Chocolates
          </h1>
          <p className="text-lg sm:text-xl text-[#4A2E2A]/80 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted chocolates, made with the finest ingredients and traditional techniques
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {/* Premium Chocolate Products */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {sampleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showTaxText={true}
                  />
                ))}
              </div>

            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}