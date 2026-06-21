'use client';

import { CONTACT, NAV } from '@/lib/redesign/content';

export default function PreviewFooter() {
  return (
    <footer className="cx-footer" style={{ position: 'relative', background: '#2f3d33', color: 'rgba(255,255,255,0.82)', paddingTop: 'clamp(48px,6vw,80px)', overflow: 'hidden' }}>
      {/* hairline sage accent at the very top edge */}
      <span aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--sage), var(--blue), transparent)', opacity: 0.7 }} />
      {/* soft ambient glow */}
      <span aria-hidden className="cx-glow" style={{ width: 480, height: 480, background: 'rgba(142,176,147,0.18)', top: -220, right: -160, opacity: 1 }} />

      <div className="cx-wrap" style={{ position: 'relative', zIndex: 1, display: 'grid', gap: 'clamp(28px,4vw,56px)', gridTemplateColumns: '1fr' }}>
        <div className="cx-foot-grid" style={{ display: 'grid', gap: 'clamp(28px,4vw,48px)' }}>
          {/* brand */}
          <div>
            <img src="/logo.png" alt="Carisma Slimming" style={{ height: 38, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.95, marginBottom: 16 }} />
            <p style={{ fontFamily: 'var(--body)', fontSize: 13.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: 300 }}>
              Doctor-led medical weight loss and slimming in Malta. Part of Carisma Wellness Group — 35+ years in wellness, aesthetics and slimming.
            </p>
          </div>

          {/* explore */}
          <div>
            <h4 style={{ fontFamily: 'var(--wide)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-soft)', marginBottom: 16 }}>Explore</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} style={{ fontFamily: 'var(--body)', fontSize: 13.5, color: 'rgba(255,255,255,0.78)', textDecoration: 'none' }} className="cx-link-underline cx-foot-link">{n.label}</a></li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--wide)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-soft)', marginBottom: 16 }}>Get in touch</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 11, fontFamily: 'var(--body)', fontSize: 13.5 }}>
              <li><a href={CONTACT.phoneHref} className="cx-foot-link" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>{CONTACT.phone}</a></li>
              <li><a href={`mailto:${CONTACT.email}`} className="cx-foot-link" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>{CONTACT.email}</a></li>
              <li style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{CONTACT.address}</li>
              <li style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="cx-foot-link" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none', fontSize: 12.5 }}>Instagram</a>
                <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" className="cx-foot-link" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none', fontSize: 12.5 }}>Facebook</a>
              </li>
            </ul>
          </div>
        </div>

        {/* medical disclaimer */}
        <p style={{ fontFamily: 'var(--body)', fontSize: 11.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', maxWidth: 880, borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 24 }}>
          Medical disclaimer: Weight-loss results vary between individuals and depend on a range of factors. &ldquo;Up to 1kg a week&rdquo; describes a possible outcome within a medically supervised program, not a guarantee. GLP-1 medications are prescription-only and are considered only where medically appropriate, following a full assessment. Always consult our medical team before starting any program.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: 32 }}>
        <div className="cx-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between', alignItems: 'center', paddingBlock: 20 }}>
          <span style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>© Carisma Slimming. All rights reserved.</span>
          <span style={{ display: 'flex', gap: 18 }}>
            <a href="https://www.carismaslimming.com/privacy-policy" className="cx-foot-link" style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="https://www.carismaslimming.com/terms-conditions" className="cx-foot-link" style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Terms &amp; Conditions</a>
          </span>
        </div>
      </div>

      <style>{`
        .cx-foot-link { transition: color .3s var(--ease); }
        .cx-foot-link:hover { color: #fff !important; }
        @media (min-width: 760px){ .cx-foot-grid{ grid-template-columns: 1.4fr 1fr 1.2fr; } }
      `}</style>
    </footer>
  );
}
