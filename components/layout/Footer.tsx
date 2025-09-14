'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-[#1E1E1E] text-[#F7F3EE] ${className}`}>
      {/* Service Strip */}
      <div className="border-b border-[#C9A14A]/20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6">
            
            {/* Freshly Crafted */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-[#C9A14A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#C9A14A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F7F3EE]">Freshly Crafted</h3>
                <p className="text-xs text-[#F7F3EE]/70">Made to order daily</p>
              </div>
            </div>

            {/* Careful Packaging */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-[#C9A14A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#C9A14A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F7F3EE]">Careful Packaging</h3>
                <p className="text-xs text-[#F7F3EE]/70">Elegant presentation</p>
              </div>
            </div>

            {/* Citywide Delivery */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-[#C9A14A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#C9A14A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F7F3EE]">Citywide Delivery</h3>
                <p className="text-xs text-[#F7F3EE]/70">Same day available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold text-[#C9A14A] mb-3">
                Sugar Rosette
              </h2>
              <p className="text-[#F7F3EE]/80 leading-relaxed text-sm">
                Crafting premium confections with passion and precision. From artisan chocolates to elegant hampers, 
                we deliver moments of joy that celebrate life's sweetest occasions.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/sugarrosette"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#C9A14A]/10 rounded-full flex items-center justify-center hover:bg-[#C9A14A]/20 transition-all duration-300 ease-out group hover:-translate-y-1 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5 text-[#C9A14A] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                </svg>
              </a>
              
              <a
                href="https://facebook.com/sugarrosette"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#C9A14A]/10 rounded-full flex items-center justify-center hover:bg-[#C9A14A]/20 transition-all duration-300 ease-out group hover:-translate-y-1 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5 text-[#C9A14A] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a
                href="https://twitter.com/sugarrosette"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#C9A14A]/10 rounded-full flex items-center justify-center hover:bg-[#C9A14A]/20 transition-all duration-300 ease-out group hover:-translate-y-1 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5 text-[#C9A14A] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a
                href="https://linkedin.com/company/sugarrosette"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#C9A14A]/10 rounded-full flex items-center justify-center hover:bg-[#C9A14A]/20 transition-all duration-300 ease-out group hover:-translate-y-1 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
                aria-label="Connect with us on LinkedIn"
              >
                <svg className="w-5 h-5 text-[#C9A14A] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-serif font-semibold text-[#F7F3EE] mb-6 border-b border-[#C9A14A]/20 pb-2">
              Quick Links
            </h3>
            <nav className="space-y-3">
              <Link
                href="/collections"
                className="block text-[#F7F3EE]/80 hover:text-[#C9A14A] transition-all duration-300 ease-out text-sm hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                Collections
              </Link>
              <Link
                href="/corporate-gifting"
                className="block text-[#F7F3EE]/80 hover:text-[#C9A14A] transition-all duration-300 ease-out text-sm hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                Corporate Gifting
              </Link>
              <Link
                href="/about"
                className="block text-[#F7F3EE]/80 hover:text-[#C9A14A] transition-all duration-300 ease-out text-sm hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-[#F7F3EE]/80 hover:text-[#C9A14A] transition-all duration-300 ease-out text-sm hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                Contact
              </Link>
              <Link
                href="/products"
                className="block text-[#F7F3EE]/80 hover:text-[#C9A14A] transition-all duration-300 ease-out text-sm hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                All Products
              </Link>
            </nav>
          </div>

          {/* Collections */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-serif font-semibold text-[#F7F3EE] mb-6 border-b border-[#C9A14A]/20 pb-2">
              Collections
            </h3>
            <nav className="space-y-3">
              <Link
                href="/collections/chocolates"
                className="block text-[#F7F3EE]/80 hover:text-[#C9A14A] transition-all duration-300 ease-out text-sm hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                Premium Chocolates
              </Link>
              <Link
                href="/collections/hampers"
                className="block text-[#F7F3EE]/80 hover:text-[#C9A14A] transition-all duration-300 ease-out text-sm hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                Luxury Hampers
              </Link>
              <Link
                href="/collections/cakes"
                className="block text-[#F7F3EE]/80 hover:text-[#C9A14A] transition-all duration-300 ease-out text-sm hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                Artisan Cakes
              </Link>
              <Link
                href="/collections/bakery"
                className="block text-[#F7F3EE]/80 hover:text-[#C9A14A] transition-all duration-300 ease-out text-sm hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                Fresh Bakery
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-serif font-semibold text-[#F7F3EE] mb-6 border-b border-[#C9A14A]/20 pb-2">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-[#C9A14A] mt-0.5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-sm text-[#F7F3EE]/80">
                  <p>123 Artisan Lane</p>
                  <p>Mumbai, Maharashtra 400001</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-[#C9A14A] flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-sm text-[#F7F3EE]/80">
                  <a href="tel:+919876543210" className="hover:text-[#C9A14A] transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-[#C9A14A] flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-sm text-[#F7F3EE]/80">
                  <a href="mailto:hello@sugarrosette.com" className="hover:text-[#C9A14A] transition-colors">
                    hello@sugarrosette.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-[#C9A14A] mt-0.5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-sm text-[#F7F3EE]/80">
                  <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#C9A14A]/20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-[#F7F3EE]/60">
              © 2024 Sugar Rosette. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-[#F7F3EE]/60">
              <Link href="/privacy" className="hover:text-[#C9A14A] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#C9A14A] transition-colors">
                Terms of Service
              </Link>
              <Link href="/shipping" className="hover:text-[#C9A14A] transition-colors">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
