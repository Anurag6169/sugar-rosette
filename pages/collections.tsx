'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from "../components/layout/Navbar";
import CategoryTiles from "../components/CategoryTiles";
import OccasionsStrip from "../components/OccasionsStrip";

export default function Collections() {
  const searchParams = useSearchParams();
  const occasion = searchParams.get('occasion');

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-20 lg:pt-24 pb-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4A2E2A] mb-4">
            Our Collections
          </h1>
          <p className="text-lg sm:text-xl text-[#4A2E2A]/80 max-w-2xl mx-auto">
            {occasion 
              ? `Discover our premium collection for ${occasion.replace('_', ' ')}`
              : 'Browse our complete range of artisanal confections'
            }
          </p>
        </div>
      </section>

      {/* Occasions Strip */}
      <OccasionsStrip />
      
      {/* Category Tiles */}
      <CategoryTiles occasion={occasion || undefined} />
      
      {/* Coming Soon Section */}
      <main className="pt-20">
        <section className="py-20 px-4 w-full">
          <div className="max-w-6xl mx-auto text-center w-full">
            <h2 className="text-4xl font-serif font-bold text-[#4A2E2A] mb-8">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600">
              We're crafting something special for you. Stay tuned for our premium collection launch.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
