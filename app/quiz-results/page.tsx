import type { Metadata } from 'next';
import Link from 'next/link';
import HeroMotif from '@/components/HeroMotif';

export const metadata: Metadata = {
  title: "Your Quiz Results | Carisma Slimming",
  robots: { index: false, follow: true },
};

/* ── Brand tokens (locked palette — DESIGN_LANGUAGE §1) ───────────────── */
const headingFont = 'Trajan Pro, serif';
const wideFont    = 'Novecento Wide Book, sans-serif';
const bodyFont    = 'Roboto, sans-serif';
// Headings: dark sage #3c5a40 (H2/H3), deep forest #024C27 for stat values. Both AA on white.
const headGreen   = '#3c5a40';
const deepForest  = '#024C27';
// Sage #4f7256 — buttons/links/icons/eyebrows/tags. AA (5.42:1). #8EB093 stays decorative only.
const green       = '#4f7256';
// Body copy / secondary text (locked neutrals).
const body        = '#333333';
const bodyMuted   = '#595959';

/* ── Slimming treatments catalogue ───────────────────────────────────── */
const TREATMENTS = [
  {
    id: 'medical-weight-loss',
    name: 'Medical Weight Loss Program',
    tagline: 'Doctor-led assessment, prescription support and a personalised plan built around your body and hormones.',
    image: '/wix/87fc13_a965179046514c2a8ad7bec0b7f44127~mv2.jpg',
    stats: [
      { label: 'Led by', value: 'Medical Doctor' },
      { label: 'Results', value: 'Up to 1kg/week' },
      { label: 'Support', value: 'Weekly check-ins' },
    ],
    href: '/weight-loss',
  },
  {
    id: 'glp1',
    name: 'GLP-1 Prescription (Ozempic / Mounjaro)',
    tagline: 'Prescription weight loss medication — Ozempic or Mounjaro — prescribed and monitored by our doctors when clinically appropriate.',
    image: '/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.webp',
    stats: [
      { label: 'Type', value: 'Prescription only' },
      { label: 'Results', value: 'Clinically proven' },
      { label: 'Monitored', value: 'By our doctor' },
    ],
    href: '/glp1',
  },
  {
    id: 'coolsculpting',
    name: 'CoolSculpting — Fat Freezing',
    tagline: 'The market-leading fat-freezing technology targets stubborn pockets that resist diet and exercise.',
    image: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
    stats: [
      { label: 'Downtime', value: 'None' },
      { label: 'Fat reduction', value: '10–26%' },
      { label: 'Results visible', value: '8–12 weeks' },
    ],
    href: '/packages',
  },
  {
    id: 'emsculpt-neo',
    name: 'EMSculpt NEO',
    tagline: 'High-intensity electromagnetic energy builds and tones muscle while simultaneously reducing fat in the treated area.',
    image: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
    stats: [
      { label: 'Muscle gain', value: '~25–30%' },
      { label: 'Fat reduction', value: '~25–30%' },
      { label: 'Sessions', value: '4 sessions' },
    ],
    href: '/packages',
  },
  {
    id: 'velashape',
    name: 'VelaShape III — Skin Tightening',
    tagline: 'Radiofrequency, infrared light and vacuum massage tighten loose skin and smooth cellulite-prone areas.',
    image: '/wix/87fc13_8e6b2be93835401caee6402885a0fb6c~mv2.jpg',
    stats: [
      { label: 'Downtime', value: 'None' },
      { label: 'Results in', value: '3–6 sessions' },
      { label: 'Feels like', value: 'Warm massage' },
    ],
    href: '/packages',
  },
  {
    id: 'lymphatic-drainage',
    name: 'Lymphatic Drainage',
    tagline: 'Compressive micro-vibration and specialist massage to reduce fluid retention, bloating and that heavy, puffy feeling.',
    image: '/wix/87fc13_440425b61c66444abe7e3062dbfcd290~mv2.jpg',
    stats: [
      { label: 'Downtime', value: 'None' },
      { label: 'Feeling', value: 'Immediate relief' },
      { label: 'Best with', value: 'Fat loss plan' },
    ],
    href: '/packages',
  },
];

/* ── Goal → treatment IDs ─────────────────────────────────────────────── */
const GOAL_TO_TREATMENTS: Record<string, string[]> = {
  'Lose weight':         ['medical-weight-loss', 'glp1'],
  'Reduce stubborn fat': ['coolsculpting', 'emsculpt-neo'],
  'Build muscle & tone': ['emsculpt-neo'],
  'Tighten loose skin':  ['velashape', 'emsculpt-neo'],
  'Reduce cellulite':    ['velashape', 'lymphatic-drainage'],
  'Reduce bloating':     ['lymphatic-drainage', 'medical-weight-loss'],
};

