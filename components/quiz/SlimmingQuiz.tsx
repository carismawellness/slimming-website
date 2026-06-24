'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import {
  GOALS,
  AREAS,
  TIMELINE,
  MEDICATION,
  PREVIOUS_ATTEMPTS,
  REFERRAL,
  CONSULTATION,
  type QuizOption,
} from './quizData';

/* ── Locked brand tokens ───────────────────────────────────────────────── */
const SAGE = '#4f7256';        // deep sage — text / fill (5.42:1 on white)
const SAGE_TINT = '#EEF3EF';   // selected card fill
const SAGE_BORDER = '#C8DDC9'; // light sage border
const TAUPE = '#6f6456';       // body text (AA)
const TAUPE_DEEP = '#5a5043';
const HEAD_FONT = "'Trajan Pro', serif";
const WIDE_FONT = "'Novecento Wide Book', 'Novecento Wide', sans-serif";
const BODY_FONT = "'Roboto', sans-serif";

type StepId =
  | 'goals'
  | 'areas'
  | 'timeline'
  | 'medication'
  | 'previousAttempts'
  | 'referral'
  | 'consultation'
  | 'contact';

const STEPS: { id: StepId; title: string; sub: string }[] = [
  { id: 'goals',            title: 'What would you love to change?',         sub: 'Choose all that apply — we’ll match treatments to every goal.' },
  { id: 'areas',            title: 'Where would you like to focus?',         sub: 'Optional — pick any areas you’d like to target.' },
  { id: 'timeline',         title: 'What’s your timeline for results?',      sub: 'This helps us pace a plan that fits your life.' },
  { id: 'medication',       title: 'Open to medical support?',               sub: 'This helps us know whether prescription options fit you.' },
  { id: 'previousAttempts', title: 'Have you tried losing weight before?',   sub: 'No judgement — it just helps us understand what you need.' },
  { id: 'referral',         title: 'Where did you hear about us?',           sub: 'Last quick one before your results.' },
  { id: 'consultation',     title: 'Would you like a consultation?',         sub: 'For a limited time we’re offering free virtual consultations with our medical team to discuss your goals and the options available to you.' },
  { id: 'contact',          title: 'Where should we send your plan?',        sub: 'Enter your details so we can share your results and stay in touch about your personalised plan.' },
];

const validEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());
const validPhone = (v: string) => v.replace(/\D/g, '').length >= 8;

