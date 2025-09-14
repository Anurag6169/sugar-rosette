'use client';

import React from 'react';
import Link from 'next/link';
import { Category, CategoryCardProps, CategoryTilesProps } from '../types/category';
import { categories } from '../data/categories';

// CategoryCard subcomponent
function CategoryCard({ category, className = '', occasion }: CategoryCardProps) {
  const href = occasion 
    ? `${category.href}?occasion=${encodeURIComponent(occasion)}`
    : category.href;

  return (
    <Link
      href={href}
      className={`group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A14A] focus-visible:ring-offset-4 focus-visible:ring-offset-white rounded-xl overflow-hidden ${className}`}
      aria-label={`Explore ${category.title} collection`}
    >
      <div className="relative bg-[#F7F3EE] rounded-xl border border-[#1E1E1E]/10 shadow-sm hover:shadow-xl focus-within:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 active:scale-[0.98] motion-reduce:active:scale-100">
        
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.08] group-focus-within:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100"
            style={{ backgroundImage: `url(${category.image})` }}
          />
          
          {/* Overlay Gradient for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
          
          {/* Gold accent border on hover/focus */}
          <div className="absolute inset-0 border border-transparent group-hover:border-[#C9A14A]/30 group-focus-within:border-[#C9A14A]/30 transition-colors duration-300" />
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Title with gold underline animation */}
          <h3 className="relative text-lg sm:text-xl font-serif font-bold text-[#4A2E2A] mb-2 group-hover:text-[#C9A14A] transition-colors duration-300">
            {category.title}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A14A] transition-all duration-300 ease-out group-hover:w-full"></span>
          </h3>
          
          {/* Description */}
          <p className="text-sm sm:text-base text-[#4A2E2A]/80 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

// Main CategoryTiles component
export default function CategoryTiles({ className = '', occasion }: CategoryTilesProps) {
  return (
    <section 
      className={`w-full py-12 sm:py-16 lg:py-20 overflow-x-hidden ${className}`}
      aria-labelledby="category-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 id="category-heading" className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4A2E2A] mb-4">
            Our Collections
          </h2>
          <p className="text-lg sm:text-xl text-[#4A2E2A]/80 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated selection of premium confections
          </p>
          
          {/* Decorative separator */}
          <div className="flex justify-center items-center mt-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#C9A14A]"></div>
            <div className="w-3 h-3 bg-[#C9A14A] rounded-full mx-4"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#C9A14A]"></div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              category={category}
              occasion={occasion}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animation: 'slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/collections"
            className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-[#C9A14A] text-[#4A2E2A] font-semibold rounded-xl hover:bg-[#C9A14A] hover:text-white transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 group"
          >
            <span>View All Collections</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
