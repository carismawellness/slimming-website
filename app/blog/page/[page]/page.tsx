import type { Metadata } from 'next';
import Link from 'next/link';
import postsData from '@/lib/blog/posts-index.json';
import FadeInUp from '@/components/blog/FadeInUp';

export const dynamicParams = false;

const POSTS_PER_PAGE = 20;
const TOTAL_PAGES = 20;

// ── Brand tokens ──────────────────────────────────────────────────────────────
const FOREST = '#024C27';
const SAGE   = '#4f7256';
const DECO   = '#8EB093';
const CREAM  = '#f8f5f0';
const INK    = '#1a1a1a';
const TEXT   = '#333333';
const MUTED  = '#595959';
const HAIR   = '#E5DED7';
const SERIF  = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const BODY   = 'Roboto, sans-serif';
const WIDE   = '"Novecento Wide Book","Novecento Wide",sans-serif';

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

const posts = postsData as Post[];

type Props = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  // Page 1 lives at /blog — this route covers pages 2 through 20
  return Array.from({ length: TOTAL_PAGES - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const pageNum = parseInt(page, 10);
  return {
    title: `Blog — Page ${pageNum} | Carisma Slimming Malta`,
    description: `Weight loss tips, GLP-1 guides and body contouring advice from Malta's #1 slimming clinic — page ${pageNum} of ${TOTAL_PAGES}.`,
    alternates: {
      canonical: `https://www.carismaslimming.com/blog/page/${pageNum}`,
    },
    openGraph: {
      title: `Carisma Slimming Blog — Page ${pageNum}`,
      description: `Expert weight loss articles from Carisma Slimming Malta — page ${pageNum} of ${TOTAL_PAGES}.`,
      url: `https://www.carismaslimming.com/blog/page/${pageNum}`,
      images: [{ url: '/background.avif', width: 1200, height: 630, alt: 'Carisma Slimming Blog' }],
    },
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);
  const start = (pageNum - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  const prevHref = pageNum === 2 ? '/blog' : `/blog/page/${pageNum - 1}`;
  const isLastPage = pageNum >= TOTAL_PAGES;

  const linkStyle: React.CSSProperties = {
    fontFamily: BODY,
    fontSize: 14,
    color: SAGE,
    textDecoration: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{ backgroundColor: CREAM, minHeight: '100vh' }}>
      <style>{`
        .blog-card-img { transition: transform 0.4s ease-out; }
        .blog-card:hover .blog-card-img { transform: scale(1.06); }
        .blog-card { cursor: pointer; }
        @media (prefers-reduced-motion: reduce) { .blog-card-img { transition: none !important; } }
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: 1fr !important; padding: 0 20px !important; }
          .blog-page-header { padding: 0 20px !important; }
          .blog-pagination { padding: 0 20px !important; }
        }
      `}</style>

      {/* ── Compact editorial header (no hero, just a dark banner) ──────── */}
      <section
        style={{
          height: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${FOREST} 0%, #013a1e 100%)`,
        }}
      >
        {/* Subtle radial texture overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(79,114,86,0.15) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: WIDE,
              fontSize: 11,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: DECO,
              margin: '0 0 16px',
            }}
          >
            Carisma Slimming · The Blog
          </p>

          {/* Page title */}
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: 1.15,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#ffffff',
              margin: '0 0 24px',
            }}
          >
            All Articles
          </h1>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                listStyle: 'none',
                margin: 0,
                padding: 0,
                fontFamily: WIDE,
                fontSize: 11,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              <li>
                <Link href="/" style={{ color: DECO, textDecoration: 'none' }}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true" style={{ color: SAGE }}>›</li>
              <li>
                <Link href="/blog" style={{ color: DECO, textDecoration: 'none' }}>
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" style={{ color: SAGE }}>›</li>
              <li style={{ color: '#ffffff' }} aria-current="page">
                Page {pageNum}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ── Section header with horizontal rule ─────────────────────────── */}
      <div
        className="blog-page-header"
        style={{
          maxWidth: 1200,
          margin: '64px auto 48px',
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
          Page {pageNum} of 20
        </p>
        <div style={{ flex: 1, height: 1, background: HAIR }} />
      </div>

      {/* ── Post grid ────────────────────────────────────────────────────── */}
      <div
        className="blog-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 32,
        }}
      >
        {pagePosts.map((post) => (
          <FadeInUp key={post.slug}>
            <article
              className="blog-card"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                background: '#fff',
                boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                cursor: 'pointer',
              }}
            >
              <a
                href={`/blog/${post.slug}`}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                {/* Cover image */}
                <div style={{ overflow: 'hidden', aspectRatio: '16/9' }}>
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    loading="lazy"
                    className="blog-card-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>

                {/* Card body */}
                <div style={{ padding: '20px 24px 24px' }}>
                  {/* Meta */}
                  <p
                    style={{
                      fontFamily: WIDE,
                      fontSize: 10,
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      color: SAGE,
                      marginBottom: 10,
                      margin: '0 0 10px',
                    }}
                  >
                    {new Date(post.published_date).toLocaleDateString('en-GB', {
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    · {post.minutes_to_read} min
                  </p>

                  {/* Title */}
                  <h2
                    style={{
                      fontFamily: SERIF,
                      textTransform: 'uppercase',
                      fontSize: 17,
                      color: INK,
                      lineHeight: 1.3,
                      margin: '0 0 10px',
                      fontWeight: 400,
                    }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontFamily: BODY,
                      fontSize: 14,
                      color: MUTED,
                      lineHeight: 1.6,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Read CTA */}
                  <p
                    style={{
                      fontFamily: WIDE,
                      fontSize: 11,
                      color: SAGE,
                      letterSpacing: '1px',
                      marginTop: 14,
                      textTransform: 'uppercase',
                      marginBottom: 0,
                    }}
                  >
                    Read →
                  </p>
                </div>
              </a>
            </article>
          </FadeInUp>
        ))}
      </div>

      {/* ── Elegant pagination ───────────────────────────────────────────── */}
      <div
        className="blog-pagination"
        style={{
          maxWidth: 1200,
          margin: '80px auto',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        {/* Previous */}
        <a href={prevHref} style={linkStyle}>
          ← Previous
        </a>

        {/* Page indicator */}
        <span
          style={{
            fontFamily: WIDE,
            fontSize: 11,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: INK,
          }}
        >
          Page {pageNum} of 20
        </span>

        {/* Next */}
        {isLastPage ? (
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
            Next →
          </span>
        ) : (
          <a href={`/blog/page/${pageNum + 1}`} style={linkStyle}>
            Next →
          </a>
        )}
      </div>
    </div>
  );
}
