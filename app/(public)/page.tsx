'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  ShieldCheckIcon,
  BeakerIcon,
  MapPinIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import {
  TESTIMONIALS,
  FEATURED_BLOG_POSTS,
  STATS,
  GOOGLE_REVIEWS_URL_BATAM_CENTER,
  GOOGLE_REVIEWS_URL_BATU_AJI,
  getWhatsAppUrl,
} from '@/lib/data';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-accent-500' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
}

const FEATURED_SERVICES = [
  {
    num: '01',
    name: 'Facial Treatment',
    nameId: 'Perawatan Wajah',
    description: 'Physician-supervised medical-grade facial tailored to your skin type and condition.',
    price: '250,000',
    slug: 'facial-treatment',
  },
  {
    num: '02',
    name: 'Dermapen 4.0',
    nameId: 'Microneedling',
    description: "World's most advanced microneedling — collagen induction for acne scars and texture.",
    price: '500,000',
    slug: 'dermapen-microneedling',
  },
  {
    num: '03',
    name: 'Nd:YAG Laser',
    nameId: 'Laser Nd:YAG',
    description: 'Gold standard laser therapy for melasma and pigmentation in Asian skin tones.',
    price: '400,000',
    slug: 'nd-yag-laser',
  },
  {
    num: '04',
    name: 'HIFU',
    nameId: 'High-Intensity Focused Ultrasound',
    description: 'Non-surgical lifting and tightening targeting deep foundational skin layers.',
    price: '1,500,000',
    slug: 'hifu',
  },
  {
    num: '05',
    name: 'Chemical Peel',
    nameId: 'Chemical Peel',
    description: 'Medical-grade acid exfoliation for acne, hyperpigmentation, and dull skin.',
    price: '300,000',
    slug: 'chemical-peel',
  },
  {
    num: '06',
    name: 'DNA Salmon Therapy',
    nameId: 'Terapi DNA Salmon (PDRN)',
    description: 'Biocompatible polynucleotide injections for tissue repair and deep skin hydration.',
    price: '700,000',
    slug: 'dna-salmon-therapy',
  },
];

const WHY_FEATURES = [
  {
    title: 'Physician-Led Clinic',
    desc: 'All treatments are supervised and administered by dr. Yeyen Handoko. Every protocol is medically tailored to your individual skin condition.',
    Icon: ShieldCheckIcon,
  },
  {
    title: 'Acne & Melasma Specialists',
    desc: 'Dedicated treatment protocols designed specifically for Asian skin types. Evidence-based approach to two of the most complex skin concerns.',
    Icon: BeakerIcon,
  },
  {
    title: 'Two Clinic Locations',
    desc: 'Convenient access across Batam with locations at Batam Centre and Tembesi/Batu Aji — open daily with flexible hours.',
    Icon: MapPinIcon,
  },
  {
    title: 'International Patients',
    desc: 'Proudly serving patients from Singapore, Malaysia, and across Indonesia. English and Bahasa Indonesia consultations available.',
    Icon: GlobeAltIcon,
  },
];

