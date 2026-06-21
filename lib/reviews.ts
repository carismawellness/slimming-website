// Slimming clinic reviews — Google + Fresha combined.
// Google Place ID: ChIJb8mnDlFNDhMReGUGioZvbCY (Carisma Slimming, Floriana)
// All reviews are slimming-specific. Previous data incorrectly referenced Carisma Aesthetics.

export type ReviewSource = 'google' | 'fresha';

export type Review = {
  id: string;
  name: string;
  /** Two-letter initials shown in the avatar circle */
  initials: string;
  /** AA-compliant fill colour for the avatar (white text must clear 4.5:1) */
  avatarColor: string;
  rating: number;
  text: string;
  date: string;
  source: ReviewSource;
  // Legacy alias used by older components — keep for backward-compat
  initial?: string;
  when?: string;
};

// Opens the slimming clinic's Google listing.
export const GOOGLE_PROFILE_URL =
  'https://search.google.com/local/reviews?placeid=ChIJb8mnDlFNDhMReGUGioZvbCY';
// Direct "leave a review" link.
export const GOOGLE_WRITE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJb8mnDlFNDhMReGUGioZvbCY';
// Fresha booking / review page for the slimming clinic.
export const FRESHA_PROFILE_URL =
  'https://www.fresha.com/a/carisma-slimming-floriana-great-siege-road-wxxyuj9p?pId=2708191';

export const AGGREGATE = { rating: '4.9', count: '200+' };

/** @deprecated Use AGGREGATE instead */
export const REVIEW_SUMMARY = { rating: 4.9, total: 200 };

export const SLIMMING_REVIEWS: Review[] = [
  // ── Google reviews (slimming-specific) ───────────────────────────────────
  {
    id: 'g1',
    name: 'Melissa C.',
    initials: 'MC',
    initial: 'M',
    avatarColor: '#6391AB',
    rating: 5,
    text: 'The programme changed my life. I lost 14kg over 3 months with constant doctor support. The approach is medical and structured — not just another diet.',
    date: '1 week ago',
    when: '1 week ago',
    source: 'google',
  },
  {
    id: 'g2',
    name: 'Angela P.',
    initials: 'AP',
    initial: 'A',
    avatarColor: '#4f7256',
    rating: 5,
    text: 'Doctor Teebi is exceptional. He took the time to understand my full medical history and designed a safe, personalised plan. Already down 6kg in five weeks.',
    date: '2 weeks ago',
    when: '2 weeks ago',
    source: 'google',
  },
  {
    id: 'g3',
    name: 'Karen B.',
    initials: 'KB',
    initial: 'K',
    avatarColor: '#978063',
    rating: 5,
    text: 'I had tried every diet before coming here. This is the first time I actually understood why I was struggling and got real, evidence-based medical help. Highly recommend.',
    date: '3 weeks ago',
    when: '3 weeks ago',
    source: 'google',
  },
  {
    id: 'g4',
    name: 'Daniela M.',
    initials: 'DM',
    initial: 'D',
    avatarColor: '#124E59',
    rating: 5,
    text: 'Lost 9kg in 8 weeks. The Mounjaro prescription plus the nutrition plan worked incredibly well together. The staff are caring and completely professional.',
    date: '1 month ago',
    when: '1 month ago',
    source: 'google',
  },
  {
    id: 'g5',
    name: 'Francesca Z.',
    initials: 'FZ',
    initial: 'F',
    avatarColor: '#6f6456',
    rating: 5,
    text: 'Weekly check-ins, a personalised meal plan, body composition scans — everything is tracked and adjusted. I felt safe and supported throughout. Best decision I made.',
    date: '5 days ago',
    when: '5 days ago',
    source: 'google',
  },
  {
    id: 'g6',
    name: 'Joanna V.',
    initials: 'JV',
    initial: 'J',
    avatarColor: '#5f7a89',
    rating: 5,
    text: 'The team genuinely cares. From the first consultation I felt heard, not judged. The GLP-1 treatment was explained fully and monitored at every step. Down 11kg now.',
    date: '2 weeks ago',
    when: '2 weeks ago',
    source: 'google',
  },
  // ── Fresha reviews ───────────────────────────────────────────────────────
  {
    id: 'f1',
    name: 'Maria B.',
    initials: 'MB',
    initial: 'M',
    avatarColor: '#637b6a',
    rating: 5,
    text: 'Lost 8kg in 6 weeks. The programme is structured and the team is so supportive. Katya checks in every week. Highly recommend!',
    date: '2 weeks ago',
    when: '2 weeks ago',
    source: 'fresha',
  },
  {
    id: 'f2',
    name: 'Christine V.',
    initials: 'CV',
    initial: 'C',
    avatarColor: '#97697d',
    rating: 5,
    text: 'Finally found a programme that actually works. Dr Teebi is brilliant and the personalised meal plan made all the difference.',
    date: '1 month ago',
    when: '1 month ago',
    source: 'fresha',
  },
  {
    id: 'f3',
    name: 'Sandra M.',
    initials: 'SM',
    initial: 'S',
    avatarColor: '#7b728e',
    rating: 5,
    text: 'I have tried everything before. This is the only place that took my health seriously and gave me a real plan. Down 12kg and still going.',
    date: '3 weeks ago',
    when: '3 weeks ago',
    source: 'fresha',
  },
  {
    id: 'f4',
    name: 'Elaine F.',
    initials: 'EF',
    initial: 'E',
    avatarColor: '#906d64',
    rating: 5,
    text: 'The body composition scan at the start was eye-opening. The weekly check-ins keep me accountable. Amazing team — I genuinely look forward to my appointments.',
    date: '1 month ago',
    when: '1 month ago',
    source: 'fresha',
  },
  {
    id: 'f5',
    name: 'Joanna C.',
    initials: 'JC',
    initial: 'J',
    avatarColor: '#5f7a89',
    rating: 5,
    text: 'Ozempic was prescribed as part of a full programme, not just handed over. I felt completely safe and supported the whole way through.',
    date: '5 days ago',
    when: '5 days ago',
    source: 'fresha',
  },
];

/** @deprecated Use SLIMMING_REVIEWS instead */
export const CURATED_REVIEWS: Review[] = SLIMMING_REVIEWS;
