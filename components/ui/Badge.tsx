'use client';

import React from 'react';
import { BadgeProps } from '../../types/product';

export default function Badge({ 
  children, 
  className = '', 
  variant = 'default' 
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border transition-colors duration-200';
  
  const variantClasses = {
    default: 'bg-[#F7F3EE] text-[#4A2E2A] border-[#C9A14A]/30 hover:border-[#C9A14A]/50',
    accent: 'bg-[#C9A14A]/10 text-[#C9A14A] border-[#C9A14A]/40 hover:border-[#C9A14A]/60',
    muted: 'bg-[#E8DFD6] text-[#4A2E2A]/70 border-[#4A2E2A]/20 hover:border-[#4A2E2A]/30'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
