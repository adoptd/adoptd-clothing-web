'use client';

import React, { useState, useEffect } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'unisex-hoodie' | 'unisex-tshirt' | 'sweater' | 'tote-bag';
  customNotes?: string;
}

type TabType = 'unisex-hoodie' | 'unisex-tshirt' | 'sweater' | 'tote-bag';

export function SizeGuideModal({
  isOpen,
  onClose,
  type = 'unisex-hoodie',
  customNotes,
}: SizeGuideModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>(type);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(type);
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  const tabs: { id: TabType; label: string }[] = [
    { id: 'unisex-hoodie', label: 'Hoodies' },
    { id: 'unisex-tshirt', label: 'T-Shirts' },
    { id: 'sweater', label: 'Sweaters' },
    { id: 'tote-bag', label: 'Tote Bags' },
  ];

  // Data from Official AWDis Manufacturer Specification Sheets
  const hoodieSizes = [
    { size: 'XS', chestIn: '34"', chestCm: '86 cm', ukRef: 'UK 6-8' },
    { size: 'S', chestIn: '36"', chestCm: '91 cm', ukRef: 'UK 8-10 / Men S' },
    { size: 'M', chestIn: '40"', chestCm: '102 cm', ukRef: 'UK 12-14 / Men M' },
    { size: 'L', chestIn: '44"', chestCm: '112 cm', ukRef: 'UK 16 / Men L' },
    { size: 'XL', chestIn: '48"', chestCm: '122 cm', ukRef: 'UK 18 / Men XL' },
    { size: 'XXL (2XL)', chestIn: '52"', chestCm: '132 cm', ukRef: 'UK 20 / Men 2XL' },
    { size: '3XL', chestIn: '56"', chestCm: '142 cm', ukRef: 'Men 3XL' },
    { size: '4XL', chestIn: '60"', chestCm: '152 cm', ukRef: 'Men 4XL' },
    { size: '5XL', chestIn: '62"', chestCm: '157 cm', ukRef: 'Men 5XL' },
  ];

  const tshirtSizes = [
    { size: 'S', chestIn: '36"', chestCm: '91 cm', ukRef: 'UK 8-10 / Men S' },
    { size: 'M', chestIn: '40"', chestCm: '102 cm', ukRef: 'UK 12-14 / Men M' },
    { size: 'L', chestIn: '44"', chestCm: '112 cm', ukRef: 'UK 16 / Men L' },
    { size: 'XL', chestIn: '48"', chestCm: '122 cm', ukRef: 'UK 18 / Men XL' },
    { size: 'XXL (2XL)', chestIn: '52"', chestCm: '132 cm', ukRef: 'UK 20 / Men 2XL' },
    { size: '3XL', chestIn: '56"', chestCm: '142 cm', ukRef: 'Men 3XL' },
    { size: '4XL', chestIn: '60"', chestCm: '152 cm', ukRef: 'Men 4XL' },
    { size: '5XL', chestIn: '64"', chestCm: '163 cm', ukRef: 'Men 5XL' },
  ];

  const sweaterSizes = [
    { size: 'XS', chestIn: '34"', chestCm: '86 cm', ukRef: 'UK 6-8' },
    { size: 'S', chestIn: '36"', chestCm: '91 cm', ukRef: 'UK 8-10 / Men S' },
    { size: 'M', chestIn: '40"', chestCm: '102 cm', ukRef: 'UK 12-14 / Men M' },
    { size: 'L', chestIn: '44"', chestCm: '112 cm', ukRef: 'UK 16 / Men L' },
    { size: 'XL', chestIn: '48"', chestCm: '122 cm', ukRef: 'UK 18 / Men XL' },
    { size: 'XXL (2XL)', chestIn: '52"', chestCm: '132 cm', ukRef: 'UK 20 / Men 2XL' },
    { size: '3XL', chestIn: '56"', chestCm: '142 cm', ukRef: 'Men 3XL' },
    { size: '4XL', chestIn: '60"', chestCm: '152 cm', ukRef: 'Men 4XL' },
    { size: '5XL', chestIn: '62"', chestCm: '157 cm', ukRef: 'Men 5XL' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-4">
        <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 overflow-hidden">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-2.5 mb-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#00736a]/10 text-[#00736a] flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-stone-950">
              Size &amp; Measurement Guide
            </h3>
          </div>
          <p className="text-xs text-stone-600 mb-5">
            Standard unisex sizing conversions based on chest to fit measurements.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 p-1 bg-stone-100 rounded-xl mb-5 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition whitespace-nowrap text-center ${
                  activeTab === tab.id
                    ? 'bg-[#00736a] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content: Hoodies */}
          {activeTab === 'unisex-hoodie' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span><strong>Model:</strong> AWDis College Hoodie (JH001)</span>
                <span><strong>Fabric:</strong> 280 gsm (80% Cotton / 20% Poly)</span>
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#00736a] text-white font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3">Chest (To Fit)</th>
                      <th className="py-2.5 px-3">Metric</th>
                      <th className="py-2.5 px-3">Approx. Fit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-800">
                    {hoodieSizes.map((row, idx) => (
                      <tr key={row.size} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'}>
                        <td className="py-2 px-3 font-bold text-stone-950">{row.size}</td>
                        <td className="py-2 px-3 font-semibold text-[#00736a]">{row.chestIn}</td>
                        <td className="py-2 px-3 text-stone-600">{row.chestCm}</td>
                        <td className="py-2 px-3 text-stone-600">{row.ukRef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content: T-Shirts */}
          {activeTab === 'unisex-tshirt' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span><strong>Model:</strong> AWDis Unisex 180 T-Shirt (AT002)</span>
                <span><strong>Fabric:</strong> 180 gsm (100% Better Cotton)</span>
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#00736a] text-white font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3">Chest (To Fit)</th>
                      <th className="py-2.5 px-3">Metric</th>
                      <th className="py-2.5 px-3">Approx. Fit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-800">
                    {tshirtSizes.map((row, idx) => (
                      <tr key={row.size} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'}>
                        <td className="py-2 px-3 font-bold text-stone-950">{row.size}</td>
                        <td className="py-2 px-3 font-semibold text-[#00736a]">{row.chestIn}</td>
                        <td className="py-2 px-3 text-stone-600">{row.chestCm}</td>
                        <td className="py-2 px-3 text-stone-600">{row.ukRef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content: Sweaters */}
          {activeTab === 'sweater' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span><strong>Model:</strong> AWDis Sweatshirt (JH030)</span>
                <span><strong>Fabric:</strong> 280 gsm (80% Cotton / 20% Poly)</span>
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#00736a] text-white font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3">Chest (To Fit)</th>
                      <th className="py-2.5 px-3">Metric</th>
                      <th className="py-2.5 px-3">Approx. Fit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-800">
                    {sweaterSizes.map((row, idx) => (
                      <tr key={row.size} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'}>
                        <td className="py-2 px-3 font-bold text-stone-950">{row.size}</td>
                        <td className="py-2 px-3 font-semibold text-[#00736a]">{row.chestIn}</td>
                        <td className="py-2 px-3 text-stone-600">{row.chestCm}</td>
                        <td className="py-2 px-3 text-stone-600">{row.ukRef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content: Tote Bags */}
          {activeTab === 'tote-bag' && (
            <div className="space-y-3 text-xs text-stone-700 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <p><strong>Dimensions:</strong> 38 cm (Width) × 42 cm (Height)</p>
              <p><strong>Handle Length:</strong> 67 cm (Long reinforced shoulder drop)</p>
              <p><strong>Capacity:</strong> Approx. 10 Litres — comfortably accommodates study Bibles, laptops, notebooks, and daily essentials.</p>
              <p><strong>Fabric:</strong> 100% Heavyweight Organic Cotton Canvas (300 gsm).</p>
            </div>
          )}

          {/* Fit Tips */}
          <div className="mt-5 pt-3 border-t border-stone-200 text-xs text-stone-600 space-y-1">
            <div className="flex items-center space-x-1.5 text-stone-900 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#00736a]" />
              <span>Fit Recommendation:</span>
            </div>
            <p>• Choose your standard size for a regular, comfortable fit.</p>
            <p>• Size up by one size for a modern, relaxed streetwear drape.</p>
            {customNotes && (
              <div className="mt-2 p-2.5 bg-stone-100 rounded-lg border border-stone-200 text-stone-800">
                <strong>Note:</strong> {customNotes}
              </div>
            )}
          </div>

          {/* Got it Button */}
          <div className="mt-5">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#00736a] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#005c55] transition shadow-md"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
