'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { getProductFallbackImage, resolveProductImage } from '@/lib/images';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedColorName, setSelectedColorName] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const selectedColor = selectedColorName
    ? product.colors.find((c) => c.name === selectedColorName) || null
    : null;

  const fallback = getProductFallbackImage(product.category, product.slug);
  // Start on the Main Featured Image; switch to the selected colour's image when a swatch is clicked.
  const preferredImage =
    (selectedColor && selectedColor.images?.[0]) || product.featuredImage || fallback;
  const initialDisplay = resolveProductImage(preferredImage, product.category, product.slug);
  const displayImage = imgError ? fallback : initialDisplay;

  const handleSelectColor = (colorName: string) => {
    setImgError(false);
    setSelectedColorName((prev) => (prev === colorName ? null : colorName));
  };

  return (
    <div className="group flex flex-col bg-[#00736a] rounded-xl overflow-hidden border border-[#00736a]/30 hover:border-[#00736a] transition-all duration-300 hover:shadow-md">
      {/* Product Image Container */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square w-full bg-stone-50 overflow-hidden block">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          onError={() => setImgError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain object-center p-2.5 group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {!product.inStock ? (
          <span className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
            Out of Stock
          </span>
        ) : product.compareAtPrice && product.compareAtPrice > product.price ? (
          <span className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Sale
          </span>
        ) : null}
      </Link>

      {/* Product Info (Brand Green #00736a with White Typography) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#00736a] text-white">
        <div>
          <Link
            href={`/shop/${product.category}`}
            className="inline-block text-xs uppercase tracking-wider text-white/80 hover:text-white font-bold transition-colors"
          >
            {product.categoryName}
          </Link>
          <Link
            href={`/product/${product.slug}`}
            className="block font-semibold text-base sm:text-lg text-white hover:text-white/90 transition line-clamp-2 mt-1"
          >
            {product.name}
          </Link>
        </div>

        {/* Interactive Color Swatch Previews */}
        {product.colors.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {product.colors.map((color) => {
              const isSelected = selectedColorName === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => handleSelectColor(color.name)}
                  className={`w-5 h-5 rounded-full border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isSelected
                      ? 'border-white ring-2 ring-white ring-offset-1 ring-offset-[#00736a] scale-110 opacity-100'
                      : 'border-white/60 opacity-85 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={`Preview ${color.name}`}
                  aria-label={`Preview ${product.name} in ${color.name}`}
                  aria-pressed={isSelected}
                />
              );
            })}
            <span className="text-xs text-white/85 pl-1 font-medium truncate">
              {selectedColor ? selectedColor.name : `${product.colors.length} colors`}
            </span>
          </div>
        )}

        {/* Price Row */}
        <div className="flex items-baseline space-x-2 pt-2 border-t border-white/20">
          <span className="font-black text-white text-lg sm:text-xl">
            £{product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-white/70 line-through">
              £{product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
