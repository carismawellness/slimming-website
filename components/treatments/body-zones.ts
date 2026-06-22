/**
 * Body-zone data + figure geometry for the TreatmentBodyMap visualisation.
 *
 * Coordinates are expressed in a normalised "body space" where (0,0) is the
 * top-left of the figure's bounding box and (1,1) is the bottom-right. The same
 * coordinates drive BOTH the accessible SVG layer and the decorative Three.js
 * glow layer, so the two are always perfectly aligned regardless of the
 * rendered pixel size.
 *
 * ── How zones are presented ────────────────────────────────────────────────
 * The visualisation is a TWO-PANEL layout: a refined line-art figure on one
 * side and a tidy vertical list of the treatment's target zones on the other.
 * Each zone carries a NUMBERED pin on the body whose index matches its row in
 * the list — so there are NO floating labels and NO leader lines crossing text.
 * `side` is retained for backwards compatibility but is no longer used to place
 * labels (the list does that job).
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
  /** Relative marker radius in body-space units (~0.05–0.09). */
  r: number;
  /** Legacy hint for which side a label leant; no longer used for layout. */
  side: ZoneSide;
}

/**
 * Canonical anatomical anchor points, tuned to sit cleanly on the refined
 * line-art figure drawn below (see BODY_PARTS). Centre line is x = 0.5.
 * y values follow the figure's well-proportioned ~7.5-head layout:
 *   head     ~0.05–0.15
 *   neck     ~0.18
 *   shoulders~0.23
 *   chest    ~0.32
 *   waist    ~0.47
 *   hips     ~0.57
 *   thighs   ~0.71
 *   calves   ~0.87
 */
