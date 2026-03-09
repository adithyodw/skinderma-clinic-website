import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ClockIcon, ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { PROCEDURES, DOCTORS, getWhatsAppUrl } from '@/lib/data';
import ProcedureFAQ from './ProcedureFAQ';

export function generateStaticParams() {
  return PROCEDURES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const procedure = PROCEDURES.find((p) => p.slug === params.slug);
  if (!procedure) return { title: 'Procedure Not Found' };
  return {
    title: `${procedure.name} | Skinderma Aesthetic Clinic Batam`,
    description: procedure.description.slice(0, 160),
    openGraph: {
      title: `${procedure.name} | Skinderma`,
      description: procedure.description.slice(0, 160),
      images: [{ url: procedure.heroImage }],
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  injectables: 'bg-purple-100 text-purple-700',
  laser: 'bg-blue-100 text-blue-700',
  rejuvenation: 'bg-green-100 text-green-700',
  peels: 'bg-orange-100 text-orange-700',
  microblading: 'bg-pink-100 text-pink-700',
  skincare: 'bg-teal-100 text-teal-700',
  body: 'bg-yellow-100 text-yellow-700',
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price);
}

export default function ProcedureDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const procedure = PROCEDURES.find((p) => p.slug === params.slug);
  if (!procedure) notFound();

  const doctor = DOCTORS[0];
  const related = PROCEDURES.filter(
    (p) => p.slug !== procedure.slug && p.featured
  ).slice(0, 3);

  const waUrl = getWhatsAppUrl(
    `Halo Skinderma! Saya tertarik dengan ${procedure.name}. Bisa tolong informasikan lebih lanjut dan jadwal yang tersedia?`
  );

  return (
    <main className="min-h-screen">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image
          src={procedure.heroImage}
          alt={procedure.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-dark/20" />
        <div className="absolute inset-0 flex flex-col justify-end pb-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                CATEGORY_COLORS[procedure.category] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {procedure.category.charAt(0).toUpperCase() + procedure.category.slice(1)}
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl text-white leading-tight">
              {procedure.name}
            </h1>
            <p className="text-white/65 text-sm mt-2 italic">{procedure.nameId}</p>
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-6xl py-4">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/procedures" className="hover:text-primary-600 transition-colors">Treatments</Link>
            <span>/</span>
            <span className="text-dark font-medium">{procedure.name}</span>
          </nav>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: main content (60%) */}
            <div className="lg:col-span-3 space-y-12">
              {/* Overview badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 border border-primary-100">
                  <ClockIcon className="w-4 h-4 text-primary-600" />
                  <div>
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="text-sm font-semibold text-dark">{procedure.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 border border-orange-100">
                  <ArrowPathIcon className="w-4 h-4 text-orange-500" />
                  <div>
                    <div className="text-xs text-gray-500">Recovery</div>
                    <div className="text-sm font-semibold text-dark">{procedure.recovery}</div>
                  </div>
                </div>
                {procedure.priceFrom && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-50 border border-accent-100">
                    <div>
                      <div className="text-xs text-gray-500">Starting From</div>
                      <div className="text-sm font-semibold text-dark">
                        IDR {formatPrice(procedure.priceFrom)}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-playfair text-2xl text-dark mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed">{procedure.description}</p>
              </div>

              {/* Benefits */}
              {procedure.benefits.length > 0 && (
                <div>
                  <h2 className="font-playfair text-2xl text-dark mb-6">Treatment Benefits</h2>
                  <ul className="space-y-3">
                    {procedure.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQ */}
              {procedure.faqs.length > 0 && (
                <div>
                  <h2 className="font-playfair text-2xl text-dark mb-6">
                    Frequently Asked Questions
                  </h2>
                  <ProcedureFAQ faqs={procedure.faqs} />
                </div>
              )}
            </div>

            {/* Right: sidebar (40%) */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 space-y-6">
                {/* Booking card */}
                <div className="bg-dark rounded-2xl p-7 text-white">
                  <h3 className="font-playfair text-xl mb-2">Book This Treatment</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-5">
                    Contact us via WhatsApp to book a consultation or schedule your {procedure.name} session with dr. Yeyen Handoko.
                  </p>
                  {procedure.priceFrom && (
                    <div className="mb-5 pb-5 border-b border-white/10">
                      <div className="text-white/50 text-xs mb-1">Price From</div>
                      <div className="font-playfair text-2xl font-bold text-accent-400">
                        IDR {formatPrice(procedure.priceFrom)}
                      </div>
                    </div>
                  )}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Book via WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl border border-white/20 text-white/80 hover:bg-white/5 font-medium text-sm transition-colors mt-3"
                  >
                    Ask a Question
                  </Link>
                </div>

                {/* Doctor card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Your Physician
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={doctor.photoUrl}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-dark text-sm">{doctor.name}</div>
                      <div className="text-primary-600 text-xs mt-0.5">{doctor.title}</div>
                      <div className="text-gray-400 text-xs mt-1">{doctor.yearsExperience}+ years experience</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1.5">
                    {doctor.credentials.map((cred) => (
                      <div key={cred} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                        {cred}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED PROCEDURES ────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="font-playfair text-3xl text-dark mb-10">Related Treatments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/procedures/${rel.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-luxury transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={rel.heroImage}
                      alt={rel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-3 ${
                        CATEGORY_COLORS[rel.category] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {rel.category}
                    </span>
                    <h3 className="font-playfair text-lg font-bold text-dark group-hover:text-primary-600 transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{rel.description}</p>
                    {rel.priceFrom && (
                      <div className="text-primary-600 text-xs font-semibold mt-3">
                        From IDR {formatPrice(rel.priceFrom)}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
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
