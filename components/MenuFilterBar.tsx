'use client';

import React, { useRef, useEffect } from 'react';

interface MenuFilterBarProps {
  className?: string;
}

export default function MenuFilterBar({ className = '' }: MenuFilterBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = React.useState(false);
  const [showRightButton, setShowRightButton] = React.useState(false);

  const filterGroups = [
    {
      key: 'type',
      label: 'Type',
      options: [
        { value: 'chocolates', label: 'Chocolates' },
        { value: 'hampers', label: 'Hampers' },
        { value: 'cakes', label: 'Cakes' },
        { value: 'bakery', label: 'Bakery' },
      ]
    },
    {
      key: 'flavor',
      label: 'Flavor',
      options: [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'mint', label: 'Mint' },
      ]
    },
    {
      key: 'occasion',
      label: 'Occasion',
      options: [
        { value: 'birthday', label: 'Birthday' },
        { value: 'anniversary', label: 'Anniversary' },
        { value: 'festive', label: 'Festive' },
        { value: 'corporate', label: 'Corporate' },
      ]
    },
    {
      key: 'dietary',
      label: 'Dietary',
      options: [
        { value: 'eggless', label: 'Eggless' },
        { value: 'no-sugar', label: 'No Added Sugar' },
        { value: 'gluten-free', label: 'Gluten Free' },
      ]
    },
    {
      key: 'sort',
      label: 'Sort',
      options: [
        { value: 'a-z', label: 'A-Z' },
        { value: 'price', label: 'Price' },
        { value: 'popular', label: 'Popular' },
      ]
    }
  ];

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftButton(container.scrollLeft > 0);
    setShowRightButton(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
      
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  return (
    <div className={`relative bg-white border-b border-[#E8DFD6] sticky top-20 lg:top-16 z-30 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scroll buttons for mobile */}
        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white border border-[#E8DFD6] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
            aria-label="Scroll filters left"
          >
            <svg className="w-4 h-4 text-[#4A2E2A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        {showRightButton && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white border border-[#E8DFD6] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
            aria-label="Scroll filters right"
          >
            <svg className="w-4 h-4 text-[#4A2E2A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Filter Groups */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-6 py-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filterGroups.map((filterGroup) => (
            <div key={filterGroup.key} className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm font-medium text-[#4A2E2A]/70 whitespace-nowrap">
                {filterGroup.label}:
              </span>
              <div className="flex gap-2">
                {filterGroup.options.map((option) => (
                  <button
                    key={option.value}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 active:scale-95 motion-reduce:active:scale-100 bg-white text-[#4A2E2A] border-[#E8DFD6] hover:border-[#C9A14A]/50 hover:bg-[#F7F3EE] hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0"
                    aria-label={`Filter by ${option.label}`}
                    disabled
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
