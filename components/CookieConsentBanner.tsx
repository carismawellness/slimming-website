'use client';

import { useEffect } from 'react';

const IDLE_DELAY_MS = 12000;

function appendScript(src: string, id?: string) {
  if (id && document.getElementById(id)) return;
  const script = document.createElement('script');
  if (id) script.id = id;
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

function appendInlineScript(id: string, code: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.text = code;
  document.head.appendChild(script);
}

function loadThirdPartyScripts() {
  appendInlineScript(
    'gtm-delayed',
    `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KL52M3K8');`
  );

  appendScript('https://www.googletagmanager.com/gtag/js?id=GT-KTRJV39', 'gtag-src-delayed');
  appendInlineScript(
    'gtag-init-delayed',
    `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GT-KTRJV39');`
  );

  appendInlineScript(
    'fb-pixel-delayed',
    `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '870116459351116');
fbq('track', 'PageView');`
  );

  appendScript(
    'https://salesiq.zohopublic.eu/widget?wc=siq9f3a259f321f0f12b1b68e4cb6d4636aaa425ff37957236d85284d162680b684',
    'zsiqscript'
  );
  appendScript('https://static.klaviyo.com/onsite/js/X5Mz6K/klaviyo.js?company_id=X5Mz6K', 'klaviyo-onsite');
  appendScript('https://link.msgsndr.com/js/form_embed.js', 'msgsndr-form-embed');
}

/**
 * Cookies are auto-accepted, but third-party scripts wait until the first real
 * user interaction or a long idle delay so they do not compete with mobile LCP.
 */
export default function CookieConsentBanner() {
  useEffect(() => {
    try {
      localStorage.setItem('carisma_cookie_consent', 'accepted');
    } catch {
      /* ignore storage errors (private mode etc.) */
    }
    document.documentElement.style.setProperty('--cookie-banner-h', '0px');

    let loaded = false;
    const loadOnce = () => {
      if (loaded) return;
      loaded = true;
      window.clearTimeout(timer);
      events.forEach((eventName) => window.removeEventListener(eventName, loadOnce));
      loadThirdPartyScripts();
    };
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
    const timer = window.setTimeout(loadOnce, IDLE_DELAY_MS);
    events.forEach((eventName) => window.addEventListener(eventName, loadOnce, { passive: true, once: true }));

    return () => {
      window.clearTimeout(timer);
      events.forEach((eventName) => window.removeEventListener(eventName, loadOnce));
    };
  }, []);

  return null;
}
