'use client';

/* Auto-scrolling marquee of the clinic's REAL Google reviews (single row).
   Each card links to the review at its source. Dates are computed live from
   each review's publish time, so they never go stale. Pauses on hover.
   Respects prefers-reduced-motion. */

import {
  SLIMMING_REVIEWS,
  AGGREGATE,
  GOOGLE_WRITE_REVIEW_URL,
  GOOGLE_PROFILE_URL,
  relativeDate,
  type Review,
} from '@/lib/reviews';

// ── Brand tokens (WCAG AA) ────────────────────────────────────────────────
const GREEN = '#4f7256';       // sage text / icons  5.10:1 on #f8f8f8
const DARK_GREEN = '#024C27';  // deep forest headings
const TAUPE = '#6f6456';       // body text          5.78:1 on #f8f8f8
const TAUPE_LT = '#595959';    // secondary/meta     6.60:1 on #f8f8f8
const GOLD = '#8c6d18';        // star fills         4.58:1 on #f8f8f8
const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const WIDE = '"Novecento Wide Book", "Novecento Wide", sans-serif';
const BODY = 'Roboto, sans-serif';

// ── Sub-components ────────────────────────────────────────────────────────

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Google" role="img">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function Stars({ rating = 5, size = 14 }: { rating?: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }} aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < Math.round(rating) ? GOLD : '#e2e2e2'} aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <a
      href={r.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${r.name}'s review on Google`}
      style={{
        flexShrink: 0,
        width: 300,
        background: '#ffffff',
        borderRadius: 16,
        padding: '20px 22px',
        boxShadow: '0 2px 12px rgba(2,76,39,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        margin: '0 10px',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* Header: avatar + name + date + Google badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: r.avatarColor,
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: WIDE,
            fontSize: 14,
            fontWeight: 700,
          }}
          aria-hidden
        >
          {r.initials}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontFamily: BODY,
              fontSize: 13.5,
              fontWeight: 600,
              color: TAUPE,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {r.name}
          </p>
          <p
            style={{ margin: 0, fontFamily: BODY, fontSize: 11, color: TAUPE_LT }}
            suppressHydrationWarning
          >
            {relativeDate(r.publishedAt)}
          </p>
        </div>
        <GoogleG size={18} />
      </div>

      {/* Stars */}
      <Stars rating={r.rating} size={14} />

      {/* Review text — 4-line clamp */}
      <p
        style={{
          margin: 0,
          fontFamily: BODY,
          fontSize: 13,
          color: TAUPE,
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {r.text}
      </p>
    </a>
  );
}

// ── Marquee row ───────────────────────────────────────────────────────────

function MarqueeRow({ reviews, duration }: { reviews: Review[]; duration: number }) {
  // Duplicate for seamless looping.
  const doubled = [...reviews, ...reviews];
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        className="slimming-marquee-track"
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `slimming-marquee-left ${duration}s linear infinite`,
          paddingBottom: 4,
        }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} r={r} />
        ))}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────

export default function GoogleReviews() {
  const { rating, count } = AGGREGATE;

  return (
    <section
      style={{ background: '#F2F6EF', padding: '64px 0 56px' }}
      aria-label="Client reviews"
    >
      <style>{`
        @keyframes slimming-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .slimming-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .slimming-marquee-track { animation: none !important; }
        }
      `}</style>

      {/* Aggregate bar — real Google rating + count */}
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ marginBottom: 36, textAlign: 'center' }}
      >
        <p
          style={{
            fontFamily: SERIF,
            fontSize: 13,
            letterSpacing: 4,
            color: GREEN,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          What our clients say
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: SERIF, fontSize: 42, color: DARK_GREEN, lineHeight: 1 }}>{rating}</span>
          <div>
            <Stars rating={5} size={20} />
            <p style={{ margin: '4px 0 0', fontFamily: BODY, fontSize: 12.5, color: TAUPE_LT }}>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}
              >
                {count} reviews on{' '}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <GoogleG size={14} />
                  <span style={{ fontFamily: BODY, fontSize: 12.5 }}>
                    <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
                  </span>
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Real reviews — single row */}
      <MarqueeRow reviews={SLIMMING_REVIEWS} duration={44} />

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <a
          href={GOOGLE_WRITE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: WIDE,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.5px',
            color: GREEN,
            border: `2px solid ${GREEN}`,
            borderRadius: 8,
            padding: '11px 24px',
            textDecoration: 'none',
          }}
        >
          <GoogleG size={16} />
          Leave us a Google review
        </a>
      </div>
    </section>
  );
}
