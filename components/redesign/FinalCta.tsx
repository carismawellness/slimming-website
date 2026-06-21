'use client';

import { FINAL_CTA, REVIEWS, CONTACT } from '@/lib/redesign/content';
import Reveal from './Reveal';
import Cta from './Cta';
import FinalCtaAurora from './FinalCtaAurora';
import BookConsultationButton from '@/components/BookConsultationButton';

export default function FinalCta() {
  return (
    <section className="cx-section cx-grain" aria-labelledby="final-cta-heading" style={{ position: 'relative', overflow: 'hidden', background: 'var(--white)' }}>
      <div className="cx-wrap">
        <Reveal className="cx-panel cx-final-panel" style={{ position: 'relative', overflow: 'hidden', borderRadius: 32, padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,72px)', textAlign: 'center' }}>
          {/* Static CSS gradient base — always rendered. Serves as the full
              reduced-motion / small-screen fallback, and as a warm bed under
              the Three.js aurora. */}
          <div aria-hidden className="cx-final-fallback" />

          {/* Signature Three.js aurora (skips itself under reduced motion / small screens). */}
          <FinalCtaAurora />

          {/* subtle vignette to guarantee text legibility over the canvas */}
          <div aria-hidden className="cx-final-veil" />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 680, marginInline: 'auto' }}>
            <p className="cx-eyebrow" style={{ marginBottom: 16 }}>{FINAL_CTA.eyebrow}</p>
            <h2 id="final-cta-heading" className="cx-display" style={{ fontSize: 'clamp(32px,5.5vw,62px)', marginBottom: 20 }}>Begin your doctor-led slimming journey in Malta</h2>
            <p className="cx-lead" style={{ fontSize: 17, marginBottom: 32 }}>{FINAL_CTA.sub}</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 26 }}>
              <Cta variant="primary">{FINAL_CTA.cta}</Cta>
              <BookConsultationButton
                variant="outline"
                style={{ fontSize: '13px', padding: '14px 28px', minHeight: 48, border: '1px solid rgba(255,255,255,0.6)', color: '#fff', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' }}
              />
              <a
                href={CONTACT.phoneHref}
                className="cx-btn cx-btn-ghost"
                aria-label={`Call us at ${CONTACT.phone}`}
              >
                <span className="cx-btn-label">Call {CONTACT.phone}</span>
              </a>
            </div>
            <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--taupe)' }}>
              <span aria-label={`Rated ${REVIEWS.rating.toFixed(1)} out of 5 stars`} role="img">★</span>
              {' '}{REVIEWS.rating.toFixed(1)} from {REVIEWS.total}+ reviews · Doctor-led · Free on-site parking
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        .cx-final-panel { isolation: isolate; }
        .cx-final-fallback {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(120% 90% at 50% -10%, rgba(142,176,147,0.55), transparent 58%),
            radial-gradient(90% 80% at 18% 115%, rgba(99,145,171,0.32), transparent 60%),
            radial-gradient(80% 70% at 88% 108%, rgba(95,126,102,0.28), transparent 58%);
        }
        .cx-final-veil {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(120% 100% at 50% 45%, rgba(246,242,234,0.35) 0%, rgba(246,242,234,0.0) 45%, rgba(246,242,234,0.55) 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          /* keep a calm, fully-static look */
          .cx-final-fallback { background:
            radial-gradient(120% 90% at 50% 0%, rgba(142,176,147,0.5), transparent 60%),
            radial-gradient(90% 80% at 15% 110%, rgba(99,145,171,0.28), transparent 62%); }
        }
      `}</style>
    </section>
  );
}
