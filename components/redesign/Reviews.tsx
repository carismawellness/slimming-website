'use client';

import GoogleReviews from '@/components/GoogleReviews';
import Reveal from './Reveal';

/** Reuses the existing real Google reviews block (lib/reviews.ts) under a
    redesigned section header. */
export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" style={{ background: 'var(--white)', paddingTop: 'clamp(56px,7vw,96px)' }}>
      <Reveal style={{ textAlign: 'center', maxWidth: 640, marginInline: 'auto', paddingInline: 24 }}>
        <p className="cx-eyebrow" style={{ marginBottom: 14 }}>Real people, real reviews</p>
        <div className="cx-rule center" style={{ marginBottom: 22 }} />
        <h2 id="reviews-heading" className="cx-h2">Loved by clients <em>across Malta</em></h2>
      </Reveal>
      <GoogleReviews />
    </section>
  );
}
