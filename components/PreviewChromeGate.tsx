'use client';

import { usePathname } from 'next/navigation';
import GlobalHeader from './GlobalHeader';
import GlobalBottom from './GlobalBottom';
import CookieConsentBanner from './CookieConsentBanner';

// The /preview redesign is a self-contained landing experience with its own
// header, footer and CTAs — so the shared site chrome is suppressed there.
const isPreview = (p: string | null) => !!p && p.startsWith('/preview');

export function SiteHeader() {
  return isPreview(usePathname()) ? null : <GlobalHeader />;
}
export function SiteFooter() {
  return isPreview(usePathname()) ? null : <GlobalBottom />;
}
export function SiteCookieBanner() {
  return isPreview(usePathname()) ? null : <CookieConsentBanner />;
}
