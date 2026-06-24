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
}
