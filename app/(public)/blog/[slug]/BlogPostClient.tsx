'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { BlogPost } from '@/lib/types';

interface Props {
  post: BlogPost;
  related: BlogPost[];
  consultationUrl: string;
  articleContent: string;
}

export default function BlogPostClient({ post, related, consultationUrl, articleContent }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/20" />
        <div className="absolute inset-0 flex flex-col justify-end pb-14">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-primary-500/90 text-white text-xs font-semibold capitalize">
                {post.category.replace('-', ' ')}
              </span>
              <span className="text-white/60 text-xs">{post.readTime} min read</span>
            </div>
            <h1 className="font-playfair text-3xl md:text-5xl text-white leading-tight mb-5">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <Image
                src={post.authorPhoto}
                alt={post.author}
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
                unoptimized
              />
              <div>
                <div className="text-white font-semibold text-sm">{post.author}</div>
                <div className="text-white/55 text-xs mt-0.5">
                  {new Date(post.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-6xl py-4">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary-600 transition-colors">Journal</Link>
            <span>/</span>
            <span className="text-dark font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Article body (65%) */}
            <article className="lg:col-span-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Article prose */}
              {articleContent ? (
                <div
                  className="prose prose-sm max-w-none prose-headings:font-playfair prose-headings:text-dark prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary-600 prose-li:text-gray-600"
                  dangerouslySetInnerHTML={{ __html: articleContent }}
                />
              ) : (
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">{post.excerpt}</p>
                  <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
                    <p>
                      This article is written by {post.author} of Skinderma Aesthetic Clinic, Batam — specialising in acne and melasma treatment for Asian skin types.
                    </p>
                    <p>
                      For personalised advice on your skin condition, we invite you to book a consultation with our physician. Treatment approaches vary significantly based on individual skin type, pigmentation depth, and medical history — an in-clinic assessment ensures the most appropriate protocol is selected for you.
                    </p>
                    <blockquote className="border-l-4 border-primary-400 pl-6 py-2 bg-primary-50 rounded-r-xl not-italic">
                      <p className="text-primary-800 font-medium">
                        &ldquo;Evidence-based medicine and patient safety are at the core of every treatment decision we make at Skinderma.&rdquo;
                      </p>
                      <footer className="text-primary-600 text-sm mt-2">— {post.author}</footer>
                    </blockquote>
                    <p>
                      Our clinic serves patients from Batam, Singapore, and Malaysia. All consultations can be initiated via WhatsApp, and our physician speaks both English and Bahasa Indonesia.
                    </p>
                  </div>
                </div>
              )}

              {/* Share bar */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-dark">Share this article</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 text-sm font-medium transition-all duration-200"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>

            {/* Sidebar (35%) */}
            <aside className="lg:col-span-2">
              <div className="sticky top-28 space-y-6">
                {/* Consultation CTA */}
                <div className="bg-dark rounded-2xl p-6 text-white">
                  <h3 className="font-playfair text-xl mb-2">Book a Consultation</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-5">
                    Have questions about your skin? Book a personalised consultation with dr. Yeyen Handoko at Skinderma Aesthetic Clinic.
                  </p>
                  <a
                    href={consultationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Book via WhatsApp
                  </a>
                </div>

                {/* Author card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Written By
                  </h4>
                  <div className="flex items-center gap-4">
                    <Image
                      src={post.authorPhoto}
                      alt={post.author}
                      width={56}
                      height={56}
                      className="rounded-xl w-14 h-14 object-cover flex-shrink-0"
                      unoptimized
                    />
                    <div>
                      <div className="font-semibold text-dark">{post.author}</div>
                      <div className="text-primary-600 text-xs mt-0.5">Aesthetic Physician</div>
                      <div className="text-gray-400 text-xs mt-1">Skinderma Aesthetic Clinic, Batam</div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mt-4">
                    dr. Yeyen Handoko is the lead physician at Skinderma Aesthetic Clinic, specialising in acne and melasma treatment for Asian skin types.
                  </p>
                </div>

                {/* Related articles mini */}
                {related.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      Related Articles
                    </h4>
                    <div className="space-y-4">
                      {related.slice(0, 3).map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/blog/${rel.slug}`}
                          className="flex gap-3 group"
                        >
                          <div className="relative w-16 h-14 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={rel.coverImage}
                              alt={rel.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-dark text-xs font-semibold line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                              {rel.title}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">{rel.readTime} min read</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── RELATED ARTICLES GRID ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="font-playfair text-3xl text-dark mb-10">More from Our Journal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-luxury transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold capitalize">
                        {rel.category.replace('-', ' ')}
                      </span>
                      <span className="text-gray-400 text-xs">{rel.readTime} min read</span>
                    </div>
                    <h3 className="font-playfair text-lg font-bold text-dark line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{rel.excerpt}</p>
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
