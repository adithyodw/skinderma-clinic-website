// ============================================================
// SKINDERMA CLINIC - TYPE DEFINITIONS
// ============================================================

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  credentials: string[];
  education: string[];
  yearsExperience: number;
  bio: string;
  photoUrl: string;
  slug: string;
}

export interface Procedure {
  id: string;
  slug: string;
  name: string;
  nameId: string; // Indonesian
  category: ProcedureCategory;
  description: string;
  descriptionId: string;
  benefits: string[];
  benefitsId: string[];
  duration: string;
  recovery: string;
  priceFrom?: number;
  currency: string;
  beforeAfterImages: BeforeAfterImage[];
  faqs: FAQ[];
  faqsId: FAQ[];
  heroImage: string;
  icon: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProcedureCategory =
  | 'injectables'
  | 'laser'
  | 'rejuvenation'
  | 'peels'
  | 'microblading'
  | 'skincare'
  | 'body';

export interface BeforeAfterImage {
  beforeUrl: string;
  afterUrl: string;
  caption: string;
  captionId: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleId: string;
  excerpt: string;
  excerptId: string;
  content: string;
  contentId: string;
  coverImage: string;
  author: string;
  authorPhoto: string;
  category: BlogCategory;
  tags: string[];
  readTime: number;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type BlogCategory =
  | 'skincare-tips'
  | 'procedures'
  | 'news'
  | 'lifestyle'
  | 'before-after';

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameId: string;
  brand: string;
  description: string;
  descriptionId: string;
  images: string[];
  priceIdr: number;
  priceSgd?: number;
  priceMyr?: number;
  category: ProductCategory;
  stock: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory =
  | 'moisturizer'
  | 'serum'
  | 'sunscreen'
  | 'cleanser'
  | 'toner'
  | 'treatment'
  | 'mask'
  | 'eye-care'
  | 'supplement';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  treatment: string;
  rating: number;
  comment: string;
  commentId: string;
  photoUrl?: string;
  date: Date;
  verified: boolean;
  featured: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  procedure: string;
  doctor: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
}

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled';

export interface Patient {
  id: string;
  uid: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  city?: string;
  country?: string;
  allergies?: string[];
  medicalHistory?: string;
  treatmentHistory: TreatmentRecord[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TreatmentRecord {
  id: string;
  date: Date;
  procedure: string;
  doctor: string;
  notes: string;
  beforePhoto?: string;
  afterPhoto?: string;
}

export interface GalleryItem {
  id: string;
  beforeUrl: string;
  afterUrl: string;
  procedure: string;
  caption: string;
  captionId: string;
  featured: boolean;
  createdAt: Date;
}

export interface Promotion {
  id: string;
  title: string;
  titleId: string;
  description: string;
  descriptionId: string;
  discountPercent?: number;
  priceOld?: number;
  priceNew?: number;
  validFrom: Date;
  validUntil: Date;
  imageUrl?: string;
  procedures: string[];
  active: boolean;
  featured: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredLanguage: 'id' | 'en';
}

export interface ClinicSettings {
  clinicName: string;
  tagline: string;
  taglineId: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  addressId: string;
  city: string;
  country: string;
  googleMapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  businessHours: BusinessHours[];
  heroVideo?: string;
}

export interface BusinessHours {
  day: string;
  dayId: string;
  open: string;
  close: string;
  closed: boolean;
}

export type Currency = 'IDR' | 'SGD' | 'MYR';
export type Language = 'id' | 'en';
