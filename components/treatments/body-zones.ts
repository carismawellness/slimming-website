/**
 * Body-zone data for the TreatmentBodyMap visualisation.
 *
 * Coordinates are expressed in a normalised "body space" where (0,0) is the
 * top-left of the silhouette's bounding box and (1,1) is the bottom-right.
 * The same coordinates drive BOTH the accessible SVG layer and the decorative
 * Three.js glow layer, so the two are always perfectly aligned regardless of
 * the rendered pixel size.
 *
 * `side: 'L' | 'R' | 'C'` is only used to decide which way a connector/label
 * leans so the editorial labels stay clear of the body.
 */

export type ZoneSide = 'L' | 'R' | 'C';

export interface BodyZone {
  /** Stable key (used for React keys + label ids). */
  key: string;
  /** Human label shown in the DOM + read by screen readers. */
  label: string;
  /** Normalised x in body space (0 = left edge, 1 = right edge). */
  x: number;
  /** Normalised y in body space (0 = top/head, 1 = bottom/feet). */
  y: number;
  /** Relative marker radius in body-space units (~0.06–0.12). */
  r: number;
  /** Which side the label/connector leans. */
  side: ZoneSide;
}

/**
 * Canonical anatomical anchor points on the front-facing silhouette.
 * Tuned to sit on the body drawn by `BODY_SILHOUETTE_PATH`.
 */
const ANCHORS = {
  doubleChin: { x: 0.5, y: 0.135, r: 0.05 },
  jawline: { x: 0.5, y: 0.115, r: 0.055 },
  upperArmL: { x: 0.235, y: 0.395, r: 0.07 },
  upperArmR: { x: 0.765, y: 0.395, r: 0.07 },
  armsL: { x: 0.21, y: 0.45, r: 0.075 },
  armsR: { x: 0.79, y: 0.45, r: 0.075 },
  back: { x: 0.5, y: 0.42, r: 0.1 },
  abdomen: { x: 0.5, y: 0.55, r: 0.105 },
  flankL: { x: 0.355, y: 0.535, r: 0.06 },
  flankR: { x: 0.645, y: 0.535, r: 0.06 },
  glutes: { x: 0.5, y: 0.64, r: 0.1 },
  buttocks: { x: 0.5, y: 0.655, r: 0.1 },
  thighL: { x: 0.41, y: 0.74, r: 0.075 },
  thighR: { x: 0.59, y: 0.74, r: 0.075 },
  legsL: { x: 0.43, y: 0.82, r: 0.07 },
  legsR: { x: 0.57, y: 0.82, r: 0.07 },
} as const;

type AnchorKey = keyof typeof ANCHORS;

function zone(key: string, label: string, anchor: AnchorKey, side: ZoneSide): BodyZone {
  const a = ANCHORS[anchor];
  return { key, label, x: a.x, y: a.y, r: a.r, side };
}

/**
 * Per-service clinical target zones. Keyed by the same serviceId used in
 * `lib/services.ts`. Each treatment shows the body areas it works best on.
 */
export const SERVICE_ZONES: Record<string, BodyZone[]> = {
  'fat-freezing': [
    zone('chin', 'Double chin', 'doubleChin', 'C'),
    zone('arms', 'Upper arms', 'upperArmL', 'L'),
    zone('flank-l', 'Flanks', 'flankL', 'L'),
    zone('flank-r', 'Love handles', 'flankR', 'R'),
    zone('abdomen', 'Abdomen', 'abdomen', 'C'),
    zone('back', 'Back', 'back', 'R'),
    zone('thigh', 'Thighs', 'thighL', 'L'),
  ],
  'fat-dissolving': [
    zone('chin', 'Double chin', 'doubleChin', 'C'),
    zone('jaw', 'Jawline', 'jawline', 'R'),
    zone('abdomen', 'Abdomen', 'abdomen', 'C'),
    zone('flank-l', 'Flanks', 'flankL', 'L'),
  ],
  'muscle-stimulation': [
    zone('abdomen', 'Abdomen', 'abdomen', 'C'),
    zone('glutes', 'Glutes', 'glutes', 'R'),
    zone('arms', 'Arms', 'armsL', 'L'),
    zone('thigh', 'Thighs', 'thighR', 'R'),
  ],
  'skin-tightening': [
    zone('abdomen', 'Abdomen', 'abdomen', 'C'),
    zone('arms', 'Arms', 'armsR', 'R'),
    zone('thigh', 'Thighs', 'thighL', 'L'),
  ],
  lipocavitation: [
    zone('abdomen', 'Abdomen', 'abdomen', 'C'),
    zone('flank-l', 'Flanks', 'flankL', 'L'),
    zone('flank-r', 'Love handles', 'flankR', 'R'),
    zone('thigh', 'Thighs', 'thighR', 'R'),
  ],
  'anti-cellulite': [
    zone('thigh-l', 'Thighs', 'thighL', 'L'),
    zone('thigh-r', 'Thighs', 'thighR', 'R'),
    zone('glutes', 'Glutes', 'glutes', 'R'),
    zone('buttocks', 'Buttocks', 'buttocks', 'C'),
    zone('abdomen', 'Abdomen', 'abdomen', 'L'),
  ],
  'lymphatic-drainage': [
    zone('legs-l', 'Legs', 'legsL', 'L'),
    zone('legs-r', 'Legs', 'legsR', 'R'),
    zone('abdomen', 'Abdomen', 'abdomen', 'C'),
    zone('arms', 'Arms', 'armsR', 'R'),
  ],
};

