'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  ShieldCheckIcon,
  BeakerIcon,
  TruckIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { FEATURED_PRODUCTS, getWhatsAppUrl } from '@/lib/data';
import { ProductCategory } from '@/lib/types';

type FilterCategory = 'all' | ProductCategory;

const CATEGORIES: { value: FilterCategory; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'serum', label: 'Serum' },
  { value: 'sunscreen', label: 'Sunscreen' },
  { value: 'moisturizer', label: 'Moisturizer' },
  { value: 'treatment', label: 'Treatment' },
];

const TRUST_BADGES = [
  { title: 'Physician Formulated', desc: 'Developed with input from our aesthetic physician', Icon: ShieldCheckIcon },
  { title: 'Dermatologist Approved', desc: 'Reviewed and approved for clinical use', Icon: CheckBadgeIcon },
  { title: 'No Harmful Additives', desc: 'Free from parabens, sulfates, and harmful colorants', Icon: BeakerIcon },
  { title: 'Ships Across Indonesia', desc: 'Nationwide delivery available for all products', Icon: TruckIcon },
];

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-accent-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
      <span className="text-gray-400 text-xs">({count})</span>
    </div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price);
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');

  const filtered = activeCategory === 'all'
    ? FEATURED_PRODUCTS
    : FEATURED_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden">
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="bg-dark pt-28 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#C9A961_0%,_transparent_60%)]" />
          </div>
          <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
            <span className="inline-block text-accent-400 text-xs font-semibold tracking-widest uppercase mb-5">
              Skinderma Shop
            </span>
            <h1 className="font-playfair text-4xl md:text-6xl text-white leading-tight">
              Physician-Curated Skincare
            </h1>
            <p className="text-white/55 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
              Medical-grade skincare formulated and endorsed by our physician. Every product is selected for its clinical efficacy and compatibility with our in-clinic treatments.
            </p>
          </div>
        </section>

        {/* ── CATEGORY FILTER ───────────────────────────────────────────── */}
        <section className="bg-white border-b border-gray-100 py-6 sticky top-20 z-30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-wrap items-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.value
                      ? 'bg-primary-600 text-white shadow-luxury'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCT GRID ──────────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-luxury transition-all duration-300 group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    {product.inStock ? (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-green-500/90 text-white text-xs font-semibold">
                        In Stock
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gray-400/90 text-white text-xs font-semibold">
                        Out of Stock
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-primary-700 text-xs font-semibold capitalize">
                      {product.brand}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-playfair text-base font-bold text-dark leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                      {product.description}
                    </p>
                    <StarRating rating={product.rating} count={product.reviewCount} />
                    <div className="mt-3 mb-4">
                      <div className="font-playfair text-lg font-bold text-dark">
                        IDR {formatPrice(product.priceIdr)}
                      </div>
                      {(product.priceSgd || product.priceMyr) && (
                        <div className="text-xs text-gray-400 mt-0.5">
                          {product.priceSgd && <span>SGD {product.priceSgd}</span>}
                          {product.priceSgd && product.priceMyr && <span className="mx-1">&middot;</span>}
                          {product.priceMyr && <span>MYR {product.priceMyr}</span>}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/shop/${product.slug}`}
                        className="flex-1 py-2.5 px-3 rounded-xl border border-primary-600 text-primary-600 hover:bg-primary-50 text-xs font-semibold text-center transition-colors"
                      >
                        View Details
                      </Link>
                      <a
                        href={getWhatsAppUrl(
                          `Halo Skinderma! Saya tertarik dengan produk ${product.name}. Bisa informasikan lebih lanjut?`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-green-500 hover:bg-green-600 text-white text-xs font-semibold text-center transition-colors"
                      >
                        Order via WA
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="text-gray-400 text-sm">No products found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── TRUST BADGES ──────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST_BADGES.map((badge) => {
                const Icon = badge.Icon;
                return (
                  <div key={badge.title} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark text-sm">{badge.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed mt-1">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
