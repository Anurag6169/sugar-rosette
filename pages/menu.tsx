'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MenuHeader from '../components/MenuHeader';
import MenuNavigation from '../components/MenuNavigation';
import MenuFilterBar from '../components/MenuFilterBar';
import MenuSection from '../components/MenuSection';
import { chocolates } from '../data/menu/chocolates';
import { hampers } from '../data/menu/hampers';
import { cakes } from '../data/menu/cakes';
import { bakery } from '../data/menu/bakery';

export default function Menu() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
      <Navbar />
      
      <main role="main">
        {/* Header */}
        <MenuHeader />
        
        {/* In-page Navigation */}
        <MenuNavigation />
        
        {/* Filter Bar */}
        <MenuFilterBar />
        
        {/* Chocolates Section */}
        <MenuSection
          id="chocolates"
          title="Chocolates"
          description="From single-origin bars to classic truffles."
          products={chocolates}
          collectionLink="/chocolates"
          learnMoreLink="#chocolate-guide"
        />
        
        {/* Hampers Section */}
        <MenuSection
          id="hampers"
          title="Hampers"
          description="Curated assortments for gifting."
          products={hampers}
          collectionLink="/hampers"
          learnMoreLink="#hamper-guide"
        />
        
        {/* Cakes Section */}
        <MenuSection
          id="cakes"
          title="Cakes"
          description="Handcrafted designer cakes."
          products={cakes}
          collectionLink="/cakes"
          learnMoreLink="#cake-guide"
        />
        
        {/* Bakery Section */}
        <MenuSection
          id="bakery"
          title="Bakery"
          description="Cookies, pastries, and more."
          products={bakery}
          collectionLink="/bakery"
          learnMoreLink="#bakery-guide"
        />
      </main>
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#C9A14A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
      
      <Footer />
    </div>
  );
}
