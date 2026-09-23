'use client';

import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onOpenSizeGuide: () => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
  onOpenSizeGuide,
}: SizeSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-stone-900 uppercase tracking-wider">
          Size: <span className="font-normal text-stone-600">{selectedSize}</span>
        </span>
        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="text-stone-700 underline font-medium hover:text-stone-950 transition"
        >
          View Size Guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = size === selectedSize;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`min-w-[48px] h-11 px-4 text-xs font-semibold rounded-lg border transition-all ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                  : 'bg-white text-stone-800 border-stone-300 hover:border-stone-900'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
