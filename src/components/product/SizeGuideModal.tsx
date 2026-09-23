'use client';

import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'unisex-hoodie' | 'unisex-tshirt' | 'sweater' | 'tote-bag';
  customNotes?: string;
}

export function SizeGuideModal({
  isOpen,
  onClose,
  type = 'unisex-hoodie',
  customNotes,
}: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-2.5 mb-2">
            <Ruler className="w-5 h-5 text-stone-900" />
            <h3 className="font-serif text-xl font-bold text-stone-950">
              Size & Measurement Guide
            </h3>
          </div>
          <p className="text-xs text-stone-500 mb-6">
            All measurements are garment dimensions in inches & cm. We recommend measuring your favorite garment flat for comparison.
          </p>

          {/* Size Chart Table */}
          {type === 'tote-bag' ? (
            <div className="space-y-3 text-xs text-stone-700 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <p><strong>Dimensions:</strong> 38cm (Width) × 42cm (Height)</p>
              <p><strong>Handle Length:</strong> 67cm (Long shoulder drop)</p>
              <p><strong>Capacity:</strong> Approx. 10 Litres — comfortably holds Bibles, journals, 15" laptops, or study books.</p>
              <p><strong>Fabric:</strong> 100% Heavyweight Organic Cotton Canvas (300 gsm).</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-stone-200 rounded-lg overflow-hidden">
                <thead className="bg-stone-100 text-stone-800 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3 border-b border-stone-200">Size</th>
                    <th className="p-3 border-b border-stone-200">Chest (Inches)</th>
                    <th className="p-3 border-b border-stone-200">Length (Inches)</th>
                    <th className="p-3 border-b border-stone-200">UK Women / Men</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  <tr>
                    <td className="p-3 font-semibold text-stone-900">S</td>
                    <td className="p-3">36" - 38" (96cm)</td>
                    <td className="p-3">27" (69cm)</td>
                    <td className="p-3">UK 8-10 / Men Small</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-900">M</td>
                    <td className="p-3">40" - 42" (104cm)</td>
                    <td className="p-3">28" (71cm)</td>
                    <td className="p-3">UK 12-14 / Men Medium</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-900">L</td>
                    <td className="p-3">44" - 46" (112cm)</td>
                    <td className="p-3">29" (74cm)</td>
                    <td className="p-3">UK 16 / Men Large</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-900">XL</td>
                    <td className="p-3">48" - 50" (122cm)</td>
                    <td className="p-3">30" (76cm)</td>
                    <td className="p-3">UK 18 / Men XL</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-stone-900">2XL</td>
                    <td className="p-3">52" - 54" (132cm)</td>
                    <td className="p-3">31" (79cm)</td>
                    <td className="p-3">UK 20 / Men 2XL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Fit Advice */}
          <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-600 space-y-1.5">
            <p><strong>Fit Guide:</strong> Standard unisex regular fit.</p>
            <p>• If you prefer a tailored fit, choose your usual size.</p>
            <p>• For a cozy, relaxed or streetwear oversized drape, we recommend sizing up one size.</p>
            {customNotes && (
              <div className="mt-3 p-3 bg-stone-50 rounded-lg border border-stone-200 text-stone-800">
                <strong>Specific Garment Note:</strong> {customNotes}
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
