'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function Glp1PageTracker() {
  useEffect(() => {
    trackEvent('glp1_page_view', {
      page_type: 'glp1',
      section: 'page_view',
    });
  }, []);

  return null;
}
