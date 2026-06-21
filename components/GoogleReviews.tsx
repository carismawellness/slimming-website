'use client';

/* Reviews block at the top of the footer.
   - Header: "What our clients say" eyebrow, a big 4.9 rating, and a count line
     with both a Google and a Fresha badge.
   - One marquee row of the clinic's REAL Google reviews (scrolls left).
   - Two marquee rows of Fresha reviews below (scroll in opposite directions).
   Real data only — Google reviews from '@/lib/reviews', Fresha from
   '@/lib/fresha-reviews'. Google relative dates are computed live so they never
   go stale. The section background is transparent so the footer gradient shows
   through. Marquees pause on hover and respect prefers-reduced-motion. */

import {
  SLIMMING_REVIEWS,
  GOOGLE_PROFILE_URL,
  relativeDate,
  type Review,
} from '@/lib/reviews';
import {
  FRESHA_REVIEWS,
  FRESHA_PROFILE,
  type FreshaReview,
} from '@/lib/fresha-reviews';

// ── Brand tokens (light gradient, WCAG AA) ────────────────────────────────
const INK = '#574e46';      // softened warm charcoal (was #1a1a1a — less loud); AA on light
const BODY_C = '#333333';   // body text
const META = '#595959';     // muted / meta
const SAGE = '#4f7256';     // links / icons / CTA fill (white text = AA)
const GOLD = '#8c6d18';     // star fills
const HAIRLINE = '#E5DED7'; // hairlines
const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const WIDE = '"Novecento Wide Book", "Novecento Wide", sans-serif';
const BODY = 'Roboto, sans-serif';

// ── Badges ────────────────────────────────────────────────────────────────

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

function FreshaBadge({ size = 18 }: { size?: number }) {
  const r = Math.round(size * 0.28);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Fresha" role="img">
      <rect x="0" y="0" width="24" height="24" rx={r} fill="#1a0c2e" />
      <text x="12" y="17.5" textAnchor="middle" fontFamily="sans-serif" fontSize="15" fontWeight="700" fill="#ffffff">f</text>
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

// ── Avatar ────────────────────────────────────────────────────────────────

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      style={{
        flexShrink: 0,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: color,
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
      {initials}
    </span>
  );
}

// Shared card chrome.
const CARD_STYLE: React.CSSProperties = {
  flexShrink: 0,
  width: 300,
  background: '#ffffff',
  borderRadius: 16,
  padding: '20px 22px',
  border: `1px solid ${HAIRLINE}`,
  boxShadow: '0 2px 12px rgba(26,26,26,0.06)',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  margin: '0 10px',
  textDecoration: 'none',
  color: 'inherit',
};

const NAME_STYLE: React.CSSProperties = {
  margin: 0,
  fontFamily: BODY,
  fontSize: 13.5,
  fontWeight: 600,
  color: INK,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

// ── Google review card ──────────────────────────────────────────────────────

function GoogleReviewCard({ r }: { r: Review }) {
  return (
    <a
      href={r.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${r.name}'s review on Google`}
      style={CARD_STYLE}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar initials={r.initials} color={r.avatarColor} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={NAME_STYLE}>{r.name}</p>
          <p style={{ margin: 0, fontFamily: BODY, fontSize: 11, color: META }} suppressHydrationWarning>
            {relativeDate(r.publishedAt)}
          </p>
        </div>
        <GoogleG size={18} />
      </div>

      <Stars rating={r.rating} size={14} />

      <p
        style={{
          margin: 0,
          fontFamily: BODY,
          fontSize: 13,
          color: BODY_C,
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

// ── Fresha review card (no dates) ───────────────────────────────────────────

const SAGE_AVATARS = ['#4f7256', '#124E59', '#6f6456', '#5a5043', '#6391AB'];

function FreshaReviewCard({ r, idx }: { r: FreshaReview; idx: number }) {
  const hasText = !!r.text && r.text.trim().length > 0;
  return (
    <a
      href={FRESHA_PROFILE.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${r.name}'s review on Fresha`}
      style={CARD_STYLE}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar initials={r.initials} color={SAGE_AVATARS[idx % SAGE_AVATARS.length]} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={NAME_STYLE}>{r.name}</p>
          <p style={{ margin: 0, fontFamily: BODY, fontSize: 11, color: META }}>Fresha booking</p>
        </div>
        <FreshaBadge size={18} />
      </div>

      <Stars rating={r.rating} size={14} />

      {hasText ? (
        <p
          style={{
            margin: 0,
            fontFamily: BODY,
            fontSize: 13,
            color: BODY_C,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {r.text}
        </p>
      ) : (
        <p style={{ margin: 0, fontFamily: BODY, fontSize: 13, fontStyle: 'italic', color: META, lineHeight: 1.6 }}>
          Verified Fresha review
        </p>
      )}
    </a>
  );
}

// ── Marquee row ─────────────────────────────────────────────────────────────

function MarqueeRow({
  direction,
  duration,
  children,
}: {
  direction: 'left' | 'right';
  duration: number;
  children: React.ReactNode[];
}) {
  // Duplicate for seamless looping.
  const doubled = [...children, ...children];
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        className="slimming-marquee-track"
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `slimming-marquee-${direction} ${duration}s linear infinite`,
          paddingBottom: 4,
        }}
      >
        {doubled.map((child, i) => (
          <div key={i} style={{ display: 'flex' }}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────

export default function GoogleReviews() {
  const googleReviews = SLIMMING_REVIEWS.filter((r) => r.source === 'google');

  return (
    <section style={{ background: 'transparent', padding: '44px 0 40px' }} aria-label="Client reviews">
      <style>{`
        @keyframes slimming-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes slimming-marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .slimming-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .slimming-marquee-track { animation: none !important; }
        }
      `}</style>

      {/* Header — real aggregate rating + count, both review platforms */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" style={{ marginBottom: 24, textAlign: 'center' }}>
        <p
          style={{
            fontFamily: SERIF,
            fontSize: 13,
            letterSpacing: 4,
            color: SAGE,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          What our clients say
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          {/* Primary stats — big and bold */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontFamily: SERIF, fontSize: 64, color: INK, lineHeight: 1, fontWeight: 400 }}>4.9</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
              <Stars rating={5} size={24} />
              <span style={{ fontFamily: BODY, fontSize: 20, fontWeight: 600, color: INK, letterSpacing: '-0.3px' }}>800+ verified reviews</span>
            </div>
          </div>
          {/* Secondary — platform attribution */}
          <p
            style={{
              margin: 0,
              fontFamily: BODY,
              fontSize: 12,
              color: META,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              flexWrap: 'wrap',
            }}
          >
            <span>on</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <GoogleG size={13} /> Google
            </span>
            <span aria-hidden style={{ color: HAIRLINE }}>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <FreshaBadge size={13} /> Fresha
            </span>
          </p>
        </div>
      </div>

      {/* Google reviews — single row, scrolls left */}
      <MarqueeRow direction="left" duration={44}>
        {googleReviews.map((r) => (
          <GoogleReviewCard key={r.id} r={r} />
        ))}
      </MarqueeRow>

      {/* Fresha reviews — single row, scrolls right */}
      <div style={{ marginTop: 16 }}>
        <MarqueeRow direction="right" duration={48}>
          {FRESHA_REVIEWS.map((r, i) => (
            <FreshaReviewCard key={r.id} r={r} idx={i} />
          ))}
        </MarqueeRow>
      </div>
    </section>
  );
}
