'use client';

export type AnalyticsEventName =
  | 'book_consultation_click'
  | 'body_analysis_click'
  | 'phone_click'
  | 'whatsapp_click'
  | 'quiz_start'
  | 'quiz_complete'
  | 'guide_purchase_click'
  | 'guide_purchase_submit'
  | 'package_cta_click'
  | 'pricing_view'
  | 'faq_open'
  | 'blog_to_service_click'
  | 'treatment_page_view'
  | 'glp1_page_view';

type EventPayload = {
  page_path?: string;
  page_type?: string;
  service_slug?: string;
  cta_label?: string;
  section?: string;
  destination_url?: string;
  device_category?: 'mobile' | 'tablet' | 'desktop';
  value?: number;
  currency?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function deviceCategory(): EventPayload['device_category'] {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function cleanPayload(payload: EventPayload): EventPayload {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== '')
  ) as EventPayload;
}

// Maps internal event names to Meta standard events.
// Events that should fire fbq('track', ...) return the Meta event name.
// Events with no Meta equivalent return null (still tracked via dataLayer/GA4).
const META_EVENT_MAP: Partial<Record<AnalyticsEventName, string>> = {
  book_consultation_click: 'Lead',
  body_analysis_click: 'Lead',
  quiz_complete: 'Lead',
  quiz_start: 'ViewContent',
  guide_purchase_submit: 'Purchase',
  guide_purchase_click: 'InitiateCheckout',
  phone_click: 'Contact',
  whatsapp_click: 'Contact',
  package_cta_click: 'ViewContent',
  pricing_view: 'ViewContent',
  treatment_page_view: 'ViewContent',
  glp1_page_view: 'ViewContent',
};

export function trackEvent(event: AnalyticsEventName, payload: EventPayload = {}) {
  if (typeof window === 'undefined') return;

  const safePayload = cleanPayload({
    page_path: window.location.pathname,
    device_category: deviceCategory(),
    ...payload,
  });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...safePayload });

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, safePayload);
  }

  const metaEvent = META_EVENT_MAP[event];
  if (metaEvent && typeof window.fbq === 'function') {
    if (metaEvent === 'Purchase' && safePayload.value) {
      window.fbq('track', metaEvent, {
        value: safePayload.value,
        currency: safePayload.currency ?? 'EUR',
      });
    } else if (metaEvent === 'Lead') {
      // Always pass value for Lead events so Meta can optimise for lead quality.
      // Call sites can override by passing value/currency in the payload.
      window.fbq('track', metaEvent, {
        value: safePayload.value ?? 75,
        currency: safePayload.currency ?? 'EUR',
      });
    } else {
      window.fbq('track', metaEvent);
    }
  }
}
