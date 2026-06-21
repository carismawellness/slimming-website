'use client';

import { useEffect, useState } from 'react';
import { BOOKING_URL, CONTACT } from '@/lib/redesign/content';

/** Mobile-only sticky conversion bar — appears after the hero scrolls away. */
export default function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`cx-sticky-cta cx-sticky-mobile ${show ? 'show' : ''}`}
      role="region"
      aria-label="Quick booking bar"
      style={{ display: 'none' }}
    >
      <div className="cx-glass" style={{ borderRadius: 16, padding: 8, display: 'flex', gap: 8, alignItems: 'center', boxShadow: 'var(--shadow-float)' }}>
        <a
          href={CONTACT.phoneHref}
          aria-label={`Call us at ${CONTACT.phone}`}
          style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 12, background: 'rgba(95,126,102,0.12)', display: 'grid', placeItems: 'center', color: '#4f7256' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cx-btn cx-btn-primary"
          aria-label="Book a free consultation (opens in new tab)"
          style={{ flex: 1, padding: '15px 18px', minHeight: 48 }}
        >
          <span className="cx-btn-label">Book free consultation</span>
        </a>
      </div>
      <style>{`
        @media (max-width: 760px){ .cx-sticky-mobile{ display: block !important; } }
        .cx-sticky-cta a:focus-visible {
          outline: 2px solid #4f7256;
          outline-offset: 2px;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}
