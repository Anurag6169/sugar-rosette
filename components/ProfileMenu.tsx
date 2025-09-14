'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ProfileMenuProps {
  isAuthenticated?: boolean;
  userName?: string;
}

interface MenuItem {
  label: string;
  href: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function ProfileMenu({ isAuthenticated = false, userName }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const menuItems: MenuItem[] = [
    {
      label: isAuthenticated ? 'Account' : 'Sign In',
      href: isAuthenticated ? '/account' : '/signin',
      onClick: () => console.log(isAuthenticated ? 'Account clicked' : 'Sign in clicked')
    },
    {
      label: isAuthenticated ? 'Sign Out' : 'Create Account',
      href: isAuthenticated ? '/signout' : '/signup',
      onClick: () => console.log(isAuthenticated ? 'Sign out clicked' : 'Create account clicked')
    },
    {
      label: 'Orders',
      href: '/orders',
      disabled: !isAuthenticated,
      onClick: () => console.log('Orders clicked')
    },
    {
      label: 'Saved Items',
      href: '/saved',
      disabled: !isAuthenticated,
      onClick: () => console.log('Saved items clicked')
    }
  ];

  const filteredMenuItems = menuItems.filter(item => !item.disabled);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          triggerRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => (prev + 1) % filteredMenuItems.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => prev <= 0 ? filteredMenuItems.length - 1 : prev - 1);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredMenuItems.length) {
            const item = filteredMenuItems[focusedIndex];
            item.onClick?.();
            setIsOpen(false);
            setFocusedIndex(-1);
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, focusedIndex, filteredMenuItems]);

  // Focus management
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
      if (menuItems && menuItems[focusedIndex]) {
        (menuItems[focusedIndex] as HTMLElement).focus();
      }
    }
  }, [isOpen, focusedIndex]);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0);
    }
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
    }
  };

  const handleMenuItemClick = (item: MenuItem) => {
    item.onClick?.();
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleMenuItemKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const item = filteredMenuItems[index];
      handleMenuItemClick(item);
    }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        className="group relative p-2 rounded-xl text-[#4A2E2A] hover:text-[#C9A14A] hover:bg-[#F7F3EE] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
      >
        {/* Profile Icon */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#C9A14A] to-[#E8DFD6] rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#C9A14A]/20 py-2 z-50"
          role="menu"
          aria-label="User menu"
        >
          {/* User greeting for authenticated users */}
          {isAuthenticated && userName && (
            <div className="px-4 py-2 border-b border-[#C9A14A]/20">
              <div className="text-sm font-medium text-[#4A2E2A]">
                Hello, {userName}
              </div>
            </div>
          )}

          {/* Menu Items */}
          {filteredMenuItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => handleMenuItemClick(item)}
              onKeyDown={(e) => handleMenuItemKeyDown(e, index)}
              className={`w-full text-left px-4 py-2 text-sm text-[#4A2E2A] hover:bg-[#F7F3EE] hover:text-[#C9A14A] focus:outline-none focus:bg-[#F7F3EE] focus:text-[#C9A14A] transition-colors duration-200 ${
                index === 0 ? 'rounded-t-xl' : ''
              } ${index === filteredMenuItems.length - 1 ? 'rounded-b-xl' : ''}`}
              role="menuitem"
              tabIndex={-1}
            >
              {item.label}
            </button>
          ))}

          {/* Disabled items for unauthenticated users */}
          {!isAuthenticated && (
            <>
              <div className="border-t border-[#C9A14A]/20 my-1"></div>
              <div className="px-4 py-2 text-sm text-gray-400 cursor-not-allowed">
                Orders
              </div>
              <div className="px-4 py-2 text-sm text-gray-400 cursor-not-allowed rounded-b-xl">
                Saved Items
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
