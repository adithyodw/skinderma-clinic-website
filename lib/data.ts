// ============================================================
// SKINDERMA AESTHETIC CLINIC — STATIC DATA
// Real clinic: Batam Acne & Melasma Centre
// Phone/WA: +62 812-6188-4912
// Address: Ruko Greenland Blok C No.07, Teluk Tering, Batam Kota
// ============================================================

import { Procedure, Doctor, Testimonial, BlogPost, Product, GalleryItem } from './types';

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281261884912';
export const CLINIC_PHONE = '+62 812-6188-4912';
export const CLINIC_PHONE_BATU_AJI = '+62 823-9298-7468';
export const CLINIC_EMAIL = 'info@skindermaclinic.com';
export const CLINIC_ADDRESS = 'Ruko Greenland Blok C No. 7, Jl. Komolek Green Land, Teluk Tering, Kec. Batam Kota, Kota Batam, Kepulauan Riau';
export const CLINIC_ADDRESS_SHORT = 'Ruko Greenland Blok C No. 7, Batam Center';
export const CLINIC_ADDRESS_BATU_AJI = 'Ruko Buana Mas 2 No. 22, Tembesi, Batu Aji, Batam';
export const CLINIC_GMAPS = 'https://maps.google.com/?q=Skinderma+Aesthetic+Clinic+Batam';
export const CLINIC_INSTAGRAM = 'https://www.instagram.com/skindermaclinic/';
export const CLINIC_FACEBOOK = 'https://www.facebook.com/skindermaclinicbatam/';

