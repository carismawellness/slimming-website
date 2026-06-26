import Image from 'next/image';
import type { Metadata } from 'next';
import postsData from '@/lib/blog/posts-index.json';
import FadeInUp from '@/components/blog/FadeInUp';
import { getBlogSeoPolicy } from '@/lib/blog/seo-policy';

// ── Brand tokens ──────────────────────────────────────────────────────────────
const FOREST = '#024C27';
const SAGE   = '#4f7256';
const DECO   = '#C9D8C1';
const CREAM  = '#f8f5f0';
const INK    = '#3c5a40';
const MUTED  = '#5a4f43';
const HAIR   = '#C9B8AE';
const SERIF  = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const BODY   = 'Roboto, sans-serif';
const WIDE   = '"Novecento Wide Book","Novecento Wide",sans-serif';

// ── Types & Data ──────────────────────────────────────────────────────────────
type Post = {
  slug: string;
  title: string;
  published_date: string;
  excerpt: string;
  cover_image_url: string;
  minutes_to_read: number;
  categories: string[];
  tags: string[];
};

const POSTS_PER_PAGE = 20;

const indexablePosts = (postsData as Post[]).filter((post) => getBlogSeoPolicy(post).index);
const TOTAL_PAGES    = Math.max(1, Math.ceil(indexablePosts.length / POSTS_PER_PAGE));
const posts = indexablePosts.slice(0, POSTS_PER_PAGE);

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Blog | Expert Weight Loss & Slimming Advice Malta | Carisma Slimming',
  description:
    "Read expert articles on medical weight loss, GLP-1 treatments, fat freezing, body contouring and slimming in Malta from Carisma Slimming's specialist team.",
  alternates: { canonical: 'https://www.carismaslimming.com/blog' },
  openGraph: {
    title: 'Blog | Expert Weight Loss & Slimming Advice Malta | Carisma Slimming',
    description:
      "Expert articles on GLP-1 treatments, fat freezing, body contouring and medical slimming in Malta — evidence-led, shame-free.",
    type: 'website',
    url: 'https://www.carismaslimming.com/blog',
    siteName: 'Carisma Slimming',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Carisma Slimming weight loss and slimming advice Malta' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: '/og-image.png', alt: 'Carisma Slimming weight loss and slimming advice Malta' }],
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatLong(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });
}

// ── Inline card shared styles — matches home page pillar card look ────────────
const cardWrap: React.CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  borderTopLeftRadius: 18,
  borderTopRightRadius: 90,
  borderBottomLeftRadius: 90,
  borderBottomRightRadius: 18,
  background: 'linear-gradient(180deg, #F2F6EF 0%, #C9D8C1 100%)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
};

