import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { FEATURED_PRODUCTS, getWhatsAppUrl } from '@/lib/data';
import AddToEnquiryButton from './AddToEnquiryButton';

export function generateStaticParams() {
  return FEATURED_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = FEATURED_PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | Skinderma Shop`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | Skinderma`,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0] }],
    },
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price);
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-accent-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
      <span className="text-gray-400 text-sm">{rating} ({count} reviews)</span>
    </div>
  );
}

export default function ShopProductPage({ params }: { params: { slug: string } }) {
  const product = FEATURED_PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = FEATURED_PRODUCTS.filter(
    (p) => p.slug !== product.slug
  ).slice(0, 3);

  const waUrl = getWhatsAppUrl(
    `Halo Skinderma! Saya ingin memesan ${product.name} (IDR ${formatPrice(product.priceIdr)}). Apakah tersedia?`
  );

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        {/* ── BREADCRUMB ──────────────────────────────────────────────── */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-6 max-w-6xl py-4">
            <nav className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-primary-600 transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-dark font-medium line-clamp-1">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* ── PRODUCT DETAIL ──────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left: Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-card">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>

              {/* Right: Details */}
              <div className="space-y-6">
                {/* Brand */}
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">
                    {product.brand}
                  </span>
                </div>

                {/* Name */}
                <h1 className="font-playfair text-3xl md:text-4xl text-dark leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <StarRating rating={product.rating} count={product.reviewCount} />

                {/* Prices */}
                <div className="space-y-2">
                  <div className="font-playfair text-3xl font-bold text-dark">
                    IDR {formatPrice(product.priceIdr)}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500">
                    {product.priceSgd && (
                      <span className="px-3 py-1 rounded-lg bg-gray-100 font-medium">
                        SGD {product.priceSgd}
                      </span>
                    )}
                    {product.priceMyr && (
                      <span className="px-3 py-1 rounded-lg bg-gray-100 font-medium">
                        MYR {product.priceMyr}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

                {/* Stock status */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-gray-500'}`}>
                    {product.inStock ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors shadow-md"
                  >
                    <WhatsAppIconSVG className="w-4 h-4" />
                    Order via WhatsApp
                  </a>
                  <AddToEnquiryButton productName={product.name} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRODUCT HIGHLIGHTS ──────────────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="font-playfair text-2xl text-dark mb-8">Product Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="font-semibold text-dark mb-4 text-sm uppercase tracking-widest">Product Information</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Brand', value: product.brand },
                    { label: 'Category', value: product.category.charAt(0).toUpperCase() + product.category.slice(1) },
                    { label: 'Stock', value: product.inStock ? `Available (${product.stock} units)` : 'Out of Stock' },
                    { label: 'Rating', value: `${product.rating}/5 (${product.reviewCount} reviews)` },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="text-dark font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="font-semibold text-dark mb-4 text-sm uppercase tracking-widest">Pricing by Region</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Indonesia (IDR)', value: `IDR ${formatPrice(product.priceIdr)}` },
                    ...(product.priceSgd ? [{ label: 'Singapore (SGD)', value: `SGD ${product.priceSgd}` }] : []),
                    ...(product.priceMyr ? [{ label: 'Malaysia (MYR)', value: `MYR ${product.priceMyr}` }] : []),
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="text-dark font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">Prices may vary. Contact us via WhatsApp for current pricing and shipping rates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED PRODUCTS ────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6 max-w-6xl">
              <h2 className="font-playfair text-3xl text-dark mb-10">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/shop/${rel.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary-200 hover:shadow-luxury transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={rel.images[0]}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-primary-600 font-semibold">{rel.brand}</span>
                      <h3 className="font-playfair text-base font-bold text-dark mt-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {rel.name}
                      </h3>
                      <div className="font-bold text-dark mt-2">IDR {formatPrice(rel.priceIdr)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function WhatsAppIconSVG({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
