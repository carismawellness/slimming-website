import { NextResponse } from 'next/server';

/**
 * Real Google reviews for the Carisma Slimming clinic, served from the server so
 * the API key never reaches the browser. Uses the Google Places API (New)
 * Place Details endpoint, which returns up to 5 reviews with real author
 * attribution, ratings, Google's own dynamic "x weeks ago" string, and a
 * per-review source link.
 *
 * Requires env var GOOGLE_PLACES_API_KEY (a Google Cloud key with the
 * "Places API (New)" enabled). Without it, returns a safe fallback so the UI
 * can link to the live listing instead of showing anything fabricated.
 *
 * Cached/revalidated daily — keeps reviews fresh without per-request API cost,
 * and stays within Google's caching terms (no caching beyond 30 days).
 */

const PLACE_ID = 'ChIJgVdYYmhFDhMR8oSHh_7gYX4'; // Carisma Slimming clinic (brand 3)
const PROFILE_URL = `https://search.google.com/local/reviews?placeid=${PLACE_ID}`;

// Revalidate this route's cached response once per day.
export const revalidate = 86400;

export type ApiReview = {
  id: string;
  name: string;
  photo: string | null;
  /** Link that opens the review at its source (reviewer profile or the listing). */
  sourceUrl: string;
  rating: number;
  text: string;
  /** Google's dynamic relative date, e.g. "2 weeks ago". */
  relativeDate: string;
  publishTime: string | null;
};

export type ReviewsPayload = {
  reviews: ApiReview[];
  rating: number | null;
  count: number | null;
  profileUrl: string;
  /** true when no key / API error — UI should link out instead of showing cards. */
  fallback: boolean;
};

const FALLBACK: ReviewsPayload = {
  reviews: [],
  rating: null,
  count: null,
  profileUrl: PROFILE_URL,
  fallback: true,
};

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    return NextResponse.json(FALLBACK);
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': [
          'displayName',
          'rating',
          'userRatingCount',
          'googleMapsUri',
          'reviews.authorAttribution',
          'reviews.rating',
          'reviews.text',
          'reviews.originalText',
          'reviews.relativePublishTimeDescription',
          'reviews.publishTime',
        ].join(','),
        'Accept-Language': 'en',
      },
      next: { revalidate },
    });

    if (!res.ok) {
      return NextResponse.json(FALLBACK);
    }

    const data = await res.json();
    const listingUrl: string = data.googleMapsUri || PROFILE_URL;

    type RawReview = {
      authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
      rating?: number;
      text?: { text?: string };
      originalText?: { text?: string };
      relativePublishTimeDescription?: string;
      publishTime?: string;
    };

    const reviews: ApiReview[] = ((data.reviews as RawReview[]) ?? [])
      .map((r, i) => ({
        id: `g${i}`,
        name: r.authorAttribution?.displayName?.trim() || 'Google user',
        photo: r.authorAttribution?.photoUri ?? null,
        sourceUrl: r.authorAttribution?.uri || listingUrl,
        rating: typeof r.rating === 'number' ? r.rating : 5,
        text: (r.text?.text || r.originalText?.text || '').trim(),
        relativeDate: r.relativePublishTimeDescription ?? '',
        publishTime: r.publishTime ?? null,
      }))
      .filter((r) => r.text.length > 0);

    return NextResponse.json({
      reviews,
      rating: typeof data.rating === 'number' ? data.rating : null,
      count: typeof data.userRatingCount === 'number' ? data.userRatingCount : null,
      profileUrl: listingUrl,
      fallback: false,
    } satisfies ReviewsPayload);
  } catch {
    return NextResponse.json(FALLBACK);
  }
}
