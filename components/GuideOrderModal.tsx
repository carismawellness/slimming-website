'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export const GUIDE_MODAL_EVENT = 'openGuideOrderModal';

// Any "Get / Buy / Order the Guide" CTA points at this Wix product page; we
// intercept clicks on it sitewide and open the lead-capture modal instead.
const GUIDE_HREF_MATCH = 'product-page/the-carisma-slimming-weight-loss-guide';

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function GuideOrderModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const open = (trigger?: HTMLElement | null) => {
    restoreFocusRef.current = trigger ?? (document.activeElement as HTMLElement | null);
    setStatus('idle');
    setError('');
    setIsOpen(true);
    setHasOpened(true);
  };

  useEffect(() => {
    const onEvent = () => open(null);
    window.addEventListener(GUIDE_MODAL_EVENT, onEvent);
    return () => window.removeEventListener(GUIDE_MODAL_EVENT, onEvent);
  }, []);

  // Intercept guide-order CTAs sitewide and track the interaction.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element)?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (href.includes(GUIDE_HREF_MATCH)) {
        e.preventDefault();
        trackEvent('guide_purchase_click', {
          page_type: 'slimming_guide',
          cta_label: anchor.textContent?.replace(/\s+/g, ' ').trim() || 'Get the guide',
          section: 'guide_cta',
          destination_url: href,
        });
        open(anchor as HTMLElement);
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
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

  useEffect(() => {
    if (isOpen) {
      const id = window.requestAnimationFrame(() => firstFieldRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
    restoreFocusRef.current?.focus?.();
  }, [isOpen]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '',
    };
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/order-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      if (res.ok && json.ok) {
        setStatus('done');
        trackEvent('guide_purchase_submit', {
          page_type: 'slimming_guide',
          cta_label: 'Guide order form submitted',
          section: 'guide_modal',
          value: 30,
          currency: 'EUR',
        });
      } else {
        setStatus('error');
        setError(json.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Network error. Please try again or call us on +356 27802062.');
    }
  };

  if (!isOpen && !hasOpened) return null;

  const label: React.CSSProperties = { display: 'block', fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#5f5649', marginBottom: 6, letterSpacing: 0.3 };
  const input: React.CSSProperties = { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #d9d2c7', fontFamily: 'Roboto, sans-serif', fontSize: 15, color: '#333', outlineColor: '#4f7256' };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order the Carisma Slimming Guide"
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4"
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={() => setIsOpen(false)} aria-hidden="true" />

      <div ref={panelRef} className="relative z-10 w-full overflow-hidden" style={{ maxWidth: 480, borderRadius: 20, boxShadow: '0 32px 80px rgba(0,0,0,0.28)', background: '#fff', maxHeight: 'calc(100dvh - 24px)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ background: 'linear-gradient(135deg,#4f7256,#3a5a40)' }}>
          <p style={{ color: '#fff', fontFamily: "'Novecento Wide Book','Novecento Wide',sans-serif", fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>
            {status === 'done' ? 'Request received' : 'Get the Slimming Guide'}
          </p>
          <button onClick={() => setIsOpen(false)} aria-label="Close" className="focus-on-dark" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4, opacity: 0.85, display: 'flex' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div style={{ overflowY: 'auto', padding: '24px 28px 28px' }}>
          {status === 'done' ? (
            <div className="text-center" style={{ padding: '12px 0 8px' }}>
              <div aria-hidden="true" className="mx-auto mb-4 flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 999, background: 'rgba(79,114,86,0.12)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4f7256" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </div>
              <h3 style={{ fontFamily: "'Trajan Pro',serif", fontWeight: 400, fontSize: 20, color: '#4f7256', textTransform: 'uppercase', margin: '0 0 8px' }}>Thank you</h3>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 15, lineHeight: 1.6, color: '#5f5649', margin: 0 }}>
                Your request is in. Our team will contact you shortly to arrange your copy of the Carisma Slimming Guide (€30).
              </p>
            </div>
          ) : (
            <>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontSize: 14, lineHeight: 1.6, color: '#5f5649', margin: '0 0 18px' }}>
                Leave your details and our team will be in touch to get your guide to you (€30).
              </p>
              <form onSubmit={onSubmit} noValidate>
                <div style={{ marginBottom: 14 }}>
                  <label htmlFor="go-name" style={label}>Full name</label>
                  <input ref={firstFieldRef} id="go-name" name="name" type="text" autoComplete="name" required style={input} placeholder="Your name" />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label htmlFor="go-email" style={label}>Email</label>
                  <input id="go-email" name="email" type="email" autoComplete="email" required style={input} placeholder="your@email.com" />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label htmlFor="go-phone" style={label}>Phone</label>
                  <input id="go-phone" name="phone" type="tel" autoComplete="tel" required style={input} placeholder="+356 …" />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label htmlFor="go-msg" style={label}>Anything we should know? (optional)</label>
                  <textarea id="go-msg" name="message" rows={2} style={{ ...input, resize: 'vertical' }} />
                </div>
                {status === 'error' && (
                  <p role="alert" style={{ fontFamily: 'Roboto, sans-serif', fontSize: 13, color: '#b3261e', margin: '0 0 12px' }}>{error}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="cta-glow w-full text-center text-white"
                  style={{ fontFamily: "'Novecento Wide Book','Novecento Wide',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', padding: '15px', border: 'none', borderRadius: 999, cursor: status === 'sending' ? 'wait' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? 'Sending…' : 'Request My Guide'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
