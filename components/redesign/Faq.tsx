'use client';

import { useState } from 'react';
import { FAQ } from '@/lib/redesign/content';
import Reveal from './Reveal';
import Cta from './Cta';

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`cx-faq-item cx-faq-premium ${open ? 'open' : ''}`}>
      <h3 style={{ margin: 0 }}>
        <button type="button" className="cx-faq-q" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span>{q}</span>
          <span className="cx-faq-icon" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </span>
        </button>
      </h3>
      {/* grid-rows 0fr→1fr animates cleanly for unknown content heights */}
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows .5s var(--ease)' }}>
        <div style={{ overflow: 'hidden' }}>
          <p className="cx-faq-answer" style={{ fontFamily: 'var(--body)', fontSize: 14.5, color: 'var(--taupe)', lineHeight: 1.65, padding: '0 0 24px' }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="cx-section" style={{ background: 'var(--white)' }}>
      <div className="cx-wrap cx-wrap-tight">
        <div className="cx-faq-layout" style={{ display: 'grid', gap: 'clamp(28px,4vw,56px)', alignItems: 'start' }}>
          <Reveal style={{ position: 'relative' }}>
            <p className="cx-eyebrow" style={{ marginBottom: 14 }}>Questions, answered</p>
            <h2 className="cx-h2" style={{ marginBottom: 18 }}>Slimming treatment questions, <em>honestly answered</em></h2>
            <p className="cx-lead" style={{ marginBottom: 26 }}>No pressure, no judgement. Here&rsquo;s what most people ask before booking their free body analysis.</p>
            <div className="cx-faq-cta-desktop" style={{ display: 'none' }}>
              <Cta variant="primary">Get your free body analysis</Cta>
            </div>
          </Reveal>

          <Reveal className="cx-faq-list">
            {FAQ.map((f) => <Item key={f.q} q={f.q} a={f.a} />)}
            <div style={{ marginTop: 28 }} className="cx-faq-cta-mobile">
              <Cta variant="primary">Get your free body analysis</Cta>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        /* premium accordion polish — scoped, no preview.css edits */
        .cx-faq-premium {
          border-bottom: 1px solid var(--line);
          border-radius: 14px;
          padding-inline: clamp(4px, 1.4vw, 18px);
          transition: background .45s var(--ease), box-shadow .45s var(--ease), border-color .45s var(--ease);
        }
        .cx-faq-premium .cx-faq-q {
          gap: 22px;
          transition: color .35s var(--ease);
        }
        .cx-faq-premium:hover { background: var(--sage-mist); }
        .cx-faq-premium:hover .cx-faq-q { color: var(--sage-deep); }
        .cx-faq-premium.open {
          background: linear-gradient(165deg, #fff 0%, var(--sage-mist) 120%);
          border-bottom-color: transparent;
          box-shadow: var(--shadow-soft);
        }
        .cx-faq-premium.open + .cx-faq-premium { border-top: 1px solid transparent; }
        .cx-faq-premium .cx-faq-icon { transition: transform .5s var(--ease), background .45s var(--ease), color .45s var(--ease), border-color .45s var(--ease); }
        .cx-faq-premium:hover .cx-faq-icon { border-color: var(--sage-deep); background: rgba(142,176,147,0.12); }
        .cx-faq-premium.open .cx-faq-icon { box-shadow: 0 6px 16px -8px rgba(56,80,63,0.5); }
        .cx-faq-answer { max-width: 62ch; }

        @media (min-width: 900px){
          .cx-faq-layout{ grid-template-columns: 0.8fr 1.2fr; }
          .cx-faq-cta-desktop{ display: block !important; }
          .cx-faq-cta-mobile{ display: none; }
        }
      `}</style>
    </section>
  );
}