export default function HomePage() {
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-dark via-dark-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_top_left,_#0D7377_0%,_transparent_60%)]" />
          <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_#C9A961_0%,_transparent_60%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl pt-36 pb-24">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-500/40 bg-accent-500/10 text-accent-400 text-xs font-semibold tracking-widest uppercase">
                Batam Acne &amp; Melasma Centre
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tight"
            >
              Where Medical Precision
              <br />
              <span className="text-accent-400">Meets Aesthetic Excellence</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="max-w-2xl space-y-2">
              <p className="text-white/70 text-lg leading-relaxed">
                Trusted aesthetic medicine in Batam, serving patients from Indonesia, Singapore &amp; Malaysia.
              </p>
              <p className="text-white/40 text-sm italic">
                Klinik estetika terpercaya di Batam, melayani pasien dari Indonesia, Singapura &amp; Malaysia.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <a
                href={getWhatsAppUrl('Halo, saya ingin membuat janji konsultasi di Skinderma Aesthetic Clinic.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-dark font-semibold text-sm tracking-wide transition-all duration-200 shadow-gold hover:shadow-lg hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Book Consultation
              </a>
              <Link
                href="/procedures"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/5 font-semibold text-sm tracking-wide transition-all duration-200"
              >
                View Treatments
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            variants={stagger}
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12"
          >
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <div className="font-playfair text-4xl md:text-5xl font-bold text-white">
                  {statsInView ? (
                    <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>
                <div className="mt-2 text-white/50 text-xs tracking-widest uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30">
          <div className="w-px h-8 bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-y-2 text-gray-500 text-xs font-medium tracking-wide">
            {[
              'Physician-Led Clinic',
              'Est. 2021',
              'dr. Yeyen Handoko',
              'Mon\u2013Sun  10:00\u201319:00 WIB',
              'Two Locations in Batam',
            ].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-3">
                <span>{item}</span>
                {i < arr.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-accent-400 hidden sm:inline-block" />
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SERVICES ────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16 text-center">
            <span className="inline-block text-accent-500 text-xs font-semibold tracking-widest uppercase mb-4">
              Layanan Unggulan
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl text-dark">Featured Services</h2>
          </div>

          <div className="border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-gray-200">
              {FEATURED_SERVICES.map((svc, i) => (
                <div
                  key={svc.slug}
                  className={`p-8 md:p-10 hover:bg-gray-50/80 transition-colors duration-200 group ${
                    i % 2 === 0 ? 'md:border-r md:border-gray-200' : ''
                  }`}
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <span className="font-playfair text-2xl font-bold text-accent-500/40 group-hover:text-accent-500 transition-colors leading-none">
                        {svc.num}
                      </span>
                      <div className="w-px flex-1 mt-3 bg-gray-200 group-hover:bg-accent-300 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-playfair text-xl font-bold text-dark group-hover:text-primary-600 transition-colors">
                        {svc.name}
                      </h3>
                      <p className="text-xs text-gray-400 italic mt-0.5">{svc.nameId}</p>
                      <p className="text-gray-500 text-sm leading-relaxed mt-3">{svc.description}</p>
                      <div className="flex items-center justify-between mt-5">
                        <span className="text-xs text-gray-400 font-medium">
                          From IDR {svc.price}
                        </span>
                        <Link
                          href={`/procedures/${svc.slug}`}
                          className="text-xs text-primary-600 hover:text-primary-700 font-semibold tracking-wide flex items-center gap-1 transition-all"
                        >
                          Learn More
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/procedures"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold text-sm transition-all duration-200"
            >
              View All Treatments
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
        <div className="bg-dark px-10 py-16 lg:px-16 lg:py-20 flex flex-col justify-center">
          <span className="text-accent-400 text-xs font-semibold tracking-widest uppercase mb-6">
            About the Clinic
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6 leading-tight">
            Skinderma Aesthetic Clinic
          </h2>
          <div className="space-y-4 text-white/65 text-sm leading-relaxed max-w-lg">
            <p>
              Founded in October 2021 by dr. Yeyen Handoko, Skinderma Aesthetic Clinic was established with a focused mission: to deliver evidence-based aesthetic medicine specialising in acne and melasma management for Asian skin types.
            </p>
            <p>
              Located in Batam — a city uniquely positioned between Singapore and Indonesia — our clinic serves a diverse patient base seeking physician-led aesthetic care that combines clinical rigour with accessible pricing.
            </p>
            <p>
              Our approach is rooted in precision medicine: every treatment plan is individually designed, supervised by our licensed physician, and supported by medical-grade products and technology.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 text-sm font-semibold tracking-wide transition-colors"
            >
              Learn More About Us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="relative min-h-[380px] lg:min-h-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800"
            alt="Skinderma Aesthetic Clinic"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-primary-900/20" />
        </div>
      </section>

      {/* ── WHY SKINDERMA ────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl text-dark">Why Skinderma</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_FEATURES.map((feat) => {
              const Icon = feat.Icon;
              return (
                <div
                  key={feat.title}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-luxury transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-dark mb-3">{feat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent-400 text-xs font-semibold tracking-widest uppercase mb-4 block">
              Patient Reviews
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl text-white">Patient Testimonials</h2>
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            className="pb-12"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-dark-800 rounded-2xl p-8 border border-white/5 flex flex-col h-full">
                  <StarRating rating={t.rating} />
                  <p className="text-white/65 text-sm leading-relaxed mt-5 flex-1">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm truncate">{t.name}</div>
                      <div className="text-white/40 text-xs mt-0.5">{t.location} &middot; {t.treatment}</div>
                    </div>
                    {t.verified && (
                      <div className="ml-auto flex items-center gap-1 text-primary-400 text-xs shrink-0">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ───────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase mb-4 block">
              Google Reviews
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl text-dark mb-3">
              See What Our Patients Say
            </h2>
            <p className="text-gray-500 text-sm">
              Verified reviews from Google Maps — both clinic locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Batam Center */}
            <a
              href={GOOGLE_REVIEWS_URL_BATAM_CENTER}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-luxury transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-dark text-sm">Skinderma — Batam Center</div>
                  <div className="text-xs text-gray-400">Ruko Greenland Blok C No. 7</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-dark">5.0</span>
                <span className="text-xs text-gray-400">on Google</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                Read verified patient reviews for our Batam Center branch — the original Skinderma location serving patients since 2021.
              </p>
              <div className="mt-6 flex items-center gap-2 text-primary-600 text-sm font-semibold group-hover:gap-3 transition-all">
                <span>Read Google Reviews</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </a>

            {/* Batu Aji */}
            <a
              href={GOOGLE_REVIEWS_URL_BATU_AJI}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-luxury transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-dark text-sm">Skinderma — Batu Aji / Tembesi</div>
                  <div className="text-xs text-gray-400">Ruko Buana Mas 2 No. 22, Tembesi</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-semibold text-dark">5.0</span>
                <span className="text-xs text-gray-400">on Google</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">
                Read verified patient reviews for our Batu Aji / Tembesi branch — serving patients in the western Batam area.
              </p>
              <div className="mt-6 flex items-center gap-2 text-primary-600 text-sm font-semibold group-hover:gap-3 transition-all">
                <span>Read Google Reviews</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
            <div>
              <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase mb-4 block">
                Medical Journal
              </span>
              <h2 className="font-playfair text-3xl md:text-5xl text-dark">From Our Medical Journal</h2>
            </div>
            <Link
              href="/blog"
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 shrink-0 self-start md:self-auto"
            >
              View All Articles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_BLOG_POSTS.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-primary-700 text-xs font-semibold capitalize">
                      {post.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-4">
                    <span>{post.readTime} min read</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-dark leading-snug mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={post.authorPhoto}
                        alt={post.author}
                        width={28}
                        height={28}
                        className="rounded-full object-cover w-7 h-7"
                        unoptimized
                      />
                      <span className="text-xs text-gray-500 font-medium">{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white" />
        </div>
        <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center">
          <span className="text-accent-300 text-xs font-semibold tracking-widest uppercase block mb-6">
            Begin Your Journey
          </span>
          <h2 className="font-playfair text-3xl md:text-5xl text-white mb-6 leading-tight">
            Begin Your Skincare Journey
          </h2>
          <p className="text-white/65 text-lg mb-10 leading-relaxed">
            Consult with dr. Yeyen Handoko and discover a personalised treatment plan designed specifically for your skin. First consultations are available via WhatsApp.
          </p>
          <a
            href={getWhatsAppUrl('Halo dr. Yeyen! Saya ingin memulai konsultasi kulit saya di Skinderma.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-dark font-bold text-sm tracking-wide transition-all duration-200 shadow-gold hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Book a Consultation on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
