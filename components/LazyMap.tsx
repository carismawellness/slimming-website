'use client';

import { useEffect, useRef, useState } from 'react';

/* ──────────────────────────────────────────────────────────────────────────
   LazyMap — a facade for the Google Maps embed.

   The Maps embed pulls ~310 KB of third-party JS and paints tiles, which on
   mobile inflated Speed Index. This renders a lightweight branded placeholder
   first and only mounts the real <iframe> when the section scrolls within
   ~400px of the viewport. Lighthouse never scrolls, so the map stays out of the
   initial-load audit entirely; real users still get the live, interactive map
   the moment they scroll toward it (or tap the placeholder).
   ────────────────────────────────────────────────────────────────────────── */

const SHARED_BOX: React.CSSProperties = {
  flex: 1,
  minHeight: '480px',
  borderRadius: '20px',
  display: 'block',
  width: '100%',
};

export default function LazyMap({
  src,
  title,
  ariaLabel,
}: {
  src: string;
  title: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  if (show) {
    return (
      <iframe
        title={title}
        aria-label={ariaLabel}
        src={src}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ ...SHARED_BOX, border: 0 }}
      />
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setShow(true)}
      aria-label={ariaLabel}
      style={{
        ...SHARED_BOX,
        position: 'relative',
        cursor: 'pointer',
        border: 0,
        padding: 0,
        overflow: 'hidden',
        background: 'linear-gradient(150deg, #E9F0E9 0%, #f3f7f1 55%, #ffffff 100%)',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          color: '#4f7256',
          fontFamily: 'sans-serif',
        }}
      >
        <span style={{ display: 'grid', justifyItems: 'center', gap: '8px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4f7256" strokeWidth="1.6" aria-hidden>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span style={{ fontSize: '14px', letterSpacing: '0.04em' }}>
            St Julian's, Malta
          </span>
          <span style={{ fontSize: '12px', opacity: 0.7 }}>Tap to load map</span>
        </span>
      </span>
    </button>
  );
}
