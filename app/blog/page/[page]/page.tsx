import type { Metadata } from 'next';
import Link from 'next/link';
import postsData from '@/lib/blog/posts-index.json';

export const dynamicParams = false;

const POSTS_PER_PAGE = 20;
const TOTAL_PAGES = 20;

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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-MT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function truncate(text: string, max = 150): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + '…';
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);
  const start = (pageNum - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  const prevHref = pageNum === 2 ? '/blog' : `/blog/page/${pageNum - 1}`;
  const isLastPage = pageNum >= TOTAL_PAGES;

  return (
    <div style={{ backgroundColor: '#f8f6f2', minHeight: '100vh' }}>
      {/* ── Hero / header ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#024C27',
          padding: '64px 24px 56px',
          textAlign: 'center',
        }}
      >
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '28px' }}>
          <ol
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              fontFamily: 'Novecento Wide Book, sans-serif',
              fontSize: '12px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}
          >
            <li>
              <Link href="/" style={{ color: '#C9D8C1', textDecoration: 'none' }}>
                Home
              </Link>
            </li>
            <li aria-hidden="true" style={{ color: '#4f7256' }}>›</li>
            <li>
              <Link href="/blog" style={{ color: '#C9D8C1', textDecoration: 'none' }}>
                Blog
              </Link>
            </li>
            <li aria-hidden="true" style={{ color: '#4f7256' }}>›</li>
            <li style={{ color: '#ffffff' }} aria-current="page">
              Page {pageNum}
            </li>
          </ol>
        </nav>

        <h1
          style={{
            fontFamily: 'Trajan Pro, serif',
            fontWeight: 400,
            fontSize: 'clamp(26px, 4vw, 42px)',
            lineHeight: 1.2,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#ffffff',
            margin: '0 0 16px',
          }}
        >
          The Carisma Slimming Blog
        </h1>
        <p
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '17px',
            lineHeight: 1.65,
            color: '#C9D8C1',
            maxWidth: '620px',
            margin: '0 auto 8px',
          }}
        >
          Expert advice on weight loss, body contouring, and GLP-1 treatments
          in Malta — compassionate, evidence-led, and always shame-free.
        </p>
        <p
          style={{
            fontFamily: 'Novecento Wide Book, sans-serif',
            fontSize: '12px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#4f7256',
            margin: 0,
          }}
        >
          Page {pageNum} of {TOTAL_PAGES}
        </p>
      </section>

      {/* ── Post grid ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px 48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {pagePosts.map((post) => (
            <article
              key={post.slug}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(2,76,39,0.07)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Cover image */}
              <Link href={`/blog/${post.slug}`} style={{ display: 'block', flexShrink: 0 }}>
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Link>

              {/* Card body */}
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                {/* Meta row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <time
                    dateTime={post.published_date}
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '12px',
                      color: '#6f6456',
                    }}
                  >
                    {formatDate(post.published_date)}
                  </time>
                  <span aria-hidden="true" style={{ color: '#C9D8C1', fontSize: '10px' }}>
                    •
                  </span>
                  <span
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '12px',
                      color: '#6f6456',
                    }}
                  >
                    {post.minutes_to_read} min read
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: 'Trajan Pro, serif',
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: 1.4,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: '#024C27',
                    margin: '0 0 10px',
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: '#595959',
                    margin: '0 0 20px',
                    flex: 1,
                  }}
                >
                  {truncate(post.excerpt, 150)}
                </p>

                {/* Read more */}
                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'Novecento Wide Book, sans-serif',
                    fontSize: '12px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#4f7256',
                    textDecoration: 'none',
                    fontWeight: 700,
                    alignSelf: 'flex-start',
                  }}
                >
                  Read article
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="#4f7256"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── Pagination ───────────────────────────────────────────── */}
        <nav
          aria-label="Blog pagination"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            paddingTop: '56px',
          }}
        >
          {/* Previous */}
          <Link
            href={prevHref}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '999px',
              border: '1px solid #024C27',
              fontFamily: 'Novecento Wide Book, sans-serif',
              fontSize: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#024C27',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            ← Previous
          </Link>

          <span
            style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: '14px',
              color: '#6f6456',
            }}
          >
            Page {pageNum} of {TOTAL_PAGES}
          </span>

          {/* Next — disabled on last page */}
          {isLastPage ? (
            <span
              aria-disabled="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                borderRadius: '999px',
                border: '1px solid #C9D8C1',
                fontFamily: 'Novecento Wide Book, sans-serif',
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#C9D8C1',
                cursor: 'not-allowed',
                userSelect: 'none',
              }}
            >
              Next →
            </span>
          ) : (
            <Link
              href={`/blog/page/${pageNum + 1}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                borderRadius: '999px',
                backgroundColor: '#024C27',
                fontFamily: 'Novecento Wide Book, sans-serif',
                fontSize: '12px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              Next →
            </Link>
          )}
        </nav>
      </section>
    </div>
  );
}