const ANCHORS = {
  jawline: { x: 0.5, y: 0.125, r: 0.05 },
  doubleChin: { x: 0.5, y: 0.155, r: 0.05 },
  upperArmL: { x: 0.285, y: 0.34, r: 0.056 },
  upperArmR: { x: 0.715, y: 0.34, r: 0.056 },
  armsL: { x: 0.255, y: 0.44, r: 0.058 },
  armsR: { x: 0.745, y: 0.44, r: 0.058 },
  back: { x: 0.5, y: 0.37, r: 0.082 },
  abdomen: { x: 0.5, y: 0.5, r: 0.08 },
  flankL: { x: 0.4, y: 0.475, r: 0.05 },
  flankR: { x: 0.6, y: 0.475, r: 0.05 },
  glutes: { x: 0.5, y: 0.59, r: 0.078 },
  buttocks: { x: 0.5, y: 0.605, r: 0.078 },
  thighL: { x: 0.435, y: 0.715, r: 0.06 },
  thighR: { x: 0.565, y: 0.715, r: 0.06 },
  legsL: { x: 0.455, y: 0.87, r: 0.048 },
  legsR: { x: 0.545, y: 0.87, r: 0.048 },
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

export const BODY_VIEWBOX = '0 0 1000 1000';

/**
 * A refined, minimal line-art front-facing figure.
 *
 * The figure is deliberately drawn as calm, single-weight OUTLINE strokes — an
 * elegant medical/editorial line drawing rather than a filled silhouette. Each
 * anatomical part is its own smooth, closed sub-path (head, neck, torso, two
 * arms, two legs) built only from cubic/quadratic curves, so every part strokes
 * cleanly with no self-intersecting seams. Proportions follow a tasteful
 * ~7.5-head fashion-illustration canon.
 *
 * `kind` lets the renderer treat the torso as the "fillable" core (a barely
 * there ground wash) while limbs read as pure line, which is what gives the
 * piece its refined, intentional, luxurious feel.
 */
export interface BodyPart {
  /** Stable id for React keys. */
  id: string;
  /** SVG path data on the 0..1000 viewBox. */
  d: string;
  /** Whether this part is the central "core" (gets the soft ground wash). */
  core?: boolean;
}

export const BODY_PARTS: BodyPart[] = [
  // Head — a soft, slightly oval face.
  {
    id: 'head',
    d:
      'M500 70 ' +
      'C536 70 562 98 562 138 ' +
      'C562 178 536 208 500 208 ' +
      'C464 208 438 178 438 138 ' +
      'C438 98 464 70 500 70 Z',
  },
  // Neck — slender, connecting head to shoulders.
  {
    id: 'neck',
    d:
      'M482 198 ' +
      'C482 216 482 228 478 240 ' +
      'C490 246 510 246 522 240 ' +
      'C518 228 518 216 518 198 ' +
      'C512 206 488 206 482 198 Z',
  },
  // Torso — shoulders → bust → tapered waist → hips. Symmetrical, feminine.
  {
    id: 'torso',
    core: true,
    d:
      'M500 232 ' +
      // right shoulder out
      'C546 232 584 248 614 274 ' +
      'C630 288 638 308 640 330 ' +
      // right side: chest down to waist (tapers in)
      'C638 364 628 400 614 436 ' +
      'C602 466 592 496 586 524 ' +
      // waist pinch (right)
      'C582 544 582 560 588 578 ' +
      // hip out (right)
      'C602 604 614 628 618 658 ' +
      // hip bottom curve to centre
      'C608 676 568 686 500 686 ' +
      'C432 686 392 676 382 658 ' +
      // hip out (left)
      'C386 628 398 604 412 578 ' +
      // waist pinch (left)
      'C418 560 418 544 414 524 ' +
      // left side: waist up to chest
      'C408 496 398 466 386 436 ' +
      'C372 400 362 364 360 330 ' +
      // left shoulder
      'C362 308 370 288 386 274 ' +
      'C416 248 454 232 500 232 Z',
  },
  // Right arm (viewer-right) — gently bent, hanging beside the torso.
  {
    id: 'armR',
    d:
      'M622 288 ' +
      'C650 302 668 328 678 362 ' +
      'C688 396 694 434 696 472 ' +
      'C698 504 696 534 690 562 ' +
      'C686 580 680 594 672 602 ' +
      'C662 596 656 582 652 564 ' +
      'C646 534 644 502 644 470 ' +
      'C642 434 638 398 630 364 ' +
      'C624 338 616 316 604 298 ' +
      'C608 292 615 289 622 288 Z',
  },
  // Left arm (viewer-left) — mirror of the right.
  {
    id: 'armL',
    d:
      'M378 288 ' +
      'C350 302 332 328 322 362 ' +
      'C312 396 306 434 304 472 ' +
      'C302 504 304 534 310 562 ' +
      'C314 580 320 594 328 602 ' +
      'C338 596 344 582 348 564 ' +
      'C354 534 356 502 356 470 ' +
      'C358 434 362 398 370 364 ' +
      'C376 338 384 316 396 298 ' +
      'C392 292 385 289 378 288 Z',
  },
  // Right leg (viewer-right) — thigh → knee → calf, slim elegant taper.
  {
    id: 'legR',
    d:
      'M508 668 ' +
      'C544 668 580 672 600 682 ' +
      // outer thigh down
      'C606 716 606 752 600 788 ' +
      'C594 824 586 858 578 890 ' +
      // calf taper to slim ankle
      'C574 910 570 926 566 938 ' +
      'C556 940 540 940 530 938 ' +
      'C526 924 524 906 522 886 ' +
      // inner calf up
      'C518 854 516 820 514 786 ' +
      'C512 748 510 710 508 682 ' +
      // inner thigh to crotch
      'C506 678 506 672 508 668 Z',
  },
  // Left leg (viewer-left) — mirror of the right.
  {
    id: 'legL',
    d:
      'M492 668 ' +
      'C456 668 420 672 400 682 ' +
      'C394 716 394 752 400 788 ' +
      'C406 824 414 858 422 890 ' +
      'C426 910 430 926 434 938 ' +
      'C444 940 460 940 470 938 ' +
      'C474 924 476 906 478 886 ' +
      'C482 854 484 820 486 786 ' +
      'C488 748 490 710 492 682 ' +
      'C494 678 494 672 492 668 Z',
  },
];

/**
 * Legacy single-path export, kept for backwards compatibility. It is the union
 * of all BODY_PARTS path data; rendered with `fill-rule:evenodd` it produces a
 * full filled silhouette.
 */
export const BODY_SILHOUETTE_PATH = BODY_PARTS.map((p) => p.d).join(' ');
