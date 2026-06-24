// Lightweight static search index for the Carisma Slimming marketing site.
// Small, curated, and shipped to the client — no backend needed for ~16 pages.
// `keywords` carry synonyms/brand terms (e.g. ozempic -> GLP-1) so real visitor
// queries resolve to the right page. Keep entries in sync when pages change.

export type SearchEntry = {
  title: string;
  url: string;
  description: string;
  keywords: string[];
};

export const SEARCH_INDEX: SearchEntry[] = [
  {
    title: 'Free Body Composition Analysis',
    url: '/consultation',
    description: 'Book your free, doctor-led body composition (Tanita) analysis in Malta.',
    keywords: [
      'consultation', 'book', 'booking', 'appointment', 'body analysis',
      'body composition', 'tanita', 'free analysis', 'free consultation',
      'contact', 'phone', 'email', 'location', 'opening hours', 'address',
    ],
  },
  {
    title: 'Weight Loss',
    url: '/weight-loss',
    description: "Malta's medically qualified weight loss and slimming programme.",
    keywords: [
      'weight loss', 'lose weight', 'slimming', 'slim', 'medical weight loss',
      'diet', 'programme', 'program', 'fat loss', 'lose fat',
    ],
  },
  {
    title: 'GLP-1 Weight Loss Injections',
    url: '/glp1',
    description: 'Doctor-prescribed GLP-1 medication for weight loss, when appropriate.',
    keywords: [
      'glp-1', 'glp1', 'glp 1', 'injections', 'injection', 'medication', 'jab',
      'ozempic', 'wegovy', 'mounjaro', 'saxenda', 'semaglutide', 'tirzepatide',
      'weight loss injection', 'appetite', 'medical weight loss',
    ],
  },
  {
    title: 'Slimming Guide',
    url: '/slimming-guide',
    description: 'Your bible to sustainable weight loss — meal plans and structure.',
    keywords: [
      'slimming guide', 'guide', 'ebook', 'e-book', 'meal plan', 'meal plans',
      'nutrition', 'diet plan', 'how to lose weight', 'eating', 'food',
    ],
  },
  {
    title: 'Packages & Treatments',
    url: '/packages',
    description: 'Body contouring and slimming treatment packages.',
    keywords: [
      'packages', 'package', 'treatments', 'treatment', 'prices', 'price',
      'pricing', 'cost', 'how much', 'body contouring', 'offers', 'deals',
    ],
  },
  {
    title: 'Fat Freezing',
    url: '/packages/fat-freezing',
    description: 'Cryolipolysis fat freezing to target stubborn fat.',
    keywords: ['fat freezing', 'freeze fat', 'cryolipolysis', 'cryo', 'coolsculpting', 'fat reduction', 'stubborn fat'],
  },
  {
    title: 'Fat Dissolving',
    url: '/packages/fat-dissolving',
    description: 'Fat dissolving injections for small, targeted areas.',
    keywords: ['fat dissolving', 'fat dissolve', 'aqualyx', 'deoxycholic', 'lipolysis', 'double chin', 'injections'],
  },
  {
    title: 'Muscle Stimulation',
    url: '/packages/muscle-stimulation',
    description: 'EMS muscle stimulation to tone and build muscle.',
    keywords: ['muscle stimulation', 'ems', 'emsculpt', 'muscle toning', 'tone', 'abs', 'build muscle', 'electrical'],
  },
  {
    title: 'Skin Tightening',
    url: '/packages/skin-tightening',
    description: 'Radiofrequency skin tightening for firmer, smoother skin.',
    keywords: ['skin tightening', 'tighten skin', 'radiofrequency', 'rf', 'firming', 'sagging skin', 'loose skin', 'firm'],
  },
  {
    title: 'Lipocavitation',
    url: '/packages/lipocavitation',
    description: 'Ultrasound cavitation for inch loss and body shaping.',
    keywords: ['lipocavitation', 'cavitation', 'ultrasound', 'inch loss', 'body shaping', 'lipo'],
  },
  {
    title: 'Anti-Cellulite',
    url: '/packages/anti-cellulite',
    description: 'Anti-cellulite treatments to smooth dimpled skin.',
    keywords: ['anti cellulite', 'anti-cellulite', 'cellulite', 'orange peel', 'smoothing', 'dimples', 'thighs'],
  },
  {
    title: 'Lymphatic Drainage',
    url: '/packages/lymphatic-drainage',
    description: 'Lymphatic drainage to reduce fluid retention and bloating.',
    keywords: ['lymphatic drainage', 'lymphatic', 'drainage', 'fluid retention', 'bloating', 'water retention', 'massage'],
  },
  {
    title: 'Careers',
    url: '/careers',
    description: 'Join the Carisma Slimming team — current vacancies.',
    keywords: ['careers', 'career', 'jobs', 'job', 'work with us', 'hiring', 'vacancies', 'apply', 'employment'],
  },
];

/**
 * Rank index entries against a query. Case-insensitive, token-based.
 * Scoring favours title hits, then exact keyword hits, then substring hits.
 */
export function searchSite(query: string, limit = 6): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = SEARCH_INDEX.map((entry) => {
    const title = entry.title.toLowerCase();
    const kw = entry.keywords;
    const hay = `${title} ${entry.description.toLowerCase()} ${kw.join(' ')}`;
    let score = 0;

    // Whole-query boosts
    if (title === q) score += 100;
    if (title.includes(q)) score += 40;
    if (kw.some((k) => k === q)) score += 60;
    if (kw.some((k) => k.includes(q))) score += 20;

    // Per-token scoring (so "freeze fat" matches "fat freezing")
    for (const t of tokens) {
      if (title.includes(t)) score += 12;
      if (kw.some((k) => k === t)) score += 14;
      else if (kw.some((k) => k.includes(t))) score += 6;
      else if (hay.includes(t)) score += 3;
    }
    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
