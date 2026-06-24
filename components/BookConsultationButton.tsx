'use client';

import { CONSULT_MODAL_EVENT } from './ConsultationModal';
import { trackEvent } from '@/lib/analytics';

type Props = {
  children?: React.ReactNode;
  className?: string;
  /** 'filled' = gradient cta-glow pill (use when no Fresha button is present).
   *  'outline' = sage border pill (secondary, sits next to a primary Fresha CTA). */
  variant?: 'filled' | 'outline';
  style?: React.CSSProperties;
};

export default function BookConsultationButton({
  children = 'Free Body Analysis',
  className = '',
  variant = 'outline',
  style,
}: Props) {
  const open = () => {
    const label = typeof children === 'string' ? children : 'Free Body Analysis';
    trackEvent(label.toLowerCase().includes('body analysis') ? 'body_analysis_click' : 'book_consultation_click', {
      page_type: 'consultation',
      cta_label: label,
      section: 'book_consultation_button',
      destination_url: '/consultation',
    });
    window.dispatchEvent(new Event(CONSULT_MODAL_EVENT));
  };

  if (variant === 'filled') {
    return (
      <button
        type="button"
        onClick={open}
        className={`cta-glow inline-flex items-center justify-center font-bold text-white ${className}`}
        style={{
          fontFamily: "'Novecento Wide Book', 'Novecento Wide', sans-serif",
          fontSize: '13px',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          padding: '15px 36px',
          cursor: 'pointer',
          border: 'none',
          ...style,
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className={`btn btn-secondary inline-flex items-center justify-center ${className}`}
      style={{
        fontFamily: "'Novecento Wide Book', 'Novecento Wide', sans-serif",
        fontSize: '13px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        padding: '14px 32px',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
