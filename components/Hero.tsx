'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
    backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#F7F3EE;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#E8DFD6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#D4C4B0;stop-opacity:1" />
          </linearGradient>
          <pattern id="chocolatePattern1" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="8" fill="#4A2E2A" opacity="0.1"/>
            <circle cx="80" cy="30" r="6" fill="#C9A14A" opacity="0.15"/>
            <circle cx="40" cy="70" r="10" fill="#6B3E3A" opacity="0.08"/>
            <circle cx="90" cy="80" r="5" fill="#C9A14A" opacity="0.12"/>
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#bgGradient1)"/>
        <rect width="1920" height="1080" fill="url(#chocolatePattern1)"/>
      </svg>
    `)}')`
  },
  {
    id: 2,
    title: 'Cakes for All Occasions',
    subtitle: 'Custom celebration cakes and artisan desserts',
    description: 'From birthdays to weddings, we craft the perfect centerpiece.',
    primaryCta: { text: 'Browse Cakes', href: '/cakes' },
    secondaryCta: { text: 'Custom Orders', href: '/custom' },
    backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4A2E2A;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#6B3E3A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4A2E2A;stop-opacity:1" />
          </linearGradient>
          <pattern id="chocolatePattern2" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="12" fill="#C9A14A" opacity="0.2"/>
            <circle cx="90" cy="40" r="8" fill="#E8DFD6" opacity="0.15"/>
            <circle cx="50" cy="90" r="15" fill="#C9A14A" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#bgGradient2)"/>
        <rect width="1920" height="1080" fill="url(#chocolatePattern2)"/>
      </svg>
    `)}')`
  },
  {
    id: 3,
    title: 'Curated Luxury Hampers',
    subtitle: 'Elegant gift collections for special moments',
    description: 'Thoughtfully curated hampers for every celebration.',
    primaryCta: { text: 'Explore Hampers', href: '/hampers' },
    secondaryCta: { text: 'Corporate Gifting', href: '/corporate-gifting' },
    backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#E8DFD6;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#F7F3EE;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#D4C4B0;stop-opacity:1" />
          </linearGradient>
          <pattern id="chocolatePattern3" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="6" fill="#4A2E2A" opacity="0.12"/>
            <circle cx="60" cy="25" r="4" fill="#C9A14A" opacity="0.18"/>
            <circle cx="35" cy="55" r="8" fill="#6B3E3A" opacity="0.1"/>
            <circle cx="65" cy="60" r="5" fill="#C9A14A" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#bgGradient3)"/>
        <rect width="1920" height="1080" fill="url(#chocolatePattern3)"/>
      </svg>
    `)}')`
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
      className={`relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden ${className}`}
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
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                style={{ backgroundImage: slide.backgroundImage }}
              />
              
              {/* Overlay Gradient for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                  
                  {/* Main Heading */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight">
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
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed font-light">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-sm sm:max-w-md mx-auto">
                    
                    {/* Primary CTA */}
                    <Link
                      href={slide.primaryCta.href}
                      className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#C9A14A] to-[#E8DFD6] text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg shadow-[#C9A14A]/25 hover:shadow-xl hover:shadow-[#C9A14A]/30 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 focus:ring-offset-transparent min-h-[48px] sm:min-h-[56px] flex items-center justify-center text-sm sm:text-base"
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
                      className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent min-h-[48px] sm:min-h-[56px] flex items-center justify-center backdrop-blur-sm text-sm sm:text-base"
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

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
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
