'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const COMMERCIAL_PATHS = new Set([
  '/',
  '/weight-loss',
  '/glp1',
  '/consultation',
  '/packages',
  '/packages/fat-freezing',
  '/packages/fat-dissolving',
  '/packages/muscle-stimulation',
  '/packages/skin-tightening',
  '/packages/lipocavitation',
  '/packages/anti-cellulite',
  '/packages/lymphatic-drainage',
  '/slimming-guide',
]);

function pageTypeFor(pathname: string): string {
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname.startsWith('/packages/')) return 'package';
  if (pathname === '/glp1') return 'glp1';
  if (pathname === '/weight-loss') return 'weight_loss';
  return pathname === '/' ? 'home' : pathname.replace(/^\/+/, '') || 'page';
}

export default function AnalyticsClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const label = anchor.textContent?.replace(/\s+/g, ' ').trim() || anchor.getAttribute('aria-label') || 'link';

      if (href.startsWith('tel:')) {
        trackEvent('phone_click', {
          page_type: pageTypeFor(window.location.pathname),
          cta_label: label,
          section: 'global_link',
          destination_url: href,
        });
        return;
      }

      if (/wa\.me|whatsapp\.com/i.test(href)) {
        trackEvent('whatsapp_click', {
          page_type: pageTypeFor(window.location.pathname),
          cta_label: label,
          section: 'global_link',
          destination_url: href,
        });
        return;
      }

      if (window.location.pathname.startsWith('/blog')) {
        try {
          const destination = new URL(href, window.location.origin);
          if (destination.origin === window.location.origin && COMMERCIAL_PATHS.has(destination.pathname)) {
            trackEvent('blog_to_service_click', {
              page_type: 'blog',
              cta_label: label,
              section: 'blog_link',
              destination_url: destination.pathname,
            });
          }
        } catch {
          // Ignore malformed or non-browser URLs.
        }
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
