import { MetadataRoute } from 'next';
import { PROCEDURES, FEATURED_BLOG_POSTS } from '@/lib/data';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://skindermaclinic.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/procedures`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ];

  const procedurePages = PROCEDURES.map((p) => ({
    url: `${baseUrl}/procedures/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogPages = FEATURED_BLOG_POSTS.filter((p) => p.published).map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...procedurePages, ...blogPages];
}
