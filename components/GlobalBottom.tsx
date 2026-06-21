'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

// /medical-weight-loss-lp is self-contained — suppress the shared footer there.
export default function GlobalBottom() {
  const pathname = usePathname();
  if (pathname === '/medical-weight-loss-lp') return null;
  return <Footer />;
}
