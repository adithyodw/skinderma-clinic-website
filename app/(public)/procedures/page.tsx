'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PROCEDURES, getWhatsAppUrl } from '@/lib/data';
import { ProcedureCategory } from '@/lib/types';

type FilterCategory = 'all' | ProcedureCategory;

const CATEGORIES: { value: FilterCategory; label: string; labelId: string }[] = [
  { value: 'all', label: 'All Procedures', labelId: 'Semua' },
  { value: 'injectables', label: 'Injectables', labelId: 'Suntikan' },
  { value: 'laser', label: 'Laser', labelId: 'Laser' },
  { value: 'rejuvenation', label: 'Rejuvenation', labelId: 'Peremajaan' },
  { value: 'peels', label: 'Peels', labelId: 'Peeling' },
  { value: 'microblading', label: 'Microblading', labelId: 'Microblading' },
  { value: 'skincare', label: 'Skincare', labelId: 'Skincare' },
];

const CATEGORY_COLORS: Record<string, string> = {
  injectables: 'bg-purple-100 text-purple-700',
  laser: 'bg-blue-100 text-blue-700',
  rejuvenation: 'bg-green-100 text-green-700',
  peels: 'bg-orange-100 text-orange-700',
  microblading: 'bg-pink-100 text-pink-700',
  skincare: 'bg-teal-100 text-teal-700',
  body: 'bg-yellow-100 text-yellow-700',
};

const FAQS = [
  {
    q: 'Do I need a consultation before booking a procedure?',
    a: 'Yes, we recommend a consultation with one of our doctors before any procedure. This allows us to assess your skin condition, understand your goals, and recommend the most suitable treatment. Consultations can be booked via WhatsApp.',
  },
  {
    q: 'Are the procedures safe?',
    a: 'Absolutely. All procedures at SkinDerma are performed by licensed medical doctors using only FDA and BPOM-approved products and medical-grade equipment. We follow strict clinical protocols to ensure your safety at every step.',
  },
  {
    q: 'How many sessions will I need?',
    a: 'This varies by procedure and individual. Some treatments deliver visible results after a single session, while others such as laser treatments may require a series of 3–6 sessions. Your doctor will outline a personalised treatment plan during your consultation.',
  },
  {
    q: 'What is the downtime after treatments?',
    a: 'Downtime depends on the procedure. Injectables typically have minimal downtime (24–48 hours), while laser treatments may require 3–7 days of recovery. Microblading requires 7–14 days. We provide full aftercare instructions for every treatment.',
  },
  {
    q: 'Do you cater to international patients from Singapore and Malaysia?',
    a: 'Yes! We frequently serve patients from Singapore and Malaysia. Batam\'s proximity and our competitive pricing make SkinDerma a popular choice for medical tourists. Our team can assist with appointment scheduling to align with your travel plans.',
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price);
}

export default function ProceduresPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered =
    activeCategory === 'all'
      ? PROCEDURES
      : PROCEDURES.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-dark-800 to-primary-900 py-28 md:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-secondary-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent-500/5 blur-2xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              <span className="text-sm font-medium text-white/90 tracking-wide uppercase">
                Medical Aesthetic Treatments
              </span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Our{' '}
              <span className="italic text-accent-300">Procedures</span>
              <br />
              <span className="text-white/70 text-3xl md:text-4xl font-normal italic">
                Prosedur Kami
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70 leading-relaxed mt-6">
              Clinically proven aesthetic treatments performed by certified doctors — tailored
              to your skin type, goals, and lifestyle. Safe, effective, and natural-looking results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200 border ${
                  activeCategory === cat.value
                    ? 'bg-dark text-white border-dark'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-dark hover:text-dark'
                }`}
              >
                {cat.label}
                <span className={`ml-2 text-xs font-normal ${
                  activeCategory === cat.value ? 'text-white/60' : 'text-gray-400'
                }`}>
                  {cat.labelId}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Procedure Grid ── */}
      <section className="section-padding bg-neutral-bg">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <p className="text-dark-600">
              Showing{' '}
              <span className="font-semibold text-dark">{filtered.length}</span>{' '}
              procedure{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((procedure, index) => (
                <motion.div
                  key={procedure.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col"
                >
                  {/* Hero Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={procedure.heroImage}
                      alt={`${procedure.name} at SkinDerma Clinic Batam`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          CATEGORY_COLORS[procedure.category] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {procedure.category}
                      </span>
                    </div>

                    {/* Duration pill */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {procedure.duration}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-4 right-4 text-3xl">{procedure.icon}</div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="font-playfair text-xl font-bold text-dark mb-1">
                      {procedure.name}
                    </h3>
                    <p className="text-dark-600 text-xs italic mb-3">{procedure.nameId}</p>
                    <p className="text-dark-600 text-sm leading-relaxed line-clamp-2 mb-4">
                      {procedure.description}
                    </p>

                    {/* Benefits */}
                    <div className="mb-5 space-y-1.5 flex-1">
                      {procedure.benefits.slice(0, 3).map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-green-500 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-dark-600">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price */}
                    {procedure.priceFrom && (
                      <div className="bg-primary-50 rounded-xl px-4 py-3 mb-5">
                        <p className="text-xs text-primary-600 font-medium mb-0.5">Starting from</p>
                        <p className="font-bold text-primary-700 text-lg">
                          IDR {formatPrice(procedure.priceFrom)}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <Link
                        href={`/procedures/${procedure.slug}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border-2 border-primary-600 text-primary-700 font-semibold text-sm hover:bg-primary-50 transition-colors duration-200"
                      >
                        Learn More
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      <a
                        href={getWhatsAppUrl(
                          `Halo SkinDerma! Saya tertarik dengan prosedur ${procedure.name}. Bisa bantu informasi dan jadwalnya?`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Book Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-dark-600 text-lg">No procedures found in this category.</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 text-primary-600 font-semibold underline underline-offset-2"
              >
                Show all procedures
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <span className="badge-primary mb-4 inline-block">FAQ</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-dark mb-4">
              Frequently Asked{' '}
              <span className="gradient-text-primary">Questions</span>
            </h2>
            <p className="text-dark-600">
              Have questions about our procedures? We have answers. If you don&apos;t find
              what you&apos;re looking for, just message us on WhatsApp.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-2xl overflow-hidden shadow-card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-primary-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-dark pr-4">{faq.q}</span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-dark-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-gradient-to-br from-primary-800 to-secondary-700">
        <div className="container-custom text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Not Sure Which Procedure is Right for You?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Let our doctors guide you. Book a free skin consultation and we&apos;ll create
            a personalised treatment plan tailored to your goals.
          </p>
          <a
            href={getWhatsAppUrl(
              'Halo SkinDerma! Saya ingin konsultasi gratis untuk mengetahui prosedur yang cocok untuk saya. Terima kasih!'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-lg hover:bg-[#1ebe5d] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Get Free Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
