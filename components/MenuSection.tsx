'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { MenuProduct } from '../data/menu/chocolates';

interface MenuSectionProps {
  id: string;
  title: string;
  description: string;
  products: MenuProduct[];
  collectionLink?: string;
  learnMoreLink?: string;
  className?: string;
}

export default function MenuSection({ 
  id, 
  title, 
  description, 
  products, 
  collectionLink,
  learnMoreLink,
  className = '' 
}: MenuSectionProps) {
  return (
    <section 
      id={id}
      className={`w-full py-12 sm:py-16 lg:py-20 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 
            id={`${id}-heading`}
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#4A2E2A] mb-4"
          >
            {title}
          </h2>
          <p className="text-base sm:text-lg text-[#4A2E2A]/80 max-w-2xl mx-auto mb-6">
            {description}
          </p>
          
          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {collectionLink && (
              <Link
                href={collectionLink}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#C9A14A] hover:text-[#4A2E2A] transition-colors duration-200 border-b border-transparent hover:border-[#C9A14A]"
              >
                View full collection
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
            
            {learnMoreLink && (
              <Link
                href={learnMoreLink}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#4A2E2A]/70 hover:text-[#4A2E2A] transition-colors duration-200"
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                imageUrl: product.imageUrl,
                categoryOrBrand: product.categoryOrBrand,
                currentPrice: product.currentPrice,
                mrp: product.mrp,
                currency: product.currency || 'INR',
                status: 'available',
                href: `/products/${product.slug}`,
                summary: product.description,
                facts: product.facts
              }}
              showTaxText={false}
              className="menu-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
