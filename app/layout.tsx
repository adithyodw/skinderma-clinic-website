import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { generateClinicSchema } from '@/lib/seo';

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
  title: {
    default: 'SkinDerma Aesthetic Clinic Batam | Klinik Estetika Terpercaya',
    template: '%s | SkinDerma Aesthetic Clinic Batam',
  },
  description:
    'SkinDerma Aesthetic Clinic Batam – Layanan kecantikan medis terpercaya: Botox, Filler, Laser, Perawatan Kulit. Ditangani dokter berpengalaman. Melayani Indonesia, Malaysia & Singapura.',
  keywords: [
    'klinik estetika batam',
    'aesthetic clinic batam',
    'botox batam',
    'filler batam',
    'laser batam',
    'perawatan kulit batam',
    'skindermaclinic',
  ],
  authors: [{ name: 'SkinDerma Aesthetic Clinic' }],
  creator: 'SkinDerma Aesthetic Clinic',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://skindermaclinic.com'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://skindermaclinic.com',
    siteName: 'SkinDerma Aesthetic Clinic',
    title: 'SkinDerma Aesthetic Clinic Batam | Klinik Estetika Terpercaya',
    description:
      'Klinik estetika terpercaya di Batam melayani pasien dari Indonesia, Malaysia & Singapura.',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkinDerma Aesthetic Clinic Batam',
    description: 'Klinik estetika terpercaya di Batam',
    images: ['/images/og-default.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = generateClinicSchema();

  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
