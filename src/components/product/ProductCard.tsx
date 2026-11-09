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
  const [imgError, setImgError] = useState(false);
  const fallback = getProductFallbackImage(product.category, product.slug);
  // Category and product-listing cards always use the stable Main Featured Image.
  const preferredImage = product.featuredImage || fallback;
  const initialDisplay = resolveProductImage(preferredImage, product.category, product.slug);
  const displayImage = imgError ? fallback : initialDisplay;

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
