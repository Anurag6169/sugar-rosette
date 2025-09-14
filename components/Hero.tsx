'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  className?: string;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  backgroundImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Handmade Artisan Chocolates',
    subtitle: 'Premium Belgian chocolates crafted with passion',
    description: 'Experience the finest ingredients from around the world.',
    primaryCta: { text: 'Shop Chocolates', href: '/chocolates' },
    secondaryCta: { text: 'View Collections', href: '/collections' },
    backgroundImage: 'https://picsum.photos/1920/1080?random=chocolate-hero'
  },
  {
    id: 2,
    title: 'Cakes for All Occasions',
    subtitle: 'Custom celebration cakes and artisan desserts',
    description: 'From birthdays to weddings, we craft the perfect centerpiece.',
    primaryCta: { text: 'Browse Cakes', href: '/cakes' },
    secondaryCta: { text: 'Custom Orders', href: '/custom' },
    backgroundImage: 'https://picsum.photos/1920/1080?random=cake-hero'
  },
  {
    id: 3,
    title: 'Curated Luxury Hampers',
    subtitle: 'Elegant gift collections for special moments',
    description: 'Thoughtfully curated hampers for every celebration.',
    primaryCta: { text: 'Explore Hampers', href: '/hampers' },
    secondaryCta: { text: 'Corporate Gifting', href: '/corporate-gifting' },
    backgroundImage: 'https://picsum.photos/1920/1080?random=hamper-hero'
  }
];

export default function Hero({ className = '' }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <section 
      className={`relative w-full h-[40vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden mt-16 lg:mt-20 ${className}`}
      role="banner"
      aria-label="Hero carousel showcasing premium confections"
      style={{ width: '100%', maxWidth: '100vw' }}
    >
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
            aria-hidden={index !== currentSlide}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <Image
                src={slide.backgroundImage}
                alt={`${slide.title} - ${slide.subtitle}`}
                fill
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                priority={index === 0}
                unoptimized={true}
              />
              
              {/* Overlay Gradient for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex items-center justify-center h-full min-h-0">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="max-w-4xl mx-auto text-center py-2 sm:py-0 w-full">
                  
                  {/* Main Heading */}
                  <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-2 sm:mb-6 leading-tight">
                    {slide.title.split(' ').map((word, wordIndex) => (
                      <span key={wordIndex} className="block">
                        {word}
                        {word === 'Confections' && (
                          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-[#C9A14A] to-[#E8DFD6] rounded-full"></span>
                        )}
                      </span>
                    ))}
                  </h1>

                  {/* Subheading */}
                  <p className="text-xs sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-2 sm:mb-6 max-w-3xl mx-auto leading-relaxed font-light">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-base md:text-lg text-white/80 mb-3 sm:mb-8 max-w-2xl mx-auto">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center max-w-sm sm:max-w-md mx-auto">
                    
                    {/* Primary CTA */}
                    <Link
                      href={slide.primaryCta.href}
                      className="group relative w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-[#C9A14A] to-[#E8DFD6] text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-[#C9A14A]/25 hover:shadow-xl hover:shadow-[#C9A14A]/30 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 focus:ring-offset-transparent min-h-[40px] sm:min-h-[56px] flex items-center justify-center text-xs sm:text-base"
                    >
                      <span className="relative z-10">{slide.primaryCta.text}</span>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#E8DFD6] to-[#C9A14A] rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                      </div>
                    </Link>

                    {/* Secondary CTA */}
                    <Link
                      href={slide.secondaryCta.href}
                      className="group w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent min-h-[40px] sm:min-h-[56px] flex items-center justify-center backdrop-blur-sm text-xs sm:text-base"
                    >
                      <span className="relative z-10">{slide.secondaryCta.text}</span>
                      
                      {/* Subtle shine effect */}
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons - Hidden on mobile */}
        <button
          onClick={goToPrevious}
          className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Pagination */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
                index === currentSlide 
                  ? 'bg-[#C9A14A] scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 z-20 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
