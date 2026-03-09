'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  BeakerIcon,
  ShieldCheckIcon,
  SparklesIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { DOCTORS, BUSINESS_HOURS, BUSINESS_HOURS_TEMBESI, getWhatsAppUrl } from '@/lib/data';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const PHILOSOPHY = [
  {
    title: 'Evidence-Based Medicine',
    desc: 'Every treatment protocol at Skinderma is grounded in peer-reviewed clinical evidence. We do not offer treatments that lack scientific support — your results must be predictable and reproducible.',
    Icon: BeakerIcon,
  },
  {
    title: 'Patient Safety First',
    desc: 'All procedures are performed by our licensed physician using BPOM and internationally approved devices and materials. Rigorous safety checks precede every treatment session.',
    Icon: ShieldCheckIcon,
  },
  {
    title: 'Natural-Looking Results',
    desc: 'Our aesthetic philosophy prioritises enhancement over transformation. We aim for results that appear refreshed and natural — outcomes that improve confidence without altering identity.',
    Icon: SparklesIcon,
  },
  {
    title: 'Continuous Professional Development',
    desc: 'dr. Yeyen Handoko regularly attends international aesthetic medicine workshops and training programmes to ensure Skinderma offers the most current treatment modalities available.',
    Icon: AcademicCapIcon,
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function AboutClient() {
  const doctor = DOCTORS[0];

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative bg-dark py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_top_left,_#0D7377_0%,_transparent_60%)]" />
          <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_#C9A961_0%,_transparent_60%)]" />
        </div>
        <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-5"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-accent-400 text-xs font-semibold tracking-widest uppercase"
            >
              About the Clinic
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-6xl text-white leading-tight"
            >
              Skinderma Aesthetic Clinic
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/50 text-sm tracking-widest">
              Batam Acne &amp; Melasma Centre &middot; Est. 2021
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CLINIC STORY ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div>
                <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-4">
                  Our Story
                </span>
                <h2 className="font-playfair text-3xl md:text-4xl text-dark leading-tight">
                  Founded on a Mission to Elevate Aesthetic Medicine in Batam
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Skinderma Aesthetic Clinic was founded in October 2021 by dr. Yeyen Handoko with a clear and focused mission: to provide physician-led aesthetic medicine that meets international standards while remaining accessible to patients in Batam and the surrounding region.
                </p>
                <p>
                  Situated in Ruko Greenland, Batam Kota, the clinic quickly established itself as a specialist centre for acne and melasma treatment — two of the most prevalent and undertreated skin concerns in Southeast Asian populations. Our protocols are specifically designed for Asian skin phototypes and the unique demands of a tropical equatorial climate.
                </p>
                <p>
                  Since opening, Skinderma has grown to serve thousands of patients not only from across Indonesia but also from neighbouring Singapore and Malaysia — a testament to the standard of care and trust we have built within our community. We now operate two clinic locations across Batam.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury-lg">
                <Image
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800"
                  alt="Skinderma Aesthetic Clinic"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-primary-900/15" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-luxury p-5">
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold text-primary-600">2021</div>
                  <div className="text-xs text-gray-500 mt-1 tracking-wider uppercase">Est. Batam</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DOCTOR PROFILE ───────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-4">
              Medical Team
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl text-dark">Meet Our Physician</h2>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[4/5] md:aspect-auto min-h-[380px] overflow-hidden">
                <Image
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-playfair text-2xl font-bold text-white">{doctor.name}</h3>
                  <p className="text-white/75 text-sm mt-1">{doctor.title}</p>
                </div>
              </div>

              <div className="p-8 flex flex-col justify-center space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-3">
                    {doctor.specialty}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">{doctor.bio}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-3">
                    Credentials
                  </h4>
                  <ul className="space-y-2">
                    {doctor.credentials.map((cred) => (
                      <li key={cred} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {cred}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-3">
                    Training &amp; Education
                  </h4>
                  <ul className="space-y-2">
                    {doctor.education.map((edu) => (
                      <li key={edu} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-400 mb-1">Clinical Experience</div>
                  <div className="font-playfair text-2xl font-bold text-primary-600">
                    {doctor.yearsExperience}+ Years
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLINICAL PHILOSOPHY ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-4">
              Our Approach
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl text-dark">Clinical Philosophy</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PHILOSOPHY.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 p-8 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-luxury transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-dark mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent-500 text-xs font-semibold tracking-widest uppercase block mb-4">
              Find Us
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl text-dark">Our Locations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Batam Centre */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-dark">Batam Centre</h3>
                  <p className="text-primary-600 text-xs font-semibold mt-0.5">Main Branch</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Ruko Greenland, Blok C No.07, Jl. Komolek Green Land, Teluk Tering, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29444
              </p>
              <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-3">Operating Hours</h4>
              <div className="space-y-1.5">
                {BUSINESS_HOURS.map((h) => (
                  <div key={h.day} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{h.day}</span>
                    {h.closed ? (
                      <span className="text-red-400 font-medium text-xs">Closed</span>
                    ) : (
                      <span className="text-gray-700 font-medium">{h.open} &ndash; {h.close} WIB</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tembesi */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-dark">Tembesi / Batu Aji</h3>
                  <p className="text-accent-600 text-xs font-semibold mt-0.5">Branch</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Batam, Kepulauan Riau &mdash; Tembesi / Batu Aji area. Contact us via WhatsApp for the exact address and directions.
              </p>
              <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-3">Operating Hours</h4>
              <div className="space-y-1.5">
                {BUSINESS_HOURS_TEMBESI.map((h) => (
                  <div key={h.day} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{h.day}</span>
                    {h.closed ? (
                      <span className="text-red-400 font-medium text-xs">Closed</span>
                    ) : (
                      <span className="text-gray-700 font-medium">{h.open} &ndash; {h.close} WIB</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mt-4 border border-amber-100">
                Note: Closed every Thursday at this branch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-primary-700 to-primary-900">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6 leading-tight">
            Consult with Our Doctor
          </h2>
          <p className="text-white/65 text-lg mb-10 leading-relaxed">
            Book a personalised consultation with dr. Yeyen Handoko. We offer thorough skin assessments and individually tailored treatment plans.
          </p>
          <a
            href={getWhatsAppUrl('Halo dr. Yeyen! Saya ingin membuat janji konsultasi di Skinderma Aesthetic Clinic.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-dark font-bold text-sm tracking-wide transition-all duration-200 shadow-gold hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Book via WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
