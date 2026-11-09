'use client';

import React from 'react';
import { ProductColorVariant } from '@/types';
import { Check } from 'lucide-react';

interface ColorSwatchPickerProps {
  colors: ProductColorVariant[];
  selectedColor?: string | null;
  onSelectColor: (colorName: string) => void;
  onResetColor?: () => void;
}

export function ColorSwatchPicker({
  colors,
  selectedColor,
  onSelectColor,
  onResetColor,
}: ColorSwatchPickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-semibold text-stone-900 uppercase tracking-wider">
          Color:{' '}
          {selectedColor ? (
            <span className="font-bold text-stone-900">{selectedColor}</span>
          ) : (
            <span className="font-normal text-stone-500 italic">Select a colour</span>
          )}
        </span>
        {selectedColor && onResetColor && (
          <button
            type="button"
            onClick={onResetColor}
            className="text-[11px] font-medium text-stone-500 hover:text-stone-950 underline underline-offset-2 transition-colors cursor-pointer"
          >
            Reset to Main Image
          </button>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {colors.map((color) => {
          const isSelected = selectedColor?.toLowerCase() === color.name.toLowerCase();
          const isWhiteOrLight =
            color.hex.toLowerCase() === '#ffffff' ||
            color.hex.toLowerCase() === '#eae0d5' ||
            color.hex.toLowerCase() === '#d8c7b5';

          return (
            <button
              key={color.name}
              type="button"
              onClick={() => {
                // If already selected, clicking it again resets back to Main Featured Image
                if (isSelected && onResetColor) {
                  onResetColor();
                } else {
                  onSelectColor(color.name);
                }
              }}
              className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isSelected
                  ? 'ring-2 ring-stone-950 ring-offset-2 scale-110 shadow-sm'
                  : 'hover:scale-105 opacity-85 hover:opacity-100'
              } border ${isWhiteOrLight ? 'border-stone-300' : 'border-stone-200'}`}
              style={{ backgroundColor: color.hex }}
              title={isSelected ? `Click to deselect ${color.name}` : `Select ${color.name}`}
              aria-label={`Select ${color.name} color`}
            >
              {isSelected && (
                <Check
                  className={`w-4 h-4 ${
                    isWhiteOrLight ? 'text-stone-950' : 'text-white'
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
