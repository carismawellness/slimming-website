'use client';

/* ============================================================
   /packages-rebuild
   Structural placeholder rebuild of carismaslimming.com/packages.
   - Matches OBSERVED section order, grids, column counts, alignment.
   - NEUTRAL ORIGINAL copy only. Every image is a labeled dashed box.
   - Global Header (announcement bar + nav) and Footer come from the
     app layout, so this page renders content sections 3 (hero) -> 20
     (ebook CTA). The footer "STAY IN TOUCH" block (section 21) is
     supplied by the global layout.
   ============================================================ */

import { useState } from 'react';

/* ---------- palette (sage / taupe, matching site family) ---------- */
const green = '#8EB093';
const greenDark = '#7ba587';
const slate = '#2b5672';
const taupe = '#9B8D83';
const taupeLight = '#AFA39D';
const softBg = '#E4EBE2';
const panelGradient = 'linear-gradient(135deg, #FCFCFA, #D8E7D2)';

/* ---------- shared text styles ---------- */
const bullet = { color: green, fontSize: '18px', lineHeight: '1' } as const;
const liStyle = { color: taupe, fontWeight: 400 as const, fontSize: '15px' };
const pStyle = { color: taupe, fontWeight: 400 as const, fontSize: '15px', lineHeight: 1.7 };

