'use client';

import { PROBLEM } from '@/lib/redesign/content';
import Reveal from './Reveal';

export default function Problem() {
  return (
    <section className="cx-section cx-grain" style={{ background: 'linear-gradient(180deg, #fff 0%, var(--cream) 100%)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden className="cx-glow" style={{ width: 380, height: 380, background: 'rgba(201,216,193,0.6)', bottom: -120, left: -100 }} />
      <div className="cx-wrap cx-wrap-tight" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gap: 'clamp(28px,5vw,56px)' }} className="cx-problem-grid">
          <Reveal>
            <p className="cx-eyebrow" style={{ marginBottom: 16 }}>{PROBLEM.eyebrow}</p>
            <h2 className="cx-h2" style={{ marginBottom: 20 }}>Why diets alone don&rsquo;t work — and what does</h2>
            <p className="cx-lead">{PROBLEM.body}</p>
          </Reveal>

          <Reveal stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {PROBLEM.pains.map((p) => (
              <div key={p.t} className="cx-card" style={{ padding: '20px 18px', borderRadius: 18 }}>
                <span aria-hidden style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(155,141,131,0.14)', marginBottom: 12, display: 'grid', placeItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#9b8d83" strokeWidth="2" strokeLinecap="round" /></svg>
                </span>
                <h3 style={{ fontFamily: 'var(--wide)', fontSize: 12.5, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--sage-ink)', marginBottom: 7 }}>{p.t}</h3>
                <p style={{ fontFamily: 'var(--body)', fontSize: 13.5, color: 'var(--taupe)', lineHeight: 1.55 }}>{p.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
      <style>{`@media (min-width: 880px){ .cx-problem-grid{ grid-template-columns: 1fr 1fr; align-items: center; } }`}</style>
    </section>
  );
}
