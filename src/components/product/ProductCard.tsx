'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const activeVariant = product.colors[activeColorIndex] || product.colors[0];
  const displayImage = activeVariant?.images[0] || product.featuredImage;

  return (
    <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-400/80 transition-all duration-300 hover:shadow-md">
      {/* Product Image Container */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square w-full bg-stone-100 overflow-hidden block">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="absolute top-3 left-3 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Sale
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
            {product.categoryName}
          </span>
          <Link
            href={`/product/${product.slug}`}
            className="block font-medium text-sm text-stone-900 group-hover:text-stone-700 transition line-clamp-2 mt-0.5"
          >
            {product.name}
          </Link>
        </div>

        {/* Color Swatch Previews */}
        {product.colors.length > 1 && (
          <div className="flex items-center space-x-1.5 pt-1">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveColorIndex(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  idx === activeColorIndex
                    ? 'ring-2 ring-stone-900 ring-offset-1 scale-110'
                    : 'border-stone-300 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`View ${color.name} variant`}
              />
            ))}
            <span className="text-[10px] text-stone-400 pl-1">
              {product.colors.length} colors
            </span>
          </div>
        )}

        {/* Price Row */}
        <div className="flex items-baseline space-x-2 pt-1 border-t border-stone-100">
          <span className="font-bold text-stone-950 text-base">
            £{product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-stone-400 line-through">
              £{product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