export function getWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(
    message ||
      'Halo Skinderma Aesthetic Clinic! Saya ingin mengetahui lebih lanjut tentang layanan Anda dan ingin membuat janji konsultasi.'
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

// ── Procedures ────────────────────────────────────────────────────────────────

export const PROCEDURES: Procedure[] = [
  {
    id: '1',
    slug: 'facial-treatment',
    name: 'Facial Treatment',
    nameId: 'Perawatan Wajah',
    category: 'skincare',
    description:
      'A comprehensive facial treatment tailored to your skin type and condition. Our medical-grade facial protocol deeply cleanses, exfoliates, and nourishes the skin — addressing concerns such as congestion, dullness, dehydration, and early signs of aging under physician supervision.',
    descriptionId:
      'Perawatan wajah komprehensif yang disesuaikan dengan jenis dan kondisi kulit Anda. Protokol facial medis kami membersihkan secara mendalam, mengeksfoliasi, dan menutrisi kulit — mengatasi masalah seperti penyumbatan pori, kulit kusam, dehidrasi, dan tanda-tanda awal penuaan di bawah pengawasan dokter.',
    benefits: [
      'Deep pore cleansing and extraction',
      'Improved skin clarity and radiance',
      'Balanced sebum production',
      'Hydration and barrier restoration',
      'Customised to your skin condition',
    ],
    benefitsId: [
      'Pembersihan pori yang mendalam',
      'Peningkatan kejernihan dan kecerahan kulit',
      'Produksi sebum yang seimbang',
      'Hidrasi dan pemulihan skin barrier',
      'Disesuaikan dengan kondisi kulit Anda',
    ],
    duration: '60–90 minutes',
    recovery: 'None',
    priceFrom: 250000,
    currency: 'IDR',
    beforeAfterImages: [],
    faqs: [
      {
        question: 'How often should I get a facial?',
        answer:
          'For most skin types, a monthly facial is recommended to align with the skin\'s natural cell turnover cycle (approximately 28 days). Your doctor will advise the optimal frequency based on your specific condition.',
      },
      {
        question: 'Is the facial suitable for sensitive skin?',
        answer:
          'Yes. Our facial protocols are adapted for all skin types including sensitive skin. We use only professional-grade, clinically tested products under physician supervision.',
      },
    ],
    faqsId: [
      {
        question: 'Seberapa sering saya harus melakukan facial?',
        answer:
          'Untuk sebagian besar jenis kulit, facial bulanan direkomendasikan sesuai siklus pergantian sel alami kulit (sekitar 28 hari). Dokter kami akan menyarankan frekuensi optimal berdasarkan kondisi spesifik Anda.',
      },
    ],
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&auto=format&fit=crop',
    icon: '',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    slug: 'dermapen-microneedling',
    name: 'Dermapen 4.0',
    nameId: 'Dermapen 4.0 (Microneedling)',
    category: 'rejuvenation',
    description:
      'Dermapen 4.0 is the world\'s most advanced microneedling device, creating controlled micro-channels in the skin to stimulate the body\'s natural collagen and elastin production. Clinically proven to treat acne scars, enlarged pores, fine lines, and uneven skin texture with minimal downtime.',
    descriptionId:
      'Dermapen 4.0 adalah perangkat microneedling paling canggih di dunia, menciptakan saluran mikro terkontrol pada kulit untuk merangsang produksi kolagen dan elastin alami tubuh. Terbukti secara klinis untuk mengobati bekas jerawat, pori-pori besar, garis halus, dan tekstur kulit yang tidak merata dengan downtime minimal.',
    benefits: [
      'Reduces acne scars and post-inflammatory marks',
      'Minimises enlarged pores',
      'Stimulates collagen and elastin synthesis',
      'Improves fine lines and skin laxity',
      'Safe for all Fitzpatrick skin types',
    ],
    benefitsId: [
      'Mengurangi bekas jerawat dan bekas peradangan',
      'Meminimalkan pori-pori yang membesar',
      'Merangsang sintesis kolagen dan elastin',
      'Memperbaiki garis halus dan kelonggaran kulit',
      'Aman untuk semua jenis kulit Fitzpatrick',
    ],
    duration: '45–60 minutes',
    recovery: '24–48 hours',
    priceFrom: 500000,
    currency: 'IDR',
    beforeAfterImages: [],
    faqs: [
      {
        question: 'How many Dermapen sessions will I need?',
        answer:
          'A typical course is 3–6 sessions spaced 4 weeks apart. For acne scarring, 6 or more sessions may be recommended. Your doctor will create a personalised treatment plan at your consultation.',
      },
      {
        question: 'Is Dermapen 4.0 painful?',
        answer:
          'A topical numbing cream is applied 30–45 minutes before treatment, making the procedure comfortable for most patients. You may experience a warm or prickling sensation during treatment.',
      },
    ],
    faqsId: [],
    heroImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200',
    icon: '',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    slug: 'nd-yag-laser',
    name: 'Nd:YAG Laser',
    nameId: 'Laser Nd:YAG',
    category: 'laser',
    description:
      'The Nd:YAG (Neodymium-doped Yttrium Aluminium Garnet) laser is the gold standard for treating pigmentation disorders in Asian skin types. At 1064nm, it selectively targets melanin deposits without damaging surrounding tissue — delivering visible improvement in melasma, hyperpigmentation, freckles, and overall skin tone.',
    descriptionId:
      'Laser Nd:YAG adalah standar emas untuk mengobati gangguan pigmentasi pada jenis kulit Asia. Pada 1064nm, ia secara selektif menargetkan deposit melanin tanpa merusak jaringan sekitarnya — memberikan perbaikan yang terlihat pada melasma, hiperpigmentasi, bintik-bintik, dan warna kulit secara keseluruhan.',
    benefits: [
      'Targets melasma and hyperpigmentation',
      'Safe for dark skin tones (Fitzpatrick IV–VI)',
      'Reduces freckles and sun spots',
      'Stimulates collagen with skin tightening effect',
      'No significant downtime',
    ],
    benefitsId: [
      'Menargetkan melasma dan hiperpigmentasi',
      'Aman untuk kulit berwarna gelap (Fitzpatrick IV–VI)',
      'Mengurangi bintik-bintik dan bintik matahari',
      'Merangsang kolagen dengan efek pengencangan kulit',
      'Tanpa downtime yang signifikan',
    ],
    duration: '30–45 minutes',
    recovery: 'Minimal (1–3 days)',
    priceFrom: 400000,
    currency: 'IDR',
    beforeAfterImages: [],
    faqs: [
      {
        question: 'How many laser sessions will I need for melasma?',
        answer:
          'Melasma typically requires a series of 6–10 sessions, with maintenance treatments thereafter. Results vary depending on the depth and severity of the pigmentation. A thorough skin assessment is performed before treatment.',
      },
      {
        question: 'Is Nd:YAG laser safe for Indonesian skin tones?',
        answer:
          'Yes. The 1064nm Nd:YAG wavelength is specifically well-suited for darker Asian skin tones as it has a lower affinity for epidermal melanin, significantly reducing the risk of post-inflammatory hyperpigmentation.',
      },
    ],
    faqsId: [],
    heroImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200',
    icon: '',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    slug: 'hifu',
    name: 'HIFU',
    nameId: 'HIFU (High-Intensity Focused Ultrasound)',
    category: 'rejuvenation',
    description:
      'High-Intensity Focused Ultrasound (HIFU) is a non-invasive lifting and tightening treatment that delivers precisely focused ultrasound energy to the foundational layers of the skin — the same depth targeted in surgical facelifts. It stimulates new collagen production, visibly lifting and firming the face, neck, and décolletage without surgery.',
    descriptionId:
      'HIFU adalah perawatan pengencangan dan pengangkatan non-invasif yang mengirimkan energi ultrasound terfokus ke lapisan dasar kulit — kedalaman yang sama yang ditargetkan dalam facelift bedah. Ini merangsang produksi kolagen baru, mengangkat dan mengencangkan wajah, leher, dan décolletage secara terlihat tanpa operasi.',
    benefits: [
      'Non-surgical face and neck lifting',
      'Stimulates deep collagen remodelling',
      'Visible results in 2–3 months',
      'Single treatment with long-lasting effect',
      'No incisions, no anaesthesia required',
    ],
    benefitsId: [
      'Pengangkatan wajah dan leher non-bedah',
      'Merangsang remodeling kolagen yang mendalam',
      'Hasil terlihat dalam 2–3 bulan',
      'Perawatan tunggal dengan efek tahan lama',
      'Tanpa sayatan, tanpa anestesi',
    ],
    duration: '60–90 minutes',
    recovery: 'None to minimal',
    priceFrom: 1500000,
    currency: 'IDR',
    beforeAfterImages: [],
    faqs: [
      {
        question: 'How long do HIFU results last?',
        answer:
          'Most patients enjoy results for 12–18 months. A maintenance treatment once a year is typically recommended to sustain the lifting effect as the natural ageing process continues.',
      },
      {
        question: 'Who is a good candidate for HIFU?',
        answer:
          'HIFU is best suited for patients in their 30s–50s with mild to moderate skin laxity who are looking for a non-surgical lifting solution. It is not recommended for patients with severe skin sagging, who may be better served by surgical options.',
      },
    ],
    faqsId: [],
    heroImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200',
    icon: '',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    slug: 'radio-frequency',
    name: 'Radio Frequency (RF)',
    nameId: 'Radio Frequency (RF)',
    category: 'rejuvenation',
    description:
      'Radio Frequency therapy uses controlled electromagnetic energy to gently heat the deep dermis, stimulating collagen contraction and neocollagenesis. It is an effective, non-invasive solution for skin tightening, improving skin laxity, reducing fine lines, and contouring the face and body.',
    descriptionId:
      'Terapi Radio Frequency menggunakan energi elektromagnetik terkontrol untuk memanaskan dermis dalam secara lembut, merangsang kontraksi kolagen dan neocollagenesis. Ini adalah solusi efektif, non-invasif untuk pengencangan kulit, meningkatkan kelonggaran kulit, mengurangi garis halus, dan mengkontur wajah dan tubuh.',
    benefits: [
      'Tightens and firms lax skin',
      'Reduces fine lines and wrinkles',
      'Non-invasive body contouring',
      'Stimulates neocollagenesis',
      'Comfortable treatment with no downtime',
    ],
    benefitsId: [
      'Mengencangkan kulit yang longgar',
      'Mengurangi garis halus dan kerutan',
      'Konturing tubuh non-invasif',
      'Merangsang pembentukan kolagen baru',
      'Perawatan nyaman tanpa downtime',
    ],
    duration: '45–60 minutes',
    recovery: 'None',
    priceFrom: 600000,
    currency: 'IDR',
    beforeAfterImages: [],
    faqs: [],
    faqsId: [],
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200',
    icon: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    slug: 'mesotherapy',
    name: 'Mesotherapy',
    nameId: 'Mesotherapy',
    category: 'injectables',
    description:
      'Mesotherapy is a minimally invasive technique that delivers a customised cocktail of vitamins, minerals, amino acids, and hyaluronic acid directly into the mesoderm (middle layer of the skin). It effectively hydrates, revitalises, and brightens the skin from within, while also addressing hair loss when applied to the scalp.',
    descriptionId:
      'Mesotherapy adalah teknik invasif minimal yang memberikan cocktail khusus vitamin, mineral, asam amino, dan hyaluronic acid langsung ke mesoderm (lapisan tengah kulit). Ini secara efektif menghidrasi, meremajakan, dan mencerahkan kulit dari dalam, sekaligus mengatasi kerontokan rambut saat diaplikasikan pada kulit kepala.',
    benefits: [
      'Deep skin hydration and luminosity',
      'Delivers active ingredients directly to target depth',
      'Improves skin tone and elasticity',
      'Addresses hair thinning and loss (scalp protocol)',
      'Natural-looking, gradual results',
    ],
    benefitsId: [
      'Hidrasi kulit yang mendalam dan luminositas',
      'Mengirimkan bahan aktif langsung ke kedalaman target',
      'Meningkatkan warna dan elastisitas kulit',
      'Mengatasi penipisan dan kerontokan rambut (protokol kulit kepala)',
      'Hasil alami dan bertahap',
    ],
    duration: '30–45 minutes',
    recovery: '24 hours',
    priceFrom: 450000,
    currency: 'IDR',
    beforeAfterImages: [],
    faqs: [],
    faqsId: [],
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200',
    icon: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    slug: 'chemical-peel',
    name: 'Chemical Peel',
    nameId: 'Chemical Peel',
    category: 'peels',
    description:
      'Medical-grade chemical peels use controlled application of exfoliating acids to remove damaged outer skin layers and stimulate cellular renewal. Available in superficial, medium, and deep formulations, our peels are precisely selected by our physician to address acne, post-inflammatory hyperpigmentation, melasma, and dull skin — core specialisations of our clinic.',
    descriptionId:
      'Chemical peel kelas medis menggunakan aplikasi terkontrol asam eksfoliasi untuk mengangkat lapisan kulit luar yang rusak dan merangsang pembaruan sel. Tersedia dalam formulasi superfisial, medium, dan dalam, peel kami dipilih dengan tepat oleh dokter kami untuk mengatasi jerawat, hiperpigmentasi pasca inflamasi, melasma, dan kulit kusam.',
    benefits: [
      'Treats acne and comedones',
      'Fades post-acne hyperpigmentation',
      'Improves skin texture and radiance',
      'Targets melasma with medical formulations',
      'Stimulates healthy skin cell renewal',
    ],
    benefitsId: [
      'Mengobati jerawat dan komedo',
      'Memudarkan hiperpigmentasi pasca jerawat',
      'Meningkatkan tekstur dan kecerahan kulit',
      'Menargetkan melasma dengan formulasi medis',
      'Merangsang pembaruan sel kulit yang sehat',
    ],
    duration: '30–45 minutes',
    recovery: '3–7 days',
    priceFrom: 300000,
    currency: 'IDR',
    beforeAfterImages: [],
    faqs: [
      {
        question: 'Will my skin peel visibly after treatment?',
        answer:
          'Superficial peels typically cause mild flaking for 2–3 days. Medium peels may result in more visible peeling for 5–7 days. Your physician will select the appropriate peel depth based on your skin condition and tolerance.',
      },
    ],
    faqsId: [],
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200',
    icon: '',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    slug: 'dna-salmon-therapy',
    name: 'DNA Salmon Therapy',
    nameId: 'Terapi DNA Salmon',
    category: 'injectables',
    description:
      'DNA Salmon Therapy (PDRN — Polydeoxyribonucleotide) utilises biocompatible polynucleotides derived from salmon DNA to stimulate tissue repair, accelerate wound healing, and intensively hydrate the skin. It activates fibroblast activity, promoting the synthesis of collagen and elastin while reducing inflammation and oxidative stress.',
    descriptionId:
      'Terapi DNA Salmon (PDRN) menggunakan polinukleotida biokompatibel yang berasal dari DNA salmon untuk merangsang perbaikan jaringan, mempercepat penyembuhan luka, dan menghidrasi kulit secara intensif. Ini mengaktifkan aktivitas fibroblas, mendorong sintesis kolagen dan elastin sambil mengurangi peradangan.',
    benefits: [
      'Accelerates skin repair and healing',
      'Intense hydration at cellular level',
      'Reduces inflammation and redness',
      'Stimulates collagen and elastin production',
      'Improves skin quality and luminosity',
    ],
    benefitsId: [
      'Mempercepat perbaikan dan penyembuhan kulit',
      'Hidrasi intens di tingkat sel',
      'Mengurangi peradangan dan kemerahan',
      'Merangsang produksi kolagen dan elastin',
      'Meningkatkan kualitas dan luminositas kulit',
    ],
    duration: '30–45 minutes',
    recovery: '24–48 hours',
    priceFrom: 700000,
    currency: 'IDR',
    beforeAfterImages: [],
    faqs: [],
    faqsId: [],
    heroImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200',
    icon: '',
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '9',
    slug: 'vitamin-injection',
    name: 'Vitamin & Booster Injections',
    nameId: 'Injeksi Vitamin & Booster',
    category: 'injectables',
    description:
      'Our physician-administered injection protocols deliver high-potency vitamins and nutritional compounds directly into the bloodstream or dermis for maximum bioavailability. Available formulations include Vitamin C (brightening & antioxidant), Immune Booster, and Whitening complex — each tailored to your health and aesthetic goals.',
    descriptionId:
      'Protokol injeksi yang diberikan oleh dokter kami mengantarkan vitamin dan senyawa gizi berpotensi tinggi langsung ke aliran darah atau dermis untuk bioavailabilitas maksimal. Formulasi yang tersedia meliputi Vitamin C (pencerah & antioksidan), Immune Booster, dan kompleks Pemutih — masing-masing disesuaikan dengan tujuan kesehatan dan estetika Anda.',
    benefits: [
      'High bioavailability versus oral supplementation',
      'Vitamin C: brightening, antioxidant protection',
      'Immune Booster: strengthens systemic immunity',
      'Whitening complex: reduces melanin synthesis',
      'Quick administration with immediate effect',
    ],
    benefitsId: [
      'Bioavailabilitas tinggi dibandingkan suplemen oral',
      'Vitamin C: pencerah, perlindungan antioksidan',
      'Immune Booster: memperkuat kekebalan sistemik',
      'Kompleks pemutih: mengurangi sintesis melanin',
      'Administrasi cepat dengan efek langsung',
    ],
    duration: '15–30 minutes',
    recovery: 'None',
    priceFrom: 200000,
    currency: 'IDR',
    beforeAfterImages: [],
    faqs: [],
    faqsId: [],
    heroImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200',
    icon: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    slug: 'cauter',
    name: 'Electrocautery (Cauter)',
    nameId: 'Elektrokauter (Cauter)',
    category: 'skincare',
    description:
      'Electrocautery (cauter) is a precise, physician-performed procedure using controlled electrical current to remove benign skin lesions including skin tags, milia, sebaceous hyperplasia, and small warts. The procedure is quick, targeted, and leaves minimal scarring when performed correctly by a trained medical professional.',
    descriptionId:
      'Elektrokauter adalah prosedur presisi yang dilakukan dokter menggunakan arus listrik terkontrol untuk mengangkat lesi kulit jinak termasuk skin tag, milia, hiperplasia sebasea, dan kutil kecil. Prosedur ini cepat, terarah, dan meninggalkan bekas minimal ketika dilakukan dengan benar oleh profesional medis terlatih.',
    benefits: [
      'Precise removal of skin tags and milia',
      'Minimal surrounding tissue damage',
      'Quick in-clinic procedure',
      'Performed by licensed physician',
      'Minimal scarring with proper aftercare',
    ],
    benefitsId: [
      'Pengangkatan presisi skin tag dan milia',
      'Kerusakan jaringan sekitar minimal',
      'Prosedur klinik yang cepat',
      'Dilakukan oleh dokter berlisensi',
      'Bekas minimal dengan perawatan pasca yang tepat',
    ],
    duration: '15–30 minutes',
    recovery: '5–7 days',
    priceFrom: 150000,
    currency: 'IDR',
    beforeAfterImages: [],
    faqs: [],
    faqsId: [],
    heroImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200',
    icon: '',
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ── Doctors ───────────────────────────────────────────────────────────────────

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'dr. Yeyen Handoko',
    title: 'Founder & Lead Aesthetic Physician',
    specialty: 'Medical Aesthetics — Acne & Melasma',
    credentials: [
      'Medical Doctor (Dokter Umum)',
      'Certified Aesthetic Practitioner',
      'Acne & Melasma Specialist',
    ],
    education: [
      'Faculty of Medicine',
      'Aesthetic Medicine Training — Singapore & Jakarta',
    ],
    yearsExperience: 5,
    bio: 'dr. Yeyen Handoko founded Skinderma Aesthetic Clinic in October 2021 with a dedicated focus on evidence-based aesthetic medicine for Asian skin types. Specialising in acne and melasma management, dr. Yeyen has treated thousands of patients from Indonesia, Singapore, and Malaysia — combining clinical precision with a patient-centred approach.',
    photoUrl: '/yeyen.jpg',
    slug: 'dr-yeyen-handoko',
  },
  {
    id: '2',
    name: 'dr. Jessica',
    title: 'Aesthetic Physician',
    specialty: 'Medical Aesthetics',
    credentials: [
      'Medical Doctor (Dokter Umum)',
      'Certified Aesthetic Practitioner',
    ],
    education: ['Faculty of Medicine'],
    yearsExperience: 3,
    bio: 'dr. Jessica serves patients at the Batam Center branch of Skinderma Aesthetic Clinic. With training in medical aesthetics, she continues the clinic\'s commitment to evidence-based skin treatments and personalised patient care.',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    slug: 'dr-jessica',
  },
  {
    id: '3',
    name: 'dr. Dea',
    title: 'Aesthetic Physician',
    specialty: 'Medical Aesthetics',
    credentials: [
      'Medical Doctor (Dokter Umum)',
      'Certified Aesthetic Practitioner',
    ],
    education: ['Faculty of Medicine'],
    yearsExperience: 3,
    bio: 'dr. Dea serves patients at the Batu Aji branch of Skinderma Aesthetic Clinic in Tembesi. She brings a dedicated approach to acne and skin care management for all patients visiting the Batu Aji location.',
    photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    slug: 'dr-dea',
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Priscilla Tan',
    location: 'Singapore',
    treatment: 'Nd:YAG Laser',
    rating: 5,
    comment:
      'I travelled from Singapore specifically for Skinderma and it was absolutely worth every trip. The clinic is immaculate, the doctor is knowledgeable and takes time to explain everything. My melasma has improved dramatically after 4 sessions. I will continue returning.',
    commentId:
      'Saya datang dari Singapura khusus untuk Skinderma dan itu sepadan. Kliniknya sangat bersih, dokternya berpengetahuan dan meluangkan waktu untuk menjelaskan segalanya. Melasma saya telah membaik secara dramatis setelah 4 sesi.',
    date: new Date('2024-11-15'),
    verified: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Dewi Rahayu',
    location: 'Batam',
    treatment: 'Dermapen 4.0',
    rating: 5,
    comment:
      'Sudah coba berbagai klinik di Batam tapi Skinderma yang paling memuaskan. Dokternya sabar menjelaskan setiap prosedur dan hasilnya luar biasa. Bekas jerawat saya yang sudah bertahun-tahun akhirnya bisa teratasi dengan Dermapen. Highly recommended!',
    commentId:
      'Sudah coba berbagai klinik di Batam tapi Skinderma yang paling memuaskan. Bekas jerawat saya yang sudah bertahun-tahun akhirnya bisa teratasi.',
    date: new Date('2024-10-22'),
    verified: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Amirah Hassan',
    location: 'Johor Bahru, Malaysia',
    treatment: 'Chemical Peel + Laser',
    rating: 5,
    comment:
      'Found Skinderma through a friend\'s recommendation and I\'m so glad I did. The clinic environment is professional and calming. The combination of chemical peel and laser for my pigmentation has given me skin I am genuinely proud of. The doctor is very attentive.',
    commentId:
      'Menemukan Skinderma melalui rekomendasi teman dan saya sangat senang. Lingkungan klinik sangat profesional dan menenangkan. Kombinasi chemical peel dan laser telah memberikan kulit yang benar-benar saya banggakan.',
    date: new Date('2024-12-01'),
    verified: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Cindy Wijaya',
    location: 'Batam',
    treatment: 'DNA Salmon Therapy',
    rating: 5,
    comment:
      'Terapi DNA Salmon di Skinderma luar biasa! Kulit langsung terasa lebih lembab dan cerah setelah sesi pertama. Dokter sangat profesional dalam menjelaskan dan memberikan rekomendasi yang tepat. Pasti akan kembali!',
    commentId:
      'Terapi DNA Salmon di Skinderma luar biasa! Kulit langsung terasa lebih lembab dan cerah setelah sesi pertama.',
    date: new Date('2024-09-18'),
    verified: true,
    featured: true,
  },
];

// ── Blog Posts ────────────────────────────────────────────────────────────────

export const FEATURED_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'melasma-treatment-guide',
    title: 'Understanding Melasma: Causes, Triggers & Medical Treatment Options',
    titleId: 'Memahami Melasma: Penyebab, Pemicu & Pilihan Pengobatan Medis',
    excerpt:
      'Melasma is one of the most challenging pigmentation disorders to treat, particularly in Asian skin tones. Our physician explains the science behind melasma and the multi-modal treatment approach we use at Skinderma.',
    excerptId:
      'Melasma adalah salah satu gangguan pigmentasi yang paling menantang untuk diobati, terutama pada warna kulit Asia. Dokter kami menjelaskan ilmu di balik melasma dan pendekatan pengobatan multi-modal yang kami gunakan di Skinderma.',
    content: '',
    contentId: '',
    coverImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop',
    author: 'dr. Yeyen Handoko',
    authorPhoto: '/yeyen.jpg',
    category: 'procedures',
    tags: ['melasma', 'pigmentation', 'laser', 'asian skin'],
    readTime: 8,
    published: true,
    featured: true,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: '2',
    slug: 'acne-scar-treatment-options',
    title: 'Acne Scars in Batam\'s Climate: Which Treatment Is Right for You?',
    titleId: 'Bekas Jerawat di Iklim Batam: Perawatan Mana yang Tepat untuk Anda?',
    excerpt:
      'Not all acne scars respond to the same treatment. From Dermapen microneedling to Nd:YAG laser and chemical peels, our doctor breaks down the evidence-based options for each scar type.',
    excerptId:
      'Tidak semua bekas jerawat merespons perawatan yang sama. Dari microneedling Dermapen hingga laser Nd:YAG dan chemical peel, dokter kami menjelaskan pilihan berbasis bukti untuk setiap jenis bekas luka.',
    content: '',
    contentId: '',
    coverImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop',
    author: 'dr. Yeyen Handoko',
    authorPhoto: '/yeyen.jpg',
    category: 'procedures',
    tags: ['acne scars', 'dermapen', 'laser', 'chemical peel'],
    readTime: 7,
    published: true,
    featured: true,
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date('2024-11-20'),
  },
  {
    id: '3',
    slug: 'sunscreen-guide-tropical-climate',
    title: 'The Physician\'s Guide to Daily Sun Protection in a Tropical Climate',
    titleId: 'Panduan Dokter untuk Perlindungan Matahari Harian di Iklim Tropis',
    excerpt:
      'Living near the equator in Batam means extreme year-round UV exposure. Our doctor explains why sun protection is the most critical step in any skincare routine — and how to do it correctly.',
    excerptId:
      'Tinggal di dekat khatulistiwa di Batam berarti paparan UV ekstrem sepanjang tahun. Dokter kami menjelaskan mengapa perlindungan matahari adalah langkah terpenting dalam rutinitas perawatan kulit.',
    content: '',
    contentId: '',
    coverImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop',
    author: 'dr. Yeyen Handoko',
    authorPhoto: '/yeyen.jpg',
    category: 'skincare-tips',
    tags: ['sunscreen', 'SPF', 'tropical', 'UV protection'],
    readTime: 6,
    published: true,
    featured: true,
    createdAt: new Date('2024-11-05'),
    updatedAt: new Date('2024-11-05'),
  },
  {
    id: '4',
    slug: 'beginner-skincare-routine',
    title: 'Building Your First Skincare Routine: A Beginner\'s Guide',
    titleId: 'Membangun Rutinitas Skincare Pertama Anda: Panduan untuk Pemula',
    excerpt:
      'A doctor-approved step-by-step guide to building your first effective skincare routine. Start simple, stay consistent, and learn what your skin actually needs — from cleansing to SPF.',
    excerptId:
      'Panduan langkah demi langkah yang disetujui dokter untuk membangun rutinitas perawatan kulit pertama Anda. Mulai dari sederhana, konsisten, dan pelajari apa yang benar-benar dibutuhkan kulit Anda.',
    content: '',
    contentId: '',
    coverImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop',
    author: 'dr. Yeyen Handoko',
    authorPhoto: '/yeyen.jpg',
    category: 'skincare-tips',
    tags: ['skincare routine', 'beginner', 'cleanser', 'moisturizer', 'SPF'],
    readTime: 6,
    published: true,
    featured: true,
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-10-15'),
  },
];

