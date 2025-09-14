'use client';

import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard, { ProductCardSkeleton } from '../components/ProductCard';
import { sampleProducts } from '../data/products';

// Filter products for hampers (luxury gift collections)
const hamperProducts = sampleProducts.filter(product => 
  product.categoryOrBrand.toLowerCase().includes('luxury') ||
  product.name.toLowerCase().includes('collection') ||
  product.name.toLowerCase().includes('gift') ||
  product.currentPrice > 2000 // Higher value items typically in hampers
);

export default function Hampers() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
      <Navbar />
      
      <main role="main">
        {/* Hero Section */}
        <section className="pt-20 lg:pt-24 pb-8">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4A2E2A] mb-4">
              Luxury Gift Hampers
            </h1>
            <p className="text-lg sm:text-xl text-[#4A2E2A]/80 max-w-2xl mx-auto">
              Thoughtfully curated hampers for every celebration and special occasion
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {hamperProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showTaxText={true}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