/* ---------- shared components ---------- */
function Eyebrow({ children, align = 'center' }: { children: React.ReactNode; align?: 'center' | 'left' }) {
  return (
    <p
      className={align === 'center' ? 'text-center' : 'text-left'}
      style={{ color: taupe, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase' }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children, align = 'center' }: { children: React.ReactNode; align?: 'center' | 'left' }) {
  return (
    <h2
      className={align === 'center' ? 'text-center' : 'text-left'}
      style={{ color: greenDark, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase', lineHeight: 1.2 }}
    >
      {children}
    </h2>
  );
}

/* Labeled dashed placeholder box — stands in for every reference image */
function Placeholder({ label, height = '320px' }: { label: string; height?: string }) {
  return (
    <div
      className="w-full flex items-center justify-center text-center rounded-lg border-2 border-dashed"
      style={{
        minHeight: height,
        borderColor: green,
        backgroundColor: softBg,
        color: taupe,
        fontSize: '14px',
        padding: '16px',
      }}
    >
      {label}
    </div>
  );
}

function CTAButton({ label = 'Primary call to action' }: { label?: string }) {
  return (
    <span
      className="inline-block rounded-full font-bold text-white text-center"
      style={{ backgroundColor: slate, padding: '15px 36px', fontSize: '14px', letterSpacing: '0.5px' }}
    >
      {label}
    </span>
  );
}

function Check() {
  return <span style={{ color: green, fontWeight: 700 }}>&#10003;</span>;
}

const LOREM_SHORT =
  'Lorem-style placeholder body copy that stands in for the original paragraph text in this section.';
const LOREM_LONG =
  'Lorem-style placeholder body copy that stands in for the original paragraph text in this section. It fills roughly the same amount of vertical space as the reference paragraph so the layout rhythm stays faithful.';

/* ============================================================
   3. HERO  (two-column: text left ~50% / image right ~50%)
   ============================================================ */
function Hero() {
  return (
    <section className="py-16 lg:py-20" style={{ background: panelGradient }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* text column */}
          <div>
            <h3
              className="mb-4"
              style={{ color: green, fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 400 }}
            >
              Eyebrow heading line
            </h3>
            <h1 className="mb-5" style={{ color: greenDark, fontWeight: 400, fontSize: '42px', lineHeight: 1.15, textTransform: 'uppercase' }}>
              Hero headline goes here
            </h1>
            <p className="mb-6" style={pStyle}>{LOREM_LONG}</p>
            <ul className="space-y-3 mb-7">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-start gap-2" style={liStyle}>
                  <span style={bullet}>&bull;</span>
                  <span>Commitment list item {i + 1}</span>
                </li>
              ))}
            </ul>
            <CTAButton label="Hero call to action" />
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2" style={{ color: taupeLight, fontSize: '13px' }}>
              <span style={{ color: green, fontWeight: 600 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span>Rating + review count placeholder</span>
              <span>&middot;</span>
              <span>Trust badge placeholder</span>
            </div>
          </div>
          {/* image column */}
          <div>
            <Placeholder label="[ Image: hero portrait of doctor ]" height="420px" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. PRESS STRIP — "As seen on" (centered H2 + horizontal logo row)
   ============================================================ */
function PressStrip() {
  return (
    <section className="py-12 border-b" style={{ borderColor: '#ececec', backgroundColor: '#fff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block pb-1" style={{ borderBottom: `1px solid ${green}` }}>
          <Eyebrow>Eyebrow heading line</Eyebrow>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ width: '150px' }}>
              <Placeholder label={`[ Logo ${i} ]`} height="56px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. IMAGE + TEXT NARRATIVE (image left / text right)
   ============================================================ */
function NarrativeIntro() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Placeholder label="[ Image: lifestyle photo ]" height="380px" />
          <div>
            <Eyebrow align="left">Eyebrow heading line</Eyebrow>
            <h2 className="mt-2 mb-5" style={{ color: greenDark, fontWeight: 400, fontSize: '28px', textTransform: 'uppercase', lineHeight: 1.25 }}>
              Section heading on two lines
            </h2>
            <p className="mb-5" style={pStyle}>{LOREM_LONG}</p>
            <ul className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-start gap-2" style={liStyle}>
                  <span style={bullet}>&bull;</span>
                  <span>Body list item {i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. PROBLEM INTRO (centered single column: eyebrow + H2)
   ============================================================ */
function ProblemIntro() {
  return (
    <section className="py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Eyebrow>Eyebrow heading line</Eyebrow>
        <h2 className="mt-3" style={{ color: greenDark, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase', lineHeight: 1.2 }}>
          Section heading question goes here
        </h2>
      </div>
    </section>
  );
}

/* ============================================================
   7. TWO-COLUMN COMPARISON CARDS (2 equal sage cards, 4 bullets each)
   ============================================================ */
function ComparisonCards() {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['Card heading one', 'Card heading two'].map((title) => (
            <div key={title} className="rounded-2xl p-8" style={{ backgroundColor: softBg }}>
              <h3 className="mb-5 text-center" style={{ color: taupe, fontSize: '18px', fontWeight: 600 }}>{title}</h3>
              <ul className="space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-2" style={liStyle}>
                    <span style={bullet}>&bull;</span>
                    <span>List item {i + 1} placeholder copy.</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. PULL-QUOTE + CTA (centered: statement -> highlight card -> button)
   ============================================================ */
function PullQuoteCTA() {
  return (
    <section className="py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-8" style={{ color: taupe, fontSize: '18px', lineHeight: 1.6 }}>
          Emphasized pull-quote statement line that summarizes the problem placeholder copy.
        </p>
        <div className="rounded-2xl p-8 mb-8" style={{ backgroundColor: softBg }}>
          <p style={{ color: greenDark, fontSize: '16px', lineHeight: 1.7, fontWeight: 600 }}>
            Highlighted summary card: {LOREM_SHORT}
          </p>
        </div>
        <CTAButton label="Section call to action" />
      </div>
    </section>
  );
}

/* ============================================================
   9. FOUR-COLUMN PILLARS (eyebrow + H2, then 4 centered icon cells)
   ============================================================ */
function Pillars() {
  return (
    <section className="py-16" style={{ backgroundColor: softBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow>Eyebrow heading line</Eyebrow>
        <h2 className="mt-3 mb-12 text-center" style={{ color: greenDark, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase', lineHeight: 1.2 }}>
          Section heading goes here
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-4" style={{ width: '64px' }}>
                <Placeholder label="[ Icon ]" height="64px" />
              </div>
              <h3 className="mb-2" style={{ color: greenDark, fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pillar title {i}
              </h3>
              <p style={{ ...pStyle, fontSize: '14px' }}>{LOREM_SHORT}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   10. STEPS LIST (eyebrow + horizontal Step 1-5 numbered row)
   ============================================================ */
function StepsRow() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Eyebrow>Eyebrow heading line</Eyebrow>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-y-6">
          {[1, 2, 3, 4, 5].map((i, idx) => (
            <div key={i} className="flex items-center">
              <div className="text-center" style={{ minWidth: '90px' }}>
                <div
                  className="mx-auto mb-2 flex items-center justify-center rounded-full"
                  style={{ width: '40px', height: '40px', border: `2px solid ${green}`, color: greenDark, fontWeight: 700 }}
                >
                  {i}
                </div>
                <p style={{ color: taupe, fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Step {i}</p>
              </div>
              {idx < 4 && <span className="hidden sm:block" style={{ width: '48px', height: '2px', backgroundColor: green, opacity: 0.5 }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   11. THREE-COLUMN DETAIL CARDS
   (Complimentary consultation / Suitable for / Not suitable for)
   ============================================================ */
function DetailCards() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Column 1 — paragraph + numbered list */}
          <div className="rounded-2xl p-7" style={{ backgroundColor: softBg }}>
            <div className="mb-4" style={{ width: '40px' }}>
              <Placeholder label="[ Icon ]" height="40px" />
            </div>
            <h3 className="mb-3" style={{ color: greenDark, fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Column heading one
            </h3>
            <p className="mb-4" style={{ ...pStyle, fontSize: '14px' }}>{LOREM_SHORT}</p>
            <ol className="space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start gap-2" style={{ ...liStyle, fontSize: '14px' }}>
                  <span style={{ color: green, fontWeight: 600 }}>{i + 1}.</span>
                  <span>List item placeholder.</span>
                </li>
              ))}
            </ol>
          </div>
          {/* Column 2 — checkmark list */}
          <div className="rounded-2xl p-7" style={{ backgroundColor: softBg }}>
            <div className="mb-4" style={{ width: '40px' }}>
              <Placeholder label="[ Icon ]" height="40px" />
            </div>
            <h3 className="mb-3" style={{ color: greenDark, fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Column heading two
            </h3>
            <ul className="space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start gap-2" style={{ ...liStyle, fontSize: '14px' }}>
                  <Check />
                  <span>Checklist item placeholder.</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 3 — bullet list */}
          <div className="rounded-2xl p-7" style={{ backgroundColor: softBg }}>
            <div className="mb-4" style={{ width: '40px' }}>
              <Placeholder label="[ Icon ]" height="40px" />
            </div>
            <h3 className="mb-3" style={{ color: taupe, fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Column heading three
            </h3>
            <ul className="space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-start gap-2" style={{ ...liStyle, fontSize: '14px' }}>
                  <span style={{ color: taupeLight, fontWeight: 700 }}>&#10007;</span>
                  <span>Bullet item placeholder.</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   12. IMAGE + TEXT NARRATIVE BLOCKS (3 alternating rows)
   ============================================================ */
function NarrativeBlocks() {
  const blocks = [
    { label: '[ Image: diet & accountability ]' },
    { label: '[ Image: body analyser ]' },
    { label: '[ Image: movement ]' },
  ];
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {blocks.map((b, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={flip ? 'md:order-2' : ''}>
                <Placeholder label={b.label} height="340px" />
              </div>
              <div className={flip ? 'md:order-1' : ''}>
                <h3 className="mb-4" style={{ color: greenDark, fontWeight: 400, fontSize: '24px', textTransform: 'uppercase' }}>
                  Sub-section heading {i + 1}
                </h3>
                <p className="mb-4" style={pStyle}>{LOREM_LONG}</p>
                <p style={pStyle}>{LOREM_SHORT}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   13. TREATMENTS (eyebrow + H3, then 2x2 card grid: image-top + text)
   ============================================================ */
function Treatments() {
  const cards = [
    'Treatment card one',
    'Treatment card two',
    'Treatment card three',
    'Treatment card four',
  ];
  return (
    <section className="py-16" style={{ backgroundColor: softBg }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow>Eyebrow heading line</Eyebrow>
        <h2 className="mt-3 mb-12 text-center" style={{ color: greenDark, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase' }}>
          Section heading
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c) => (
            <div key={c} className="rounded-2xl overflow-hidden bg-white" style={{ border: '1px solid #dfe6dc' }}>
              <Placeholder label="[ Image: treatment photo ]" height="220px" />
              <div className="p-6">
                <h3 className="mb-3" style={{ color: greenDark, fontWeight: 400, fontSize: '20px', textTransform: 'uppercase' }}>{c}</h3>
                <p style={{ ...pStyle, fontSize: '14px' }}>{LOREM_SHORT}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   14. "CARISMA DIFFERENCE" FEATURE BAND
   (centered heading + intro line + left-aligned check rows)
   ============================================================ */
function DifferenceBand() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Eyebrow>Eyebrow heading line</Eyebrow>
        <h2 className="mt-3 mb-4" style={{ color: greenDark, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase' }}>
          Section heading
        </h2>
        <p className="mb-10" style={pStyle}>{LOREM_SHORT}</p>
        <ul className="space-y-4 inline-block text-left">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="flex items-start gap-3" style={liStyle}>
              <Check />
              <span>Differentiator checklist row {i + 1} placeholder copy.</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
   15. PROMISE / GUARANTEE BAND (two-column: text + image, centered H2)
   ============================================================ */
function PromiseBand() {
  return (
    <section className="py-16" style={{ backgroundColor: softBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow>Eyebrow heading line</Eyebrow>
        <h2 className="mt-3 mb-12 text-center" style={{ color: greenDark, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase' }}>
          Section heading
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="mb-6" style={pStyle}>{LOREM_LONG}</p>
            <CTAButton label="Section call to action" />
          </div>
          <Placeholder label="[ Image: consultation / treatment ]" height="340px" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   16. LEADING WELLNESS CHAIN
   (centered heading + two sub-blocks of lists + parking tile)
   ============================================================ */
function WellnessChain() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow>Eyebrow heading line</Eyebrow>
        <h2 className="mt-3 mb-12 text-center" style={{ color: greenDark, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase' }}>
          Section heading
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="mb-4" style={{ color: greenDark, fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Sub-heading one
            </h3>
            <ul className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-start gap-2" style={liStyle}>
                  <span style={bullet}>&bull;</span>
                  <span>Bullet item {i + 1} placeholder copy.</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4" style={{ color: greenDark, fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Sub-heading two
            </h3>
            <ul className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="flex items-start gap-3" style={liStyle}>
                  <Check />
                  <span>Checklist item {i + 1} placeholder copy.</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* parking tile */}
        <div className="mt-10 max-w-sm rounded-2xl p-6 flex items-center gap-4" style={{ backgroundColor: softBg }}>
          <div style={{ width: '40px', flexShrink: 0 }}>
            <Placeholder label="[ Icon ]" height="40px" />
          </div>
          <p style={{ color: greenDark, fontSize: '15px', fontWeight: 600 }}>Parking callout tile placeholder</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   17. FAQ ACCORDION (H2 left + search right on one row; 10 rows)
   ============================================================ */
function FAQAccordion() {
  const questions = Array.from({ length: 10 }, (_, i) => `Frequently asked question number ${i + 1} placeholder?`);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading row: H2 left + search right */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <SectionHeading align="left">Section heading</SectionHeading>
          <div className="border-b" style={{ borderColor: green, minWidth: '260px' }}>
            <input
              type="text"
              placeholder="Search placeholder"
              className="w-full bg-transparent outline-none"
              style={{ color: taupe, fontSize: '14px', padding: '8px 4px' }}
            />
          </div>
        </div>
        {/* accordion rows */}
        <div>
          {questions.map((q, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid #dfe6dc' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                  style={{ padding: '20px 0', cursor: 'pointer', background: 'transparent' }}
                  aria-expanded={isOpen}
                >
                  <span style={{ color: greenDark, fontSize: '15px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {i + 1}. {q}
                  </span>
                  <span style={{ color: green, fontSize: '18px', flexShrink: 0 }}>{isOpen ? '⌃' : '⌄'}</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 0 22px' }}>
                    <p className="mb-4" style={pStyle}>{LOREM_LONG}</p>
                    <ul className="space-y-2">
                      {[0, 1, 2, 3].map((j) => (
                        <li key={j} className="flex items-start gap-2" style={{ ...liStyle, fontSize: '14px' }}>
                          <span style={bullet}>&bull;</span>
                          <span>Answer list item {j + 1} placeholder.</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   18. EVIDENCE CARD GRID (eyebrow + H2, then 2-col cards w/ badge)
   ============================================================ */
function EvidenceGrid() {
  const cards = Array.from({ length: 6 }, (_, i) => `Research card heading ${i + 1}`);
  return (
    <section className="py-16" style={{ backgroundColor: softBg }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow>Eyebrow heading line</Eyebrow>
        <h2 className="mt-3 mb-12 text-center" style={{ color: greenDark, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase' }}>
          Section heading
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c) => (
            <div key={c} className="rounded-2xl overflow-hidden bg-white" style={{ border: '1px solid #dfe6dc' }}>
              {/* image with evidence-level badge */}
              <div className="relative">
                <Placeholder label="[ Image: research photo ]" height="200px" />
                <span
                  className="absolute top-3 left-3 rounded-full"
                  style={{ backgroundColor: green, color: '#fff', fontSize: '10px', letterSpacing: '0.5px', padding: '4px 10px', textTransform: 'uppercase' }}
                >
                  Evidence level
                </span>
              </div>
              <div className="p-6">
                <h2 className="mb-3" style={{ color: greenDark, fontWeight: 400, fontSize: '18px', textTransform: 'uppercase' }}>{c}</h2>
                <p className="mb-2" style={{ color: taupe, fontSize: '12px', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Label line
                </p>
                <p className="mb-4" style={{ ...pStyle, fontSize: '14px' }}>{LOREM_SHORT}</p>
                <span style={{ color: slate, fontSize: '13px', fontWeight: 600 }}>See more &rsaquo;</span>
              </div>
            </div>
          ))}
        </div>
        {/* closing "why we combine" block */}
        <div className="mt-10 rounded-2xl p-8 bg-white text-center" style={{ border: '1px solid #dfe6dc' }}>
          <h3 className="mb-3" style={{ color: greenDark, fontWeight: 400, fontSize: '20px', textTransform: 'uppercase' }}>
            Closing block heading
          </h3>
          <p className="max-w-2xl mx-auto" style={pStyle}>{LOREM_LONG}</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   19. MEET THE DOCTORS (3 alternating image-left / text-right rows)
   ============================================================ */
function Doctors() {
  const docs = ['Doctor name one', 'Doctor name two', 'Doctor name three'];
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {docs.map((name, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={name} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={flip ? 'md:order-2' : ''}>
                <Placeholder label="[ Image: doctor portrait ]" height="360px" />
              </div>
              <div className={flip ? 'md:order-1' : ''}>
                <h2 className="mb-4" style={{ color: greenDark, fontWeight: 400, fontSize: '26px', textTransform: 'uppercase' }}>{name}</h2>
                <p className="mb-4" style={pStyle}>{LOREM_LONG}</p>
                <p style={pStyle}>{LOREM_SHORT}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   20. EBOOK / LEAD-MAGNET CTA BAND (cover image + text/CTA, two-col)
   ============================================================ */
function EbookCTA() {
  return (
    <section className="py-16" style={{ backgroundColor: softBg }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="mx-auto w-full" style={{ maxWidth: '320px' }}>
            <Placeholder label="[ Image: e-book cover ]" height="380px" />
          </div>
          <div>
            <h2 className="mb-2" style={{ color: greenDark, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase', lineHeight: 1.2 }}>
              eBook heading line one
            </h2>
            <h2 className="mb-6" style={{ color: greenDark, fontWeight: 400, fontSize: '30px', textTransform: 'uppercase', lineHeight: 1.2 }}>
              eBook heading line two
            </h2>
            <p className="mb-8" style={pStyle}>{LOREM_LONG}</p>
            <CTAButton label="Download call to action" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE — sections 3 (hero) -> 20 (ebook CTA).
   Section 1 (announcement), 2 (header) and 21 (footer) are rendered
   globally by the app layout.
   ============================================================ */
export default function PackagesRebuildPage() {
  return (
    <div className="w-full" style={{ backgroundColor: '#fff' }}>
      <Hero />            {/* 3  */}
      <PressStrip />      {/* 4  */}
      <NarrativeIntro />  {/* 5  */}
      <ProblemIntro />    {/* 6  */}
      <ComparisonCards /> {/* 7  */}
      <PullQuoteCTA />    {/* 8  */}
      <Pillars />         {/* 9  */}
      <StepsRow />        {/* 10 */}
      <DetailCards />     {/* 11 */}
      <DifferenceBand />  {/* 12 */}
      <PromiseBand />     {/* 15 */}
      <WellnessChain />   {/* 16 */}
      <FAQAccordion />    {/* 17 */}
      <EvidenceGrid />    {/* 18 */}
      <Doctors />         {/* 19 */}
      <EbookCTA />        {/* 20 */}
    </div>
  );
}
