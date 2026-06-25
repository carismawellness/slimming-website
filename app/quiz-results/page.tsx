import type { Metadata } from 'next';
import QuizResultsClient, { type SlimmingRec } from '@/components/quiz/QuizResultsClient';

export const metadata: Metadata = {
  title: 'Your Personalised Results | Carisma Slimming',
  robots: { index: false, follow: true },
};

/* ── Treatment catalogue ──────────────────────────────────────────────── */
const TREATMENTS = [
  {
    id: 'medical-weight-loss',
    name: 'Medical Weight Loss Program',
    tagline: 'Our medical team assesses your metabolic profile, hormonal status and health history to build a bespoke weight loss programme — combining dietary structure, lifestyle coaching and, where appropriate, prescription support.',
    image: '/wix/87fc13_a965179046514c2a8ad7bec0b7f44127~mv2.jpg',
    stats: [
      { label: 'Supervised by', value: 'Medical Doctor' },
      { label: 'Weekly loss', value: '0.5–1 kg/week' },
      { label: 'Support', value: 'Weekly check-ins' },
    ],
    href: '/weight-loss',
  },
  {
    id: 'glp1',
    name: 'GLP-1 Prescription (Ozempic / Mounjaro)',
    tagline: 'GLP-1 receptor agonists suppress appetite and slow gastric emptying at the hormonal level — prescribed and monitored by our doctors when clinically appropriate, with up to 15–20% total body weight reduction demonstrated in clinical trials.',
    image: '/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.webp',
    stats: [
      { label: 'Weight reduction', value: '15–20% TBW' },
      { label: 'Type', value: 'Prescription only' },
      { label: 'Monitored by', value: 'Our doctor' },
    ],
    href: '/glp1',
  },
  {
    id: 'coolsculpting',
    name: 'CoolSculpting — Fat Freezing',
    tagline: 'CoolSculpting® uses controlled cryolipolysis to permanently destroy stubborn fat cells in targeted areas — diet-resistant pockets that respond poorly to exercise — with 10–26% fat reduction per cycle confirmed by clinical studies.',
    image: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
    stats: [
      { label: 'Fat reduction', value: '10–26%' },
      { label: 'Results visible', value: '8–12 weeks' },
      { label: 'Downtime', value: 'None' },
    ],
    href: '/packages',
  },
  {
    id: 'emsculpt-neo',
    name: 'EMSculpt NEO',
    tagline: 'The only device clinically proven to simultaneously build muscle (+25%) and reduce fat (–25%) in a single session — high-intensity electromagnetic energy forces 20,000 muscle contractions in 30 minutes, reshaping the body from within.',
    image: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
    stats: [
      { label: 'Muscle gain', value: '~25%' },
      { label: 'Fat reduction', value: '~25%' },
      { label: 'Sessions', value: '4 x 30 min' },
    ],
    href: '/packages',
  },
  {
    id: 'velashape',
    name: 'VelaShape III — Skin Tightening',
    tagline: 'VelaShape III combines radiofrequency, infrared light and mechanical vacuum massage to heat and remodel the fibrous septae responsible for cellulite, while tightening loose skin and improving lymphatic circulation in treated areas.',
    image: '/wix/87fc13_8e6b2be93835401caee6402885a0fb6c~mv2.jpg',
    stats: [
      { label: 'Sessions', value: '3–6 treatments' },
      { label: 'Downtime', value: 'None' },
      { label: 'Feels like', value: 'Warm massage' },
    ],
    href: '/packages',
  },
  {
    id: 'lymphatic-drainage',
    name: 'Lymphatic Drainage',
    tagline: 'Specialist compressive massage and micro-vibration accelerate lymphatic flow, reducing fluid retention, swelling and that heavy, puffy feeling — particularly effective as an adjunct to a fat loss or post-treatment recovery programme.',
    image: '/wix/87fc13_440425b61c66444abe7e3062dbfcd290~mv2.jpg',
    stats: [
      { label: 'Downtime', value: 'None' },
      { label: 'Effect', value: 'Immediate relief' },
      { label: 'Best combined with', value: 'Fat loss plan' },
    ],
    href: '/packages',
  },
] as const;