// ── Products ──────────────────────────────────────────────────────────────────

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'brightening-vitamin-c-serum',
    name: 'Brightening Vitamin C Serum 20%',
    nameId: 'Serum Vitamin C Pencerah 20%',
    brand: 'Skinderma',
    description:
      'A clinically-formulated 20% L-Ascorbic Acid serum stabilised with Tocopherol (Vitamin E) and Ferulic Acid. Delivers potent antioxidant protection, accelerates post-treatment recovery, fades hyperpigmentation, and promotes an even, luminous skin tone. Physician-recommended for post-laser and post-peel maintenance.',
    descriptionId:
      'Serum L-Asam Askorbat 20% yang diformulasikan secara klinis, distabilkan dengan Tocopherol (Vitamin E) dan Ferulic Acid. Memberikan perlindungan antioksidan yang kuat, mempercepat pemulihan pasca perawatan, memudarkan hiperpigmentasi, dan mendorong warna kulit yang merata dan bercahaya.',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'],
    priceIdr: 285000,
    priceSgd: 28,
    priceMyr: 85,
    category: 'serum',
    stock: 50,
    inStock: true,
    featured: true,
    tags: ['vitamin c', 'brightening', 'antioxidant', 'post-treatment'],
    rating: 4.8,
    reviewCount: 124,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    slug: 'spf-50-sunscreen-gel',
    name: 'Daily UV Shield SPF 50+ PA++++',
    nameId: 'Tabir Surya Harian SPF 50+ PA++++',
    brand: 'Skinderma',
    description:
      'A lightweight hybrid sunscreen combining chemical and physical UV filters (SPF 50+, PA++++) formulated for Southeast Asian skin in tropical climates. Non-comedogenic, absorbs rapidly without white cast, and is compatible with all in-clinic treatments. Daily use is non-negotiable for treatment maintenance.',
    descriptionId:
      'Tabir surya hybrid ringan yang menggabungkan filter UV kimia dan fisik (SPF 50+, PA++++) yang diformulasikan untuk kulit Asia Tenggara di iklim tropis. Non-komedogenik, menyerap cepat tanpa white cast, dan kompatibel dengan semua perawatan klinik.',
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'],
    priceIdr: 195000,
    priceSgd: 19,
    priceMyr: 58,
    category: 'sunscreen',
    stock: 100,
    inStock: true,
    featured: true,
    tags: ['sunscreen', 'SPF50', 'PA++++', 'daily', 'tropical'],
    rating: 4.9,
    reviewCount: 256,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    slug: 'retinol-night-treatment',
    name: 'Retinol 0.3% Night Treatment',
    nameId: 'Perawatan Malam Retinol 0.3%',
    brand: 'Skinderma',
    description:
      'A physician-formulated retinol night treatment using microencapsulated retinol for sustained, gentle release throughout the night. Clinically shown to reduce fine lines, accelerate cell turnover, refine skin texture, and improve the appearance of acne scars and post-inflammatory hyperpigmentation over time.',
    descriptionId:
      'Perawatan malam retinol yang diformulasikan dokter menggunakan retinol terenkapsulasi mikro untuk pelepasan bertahap dan lembut sepanjang malam. Terbukti secara klinis mengurangi garis halus, mempercepat pergantian sel, dan memperbaiki bekas jerawat.',
    images: ['https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=400'],
    priceIdr: 320000,
    priceSgd: 32,
    priceMyr: 95,
    category: 'treatment',
    stock: 35,
    inStock: true,
    featured: true,
    tags: ['retinol', 'anti-aging', 'acne scars', 'night treatment'],
    rating: 4.7,
    reviewCount: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    slug: 'barrier-repair-moisturiser',
    name: 'Barrier Repair Moisturiser',
    nameId: 'Pelembap Perbaikan Skin Barrier',
    brand: 'Skinderma',
    description:
      'A ceramide-enriched, fragrance-free moisturiser formulated for post-procedure skin recovery and daily barrier maintenance. Contains Ceramide NP, Cholesterol, and Fatty Acids in the precise ratio that mirrors healthy skin\'s natural lipid profile — essential during and after laser, peel, and dermapen treatments.',
    descriptionId:
      'Pelembap yang diperkaya ceramide, bebas pewangi, diformulasikan untuk pemulihan kulit pasca prosedur dan perawatan barrier harian. Mengandung Ceramide NP, Cholesterol, dan Asam Lemak dalam rasio yang mencerminkan profil lipid alami kulit yang sehat.',
    images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400'],
    priceIdr: 245000,
    priceSgd: 24,
    priceMyr: 72,
    category: 'moisturizer',
    stock: 75,
    inStock: true,
    featured: true,
    tags: ['ceramide', 'barrier repair', 'moisturiser', 'post-treatment'],
    rating: 4.9,
    reviewCount: 198,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ── Gallery ───────────────────────────────────────────────────────────────────

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    beforeUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400',
    afterUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400',
    procedure: 'Nd:YAG Laser — Melasma',
    caption: 'Significant reduction in melasma after 6 Nd:YAG laser sessions',
    captionId: 'Pengurangan signifikan melasma setelah 6 sesi laser Nd:YAG',
    featured: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    beforeUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
    afterUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    procedure: 'Dermapen 4.0 — Acne Scars',
    caption: 'Visible scar reduction after a 4-session Dermapen 4.0 course',
    captionId: 'Pengurangan bekas luka yang terlihat setelah 4 sesi Dermapen 4.0',
    featured: true,
    createdAt: new Date(),
  },
];

