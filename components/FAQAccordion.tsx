'use client';

import { useState } from 'react';
import { glp1Faqs as FAQS } from '@/lib/faq/glp1';
import { trackEvent } from '@/lib/analytics';

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
// Accessible brand-family colors (WCAG AA on white).
// --brand-green-text: deep sage for sage TEXT/ICONS on white (5.42:1).
const green = '#4f7256';
// TAUPE: darkened taupe for body/input text and form borders/icons (5.78:1).
const taupe = '#6f6456';
const taupeLight = '#6f6456';


export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const visible = FAQS.map((f, i) => ({ f, i })).filter(({ f }) => f.q.toLowerCase().includes(query.trim().toLowerCase()));

  // FAQPage JSON-LD for this accordion is emitted once by the GLP-1 page
  // (app/glp1/page.tsx via faqPage(FAQS)) to avoid a duplicate FAQPage block.

  return (
    <section style={{ backgroundColor: '#ffffff', paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-10">
          <h2 className="text-center" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Frequently asked questions about GLP-1 weight loss in Malta
          </h2>
          <div className="mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mx-auto" style={{ maxWidth: '300px' }}>
            <div className="flex items-center gap-2" style={{ borderBottom: `1px solid ${taupeLight}`, paddingBottom: '6px' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Looking for something?"
                className="w-full bg-transparent"
                style={{ color: taupe, fontFamily: bodyFont, fontSize: '15px' }}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={taupeLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          {visible.map(({ f, i }) => {
            const isOpen = open === i;
            return (
              <div key={f.q} style={{ borderBottom: '1px solid #e6e6e1' }}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(isOpen ? null : i);
                    if (!isOpen) {
                      trackEvent('faq_open', {
                        page_type: 'glp1',
                        cta_label: f.q,
                        section: 'glp1_faq',
                      });
                    }
                  }}
                  className="w-full flex items-center justify-between gap-4 text-left"
                  style={{ padding: '22px 4px', cursor: 'pointer', background: 'transparent' }}
                  aria-expanded={isOpen}
                >
                  <h3 style={{ color: green, fontFamily: bodyFont, fontSize: '15px', fontWeight: 400, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4, margin: 0 }}>
                    {i + 1}. {f.q}
                  </h3>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-in-out motion-reduce:transition-none" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div hidden={!isOpen} style={{ padding: '0 4px 24px' }}>
                  <p style={{ color: taupe, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>{f.a}</p>
                </div>
              </div>
            );
          })}
          {visible.length === 0 && (
            <p className="text-center py-8" style={{ color: taupe, fontFamily: bodyFont, fontSize: '15px' }}>No questions match your search.</p>
          )}
        </div>
      </div>
    </section>
  );
}
