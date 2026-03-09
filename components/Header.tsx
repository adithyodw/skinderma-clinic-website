'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CLINIC_PHONE, getWhatsAppUrl } from '@/lib/data';
import { useLang } from '@/contexts/LanguageContext';

const NAV_LINKS = [
  { href: '/', label: 'Home', labelId: 'Beranda' },
  { href: '/procedures', label: 'Treatments', labelId: 'Perawatan' },
  { href: '/shop', label: 'Shop', labelId: 'Toko' },
  { href: '/blog', label: 'Journal', labelId: 'Jurnal' },
  { href: '/about', label: 'About', labelId: 'Tentang Kami' },
  { href: '/contact', label: 'Contact', labelId: 'Kontak' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
      >
        {/* Top bar */}
        <div
          className={`border-b transition-all duration-300 ${
            scrolled ? 'border-gray-100' : 'border-white/10'
          }`}
        >
          <div className="container-custom">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-6">
                <a
                  href={`tel:${CLINIC_PHONE}`}
                  className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                    scrolled ? 'text-gray-500 hover:text-primary-600' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <PhoneIcon className="w-3 h-3" />
                  {CLINIC_PHONE}
                </a>
                <span
                  className={`hidden md:inline text-xs transition-colors ${
                    scrolled ? 'text-gray-300' : 'text-white/30'
                  }`}
                >
                  |
                </span>
                <span
                  className={`hidden md:inline text-xs transition-colors ${
                    scrolled ? 'text-gray-500' : 'text-white/70'
                  }`}
                >
                  Mon–Sun &nbsp;10:00–19:00
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/skindermaclinic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={`transition-colors ${
                    scrolled ? 'text-gray-400 hover:text-primary-600' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.facebook.com/skindermaclinicbatam/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={`transition-colors ${
                    scrolled ? 'text-gray-400 hover:text-primary-600' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/patient-portal/login"
                  className={`text-xs font-medium tracking-wide transition-colors ${
                    scrolled ? 'text-gray-500 hover:text-primary-600' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Patient Portal
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Skinderma Aesthetic Clinic"
                width={160}
                height={60}
                className={`h-12 w-auto transition-all duration-300 ${
                  scrolled ? '' : 'brightness-0 invert opacity-95'
                }`}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-lg group ${
                    isActive(link.href)
                      ? scrolled
                        ? 'text-primary-600'
                        : 'text-white'
                      : scrolled
                        ? 'text-gray-600 hover:text-primary-600'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {lang === 'id' ? link.labelId : link.label}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-px rounded-full transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-accent-500 opacity-100'
                        : 'bg-accent-500 opacity-0 group-hover:opacity-40'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
                className={`text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  scrolled
                    ? 'border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600'
                    : 'border-white/30 text-white/80 hover:border-white hover:text-white'
                }`}
                aria-label="Toggle language"
              >
                {lang === 'en' ? 'ID' : 'EN'}
              </button>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  scrolled
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-luxury hover:shadow-luxury-lg'
                    : 'bg-white text-primary-700 hover:bg-white/90 shadow-lg'
                }`}
              >
                <WhatsAppIcon className="w-4 h-4" />
                Book Consultation
              </a>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className={`lg:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg transition-colors ${
                scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
              }`}
            >
              <span
                className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${
                  scrolled ? 'bg-gray-700' : 'bg-white'
                } ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${
                  scrolled ? 'bg-gray-700' : 'bg-white'
                } ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${
                  scrolled ? 'bg-gray-700' : 'bg-white'
                } ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <Image
                  src="/logo.svg"
                  alt="Skinderma Aesthetic Clinic"
                  width={120}
                  height={45}
                  className="h-10 w-auto"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-gray-400 font-normal">{link.labelId}</span>
                  </Link>
                ))}
              </nav>

              <div className="px-4 py-6 border-t border-gray-100 space-y-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Book a Consultation
                </a>
                <Link
                  href="/patient-portal/login"
                  className="flex items-center justify-center w-full py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-primary-300 hover:text-primary-600 transition-colors"
                >
                  Patient Portal
                </Link>
                <div className="pt-2 flex items-center justify-center gap-5">
                  <a
                    href="https://www.instagram.com/skindermaclinic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/skindermaclinicbatam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Inline SVG Icons ──────────────────────────────────────────────────────────

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
