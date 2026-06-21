'use client';

import { useEffect, useRef, useState } from 'react';

export const CONSULT_MODAL_EVENT = 'openConsultationModal';

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  // The element focus should return to when the dialog closes (the trigger).
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const open = () => {
      // Remember who opened it so focus can be restored on close.
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
      setHasOpened(true);
    };
    window.addEventListener(CONSULT_MODAL_EVENT, open);
    return () => window.removeEventListener(CONSULT_MODAL_EVENT, open);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus management (WCAG 2.4.3): move focus INTO the dialog on open, and
  // restore it to the trigger on close. NOTE: the form itself is a cross-origin
  // GHL iframe — once focus enters it, keydown no longer bubbles to us, so a Tab
  // trap can only manage our own focusables (the Close button + the iframe
  // boundary); we wrap between them. `aria-modal` keeps AT out of the background.
  useEffect(() => {
    if (isOpen) {
      // Focus the Close button after paint.
      const id = window.requestAnimationFrame(() => closeBtnRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
    // Closed: return focus to whoever opened it.
    restoreFocusRef.current?.focus?.();
  }, [isOpen]);

  // Tab trap across the dialog's own focusable boundary (Close button <-> iframe).
  const onTrapKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!isOpen && !hasOpened) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book your free slimming consultation"
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
        className="relative z-10 w-full overflow-hidden"
        style={{ maxWidth: '520px', borderRadius: '20px', boxShadow: '0 32px 80px rgba(0,0,0,0.28)', background: '#fff' }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: 'linear-gradient(135deg,#4f7256,#3a5a40)' }}
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
            Book Your Free Consultation
          </p>
          <button
            ref={closeBtnRef}
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="focus-on-dark"
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '4px',
              opacity: 0.85,
              transition: 'opacity 0.2s',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div style={{ overflowY: 'auto', maxHeight: '80vh' }}>
          {hasOpened && (
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/Z3VHJCJwj5mBGmqcdmpE"
              style={{ width: '100%', height: '640px', border: 'none', display: 'block' }}
              id="modal-consult-Z3VHJCJwj5mBGmqcdmpE"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-activation-type="alwaysActivated"
              data-deactivation-type="neverDeactivate"
              data-form-name="WEB FORM"
              data-height="627"
              data-form-id="Z3VHJCJwj5mBGmqcdmpE"
              title="Book Free Slimming Consultation"
            />
          )}
        </div>
      </div>
    </div>
  );
}
