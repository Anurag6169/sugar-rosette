'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface OccasionsStripProps {
  className?: string;
}

interface Occasion {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

const occasions: Occasion[] = [
  {
    id: 'birthday',
    label: 'Birthday',
    emoji: '🎂',
    description: 'Celebrate with sweet treats'
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    emoji: '💕',
    description: 'Mark special moments'
  },
  {
    id: 'festive',
    label: 'Festive',
    emoji: '🎉',
    description: 'Holiday celebrations'
  },
  {
    id: 'corporate',
    label: 'Corporate',
    emoji: '🏢',
    description: 'Business gifts & events'
  },
  {
    id: 'weddings',
    label: 'Weddings',
    emoji: '💒',
    description: 'Wedding cakes & favors'
  }
];

export default function OccasionsStrip({ className = '' }: OccasionsStripProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeOccasion, setActiveOccasion] = useState<string | null>(
    searchParams.get('occasion')
  );

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handle scroll
  const handleScroll = () => {
    checkScrollPosition();
  };

  // Handle occasion selection
  const handleOccasionClick = (occasionId: string) => {
    setActiveOccasion(occasionId);
    
    // Map occasions to specific pages
    const occasionPages: { [key: string]: string } = {
      'birthday': '/collections/birthday',
      'anniversary': '/collections/anniversary',
      'festive': '/collections?occasion=festive',
      'corporate': '/corporate-gifting',
      'weddings': '/collections?occasion=weddings'
    };
    
    const page = occasionPages[occasionId];
    if (page) {
      router.push(page);
    } else {
      // Fallback to generic collections page with occasion filter
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set('occasion', occasionId);
      router.push(`/collections?${current.toString()}`);
    }
  };

  // Handle clear selection
  const handleClearSelection = () => {
    setActiveOccasion(null);
    router.push('/collections');
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, occasionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOccasionClick(occasionId);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <section className={`py-8 sm:py-12 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A2E2A] mb-2">
            Shop by Occasion
          </h2>
          <p className="text-sm sm:text-base text-[#4A2E2A]/80 max-w-2xl mx-auto">
            Find the perfect treats for every special moment
          </p>
        </div>

        {/* Scrollable Occasions Container */}
        <div className="relative">
          
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur-sm border border-[#C9A14A]/20 rounded-full shadow-lg hover:bg-white hover:border-[#C9A14A]/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 text-[#4A2E2A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur-sm border border-[#C9A14A]/20 rounded-full shadow-lg hover:bg-white hover:border-[#C9A14A]/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4 text-[#4A2E2A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Occasions Strip */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory py-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Clear Selection Option */}
            <button
              onClick={handleClearSelection}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClearSelection();
                }
              }}
              className={`group flex-shrink-0 flex flex-col items-center justify-center p-4 sm:p-6 min-w-[120px] sm:min-w-[140px] rounded-2xl border-2 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 ${
                !activeOccasion
                  ? 'bg-[#C9A14A] border-[#C9A14A] text-white shadow-lg shadow-[#C9A14A]/25'
                  : 'bg-white border-[#E8DFD6] text-[#4A2E2A] hover:border-[#C9A14A] hover:shadow-md'
              }`}
              aria-label="Clear occasion selection"
            >
              <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                ✨
              </div>
              <span className="text-xs sm:text-sm font-semibold text-center leading-tight">
                All Occasions
              </span>
            </button>

            {/* Occasion Chips */}
            {occasions.map((occasion, index) => (
              <button
                key={occasion.id}
                onClick={() => handleOccasionClick(occasion.id)}
                onKeyDown={(e) => handleKeyDown(e, occasion.id)}
                className={`group flex-shrink-0 flex flex-col items-center justify-center p-4 sm:p-6 min-w-[120px] sm:min-w-[140px] rounded-2xl border-2 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 ${
                  activeOccasion === occasion.id
                    ? 'bg-[#C9A14A] border-[#C9A14A] text-white shadow-lg shadow-[#C9A14A]/25'
                    : 'bg-white border-[#E8DFD6] text-[#4A2E2A] hover:border-[#C9A14A] hover:shadow-md'
                }`}
                aria-label={`Filter by ${occasion.label} - ${occasion.description}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}
              >
                {/* Emoji */}
                <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {occasion.emoji}
                </div>
                
                {/* Label */}
                <span className="text-xs sm:text-sm font-semibold text-center leading-tight">
                  {occasion.label}
                </span>
                
                {/* Hover Description (hidden on small screens) */}
                <span className="hidden sm:block text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 leading-tight">
                  {occasion.description}
                </span>
              </button>
            ))}
          </div>

          {/* Scroll Indicator Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.ceil(occasions.length / 2) }).map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-[#E8DFD6] transition-colors duration-200"
              />
            ))}
          </div>
        </div>

        {/* Active Occasion Info */}
        {activeOccasion && (
          <div className="text-center mt-6">
            <div className="inline-flex items-center px-4 py-2 bg-[#F7F3EE] border border-[#C9A14A]/20 rounded-full">
              <span className="text-sm font-medium text-[#4A2E2A] mr-2">
                Showing results for:
              </span>
              <span className="text-sm font-semibold text-[#C9A14A]">
                {occasions.find(o => o.id === activeOccasion)?.label}
              </span>
              <button
                onClick={handleClearSelection}
                className="ml-2 p-1 text-[#4A2E2A]/60 hover:text-[#4A2E2A] transition-colors duration-200"
                aria-label="Clear filter"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
