'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  ClockIcon,
  TagIcon,
  EnvelopeIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { FEATURED_BLOG_POSTS } from '@/lib/data';
import { BlogPost, BlogCategory } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

// ── Additional mock posts ────────────────────────────────────────────────────
const EXTRA_POSTS: BlogPost[] = [
  {
    id: '4',
    slug: 'skincare-routine-beginners',
    title: 'Building Your First Skincare Routine: A Beginner\'s Guide',
    titleId: 'Membangun Rutinitas Skincare Pertama Anda: Panduan Pemula',
    excerpt:
      'Overwhelmed by the hundreds of products on the market? We cut through the noise to help you build a simple, effective skincare routine that actually works.',
    excerptId:
      'Bingung dengan ratusan produk di pasaran? Kami membantu Anda membangun rutinitas skincare sederhana namun efektif.',
    content: '',
    contentId: '',
    coverImage: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=800',
    author: 'dr. Yeyen Handoko',
    authorPhoto: '/yeyen.jpg',
    category: 'skincare-tips',
    tags: ['skincare', 'routine', 'beginners'],
    readTime: 6,
    published: true,
    featured: false,
    createdAt: new Date('2024-10-10'),
    updatedAt: new Date('2024-10-10'),
  },
  {
    id: '5',
    slug: 'before-after-laser-transformation',
    title: 'Real Results: 3-Month Laser Treatment Transformation',
    titleId: 'Hasil Nyata: Transformasi Perawatan Laser 3 Bulan',
    excerpt:
      'Follow patient Maya\'s incredible journey through 3 months of laser treatment for hyperpigmentation — featuring candid before and after photos.',
    excerptId:
      'Ikuti perjalanan luar biasa pasien Maya selama 3 bulan perawatan laser untuk hiperpigmentasi — lengkap dengan foto sebelum dan sesudah.',
    content: '',
    contentId: '',
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
    author: 'dr. Yeyen Handoko',
    authorPhoto: '/yeyen.jpg',
    category: 'before-after',
    tags: ['laser', 'transformation', 'before-after'],
    readTime: 4,
    published: true,
    featured: false,
    createdAt: new Date('2024-09-25'),
    updatedAt: new Date('2024-09-25'),
  },
  {
    id: '6',
    slug: 'skinderma-new-treatments-2025',
    title: 'Skinderma Launches 3 New Aesthetic Treatments for 2025',
    titleId: 'SkinDerma Meluncurkan 3 Perawatan Estetika Baru untuk 2025',
    excerpt:
      'We\'re excited to announce three cutting-edge treatments now available at SkinDerma Batam: Morpheus8, Profhilo, and Exosome Therapy.',
    excerptId:
      'Kami dengan bangga mengumumkan tiga perawatan mutakhir kini tersedia di SkinDerma Batam: Morpheus8, Profhilo, dan Exosome Therapy.',
    content: '',
    contentId: '',
    coverImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800',
    author: 'dr. Yeyen Handoko',
    authorPhoto: '/yeyen.jpg',
    category: 'news',
    tags: ['news', 'new treatments', '2025'],
    readTime: 3,
    published: true,
    featured: false,
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-05'),
  },
  {
    id: '7',
    slug: 'self-care-aesthetic-lifestyle',
    title: 'Aesthetic Self-Care: Why Investing in Your Skin is Self-Love',
    titleId: 'Self-Care Estetika: Mengapa Merawat Kulit Adalah Bentuk Cinta Diri',
    excerpt:
      'More patients are seeing aesthetic treatments not as vanity, but as a form of wellness. Here\'s how to think about skin health as part of your lifestyle.',
    excerptId:
      'Semakin banyak pasien yang melihat perawatan estetika bukan sebagai keangkuhan, melainkan sebagai bentuk kesehatan.',
    content: '',
    contentId: '',
    coverImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800',
    author: 'dr. Yeyen Handoko',
    authorPhoto: '/yeyen.jpg',
    category: 'lifestyle',
    tags: ['lifestyle', 'self-care', 'wellness'],
    readTime: 5,
    published: true,
    featured: false,
    createdAt: new Date('2024-08-14'),
    updatedAt: new Date('2024-08-14'),
  },
];

const ALL_POSTS: BlogPost[] = [...FEATURED_BLOG_POSTS, ...EXTRA_POSTS];

// ── Category config ──────────────────────────────────────────────────────────
type FilterCategory = 'all' | BlogCategory;