// ── Business Hours ────────────────────────────────────────────────────────────

export const BUSINESS_HOURS = [
  { day: 'Monday', dayId: 'Senin', open: '10:00', close: '19:00', closed: false },
  { day: 'Tuesday', dayId: 'Selasa', open: '10:00', close: '19:00', closed: false },
  { day: 'Wednesday', dayId: 'Rabu', open: '10:00', close: '19:00', closed: false },
  { day: 'Thursday', dayId: 'Kamis', open: '10:00', close: '19:00', closed: false },
  { day: 'Friday', dayId: 'Jumat', open: '10:00', close: '19:00', closed: false },
  { day: 'Saturday', dayId: 'Sabtu', open: '10:00', close: '19:00', closed: false },
  { day: 'Sunday', dayId: 'Minggu', open: '10:00', close: '19:00', closed: false },
];

export const BUSINESS_HOURS_TEMBESI = [
  { day: 'Monday', dayId: 'Senin', open: '10:00', close: '19:00', closed: false },
  { day: 'Tuesday', dayId: 'Selasa', open: '10:00', close: '19:00', closed: false },
  { day: 'Wednesday', dayId: 'Rabu', open: '10:00', close: '19:00', closed: false },
  { day: 'Thursday', dayId: 'Kamis', open: '', close: '', closed: true },
  { day: 'Friday', dayId: 'Jumat', open: '10:00', close: '19:00', closed: false },
  { day: 'Saturday', dayId: 'Sabtu', open: '10:00', close: '19:00', closed: false },
  { day: 'Sunday', dayId: 'Minggu', open: '10:00', close: '19:00', closed: false },
];

// ── Stats ─────────────────────────────────────────────────────────────────────

export const STATS = [
  { value: 5000, label: 'Patients Treated', labelId: 'Pasien Ditangani', suffix: '+' },
  { value: 4, label: 'Years of Practice', labelId: 'Tahun Berpraktek', suffix: '+' },
  { value: 10, label: 'Treatment Modalities', labelId: 'Modalitas Perawatan', suffix: '+' },
  { value: 98, label: 'Patient Satisfaction', labelId: 'Kepuasan Pasien', suffix: '%' },
];

// Google Reviews — direct links to Google Maps/Search reviews
export const GOOGLE_REVIEWS_URL_BATAM_CENTER =
  'https://www.google.com/search?q=Skinderma+Aesthetic+Clinic+Batam+Center+Ulasan';
export const GOOGLE_REVIEWS_URL_BATU_AJI =
  'https://www.google.com/search?q=Skinderma+Batu+Aji+Ulasan';
