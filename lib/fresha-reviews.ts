// Carisma Slimming — Fresha reviews for the two-row marquee.
//
// Aggregate (verified from the clinic's public Fresha profile): 4.8 · 509 reviews.
// Fresha's PUBLIC profile only exposes ~6 individual reviews, so the entries below
// are the genuinely-available ones. To fill both rows with more variety, export
// your reviews from the Fresha PARTNER dashboard and paste them here in the same
// shape — do NOT invent reviews (this is a medical site; fabricated testimonials
// are a legal/policy risk). The marquee loops whatever is provided.

export type FreshaReview = {
  id: string;
  name: string;
  initials: string;
  rating: number;
  /** Optional — many Fresha reviews are rating-only. Card adapts when empty. */
  text?: string;
};

export const FRESHA_PROFILE = {
  rating: '4.8',
  count: '509',
  url: 'https://www.fresha.com/a/carisma-slimming-floriana-great-siege-road-wxxyuj9p?pId=2708191',
};

// Real, verbatim reviews currently visible on the public Fresha profile.
export const FRESHA_REVIEWS: FreshaReview[] = [
  { id: 'f-pietro', name: 'Pietro F', initials: 'PF', rating: 5, text: 'Professional and kind.' },
  { id: 'f-nathalie', name: 'Nathalie A', initials: 'NA', rating: 5 },
  { id: 'f-nicola', name: 'Nicola', initials: 'N', rating: 5 },
  { id: 'f-alis', name: 'Alis T', initials: 'AT', rating: 5 },
  { id: 'f-lawrence', name: 'Lawrence C', initials: 'LC', rating: 4 },
  // ⬇️ Paste your Fresha partner-dashboard export below (same shape) to fill the rows.
];
