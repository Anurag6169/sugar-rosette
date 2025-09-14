'use client';

import React from 'react';
import { featuredBlocks } from '../data/featured';
import FeaturedBlock from './FeaturedBlock';

interface FeaturedCollectionsProps {
  className?: string;
}

export default function FeaturedCollections({ className = '' }: FeaturedCollectionsProps) {
  return (
    <section className={`relative w-full py-16 sm:py-20 lg:py-24 overflow-x-hidden ${className}`}>
      {/* Subtle Background Panel */}
      <div className="absolute inset-0 bg-[#F7F3EE]/50" />
      
      {/* Background Motif Layer */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A14A] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#4A2E2A] rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4A2E2A] mb-4">
            Featured Collections
          </h2>
          <p className="text-lg sm:text-xl text-[#4A2E2A]/80 max-w-2xl mx-auto leading-relaxed">
            Discover our most coveted selections, crafted with exceptional attention to detail
          </p>
          
          {/* Decorative Separator */}
          <div className="flex justify-center items-center mt-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#C9A14A]"></div>
            <div className="w-3 h-3 bg-[#C9A14A] rounded-full mx-4"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#C9A14A]"></div>
          </div>
        </div>

        {/* Mobile-First Grid Layout */}
        <div className="space-y-6 sm:space-y-8">
          {/* Mobile: Stack all blocks vertically */}
          <div className="block sm:hidden space-y-6">
            {featuredBlocks.map((block, index) => (
              <div
                key={block.id}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animation: 'slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}
              >
                <FeaturedBlock block={block} />
              </div>
            ))}
          </div>

          {/* Desktop: Complex grid layout */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Large Featured Block */}
            <div 
              className="sm:col-span-2 lg:col-span-2"
              style={{ 
                animationDelay: '0ms',
                animation: 'slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              <FeaturedBlock block={featuredBlocks[0]} />
            </div>

            {/* Medium Block */}
            <div 
              className="sm:col-span-2 lg:col-span-1"
              style={{ 
                animationDelay: '200ms',
                animation: 'slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              <FeaturedBlock block={featuredBlocks[1]} />
            </div>

            {/* Medium Block */}
            <div 
              className="sm:col-span-2 lg:col-span-1"
              style={{ 
                animationDelay: '400ms',
                animation: 'slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              <FeaturedBlock block={featuredBlocks[2]} />
            </div>

            {/* Small Blocks */}
            <div 
              className="sm:col-span-1"
              style={{ 
                animationDelay: '600ms',
                animation: 'slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              <FeaturedBlock block={featuredBlocks[3]} />
            </div>

            <div 
              className="sm:col-span-1"
              style={{ 
                animationDelay: '800ms',
                animation: 'slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              <FeaturedBlock block={featuredBlocks[4]} />
            </div>
          </div>
        </div>

        {/* Optional Call-to-Action */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-sm text-[#4A2E2A]/60 mb-4">
            Can't find what you're looking for?
          </p>
          <a
            href="/collections"
            className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-[#C9A14A] text-[#4A2E2A] font-semibold rounded-xl hover:bg-[#C9A14A] hover:text-white transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 group"
          >
            <span>View All Collections</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
