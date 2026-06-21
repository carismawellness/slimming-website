'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Link from 'next/link';

type ConsentState = 'accepted' | 'declined' | null;

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('carisma_cookie_consent');
    if (stored === 'accepted') {
      setConsent('accepted');
      setVisible(false);
    } else if (stored === 'declined') {
      setConsent('declined');
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  // Publish the banner's REAL rendered height to `--cookie-banner-h` so the
  // mobile sticky CTA can sit exactly above it (it reads var(--cookie-banner-h)).
  // 0px whenever the banner isn't showing. Reactive to wrap/resize.
  useEffect(() => {
    const root = document.documentElement;
    if (!visible) {
      root.style.setProperty('--cookie-banner-h', '0px');
      return;
    }
    const el = bannerRef.current;
    if (!el) return;
    const measure = () =>
      root.style.setProperty('--cookie-banner-h', `${el.offsetHeight}px`);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      root.style.setProperty('--cookie-banner-h', '0px');
    };
  }, [visible]);

  function handleAccept() {
    localStorage.setItem('carisma_cookie_consent', 'accepted');
    setConsent('accepted');
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem('carisma_cookie_consent', 'declined');
    setConsent('declined');
    setVisible(false);
  }

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=GT-KTRJV39"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GT-KTRJV39');
          `}</Script>
          <Script id="fb-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '870116459351116');
            fbq('track', 'PageView');
          `}</Script>
          <Script
            src="https://salesiq.zohopublic.eu/widget?wc=siq9f3a259f321f0f12b1b68e4cb6d4636aaa425ff37957236d85284d162680b684"
            strategy="lazyOnload"
            id="zsiqscript"
          />
        </>
      )}

      {visible && (
        <div
          ref={bannerRef}
          id="cookie-consent-banner"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            background: '#1a1a1a',
            borderTop: '2px solid #8EB093',
            padding: '20px 24px',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <p
              style={{
                color: '#fff',
                fontFamily: 'Roboto, sans-serif',
                fontSize: '13px',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              We use cookies to enhance your experience and analyse site traffic. By clicking
              &ldquo;Accept&rdquo;, you consent to our use of analytics and personalisation cookies.
              View our{' '}
              <Link
                href="/privacy-policy"
                style={{ color: '#8EB093', textDecoration: 'underline' }}
              >
                Privacy Policy
              </Link>
              .
            </p>

            <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
              <button
                onClick={handleDecline}
                className="btn"
                style={{
                  background: 'transparent',
                  border: '1px solid #B7ABA0',
                  /* Lightened taupe on #1a1a1a = 7.4:1 AA (was #9B8D83 -> 5.4:1, kept accessible) */
                  color: '#B7ABA0',
                  padding: '10px 22px',
                  fontSize: '12px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '999px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="btn focus-on-dark"
                style={{
                  /* Accessible deep sage: #fff text = 5.42:1 AA (was #8EB093 -> 2.39:1 FAIL) */
                  background: '#4F7256',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 22px',
                  fontSize: '12px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '999px',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
