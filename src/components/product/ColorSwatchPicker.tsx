'use client';

import React from 'react';
import { ProductColorVariant } from '@/types';
import { Check } from 'lucide-react';

interface ColorSwatchPickerProps {
  colors: ProductColorVariant[];
  selectedColor: string;
  onSelectColor: (colorName: string) => void;
}

export function ColorSwatchPicker({
  colors,
  selectedColor,
  onSelectColor,
}: ColorSwatchPickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-stone-900 uppercase tracking-wider">
          Color: <span className="font-normal text-stone-600">{selectedColor}</span>
        </span>
      </div>

      <div className="flex items-center space-x-3">
        {colors.map((color) => {
          const isSelected = color.name === selectedColor;
          const isWhiteOrLight = color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase() === '#eae0d5';

          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onSelectColor(color.name)}
              className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isSelected
                  ? 'ring-2 ring-stone-900 ring-offset-2 scale-105'
                  : 'hover:scale-105 opacity-90 hover:opacity-100'
              } border ${isWhiteOrLight ? 'border-stone-300' : 'border-transparent'}`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            >
              {isSelected && (
                <Check
                  className={`w-4 h-4 ${
                    isWhiteOrLight ? 'text-stone-900' : 'text-white'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
