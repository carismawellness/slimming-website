'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/**
 * Reveal — a tiny scroll-reveal island. Adds the `is-revealed` class when the
 * element first scrolls into view, letting CSS fade/rise it in. Fully
 * prefers-reduced-motion safe: the hidden start state only applies once JS has
 * "armed" the element (via `data-armed`), so SSR / no-JS renders stay visible,
 * and under `prefers-reduced-motion: reduce` it reveals immediately with no
 * transform (the observer is skipped and the CSS disables the motion).
 */
export default function Reveal({
  children,
  className = '',
  style,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  // `armed` = JS has mounted, so it's safe for CSS to apply the hidden start state
  // (no-JS / SSR renders are never armed, so content is always visible there).
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: reveal immediately, skip the observer & hidden state.
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setRevealed(true);
      return;
    }

    setArmed(true);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mergedStyle = {
    ...style,
    '--reveal-delay': `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-armed={armed && !revealed ? '' : undefined}
      className={`reveal${revealed ? ' is-revealed' : ''}${className ? ` ${className}` : ''}`}
      style={mergedStyle}
    >
      {children}
    </div>
  );
}
