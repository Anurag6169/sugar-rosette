'use client';

import React, { useState } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useScrollLock } from '../hooks/useScrollLock';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: string;
  quantity: number;
  badges: string[];
}

const mockCartItems: CartItem[] = [
  {
    id: '1',
    title: 'Neuhaus Dark Collection 24pc',
    image: '/api/placeholder/80/80',
    price: '₹7,199',
    quantity: 1,
    badges: ['Premium', 'Gift Box']
  },
  {
    id: '2',
    title: 'Rhine Valley Milk Chocolate Bar',
    image: '/api/placeholder/80/80',
    price: '₹525',
    quantity: 2,
    badges: ['Best Seller']
  },
  {
    id: '3',
    title: 'Artisan Chocolate Cake',
    image: '/api/placeholder/80/80',
    price: '₹1,299',
    quantity: 1,
    badges: ['Custom']
  }
];

export default function CartPanel({ isOpen, onClose, itemCount }: CartPanelProps) {
  const [items, setItems] = useState<CartItem[]>(mockCartItems);
  const containerRef = useFocusTrap({ active: isOpen });
  useScrollLock(isOpen);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[₹,]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

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

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Panel */}
      <div
        ref={containerRef}
        className="relative w-full max-w-md h-full bg-[#F7F3EE] shadow-2xl border-l border-[#C9A14A]/20 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#C9A14A]/20 bg-white/50">
          <h2 id="cart-title" className="text-xl font-serif font-bold text-[#4A2E2A]">
            Shopping Cart ({itemCount})
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#4A2E2A] hover:text-[#C9A14A] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 rounded-lg"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl border border-[#C9A14A]/20">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#C9A14A] to-[#E8DFD6] rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🍫</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#4A2E2A] mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.badges.map((badge, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-0.5 text-xs font-medium bg-[#C9A14A]/20 text-[#4A2E2A] rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#4A2E2A]">{item.price}</span>
                      
                      <div className="flex items-center gap-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#C9A14A]/30 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-[#4A2E2A] hover:text-[#C9A14A] focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-1 rounded-l-lg"
                            aria-label={`Decrease quantity of ${item.title}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          
                          <span className="px-3 py-1.5 text-sm font-medium text-[#4A2E2A] min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-[#4A2E2A] hover:text-[#C9A14A] focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-1 rounded-r-lg"
                            aria-label={`Increase quantity of ${item.title}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded-lg"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-medium text-[#4A2E2A] mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some delicious chocolates to get started!</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#C9A14A] text-white font-semibold rounded-xl hover:bg-[#B8953F] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#C9A14A]/20 bg-white/50 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-lg font-semibold text-[#4A2E2A]">
              <span>Subtotal:</span>
              <span>{formatPrice(calculateSubtotal())}</span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={onClose}
                className="w-full px-6 py-3 border-2 border-[#C9A14A] text-[#4A2E2A] font-semibold rounded-xl hover:bg-[#C9A14A] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
              >
                Continue Browsing
              </button>
              
              <button
                disabled
                className="w-full px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-xl cursor-not-allowed focus:outline-none"
                aria-label="Proceed to checkout (feature not available in showcase)"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
