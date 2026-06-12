'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

// The /medical-weight-loss-lp ad landing page is self-contained on the live
// site: it uses its own minimal header (logo / phone / Book Now) instead of
// the global nav, so the shared Header is suppressed there.
export default function GlobalHeader() {
  const pathname = usePathname();
  if (pathname === '/medical-weight-loss-lp') return null;
  return <Header />;
}