/* ── Goal -> treatment clinical weights ───────────────────────────────
   5 = first-line gold standard  |  4 = strong second-line
   3 = good moderate-evidence    |  2 = mild/secondary
   1 = incidental/adjunct only   |  omit = not indicated
   ──────────────────────────────────────────────────────────────────── */
const GOAL_WEIGHTS: Record<string, Record<string, number>> = {
  'Lose weight': {
    'medical-weight-loss': 5, // comprehensive medical management — gold standard
    'glp1':                5, // GLP-1 agonists: 15-20% total body weight reduction
    'lymphatic-drainage':  1, // adjunct support only; does not reduce fat mass
  },
  'Reduce stubborn fat': {
    'coolsculpting':       5, // cryolipolysis: 10-26% fat reduction per cycle
    'emsculpt-neo':        4, // simultaneous fat reduction + muscle building
    'medical-weight-loss': 2, // systemic plan assists reduction of overall fat
  },
  'Build muscle & tone': {
    'emsculpt-neo': 5, // only device clinically proven to hypertrophy muscle
    'velashape':    1, // minor surface toning effect only
  },
  'Tighten loose skin': {
    'velashape':    5, // RF + IR + vacuum: primary evidence-based skin laxity device
    'emsculpt-neo': 3, // muscle volume beneath skin improves apparent tone
  },
  'Reduce cellulite': {
    'velashape':          5, // RF disrupts fibrous septae + addresses fluid component
    'lymphatic-drainage': 3, // reduces the fluid and inflammatory component of cellulite
    'coolsculpting':      1, // mild improvement where fat component dominates
  },
  'Reduce bloating': {
    'lymphatic-drainage':  5, // accelerates lymph flow; reduces fluid retention
    'medical-weight-loss': 3, // dietary and GI guidance integral to the programme
    'velashape':           1, // vacuum massage has mild lymphatic drainage benefit
  },
};

/* ── Area -> treatment clinical weights ───────────────────────────────── */
const AREA_WEIGHTS: Record<string, Record<string, number>> = {
  'Abdomen': {
    'coolsculpting': 5, // most clinical data in the abdominal area
    'emsculpt-neo':  5, // abdomen is the primary EMSculpt NEO indication
    'velashape':     3, // skin tightening post fat-loss
  },
  'Love handles': {
    'coolsculpting': 5, // flanks are a classic CoolSculpting applicator area
    'emsculpt-neo':  3, // flank applicator available
  },
  'Arms': {
    'coolsculpting': 4, // upper arm fat reduction
    'emsculpt-neo':  4, // arm muscle toning and fat reduction
    'velashape':     2, // skin tightening on upper arms
  },
  'Thighs': {
    'coolsculpting': 4, // inner and outer thigh fat reduction
    'velashape':     5, // thighs are the prime VelaShape treatment area
    'lymphatic-drainage': 2, // thigh fluid and cellulite support
  },
  'Double chin': {
    'coolsculpting': 5, // CoolMini applicator designed specifically for submental area
  },
  'Glutes': {
    'emsculpt-neo': 5, // gluteal toning is a primary EMSculpt use case
    'velashape':    3, // skin lifting and tightening on glutes
  },
  'Knees': {
    'velashape':     5, // inner knee fat and skin laxity — specific VelaShape indication
    'coolsculpting': 2, // limited evidence for knee area
  },
  'Back': {
    'coolsculpting': 5, // bra roll and back fat area
    'emsculpt-neo':  2, // back applicator available
  },
};