const cardLink: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  color: 'inherit',
  height: '100%',
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  // Guard: need at least 20 posts for layout; fall back gracefully
  const hero  = posts[0];
  const col1  = posts[1];
  const col2  = posts[2];
  const row2  = posts.slice(3, 6);
  const tail  = posts.slice(6);

  return (
    <>
      {/* ── Global page styles ─────────────────────────────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .blog-card-img {
          transition: transform 0.4s ease-out;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .blog-card:hover .blog-card-img {
          transform: scale(1.06);
        }
        .blog-card {
          cursor: pointer;
        }
        .blog-cta:hover {
          background: rgba(79,114,86,0.08) !important;
          border-color: #3c5a40 !important;
          color: #3c5a40 !important;
        }
        .blog-read-link:hover {
          color: ${FOREST} !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .blog-card-img { transition: none !important; }
          .blog-cta      { transition: none !important; }
        }

        /* ── Hero split responsive ───────────────────────────────── */
        @media (max-width: 900px) {
          .blog-hero-split { flex-direction: column !important; height: auto !important; min-height: 0 !important; }
          .blog-hero-left  { width: 100% !important; padding: 88px 28px 44px !important; }
          .blog-hero-right { height: 46vw !important; min-height: 260px !important; }
          .editorial-split { flex-direction: column !important; }
          .editorial-split > * { width: 100% !important; }
          .editorial-row2  { grid-template-columns: 1fr 1fr !important; }
        }

        @media (max-width: 768px) {
          .blog-hero-title {
            font-size: clamp(18px, 5vw, 28px) !important;
          }
          .blog-hero-left  { padding: 84px 24px 40px !important; }
          .editorial-row2  { grid-template-columns: 1fr !important; }
          .section-pad     { padding: 0 20px !important; }
          .tail-grid       { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ backgroundColor: CREAM, minHeight: '100vh' }}>

        {/* ════════════════════════════════════════════════════════════
            1. FEATURED HERO — split editorial layout
               Left: brand-controlled forest panel (always beautiful)
               Right: featured post image (contained, not full-bleed)
        ════════════════════════════════════════════════════════════ */}
        {hero && (
          <section
            aria-label="Featured article"
            className="blog-hero-split"
            style={{
              display: 'flex',
              width: '100%',
              height: '82vh',
              minHeight: 560,
              overflow: 'hidden',
              marginTop: 80, /* clear fixed header */
            }}
          >
            {/* ── LEFT PANEL: editorial brand column — home-page palette ── */}
            <div
              className="blog-hero-left"
              style={{
                width: '52%',
                flexShrink: 0,
                background: 'linear-gradient(160deg, #F2F6EF 0%, #E4EDE4 60%, #C9D8C1 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '56px 56px 64px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle decorative arc — matches home page motif feel */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: -120, right: -120,
                width: 340, height: 340,
                borderRadius: '50%',
                border: '1px solid rgba(79,114,86,0.12)',
                pointerEvents: 'none',
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute', top: -60, right: -60,
                width: 200, height: 200,
                borderRadius: '50%',
                border: '1px solid rgba(79,114,86,0.08)',
                pointerEvents: 'none',
              }} />

              {/* Masthead */}
              <p style={{
                fontFamily: WIDE,
                fontSize: 10,
                letterSpacing: '5px',
                textTransform: 'uppercase',
                color: SAGE,
                margin: '0 0 20px',
                opacity: 0.75,
              }}>
                Carisma Slimming · The Blog
              </p>

              {/* Decorative rule — matches home page hairline style */}
              <div style={{ width: 90, height: 1, background: HAIR, marginBottom: 28 }} />

              {/* "Featured" label */}
              <p style={{
                fontFamily: WIDE,
                fontSize: 10,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: MUTED,
                margin: '0 0 14px',
                opacity: 0.7,
              }}>
                Weight Loss &amp; Slimming Blog Malta
              </p>

              {/* Blog index title — one H1 for the category page */}
              <h1
                className="blog-hero-title"
                style={{
                  fontFamily: SERIF,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(20px, 2.4vw, 36px)',
                  color: FOREST,
                  lineHeight: 1.22,
                  letterSpacing: '0.04em',
                  margin: '0 0 22px',
                  maxWidth: 480,
                }}
              >
                Weight Loss &amp; Slimming Blog Malta
              </h1>
              <h2
                style={{
                  fontFamily: SERIF,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(15px, 1.5vw, 22px)',
                  color: SAGE,
                  lineHeight: 1.25,
                  letterSpacing: '0.04em',
                  margin: '0 0 18px',
                  maxWidth: 460,
                }}
              >
                Featured: {hero.title}
              </h2>

              {/* Excerpt */}
              {hero.excerpt && (
                <p style={{
                  fontFamily: BODY,
                  fontSize: 14,
                  color: MUTED,
                  lineHeight: 1.65,
                  margin: '0 0 28px',
                  maxWidth: 420,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {hero.excerpt}
                </p>
              )}

              {/* Meta */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: MUTED,
                fontFamily: WIDE,
                fontSize: 10,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 32,
                opacity: 0.6,
              }}>
                <time dateTime={hero.published_date}>{formatLong(hero.published_date)}</time>
                <span aria-hidden="true">·</span>
                <span>{hero.minutes_to_read} min read</span>
              </div>

              {/* CTA — sage ghost button matching home page accent style */}
              <a
                href={`/blog/${hero.slug}`}
                className="blog-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'transparent',
                  color: SAGE,
                  border: `1px solid ${SAGE}`,
                  fontFamily: WIDE,
                  fontSize: 10,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  padding: '11px 22px',
                  borderRadius: 2,
                  textDecoration: 'none',
                  transition: 'background 200ms ease-out, color 200ms ease-out',
                  cursor: 'pointer',
                  width: 'fit-content',
                }}
              >
                Read Article <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* ── RIGHT PANEL: featured image (contained) ── */}
            <div
              className="blog-hero-right"
              style={{
                flex: 1,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Image
                src={hero.cover_image_url}
                alt={hero.title}
                className="blog-card-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'none' }}
                fetchPriority="high"
                loading="eager"
               width={1200} height={900} sizes="(max-width: 768px) 100vw, 640px" />
              {/* Left-edge vignette to blend with sage panel */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(201,216,193,0.18) 0%, transparent 20%)',
              }} />
            </div>
          </section>
        )}

        {/* Color bridge — subtle sage tint fades to cream */}
        <div aria-hidden="true" style={{ height: 40, background: 'linear-gradient(to bottom, rgba(79,114,86,0.05) 0%, transparent 100%)', pointerEvents: 'none' }} />

        {/* ════════════════════════════════════════════════════════════
            2. EDITORIAL SECTION HEADER
        ════════════════════════════════════════════════════════════ */}
        <div
          className="section-pad"
          style={{
            maxWidth: 1200,
            margin: '16px auto 48px',
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <p
            style={{
              fontFamily: WIDE,
              fontSize: 11,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: MUTED,
              whiteSpace: 'nowrap',
              margin: 0,
            }}
          >
            Latest Articles
          </p>
          <div style={{ flex: 1, height: 1, background: HAIR }} />
        </div>

        {/* ════════════════════════════════════════════════════════════
            3. EDITORIAL GRID — posts[1]–[5]
        ════════════════════════════════════════════════════════════ */}
        <div
          className="section-pad"
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}
        >
          {/* Row 1: 60/40 split */}
          <div
            className="editorial-split"
            style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}
          >
            {/* LEFT — large card */}
            {col1 && (
              <div style={{ width: '60%', flexShrink: 0 }}>
                <article className="blog-card" style={{ ...cardWrap }}>
                  <a href={`/blog/${col1.slug}`} style={cardLink}>
                    <div style={{ overflow: 'hidden', aspectRatio: '4/3', flexShrink: 0 }}>
                      <img
                        src={col1.cover_image_url}
                        alt={col1.title}
                        className="blog-card-img"
                        loading="lazy"
                      />
                    </div>
                    <div style={{ padding: '28px 32px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontFamily: WIDE, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: SAGE, margin: '0 0 14px' }}>
                        {formatShort(col1.published_date)} · {col1.minutes_to_read} min
                      </p>
                      <h2 style={{ fontFamily: SERIF, textTransform: 'uppercase', fontSize: 22, color: INK, lineHeight: 1.3, margin: '0 0 14px', letterSpacing: '0.02em' }}>
                        {col1.title}
                      </h2>
                      <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, lineHeight: 1.65, margin: '0 0 auto', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {col1.excerpt}
                      </p>
                      <p className="blog-read-link" style={{ fontFamily: WIDE, fontSize: 11, color: SAGE, letterSpacing: '1px', marginTop: 20, textTransform: 'uppercase', transition: 'color 200ms ease-out' }}>
                        Read →
                      </p>
                    </div>
                  </a>
                </article>
              </div>
            )}

            {/* RIGHT — medium card */}
            {col2 && (
              <div style={{ flex: 1 }}>
                <article className="blog-card" style={{ ...cardWrap }}>
                  <a href={`/blog/${col2.slug}`} style={cardLink}>
                    <div style={{ overflow: 'hidden', aspectRatio: '4/3', flexShrink: 0 }}>
                      <img
                        src={col2.cover_image_url}
                        alt={col2.title}
                        className="blog-card-img"
                        loading="lazy"
                      />
                    </div>
                    <div style={{ padding: '24px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontFamily: WIDE, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: SAGE, margin: '0 0 12px' }}>
                        {formatShort(col2.published_date)} · {col2.minutes_to_read} min
                      </p>
                      <h2 style={{ fontFamily: SERIF, textTransform: 'uppercase', fontSize: 18, color: INK, lineHeight: 1.3, margin: '0 0 12px', letterSpacing: '0.02em' }}>
                        {col2.title}
                      </h2>
                      <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, lineHeight: 1.6, margin: '0 0 auto', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {col2.excerpt}
                      </p>
                      <p className="blog-read-link" style={{ fontFamily: WIDE, fontSize: 11, color: SAGE, letterSpacing: '1px', marginTop: 16, textTransform: 'uppercase', transition: 'color 200ms ease-out' }}>
                        Read →
                      </p>
                    </div>
                  </a>
                </article>
              </div>
            )}
          </div>

          {/* Row 2: 3 equal columns */}
          {row2.length > 0 && (
            <div
              className="editorial-row2"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
                marginTop: 24,
              }}
            >
              {row2.map((post) => (
                <article key={post.slug} className="blog-card" style={{ ...cardWrap }}>
                  <a href={`/blog/${post.slug}`} style={cardLink}>
                    <div style={{ overflow: 'hidden', aspectRatio: '16/9', flexShrink: 0 }}>
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="blog-card-img"
                        loading="lazy"
                      />
                    </div>
                    <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontFamily: WIDE, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: SAGE, margin: '0 0 10px' }}>
                        {formatShort(post.published_date)} · {post.minutes_to_read} min
                      </p>
                      <h2 style={{ fontFamily: SERIF, textTransform: 'uppercase', fontSize: 15, color: INK, lineHeight: 1.35, margin: '0 0 10px', letterSpacing: '0.02em', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.title}
                      </h2>
                      <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED, lineHeight: 1.6, margin: '0 0 auto', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>
                      <p className="blog-read-link" style={{ fontFamily: WIDE, fontSize: 10, color: SAGE, letterSpacing: '1px', marginTop: 14, textTransform: 'uppercase', transition: 'color 200ms ease-out' }}>
                        Read →
                      </p>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════
            4. DIVIDER — "More Articles"
        ════════════════════════════════════════════════════════════ */}
        <div
          className="section-pad"
          style={{
            maxWidth: 1200,
            margin: '64px auto 48px',
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div style={{ flex: 1, height: 1, background: HAIR }} />
          <p
            style={{
              fontFamily: WIDE,
              fontSize: 10,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: MUTED,
              whiteSpace: 'nowrap',
              margin: 0,
            }}
          >
            More Articles
          </p>
          <div style={{ flex: 1, height: 1, background: HAIR }} />
        </div>

        {/* ════════════════════════════════════════════════════════════
            5. REMAINING CARDS — posts[6]–[19], 3-col FadeInUp grid
        ════════════════════════════════════════════════════════════ */}
        <div
          className="section-pad tail-grid"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 28,
          }}
        >
          {tail.map((post, i) => (
            <FadeInUp key={post.slug} delay={i * 60}>
              <article className="blog-card" style={{ ...cardWrap }}>
                <a href={`/blog/${post.slug}`} style={cardLink}>
                  <div style={{ overflow: 'hidden', aspectRatio: '16/9', flexShrink: 0 }}>
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="blog-card-img"
                      loading="lazy"
                    />
                  </div>
                  <div style={{ padding: '24px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontFamily: WIDE, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: SAGE, margin: '0 0 12px' }}>
                      {formatShort(post.published_date)} · {post.minutes_to_read} min
                    </p>
                    <h2 style={{ fontFamily: SERIF, textTransform: 'uppercase', fontSize: 16, color: INK, lineHeight: 1.3, margin: '0 0 12px', letterSpacing: '0.02em' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, lineHeight: 1.6, margin: '0 0 auto', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                    <p className="blog-read-link" style={{ fontFamily: WIDE, fontSize: 11, color: SAGE, letterSpacing: '1px', marginTop: 16, textTransform: 'uppercase', transition: 'color 200ms ease-out' }}>
                      Read →
                    </p>
                  </div>
                </a>
              </article>
            </FadeInUp>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════
            6. PAGINATION
        ════════════════════════════════════════════════════════════ */}
        <nav
          aria-label="Blog pagination"
          style={{
            maxWidth: 1200,
            margin: '80px auto 120px',
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <span
            aria-disabled="true"
            style={{
              fontFamily: BODY,
              fontSize: 14,
              color: '#ccc',
              cursor: 'default',
              userSelect: 'none',
            }}
          >
            ← Previous
          </span>

          <span
            style={{
              fontFamily: WIDE,
              fontSize: 11,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: INK,
            }}
          >
            Page 1 of {TOTAL_PAGES}
          </span>

          <a
            href="/blog/page/2"
            style={{
              fontFamily: BODY,
              fontSize: 14,
              color: SAGE,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color 150ms ease-out',
            }}
          >
            Next →
          </a>
        </nav>

        {/* Bottom fade — visual close before global footer */}
        <div aria-hidden="true" style={{ height: 80, background: 'linear-gradient(to bottom, transparent 0%, rgba(79,114,86,0.04) 100%)', pointerEvents: 'none' }} />

      </div>
    </>
  );
}
