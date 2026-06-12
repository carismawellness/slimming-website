'use client';

import { usePathname } from 'next/navigation';
import BrandBlock from '@/components/BrandBlock';
import Footer from '@/components/Footer';

// The /medical-weight-loss-lp ad landing page is self-contained on the live
// site: it ends with its own contact block + closing strip and does NOT show
// the shared global bottom block (doctor profiles / guide teaser / awards /
// brand cards / footer), so BrandBlock and Footer are suppressed there.
export default function GlobalBottom() {
  const pathname = usePathname();
  if (pathname === '/medical-weight-loss-lp') return null;
  return (
    <>
      <BrandBlock />
      <Footer />
    </>
  );
}