/* ── Scoring & normalisation ─────────────────────────────────────────── */
function getRecommendations(
  goals: string[],
  areas: string[],
  medication: string,
): SlimmingRec[] {
  const scores = new Map<string, { score: number; goals: Set<string>; areas: Set<string> }>();

  const add = (id: string, pts: number, goal?: string, area?: string) => {
    if (!scores.has(id)) scores.set(id, { score: 0, goals: new Set(), areas: new Set() });
    const e = scores.get(id)!;
    e.score += pts;
    if (goal) e.goals.add(goal);
    if (area) e.areas.add(area);
  };

  // Priority multipliers: earlier goals carry more clinical weight
  const PRIORITY = [1.5, 1.25]; // index 0 -> 1.5x, index 1 -> 1.25x, rest -> 1.0x

  goals.forEach((goal, idx) => {
    const weights = GOAL_WEIGHTS[goal] ?? {};
    const multiplier = PRIORITY[idx] ?? 1.0;
    for (const [id, weight] of Object.entries(weights)) {
      add(id, weight * multiplier, goal);
    }
  });

  areas.forEach((area) => {
    const weights = AREA_WEIGHTS[area] ?? {};
    for (const [id, weight] of Object.entries(weights)) {
      add(id, weight, undefined, area);
    }
  });

  // Medication preference handling
  if (medication === 'No, I prefer non-medical') {
    // Patient explicitly opts out of any medical/prescription intervention
    for (const id of ['glp1', 'medical-weight-loss']) {
      const e = scores.get(id);
      if (e) e.score = -99;
    }
  } else if (medication === 'Yes, I am interested') {
    // Patient is open to GLP-1 — boost to ensure it surfaces
    const e = scores.get('glp1');
    if (e) e.score += 8;
    else add('glp1', 8);
  }
  // 'Not sure' -> no adjustment; doctor will discuss in consultation

  const ranked = Array.from(scores.entries())
    .filter(([, e]) => e.score > 0)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 4);

  const maxScore = ranked[0]?.[1]?.score ?? 1;
  const hasEnoughSignal = goals.length >= 2;

  const result: SlimmingRec[] = [];
  for (const [id, e] of ranked) {
    const treatment = TREATMENTS.find((t) => t.id === id);
    if (!treatment) continue;

    // Scale 72-100%; guarantee >=97% for top pick when signal is strong
    let matchPct = Math.round(72 + (e.score / maxScore) * 28);
    if (result.length === 0 && hasEnoughSignal && matchPct < 97) matchPct = 97;

    result.push({
      id: treatment.id,
      name: treatment.name,
      tagline: treatment.tagline,
      image: treatment.image,
      stats: [...treatment.stats],
      href: treatment.href,
      matchedGoals: Array.from(e.goals),
      matchedAreas: Array.from(e.areas),
      matchPct,
    });
  }
  return result;
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default async function SlimmingQuizResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ goals?: string; areas?: string; medication?: string; name?: string }>;
}) {
  const sp = await searchParams;

  const goals      = sp.goals    ? sp.goals.split(',').map((g) => decodeURIComponent(g.trim()))    : [];
  const areas      = sp.areas    ? sp.areas.split(',').map((a) => decodeURIComponent(a.trim()))    : [];
  const medication = sp.medication ? decodeURIComponent(sp.medication) : '';
  const firstName  = sp.name ? decodeURIComponent(sp.name) : '';

  let recs = getRecommendations(goals, areas, medication);

  /* Fallback: first 3 treatments with 80% match if nothing scored */
  if (recs.length === 0) {
    recs = TREATMENTS.slice(0, 3).map((t) => ({
      id: t.id,
      name: t.name,
      tagline: t.tagline,
      image: t.image,
      stats: [...t.stats],
      href: t.href,
      matchedGoals: [] as string[],
      matchedAreas: [] as string[],
      matchPct: 80,
    }));
  }

  return (
    <QuizResultsClient
      firstName={firstName}
      goals={goals}
      areas={areas}
      recs={recs}
    />
  );
}
