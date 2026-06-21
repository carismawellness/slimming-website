'use client';

import { useRef, type ReactNode } from 'react';
import { BOOKING_URL } from '@/lib/redesign/content';
import { prefersReducedMotion } from './motion';

function Arrow() {
  return (
    <svg className="cx-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'blue' | 'ghost';
  magnetic?: boolean;
  arrow?: boolean;
  className?: string;
  ariaLabel?: string;
};

/** Primary conversion button. Magnetic hover on fine pointers; reduced-motion safe. */
export default function Cta({
  children,
  href = BOOKING_URL,
  variant = 'primary',
  magnetic = true,
  arrow = true,
  className = '',
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const external = href.startsWith('http');

  const onMove = (e: React.MouseEvent) => {
    if (!magnetic || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.1;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.14;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      className={`cx-btn cx-btn-${variant} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="cx-btn-label">
        {children}
        {arrow && <Arrow />}
      </span>
    </a>
  );
}
