'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { ColorSwatchPicker } from '@/components/product/ColorSwatchPicker';
import { SizeSelector } from '@/components/product/SizeSelector';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { ProductCard } from '@/components/product/ProductCard';
import { ShoppingBag, Truck, ShieldCheck, Check, Sparkles, BookOpen } from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedColorName, setSelectedColorName] = useState(
    product.colors[0]?.name || 'Default'
  );
  const [selectedSize, setSelectedSize] = useState(
    product.availableSizes[0] || 'M'
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  // Find images for the active colorway
  const activeColorVariant =
    product.colors.find((c) => c.name === selectedColorName) ||
    product.colors[0];
  
  const currentImages =
    activeColorVariant && activeColorVariant.images.length > 0
      ? activeColorVariant.images
      : [product.featuredImage];

  const currentDisplayImage = currentImages[activeImageIndex] || currentImages[0];

  const handleColorChange = (colorName: string) => {
    setSelectedColorName(colorName);
    setActiveImageIndex(0); // Reset to first photo of new color
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      size: selectedSize,
      color: selectedColorName,
      image: currentDisplayImage,
      quantity: 1,
    });

    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 2000);
  };

  return (
    <div className="space-y-20">
      {/* Top Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Gallery / Images Column */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
            <Image
              src={currentDisplayImage}
              alt={`${product.name} - ${selectedColorName}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-all duration-300"
            />
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="absolute top-4 left-4 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md">
                Special Offer
              </span>
            )}
          </div>

          {/* Thumbnail Gallery (if multiple photos for active color) */}
          {currentImages.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {currentImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    idx === activeImageIndex
                      ? 'border-stone-900 ring-2 ring-stone-900/20'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Selection Column */}
        <div className="space-y-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold block mb-1">
              {product.categoryName}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 leading-tight">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline space-x-3 mt-3">
              <span className="font-bold text-2xl text-stone-950">
                £{product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm text-stone-400 line-through">
                  £{product.compareAtPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-stone-500 font-medium pl-2 border-l border-stone-200">
                Taxes included • Free UK shipping over £40
              </span>
            </div>
          </div>

          {/* Scripture Verse Inspiration */}
          {product.scriptureReference && (
            <div className="p-4 bg-stone-50 border-l-4 border-stone-800 rounded-r-xl text-xs sm:text-sm text-stone-800 italic flex items-start space-x-2">
              <BookOpen className="w-4 h-4 text-stone-600 flex-shrink-0 mt-0.5" />
              <span>{product.scriptureReference}</span>
            </div>
          )}

          {/* Color Swatch Picker */}
          {product.colors.length > 0 && (
            <ColorSwatchPicker
              colors={product.colors}
              selectedColor={selectedColorName}
              onSelectColor={handleColorChange}
            />
          )}

          {/* Size Selector */}
          {product.availableSizes.length > 0 && (
            <SizeSelector
              sizes={product.availableSizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            />
          )}

          {/* Add to Bag Button */}
          <div className="pt-2 space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-4 px-8 bg-stone-950 text-white rounded-xl font-bold text-sm tracking-wider uppercase hover:bg-stone-800 transition-all flex items-center justify-center space-x-2 shadow-xl disabled:opacity-50"
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>Added to Your Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Bag • £{product.price.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

          {/* Shipping & Quality Badges */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200 text-xs text-stone-600">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-stone-900" />
              <span>Fast & Tracked UK Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-stone-900" />
              <span>Ethical Apparel Sourcing</span>
            </div>
          </div>

          {/* Description & Care Accordion */}
          <div className="space-y-4 pt-4 border-t border-stone-200 text-sm text-stone-700">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base mb-2">Description</h3>
              <p className="leading-relaxed text-stone-600 text-xs sm:text-sm">
                {product.description}
              </p>
            </div>

            {product.careInstructions && (
              <div className="pt-2">
                <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-1">
                  Care Guidelines
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {product.careInstructions}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        type={product.sizeGuideType}
      />

      {/* Related Products / Cross-Sells */}
      {relatedProducts.length > 0 && (
        <section className="pt-16 border-t border-stone-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
              Complete The Look
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
              You May Also Like
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
