'use client';

import { useState } from 'react';

const wideFont = 'Novecento Wide Guide, Novecento Wide Book, Novecento Wide, sans-serif';
const bodyFont = 'Roboto, sans-serif';
// WCAG AA-corrected: bright #8EB093/#9B8D83 failed as text on white (2.39 / 3.22).
const green = '#4f7256'; // deep sage — active-tab indicator & focus ring (>=3:1 on white)
const taupe = '#5f5649'; // darkened taupe for tab labels / outcome text (>=4.92:1 on white & panel gradient)

export type Outcome = { title: string; text: string; icon: string };

export default function OutcomeStepper({ outcomes }: { outcomes: Outcome[] }) {
  const [active, setActive] = useState(0);
  const o = outcomes[active];
  return (
    <div className="mx-auto" style={{ maxWidth: '970px' }}>
      {/* Visible focus indicator (>=3:1, never removed) for keyboard users */}
      <style>{`.outcome-step-tab:focus-visible{outline:3px solid ${green};outline-offset:3px;border-radius:2px;}`}</style>
      {/* STEP 1-4 tab bar */}
      <div className="grid grid-cols-4" style={{ borderBottom: '1px solid #D9D2CB' }}>
        {outcomes.map((it, i) => (
          <button
            key={it.title}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            aria-current={i === active ? 'step' : undefined}
            className="text-left uppercase outcome-step-tab"
            style={{
              fontFamily: wideFont,
              fontSize: '16px',
              // Non-color cue: active tab is heavier (700) + underlined; inactive is lighter (500).
              fontWeight: i === active ? 700 : 500,
              textDecoration: i === active ? 'underline' : 'none',
              textUnderlineOffset: '4px',
              color: i === active ? green : taupe,
              padding: '0 0 12px 20px',
              marginBottom: '-1px',
              borderBottom: i === active ? `3px solid ${green}` : '3px solid transparent',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            STEP {i + 1}
          </button>
        ))}
      </div>
      {/* Active outcome panel */}
      <div
        className="card flex items-center"
        style={{
          background: 'linear-gradient(100deg, #C7D8C6 0%, #EFF3EC 45%, #F8F8F4 100%)',
          borderRadius: '16px',
          padding: '37px 38px 37px 14px',
          marginTop: '2px',
        }}
      >
        <div className="hidden sm:flex items-center justify-center" style={{ width: '220px', flexShrink: 0 }}>
          <img src={o.icon} alt={o.title} style={{ width: '145px', height: '145px', objectFit: 'contain' }} />
        </div>
        <div
          className="flex-1 bg-white"
          style={{ borderRadius: '16px', padding: '34px 30px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
        >
          <h3
            className="uppercase mb-2"
            style={{ fontFamily: wideFont, fontSize: '18px', fontWeight: 400, color: taupe }}
          >
            {o.title}
          </h3>
          <p style={{ fontFamily: bodyFont, fontSize: '14px', color: taupe, lineHeight: 1.4 }}>{o.text}</p>
        </div>
      </div>
    </div>
  );
}
