'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export const CONSULT_MODAL_EVENT = 'openConsultationModal';

// Where the lead is sent AFTER the GHL form captures their details:
// the Fresha "free body composition analysis" booking flow (glp1 variant).
const FRESHA_URL =
  'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5084222&oiid=sv%3A26105577&share=true&pId=2708191';

type Step = 'form' | 'booking';

function pageTypeFor(pathname: string): string {
  if (pathname.startsWith('/packages/')) return 'package';
  if (pathname === '/packages') return 'packages';
  if (pathname === '/glp1') return 'glp1';
  if (pathname === '/weight-loss') return 'weight_loss';
  return pathname === '/' ? 'home' : 'page';
}

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const bookingCtaRef = useRef<HTMLAnchorElement>(null);
  // The element focus should return to when the dialog closes (the trigger).
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const open = () => {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setStep('form'); // always start at the form on (re)open
      setIsOpen(true);
      setHasOpened(true);
    };
    window.addEventListener(CONSULT_MODAL_EVENT, open);
    return () => window.removeEventListener(CONSULT_MODAL_EVENT, open);
  }, []);

  // Intercept every consultation/booking CTA site-wide — open the lead capture modal instead.
  // Catches: fresha.com/book-now links AND any href="/consultation" (Next.js Link or plain <a>).
  useEffect(() => {
    const onBookingClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a');
      if (!anchor) return;
      // Opt-out: links that open in a new tab or carry data-direct-booking go
      // straight through (e.g. the Fresha "choose your time" CTA on /thank-you,
      // which must book directly and NOT reopen the lead-capture modal).
      if ((anchor as HTMLAnchorElement).target === '_blank' || anchor.hasAttribute('data-direct-booking')) return;
      const href = anchor.getAttribute('href') || '';
      const isBookingLink =
        href.includes('fresha.com/book-now') ||
        href === '/consultation' ||
        href.startsWith('/consultation?') ||
        href.startsWith('/consultation#');
      if (isBookingLink) {
        e.preventDefault();
        const label = anchor.textContent?.replace(/\s+/g, ' ').trim() || 'Book consultation';
        const pathname = window.location.pathname;
        const eventName = pathname.startsWith('/packages/') || pathname === '/packages'
          ? 'package_cta_click'
          : label.toLowerCase().includes('body analysis')
            ? 'body_analysis_click'
            : 'book_consultation_click';
        trackEvent(eventName, {
          page_type: pageTypeFor(pathname),
          service_slug: pathname.startsWith('/packages/') ? pathname.split('/').pop() : undefined,
          cta_label: label,
          section: 'booking_link',
          destination_url: href,
        });
        restoreFocusRef.current = anchor;
        setStep('form');
        setIsOpen(true);
        setHasOpened(true);
      }
    };
    document.addEventListener('click', onBookingClick, true);
    return () => document.removeEventListener('click', onBookingClick, true);
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

  // Auto-advance to the booking step when the GHL form posts a submit/success
  // signal. GHL's exact message shape varies, so we match conservatively on the
  // leadconnector origin + a submit-like keyword (resize messages won't match).
  // The visible "Continue to booking" link below is the guaranteed fallback.
  useEffect(() => {
    if (!isOpen) return;
    const onMsg = (e: MessageEvent) => {
      if (typeof e.origin !== 'string' || !e.origin.includes('leadconnectorhq')) return;
      const d = e.data;
      const sig = typeof d === 'string' ? d : (d && (d.type || d.event || d.eventName || d.action)) || '';
      if (/submit|success|complete|thank|confirmed/i.test(String(sig))) {
        trackEvent('book_consultation_click', {
          page_type: pageTypeFor(window.location.pathname),
          cta_label: 'Lead form submitted',
          section: 'consultation_modal',
          destination_url: '/thank-you',
        });
        // Send the visitor to the real /thank-you page: the page-level GTM
        // pageview trigger fires the Google Ads conversion (gclid cookie is
        // first-party on this domain), and the Fresha "choose your time"
        // booking CTA now lives on /thank-you so the booking step isn't lost.
        window.location.assign('/thank-you');
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [isOpen]);

  // Focus management (WCAG 2.4.3): move focus into the dialog on open / step
  // change, restore to the trigger on close.
  useEffect(() => {
    if (isOpen) {
      const id = window.requestAnimationFrame(() => {
        if (step === 'booking') bookingCtaRef.current?.focus();
        else closeBtnRef.current?.focus();
      });
      return () => window.cancelAnimationFrame(id);
    }
    restoreFocusRef.current?.focus?.();
  }, [isOpen, step]);

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
      aria-label="Book your free body composition analysis"
      className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4"
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

      {/* Panel — scrollable so form is never clipped */}
      <div
        ref={panelRef}
        className="relative z-10 w-full flex flex-col"
        style={{
          maxWidth: '520px',
          borderRadius: '20px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
          background: '#fff',
          maxHeight: 'calc(100dvh - 32px)',
          overflowY: 'auto',
        }}
      >
        {/* Header bar — sticky so it stays visible while scrolling */}
        <div
          className="flex items-center justify-between px-6 py-3 shrink-0"
          style={{ background: 'linear-gradient(135deg,#4f7256,#3a5a40)', position: 'sticky', top: 0, zIndex: 10 }}
        >
          <p
            style={{
              color: '#fff',
              fontFamily: "'Novecento Wide Book', 'Novecento Wide', sans-serif",
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {step === 'form' ? 'Free Body Composition Analysis' : 'Choose Your Time'}
          </p>
          <button
            ref={closeBtnRef}
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="focus-on-dark"
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', opacity: 0.85, display: 'flex', alignItems: 'center' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* STEP 1 — GHL contact form; tall enough so the submit button is never clipped */}
        {step === 'form' && (
          <div style={{ flex: 1 }}>
            {hasOpened && (
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/Z3VHJCJwj5mBGmqcdmpE"
                style={{ width: '100%', border: 'none', display: 'block', minHeight: '660px', height: '660px' }}
                id="modal-consult-Z3VHJCJwj5mBGmqcdmpE"
                data-layout="{'id':'INLINE'}"
                data-form-id="Z3VHJCJwj5mBGmqcdmpE"
                title="Free Body Composition Analysis — your details"
              />
            )}
          </div>
        )}

        {/* STEP 2 — Fresha booking handoff (Fresha can't be iframed → redirect button) */}
        {step === 'booking' && (
          <div className="px-7 py-9 text-center">
            <div
              aria-hidden="true"
              className="mx-auto mb-5 flex items-center justify-center"
              style={{ width: 56, height: 56, borderRadius: '999px', background: 'rgba(79,114,86,0.12)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f7256" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Trajan Pro', serif", fontWeight: 400, fontSize: '22px', color: '#4f7256', textTransform: 'uppercase', marginBottom: 10 }}>
              One last step
            </h3>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: 1.6, color: '#6f6456', marginBottom: 24 }}>
              Thanks — your details are in. Now choose a time for your <strong>free body composition analysis</strong>. It only takes a moment.
            </p>
            <a
              ref={bookingCtaRef}
              href={FRESHA_URL}
              className="cta-glow inline-flex items-center justify-center font-bold text-white"
              style={{
                fontFamily: "'Novecento Wide Book', 'Novecento Wide', sans-serif",
                fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase',
                padding: '16px 40px', border: 'none', textDecoration: 'none',
              }}
            >
              Choose Your Time →
            </a>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: '#6f6456', opacity: 0.7, marginTop: 16 }}>
              Limited places each month
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
