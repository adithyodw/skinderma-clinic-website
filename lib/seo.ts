import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://skindermaclinic.com';

export const defaultSEO = {
  siteName: 'SkinDerma Aesthetic Clinic',
  siteUrl: baseUrl,
  defaultTitle: 'SkinDerma Aesthetic Clinic Batam | Klinik Estetika Terpercaya',
  defaultDescription:
    'SkinDerma Aesthetic Clinic Batam – Layanan kecantikan medis terpercaya meliputi Botox, Filler, Laser, Perawatan Kulit, dan lainnya. Ditangani oleh dokter berpengalaman. Batam, Indonesia.',
  defaultImage: `${baseUrl}/images/og-default.jpg`,
  twitterHandle: '@skindermaclinic',
};

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords,
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string[];
}): Metadata {
  const fullTitle = title
    ? `${title} | SkinDerma Aesthetic Clinic Batam`
    : defaultSEO.defaultTitle;
  const desc = description || defaultSEO.defaultDescription;
  const img = image || defaultSEO.defaultImage;
  const pageUrl = url ? `${baseUrl}${url}` : baseUrl;

  return {
    title: fullTitle,
    description: desc,
    keywords: keywords || [
      'klinik estetika batam',
      'aesthetic clinic batam',
      'botox batam',
      'filler batam',
      'laser treatment batam',
      'perawatan kulit batam',
      'klinik kecantikan batam',
      'skin care batam',
      'aesthetic clinic singapore',
      'skindermaclinic',
    ],
    authors: [{ name: 'SkinDerma Aesthetic Clinic' }],
    creator: 'SkinDerma Aesthetic Clinic',
    publisher: 'SkinDerma Aesthetic Clinic',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: pageUrl,
      languages: {
        'id-ID': pageUrl,
        'en-US': pageUrl,
      },
    },
    openGraph: {
      type,
      url: pageUrl,
      title: fullTitle,
      description: desc,
      images: [
        {
          url: img,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      siteName: defaultSEO.siteName,
      locale: 'id_ID',
      alternateLocale: ['en_US', 'zh_SG'],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [img],
      creator: defaultSEO.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function generateClinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'SkinDerma Aesthetic Clinic',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    image: `${baseUrl}/images/clinic-exterior.jpg`,
    description:
      'SkinDerma adalah klinik estetika terpercaya di Batam yang menyediakan layanan kecantikan medis berkualitas tinggi.',
    telephone: process.env.NEXT_PUBLIC_CLINIC_PHONE,
    email: process.env.NEXT_PUBLIC_CLINIC_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Batam Centre',
      addressLocality: 'Batam',
      addressRegion: 'Kepulauan Riau',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '1.1301',
      longitude: '104.0529',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '15:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/skindermaclinic/',
      'https://www.facebook.com/skindermaclinicbatam/',
    ],
    medicalSpecialty: ['Dermatology', 'Aesthetic Medicine'],
    availableService: [
      { '@type': 'MedicalProcedure', name: 'Botox Treatment' },
      { '@type': 'MedicalProcedure', name: 'Dermal Fillers' },
      { '@type': 'MedicalProcedure', name: 'Laser Treatment' },
      { '@type': 'MedicalProcedure', name: 'Chemical Peel' },
      { '@type': 'MedicalProcedure', name: 'Skin Rejuvenation' },
    ],
  };
}
