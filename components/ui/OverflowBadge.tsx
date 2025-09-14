'use client';

import React from 'react';
import { OverflowBadgeProps } from '../../types/product';

export default function OverflowBadge({ count, className = '' }: OverflowBadgeProps) {
  return (
    <span 
      className={`inline-flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-semibold bg-[#4A2E2A] text-white rounded-full border border-[#4A2E2A] ${className}`}
      title={`${count} more items`}
      aria-label={`${count} additional items`}
    >
      +{count}
    </span>
  );
}
