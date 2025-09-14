'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ComparisonSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function ComparisonSlider({
  beforeUrl,
  afterUrl,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt,
  className = '',
  priority = false
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [beforeImageError, setBeforeImageError] = useState(false);
  const [afterImageError, setAfterImageError] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log('ComparisonSlider images:', { beforeUrl, afterUrl, alt });
  }, [beforeUrl, afterUrl, alt]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // Snap to 0%, 50%, or 100% if close
    let snappedPercentage = percentage;
    if (percentage < 15) snappedPercentage = 0;
    else if (percentage > 35 && percentage < 65) snappedPercentage = 50;
    else if (percentage > 85) snappedPercentage = 100;
    
    setSliderPosition(snappedPercentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setSliderPosition(prev => Math.max(0, prev - 10));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setSliderPosition(prev => Math.min(100, prev + 10));
        break;
      case 'Home':
        e.preventDefault();
        setSliderPosition(0);
        break;
      case 'End':
        e.preventDefault();
        setSliderPosition(100);
        break;
      case 'Escape':
        e.preventDefault();
        sliderRef.current?.blur();
        break;
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <div className={`relative aspect-[4/3] sm:aspect-[3/2] overflow-hidden rounded-xl ${className}`}>
        <Image
          src={showAfter ? afterUrl : beforeUrl}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          unoptimized={true}
          onError={() => {
            console.error('Image failed to load:', showAfter ? afterUrl : beforeUrl);
            if (showAfter) {
              setAfterImageError(true);
            } else {
              setBeforeImageError(true);
            }
          }}
        />
        <button
          onClick={() => setShowAfter(!showAfter)}
          className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/90 text-[#4A2E2A] text-sm font-medium rounded-full border border-[#C9A14A]/30 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
          aria-label={`Show ${showAfter ? beforeLabel : afterLabel} view`}
        >
          Show {showAfter ? beforeLabel : afterLabel}
        </button>
        <div className="absolute top-4 left-4 px-2 py-1 bg-white/90 text-[#4A2E2A] text-xs font-medium rounded-full border border-[#C9A14A]/30">
          {showAfter ? afterLabel : beforeLabel}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative aspect-[4/3] sm:aspect-[3/2] overflow-hidden rounded-xl cursor-col-resize ${className}`}
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        {beforeImageError ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image unavailable</span>
          </div>
        ) : (
          <Image
            src={beforeUrl}
            alt={`${alt} - ${beforeLabel}`}
            fill
            className="object-cover"
            priority={priority}
            unoptimized={true}
            onError={() => {
              console.error('Before image failed to load:', beforeUrl);
              setBeforeImageError(true);
            }}
          />
        )}
        <div className="absolute top-4 left-4 px-2 py-1 bg-white/90 text-[#4A2E2A] text-xs font-medium rounded-full border border-[#C9A14A]/30">
          {beforeLabel}
        </div>
      </div>

      {/* After Image with Clip Path */}
      <div 
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {afterImageError ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image unavailable</span>
          </div>
        ) : (
          <Image
            src={afterUrl}
            alt={`${alt} - ${afterLabel}`}
            fill
            className="object-cover"
            priority={priority}
            unoptimized={true}
            onError={() => {
              console.error('After image failed to load:', afterUrl);
              setAfterImageError(true);
            }}
          />
        )}
        <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 text-[#4A2E2A] text-xs font-medium rounded-full border border-[#C9A14A]/30">
          {afterLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        ref={sliderRef}
        className="absolute top-0 bottom-0 w-1 bg-white/20 cursor-col-resize focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
        style={{ left: `${sliderPosition}%` }}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={sliderPosition}
        aria-label={`Compare views of ${alt}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-2 border-[#C9A14A] shadow-lg flex items-center justify-center">
          <div className="flex space-x-0.5">
            <div className="w-1 h-1 bg-[#C9A14A] rounded-full"></div>
            <div className="w-1 h-1 bg-[#C9A14A] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Overlay Gradient for Better Handle Visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent pointer-events-none" 
           style={{ 
             background: `linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 100%)` 
           }}>
      </div>
    </div>
  );
}