/* ── Area → treatment IDs ─────────────────────────────────────────────── */
const AREA_TO_TREATMENTS: Record<string, string[]> = {
  'Abdomen':      ['coolsculpting', 'emsculpt-neo'],
  'Love handles': ['coolsculpting'],
  'Arms':         ['coolsculpting', 'emsculpt-neo'],
  'Thighs':       ['coolsculpting', 'velashape'],
  'Double chin':  ['coolsculpting'],
  'Glutes':       ['emsculpt-neo'],
  'Knees':        ['velashape'],
  'Back':         ['coolsculpting'],
};

/* ── Recommendation logic ─────────────────────────────────────────────── */
function getRecommendations(
  goals: string[],
  areas: string[],
  medication: string,
): { id: string; matchedGoals: string[]; matchedAreas: string[] }[] {
  const scores = new Map<string, { score: number; goals: Set<string>; areas: Set<string> }>();

  const add = (id: string, score: number, goal?: string, area?: string) => {
    if (!scores.has(id)) scores.set(id, { score: 0, goals: new Set(), areas: new Set() });
    const e = scores.get(id)!;
    e.score += score;
    if (goal) e.goals.add(goal);
    if (area) e.areas.add(area);
  };

  goals.forEach((goal, idx) => {
    (GOAL_TO_TREATMENTS[goal] ?? []).forEach((id, rank) => {
      add(id, (goals.length - idx) * 3 + (2 - rank), goal);
    });
  });

  areas.forEach((area) => {
    (AREA_TO_TREATMENTS[area] ?? []).forEach((id, rank) => {
      add(id, 2 - rank, undefined, area);
    });
  });

  // If NOT open to medication → deprioritise GLP-1 significantly
  if (medication === 'No, I prefer non-medical') {
    const e = scores.get('glp1');
    if (e) e.score = -99;
  }

  // If YES to medication → boost GLP-1
  if (medication === 'Yes, I am interested') {
    const e = scores.get('glp1');
    if (e) e.score += 8;
    else add('glp1', 8);
  }

  return Array.from(scores.entries())
    .filter(([, e]) => e.score > 0)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4)
    .map(([id, e]) => ({ id, matchedGoals: Array.from(e.goals), matchedAreas: Array.from(e.areas) }));
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default async function SlimmingQuizResultsPage({
  searchParams,
}: {
  // Next.js 16: searchParams is a Promise and must be awaited before use.
  searchParams: Promise<{ goals?: string; areas?: string; medication?: string; name?: string }>;
}) {
  const sp = await searchParams;
  const selectedGoals = sp.goals
    ? sp.goals.split(',').map((g) => decodeURIComponent(g.trim()))
    : [];
  const selectedAreas = sp.areas
    ? sp.areas.split(',').map((a) => decodeURIComponent(a.trim()))
    : [];
  const medication = sp.medication ?? '';
  const firstName  = sp.name ?? '';

  const recs = getRecommendations(selectedGoals, selectedAreas, medication);

  const items = recs.length > 0
    ? recs
    : TREATMENTS.slice(0, 3).map((t) => ({ id: t.id, matchedGoals: [], matchedAreas: [] }));

  return (
    <main style={{ minHeight: '80vh', background: '#FFFFFF' }}>

      {/* ── Hero heading (bespoke hero with animated HeroMotif behind it) ── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(96px, 14vh, 132px) 24px 64px',
          // Hero radial sage wash, flowing down into white so the next section seam matches.
          background:
            'radial-gradient(120% 90% at 85% 8%, #eef3ea 0%, #f6f4ef 45%, #ffffff 100%)',
        }}
      >
        {/* soft brand glow bed (decorative) */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '-14%',
            right: '-6%',
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'rgba(142,176,147,0.26)',
            filter: 'blur(90px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* animated sage constellation motif — brand signature, reduced-motion safe */}
        <HeroMotif />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: wideFont, fontSize: '12px', letterSpacing: '3px', color: green, textTransform: 'uppercase', marginBottom: '14px' }}>
            {firstName ? `${firstName}, here are your results` : 'Your personalised results'}
          </p>
          <h1 style={{ fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(26px, 3vw, 35px)', lineHeight: 1.2, color: headGreen, textTransform: 'uppercase', margin: '0 0 18px' }}>
            Your Personalised Slimming Plan<br />Just For You
          </h1>
          <div style={{ width: '64px', height: '1px', backgroundColor: green, margin: '0 auto 20px' }} />
          {(selectedGoals.length > 0 || selectedAreas.length > 0) && (
            <p style={{ fontFamily: bodyFont, fontSize: '16px', color: bodyMuted, lineHeight: 1.6, maxWidth: 620, margin: '0 auto' }}>
              Based on your goals
              {selectedGoals.length > 0 && <> — <span style={{ color: headGreen, fontWeight: 500 }}>{selectedGoals.join(', ')}</span></>}
              {selectedAreas.length > 0 && <> — and focus areas: <span style={{ color: headGreen, fontWeight: 500 }}>{selectedAreas.join(', ')}</span></>}
              {' '}— our team has selected the treatments most suited to your needs.
            </p>
          )}
        </div>
      </section>

      {/* ── Recommendation cards ── */}
      {/* Gradient flows white → soft sage wash → white, so both seams match (no flat-colour band). */}
      <section
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f5f8f2 46%, #ffffff 100%)',
          padding: '64px 0 88px',
        }}
      >
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 24px' }}>
          {/* Section header pattern: eyebrow → 64px rule → Trajan H2 → sub */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontFamily: wideFont, fontSize: '12px', letterSpacing: '3px', color: green, textTransform: 'uppercase', margin: '0 0 16px' }}>
              Recommended for you
            </p>
            <div style={{ width: '64px', height: '1px', backgroundColor: green, margin: '0 auto 18px' }} />
            <h2 style={{ fontFamily: headingFont, fontWeight: 400, fontSize: 'clamp(24px, 3.4vw, 34px)', lineHeight: 1.25, color: headGreen, textTransform: 'uppercase', margin: 0 }}>
              Slimming &amp; Body Treatments in Malta
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {items.map(({ id, matchedGoals, matchedAreas }) => {
              const t = TREATMENTS.find((x) => x.id === id);
              if (!t) return null;

              return (
                <div
                  key={id}
                  className="card card-lift"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '240px 1fr',
                    overflow: 'hidden',
                    borderRadius: '20px',
                  }}
                >
                  {/* Image (light card — no dark overlay) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <div style={{ position: 'relative', minHeight: '260px', overflow: 'hidden' }}>
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '28px 30px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontFamily: headingFont, fontWeight: 400, fontSize: '20px', lineHeight: 1.3, color: headGreen, textTransform: 'uppercase', margin: '0 0 12px' }}>
                        {t.name}
                      </h3>
                      <p style={{ fontFamily: bodyFont, fontSize: '15px', color: bodyMuted, lineHeight: 1.6, margin: '0 0 18px' }}>
                        {t.tagline}
                      </p>

                      {(matchedGoals.length > 0 || matchedAreas.length > 0) && (
                        <div style={{ marginBottom: '20px' }}>
                          <p style={{ fontFamily: wideFont, fontSize: '11px', letterSpacing: '2px', color: green, textTransform: 'uppercase', margin: '0 0 8px' }}>
                            Matched to your goals
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {[...matchedGoals, ...matchedAreas].map((label) => (
                              <span key={label} style={{ fontFamily: bodyFont, fontSize: '12px', color: green, backgroundColor: '#EEF3EF', border: '1px solid #C8DDC9', borderRadius: '999px', padding: '4px 12px' }}>
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        {t.stats.map((s) => (
                          <div key={s.label} style={{ textAlign: 'center' }}>
                            <p style={{ fontFamily: headingFont, fontWeight: 400, fontSize: '17px', color: deepForest, margin: 0, lineHeight: 1.2 }}>{s.value}</p>
                            <p style={{ fontFamily: wideFont, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: bodyMuted, margin: '4px 0 0' }}>{s.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={t.href}
                      className="btn btn-secondary"
                      style={{ width: '100%', marginTop: '22px', padding: '13px', fontFamily: wideFont, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' }}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <p style={{ fontFamily: bodyFont, fontSize: '16px', color: bodyMuted, lineHeight: 1.6, maxWidth: 560, margin: '0 auto 22px' }}>
              Ready to start? Book a free body composition analysis with our medical team.
            </p>
            <Link
              href="/consultation"
              className="cta-glow"
              style={{ display: 'inline-block', padding: '15px 40px', color: '#FFFFFF', fontFamily: wideFont, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              Book a Free Body Analysis
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
