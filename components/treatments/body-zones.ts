/**
 * Body-zone data + figure geometry for the TreatmentBodyMap visualisation.
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
  /** Relative marker radius in body-space units (~0.05–0.09). */
  r: number;
  /** Which side the label/connector leans. */
  side: ZoneSide;
}

/**
 * Canonical anatomical anchor points, tuned to sit cleanly on the refined
 * front-facing figure drawn below (see BODY_PARTS). Centre line is x = 0.5.
 * y values follow the figure's well-proportioned ~7.5-head layout:
 *   head     ~0.04–0.14
 *   neck     ~0.16
 *   shoulders~0.21
 *   chest    ~0.30
 *   waist    ~0.46
 *   hips     ~0.56
 *   thighs   ~0.70
 *   calves   ~0.86
 */
const ANCHORS = {
  jawline: { x: 0.5, y: 0.115, r: 0.05 },
  doubleChin: { x: 0.5, y: 0.145, r: 0.05 },
  upperArmL: { x: 0.275, y: 0.33, r: 0.058 },
  upperArmR: { x: 0.725, y: 0.33, r: 0.058 },
  armsL: { x: 0.235, y: 0.42, r: 0.06 },
  armsR: { x: 0.765, y: 0.42, r: 0.06 },
  back: { x: 0.5, y: 0.36, r: 0.085 },
  abdomen: { x: 0.5, y: 0.5, r: 0.082 },
  flankL: { x: 0.395, y: 0.475, r: 0.052 },
  flankR: { x: 0.605, y: 0.475, r: 0.052 },
  glutes: { x: 0.5, y: 0.585, r: 0.08 },
  buttocks: { x: 0.5, y: 0.6, r: 0.08 },
  thighL: { x: 0.43, y: 0.71, r: 0.062 },
  thighR: { x: 0.57, y: 0.71, r: 0.062 },
  legsL: { x: 0.45, y: 0.87, r: 0.05 },
  legsR: { x: 0.55, y: 0.87, r: 0.05 },
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
 * A refined, well-proportioned front-facing female figure.
 *
 * Rather than a single self-intersecting path (which renders lumpy), the body
 * is composed of a few clean, smooth, closed sub-paths whose silhouettes flow
 * together: a head, a slender neck, a torso that tapers to a waist and curves
 * back out at the hips, two gently-bent arms, and two legs. Proportions follow
 * a tasteful ~7.5-head fashion-illustration canon so it reads as intentional
 * and elegant, not crude.
 *
 * All sub-paths are authored on the same 0..1000 viewBox as the zone
 * coordinates. `fillRule="evenodd"` lets the negative space between arms and
 * torso read correctly when the whole figure is filled as one shape.
 */
export interface BodyPart {
  /** Stable id for React keys. */
  id: string;
  /** SVG path data on the 0..1000 viewBox. */
  d: string;
}

/**
 * Smooth, symmetrical sub-paths. Each is a closed silhouette so the figure can
 * be filled with a soft ground and stroked with a hairline outline. Built from
 * quadratic/cubic curves only — no straight-edged "robot" segments.
 */
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
      'M482 196 ' +
      'C482 214 482 226 478 238 ' +
      'C490 244 510 244 522 238 ' +
      'C518 226 518 214 518 196 ' +
      'C512 204 488 204 482 196 Z',
  },
  // Torso — shoulders → bust → tapered waist → hips. Symmetrical, feminine.
  {
    id: 'torso',
    d:
      'M500 230 ' +
      // right shoulder out
      'C544 230 582 244 612 270 ' +
      'C628 284 636 304 638 326 ' +
      // right side: chest down to waist (tapers in)
      'C636 360 626 396 612 432 ' +
      'C600 462 590 492 584 520 ' +
      // waist pinch (right)
      'C580 540 580 556 586 574 ' +
      // hip out (right)
      'C600 600 612 624 616 654 ' +
      // hip bottom curve to centre
      'C606 672 566 682 500 682 ' +
      'C434 682 394 672 384 654 ' +
      // hip out (left)
      'C388 624 400 600 414 574 ' +
      // waist pinch (left)
      'C420 556 420 540 416 520 ' +
      // left side: waist up to chest
      'C410 492 400 462 388 432 ' +
      'C374 396 364 360 362 326 ' +
      // left shoulder
      'C364 304 372 284 388 270 ' +
      'C418 244 456 230 500 230 Z',
  },
  // Right arm (viewer-right) — gently bent, hanging beside the torso.
  {
    id: 'armR',
    d:
      'M620 286 ' +
      'C648 300 666 326 676 360 ' +
      'C686 394 692 432 694 470 ' +
      'C696 502 694 532 688 560 ' +
      'C684 578 678 592 670 600 ' +
      'C660 594 654 580 650 562 ' +
      'C644 532 642 500 642 468 ' +
      'C640 432 636 396 628 362 ' +
      'C622 336 614 314 602 296 ' +
      'C606 290 613 287 620 286 Z',
  },
  // Left arm (viewer-left) — mirror of the right.
  {
    id: 'armL',
    d:
      'M380 286 ' +
      'C352 300 334 326 324 360 ' +
      'C314 394 308 432 306 470 ' +
      'C304 502 306 532 312 560 ' +
      'C316 578 322 592 330 600 ' +
      'C340 594 346 580 350 562 ' +
      'C356 532 358 500 358 468 ' +
      'C360 432 364 396 372 362 ' +
      'C378 336 386 314 398 296 ' +
      'C394 290 387 287 380 286 Z',
  },
  // Right leg (viewer-right) — thigh → knee → calf, slim elegant taper.
  {
    id: 'legR',
    d:
      'M508 664 ' +
      'C544 664 580 668 600 678 ' +
      // outer thigh down
      'C606 712 606 748 600 784 ' +
      'C594 820 586 854 578 886 ' +
      // calf taper to slim ankle
      'C574 906 570 922 566 934 ' +
      'C556 936 540 936 530 934 ' +
      'C526 920 524 902 522 882 ' +
      // inner calf up
      'C518 850 516 816 514 782 ' +
      'C512 744 510 706 508 678 ' +
      // inner thigh to crotch
      'C506 674 506 668 508 664 Z',
  },
  // Left leg (viewer-left) — mirror of the right.
  {
    id: 'legL',
    d:
      'M492 664 ' +
      'C456 664 420 668 400 678 ' +
      'C394 712 394 748 400 784 ' +
      'C406 820 414 854 422 886 ' +
      'C426 906 430 922 434 934 ' +
      'C444 936 460 936 470 934 ' +
      'C474 920 476 902 478 882 ' +
      'C482 850 484 816 486 782 ' +
      'C488 744 490 706 492 678 ' +
      'C494 674 494 668 492 664 Z',
  },
];

/**
 * Legacy single-path export, kept for backwards compatibility. It is the union
 * of all BODY_PARTS path data; rendered with `fill-rule:evenodd` it produces a
 * full filled silhouette. New code should prefer iterating `BODY_PARTS` so each
 * part can be stroked cleanly.
 */
export const BODY_SILHOUETTE_PATH = BODY_PARTS.map((p) => p.d).join(' ');
