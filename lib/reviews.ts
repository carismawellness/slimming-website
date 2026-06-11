// Google reviews for the slimming site — mirrors the Carisma Aesthetics setup.
//
// These are the REAL reviews read from the clinic's live Google Reviews widget
// (Elfsight, Google place ChIJb8mnDlFNDhMReGUGioZvbCY). The aggregate score and
// total mirror the live listing. <GoogleReviews> renders them in a styled grid.

export type Review = {
  name: string;
  initial: string;
  rating: number;
  text: string;
  when: string;
};

export const REVIEW_SUMMARY = {
  rating: 4.7,
  total: 303,
};

// Opens the clinic's Google listing where the full review list lives.
export const GOOGLE_PROFILE_URL =
  'https://search.google.com/local/reviews?placeid=ChIJb8mnDlFNDhMReGUGioZvbCY';
// Direct "leave a review" link.
export const GOOGLE_WRITE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJb8mnDlFNDhMReGUGioZvbCY';

export const CURATED_REVIEWS: Review[] = [
  {
    name: 'Reuben Cutajar',
    initial: 'R',
    rating: 5,
    when: '2 days ago',
    text: 'Excellent experience at Carisma Aesthetics. Letizia was highly professional, attentive, and ensured I felt comfortable throughout my laser treatment. The clinic offers a welcoming and relaxing environment, and the quality of service was outstanding. Highly recommended.',
  },
  {
    name: 'Alison Zammit',
    initial: 'A',
    rating: 5,
    when: '4 days ago',
    text: 'Dr. Francesca is simply amazing. Botox services made by a professional doctor no pain and no bruises.',
  },
  {
    name: 'Melanie Vella',
    initial: 'M',
    rating: 5,
    when: '18 days ago',
    text: 'I had a great experience at this clinic. The staff were welcoming, and the practitioner was professional, attentive, and explained everything clearly. The Botox treatment was quick and nearly painless, with natural, refreshed results. They clearly know what they’re doing and care about their clients. Highly recommend, I’ll definitely be back!',
  },
  {
    name: 'Crossey Micallef',
    initial: 'C',
    rating: 5,
    when: '12 days ago',
    text: 'The treatment was done with great care and the lips results are amazing. Highly recommended!',
  },
  {
    name: 'Ronnalie Parungao',
    initial: 'R',
    rating: 5,
    when: '16 days ago',
    text: 'I wanted to take a moment to express my gratitude for your guidance during my recent consultation. Your opinion truly made an impact on my decision-making process. I appreciate your honesty in suggesting alternative options, which have made me feel much more secure about the procedures I am considering. Thank you for your expertise and for caring about my well-being. I feel much more informed and confident moving forward.',
  },
  {
    name: 'L Ciantar',
    initial: 'L',
    rating: 5,
    when: '2 days ago',
    text: 'Left a 5-star rating. Excellent!',
  },
];
