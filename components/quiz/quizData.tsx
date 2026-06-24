import type { ReactNode } from 'react';

/**
 * Single source of truth for the native Slimming quiz.
 *
 * The `value` strings are the EXACT strings the /quiz-results page parses — do
 * not change them. `label` is a friendlier display string (rendered uppercase
 * via CSS); the submitted value is always `value`.
 */

export type QuizOption = {
  value: string;
  label: string;
  hint?: string;
  icon: ReactNode;
};

/* ── Inline brand icons (1.6 stroke, currentColor) ─────────────────────── */
const ico = (children: ReactNode) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

/* ── Step 1 · Goals (multi-select, ≥1) ─────────────────────────────────── */
export const GOALS: QuizOption[] = [
  {
    value: 'Lose weight',
    label: 'Lose weight',
    hint: 'Drop kilos sustainably',
    icon: ico(<><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 7v5l3 2" /></>),
  },
  {
    value: 'Reduce stubborn fat',
    label: 'Reduce stubborn fat',
    hint: 'Target diet-resistant pockets',
    icon: ico(<><path d="M12 21c4-3 6.5-6 6.5-9.5A6.5 6.5 0 0 0 5.5 11.5C5.5 15 8 18 12 21Z" /><circle cx="12" cy="11" r="2" /></>),
  },
  {
    value: 'Build muscle & tone',
    label: 'Build muscle & tone',
    hint: 'Define and firm',
    icon: ico(<><path d="M6.5 7 4 9.5l2 2" /><path d="M17.5 17 20 14.5l-2-2" /><path d="m8 11.5 8 1" /><path d="M6 9.5 18 16" /></>),
  },
  {
    value: 'Tighten loose skin',
    label: 'Tighten loose skin',
    hint: 'Smooth and lift',
    icon: ico(<><path d="M4 12c4-5 12-5 16 0" /><path d="M4 17c4-4 12-4 16 0" /><path d="M4 7c4-3 12-3 16 0" /></>),
  },
  {
    value: 'Reduce cellulite',
    label: 'Reduce cellulite',
    hint: 'Soften dimpled skin',
    icon: ico(<><circle cx="7" cy="8" r="1.4" /><circle cx="13" cy="7" r="1.4" /><circle cx="18" cy="9" r="1.4" /><circle cx="9" cy="14" r="1.4" /><circle cx="15" cy="13" r="1.4" /><circle cx="11" cy="19" r="1.4" /></>),
  },
  {
    value: 'Reduce bloating',
    label: 'Reduce bloating',
    hint: 'Feel lighter, less puffy',
    icon: ico(<><path d="M12 3c3 0 5 2.5 5 6 0 4-2 7-5 12-3-5-5-8-5-12 0-3.5 2-6 5-6Z" /><path d="M12 9v4" /></>),
  },
];

/* ── Step 2 · Focus areas (multi-select, optional) ─────────────────────── */
export const AREAS: QuizOption[] = [
  { value: 'Abdomen', label: 'Abdomen', icon: ico(<><rect x="6" y="4" width="12" height="16" rx="5" /><path d="M12 9v6" /></>) },
  { value: 'Love handles', label: 'Love handles', icon: ico(<><path d="M5 8c0 4 1.5 8 7 8s7-4 7-8" /><path d="M5 8c0-2 2-3 7-3s7 1 7 3" /></>) },
  { value: 'Arms', label: 'Arms', icon: ico(<><path d="M8 4v7a4 4 0 0 0 8 0" /><path d="M16 11v9" /><path d="M8 4h8" /></>) },
  { value: 'Thighs', label: 'Thighs', icon: ico(<><path d="M9 3c-1 5-2 9-2 13M15 3c1 5 2 9 2 13" /><path d="M7 16h10" /></>) },
  { value: 'Double chin', label: 'Double chin', icon: ico(<><path d="M5 9a7 7 0 0 1 14 0c0 4-3 7-7 8" /><path d="M8 15c1 1.5 2.5 2.5 4 2.5" /></>) },
  { value: 'Glutes', label: 'Glutes', icon: ico(<><path d="M6 6c0 4-1 6-1 8a4 4 0 0 0 7 2 4 4 0 0 0 7-2c0-2-1-4-1-8" /></>) },
  { value: 'Knees', label: 'Knees', icon: ico(<><path d="M10 3v7l-2 4 2 7" /><path d="M14 3v7l2 4-2 7" /><circle cx="12" cy="11" r="2.5" /></>) },
  { value: 'Back', label: 'Back', icon: ico(<><path d="M12 3v18" /><path d="M9 6 12 4l3 2" /><path d="M8 11h8M8 15h8" /></>) },
];

/* ── Step 3 · Medication openness (single-select) ──────────────────────── */
export const MEDICATION: QuizOption[] = [
  {
    value: 'Yes, I am interested',
    label: 'Yes, I am interested',
    hint: 'Open to prescription support (e.g. GLP-1)',
    icon: ico(<><path d="m10.5 13.5 3-3" /><rect x="3" y="9" width="10" height="6" rx="3" transform="rotate(45 8 12)" /></>),
  },
  {
    value: 'No, I prefer non-medical',
    label: 'No, I prefer non-medical',
    hint: 'Treatments & technology only',
    icon: ico(<><path d="M12 21c4-3 8-6.5 8-11a5 5 0 0 0-9-3 5 5 0 0 0-9 3c0 4.5 4 8 8 11Z" /></>),
  },
  {
    value: 'Not sure, I would like advice',
    label: 'Not sure, I’d like advice',
    hint: 'Our doctor can guide you',
    icon: ico(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3" /><path d="M12 17h.01" /></>),
  },
];

/* ── Step · Timeline (single-select) ───────────────────────────────────── */
export const TIMELINE: QuizOption[] = [
  { value: 'As soon as possible', label: 'As soon as possible', hint: 'Ready to start now', icon: ico(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>) },
  { value: '3-4 months', label: '3–4 months', hint: 'A steady, planned pace', icon: ico(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>) },
  { value: '6+ months', label: '6+ months', hint: 'A longer-term journey', icon: ico(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4M8 13h2M14 13h2M8 17h2" /></>) },
  { value: 'I am flexible', label: 'I’m flexible', hint: 'Open to your recommendation', icon: ico(<><path d="M4 12h12" /><path d="m13 7 5 5-5 5" /><path d="M20 5v14" /></>) },
];

/* ── Step · Previous attempts (single-select) ──────────────────────────── */
export const PREVIOUS_ATTEMPTS: QuizOption[] = [
  { value: 'Yes, but struggled to keep it off', label: 'Yes, but it came back', hint: 'Lost weight, then regained', icon: ico(<><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v4h4" /></>) },
  { value: 'Yes, with some success', label: 'Yes, with some success', hint: 'Some lasting progress', icon: ico(<><path d="M20 6 9 17l-5-5" /></>) },
  { value: 'No, this is my first attempt', label: 'No, this is my first try', hint: 'New to this', icon: ico(<><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>) },
  { value: 'I have tried many things without lasting results', label: 'Tried many things, no luck', hint: 'Looking for what finally works', icon: ico(<><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></>) },
];

/* ── Step · Referral source (single-select) ────────────────────────────── */
export const REFERRAL: QuizOption[] = [
  { value: 'Social Media', label: 'Social Media', icon: ico(<><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.2" /><circle cx="17" cy="7" r="1" /></>) },
  { value: 'Google', label: 'Google', icon: ico(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>) },
  { value: 'Hotel', label: 'Hotel', icon: ico(<><path d="M3 21V7l9-4 9 4v14" /><path d="M3 21h18M9 21v-5h6v5" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></>) },
  { value: 'Company partnership', label: 'Company partnership', icon: ico(<><path d="M8 11V7a4 4 0 0 1 8 0v4" /><rect x="4" y="11" width="16" height="9" rx="2" /></>) },
  { value: 'Influencer', label: 'Influencer', icon: ico(<><path d="M12 3l2.3 4.7L19.5 8l-3.8 3.6.9 5.2L12 14.8 7.4 16.8l.9-5.2L4.5 8l5.2-.3L12 3Z" /></>) },
  { value: 'Family/Friend', label: 'Family / Friend', icon: ico(<><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 11a3 3 0 1 0-1-5.8" /><path d="M18 20c0-2-.6-3.7-1.6-5" /></>) },
  { value: 'Repeat customer', label: 'Repeat customer', hint: 'I’ve visited before', icon: ico(<><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v4h-4" /><path d="m9 12 2 2 4-4" /></>) },
  { value: 'Other', label: 'Other', icon: ico(<><circle cx="6" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="18" cy="12" r="1.4" /></>) },
];

/* ── Step · Consultation preference (single-select) ────────────────────── */
export const CONSULTATION: QuizOption[] = [
  { value: 'Free virtual consult', label: 'Free virtual consult', hint: 'Online with our medical team', icon: ico(<><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></>) },
  { value: 'In person consult (50 euros)', label: 'In-person consult (€50)', hint: 'At our Malta clinic', icon: ico(<><circle cx="12" cy="8" r="3.2" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></>) },
  { value: 'No consultation', label: 'No consultation for now', hint: 'Just show my results', icon: ico(<><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></>) },
];
