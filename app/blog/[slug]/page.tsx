import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbList, SITE_URL } from '@/lib/seo/schema';
import postsIndex from '@/lib/blog/posts-index.json';

export const dynamicParams = false;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Post {
  id: string;
  url: string;
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
  wix_post_id: string;
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

// ─── Constants ────────────────────────────────────────────────────────────────

const HEADING_FONT = '"Trajan Pro", "Times New Roman", serif';
const BODY_FONT = 'Roboto, "Helvetica Neue", Arial, sans-serif';
const FOREST = '#024C27';
const SAGE = '#4f7256';
const BODY_COLOR = '#333333';
const CREAM = '#F5F2EF';
const CREAM_DEEP = '#EFEAE5';
const BORDER = '#E5DED7';
const SAGE_LIGHT = '#DCE6DC';
const SAGE_TINT = '#EAF0EA';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function readPost(slug: string): Post | null {
  const filePath = path.join(process.cwd(), 'public', 'blog-posts', `${slug}.json`);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Post;
  } catch {
    return null;
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Derive which treatment links to show based on keyword matching in title + body.
 */
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

  // Always-present links
  links.push({ label: 'Medical Weight Loss Programme', href: '/weight-loss' });
  links.push({ label: 'Book a Free Consultation', href: '/consultation' });

  return links;
}

/**
 * Interleave body_image_urls evenly between paragraphs.
 * Returns an array of either a string (paragraph text) or a number (image index).
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
    // Insert image after every `interval` paragraphs (but not past end)
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

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return (postsIndex as PostIndexItem[]).map((p) => ({ slug: p.slug }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = readPost(slug);
  if (!post) return {};

  const canonical = `${SITE_URL}/blog/${slug}`;
  return {
    title: `${post.title} | Carisma Slimming Malta`,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      title: `${post.title} | Carisma Slimming Malta`,
      description: post.excerpt,
      url: canonical,
      type: 'article',
      publishedTime: post.published_date,
      modifiedTime: post.last_updated,
      authors: ['Carisma Slimming'],
      images: post.cover_image_url
        ? [{ url: post.cover_image_url, width: 800, height: 500, alt: post.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Carisma Slimming Malta`,
      description: post.excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = readPost(slug);
  if (!post) notFound();

  const index = postsIndex as PostIndexItem[];
  const currentIdx = index.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx < index.length - 1 ? index[currentIdx + 1] : null;
  const nextPost = currentIdx > 0 ? index[currentIdx - 1] : null;

  const paragraphs = post.body_text.split('\n\n').filter(Boolean);
  const bodyItems = buildBodyItems(paragraphs, post.body_image_urls);
  const relatedLinks = getRelatedLinks(post.title, post.body_text);

  const truncatedTitle =
    post.title.length > 30 ? `${post.title.slice(0, 30)}…` : post.title;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
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
      name: 'Carisma Slimming',
      url: SITE_URL,
    },
  };

  const breadcrumb = breadcrumbList([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumb]} />

      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '24px 20px 64px',
          fontFamily: BODY_FONT,
        }}
      >
        {/* ── Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          style={{
            fontSize: '13px',
            color: '#888',
            marginBottom: '24px',
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" style={{ color: SAGE, textDecoration: 'none' }}>
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/blog" style={{ color: SAGE, textDecoration: 'none' }}>
            Blog
          </Link>
          <span aria-hidden="true">›</span>
          <span style={{ color: '#555' }}>{truncatedTitle}</span>
        </nav>

        {/* ── Cover image ── */}
        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt={post.title}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '28px',
              display: 'block',
            }}
          />
        )}

        {/* ── Title ── */}
        <h1
          style={{
            fontFamily: HEADING_FONT,
            textTransform: 'uppercase',
            color: FOREST,
            fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
            fontWeight: 700,
            lineHeight: 1.25,
            marginBottom: '16px',
            letterSpacing: '0.03em',
          }}
        >
          {post.title}
        </h1>

        {/* ── Meta row ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#666',
            marginBottom: '28px',
            flexWrap: 'wrap',
          }}
        >
          <time dateTime={post.published_date}>{formatDate(post.published_date)}</time>
          <span aria-hidden="true" style={{ color: SAGE }}>
            ·
          </span>
          <span>{post.minutes_to_read} min read</span>
          {post.categories.length > 0 && (
            <>
              <span aria-hidden="true" style={{ color: SAGE }}>
                ·
              </span>
              <span>{post.categories.join(', ')}</span>
            </>
          )}
        </div>

        {/* ── Excerpt (lead paragraph) ── */}
        <p
          style={{
            fontStyle: 'italic',
            fontSize: '18px',
            lineHeight: 1.75,
            color: SAGE,
            marginBottom: '36px',
            paddingBottom: '28px',
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          {post.excerpt}
        </p>

        {/* ── Body ── */}
        <article>
          {bodyItems.map((item, i) => {
            if (typeof item === 'string') {
              return (
                <p
                  key={i}
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: '17px',
                    lineHeight: 1.8,
                    color: BODY_COLOR,
                    marginBottom: '22px',
                  }}
                >
                  {item}
                </p>
              );
            }
            // Body image
            const imgSrc = post.body_image_urls[item.imageIndex];
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`img-${item.imageIndex}`}
                src={imgSrc}
                alt={`${post.title} — image ${item.imageIndex + 1}`}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  margin: '28px auto',
                  display: 'block',
                }}
              />
            );
          })}
        </article>

        {/* ── Tags ── */}
        {post.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '40px',
              paddingTop: '24px',
              borderTop: `1px solid ${BORDER}`,
            }}
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: CREAM_DEEP,
                  color: SAGE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '999px',
                  padding: '4px 14px',
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.05em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Related Treatments ── */}
        <section
          aria-labelledby="related-treatments-heading"
          style={{
            background: SAGE_TINT,
            border: `1px solid ${SAGE_LIGHT}`,
            borderRadius: '12px',
            padding: '28px',
            marginTop: '48px',
          }}
        >
          <h2
            id="related-treatments-heading"
            style={{
              fontFamily: HEADING_FONT,
              textTransform: 'uppercase',
              color: FOREST,
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '18px',
            }}
          >
            Explore Related Treatments
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'inline-block',
                  background: link.label === 'Book a Free Consultation' ? FOREST : SAGE,
                  color: '#fff',
                  borderRadius: '999px',
                  padding: '8px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'opacity 0.15s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Prev / Next navigation ── */}
        {(prevPost || nextPost) && (
          <nav
            aria-label="Post navigation"
            style={{
              display: 'grid',
              gridTemplateColumns: prevPost && nextPost ? '1fr 1fr' : '1fr',
              gap: '16px',
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: `1px solid ${BORDER}`,
            }}
          >
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                style={{
                  display: 'block',
                  background: CREAM,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '10px',
                  padding: '16px 20px',
                  textDecoration: 'none',
                  textAlign: 'left',
                }}
              >
                <span style={{ display: 'block', fontSize: '11px', color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ← Previous
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: FOREST,
                    lineHeight: 1.4,
                  }}
                >
                  {prevPost.title.length > 60
                    ? `${prevPost.title.slice(0, 60)}…`
                    : prevPost.title}
                </span>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                style={{
                  display: 'block',
                  background: CREAM,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '10px',
                  padding: '16px 20px',
                  textDecoration: 'none',
                  textAlign: 'right',
                }}
              >
                <span style={{ display: 'block', fontSize: '11px', color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Next →
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: FOREST,
                    lineHeight: 1.4,
                  }}
                >
                  {nextPost.title.length > 60
                    ? `${nextPost.title.slice(0, 60)}…`
                    : nextPost.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        {/* ── Back to Blog ── */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: SAGE,
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </>
  );
}
