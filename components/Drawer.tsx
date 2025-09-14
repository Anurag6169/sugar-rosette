'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useScrollLock } from '../hooks/useScrollLock';
import { navigationConfig, isActiveLink } from './layout/navigation-config';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const pathname = usePathname();
  const containerRef = useFocusTrap({ active: isOpen });
  useScrollLock(isOpen);

  // Handle aria-hidden for main content
  useEffect(() => {
    const mainContent = document.querySelector('main, [role="main"]');
    if (mainContent) {
      if (isOpen) {
        mainContent.setAttribute('aria-hidden', 'true');
      } else {
        mainContent.removeAttribute('aria-hidden');
      }
    }

    return () => {
      if (mainContent) {
        mainContent.removeAttribute('aria-hidden');
      }
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  };

  const handleCallClick = () => {
    console.log('Call button clicked');
    // In a real app, this would initiate a phone call
    window.open('tel:+91-1800-120-2278', '_self');
  };

  const handleWhatsAppClick = () => {
    console.log('WhatsApp button clicked');
    // In a real app, this would open WhatsApp
    const message = encodeURIComponent('Hi! I\'d like to know more about Sugar Rosette products.');
    window.open(`https://wa.me/918001202278?text=${message}`, '_blank');
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      onClick={handleOverlayClick}
    >
      {/* Overlay with backdrop blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Drawer sliding from left */}
      <div
        ref={containerRef}
        className={`absolute left-0 top-0 w-80 max-w-[85vw] h-full bg-[#F7F3EE] shadow-2xl border-r border-[#C9A14A]/20 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#C9A14A]/20 bg-white/50">
          <h2 id="drawer-title" className="text-xl font-serif font-bold text-[#4A2E2A]">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-3 text-[#4A2E2A] hover:text-[#C9A14A] hover:bg-[#F7F3EE] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 rounded-xl"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links - Large tap targets */}
        <nav className="flex-1 overflow-y-auto p-4" aria-label="Main navigation">
          <div className="space-y-1">
            {navigationConfig.mainLinks.map((item, index) => {
              const isActive = isActiveLink(item.href, pathname);
              
              return (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={`group block px-5 py-5 rounded-2xl text-base font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 min-h-[56px] flex items-center ${
                      isActive
                        ? 'text-[#4A2E2A] bg-gradient-to-r from-[#F7F3EE] to-[#E8DFD6] border-l-4 border-[#C9A14A] shadow-lg shadow-[#C9A14A]/20'
                        : 'text-[#4A2E2A] hover:bg-gradient-to-r hover:from-[#F7F3EE] hover:to-[#E8DFD6] hover:shadow-md'
                    }`}
                    onClick={onClose}
                    style={{ 
                      animationDelay: `${index * 60}ms`,
                      animation: isOpen ? 'slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
                    }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    </div>
                  </Link>
                  
                  {/* Elegant separator */}
                  {index < navigationConfig.mainLinks.length - 1 && (
                    <div className="flex items-center justify-center py-2" style={{ 
                      animationDelay: `${(index + 1) * 60}ms`,
                      animation: isOpen ? 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
                    }}>
                      <div className="flex items-center space-x-2 w-full max-w-[200px]">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A14A]/30 to-transparent"></div>
                        <div className="w-1.5 h-1.5 bg-[#C9A14A]/40 rounded-full"></div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C9A14A]/30 to-transparent"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Enquire Button */}
          <div className="pt-6 mt-6">
            <Link
              href={navigationConfig.ctaButton.href}
              className="group relative block w-full px-6 py-5 bg-gradient-to-r from-[#C9A14A] to-[#E8DFD6] text-white font-semibold rounded-2xl shadow-lg shadow-[#C9A14A]/25 hover:shadow-xl hover:shadow-[#C9A14A]/30 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 min-h-[56px] flex items-center justify-center"
              onClick={onClose}
              style={{ 
                animationDelay: `${navigationConfig.mainLinks.length * 60}ms`,
                animation: isOpen ? 'slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none'
              }}
            >
              <span className="relative z-10 text-center">{navigationConfig.ctaButton.name}</span>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#E8DFD6] to-[#C9A14A] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
              </div>
            </Link>
          </div>
        </nav>

        {/* Bottom Section with Call/WhatsApp - Separated by gold border */}
        <div className="border-t border-[#C9A14A] bg-white/50 p-4 space-y-3">
          <div className="text-center text-sm text-[#4A2E2A] mb-4">
            <p className="font-medium">Need Help?</p>
            <p className="text-gray-600">We're here to assist you</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Call Button */}
            <button
              onClick={handleCallClick}
              className="group flex items-center justify-center px-4 py-4 bg-[#4A2E2A] text-white font-semibold rounded-xl hover:bg-[#6B3E3A] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 min-h-[56px]"
              aria-label="Call Sugar Rosette"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call</span>
            </button>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="group flex items-center justify-center px-4 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#128C7E] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 min-h-[56px]"
              aria-label="WhatsApp Sugar Rosette"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>WhatsApp</span>
            </button>
          </div>
          
          <div className="text-center text-xs text-gray-500 pt-2">
            <p>1800-120-2278</p>
            <p>Available 9 AM - 9 PM</p>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
