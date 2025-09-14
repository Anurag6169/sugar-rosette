'use client';

import React from 'react';

interface MenuHeaderProps {
  className?: string;
}

export default function MenuHeader({ className = '' }: MenuHeaderProps) {
  return (
    <header className={`w-full pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4A2E2A] mb-4">
          Menu
        </h1>
        <p className="text-lg sm:text-xl text-[#4A2E2A]/80 max-w-2xl mx-auto mb-6">
          Explore our chocolates, hampers, cakes, and bakery selection.
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-[#F7F3EE] border border-[#E8DFD6] rounded-full">
          <svg className="w-4 h-4 text-[#C9A14A] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-[#4A2E2A]/70">
            For orders and custom hampers, enquire via{' '}
            <a 
              href="/contact" 
              className="text-[#C9A14A] hover:text-[#4A2E2A] transition-colors duration-200 underline"
            >
              Contact
            </a>
          </span>
        </div>
      </div>
    </header>
  );
}
