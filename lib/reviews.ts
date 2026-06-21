// Carisma Slimming — REAL Google reviews for the slimming clinic.
//
// Data source: the clinic's verified Google Business Profile (place ID below),
// captured by the Cockpit reviews ETL. These are genuine customer reviews — no
// fabricated names, copy, or dates. The relative date ("x weeks ago") is computed
// dynamically from each review's publish timestamp, so it never goes stale.
//
// Slimming clinic Google place ID: ChIJgVdYYmhFDhMR8oSHh_7gYX4
// (NOTE: the previous ChIJb8mnDlFNDhMReGUGioZvbCY pointed at a Spa location — fixed.)

export type ReviewSource = 'google' | 'fresha';

export type Review = {
  id: string;
  name: string;
  /** Two-letter initials shown in the avatar circle */
  initials: string;
  /** AA-compliant fill colour for the avatar (white text clears 4.5:1) */
  avatarColor: string;
  rating: number;
  text: string;
  /** ISO publish timestamp — relative date is computed from this at render. */
  publishedAt: string;
  /** Opens the review at its source (the clinic's Google reviews listing). */
  sourceUrl: string;
  source: ReviewSource;
  // Legacy aliases kept for backward-compat with older components.
  initial?: string;
  date?: string;
  when?: string;
};

const PLACE_ID = 'ChIJgVdYYmhFDhMR8oSHh_7gYX4';

// The clinic's Google reviews listing — used as each review's "source" link.
export const GOOGLE_PROFILE_URL = `https://search.google.com/local/reviews?placeid=${PLACE_ID}`;
// Direct "leave a review" link.
export const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;
// Fresha booking page for the slimming clinic.
export const FRESHA_PROFILE_URL =
  'https://www.fresha.com/a/carisma-slimming-floriana-great-siege-road-wxxyuj9p?pId=2708191';

// Real aggregate from the clinic's Google profile (snapshot; refresh via ETL).
export const AGGREGATE = { rating: '5.0', count: '18' };

/** @deprecated Use AGGREGATE instead */
export const REVIEW_SUMMARY = { rating: 5.0, total: 18 };

/**
 * Convert an ISO timestamp to a Google-style relative date ("x weeks ago").
 * Computed at render so reviews always read as fresh, never outdated.
 */
export function relativeDate(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const days = Math.max(0, Math.floor((Date.now() - then) / 86_400_000));
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks === 1 ? 'a week ago' : `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? 'a month ago' : `${months} months ago`;
  const years = Math.floor(days / 365);
  return years === 1 ? 'a year ago' : `${years} years ago`;
}

// ── Real Google reviews (verbatim, slimming clinic) ─────────────────────────
export const SLIMMING_REVIEWS: Review[] = [
  {
    id: 'g-italia-le',
    name: 'Italia Le',
    initials: 'IL',
    initial: 'I',
    avatarColor: '#4f7256',
    rating: 5,
    text: "I bought a package for a treatment and I met Brunna. She is amazing, knowledgeable and kind, and really made the difference to the experience. This type of treatments works well, because of the operator's skill and capability. I already purchased another package so I highly recommended.",
    publishedAt: '2026-05-22T13:13:26Z',
    sourceUrl: GOOGLE_PROFILE_URL,
    source: 'google',
  },
  {
    id: 'g-lorraine-galea',
    name: 'Lorraine Galea',
    initials: 'LG',
    initial: 'L',
    avatarColor: '#124E59',
    rating: 5,
    text: "I'm having a great experience with Carisma Slimming. The team is professional, understanding, and truly focused on my personal goals, guiding me in a way that feels supportive and tailored. A special thank you to Diana, who is a sweetheart during my appointments and always makes me feel comfortable.",
    publishedAt: '2026-03-02T17:01:58Z',
    sourceUrl: GOOGLE_PROFILE_URL,
    source: 'google',
  },
  {
    id: 'g-fernanda-muniz',
    name: 'Fernanda Muniz',
    initials: 'FM',
    initial: 'F',
    avatarColor: '#024C27',
    rating: 5,
    text: 'very nice place with very nice treatment; Dr Anni Casotti was super attentive, care and kind to explain everything clearly!',
    publishedAt: '2026-02-20T16:07:15Z',
    sourceUrl: GOOGLE_PROFILE_URL,
    source: 'google',
  },
  {
    id: 'g-priscila-guedes',
    name: 'Priscila Guedes',
    initials: 'PG',
    initial: 'P',
    avatarColor: '#6f6456',
    rating: 5,
    text: 'I had already had some procedures done at the clinic, and the last time I went, Anne take care of me and she was very attentive and professional. I have another appointment scheduled for soon and I hope I will enjoy it too.',
    publishedAt: '2026-02-20T15:33:36Z',
    sourceUrl: GOOGLE_PROFILE_URL,
    source: 'google',
  },
  {
    id: 'g-mavis-sammut',
    name: 'Mavis Sammut',
    initials: 'MS',
    initial: 'M',
    avatarColor: '#5a5043',
    rating: 5,
    text: "I'd lost weight and I was proud of it, but I still didn't feel fully confident because my skin didn't look as firm as I wanted. I was nervous skin tightening would be uncomfortable, but it honestly just felt like a warm, deep massage. After just a couple of sessions I could already see my skin looking tighter and smoother — a really natural-looking upgrade to the results I'd already worked for.",
    publishedAt: '2026-02-11T11:35:49Z',
    sourceUrl: GOOGLE_PROFILE_URL,
    source: 'google',
  },
];
