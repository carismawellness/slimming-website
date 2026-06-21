'use client';

import { WHY, COMMITMENT, CONTACT } from '@/lib/redesign/content';
import Reveal from './Reveal';

function Tick() {
  return (
    <span className="cx-why-tick" aria-hidden>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function CheckList({ items, small = false }: { items: readonly string[]; small?: boolean }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: small ? 11 : 13 }}>
      {items.map((c) => (
        <li key={c} style={{ display: 'flex', gap: 12, fontFamily: 'var(--body)', fontSize: small ? 13.5 : 14, color: 'var(--taupe-ink)', lineHeight: 1.55 }}>
          <Tick />
          <span>{c}</span>
        </li>
      ))}
    </ul>
  );
}

export default function WhyCarisma() {
  return (
    <section id="why" className="cx-section" style={{ background: 'var(--white)' }}>
      <div className="cx-wrap">
        {/* The Carisma difference */}
        <Reveal style={{ textAlign: 'center', maxWidth: 680, marginInline: 'auto', marginBottom: 'clamp(32px,4vw,48px)' }}>
          <p className="cx-eyebrow" style={{ marginBottom: 14 }}>The Carisma difference</p>
          <div className="cx-rule center" style={{ marginBottom: 22 }} />
          <h2 className="cx-h2">Malta&rsquo;s <em>#1 leading wellness chain</em></h2>
        </Reveal>

        <div className="cx-why-grid" style={{ display: 'grid', gap: 'clamp(22px,3vw,40px)', alignItems: 'stretch' }}>
          <Reveal className="cx-panel cx-why-panel" style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, padding: 'clamp(26px,3vw,38px)' }}>
            <div aria-hidden className="cx-glow" style={{ width: 280, height: 280, background: 'rgba(142,176,147,0.5)', top: -120, right: -90, opacity: 0.4 }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 30 }}>
              <div>
                <h3 className="cx-kicker cx-why-head" style={{ fontSize: 12, color: 'var(--sage-ink)', marginBottom: 16, letterSpacing: '0.16em' }}>
                  <span className="cx-why-num">01</span> Our commitment
                </h3>
                <CheckList items={WHY.commitment} />
              </div>
              <div className="cx-why-divider" aria-hidden />
              <div>
                <h3 className="cx-kicker cx-why-head" style={{ fontSize: 12, color: 'var(--sage-ink)', marginBottom: 16, letterSpacing: '0.16em' }}>
                  <span className="cx-why-num">02</span> Why Malta chooses Carisma
                </h3>
                <CheckList items={WHY.why} />
              </div>
            </div>
          </Reveal>

          <Reveal style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="cx-map-frame" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-card)', flex: 1, minHeight: 320, border: '1px solid var(--line)' }}>
              <iframe
                title="Carisma Slimming — Grand Hotel Excelsior, Floriana"
                src={CONTACT.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', minHeight: 320, filter: 'saturate(0.85) contrast(1.02)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* address badge overlay */}
              <div className="cx-map-badge cx-glass">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
                  <path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z" stroke="#5f7e66" strokeWidth="1.6" />
                  <circle cx="12" cy="10" r="2.4" stroke="#5f7e66" strokeWidth="1.6" />
                </svg>
                <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--sage-ink)', lineHeight: 1.45, fontWeight: 500 }}>
                  Grand Hotel Excelsior, Floriana
                </span>
              </div>
            </div>
            <div className="cx-pill cx-park-pill" style={{ alignSelf: 'flex-start' }}>
              <span className="cx-park-icon" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M7 20V4h6.5a4.5 4.5 0 010 9H7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ fontSize: 12.5 }}>Complimentary free on-site parking</span>
            </div>
          </Reveal>
        </div>

        {/* Extended Care Commitment */}
        <Reveal className="cx-panel cx-care-panel" style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, padding: 'clamp(28px,3.5vw,46px)', marginTop: 'clamp(28px,4vw,44px)' }}>
          <div aria-hidden className="cx-glow" style={{ width: 360, height: 360, background: 'rgba(99,145,171,0.32)', bottom: -180, left: -100, opacity: 0.5 }} />
          <div className="cx-care-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 'clamp(22px,3vw,48px)', alignItems: 'start' }}>
            <div>
              <p className="cx-eyebrow" style={{ marginBottom: 14 }}>Our results-driven approach</p>
              <h3 className="cx-h2" style={{ fontSize: 'clamp(24px,3vw,34px)', marginBottom: 16 }}>The Extended Care Commitment</h3>
              <p className="cx-lead" style={{ fontSize: 15 }}>{COMMITMENT.promise}</p>
            </div>
            <div className="cx-care-agree">
              <p style={{ fontFamily: 'var(--wide)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--sage-ink)', marginBottom: 16 }}>
                To keep your results medically valid &amp; fair, you agree to:
              </p>
              <CheckList items={COMMITMENT.agree} small />
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .cx-why-tick {
          flex-shrink: 0; width: 19px; height: 19px; margin-top: 1px; border-radius: 50%;
          display: grid; place-items: center;
          background: linear-gradient(150deg, var(--sage), var(--sage-deep));
          box-shadow: 0 4px 10px -4px rgba(56,80,63,0.5);
        }
        .cx-why-head { display: flex; align-items: center; gap: 12px; }
        .cx-why-num {
          font-family: var(--serif); font-size: 16px; color: var(--sage); letter-spacing: 0;
          padding-right: 12px; border-right: 1px solid rgba(95,126,102,0.25);
        }
        .cx-why-divider { height: 1px; background: linear-gradient(90deg, rgba(95,126,102,0.22), transparent); }

        .cx-map-frame::after {
          content: ""; position: absolute; inset: 0; pointer-events: none; border-radius: 20px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4);
        }
        .cx-map-badge {
          position: absolute; left: 14px; bottom: 14px; z-index: 2;
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 14px; border-radius: 999px; max-width: calc(100% - 28px);
        }
        .cx-park-pill { gap: 9px; }
        .cx-park-icon {
          width: 20px; height: 20px; border-radius: 6px; display: grid; place-items: center;
          background: linear-gradient(150deg, var(--blue), var(--blue-deep));
        }

        @media (min-width: 900px){
          .cx-why-grid{ grid-template-columns: 1fr 1fr; }
          .cx-care-grid{ grid-template-columns: 1fr 1fr; }
          .cx-care-agree{ padding-left: clamp(0px, 2vw, 28px); border-left: 1px solid rgba(95,126,102,0.16); }
        }
      `}</style>
    </section>
  );
}
