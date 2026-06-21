'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * Cookies are AUTO-ACCEPTED — there is no consent banner. The analytics + pixel
 * scripts load on every visit.
 *
 * NOTE: auto-consent without an explicit prompt is a GDPR / ePrivacy
 * consideration in the EU/Malta. This is intentional per the site owner's
 * decision; revert to a consent banner if compliance requirements change.
 */
export default function CookieConsentBanner() {
  useEffect(() => {
    // Persist accepted state for any code that reads it, and keep the mobile
    // sticky CTA flush to the bottom (no banner height to clear).
    try {
      localStorage.setItem('carisma_cookie_consent', 'accepted');
    } catch {
      /* ignore storage errors (private mode etc.) */
    }
    document.documentElement.style.setProperty('--cookie-banner-h', '0px');
  }, []);

  return (
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
  );
}
