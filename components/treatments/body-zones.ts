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
 * y values follow the figure's well-proportioned layout (head ~12% of height):
 *   head      ~0.07–0.18
 *   neck      ~0.205
 *   shoulders ~0.245
 *   chest     ~0.33
 *   waist     ~0.46
 *   hips      ~0.56
 *   thighs    ~0.70
 *   calves    ~0.86
 *
 * Anchors are placed to land ON the figure body (within its outline), not on
 * the surrounding card ground, so each numbered pin reads as a precise target.
 */
const ANCHORS = {
  jawline: { x: 0.5, y: 0.14, r: 0.045 },
  doubleChin: { x: 0.5, y: 0.175, r: 0.045 },
  upperArmL: { x: 0.345, y: 0.33, r: 0.05 },
  upperArmR: { x: 0.655, y: 0.33, r: 0.05 },
  armsL: { x: 0.315, y: 0.43, r: 0.05 },
  armsR: { x: 0.685, y: 0.43, r: 0.05 },
  back: { x: 0.5, y: 0.36, r: 0.075 },
  abdomen: { x: 0.5, y: 0.485, r: 0.075 },
  flankL: { x: 0.405, y: 0.46, r: 0.046 },
  flankR: { x: 0.595, y: 0.46, r: 0.046 },
  glutes: { x: 0.5, y: 0.585, r: 0.072 },
  buttocks: { x: 0.5, y: 0.6, r: 0.072 },
  thighL: { x: 0.44, y: 0.7, r: 0.056 },
  thighR: { x: 0.56, y: 0.7, r: 0.056 },
  legsL: { x: 0.455, y: 0.85, r: 0.046 },
  legsR: { x: 0.545, y: 0.85, r: 0.046 },
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
  // Head — a soft, gently oval face. Sits high with breathing room above.
  {
    id: 'head',
    d:
      'M500 86 ' +
      'C534 86 558 116 558 158 ' +
      'C558 200 534 230 500 230 ' +
      'C466 230 442 200 442 158 ' +
      'C442 116 466 86 500 86 Z',
  },
  // Neck — slender, flowing from jaw into the shoulder line.
  {
    id: 'neck',
    d:
      'M484 222 ' +
      'C484 240 483 254 479 266 ' +
      'C490 272 510 272 521 266 ' +
      'C517 254 516 240 516 222 ' +
      'C510 230 490 230 484 222 Z',
  },
  // Torso — one continuous feminine line: shoulders → softly tapered waist →
  // rounded hips, closing on a gentle curve at the hip base (no flat seam).
  {
    id: 'torso',
    core: true,
    d:
      'M500 256 ' +
      // right shoulder rises and rolls out
      'C534 256 562 266 588 286 ' +
      'C606 300 616 322 620 348 ' +
      // ribcage easing into the waist (smooth taper in)
      'C622 384 616 420 604 454 ' +
      'C596 478 588 502 584 526 ' +
      // soft waist
      'C581 544 582 560 586 578 ' +
      // hip swells out then curves down
      'C592 604 602 628 608 654 ' +
      'C612 676 606 696 588 706 ' +
      // rounded hip base sweeping through centre
      'C560 718 524 722 500 722 ' +
      'C476 722 440 718 412 706 ' +
      'C394 696 388 676 392 654 ' +
      'C398 628 408 604 414 578 ' +
      'C418 560 419 544 416 526 ' +
      'C412 502 404 478 396 454 ' +
      'C384 420 378 384 380 348 ' +
      'C384 322 394 300 412 286 ' +
      'C438 266 466 256 500 256 Z',
  },
  // Right arm (viewer-right) — a graceful tapered limb, attached at the
  // shoulder and resting just away from the waist. Open inner contour reads
  // as a single elegant stroke, not a sliver.
  {
    id: 'armR',
    d:
      'M598 296 ' +
      'C626 312 644 340 654 376 ' +
      'C664 414 668 454 666 494 ' +
      'C665 528 660 560 650 588 ' +
      'C645 602 638 612 628 616 ' +
      'C622 606 619 592 618 574 ' +
      'C617 540 619 506 622 472 ' +
      'C624 436 622 400 612 366 ' +
      'C606 340 597 318 585 302 ' +
      'C589 298 593 296 598 296 Z',
  },
  // Left arm (viewer-left) — mirror of the right.
  {
    id: 'armL',
    d:
      'M402 296 ' +
      'C374 312 356 340 346 376 ' +
      'C336 414 332 454 334 494 ' +
      'C335 528 340 560 350 588 ' +
      'C355 602 362 612 372 616 ' +
      'C378 606 381 592 382 574 ' +
      'C383 540 381 506 378 472 ' +
      'C376 436 378 400 388 366 ' +
      'C394 340 403 318 415 302 ' +
      'C411 298 407 296 402 296 Z',
  },
  // Right leg (viewer-right) — thigh → knee → slim ankle, joined cleanly to
  // the hip base and meeting its mirror at the centre line.
  {
    id: 'legR',
    d:
      'M500 712 ' +
      'C530 712 562 716 586 724 ' +
      // outer thigh tapering down
      'C594 760 594 800 588 838 ' +
      'C583 872 575 906 566 936 ' +
      // calf into a slim ankle
      'C562 952 558 962 552 968 ' +
      'C543 970 531 970 522 968 ' +
      'C518 956 515 940 513 920 ' +
      // inner calf rising back up
      'C510 884 509 846 508 808 ' +
      'C507 770 505 740 503 722 ' +
      // inner thigh up to centre
      'C502 718 501 715 500 712 Z',
  },
  // Left leg (viewer-left) — mirror of the right.
  {
    id: 'legL',
    d:
      'M500 712 ' +
      'C470 712 438 716 414 724 ' +
      'C406 760 406 800 412 838 ' +
      'C417 872 425 906 434 936 ' +
      'C438 952 442 962 448 968 ' +
      'C457 970 469 970 478 968 ' +
      'C482 956 485 940 487 920 ' +
      'C490 884 491 846 492 808 ' +
      'C493 770 495 740 497 722 ' +
      'C498 718 499 715 500 712 Z',
  },
];

/**
 * Legacy single-path export, kept for backwards compatibility. It is the union
 * of all BODY_PARTS path data; rendered with `fill-rule:evenodd` it produces a
 * full filled silhouette.
 */
export const BODY_SILHOUETTE_PATH = BODY_PARTS.map((p) => p.d).join(' ');
