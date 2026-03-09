import AboutClient from './AboutClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Skinderma Aesthetic Clinic | Batam Acne & Melasma Centre',
  description:
    'Learn about Skinderma Aesthetic Clinic in Batam — physician-led aesthetic medicine specialising in acne and melasma treatment. Meet our doctor dr. Yeyen Handoko.',
};

export default function AboutPage() {
  return <AboutClient />;
}
