import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { FEATURED_BLOG_POSTS, getWhatsAppUrl } from '@/lib/data';
import BlogPostClient from './BlogPostClient';

// ── Static Params ─────────────────────────────────────────────────────────
export function generateStaticParams() {
  return FEATURED_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = FEATURED_BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | SkinDerma Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

// ── Server Component ──────────────────────────────────────────────────────────
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = FEATURED_BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = FEATURED_BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 3);

  const consultationUrl = getWhatsAppUrl(
    `Halo SkinDerma! Saya membaca artikel "${post.title}" dan ingin berkonsultasi lebih lanjut.`
  );

  const articleContent = getArticleContent(post.slug);

  return (
    <BlogPostClient
      post={post}
      related={related}
      consultationUrl={consultationUrl}
      articleContent={articleContent}
    />
  );
}

// ── Placeholder article content ───────────────────────────────────────────────
function getArticleContent(slug: string): string {
  const contents: Record<string, string> = {
    'botox-myths-debunked': `
      <h2>The Truth About Botox</h2>
      <p>Botox has been one of the most popular aesthetic treatments globally for over two decades, yet misconceptions about it remain surprisingly widespread. Many patients arrive at our clinic in Batam with concerns based on myths they've read online or heard from friends. Today, we're setting the record straight.</p>
      <h3>Myth 1: Botox Will Make You Look Frozen</h3>
      <p>This is perhaps the most common fear, and it's rooted in seeing poorly performed treatments. When administered correctly by a trained aesthetic doctor, Botox should soften expression lines while preserving your natural facial movement. The key is precise placement and the correct dosage.</p>
      <h3>Myth 2: Botox Is Permanent</h3>
      <p>Botox results typically last between 3 to 6 months depending on the area treated, your metabolism, and the amount used. This is actually good news for first-time patients — if you're not entirely happy with the results, they will naturally fade.</p>
      <blockquote><p>"The goal of aesthetic medicine is to help you look like the best version of yourself, not someone else entirely." — dr. Sarah Amalia</p></blockquote>
      <h3>Myth 3: Botox Is Only for Older Patients</h3>
      <p>Preventative Botox in the mid-to-late 20s is a growing trend among younger patients looking to delay the onset of deeper wrinkles. Small, targeted doses can train facial muscles over time to create less pronounced lines.</p>
      <h3>Myth 4: Botox Is Dangerous</h3>
      <p>When performed by a licensed and trained medical professional using FDA-approved products, Botox has an excellent safety profile. At SkinDerma, all injectable procedures are conducted exclusively by our certified aesthetic doctors following strict medical protocols.</p>
      <h3>Myth 5: It's Addictive</h3>
      <p>Botox does not have any physically addictive properties. Patients who return for repeat treatments do so because they enjoy their results — not because of dependency.</p>
      <h3>What to Expect at SkinDerma</h3>
      <p>Before any injectable treatment, our doctors conduct a thorough facial assessment and listen carefully to your goals. We believe in natural-looking results and always start conservatively — you can always add more, but you can't easily take less away.</p>
    `,
    'sunscreen-guide-batam': `
      <h2>Why Sunscreen Is Non-Negotiable in Batam</h2>
      <p>Batam sits just 1 degree north of the equator, making it one of the highest UV-exposure cities in Southeast Asia. The UV Index here regularly reaches 11 or above — classified as "extreme" by the World Health Organization. Without adequate sun protection, daily UV exposure causes cumulative damage that accelerates aging, worsens pigmentation, and significantly increases skin cancer risk.</p>
      <h3>Understanding SPF and PA Ratings</h3>
      <p>SPF (Sun Protection Factor) measures protection against UVB rays — the ones responsible for sunburn. PA (Protection Grade of UVA) measures protection against UVA rays, which penetrate deeper into the skin and cause photoaging. In Batam's climate, we recommend SPF 50 minimum with PA+++ or PA++++.</p>
      <h3>Chemical vs. Physical Sunscreens</h3>
      <p>Chemical sunscreens absorb UV radiation and convert it to heat. They tend to feel lighter on the skin, making them popular for daily use. Physical (mineral) sunscreens use zinc oxide or titanium dioxide to physically block UV rays. They're ideal for sensitive skin types but may leave a slight white cast on deeper skin tones.</p>
      <blockquote><p>"The best sunscreen is the one you'll actually wear every single day. Find a formula you enjoy, and stick with it." — dr. Michael Tanoto</p></blockquote>
      <h3>How to Apply Sunscreen Correctly</h3>
      <p>Most people apply only 25–50% of the recommended amount of sunscreen. For adequate face protection, use a nickel-sized amount (about 1/4 teaspoon) for the face and neck. Apply 15–20 minutes before sun exposure and reapply every 2 hours if you're outdoors. Don't forget the ears, back of the neck, and tops of your hands.</p>
      <h3>Our Top Picks for Batam's Climate</h3>
      <p>For Batam's hot, humid weather, we recommend lightweight gel or fluid formulations that won't feel heavy or cause breakouts. Our SkinDerma SPF 50+ Sunscreen Gel is specifically formulated for Southeast Asian climates — absorbing quickly with no white cast and staying comfortable throughout the day.</p>
    `,
    'laser-treatment-skin-types': `
      <h2>Navigating the World of Medical Lasers</h2>
      <p>The term "laser treatment" encompasses a remarkably broad range of technologies, each designed to address specific skin concerns with different mechanisms of action. Choosing the right laser for your skin type and concern is critical — the wrong choice can lead to insufficient results or, in rare cases, adverse effects like post-inflammatory hyperpigmentation (PIH).</p>
      <h3>Understanding Fitzpatrick Skin Types</h3>
      <p>Dermatologists use the Fitzpatrick Scale (Types I–VI) to classify skin based on its response to UV exposure. Darker skin types (IV–VI) contain more melanin, making them more susceptible to PIH after certain aggressive laser treatments. This is why a thorough skin assessment by our doctors is always the first step.</p>
      <h3>Q-Switch Nd:YAG Laser</h3>
      <p>This is the gold standard for treating pigmentation in Asian and darker skin types. The 1064nm wavelength targets melanin with minimal risk of PIH, making it excellent for melasma, freckles, and sunspots. It also has a mild skin-tightening effect due to collagen stimulation.</p>
      <blockquote><p>"In aesthetic medicine, there is no one-size-fits-all laser. Personalization is everything." — dr. Sarah Amalia, Sp.KK</p></blockquote>
      <h3>CO2 Fractional Laser</h3>
      <p>For patients concerned with acne scars, deep wrinkles, or skin texture issues, CO2 fractional laser creates thousands of microscopic treatment zones in the skin, triggering intense collagen remodeling. This treatment requires a consultation to assess your skin's suitability, and typically involves 3–7 days of downtime.</p>
      <h3>PICO Laser (Picosecond)</h3>
      <p>Picosecond lasers deliver ultra-short pulses that shatter pigment particles more efficiently than traditional Q-switch lasers. They're effective for stubborn pigmentation, tattoo removal, and have excellent safety profiles for diverse skin tones. Results are often seen faster, with fewer required sessions.</p>
      <h3>Which Laser is Right for You?</h3>
      <p>During your consultation at SkinDerma, our dermatologist will assess your Fitzpatrick type, existing skin conditions, sun damage history, and treatment goals before recommending a laser protocol. Many patients benefit from a combination approach — for example, starting with Q-switch for pigmentation before transitioning to fractional laser for texture refinement.</p>
    `,
  };

  return (
    contents[slug] ||
    `
    <h2>Introduction</h2>
    <p>Skincare is a journey, not a destination. At SkinDerma, we believe that healthy, radiant skin is achievable for everyone with the right guidance, products, and treatments. In this article, our medical team shares expert insights to help you make informed decisions about your skin health.</p>
    <h3>Understanding Your Skin</h3>
    <p>Before jumping into any treatment or product, it's essential to understand your unique skin type, concerns, and goals. What works wonderfully for one person may not be suitable for another. This is why a personalized consultation with a qualified aesthetic doctor is always our recommended first step.</p>
    <h3>The Role of Professional Guidance</h3>
    <p>With the proliferation of skincare content online, it can be overwhelming to separate evidence-based advice from marketing claims. Our doctors at SkinDerma stay current with the latest clinical research to provide you with treatments and recommendations backed by science, not trends.</p>
    <blockquote><p>"Great skin doesn't happen overnight — it's the result of consistent care, the right treatments, and professional guidance." — SkinDerma Medical Team</p></blockquote>
    <h3>What to Expect When You Visit Us</h3>
    <p>Every patient at SkinDerma begins with a comprehensive skin consultation. We assess your skin condition, listen to your concerns, review your current skincare routine, and discuss your aesthetic goals. From there, we develop a personalized treatment plan that may include in-clinic procedures, medical-grade skincare, and lifestyle recommendations.</p>
    <h3>Continuing Your Skincare Journey</h3>
    <p>The treatments you receive at SkinDerma are most effective when complemented by a good at-home skincare routine. Our team will guide you through the essential steps — cleansing, moisturizing, targeted treatments, and of course, daily sun protection — to maintain and enhance your results between visits.</p>
  `
  );
}
