import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Your Quiz Results | Carisma Slimming",
  robots: { index: false, follow: true },
};

/* ── Brand tokens ─────────────────────────────────────────────────────── */
const headingFont = 'Trajan Pro, serif';
const wideFont    = 'Novecento Wide Book, sans-serif';
const bodyFont    = 'Roboto, sans-serif';
// Accessible taupe (locked palette TAUPE token): #6f6456 clears AA on white (5.78:1) and cream (5.20:1)
const taupe       = '#6f6456';
// taupeLight darkened to the same accessible taupe so muted text also clears AA (was #AFA39D, 2.2-2.5:1 FAIL)
const taupeLight  = '#6f6456';
// Deep sage (brand-green-text/fill): #4f7256 clears AA as tag text on #EEF3EF (4.83:1) and as CTA fill under white text (5.42:1). Bright #8EB093 stays decorative only.
const green       = '#4f7256';
const cream       = '#F0F4EE';

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
    image: '/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.png',
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
export default function SlimmingQuizResultsPage({
  searchParams,
}: {
  searchParams: { goals?: string; areas?: string; medication?: string; name?: string };
}) {
  const selectedGoals = searchParams.goals
    ? searchParams.goals.split(',').map((g) => decodeURIComponent(g.trim()))
    : [];
  const selectedAreas = searchParams.areas
    ? searchParams.areas.split(',').map((a) => decodeURIComponent(a.trim()))
    : [];
  const medication = searchParams.medication ?? '';
  const firstName  = searchParams.name ?? '';

  const recs = getRecommendations(selectedGoals, selectedAreas, medication);

  const items = recs.length > 0
    ? recs
    : TREATMENTS.slice(0, 3).map((t) => ({ id: t.id, matchedGoals: [], matchedAreas: [] }));

  return (
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '80vh' }}>

      {/* ── Hero heading ── */}
      <section style={{ backgroundColor: cream, padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          {firstName && (
            <p style={{ fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', color: taupeLight, textTransform: 'uppercase', marginBottom: '12px' }}>
              {firstName}, here are your results
            </p>
          )}
          <h1 style={{ fontFamily: headingFont, fontWeight: 400, fontSize: '32px', lineHeight: '1.3', color: taupe, textTransform: 'uppercase', marginBottom: '16px' }}>
            Your Personalised Slimming Plan<br />Just For You
          </h1>
          <div style={{ width: '80px', height: '1px', backgroundColor: '#C9D8C1', margin: '0 auto 20px' }} />
          {(selectedGoals.length > 0 || selectedAreas.length > 0) && (
            <p style={{ fontFamily: bodyFont, fontSize: '15px', color: taupeLight, lineHeight: 1.6 }}>
              Based on your goals
              {selectedGoals.length > 0 && <> — <span style={{ color: taupe, fontWeight: 500 }}>{selectedGoals.join(', ')}</span></>}
              {selectedAreas.length > 0 && <> — and focus areas: <span style={{ color: taupe, fontWeight: 500 }}>{selectedAreas.join(', ')}</span></>}
              {' '}— our team has selected the treatments most suited to your needs.
            </p>
          )}
        </div>
      </section>

      {/* ── Recommendation cards ── */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <h2 style={{ fontFamily: headingFont, fontWeight: 400, fontSize: '24px', lineHeight: '1.3', color: taupe, textTransform: 'uppercase', textAlign: 'center', marginBottom: '32px' }}>
          Recommended Slimming &amp; Body Treatments in Malta
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {items.map(({ id, matchedGoals, matchedAreas }) => {
            const t = TREATMENTS.find((x) => x.id === id);
            if (!t) return null;

            return (
              <div
                key={id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr',
                  border: '1px solid #DDE8DB',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                  <img
                    src={t.image}
                    alt={t.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: headingFont, fontWeight: 400, fontSize: '20px', color: taupe, textTransform: 'uppercase', marginBottom: '10px' }}>
                      {t.name}
                    </h3>
                    <p style={{ fontFamily: bodyFont, fontSize: '14px', color: taupeLight, lineHeight: 1.6, marginBottom: '18px' }}>
                      {t.tagline}
                    </p>

                    {(matchedGoals.length > 0 || matchedAreas.length > 0) && (
                      <div style={{ marginBottom: '18px' }}>
                        <p style={{ fontFamily: wideFont, fontSize: '11px', letterSpacing: '1.5px', color: taupe, textTransform: 'uppercase', marginBottom: '8px' }}>
                          Matched to your goals
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {[...matchedGoals, ...matchedAreas].map((label) => (
                            <span key={label} style={{ fontFamily: bodyFont, fontSize: '12px', color: green, backgroundColor: '#EEF3EF', border: '1px solid #C8DDC9', borderRadius: '20px', padding: '3px 10px' }}>
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                      {t.stats.map((s) => (
                        <div key={s.label} style={{ textAlign: 'center' }}>
                          <p style={{ fontFamily: wideFont, fontSize: '13px', color: taupe, fontWeight: 600, margin: 0 }}>{s.value}</p>
                          <p style={{ fontFamily: bodyFont, fontSize: '11px', color: taupeLight, margin: 0 }}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={t.href}
                    style={{ display: 'block', textAlign: 'center', marginTop: '20px', padding: '13px', backgroundColor: cream, fontFamily: wideFont, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', color: taupe, border: '1px solid #C9D8C1', borderRadius: '6px', textDecoration: 'none' }}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '52px' }}>
          <p style={{ fontFamily: bodyFont, fontSize: '15px', color: taupeLight, marginBottom: '20px' }}>
            Ready to start? Book a free consultation with our medical team.
          </p>
          <Link
            href="/consultation"
            className="cta-glow"
            style={{ display: 'inline-block', padding: '15px 40px', backgroundColor: green, color: '#FFFFFF', fontFamily: wideFont, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '999px', textDecoration: 'none' }}
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
