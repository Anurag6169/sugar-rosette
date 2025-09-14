'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterGroup } from '../data/collections';

interface FilterBarProps {
  filters: FilterGroup[];
  className?: string;
}

export default function FilterBar({ filters, className = '' }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (filterKey: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (value === 'all') {
      current.delete(filterKey);
    } else {
      current.set(filterKey, value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    
    router.push(`${window.location.pathname}${query}`, { scroll: false });
  };

  const getActiveFilter = (filterKey: string) => {
    return searchParams.get(filterKey) || 'all';
  };

  return (
    <div className={`sticky top-20 lg:top-24 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E8DFD6] shadow-sm ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Filter Groups */}
            <div className="flex flex-wrap items-center gap-6">
              {filters.map((filterGroup) => (
                <div key={filterGroup.key} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[#4A2E2A]/70 whitespace-nowrap">
                    {filterGroup.label}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {filterGroup.options.map((option) => {
                      const isActive = getActiveFilter(filterGroup.key) === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => updateFilter(filterGroup.key, option.value)}
                          className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 active:scale-95 motion-reduce:active:scale-100
                            ${isActive
                              ? 'bg-[#C9A14A] text-white border-[#C9A14A] shadow-lg hover:shadow-xl'
                              : 'bg-white text-[#4A2E2A] border-[#E8DFD6] hover:border-[#C9A14A]/50 hover:bg-[#F7F3EE] hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0'
                            }`}
                          aria-label={`Filter by ${option.label}`}
                          aria-pressed={isActive}
                        >
                          <span>{option.label}</span>
                          {option.count && (
                            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full
                              ${isActive 
                                ? 'bg-white/20 text-white' 
                                : 'bg-[#E8DFD6] text-[#4A2E2A]/70'
                              }`}>
                              {option.count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-2 text-sm text-[#4A2E2A]/70">
              <span>Showing</span>
              <span className="font-medium text-[#4A2E2A]">
                {filters[0]?.options.find(opt => getActiveFilter('type') === opt.value)?.count || 0}
              </span>
              <span>products</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
