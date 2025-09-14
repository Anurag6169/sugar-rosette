'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useScrollLock } from '../hooks/useScrollLock';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  category: string;
  type: 'product' | 'category';
}

const mockRecentSearches = [
  'Dark Chocolate',
  'Gift Hampers',
  'Birthday Cakes',
  'Neuhaus'
];

const mockCategories = [
  'Milk Chocolates',
  'Dark Chocolates',
  'White Chocolates',
  'Gift Hampers',
  'Birthday Cakes',
  'Artisan Bakery'
];

const mockResults: SearchResult[] = [
  { id: '1', title: 'Neuhaus Dark Collection', category: 'Dark Chocolates', type: 'product' },
  { id: '2', title: 'Premium Gift Hamper', category: 'Gift Hampers', type: 'product' },
  { id: '3', title: 'Artisan Chocolate Cake', category: 'Birthday Cakes', type: 'product' },
  { id: '4', title: 'Rhine Valley Milk Bar', category: 'Milk Chocolates', type: 'product' },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useFocusTrap({ active: isOpen });
  useScrollLock(isOpen);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle search results
  useEffect(() => {
    setShowResults(debouncedQuery.length > 0);
  }, [debouncedQuery]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Search query:', query);
      // In a real app, this would trigger a search
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    console.log('Selected result:', result);
    onClose();
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    console.log('Recent search selected:', search);
  };

  const handleCategoryClick = (category: string) => {
    console.log('Category selected:', category);
    onClose();
  };

  const filteredResults = debouncedQuery 
    ? mockResults.filter(result => 
        result.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        result.category.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : [];

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
    >
      {/* Visually hidden title for screen readers */}
      <h2 id="search-title" className="sr-only">Search Sugar Rosette</h2>
      
      <div className="w-full max-w-2xl mx-4 mt-20 bg-[#F7F3EE] rounded-2xl shadow-2xl border border-[#C9A14A]/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#C9A14A]/20">
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search chocolates, cakes, hampers..."
                  className="w-full px-4 py-3 pr-12 text-[#4A2E2A] placeholder-gray-500 bg-white border-2 border-[#C9A14A]/30 rounded-xl focus:outline-none focus:border-[#C9A14A] focus:ring-2 focus:ring-[#C9A14A]/20 transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-[#C9A14A] hover:text-[#4A2E2A] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 rounded-lg"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-[#4A2E2A] hover:text-[#C9A14A] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 rounded-lg"
            aria-label="Close search"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {!query ? (
            // Default state - recent searches and categories
            <div className="space-y-6">
              {/* Recent Searches */}
              <div>
                <h3 className="text-sm font-semibold text-[#4A2E2A] mb-3">Recent Searches</h3>
                <div className="space-y-2">
                  {mockRecentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="block w-full text-left px-3 py-2 text-gray-600 hover:text-[#4A2E2A] hover:bg-[#E8DFD6]/50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-1"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggested Categories */}
              <div>
                <h3 className="text-sm font-semibold text-[#4A2E2A] mb-3">Browse Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {mockCategories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className="text-left px-3 py-2 text-gray-600 hover:text-[#4A2E2A] hover:bg-[#E8DFD6]/50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-1"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : showResults ? (
            // Search results
            <div>
              {filteredResults.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[#4A2E2A] mb-3">
                    Results for "{debouncedQuery}"
                  </h3>
                  {filteredResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="block w-full text-left p-4 bg-white border border-[#C9A14A]/20 rounded-xl hover:border-[#C9A14A]/40 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-1"
                    >
                      <div className="font-medium text-[#4A2E2A]">{result.title}</div>
                      <div className="text-sm text-gray-500 mt-1">{result.category}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 mb-4">No results found for "{debouncedQuery}"</div>
                  <div className="text-sm text-gray-400">
                    Try searching for "chocolates", "cakes", or "hampers"
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
