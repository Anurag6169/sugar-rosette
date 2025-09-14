'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FilterBar from '../../components/FilterBar';
import ProductGrid from '../../components/ProductGrid';
import { sampleProducts } from '../../data/products';

// Filter products for anniversary celebrations
const anniversaryProducts = sampleProducts.filter(product => 
  product.tags?.includes('Anniversary') ||
  product.name.toLowerCase().includes('anniversary') ||
  product.name.toLowerCase().includes('romantic') ||
  product.categoryOrBrand.toLowerCase().includes('luxury') ||
  (product.currentPrice >= 1000 && product.currentPrice <= 8000) // Anniversary gift price range
);

export default function AnniversaryCollection() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
      <Navbar />
      
      <main role="main">
        {/* Hero Section */}
        <section className="pt-20 lg:pt-24 pb-8">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4A2E2A] mb-4">
              Anniversary Celebrations
            </h1>
            <p className="text-lg sm:text-xl text-[#4A2E2A]/80 max-w-2xl mx-auto">
              Celebrate love and togetherness with our elegant anniversary collection
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <FilterBar />

        {/* Products Grid */}
        <section className="pb-20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid products={anniversaryProducts} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
