'use client';

import { PRESS, STATS } from '@/lib/redesign/content';
import { useCountUp } from './motion';
import Reveal from './Reveal';

function Stat({ value, decimals = 0, prefix = '', suffix = '', label }: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }) {
  const { ref, display } = useCountUp(value, decimals);
  return (
    <div className="cx-stat" style={{ textAlign: 'center', padding: 'clamp(8px,1.5vw,18px) 12px', position: 'relative' }}>
      <div
        className="cx-display"
        style={{ fontSize: 'clamp(38px, 5.4vw, 58px)', color: 'var(--sage-ink)', lineHeight: 1, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}
      >
        {prefix && (
          <span style={{ fontFamily: 'var(--wide)', fontSize: '0.3em', color: 'var(--taupe-lt)', letterSpacing: '0.06em', verticalAlign: 'middle', marginRight: 6, textTransform: 'uppercase', fontWeight: 700 }}>
            {prefix}
          </span>
        )}
        <span ref={ref}>{display}</span>
        <span style={{ color: 'var(--sage)' }}>{suffix}</span>
      </div>
      <span aria-hidden style={{ display: 'block', width: 26, height: 1, margin: '14px auto 0', background: 'linear-gradient(90deg, transparent, var(--sage-soft), transparent)' }} />
      <p style={{ fontFamily: 'var(--body)', fontSize: 12.5, color: 'var(--taupe)', marginTop: 12, lineHeight: 1.5, maxWidth: 184, marginInline: 'auto' }}>{label}</p>
    </div>
  );
}

export default function Proof() {
  const row = [...PRESS, ...PRESS];
  return (
    <section className="cx-section" style={{ paddingTop: 'clamp(44px,6vw,80px)', paddingBottom: 'clamp(44px,6vw,80px)', background: 'var(--white)' }}>
      {/* press marquee */}
      <p className="cx-eyebrow" style={{ textAlign: 'center', marginBottom: 24 }}>As seen on</p>
      <div style={{ position: 'relative', overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)' }}>
        <div className="cx-marquee-track cx-press-track" style={{ gap: 0, alignItems: 'center' }}>
          {row.map((p, i) => (
            <span key={p.label + i} className="cx-press-cell" style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
              <img
                src={p.src}
                alt={`${p.label} — Carisma Slimming featured`}
                className="cx-press-logo"
                style={{ height: 30, width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* stat counters */}
      <Reveal
        stagger
        className="cx-wrap cx-stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(8px,2vw,20px)',
          marginTop: 'clamp(44px,5vw,72px)',
          borderRadius: 26,
          border: '1px solid var(--line)',
          background: 'linear-gradient(170deg, #fff 0%, var(--sage-mist) 130%)',
          boxShadow: 'var(--shadow-soft)',
          paddingBlock: 'clamp(22px,3vw,34px)',
        }}
      >
        {STATS.map((s) => (
          <Stat key={s.label} value={s.value} decimals={('decimals' in s ? (s.decimals as number) : 0)} prefix={'prefix' in s ? (s.prefix as string) : ''} suffix={s.suffix} label={s.label} />
        ))}
      </Reveal>

      <style>{`
        .cx-press-cell { padding-inline: 28px; position: relative; }
        .cx-press-cell::after { content: ""; position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 1px; height: 26px; background: var(--line); }
        .cx-press-logo { opacity: 0.55; filter: grayscale(1); transition: opacity .4s var(--ease), filter .4s var(--ease); }
        .cx-press-cell:hover .cx-press-logo { opacity: 0.9; filter: grayscale(0); }

        /* vertical dividers between stat cells */
        .cx-stat { position: relative; }
        .cx-stat::after { content: ""; position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 1px; height: 56%; background: var(--line); }
        .cx-stats-grid > .cx-stat:nth-child(2n)::after { display: none; }

        @media (min-width: 760px){
          .cx-stats-grid{ grid-template-columns: repeat(4, 1fr) !important; }
          .cx-stats-grid > .cx-stat:nth-child(2n)::after { display: block; }
          .cx-stats-grid > .cx-stat:nth-child(4n)::after { display: none; }
        }
      `}</style>
    </section>
  );
}
