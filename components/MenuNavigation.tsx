'use client';

import React, { useState, useEffect } from 'react';

interface MenuNavigationProps {
  className?: string;
}

const sections = [
  { id: 'chocolates', label: 'Chocolates' },
  { id: 'hampers', label: 'Hampers' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'bakery', label: 'Bakery' }
];

export default function MenuNavigation({ className = '' }: MenuNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('chocolates');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Account for navbar height - taller on mobile
      const offsetTop = element.offsetTop - 120; // Increased offset for mobile navbar
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Set focus to the section heading for screen readers
      setTimeout(() => {
        const heading = document.getElementById(`${sectionId}-heading`);
        if (heading) {
          heading.focus();
        }
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180; // Increased offset for mobile navbar
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-20 lg:top-16 z-20 bg-white/95 backdrop-blur-sm border-b border-[#E8DFD6] ${className}`}
      aria-label="Menu sections navigation"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 py-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              onKeyDown={(e) => handleKeyDown(e, section.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 ${
                activeSection === section.id
                  ? 'bg-[#C9A14A] text-white shadow-sm'
                  : 'text-[#4A2E2A] hover:bg-[#F7F3EE] hover:text-[#C9A14A]'
              }`}
              aria-label={`Jump to ${section.label} section`}
              aria-current={activeSection === section.id ? 'true' : 'false'}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