export default function SlimmingQuiz({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [medication, setMedication] = useState('');
  const [previousAttempts, setPreviousAttempts] = useState('');
  const [referral, setReferral] = useState('');
  const [consultation, setConsultation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+356 ');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const step = STEPS[stepIdx];
  const total = STEPS.length;
  const isLast = stepIdx === total - 1;

  // Move focus to the first contact field when that step opens.
  useEffect(() => {
    if (step.id === 'contact') {
      const id = window.requestAnimationFrame(() => firstFieldRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
  }, [step.id]);

  // Clear any visible error when the step changes.
  useEffect(() => { setError(null); }, [step.id]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const stepValid = useMemo(() => {
    switch (step.id) {
      case 'goals':            return goals.length >= 1;
      case 'areas':            return true; // optional
      case 'timeline':         return timeline !== '';
      case 'medication':       return medication !== '';
      case 'previousAttempts': return previousAttempts !== '';
      case 'referral':         return referral !== '';
      case 'consultation':     return consultation !== '';
      case 'contact':
        return !!firstName.trim() && !!surname.trim() && validEmail(email) && validPhone(phone);
    }
  }, [step.id, goals, timeline, medication, previousAttempts, referral, consultation, firstName, surname, email, phone]);

  const goNext = () => {
    if (step.id === 'contact') {
      if (!firstName.trim() || !surname.trim()) { setError('Please enter your first name and surname.'); return; }
      if (!validEmail(email)) { setError('Please enter a valid email address.'); return; }
      if (!validPhone(phone)) { setError('Please enter a valid phone number.'); return; }
      setError(null);
      submit();
      return;
    }
    if (!stepValid) return;
    if (isLast) { submit(); return; }
    setStepIdx((i) => Math.min(i + 1, total - 1));
  };
  const goBack = () => setStepIdx((i) => Math.max(i - 1, 0));

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);

    // Send the full lead to GoHighLevel (create-or-update). We don't block the
    // results page on it — capture is best-effort but awaited so it has time to fire.
    try {
      await fetch('/api/quiz-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          surname: surname.trim(),
          email: email.trim(),
          phone: phone.trim(),
          goals,
          areas,
          timeline,
          medication,
          previousAttempts,
          referral,
          consultation,
        }),
      });
    } catch {
      /* never block the user's results on a CRM hiccup */
    }

    trackEvent('quiz_complete', {
      page_type: 'quiz',
      cta_label: 'See my results',
      section: 'quiz',
    });

    // Per the /quiz-results contract: URL-encode each value, join with a LITERAL
    // comma (the results page does param.split(',').map(decodeURIComponent)).
    const qs =
      `goals=${goals.map(encodeURIComponent).join(',')}` +
      (areas.length ? `&areas=${areas.map(encodeURIComponent).join(',')}` : '') +
      `&medication=${encodeURIComponent(medication)}` +
      `&name=${encodeURIComponent(firstName.trim())}`;
    router.push(`/quiz-results?${qs}`);
    onClose();
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '13px 15px',
    fontFamily: BODY_FONT,
    fontSize: 16,
    color: '#1a1a1a',
    background: '#fff',
    border: `1.5px solid ${SAGE_BORDER}`,
    borderRadius: 14,
    outline: 'none',
  };
  const labelStyle: CSSProperties = {
    display: 'block', fontFamily: WIDE_FONT, fontSize: 11, letterSpacing: '1.5px',
    color: SAGE, textTransform: 'uppercase', marginBottom: 7,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '88vh' }}>
      {/* Live region announcing step changes for screen readers */}
      <div aria-live="polite" className="sr-only-quiz">
        {`Step ${stepIdx + 1} of ${total}: ${step.title}`}
      </div>

      {/* ── Progress ── */}
      <div style={{ padding: '22px 26px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontFamily: WIDE_FONT, fontSize: 11, letterSpacing: '2px', color: SAGE, textTransform: 'uppercase', margin: 0 }}>
            Step {stepIdx + 1} of {total}
          </p>
          <div style={{ display: 'flex', gap: 5 }} aria-hidden="true">
            {STEPS.map((s, i) => (
              <span
                key={s.id}
                style={{
                  width: i === stepIdx ? 20 : 7,
                  height: 7,
                  borderRadius: 999,
                  background: i <= stepIdx ? SAGE : '#DCE4DC',
                  transition: 'width .3s ease, background .3s ease',
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ height: 4, borderRadius: 999, background: '#E7EDE7', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${((stepIdx + 1) / total) * 100}%`,
              borderRadius: 999,
              background: `linear-gradient(90deg, #557b5b, ${SAGE})`,
              transition: 'width .4s cubic-bezier(.22,1,.36,1)',
            }}
            className="quiz-progress-fill"
          />
        </div>
      </div>

      {/* ── Step body (animated, scrolls if taller than the panel) ── */}
      <div
        key={step.id}
        className="quiz-step"
        style={{ padding: '4px 26px 8px', overflowY: 'auto', flex: '1 1 auto' }}
      >
        <h2 style={{ fontFamily: HEAD_FONT, fontWeight: 400, fontSize: 22, lineHeight: 1.25, color: TAUPE_DEEP, textTransform: 'uppercase', margin: '6px 0 6px' }}>
          {step.title}
        </h2>
        <p style={{ fontFamily: BODY_FONT, fontSize: 13.5, color: TAUPE, lineHeight: 1.55, margin: '0 0 16px' }}>
          {step.sub}
        </p>

        {step.id === 'goals' && (
          <OptionGrid options={GOALS} selected={goals} multi onToggle={(v) => toggle(goals, setGoals, v)} groupLabel="Your goals" />
        )}

        {step.id === 'areas' && (
          <OptionGrid options={AREAS} selected={areas} multi compact onToggle={(v) => toggle(areas, setAreas, v)} groupLabel="Focus areas" />
        )}

        {step.id === 'timeline' && (
          <OptionGrid options={TIMELINE} selected={timeline ? [timeline] : []} multi={false} onToggle={(v) => setTimeline(v)} groupLabel="Timeline" />
        )}

        {step.id === 'medication' && (
          <OptionGrid options={MEDICATION} selected={medication ? [medication] : []} multi={false} onToggle={(v) => setMedication(v)} groupLabel="Medical support preference" />
        )}

        {step.id === 'previousAttempts' && (
          <OptionGrid options={PREVIOUS_ATTEMPTS} selected={previousAttempts ? [previousAttempts] : []} multi={false} onToggle={(v) => setPreviousAttempts(v)} groupLabel="Previous attempts" />
        )}

        {step.id === 'referral' && (
          <OptionGrid options={REFERRAL} selected={referral ? [referral] : []} multi={false} compact onToggle={(v) => setReferral(v)} groupLabel="Where you heard about us" />
        )}

        {step.id === 'consultation' && (
          <OptionGrid options={CONSULTATION} selected={consultation ? [consultation] : []} multi={false} onToggle={(v) => setConsultation(v)} groupLabel="Consultation preference" />
        )}

        {step.id === 'contact' && (
          <div style={{ marginTop: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label htmlFor="quiz-first" style={labelStyle}>First name *</label>
                <input
                  id="quiz-first" ref={firstFieldRef} type="text" autoComplete="given-name"
                  value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Maria" style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="quiz-surname" style={labelStyle}>Surname *</label>
                <input
                  id="quiz-surname" type="text" autoComplete="family-name"
                  value={surname} onChange={(e) => setSurname(e.target.value)}
                  placeholder="e.g. Borg" style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <label htmlFor="quiz-email" style={labelStyle}>Email *</label>
              <input
                id="quiz-email" type="email" autoComplete="email" inputMode="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com" style={inputStyle}
              />
            </div>

            <div style={{ marginTop: 12 }}>
              <label htmlFor="quiz-phone" style={labelStyle}>Phone *</label>
              <input
                id="quiz-phone" type="tel" autoComplete="tel" inputMode="tel"
                value={phone} onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && stepValid) { e.preventDefault(); goNext(); } }}
                placeholder="+356 9999 9999" style={inputStyle}
              />
            </div>

            <p style={{ fontFamily: BODY_FONT, fontSize: 12, color: TAUPE, opacity: 0.85, margin: '12px 0 0' }}>
              Your details are kept private and used only to send your results and follow up about your plan.
            </p>
          </div>
        )}

        {error && (
          <p role="alert" style={{ fontFamily: BODY_FONT, fontSize: 13, color: '#b3261e', margin: '12px 0 0' }}>
            {error}
          </p>
        )}
      </div>

      {/* ── Footer nav ── */}
      <div style={{ padding: '14px 26px 18px', borderTop: '1px solid rgba(40,55,44,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            onClick={goBack}
            disabled={stepIdx === 0}
            className="quiz-back"
            style={{
              fontFamily: WIDE_FONT, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase',
              background: 'none', border: 'none', cursor: stepIdx === 0 ? 'default' : 'pointer',
              color: stepIdx === 0 ? '#B9C2B9' : TAUPE, padding: '8px 6px',
              opacity: stepIdx === 0 ? 0 : 1, pointerEvents: stepIdx === 0 ? 'none' : 'auto',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            Back
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={submitting || (step.id !== 'contact' && !stepValid)}
            className="cta-glow quiz-next"
            style={{
              marginLeft: 'auto',
              fontFamily: WIDE_FONT, fontSize: 12.5, letterSpacing: '1px', textTransform: 'uppercase',
              color: '#fff', padding: '14px 28px', border: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              opacity: submitting || (step.id !== 'contact' && !stepValid) ? 0.45 : 1,
              cursor: submitting || (step.id !== 'contact' && !stepValid) ? 'not-allowed' : 'pointer',
              filter: submitting || (step.id !== 'contact' && !stepValid) ? 'grayscale(0.35)' : 'none',
            }}
          >
            {submitting ? 'Sending…' : isLast ? 'See my results' : 'Continue'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>

        <p style={{ fontFamily: BODY_FONT, fontSize: 11, color: TAUPE, opacity: 0.7, textAlign: 'center', margin: '12px 0 0' }}>
          Takes 60 seconds · No obligation · Doctor-reviewed
        </p>
      </div>

      <style jsx>{`
        .sr-only-quiz {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0);
          white-space: nowrap; border: 0;
        }
        .quiz-step {
          animation: quizFade 0.34s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes quizFade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .quiz-step { animation: none; }
          .quiz-progress-fill { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Selectable option grid ────────────────────────────────────────────── */
function OptionGrid({
  options,
  selected,
  multi,
  compact = false,
  onToggle,
  groupLabel,
}: {
  options: QuizOption[];
  selected: string[];
  multi: boolean;
  compact?: boolean;
  onToggle: (value: string) => void;
  groupLabel: string;
}) {
  return (
    <div
      role={multi ? 'group' : 'radiogroup'}
      aria-label={groupLabel}
      style={{
        display: 'grid',
        gridTemplateColumns: compact ? 'repeat(auto-fill, minmax(140px, 1fr))' : 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 10,
      }}
    >
      {options.map((opt) => {
        const isSel = selected.includes(opt.value);
        const ariaProps = multi
          ? { 'aria-pressed': isSel }
          : { role: 'radio', 'aria-checked': isSel };
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onToggle(opt.value)}
            {...ariaProps}
            className="quiz-option"
            style={{
              position: 'relative',
              textAlign: 'left',
              display: 'flex',
              alignItems: compact ? 'center' : 'flex-start',
              gap: 10,
              padding: compact ? '12px 13px' : '14px 14px 14px 14px',
              borderRadius: 16,
              cursor: 'pointer',
              background: isSel ? SAGE_TINT : '#fff',
              border: `1.5px solid ${isSel ? SAGE : 'rgba(40,55,44,0.14)'}`,
              boxShadow: isSel ? '0 6px 18px -8px rgba(79,114,86,0.4)' : '0 2px 8px rgba(40,55,44,0.05)',
              transition: 'background .2s ease, border-color .2s ease, box-shadow .2s ease, transform .15s ease',
            }}
          >
            {/* icon chip */}
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: compact ? 30 : 38,
                height: compact ? 30 : 38,
                borderRadius: 999,
                background: isSel ? SAGE : SAGE_TINT,
                color: isSel ? '#fff' : SAGE,
                transition: 'background .2s ease, color .2s ease',
              }}
            >
              {opt.icon}
            </span>

            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontFamily: WIDE_FONT, fontSize: compact ? 12 : 12.5, letterSpacing: '0.4px', color: isSel ? SAGE : TAUPE_DEEP, textTransform: 'uppercase', lineHeight: 1.25 }}>
                {opt.label}
              </span>
              {!compact && opt.hint && (
                <span style={{ display: 'block', fontFamily: BODY_FONT, fontSize: 11.5, color: TAUPE, opacity: 0.9, marginTop: 3, lineHeight: 1.4 }}>
                  {opt.hint}
                </span>
              )}
            </span>

            {/* check badge */}
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                alignSelf: compact ? 'center' : 'flex-start',
                width: 20,
                height: 20,
                borderRadius: 999,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isSel ? SAGE : 'transparent',
                border: isSel ? `1.5px solid ${SAGE}` : '1.5px solid rgba(40,55,44,0.22)',
                transition: 'background .2s ease, border-color .2s ease',
              }}
            >
              {isSel && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              )}
            </span>
          </button>
        );
      })}

      <style jsx>{`
        .quiz-option:hover {
          border-color: ${SAGE} !important;
          box-shadow: 0 8px 20px -10px rgba(79,114,86,0.42) !important;
          transform: translateY(-2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .quiz-option { transition: none !important; }
          .quiz-option:hover { transform: none; }
        }
      `}</style>
    </div>
  );
}
