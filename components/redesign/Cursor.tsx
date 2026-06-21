'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './motion';

/**
 * Refined custom cursor: a crisp sage dot that tracks the pointer 1:1 and a
 * soft trailing ring that eases behind it and grows when hovering interactive
 * elements (a, button, [role="button"], input, label).
 *
 * Fine-pointer ONLY — never mounts on touch / coarse-pointer devices, so the
 * native cursor is left untouched there. Skipped entirely under reduced motion.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (typeof window === 'undefined' || !window.matchMedia) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        document.documentElement.classList.add('cx-cursor-on');
      }
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest('a, button, [role="button"], input, textarea, select, label, .cx-faq-q');

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) ring.classList.add('cx-ring-grow');
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) ring.classList.remove('cx-ring-grow');
    };
    const onDown = () => ring.classList.add('cx-ring-press');
    const onUp = () => ring.classList.remove('cx-ring-press');
    const onLeave = () => {
      visible = false;
      document.documentElement.classList.remove('cx-cursor-on');
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseout', onOut, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('cx-cursor-on');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cx-cursor-ring" aria-hidden />
      <div ref={dotRef} className="cx-cursor-dot" aria-hidden />
    </>
  );
}
