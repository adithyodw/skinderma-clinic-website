'use client';

import { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import {
  CLINIC_ADDRESS,
  CLINIC_PHONE,
  CLINIC_EMAIL,
  CLINIC_GMAPS,
  BUSINESS_HOURS,
  BUSINESS_HOURS_TEMBESI,
  getWhatsAppUrl,
} from '@/lib/data';

const SUBJECTS = [
  'General Inquiry',
  'Dermapen 4.0 Microneedling',
  'Nd:YAG Laser',
  'HIFU',
  'Chemical Peel',
  'DNA Salmon Therapy',
  'Facial Treatment',
  'Product Inquiry',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    language: 'en' as 'en' | 'id',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      toast.error('Something went wrong. Please try WhatsApp or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden">
        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="bg-dark pt-28 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_top_left,_#0D7377_0%,_transparent_60%)]" />
          </div>
          <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
            <span className="inline-block text-accent-400 text-xs font-semibold tracking-widest uppercase mb-5">
              Get in Touch
            </span>
            <h1 className="font-playfair text-4xl md:text-6xl text-white leading-tight">
              Contact Skinderma
            </h1>
            <p className="text-white/55 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
              We are available Monday through Sunday, 10:00–19:00 WIB. Reach us via WhatsApp for the fastest response.
            </p>
          </div>
        </section>

        {/* ── INFO CARDS ────────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Address */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <MapPinIcon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-dark text-sm mb-2">Address</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{CLINIC_ADDRESS}</p>
                <a
                  href={CLINIC_GMAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 text-xs font-semibold mt-3 inline-block hover:text-primary-700"
                >
                  Open in Google Maps
                </a>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <PhoneIcon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-dark text-sm mb-2">Phone / WhatsApp</h3>
                <p className="text-gray-500 text-xs">{CLINIC_PHONE}</p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 text-xs font-semibold mt-3 inline-block hover:text-green-700"
                >
                  Chat on WhatsApp
                </a>
              </div>

              {/* Email */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center mb-4">
                  <EnvelopeIcon className="w-5 h-5 text-accent-600" />
                </div>
                <h3 className="font-semibold text-dark text-sm mb-2">Email</h3>
                <p className="text-gray-500 text-xs">{CLINIC_EMAIL}</p>
                <a
                  href={`mailto:${CLINIC_EMAIL}`}
                  className="text-accent-600 text-xs font-semibold mt-3 inline-block hover:text-accent-700"
                >
                  Send Email
                </a>
              </div>

              {/* Hours */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <ClockIcon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-dark text-sm mb-2">Operating Hours</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Mon–Sun: 10:00–19:00 WIB
                  <br />
                  <span className="text-amber-600">(Tembesi: Closed Thursdays)</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── LOCATIONS + MAP ───────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-4">
                Locations
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl text-dark">Our Two Branches</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Batam Centre */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                    <MapPinIcon className="w-4.5 h-4.5 text-primary-600 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-dark">Batam Centre</h3>
                    <span className="text-primary-600 text-xs font-semibold">Main Branch</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Ruko Greenland, Blok C No.07, Jl. Komolek Green Land, Teluk Tering, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29444
                </p>
                <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-3">Hours</h4>
                <div className="space-y-1.5">
                  {BUSINESS_HOURS.slice(0, 4).map((h) => (
                    <div key={h.day} className="flex justify-between text-xs">
                      <span className="text-gray-500">{h.day}</span>
                      <span className="text-gray-700 font-medium">{h.open} &ndash; {h.close} WIB</span>
                    </div>
                  ))}
                  <div className="text-xs text-gray-400 italic pt-1">Open every day 10:00–19:00</div>
                </div>
              </div>

              {/* Tembesi */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-accent-50 flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-dark">Tembesi / Batu Aji</h3>
                    <span className="text-accent-600 text-xs font-semibold">Branch</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Tembesi / Batu Aji area, Batam, Kepulauan Riau. Contact us via WhatsApp for the exact address.
                </p>
                <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-3">Hours</h4>
                <div className="space-y-1.5">
                  {BUSINESS_HOURS_TEMBESI.map((h) => (
                    <div key={h.day} className="flex justify-between text-xs">
                      <span className="text-gray-500">{h.day}</span>
                      {h.closed ? (
                        <span className="text-red-400 font-medium">Closed</span>
                      ) : (
                        <span className="text-gray-700 font-medium">{h.open} &ndash; {h.close} WIB</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mt-3 border border-amber-100">
                  Closed every Thursday at this branch.
                </p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden shadow-card border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9797!2d104.0345!3d1.1222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98f39ff3cd4c3%3A0x5b7eb7aa4ef2de06!2sSkinderma%20Aesthetic%20Clinic!5e0!3m2!1sen!2sid!4v1"
                className="w-full h-80"
                allowFullScreen
                loading="lazy"
                title="Skinderma Aesthetic Clinic Location"
              />
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ──────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-12">
              <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-4">
                Send a Message
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl text-dark">Contact Form</h2>
              <p className="text-gray-500 text-sm mt-3">
                We will respond within 24 hours. For urgent inquiries, please contact us directly via WhatsApp.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-16 px-8 bg-primary-50 rounded-2xl border border-primary-100">
                <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-playfair text-2xl text-dark mb-3">Message Received</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-6">
                  Thank you, <span className="font-semibold text-dark">{form.name || 'there'}</span>. Your enquiry has been sent to our team. We will respond within 24 hours during clinic hours.
                </p>
                <p className="text-xs text-gray-400 mb-8">For urgent matters, please contact us directly via WhatsApp.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '', language: 'en' }); }}
                  className="px-8 py-3 rounded-xl border-2 border-primary-300 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+62 ..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
                    required
                  >
                    <option value="">Select a topic...</option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your skin concern or the treatment you are interested in..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-3">
                  Preferred Language
                </label>
                <div className="flex gap-4">
                  {[{ value: 'en', label: 'English' }, { value: 'id', label: 'Bahasa Indonesia' }].map((lang) => (
                    <label key={lang.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="language"
                        value={lang.value}
                        checked={form.language === lang.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary-600 accent-primary-600"
                      />
                      <span className="text-sm text-gray-600">{lang.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-8 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-luxury hover:shadow-luxury-lg"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            )}
          </div>
        </section>

        {/* ── WHATSAPP CTA ──────────────────────────────────────────────── */}
        <section className="py-16 bg-gradient-to-br from-primary-700 to-primary-900">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h2 className="font-playfair text-3xl text-white mb-4 leading-tight">
              Prefer to Chat Directly?
            </h2>
            <p className="text-white/65 text-base mb-8 leading-relaxed">
              For the fastest response, reach us via WhatsApp. We reply promptly during clinic hours — Monday to Sunday, 10:00–19:00 WIB.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-dark font-bold text-sm tracking-wide transition-all duration-200 shadow-gold hover:-translate-y-0.5"
            >
              <WhatsAppIconSVG className="w-5 h-5" />
              Chat via WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function WhatsAppIconSVG({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
