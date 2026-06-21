'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GOALS, AREAS, MEDICATION, type QuizOption } from './quizData';

/* ── Locked brand tokens ───────────────────────────────────────────────── */
const SAGE = '#4f7256';        // deep sage — text / fill (5.42:1 on white)
const SAGE_TINT = '#EEF3EF';   // selected card fill
const SAGE_BORDER = '#C8DDC9'; // light sage border
const TAUPE = '#6f6456';       // body text (AA)
const TAUPE_DEEP = '#5a5043';
const HEAD_FONT = "'Trajan Pro', serif";
const WIDE_FONT = "'Novecento Wide Book', 'Novecento Wide', sans-serif";
const BODY_FONT = "'Roboto', sans-serif";

type StepId = 'goals' | 'areas' | 'medication' | 'name';

const STEPS: { id: StepId; title: string; sub: string }[] = [
  { id: 'goals',      title: 'What would you love to change?',  sub: 'Choose all that apply — we’ll match treatments to every goal.' },
  { id: 'areas',      title: 'Where would you like to focus?',  sub: 'Optional — pick any areas you’d like to target.' },
  { id: 'medication', title: 'Open to medical support?',        sub: 'This helps us know whether prescription options fit you.' },
  { id: 'name',       title: 'Where should we send your plan?', sub: 'Just your first name for a personalised result.' },
];

export default function SlimmingQuiz({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [medication, setMedication] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const step = STEPS[stepIdx];
  const total = STEPS.length;
  const isLast = stepIdx === total - 1;

  // Move focus to the name field when its step opens (skipped for reduced-motion
  // users only matters visually; focus itself is always helpful for keyboard).
  useEffect(() => {
    if (step.id === 'name') {
      const id = window.requestAnimationFrame(() => nameInputRef.current?.focus());
      return () => window.cancelAnimationFrame(id);
    }
  }, [step.id]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const stepValid = useMemo(() => {
    switch (step.id) {
      case 'goals':      return goals.length >= 1;
      case 'areas':      return true; // optional
      case 'medication': return medication !== '';
      case 'name':       return name.trim().length >= 1;
    }
  }, [step.id, goals, medication, name]);

  const goNext = () => {
    if (!stepValid) return;
    if (isLast) { submit(); return; }
    setStepIdx((i) => Math.min(i + 1, total - 1));
  };
  const goBack = () => setStepIdx((i) => Math.max(i - 1, 0));

  const submit = () => {
    if (submitting) return;
    setSubmitting(true);
    // Per the /quiz-results contract: URL-encode each value, join with a LITERAL
    // comma (the results page does param.split(',').map(decodeURIComponent)).
    // Built manually because URLSearchParams would re-encode the separator commas.
    const qs =
      `goals=${goals.map(encodeURIComponent).join(',')}` +
      (areas.length ? `&areas=${areas.map(encodeURIComponent).join(',')}` : '') +
      `&medication=${encodeURIComponent(medication)}` +
      `&name=${encodeURIComponent(name.trim())}`;
    router.push(`/quiz-results?${qs}`);
    onClose();
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
          <div style={{ display: 'flex', gap: 6 }} aria-hidden="true">
            {STEPS.map((s, i) => (
              <span
                key={s.id}
                style={{
                  width: i === stepIdx ? 22 : 8,
                  height: 8,
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

      {/* ── Step body (animated) ── */}
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
          <OptionGrid
            options={GOALS}
            selected={goals}
            multi
            onToggle={(v) => toggle(goals, setGoals, v)}
            groupLabel="Your goals"
          />
        )}

        {step.id === 'areas' && (
          <OptionGrid
            options={AREAS}
            selected={areas}
            multi
            compact
            onToggle={(v) => toggle(areas, setAreas, v)}
            groupLabel="Focus areas"
          />
        )}

        {step.id === 'medication' && (
          <OptionGrid
            options={MEDICATION}
            selected={medication ? [medication] : []}
            multi={false}
            onToggle={(v) => setMedication(v)}
            groupLabel="Medical support preference"
          />
        )}

        {step.id === 'name' && (
          <div style={{ marginTop: 4 }}>
            <label
              htmlFor="quiz-name"
              style={{ display: 'block', fontFamily: WIDE_FONT, fontSize: 11, letterSpacing: '1.5px', color: SAGE, textTransform: 'uppercase', marginBottom: 8 }}
            >
              First name
            </label>
            <input
              id="quiz-name"
              ref={nameInputRef}
              type="text"
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && stepValid) { e.preventDefault(); goNext(); } }}
              placeholder="e.g. Maria"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontFamily: BODY_FONT,
                fontSize: 16,
                color: '#1a1a1a',
                background: '#fff',
                border: `1.5px solid ${SAGE_BORDER}`,
                borderRadius: 16,
                outline: 'none',
              }}
            />
            <p style={{ fontFamily: BODY_FONT, fontSize: 12, color: TAUPE, opacity: 0.85, margin: '10px 0 0' }}>
              No spam — your results appear instantly on the next screen.
            </p>
          </div>
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
            disabled={!stepValid || submitting}
            className="cta-glow quiz-next"
            style={{
              marginLeft: 'auto',
              fontFamily: WIDE_FONT, fontSize: 12.5, letterSpacing: '1px', textTransform: 'uppercase',
              color: '#fff', padding: '14px 28px', border: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              opacity: !stepValid || submitting ? 0.45 : 1,
              cursor: !stepValid || submitting ? 'not-allowed' : 'pointer',
              filter: !stepValid || submitting ? 'grayscale(0.35)' : 'none',
              boxShadow: !stepValid || submitting ? 'none' : undefined,
            }}
          >
            {isLast ? 'See my results' : 'Continue'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>

        <p style={{ fontFamily: BODY_FONT, fontSize: 11, color: TAUPE, opacity: 0.7, textAlign: 'center', margin: '12px 0 0' }}>
          Takes 30 seconds · No obligation · Doctor-reviewed
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
