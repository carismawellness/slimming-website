'use client';

import { CONSULT_MODAL_EVENT } from './ConsultationModal';

type Props = {
  children?: React.ReactNode;
  className?: string;
  /** 'filled' = gradient cta-glow pill (use when no Fresha button is present).
   *  'outline' = sage border pill (secondary, sits next to a primary Fresha CTA). */
  variant?: 'filled' | 'outline';
  style?: React.CSSProperties;
};

export default function BookConsultationButton({
  children = 'Book Free Consultation',
  className = '',
  variant = 'outline',
  style,
}: Props) {
  const open = () => {
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
