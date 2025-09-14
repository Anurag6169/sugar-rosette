'use client';

import React from 'react';
import Link from 'next/link';
import { FeaturedBlock as FeaturedBlockType } from '../data/featured';

interface FeaturedBlockProps {
  block: FeaturedBlockType;
  className?: string;
}

const layoutClasses = {
  large: 'h-[300px] sm:h-[400px] lg:h-[500px]',
  medium: 'h-[250px] sm:h-[300px] lg:h-[350px]',
  small: 'h-[200px] sm:h-[250px] lg:h-[300px]',
};

const titleSizes = {
  large: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl',
  medium: 'text-lg sm:text-xl lg:text-2xl xl:text-3xl',
  small: 'text-base sm:text-lg lg:text-xl xl:text-2xl',
};

export default function FeaturedBlock({ block, className = '' }: FeaturedBlockProps) {
  return (
    <Link
      href={block.cta.href}
      className={`group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A14A] focus-visible:ring-offset-4 focus-visible:ring-offset-white rounded-2xl overflow-hidden ${className}`}
      role="link"
      aria-label={block.ariaLabel}
    >
      <div className={`relative bg-[#F7F3EE] rounded-2xl border border-[#1E1E1E]/10 shadow-sm hover:shadow-lg focus-within:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 ${layoutClasses[block.layout]}`}>
        
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <img
            src={block.image}
            alt={block.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] group-focus-within:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100"
          />
          
          {/* Overlay Gradient for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
          
          {/* Fine Gold Border on Hover/Focus */}
          <div className="absolute inset-0 border border-transparent group-hover:border-[#C9A14A]/30 group-focus-within:border-[#C9A14A]/30 transition-colors duration-300 rounded-2xl" />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-6 xl:p-8">
          <div className="relative z-10">
            
            {/* Category Badge */}
            <div className="inline-block px-3 py-1.5 sm:px-4 bg-white/90 backdrop-blur-sm border border-white/40 rounded-full mb-2 sm:mb-3 shadow-lg">
              <span className="text-xs font-semibold text-[#4A2E2A]">{block.category}</span>
            </div>
            
            {/* Title with Gold Underline Animation */}
            <h3 className={`relative ${titleSizes[block.layout]} font-serif font-bold text-white mb-1 sm:mb-2 group-hover:text-[#F7F3EE] transition-colors duration-300 leading-tight`}>
              {block.title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A14A] transition-all duration-300 ease-out group-hover:w-full"></span>
            </h3>
            
            {/* Copy */}
            <p className="text-xs sm:text-sm lg:text-base text-white/90 mb-1 sm:mb-2 group-hover:text-white/100 transition-colors duration-300 leading-relaxed line-clamp-2">
              {block.copy}
            </p>
            
            {/* Optional Subcopy */}
            {block.subcopy && (
              <p className="text-xs text-white/80 mb-2 sm:mb-3 group-hover:text-white/90 transition-colors duration-300">
                {block.subcopy}
              </p>
            )}
            
            {/* CTA Button */}
            <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 lg:px-4 bg-[#C9A14A] text-white font-semibold rounded-lg shadow-lg group-hover:bg-[#E8DFD6] group-hover:text-[#4A2E2A] transition-all duration-300 ease-out text-xs sm:text-sm lg:text-base">
              <span className="mr-1 sm:mr-2">{block.cta.text}</span>
              <svg 
                className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
