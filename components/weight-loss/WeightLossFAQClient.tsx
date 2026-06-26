'use client';

import { useState } from 'react';
import Image from 'next/image';
import { weightLossFaqs } from '@/lib/faq/weight-loss';

/* ---------- Brand tokens (duplicated from page for isolation) ---------- */
const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
const green = '#4f7256';
const taupe = '#6f6456';
const taupeLight = '#6f6456';

/* ============================================================
   FAQ SECTION — interactive accordion with search
   ============================================================ */
export function WeightLossFAQSection() {
  const faqs = weightLossFaqs;
  const bullet = { color: green, fontSize: '18px', lineHeight: '1' } as const;

  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState('');

  const pStyle = { color: taupe, fontFamily: bodyFont, fontWeight: 400 as const, fontSize: '13px', lineHeight: 1.5 };
  const liStyle = { color: taupe, fontFamily: bodyFont, fontWeight: 400 as const, fontSize: '13px', lineHeight: 1.5 };

  const visible = faqs
    .map((f, i) => ({ f, i }))
    .filter(({ f }) => f.q.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section style={{ backgroundColor: '#ffffff', paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + search */}
        <div className="mb-10">
          <h2 className="text-center" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Frequently Asked Questions About Medical Weight Loss in Malta
          </h2>
          <div className="mt-6 mx-auto" style={{ width: '256px', maxWidth: '100%' }}>
            <div className="flex items-center gap-2" style={{ borderBottom: `1px solid ${taupeLight}`, paddingBottom: '6px' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Looking for something?"
                aria-label="Search frequently asked questions"
                className="w-full bg-transparent placeholder:text-[#6f6456]"
                style={{ color: taupe, fontFamily: bodyFont, fontSize: '15px' }}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={taupeLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div role="list">
          {visible.map(({ f, i }) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-btn-${i}`;
            return (
              <div key={f.q} role="listitem" style={{ borderBottom: '1px solid #e6e6e1' }}>
                <button
                  type="button"
                  id={btnId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ padding: '22px 4px', cursor: 'pointer', background: 'transparent' }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span style={{ color: green, fontFamily: wideFont, fontSize: '15px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>
                    {i + 1}. {f.q}
                  </span>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={taupe} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  style={{ padding: isOpen ? '0 4px 24px' : undefined }}
                >
                  {isOpen && (
                    <>
                      {f.intro && <p className="mb-4" style={pStyle}>{f.intro}</p>}
                      {f.bullets && (
                        <ul className="mb-4 space-y-2">
                          {f.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2" style={liStyle}>
                              <span style={bullet}>&bull;</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {f.paras && f.paras.map((p) => (
                        <p key={p} className="mb-4 last:mb-0" style={pStyle}>{p}</p>
                      ))}
                      {f.outro && <p style={pStyle}>{f.outro}</p>}
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {visible.length === 0 && (
            <p className="text-center py-8" style={pStyle}>No questions match &ldquo;{query}&rdquo;.</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EVIDENCE CARD — interactive expand/collapse
   ============================================================ */
export function EvidenceCard({ item }: { item: { title: string; strength: string; image: string; what: string; results: string[] } }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ position: 'relative', paddingTop: '16px', display: 'flex', flexDirection: 'column' }}>
      {/* Photo with floating badge */}
      <div style={{ position: 'relative', width: '92%', margin: '0 auto', zIndex: 2 }}>
        <div style={{ border: `2px solid ${green}`, borderRadius: '20px 80px', overflow: 'hidden', backgroundColor: '#eef3ea', position: 'relative', height: '186px' }}>
          <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} loading="lazy" />
        </div>
        <span style={{ position: 'absolute', top: '-14px', left: '18px', backgroundColor: '#fff', color: green, fontFamily: wideFont, fontWeight: 600, fontSize: '12px', letterSpacing: '0.5px', textTransform: 'uppercase', padding: '7px 18px', borderRadius: '9999px', border: `2px solid ${green}`, whiteSpace: 'nowrap' }}>
          {item.strength}
        </span>
      </div>
      {/* Card body */}
      <div style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F2F6EF 100%)', border: '1px solid #e8e2da', borderRadius: '16px', marginTop: '-70px', padding: '92px 30px 30px', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '20px', lineHeight: 1.3, textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>
          {item.title}
        </h3>
        <div style={{ width: '90px', height: '1px', backgroundColor: '#cfc8bf', margin: '16px auto 20px' }} />
        <p style={{ color: taupe, fontFamily: wideFont, fontWeight: 700, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>What it does</p>
        <p style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px', lineHeight: 1.6, margin: '0 0 6px', ...(expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }) }}>
          {item.what}
        </p>
        {expanded && (
          <div>
            <p style={{ color: taupe, fontFamily: wideFont, fontWeight: 700, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', margin: '14px 0 8px' }}>Key results</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {item.results.map((r) => (
                <li key={r} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: green, flexShrink: 0, marginTop: '4px' }}>•</span>
                  <span style={{ color: taupe, fontFamily: bodyFont, fontSize: '13.5px', lineHeight: 1.7 }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          style={{ marginTop: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: taupe, fontFamily: bodyFont, fontSize: '15px', fontStyle: 'italic', textDecoration: 'underline', padding: '8px 0', display: 'block', minHeight: '44px' }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </div>
  );
}
