'use client';

import { useState } from 'react';

const wideFont = 'Novecento Wide Book, Novecento Wide, sans-serif';
const bodyFont = 'Roboto, sans-serif';
const green = '#8EB093';
const taupe = '#9B8D83';

export type Outcome = { title: string; text: string; icon: string };

export default function OutcomeStepper({ outcomes }: { outcomes: Outcome[] }) {
  const [active, setActive] = useState(0);
  const o = outcomes[active];
  return (
    <div className="mx-auto" style={{ maxWidth: '970px' }}>
      {/* STEP 1-4 tab bar */}
      <div className="grid grid-cols-4" style={{ borderBottom: '1px solid #D9D2CB' }}>
        {outcomes.map((it, i) => (
          <button
            key={it.title}
            type="button"
            onClick={() => setActive(i)}
            className="text-left uppercase"
            style={{
              fontFamily: wideFont,
              fontSize: '16px',
              fontWeight: 700,
              color: taupe,
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
        className="flex items-center mt-4"
        style={{
          background: 'linear-gradient(100deg, #C7D8C6 0%, #EFF3EC 45%, #F8F8F4 100%)',
          borderRadius: '8px',
          padding: '14px',
        }}
      >
        <div className="hidden sm:flex items-center justify-center" style={{ width: '210px', flexShrink: 0 }}>
          <img src={o.icon} alt={o.title} style={{ width: '145px', height: '145px', objectFit: 'contain' }} />
        </div>
        <div
          className="flex-1 bg-white"
          style={{ borderRadius: '10px', padding: '20px 26px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
        >
          <h3
            className="uppercase mb-2"
            style={{ fontFamily: wideFont, fontSize: '16px', fontWeight: 700, color: taupe, letterSpacing: '1px' }}
          >
            {o.title}
          </h3>
          <p style={{ fontFamily: bodyFont, fontSize: '13px', color: green, lineHeight: 1.6 }}>{o.text}</p>
        </div>
      </div>
    </div>
  );
}
