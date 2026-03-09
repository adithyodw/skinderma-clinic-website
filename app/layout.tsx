import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://skindermaclinic.com'),
  title: {
    default: 'Skinderma Aesthetic Clinic — Batam Acne & Melasma Centre',
    template: '%s | Skinderma Aesthetic Clinic Batam',
  },
  description: 'Physician-led aesthetic clinic in Batam specialising in acne treatment, melasma management, laser therapy, HIFU, and medical-grade skincare. Serving patients from Indonesia, Singapore & Malaysia. Founded by dr. Yeyen Handoko.',
  keywords: [
    'klinik kecantikan batam', 'aesthetic clinic batam', 'skinderma batam',
    'dokter kulit batam', 'perawatan jerawat batam', 'melasma batam',
    'laser wajah batam', 'HIFU batam', 'chemical peel batam',
    'dermapen batam', 'filler batam', 'botox batam',
    'skin clinic near singapore', 'batam beauty clinic',
    'dr yeyen handoko', 'skinderma aesthetic clinic',
  ],
  authors: [{ name: 'dr. Yeyen Handoko', url: 'https://skindermaclinic.com/about' }],
  creator: 'Skinderma Aesthetic Clinic',
  publisher: 'Skinderma Aesthetic Clinic',
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: 'en_US',
    url: 'https://skindermaclinic.com',
    siteName: 'Skinderma Aesthetic Clinic',
    title: 'Skinderma Aesthetic Clinic — Batam Acne & Melasma Centre',
    description: 'Physician-led aesthetic clinic in Batam specialising in acne, melasma, laser, HIFU and medical skincare. Serving patients from Indonesia, Singapore & Malaysia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Skinderma Aesthetic Clinic Batam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skinderma Aesthetic Clinic — Batam',
    description: 'Physician-led aesthetic clinic in Batam. Acne, melasma, laser, HIFU & medical skincare.',
    images: ['/og-image.jpg'],
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
    google: 'google-site-verification-placeholder',
  },
  alternates: {
    canonical: 'https://skindermaclinic.com',
    languages: {
      'id-ID': 'https://skindermaclinic.com',
      'en-US': 'https://skindermaclinic.com/en',
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalClinic',
              name: 'Skinderma Aesthetic Clinic',
              description: 'Physician-led aesthetic clinic in Batam specialising in acne, melasma, laser therapy and medical skincare.',
              url: 'https://skindermaclinic.com',
              telephone: '+62-812-6188-4912',
              email: 'info@skindermaclinic.com',
              foundingDate: '2021-10',
              founder: {
                '@type': 'Person',
                name: 'dr. Yeyen Handoko',
                jobTitle: 'Founder & Lead Aesthetic Physician',
              },
              address: [
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Ruko Greenland Blok C No. 7, Jl. Komolek Green Land, Teluk Tering',
                  addressLocality: 'Batam Kota',
                  addressRegion: 'Kepulauan Riau',
                  postalCode: '29461',
                  addressCountry: 'ID',
                  name: 'Batam Center Branch',
                },
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Ruko Buana Mas 2 No. 22, Tembesi',
                  addressLocality: 'Batu Aji',
                  addressRegion: 'Kepulauan Riau',
                  addressCountry: 'ID',
                  name: 'Batu Aji Branch',
                },
              ],
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                  opens: '10:00',
                  closes: '19:00',
                },
              ],
              sameAs: [
                'https://www.instagram.com/skindermaclinic/',
                'https://www.facebook.com/skindermaclinicbatam/',
              ],
              medicalSpecialty: ['Dermatology', 'Aesthetic Medicine'],
              hasMap: 'https://maps.google.com/?q=Skinderma+Aesthetic+Clinic+Batam',
            }),
          }}
        />
      </body>
    </html>
  );
}
