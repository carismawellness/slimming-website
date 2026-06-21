'use client';

import { useEffect, useRef, useState } from 'react';
import SlimmingQuiz from './quiz/SlimmingQuiz';

export const QUIZ_MODAL_EVENT = 'openQuizModal';

/**
 * Popup modal that hosts the NATIVE, on-brand personalised weight-loss quiz
 * (components/quiz/SlimmingQuiz). On completion the quiz navigates to
 * /quiz-results and closes this modal.
 *
 * Opens via:
 *  - a custom `openQuizModal` window event, OR
 *  - a click on any "Take the quiz" CTA, i.e. an <a href="#quiz"> (e.g. the
 *    PageHero secondary CTA). We intercept that click in the capture phase so
 *    the link opens this modal instead of scrolling.
 *
 * Mirrors ConsultationModal: dialog semantics, ESC + backdrop close, focus moved
 * into the dialog on open and restored to the trigger on close, Tab trap across
 * the dialog's own focusable elements.
 */
export default function QuizModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const open = (trigger?: HTMLElement | null) => {
      restoreFocusRef.current = trigger ?? (document.activeElement as HTMLElement | null);
      setIsOpen(true);
      setHasOpened(true);
    };
    const onEvent = () => open();
    const onClick = (e: MouseEvent) => {
      // ignore modified clicks (new tab etc.)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement)?.closest?.('a[href="#quiz"]') as HTMLElement | null;
      if (!a) return;
      e.preventDefault();
      e.stopPropagation();
      open(a);
    };
    window.addEventListener(QUIZ_MODAL_EVENT, onEvent);
    // Capture phase so we beat Next.js Link's own click handler.
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener(QUIZ_MODAL_EVENT, onEvent);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Move focus into the dialog on open; restore to the trigger on close.
  useEffect(() => {
    if (isOpen) {
      const id = window.requestAnimationFrame(() => closeBtnRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
    restoreFocusRef.current?.focus?.();
  }, [isOpen]);

  const onTrapKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  };

  if (!isOpen && !hasOpened) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Find your personalised weight loss programme — quiz"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ display: isOpen ? 'flex' : 'none' }}
      onKeyDown={onTrapKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full"
        style={{ maxWidth: '600px', borderRadius: '22px', boxShadow: '0 32px 80px rgba(0,0,0,0.28)', background: '#fff' }}
      >
        {/* Brand eyebrow + close (slim, replaces the heavy green header bar) */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '16px 22px 0' }}
        >
          <p
            style={{
              color: '#4f7256',
              fontFamily: "'Novecento Wide Book', 'Novecento Wide', sans-serif",
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Carisma Slimming · Your Plan
          </p>
          <button
            ref={closeBtnRef}
            onClick={() => setIsOpen(false)}
            aria-label="Close quiz"
            style={{
              background: '#F0F4EE',
              border: 'none',
              color: '#4f7256',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Native quiz */}
        {hasOpened && <SlimmingQuiz onClose={() => setIsOpen(false)} />}
      </div>
    </div>
  );
}
