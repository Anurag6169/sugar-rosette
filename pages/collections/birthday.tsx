'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FilterBar from '../../components/FilterBar';
import ProductGrid from '../../components/ProductGrid';
import { sampleProducts } from '../../data/products';

// Filter products for birthday celebrations
const birthdayProducts = sampleProducts.filter(product => 
  product.tags?.includes('Birthday') ||
  product.name.toLowerCase().includes('birthday') ||
  product.name.toLowerCase().includes('celebration') ||
  product.categoryOrBrand.toLowerCase().includes('cake') ||
  (product.currentPrice >= 500 && product.currentPrice <= 5000) // Birthday gift price range
);

export default function BirthdayCollection() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
      <Navbar />
      
      <main role="main">
        {/* Hero Section */}
        <section className="pt-20 lg:pt-24 pb-8">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4A2E2A] mb-4">
              Birthday Celebrations
            </h1>
            <p className="text-lg sm:text-xl text-[#4A2E2A]/80 max-w-2xl mx-auto">
              Make their special day unforgettable with our curated birthday collection
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <FilterBar />

        {/* Products Grid */}
        <section className="pb-20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid products={birthdayProducts} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