/** Sensible default if an unknown serviceId is passed. */
export const DEFAULT_ZONES: BodyZone[] = SERVICE_ZONES['fat-freezing'];

export function zonesFor(serviceId: string): BodyZone[] {
  return SERVICE_ZONES[serviceId] ?? DEFAULT_ZONES;
}

/**
 * A clean, stylised front-facing human silhouette as a single SVG path.
 * Authored on a 0..1000 (w) × 0..1000 (h) viewBox; the body fills ~the central
 * 360px-wide column. Calm, editorial, gender-neutral.
 */
export const BODY_VIEWBOX = '0 0 1000 1000';

export const BODY_SILHOUETTE_PATH = [
  // head
  'M500 60',
  'c-46 0 -78 34 -78 84',
  'c0 30 12 56 30 72',
  // neck
  'c-2 14 -6 24 -16 30',
  // shoulders / deltoids
  'c34 8 70 22 104 44',
  'c26 17 40 40 48 70',
  // left arm down (viewer right)
  'c10 36 16 78 18 120',
  'c2 40 8 78 16 112',
  'c6 26 10 50 10 74',
  'c0 18 -2 34 -8 46',
  'c-12 -2 -22 -10 -28 -26',
  'c-10 -30 -18 -66 -24 -104',
  'c-4 -28 -8 -56 -12 -82',
  // torso right side down to waist
  'c-2 30 -2 62 0 92',
  'c2 36 2 72 -2 106',
  // hip / glute right
  'c-2 30 -8 56 -18 78',
  // right thigh (viewer) down
  'c-6 40 -10 84 -12 128',
  'c-2 40 -4 80 -8 118',
  'c-3 30 -8 56 -16 78',
  'c8 10 10 24 8 36',
  'c-18 6 -38 6 -56 0',
  'c-4 -14 -2 -30 4 -44',
  'c-6 -34 -10 -72 -12 -110',
  'c-2 -36 -4 -72 -8 -106',
  'c-3 -22 -6 -42 -10 -60',
  // crotch
  'c-4 18 -7 38 -10 60',
  'c-4 34 -6 70 -8 106',
  'c-2 38 -6 76 -12 110',
  'c6 14 8 30 4 44',
  'c-18 6 -38 6 -56 0',
  'c-2 -12 0 -26 8 -36',
  'c-8 -22 -13 -48 -16 -78',
  'c-4 -38 -6 -78 -8 -118',
  'c-2 -44 -6 -88 -12 -128',
  // left hip / glute (viewer left)
  'c-10 -22 -16 -48 -18 -78',
  'c-4 -34 -4 -70 -2 -106',
  'c2 -30 2 -62 0 -92',
  'c-4 26 -8 54 -12 82',
  'c-6 38 -14 74 -24 104',
  'c-6 16 -16 24 -28 26',
  'c-6 -12 -8 -28 -8 -46',
  'c0 -24 4 -48 10 -74',
  'c8 -34 14 -72 16 -112',
  'c2 -42 8 -84 18 -120',
  'c8 -30 22 -53 48 -70',
  'c34 -22 70 -36 104 -44',
  'c-10 -6 -14 -16 -16 -30',
  'c18 -16 30 -42 30 -72',
  'c0 -50 -32 -84 -78 -84',
  'Z',
].join(' ');
