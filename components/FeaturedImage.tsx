'use client';

import React from 'react';
import Image from 'next/image';

interface FeaturedImageProps {
  src: string;
  alt: string;
  aspect: 'square' | 'tall' | 'wide';
  className?: string;
}

const aspectRatios = {
  square: 'aspect-square',
  tall: 'aspect-[3/4]',
  wide: 'aspect-[4/3]',
} as const;

export default function FeaturedImage({ src, alt, aspect, className = '' }: FeaturedImageProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${aspectRatios[aspect]} ${className}`}>
      {/* Background Image with Next.js Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] group-focus-within:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      
      {/* Overlay Gradient for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
      
      {/* Fine Gold Border on Hover/Focus */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[#C9A14A]/30 group-focus-within:border-[#C9A14A]/30 transition-colors duration-300" />
    </div>
  );
}
