'use client';

/* Google reviews block for the slimming site — a styled recreation of the live
   Elfsight Google Reviews widget, populated with the real reviews from the
   clinic's Google listing (lib/reviews.ts). Mirrors the Carisma Aesthetics
   GoogleReviews setup, restyled with the slimming palette/fonts. */

import { useState } from 'react';
import { CURATED_REVIEWS, REVIEW_SUMMARY, GOOGLE_PROFILE_URL, GOOGLE_WRITE_REVIEW_URL, type Review } from '@/lib/reviews';

const GREEN = '#8EB093';
const TAUPE = '#9B8D83';
const TAUPE_LT = '#AFA39D';
const GOLD = '#FCBF02';
const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const WIDE = 'Novecento Wide Book, Novecento Wide, sans-serif';
const BODY = 'Roboto, sans-serif';

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function Stars({ rating = 5, size = 16 }: { rating?: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', color: GOLD }} aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < Math.round(rating) ? 'currentColor' : '#e2e2e2'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

const AVATAR_COLORS = ['#b27c93', '#7c9eb2', '#8fb29a', '#b29a7c', '#9a8fb2', '#b2877c'];

function ReviewCard({ r, color }: { r: Review; color: string }) {
  const [open, setOpen] = useState(false);
  const long = r.text.length > 140;
  return (
    <div style={{ backgroundColor: '#f8f8f8', border: '1px solid rgba(150,178,178,0.35)', borderRadius: 8, padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ flexShrink: 0, width: 42, height: 42, borderRadius: '50%', background: color, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: WIDE, fontSize: 17 }}>{r.initial}</span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontFamily: BODY, fontSize: 14.5, color: TAUPE, fontWeight: 600 }}>{r.name}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="10" fill="#96b2b2" /><path d="M10.2 15.3l-2.6-2.6 1.1-1.1 1.5 1.5 4-4 1.1 1.1z" fill="#fff" /></svg>
          </span>
          <span style={{ display: 'block', fontFamily: BODY, fontSize: 11.5, color: TAUPE_LT }}>{r.when}</span>
        </span>
        <GoogleG size={20} />
      </div>
      <div style={{ marginTop: 12 }}><Stars rating={r.rating} /></div>
      <p
        style={{
          marginTop: 10, fontFamily: BODY, fontSize: 13.5, color: TAUPE, lineHeight: 1.65,
          ...(open ? {} : { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }),
        }}
      >
        {r.text}
      </p>
      {long && (
        <button type="button" onClick={() => setOpen((v) => !v)} style={{ marginTop: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: BODY, fontSize: 13, color: '#96b2b2' }}>
          {open ? 'Hide' : 'Read more'}
        </button>
      )}
    </div>
  );
}

export default function GoogleReviews() {
  const { rating, total } = REVIEW_SUMMARY;
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '56px 0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* summary bar */}
        <div style={{ backgroundColor: '#f7f7f5', borderRadius: 10, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontFamily: SERIF, fontSize: 38, color: TAUPE, lineHeight: 1 }}>{rating.toFixed(1)}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Stars rating={rating} size={18} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: BODY, fontSize: 13, color: TAUPE_LT }}>
                {total} reviews on <GoogleG size={16} />
                <span style={{ fontFamily: BODY, fontWeight: 600 }}>
                  <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
                </span>
              </span>
            </span>
          </div>
          <a href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: GREEN, color: '#fff', fontFamily: WIDE, fontSize: 14, fontWeight: 700, letterSpacing: '0.4px', padding: '13px 26px', borderRadius: 6, textDecoration: 'none' }}>
            Review us on Google
          </a>
        </div>

        {/* review cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {CURATED_REVIEWS.slice(0, 6).map((r, i) => (
            <ReviewCard key={r.name + i} r={r} color={AVATAR_COLORS[i % AVATAR_COLORS.length]} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #e3ddd5', borderRadius: 999, padding: '11px 24px', fontFamily: WIDE, fontSize: 13, color: TAUPE, textDecoration: 'none' }}>
            <GoogleG size={16} /> See all our reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
