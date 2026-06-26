import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbList, SITE_URL } from '@/lib/seo/schema';
import postsIndex from '@/lib/blog/posts-index.json';
import ReadingProgress from '@/components/blog/ReadingProgress';
import BlogCard from '@/components/blog/BlogCard';
import { getBlogSeoPolicy, truncateMetaDescription } from '@/lib/blog/seo-policy';

export const dynamicParams = false;

// ─── Brand Tokens ─────────────────────────────────────────────────────────────

const FOREST = '#024C27';
const SAGE   = '#4f7256';
const DECO   = '#8EB093';
const TEXT   = '#333333';
const MUTED  = '#595959';
const HAIR   = '#E5DED7';
const SERIF  = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const BODY   = 'Roboto, sans-serif';
const WIDE   = '"Novecento Wide Book","Novecento Wide",sans-serif';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Post {
  id: string;
  url?: string;
  slug: string;
  title: string;
  published_date: string;
  last_updated: string;
  minutes_to_read: number;
  excerpt: string;
  cover_image_url: string;
  body_text: string;
  body_image_urls: string[];
  categories: string[];
  tags: string[];
  wix_post_id?: string;
}

interface PostIndexItem {
  slug: string;
  title: string;
  published_date: string;
  excerpt: string;
  cover_image_url: string;
  minutes_to_read: number;
  categories: string[];
  tags: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readPost(slug: string): Post | null {
  const filePath = path.join(process.cwd(), 'public', 'blog-posts', `${slug}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Post;
  } catch {
    return null;
  }
}

function getRelatedLinks(title: string, body: string): { label: string; href: string }[] {
  const haystack = `${title} ${body}`.toLowerCase();
  const links: { label: string; href: string }[] = [];

  if (/fat\s*freez|cryolipol|coolsculpt/.test(haystack))
    links.push({ label: 'Fat Freezing', href: '/packages/fat-freezing' });
  if (/fat\s*dissolv|lemon bottle|aqualyx|injection/.test(haystack))
    links.push({ label: 'Fat Dissolving Injections', href: '/packages/fat-dissolving' });
  if (/emsculpt|muscle stim/.test(haystack))
    links.push({ label: 'Muscle Stimulation', href: '/packages/muscle-stimulation' });
  if (/skin tight|velashape|rf treatment/.test(haystack))
    links.push({ label: 'Skin Tightening', href: '/packages/skin-tightening' });
  if (/lymphatic/.test(haystack))
    links.push({ label: 'Lymphatic Drainage', href: '/packages/lymphatic-drainage' });
  if (/cellulite/.test(haystack))
    links.push({ label: 'Anti-Cellulite Treatment', href: '/packages/anti-cellulite' });
  if (/glp-1|ozempic|mounjaro|wegovy|semaglutide|medical weight loss inject/.test(haystack))
    links.push({ label: 'GLP-1 Weight Loss Injections', href: '/glp1' });

  return links;
}

/**
 * Interleave body images evenly between paragraphs.
 * Returns an array of paragraph strings interspersed with image-index markers.
 */
function buildBodyItems(
  paragraphs: string[],
  images: string[],
): (string | { imageIndex: number })[] {
  if (images.length === 0) return paragraphs;

  const items: (string | { imageIndex: number })[] = [];
  const interval = Math.floor(paragraphs.length / (images.length + 1));

  let imgIdx = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    items.push(paragraphs[i]);
    if (
      imgIdx < images.length &&
      (i + 1) % (interval || 1) === 0 &&
      i < paragraphs.length - 1
    ) {
      items.push({ imageIndex: imgIdx });
      imgIdx++;
    }
  }
  return items;
}

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return (postsIndex as PostIndexItem[]).map((p) => ({ slug: p.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = readPost(slug);
  if (!post) return {};

  const canonical = `${SITE_URL}/blog/${slug}`;
  const policy = getBlogSeoPolicy(post);
  const description = truncateMetaDescription(post.excerpt);
  const title = `${post.title} | Carisma Slimming Malta`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: policy.index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: post.published_date,
      modifiedTime: post.last_updated,
      authors: ['Carisma Slimming'],
      images: post.cover_image_url
        ? [{ url: post.cover_image_url, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = readPost(slug);
  if (!post) notFound();

  const index = (postsIndex as PostIndexItem[]).filter((item) => getBlogSeoPolicy(item).index);
  const currentIdx = index.findIndex((p) => p.slug === slug);

  // Get 3 nearby posts for "More from the blog"
  const nearbyPosts: PostIndexItem[] = [];
  if (currentIdx > 0) nearbyPosts.push(index[currentIdx - 1]);
  if (currentIdx < index.length - 1) nearbyPosts.push(index[currentIdx + 1]);
  if (currentIdx > 1 && nearbyPosts.length < 3) nearbyPosts.unshift(index[currentIdx - 2]);
  if (currentIdx < index.length - 2 && nearbyPosts.length < 3) nearbyPosts.push(index[currentIdx + 2]);
  const displayPosts = nearbyPosts.slice(0, 3);

  const paragraphs = post.body_text.split('\n\n').filter(Boolean);
  const bodyItems = buildBodyItems(paragraphs, post.body_image_urls);
  const relatedLinks = getRelatedLinks(post.title, post.body_text);
  const truncatedTitle = post.title.length > 30 ? `${post.title.slice(0, 30)}…` : post.title;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    articleSection: getBlogSeoPolicy(post).decision,
    keywords: post.tags?.length ? post.tags.join(', ') : undefined,
    datePublished: post.published_date,
    dateModified: post.last_updated,
    url: `${SITE_URL}/blog/${slug}`,
    image: post.cover_image_url || undefined,
    inLanguage: 'en-MT',
    author: {
      '@type': 'Organization',
      name: 'Carisma Slimming',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Carisma Slimming',
      url: SITE_URL,
    },
  };

  const breadcrumb = breadcrumbList([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${slug}` },
  ]);

  // Pill button shared style (used in Related Treatments)
  const pillStyle: React.CSSProperties = {
    fontFamily: WIDE,
    fontSize: 11,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '10px 20px',
    border: '1px solid rgba(142,176,147,0.5)',
    color: DECO,
    borderRadius: 2,
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'inline-block',
  };

  const pillCtaStyle: React.CSSProperties = {
    ...pillStyle,
    background: '#fff',
    color: FOREST,
    border: '1px solid #fff',
    fontFamily: WIDE,
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumb]} />

      {/* ── Reading progress bar ───────────────────────────────────────────── */}
      <ReadingProgress />

      {/* ── Responsive styles ─────────────────────────────────────────────── */}
      <style>{`
        .drop-cap::first-letter {
          font-family: ${SERIF};
          font-size: 4em;
          float: left;
          line-height: 0.85;
          padding-right: 8px;
          color: ${FOREST};
          text-transform: uppercase;
        }

        .blog-post-hero {
          height: 65vh;
          min-height: 400px;
        }

        .blog-post-hero-title {
          font-size: clamp(24px, 4vw, 52px);
        }

        .blog-post-body {
          max-width: 720px;
          margin: 0 auto;
          padding: 60px 40px 80px;
        }

        .blog-post-figure {
          margin: 40px -40px;
        }

        .blog-post-more-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 768px) {
          .blog-post-hero {
            height: 50vh;
            min-height: 300px;
          }

          .blog-post-hero-title {
            font-size: clamp(20px, 6vw, 32px);
          }

          .blog-post-hero-inner {
            padding: 32px 20px 28px !important;
          }

          .blog-post-hero-breadcrumb {
            display: none !important;
          }

          .blog-post-body {
            padding: 40px 20px 60px;
          }

          .blog-post-figure {
            margin: 32px -20px;
          }

          .blog-post-more-grid {
            grid-template-columns: 1fr;
          }

          .related-treatments-box {
            padding: 28px 24px !important;
          }
        }

        @media (max-width: 480px) {
          .blog-post-hero-meta {
            flex-wrap: wrap;
            gap: 8px !important;
          }
        }

        .blog-card-img {
          transition: transform 400ms ease;
        }
        .blog-card:hover .blog-card-img {
          transform: scale(1.04);
        }
      `}</style>

      {/* ── Full-bleed hero ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          overflow: 'hidden',
        }}
        className="blog-post-hero"
      >
        <Image
          src={post.cover_image_url}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          fetchPriority="high"
         width={1200} height={900} sizes="(max-width: 768px) 100vw, 640px" />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(2,28,15,0.85) 0%, rgba(2,28,15,0.25) 50%, transparent 80%)',
          }}
        />

        {/* Title + meta overlaid at bottom */}
        <div
          className="blog-post-hero-inner"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '48px 40px 40px',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          {/* Breadcrumb */}
          <nav
            className="blog-post-hero-breadcrumb"
            aria-label="Breadcrumb"
            style={{
              marginBottom: 20,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: WIDE,
              fontSize: 11,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            <a href="/" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Home</a>
            <span>/</span>
            <a href="/blog" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Blog</a>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{truncatedTitle}</span>
          </nav>

          {/* Title */}
          <h1
            className="blog-post-hero-title"
            style={{
              fontFamily: SERIF,
              textTransform: 'uppercase',
              color: '#fff',
              lineHeight: 1.15,
              letterSpacing: '0.02em',
              margin: '0 0 20px',
              fontWeight: 400,
            }}
          >
            {post.title}
          </h1>

          {/* Meta row */}
          <div
            className="blog-post-hero-meta"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: WIDE,
              fontSize: 11,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            <span>Carisma Slimming</span>
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: DECO,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <time dateTime={post.published_date}>
              {new Date(post.published_date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: DECO,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span>{post.minutes_to_read} min read</span>
          </div>
        </div>
      </div>

      {/* ── Article body ──────────────────────────────────────────────────── */}
      <div className="blog-post-body">

        {/* Excerpt / lead pull quote */}
        {post.excerpt && (
          <p
            style={{
              fontFamily: BODY,
              fontSize: 20,
              lineHeight: 1.7,
              color: SAGE,
              fontStyle: 'italic',
              borderLeft: `3px solid ${DECO}`,
              paddingLeft: 24,
              margin: '0 0 48px',
              letterSpacing: '0.01em',
            }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Body text + interleaved images */}
        <article>
          {bodyItems.map((item, i) => {
            if (typeof item === 'string') {
              const firstParagraphIndex = bodyItems.findIndex((b) => typeof b === 'string');
              if (i === firstParagraphIndex) {
                return (
                  <p
                    key={i}
                    className="drop-cap"
                    style={{
                      fontFamily: BODY,
                      fontSize: 17,
                      lineHeight: 1.85,
                      color: TEXT,
                      margin: '0 0 28px',
                    }}
                  >
                    {item}
                  </p>
                );
              }
              return (
                <p
                  key={i}
                  style={{
                    fontFamily: BODY,
                    fontSize: 17,
                    lineHeight: 1.85,
                    color: TEXT,
                    margin: '0 0 28px',
                  }}
                >
                  {item}
                </p>
              );
            }

            // Body image
            const imgSrc = post.body_image_urls[item.imageIndex];
            return (
              <figure key={`img-${item.imageIndex}`} className="blog-post-figure" style={{ borderRadius: 4, overflow: 'hidden' }}>
                <Image
                  src={imgSrc}
                  alt={`${post.title} — illustration ${item.imageIndex + 1}`}
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  loading="lazy"
                 width={1200} height={900} sizes="(max-width: 768px) 100vw, 640px" />
              </figure>
            );
          })}
        </article>

        {/* ── Tags ─────────────────────────────────────────────────────────── */}
        {post.tags.length > 0 && (
          <div
            style={{
              marginTop: 48,
              paddingTop: 32,
              borderTop: `1px solid ${HAIR}`,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: WIDE,
                  fontSize: 10,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '6px 12px',
                  border: `1px solid ${DECO}`,
                  color: MUTED,
                  borderRadius: 2,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Related Treatments ───────────────────────────────────────────── */}
        <div
          className="related-treatments-box"
          style={{
            margin: '60px 0',
            background: FOREST,
            borderRadius: 8,
            padding: '40px 48px',
            color: '#fff',
          }}
        >
          <p
            style={{
              fontFamily: WIDE,
              fontSize: 10,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: DECO,
              margin: '0 0 8px',
            }}
          >
            Explore
          </p>
          <h3
            style={{
              fontFamily: SERIF,
              textTransform: 'uppercase',
              fontSize: 22,
              color: '#fff',
              margin: '0 0 24px',
              fontWeight: 400,
              letterSpacing: '0.04em',
            }}
          >
            Related Treatments
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {relatedLinks.map((link) => (
              <a key={link.href} href={link.href} style={pillStyle}>
                {link.label}
              </a>
            ))}
            <a href="/weight-loss" style={pillStyle}>Medical Weight Loss</a>
            <a href="/consultation" style={pillCtaStyle}>Book Free Consultation</a>
          </div>
        </div>

        {/* ── More from the blog ───────────────────────────────────────────── */}
        {displayPosts.length > 0 && (
          <div style={{ marginTop: 80, paddingTop: 60, borderTop: `1px solid ${HAIR}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
              <p
                style={{
                  fontFamily: WIDE,
                  fontSize: 11,
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: MUTED,
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                More from the blog
              </p>
              <div style={{ flex: 1, height: 1, background: HAIR }} />
            </div>

            <div className="blog-post-more-grid">
              {displayPosts.map((p) => (
                <BlogCard key={p.slug} post={p} size="small" />
              ))}
            </div>
          </div>
        )}

        {/* ── Back to blog ─────────────────────────────────────────────────── */}
        <div style={{ marginTop: 48, textAlign: 'center', paddingBottom: 40 }}>
          <a
            href="/blog"
            style={{
              fontFamily: WIDE,
              fontSize: 11,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: SAGE,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            &larr; Back to All Articles
          </a>
        </div>
      </div>
    </>
  );
}