const CATEGORIES: { value: FilterCategory; label: string; color: string }[] = [
  { value: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
  { value: 'skincare-tips', label: 'Skincare Tips', color: 'bg-primary-50 text-primary-700' },
  { value: 'procedures', label: 'Procedures', color: 'bg-secondary-50 text-secondary-700' },
  { value: 'news', label: 'News', color: 'bg-blue-50 text-blue-700' },
  { value: 'lifestyle', label: 'Lifestyle', color: 'bg-accent-50 text-accent-700' },
  { value: 'before-after', label: 'Before & After', color: 'bg-green-50 text-green-700' },
];

const ALL_TAGS = Array.from(new Set(ALL_POSTS.flatMap((p) => p.tags)));

const POPULAR_POSTS = ALL_POSTS.slice(0, 4);

// ── Helpers ──────────────────────────────────────────────────────────────────
function getCategoryStyle(category: BlogCategory): string {
  const map: Record<BlogCategory, string> = {
    'skincare-tips': 'bg-primary-50 text-primary-700',
    procedures: 'bg-secondary-50 text-secondary-700',
    news: 'bg-blue-50 text-blue-700',
    lifestyle: 'bg-accent-50 text-accent-700',
    'before-after': 'bg-green-50 text-green-700',
  };
  return map[category] ?? 'bg-gray-100 text-gray-600';
}

function getCategoryLabel(category: BlogCategory): string {
  const map: Record<BlogCategory, string> = {
    'skincare-tips': 'Skincare Tips',
    procedures: 'Procedures',
    news: 'News',
    lifestyle: 'Lifestyle',
    'before-after': 'Before & After',
  };
  return map[category] ?? category;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col"
    >
      {/* Cover Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${getCategoryStyle(
            post.category
          )}`}
        >
          {getCategoryLabel(post.category)}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-playfair text-lg font-semibold text-dark leading-snug mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-dark-600 leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Author + Meta */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={post.authorPhoto}
                alt={post.author}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span className="text-xs font-medium text-dark-600">{post.author}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <CalendarDaysIcon className="w-3.5 h-3.5" />
              {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-3.5 h-3.5" />
              {post.readTime} min read
            </span>
          </div>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-700 transition-colors group/link"
        >
          Read Article
          <ChevronRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const filtered = useMemo(() => {
    return ALL_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === 'all' || post.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.author.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    const email = newsletterEmail.trim().toLowerCase();
    if (!email) return;
    try {
      // Check for duplicates
      const existing = await getDocs(query(collection(db, 'newsletterSubscribers'), where('email', '==', email)));
      if (existing.empty) {
        await addDoc(collection(db, 'newsletterSubscribers'), {
          email,
          subscribedAt: serverTimestamp(),
          source: 'blog-page',
        });
      }
      setNewsletterSubmitted(true);
    } catch {
      setNewsletterSubmitted(true); // still show success to user
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-dark pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_#0D7377_0%,_transparent_60%)]" />
        </div>
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-accent-400 text-xs font-semibold tracking-widest uppercase mb-5">
              Medical Journal
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">
              Skinderma Journal
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
              Expert insights on skincare and aesthetic treatments — written by dr. Yeyen Handoko.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 max-w-lg mx-auto"
          >
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, topics, tags…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                className="form-input pl-12 pr-4 py-3.5 rounded-xl shadow-sm w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="section-padding bg-neutral-bg">
        <div className="container-custom">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? 'bg-primary-500 text-white shadow-luxury'
                    : 'bg-white text-dark-600 hover:bg-primary-50 hover:text-primary-700 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Blog Grid ── */}
            <div className="lg:col-span-2">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-dark-600 text-lg">
                    No articles found for{' '}
                    <strong>&ldquo;{searchQuery}&rdquo;</strong>. Try a different keyword.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {visible.map((post, i) => (
                      <BlogCard key={post.id} post={post} index={i} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-10 text-center">
                      <button
                        onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
                        className="btn-outline px-8 py-3"
                      >
                        Load More Articles
                      </button>
                    </div>
                  )}

                  <p className="mt-6 text-center text-sm text-gray-400">
                    Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} articles
                  </p>
                </>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-8">
              {/* Popular Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-playfair text-lg font-semibold text-dark mb-5">
                  Popular Posts
                </h3>
                <ul className="space-y-4">
                  {POPULAR_POSTS.map((post) => (
                    <li key={post.id}>
                      <Link href={`/blog/${post.slug}`} className="flex gap-3 group">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-dark group-hover:text-primary-500 transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {post.readTime} min read
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags Cloud */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-playfair text-lg font-semibold text-dark mb-5 flex items-center gap-2">
                  <TagIcon className="w-5 h-5 text-primary-500" />
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ALL_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSearchQuery(tag);
                        setActiveCategory('all');
                        setVisibleCount(POSTS_PER_PAGE);
                      }}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 text-dark-600 text-xs font-medium rounded-full border border-gray-200 hover:border-primary-200 transition-all"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <EnvelopeIcon className="w-5 h-5 text-primary-200" />
                  <h3 className="font-playfair text-lg font-semibold">Newsletter</h3>
                </div>
                <p className="text-primary-100 text-sm mb-5 leading-relaxed">
                  Get expert skincare tips and exclusive offers delivered to your inbox.
                </p>
                {newsletterSubmitted ? (
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <p className="font-semibold text-sm">Thank you for subscribing!</p>
                    <p className="text-primary-100 text-xs mt-1">
                      Check your inbox for a welcome email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg text-dark text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-white text-primary-700 font-semibold text-sm rounded-lg hover:bg-primary-50 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
