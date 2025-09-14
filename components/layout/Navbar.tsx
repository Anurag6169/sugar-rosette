'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationConfig, isActiveLink } from './navigation-config';
import SearchModal from '../SearchModal';
import CartPanel from '../CartPanel';
import ProfileMenu from '../ProfileMenu';
import Drawer from '../Drawer';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname() || '';

  // Mock cart item count
  const cartItemCount = 3;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ease-out ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-[#4A2E2A]/10 border-b border-[#C9A14A]/15' 
            : 'bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-md shadow-sm shadow-[#4A2E2A]/5'
        } ${className}`}
        role="banner"
        style={{ width: '100%', maxWidth: '100vw' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Brand Logo - Left */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="group flex items-center space-x-3 text-xl lg:text-2xl font-serif font-bold transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 rounded-xl"
              >
                <div className="relative">
                  <span className="text-2xl lg:text-3xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">🍫</span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A14A] to-[#E8DFD6] rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="bg-gradient-to-r from-[#4A2E2A] via-[#6B3E3A] to-[#4A2E2A] bg-clip-text text-transparent group-hover:from-[#C9A14A] group-hover:via-[#E8DFD6] group-hover:to-[#C9A14A] transition-all duration-300">
                    Sugar Rosette
                  </span>
                  <span className="text-xs font-sans font-medium text-[#C9A14A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-1">
                    Premium Chocolates
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-1">
                {navigationConfig.mainLinks.map((item) => {
                  const isActive = isActiveLink(item.href, pathname);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group relative px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 rounded-xl ${
                        isActive
                          ? 'text-[#4A2E2A]'
                          : 'text-gray-700 hover:text-[#4A2E2A]'
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Hover background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F7F3EE] to-[#E8DFD6] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Animated gold underline */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                        <div className={`h-0.5 bg-gradient-to-r from-[#C9A14A] to-[#E8DFD6] rounded-full shadow-sm shadow-[#C9A14A]/40 transition-all duration-300 ease-out ${
                          isActive ? 'w-12 opacity-100' : 'w-0 opacity-0 group-hover:w-8 group-hover:opacity-100'
                        } motion-reduce:transition-none`}></div>
                      </div>
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Icon Cluster - Right */}
            <div className="flex items-center space-x-1 lg:space-x-2">
              
              {/* Search Icon */}
              <button
                onClick={openSearch}
                className="group relative p-2 rounded-xl text-[#4A2E2A] hover:text-[#C9A14A] hover:bg-[#F7F3EE] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
                aria-label="Search products"
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A14A] to-[#E8DFD6] rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
              </button>

              {/* Cart Icon */}
              <button
                onClick={openCart}
                className="group relative p-2 rounded-xl text-[#4A2E2A] hover:text-[#C9A14A] hover:bg-[#F7F3EE] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
                aria-label={`Shopping cart with ${cartItemCount} items`}
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                
                {/* Cart Badge */}
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#C9A14A] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A14A] to-[#E8DFD6] rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
              </button>

              {/* Profile Menu */}
              <ProfileMenu />

              {/* Mobile Hamburger */}
              <button
                onClick={toggleDrawer}
                className="lg:hidden group relative p-2 rounded-xl text-[#4A2E2A] hover:text-[#C9A14A] hover:bg-[#F7F3EE] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-drawer"
                aria-label="Toggle main menu"
              >
                <div className="relative w-5 h-5">
                  <span className={`absolute top-1 left-0 w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
                    isDrawerOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
                  }`}></span>
                  <span className={`absolute top-2.5 left-0 w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
                    isDrawerOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute top-4 left-0 w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
                    isDrawerOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'
                  }`}></span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A14A] to-[#E8DFD6] rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Overlays */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
      <CartPanel isOpen={isCartOpen} onClose={closeCart} itemCount={cartItemCount} />
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
}