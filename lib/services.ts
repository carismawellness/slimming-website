export interface PackageItem {
  label: string;
  value?: string;
}

/**
 * One image referenced on a live treatment page. `label` is the human label
 * (used as the alt text and as the placeholder caption when no asset exists);
 * `src`, when present, is the local `/wix/<media-id>` path of the real
 * downloaded asset so the template renders an <img> instead of a placeholder.
 */
export interface ImageRef {
  label: string;
  src?: string;
}

/**
 * Live primary booking link. Every "Claim Your Spot Now" / "Free Body Analysis"
 * CTA on the Wix site routes to the Fresha booking platform.
 */
export const BOOKING_URL =
  'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191';

/** Recurring hero eyebrow tagline used across live treatment pages. */
export const DEFAULT_EYEBROW = '#1 voted slimming clinic in malta';

/** A long-form narrative section (heading + multi-paragraph body). */
export interface NarrativeSection {
  heading: string;
  body: string;
}

/** One of the four named benefit blocks shown on each live treatment page. */
export interface NamedBenefit {
  heading: string;
  body: string;
}

/** A purchasable package, with verbatim name + per-line values. */
export interface ServicePackage {
  /** VERBATIM package name from the live page. */
  name: string;
  price: string;
  includes: PackageItem[];
  notes?: string;
}

export interface Hero {
  eyebrow: string;
  heading: string;
  description: string;
}

export interface Service {
  id: string;
  /** Slug on the live Wix site, used only as a reference/label. */
  liveSlug: string;
  /** Live page URL (reference). */
  liveUrl: string;
  /** Treatment display name (verbatim live label). */
  treatment: string;
  /** Per-service SEO <title>. */
  seoTitle: string;
  /** Per-service SEO meta description (dedicated, not hero copy). */
  seoDescription?: string;
  /** OG image URL for og:image meta tag. */
  ogImage?: string;

  /** Hero block (eyebrow + heading + description). */
  hero: Hero;

  title: string;
  subtitle: string;
  tagline?: string;
  description: string;
  /** Short copy used on the index card. */
  cardDescription: string;

  /** Ordered long-form narrative sections from the live page. */
  narrativeSections: NarrativeSection[];
  /** The four named benefit blocks. */
  namedBenefits: NamedBenefit[];

  /** Legacy short benefit bullets (kept for backward compatibility). */
  benefits: string[];

  /** Full purchasable package list (verbatim names + per-line € values). */
  packages: ServicePackage[];

  /** Legacy single-package fields (kept for backward compatibility). */
  packageName?: string;
  packagePrice?: string;
  packageValue?: string;
  packageIncludes?: PackageItem[];

  treatableAreas?: string[];
  duration: string;

  /** Primary hero/index image placeholder label. */
  imagePlaceholder: string;
  /** Local `/wix/<media-id>` path for the hero image, when wired. */
  heroImage?: string;
  /** Full list of images referenced on the live page (label + optional src). */
  imagesNeeded: ImageRef[];
}

export const services: Record<string, Service> = {
  'fat-freezing': {
    id: 'fat-freezing',
    liveSlug: 'fat-reduction',
    liveUrl: 'https://www.carismaslimming.com/fat-reduction',
    treatment: 'Fat Freezing (CoolSculpting)',
    seoTitle: 'CoolSculpting Malta | Fat Freezing Treatment | Carisma Slimming',
    hero: {
      eyebrow:
        "#1 VOTED SLIMMING CLINIC IN MALTA ▫️ MALTA'S MOST COMPREHENSIVE SLIMMING PROGRAM ▫️ MEDICALLY QUALIFIED DOCTORS",
      heading: 'BURN STUBBORN FAT, NO SURGERY.',
      description:
        'For those who have tried dieting, eating healthier and moving more, but the love handles, stubborn belly fat and double chin still will not budge.',
    },
    title: 'Burn stubborn fat, no surgery.',
    subtitle: 'Fat Eraser Protocol',
    description:
      'For those who have tried dieting, eating healthier and moving more, but the love handles, stubborn belly fat and double chin still will not budge. CoolSculpting uses controlled cooling to reduce a local fat layer over time through cryolipolysis. It is FDA-cleared, with 17+ million treatments worldwide. Results are visible in 1-3 months, with full results by 3-6 months, and can be long-lasting when weight stays stable.',
    cardDescription:
      'Target stubborn fat in the belly, flanks, bra area and double chin with market-leading CoolSculpting fat freezing. Non-surgical, minimal downtime.',
    narrativeSections: [
      {
        heading:
          'The Secret to a More Defined, Confident Look — shrink love handles & target stubborn fat pockets with precision',
        body: "You are eating better and moving more, yet the same bulge shows up in every outfit. Your jeans still cut into your hips, your bra digs into your back, or every selfie seems to highlight your double chin. The scale might move a little, but your shape does not.\n\n- You lose a few kilos, yet your love handles and lower belly look the same in photos.\n- You feel you must hide behind loose tops, high waists or shapewear to feel comfortable.\n- Friends tell you to 'just lose more weight' even though one or two pockets of fat are the real issue.\n- You are tired of plans that treat you like a number on the scale instead of someone who wants specific areas fixed.\n\nIf you read this and think 'This is me', your willpower is not the problem. Localised fat is. You need a targeted contouring plan that freezes and dissolves those fat cells directly so your body finally reflects the effort you are already making.",
      },
      {
        heading: 'The Carisma Difference — we are not another diet clinic.',
        body: "We're a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don't just lose weight, you step into your strongest form.\n\n- Doctor led: full medical check and body scan\n- One integrated program: medical, diet, movement and treatments together\n- Real gym included: Technogym facility, semi-private classes and PT\n- High touch support: weekly check ins, progress reports and WhatsApp follow up\n- Evidence based devices: Emsculpt NEO, coolsculpting and RF skin tightening\n- Selective entry and measurable progress tracked with body composition data",
      },
      {
        heading: 'CoolSculpting',
        body: 'Uses controlled cooling to reduce a local fat layer over time through a process called cryolipolysis.\n\nCoolSculpting is an FDA cleared cryolipolysis technology that uses controlled cooling to target fat cells under the skin without surgery or needles. Treated fat cells are gradually cleared by your body over the following weeks\n\n- Backed by clinical research with over 17 million treatments performed worldwide.\n- Results start to appear from 1–3 months, with full contour change often seen by 3–6 months as the body clears affected fat cells.\n- Results in that area can be long lasting if your weight is stable.\n- Non surgical and non invasive treatment with little to no downtime in most people',
      },
      {
        heading: 'Trusted Clinic / Social Proof',
        body: 'Over 800+ Reviews accompanied by five-star ratings. Featured in: Malta Today, Times Malta, MT Today, and other local media outlets. #1 Voted Clinic in Malta.',
      },
      {
        heading: 'FAQ',
        body: '1. What is included in the Stubborn Fat Eraser Starter Pack?\nOne in person consultation with our doctor, one CoolSculpting fat freezing session, access to spa & fitness facilities, Tanita Body Composition Analysis, €25 Carisma Aesthetics credit for future treatments.\n\n2. Am I a good candidate for this package?\nIt is ideal if you are close to your goal weight but have localised fat on areas like the lower belly, love handles or double chin. Suitability is always confirmed in your medical consultation.\n\n3. How does CoolSculpting fat freezing actually work?\nCoolSculpting uses controlled cooling to target and kill fat cells under the skin. Over the following weeks your body naturally clears these cells, which can reduce the thickness of the fat layer in the treated area.\n\n4. What is the difference between fat freezing and fat dissolving injections?\nFat freezing uses cold to destroy fat cells from outside the body, while fat dissolving injections use a solution that breaks down fat cells from within a small, targeted pocket. In this pack you get both, planned together for one key area.\n\n5. How many areas can I treat with this starter pack?\nThis offer is built to focus on one main problem area so you can see a clear change. During the consultation the doctor will advise how best to use the CoolSculpting and injections for that area.\n\n6. Does the treatment hurt and is there downtime?\nCoolSculpting usually feels very cold and tight at first, then the area goes numb. Most people go back to normal activities the same day.\n\n7. When will I see results?\nAs the body removes treated fat cells. Your clinic will schedule follow up photos so you can compare.\n\n8. Are the results permanent?\nThe fat cells that are destroyed and removed do not come back. However remaining fat cells can still grow if you gain weight, so a healthy lifestyle will help you maintain your results.',
      },
    ],
    namedBenefits: [
      {
        heading: 'TARGETED CONTOURING',
        body: 'Focus on your biggest trouble spot first so love handles, lower belly or double chin start to look smoother in clothes and photos.',
      },
      {
        heading: 'DUAL ACTION FAT REDUCTION',
        body: "Combine Malta's first CoolSculpting technology with targeted fat dissolving injections for a more complete result than using either alone.",
      },
      {
        heading: 'EXPERT DESIGNED PLAN',
        body: 'Your in person consultation maps out which area to treat, how to combine both methods and what to expect from your results.',
      },
      {
        heading: 'SAFE AND CLINICALLY CERTIFIED',
        body: 'Treatments are performed by medical professionals using EU approved, clinically proven body contouring technology with minimal downtime.',
      },
    ],
    benefits: [
      'Targeted contouring - focuses on one trouble spot',
      'Dual action fat reduction - combines CoolSculpting with fat-dissolving injections',
      'Expert-designed plan - personalised consultation mapping',
      'Safe, certified treatment - EU-approved technology by medical professionals',
    ],
    packages: [
      {
        name: 'Stubborn Fat Eraser Starter Pack (Fat Eraser Protocol)',
        price: '€199 (Total Value: €550)',
        includes: [
          { label: '3x Fat Freezing sessions with CoolSculpting', value: '€300 (also listed as €360)' },
          { label: '4x access to spa & fitness facilities', value: '€140' },
          { label: 'Tanita Body Composition Analysis', value: '€60' },
          { label: '€25 Carisma Aesthetics credit', value: '€25' },
          { label: 'Complimentary Parking Validation', value: 'included' },
        ],
        notes:
          'Individual Sessions: €100 each. Package includes one in person consultation with the doctor, one CoolSculpting fat freezing session, access to spa & fitness facilities, Tanita Body Composition Analysis, and €25 Carisma Aesthetics credit for future treatments.',
      },
    ],
    packageName: 'Stubborn Fat Eraser Starter Pack (Fat Eraser Protocol)',
    packagePrice: '€199',
    packageValue: '€550',
    packageIncludes: [
      { label: '3x Fat Freezing sessions with CoolSculpting', value: '€300' },
      { label: '4x access to spa & fitness facilities', value: '€140' },
      { label: 'Tanita Body Composition Analysis', value: '€60' },
      { label: '€25 Carisma Aesthetics credit', value: '€25' },
      { label: 'Complimentary Parking Validation' },
    ],
    treatableAreas: [
      'Stomach - Belly Fat',
      'Love Handles',
      'Upper Arms',
      'Thighs',
      'Banana Roll',
      'Back Fat / Bra Fat',
      'Double Chin / The Jawline',
    ],
    duration:
      'Results start to appear from 1–3 months, with full contour change often seen by 3–6 months as the body clears the damaged fat cells. Sessions may be spaced over multiple weeks depending on area and suitability.',
    imagePlaceholder: 'CoolSculpting Before & After',
    heroImage: '/wix/87fc13_af546d93467e47d790f061caff13348a~mv2.webp',
    imagesNeeded: [
      { label: 'Group 1707481377.png', src: '/wix/87fc13_7685319028a14ef0ace54298d2e74acb~mv2.png' },
      { label: 'Backgroung.png', src: '/wix/87fc13_f0e92ac188af4582a4dcab0d17d5d2ed~mv2.webp' },
      { label: 'google.png', src: '/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png' },
      { label: 'Screen-Shot-2024-12-16-at-09.58.11-300x183-removebg-preview.png', src: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png' },
      { label: 'CarismaSlim_Batch-33 (1) 1_edited_edited.png', src: '/wix/87fc13_af546d93467e47d790f061caff13348a~mv2.webp' },
      { label: 'malta-today-logo.jpg', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.14.jpeg', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.15 (1).jpeg', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
      { label: 'timesmalta.png', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
      { label: 'mttoday.png', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
      { label: '78 2.png', src: '/wix/87fc13_31a3925719b446858712ee300fd07661~mv2.png' },
      { label: '79 2.png', src: '/wix/87fc13_03c8382fd1434f919cf94b1d664d494c~mv2.png' },
      { label: '81 1.png', src: '/wix/87fc13_b4783b8ab4ad480fa01394e449f91d34~mv2.png' },
      { label: '78 1.png', src: '/wix/87fc13_729173bc08764a74bee017b037d95d5b~mv2.png' },
      { label: 'CarismaSlim_Batch-21 1_edited.png', src: '/wix/87fc13_bda5e64e4bcb4471b28a919528af71bc~mv2.webp' },
      { label: 'Vector (30).png', src: '/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.webp' },
      { label: 'Group 1707479766.png', src: '/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png' },
      { label: 'CoolSculpting Before & After', src: '/wix/87fc13_e873e3bf68584964b06a9f7bd9e5d335~mv2.webp' },
      { label: 'Line 1803.png', src: '/wix/87fc13_a33e3307da684fa0a47f3105d09dc796~mv2.png' },
      { label: 'location.png', src: '/wix/87fc13_387683ad0f4c499c8cab338b5f800aa0~mv2.png' },
      { label: 'rise.png', src: '/wix/87fc13_9011dffd287245ed9d60f5663e21edba~mv2.png' },
      { label: 'dollar-symbol.png', src: '/wix/87fc13_c4cf7001e0324fbd84551191d2a27bd1~mv2.png' },
      { label: 'parking-sign (1).png', src: '/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png' },
      { label: 'Cryolipolysis', src: '/wix/87fc13_e49f864318254f4b86704307b14ca6d8~mv2.webp' },
      { label: 'Localised Body Contour', src: '/wix/87fc13_8094f30674bc47208fac989787bf0557~mv2.webp' },
      { label: 'Why We Combine', src: '/wix/87fc13_3ffa5b43365244309f4c746206cc1ecc~mv2.webp' },
      { label: 'Rectangle 12134.png', src: '/wix/87fc13_5299fc2afac246a99d0def94c92bc3c1~mv2.webp' },
      { label: 'Dr Zaid Teebi medical weight loss consultant Malta', src: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.webp' },
      { label: 'Rectangle 12135.png', src: '/wix/87fc13_d8caba88b3084d04aef31e39cc2a6b2e~mv2.webp' },
      { label: 'Dr Giovanni Scornavacca aesthetic doctor at Carisma Malta', src: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.webp' },
      { label: 'Dr Francesca Chircop aesthetic doctor at Carisma Malta', src: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.webp' },
      { label: 'lineVector.png', src: '/wix/87fc13_7502c14a8f8c4a5d8e75362f7366465a~mv2.webp' },
      { label: 'Carisma Slimming Guide - sustainable weight loss management Malta', src: '/wix/87fc13_fae77cba7c5843e1ae57040ac00c3cce~mv2.webp' },
      { label: 'Carisma Spa & Wellness', src: '/wix/87fc13_a62cc8038b274204a2fe70fd3d4879d0~mv2.webp' },
      { label: 'SpaLogo.png', src: '/wix/87fc13_e2e5f077c0024cbc9a3d975e4a009b7e~mv2.png' },
      { label: 'Carisma Aesthetics Malta medical aesthetics treatments', src: '/wix/87fc13_bdc2b69242844d529915c2f20b2584ac~mv2.webp' },
      { label: 'aeslogo.png', src: '/wix/87fc13_b5a7ec4b11f445b4879c36d7268ba6d1~mv2.png' },
      { label: 'Group 1707481632.png', src: '/wix/87fc13_6e75c766df9749f48a8a564a1a88f57b~mv2.png' },
      { label: 'telephone.png', src: '/wix/87fc13_ed26f88b483840519efa6093c563b6f6~mv2.png' },
      { label: 'mail.png', src: '/wix/87fc13_ae79398aefc9410a9e412c39555ce540~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 1.png', src: '/wix/87fc13_da080776ce53414b9227e41f9c0c4fc9~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 2.png', src: '/wix/87fc13_0a6cf5f4a62b4f539db1cfd671363e68~mv2.png' },
    ],
  },
  'fat-dissolving': {
    id: 'fat-dissolving',
    liveSlug: 'fatdissolving',
    liveUrl: 'https://www.carismaslimming.com/fatdissolving',
    treatment: 'Fat Dissolving',
    seoTitle: 'Fat Dissolving Injections Malta | Lemon Bottle | Carisma Slimming',
    seoDescription:
      'Fat dissolving injections in Malta designed to target small stubborn fat pockets, supporting definition and contour without surgery or downtime. Available at Carisma Slimming.',
    hero: {
      eyebrow:
        "#1 VOTED SLIMMING CLINIC IN MALTA ▫️ MALTA'S MOST COMPREHENSIVE SLIMMING PROGRAM ▫️ MEDICALLY QUALIFIED DOCTORS",
      heading: 'FAT DISSOLVING IN MALTA',
      description:
        "For those who maintain a healthy lifestyle but still struggle with double chin fullness, soft jawlines, or small pockets of resistant fat that simply won't shift. Fat dissolving injections are designed to target these stubborn areas, supporting definition and contour without surgery or downtime.",
    },
    title: 'Fat Dissolving in Malta',
    subtitle: 'Burn stubborn fat, no surgery.',
    description:
      'For those maintaining a healthy lifestyle but struggling with resistant fat deposits like double chins or soft jawlines. Our injectable Lemon Bottle treatment is designed to target stubborn fat pockets and support definition without surgical intervention or recovery time. Duration is 20-30 minutes, with 7-14 days of swelling, results developing from 2+ weeks, and long-lasting outcomes with stable weight. No anaesthetic required.',
    cardDescription:
      'Medical-grade Lemon Bottle injections that target stubborn fat pockets in the double chin, flanks, thighs and other localised areas.',
    narrativeSections: [
      {
        heading: 'BURN STUBBORN FAT, NO SURGERY.',
        body: "For those who maintain a healthy lifestyle but still struggle with double chin fullness, soft jawlines, or small pockets of resistant fat that simply won't shift. Fat dissolving injections are designed to target these stubborn areas, supporting definition and contour without surgery or downtime.",
      },
      {
        heading: "Do you ever feel like certain areas just won't respond — no matter what you try?",
        body: "You eat better. You move more. Your weight may even be stable. Yet some pockets of fat — under the chin, around the belly, along the flanks — simply refuse to shift. It's frustrating because it's not about effort. It's about stubborn fat cells that don't respond to diet or exercise the way the rest of your body does. Our Fat Dissolving treatment is designed to target these resistant deposits — refining and contouring specific areas without surgery or downtime. Results develop gradually over the following weeks, giving you a smoother, more sculpted appearance that still looks completely natural. This isn't about weight loss. It's about precision contouring where it matters most.",
      },
      {
        heading: 'OUR MEDICAL COMMITMENT',
        body: 'Targeted Fat Reduction – Precision treatments designed to reduce stubborn fat safely and effectively.\nTightened, Firmer Skin – Advanced protocols that support smoother, more defined contours.\nNo Surgery. No General Anesthesia. Minimal Downtime.\nMedical-Grade Technology – Performed by certified aesthetic professionals using clinically approved methods.',
      },
      {
        heading: 'WHY MALTA CHOOSES Carisma',
        body: 'Over 30 years of experience\nMedical-grade technology trusted by medical doctors\nPersonalised fat-reduction plans for every body area\nProven results with high client satisfaction',
      },
      {
        heading: 'created for those who value confidence, safety & natural contour',
        body: 'Because you want targeted fat reduction that enhances your shape, not changes who you are.\nBecause stubborn fat deserves precision treatment, not extreme measures.\nBecause you expect your procedure to be performed by qualified aesthetic medical professionals.\nBecause your safety, comfort, and long-term results matter more than quick fixes.',
      },
      {
        heading: 'the carisma difference',
        body: '35+ years delivering results',
      },
      {
        heading: 'FAQ: What can I expect during a Fat Dissolving treatment?',
        body: 'During a Fat dissolving treatment, a qualified practitioner will administer a series of small injections under in the treated area, such as under chin, stomach and thighs. The number of injections and the amount of product used will depend on your specific needs and desired results. The procedure typically takes about 20-30 minutes to complete, and most patients require multiple treatment sessions spaced several weeks apart for optimal results.',
      },
      {
        heading: 'FAQ: Is Fat Dissolving painful?',
        body: 'Some discomfort may be experienced during the injections, but it\'s generally well-tolerated. To minimize pain, your practitioner may apply a topical numbing cream or use a local anesthetic before the injections. Some patients may also experience a mild burning sensation during the treatment, which usually subsides shortly after the procedure.',
      },
      {
        heading: 'FAQ: What is the recovery time for Fat Dissolving treatments?',
        body: "After a Fat Dissolving treatment, you may experience some swelling, bruising, or redness in the treated area. These side effects are typically mild and subside within a few days to a week. Most people can return to their normal activities immediately after treatment, but it's essential to follow your practitioner's post-treatment care instructions to ensure proper healing and optimal results.",
      },
      {
        heading: 'FAQ: How long does it take to see the results of Fat Dissolving?',
        body: "Results from Fat Dissolving treatments typically become noticeable within two to four weeks after your initial treatment session. It's important to remember that multiple sessions may be needed to achieve your desired results, and the number of sessions will depend on the amount of fat being treated and your individual response to the treatment.",
      },
      {
        heading: 'FAQ: How long do the results of Fat Dissolving?',
        body: 'Fat dissolving results can be long-lasting when your weight remains stable. Remaining fat cells can still enlarge with significant weight gain, so balanced nutrition, activity and follow-up guidance help you maintain your contour.',
      },
      {
        heading: 'FAQ: Are there any side effects or risks associated with Fat Dissolving?',
        body: "As with any cosmetic treatment, there can be side effects and risks associated with Fat Dissolving. Common side effects include swelling, bruising, redness, and discomfort at the injection site. In rare cases, more serious complications may occur, such as nerve injury that can cause an uneven smile or facial muscle weakness (when applied on under chin fat). It's essential to consult with a qualified practitioner to minimise risks and ensure proper treatment.",
      },
      {
        heading: 'FAQ: Who is a suitable candidate for Fat Dissolving treatment?',
        body: "Fat dissolving is ideal for individuals with minimal to moderate localizes fat who want to improve the appearance without surgery. It is not suitable for those with severe localized fat or individuals with loose, sagging skin in the treatment area. A thorough consultation with a qualified practitioner is necessary to determine if it's the right treatment for you.",
      },
      {
        heading: 'FAQ: What parts of the body you can treat with Fat Dissolving?',
        body: 'Some of the areas we can treat with fat dissolving are: Double chin, Back fat, Arm fat (bingo wing area), stomach fat and six-pack definition, Flanks and waist, Inner and outer thighs, under the buttocks, fat above knees and other areas that have minimal to moderate localized fat.',
      },
    ],
    namedBenefits: [
      {
        heading: 'INSTANT CONTOUR REFINEMENT',
        body: 'Begin a gradual contour-refinement process for a sharper-looking jawline over the following weeks.',
      },
      {
        heading: 'FAT-DISSOLVING PRECISION',
        body: 'Advanced injectable treatments are designed to break down stubborn fat in specific areas such as the chin, abdomen, flanks, and thighs.',
      },
      {
        heading: 'GRADUAL, NATURAL RESULTS',
        body: 'Results develop progressively over several weeks, ensuring smooth, natural-looking contour improvement without drastic change.',
      },
      {
        heading: 'SAFE & MEDICALLY LED',
        body: 'Performed by certified professionals using clinically proven, medical-grade protocols tailored to your body and goals.',
      },
    ],
    benefits: [
      'Instant Contour Refinement',
      'Fat-Dissolving Precision',
      'Gradual, Natural Results',
      'Safe & Medically Led',
    ],
    packages: [
      {
        name: 'Single Session Launch Offer',
        price: '€149 (normally €340)',
        includes: [
          { label: '1x Lemon Bottle Fat-Dissolving Injection', value: '€150' },
          { label: 'Access to spa & fitness facilities', value: '€105' },
          { label: 'Complimentary Weight Loss Consultation', value: '€60' },
          { label: '€25 Carisma Aesthetics Credit', value: '€25' },
          { label: 'Complimentary Parking Validation' },
        ],
      },
      {
        name: '3-Session Treatment Plan',
        price: '€199 (normally €650)',
        includes: [
          { label: '3x Lemon Bottle Fat-Dissolving Injection', value: '€450' },
          { label: '3x access to spa & fitness facilities', value: '€105' },
          { label: 'Tanita Body Composition Analysis', value: '€60' },
          { label: '€25 Carisma Aesthetics Credit', value: '€25' },
          { label: 'Complimentary Parking Validation' },
        ],
      },
      {
        name: 'Individual Sessions',
        price: '€100 per session',
        includes: [],
        notes: 'Pay-per-session pricing.',
      },
    ],
    packageName: '3-Session Treatment Plan',
    packagePrice: '€199',
    packageValue: '€650',
    packageIncludes: [
      { label: '3x Lemon Bottle Fat-Dissolving Injection', value: '€450' },
      { label: '3x access to spa & fitness facilities', value: '€105' },
      { label: 'Tanita Body Composition Analysis', value: '€60' },
      { label: '€25 Carisma Aesthetics Credit', value: '€25' },
      { label: 'Complimentary Parking Validation' },
    ],
    treatableAreas: [
      'Double chin',
      'Back fat',
      'Arm fat (bingo wing area)',
      'Stomach fat and six-pack definition',
      'Flanks and waist',
      'Inner and outer thighs',
      'Under the buttocks',
      'Fat above knees',
      'Other areas with minimal to moderate localized fat',
    ],
    duration:
      'Procedure time: 20-30 minutes. Downtime: 7-14 days of swelling. Results visible: 2 weeks or more. Results duration: Permanent. Anesthetic: None.',
    imagePlaceholder: 'Fat Dissolving (Lemon Bottle) before/after photo',
    heroImage: '/wix/87fc13_6ac670fc080e4fe4a974d6701eed38a8~mv2.jpg',
    imagesNeeded: [
      { label: 'Group 1707481377.png', src: '/wix/87fc13_7685319028a14ef0ace54298d2e74acb~mv2.png' },
      { label: 'Backgroung.png', src: '/wix/87fc13_f0e92ac188af4582a4dcab0d17d5d2ed~mv2.webp' },
      { label: 'google.png', src: '/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png' },
      { label: 'Screen-Shot-2024-12-16-at-09.58.11-300x183-removebg-preview.png', src: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png' },
      { label: 'Natures-Bounty-Article-1-Header-Image.webp', src: '/wix/87fc13_6aa76dd4c16347c89d2f92b4f5d2d105~mv2.webp' },
      { label: 'malta-today-logo.jpg', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.14.jpeg', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.15 (1).jpeg', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
      { label: 'timesmalta.png', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
      { label: 'mttoday.png', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
      { label: '78 3.png', src: '/wix/87fc13_688717392fa94e67bc7ce9add4715067~mv2.png' },
      { label: '79 3.png', src: '/wix/87fc13_d001da6fb4d44f65a13970f6286d5119~mv2.png' },
      { label: '80 2.png', src: '/wix/87fc13_ace98d240a4941ef84f4b64d0e3203aa~mv2.png' },
      { label: '78 1.png', src: '/wix/87fc13_729173bc08764a74bee017b037d95d5b~mv2.png' },
      { label: 'IMG_1134_edited.jpg', src: '/wix/87fc13_6ac670fc080e4fe4a974d6701eed38a8~mv2.jpg' },
      { label: 'parking-sign (1).png', src: '/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png' },
      { label: 'IMG_1107_edited.jpg', src: '/wix/87fc13_3b881cbf9132429a94159c9ebf160a1d~mv2.jpg' },
      { label: 'p3_edited.jpg', src: '/wix/87fc13_e4992fcc322c43c79922384b826fdc9c~mv2.jpg' },
      { label: 'aqualyx_enfield 1.png', src: '/wix/ab642b_b1db5bfb95f347ed9d19819728514897~mv2.png' },
      { label: 'lemon_bottle.webp', src: '/wix/87fc13_c0f7e229c04e441598f6a6775d4c5042~mv2.webp' },
      { label: 'Cryolipolysis', src: '/wix/87fc13_e49f864318254f4b86704307b14ca6d8~mv2.webp' },
      { label: 'Fat Dissolving Injections', src: '/wix/87fc13_e1c0fd0d3df546909a3e1e2829768367~mv2.webp' },
      { label: 'Localised Body Contour', src: '/wix/87fc13_8094f30674bc47208fac989787bf0557~mv2.webp' },
      { label: 'Why We Combine', src: '/wix/87fc13_3ffa5b43365244309f4c746206cc1ecc~mv2.webp' },
      { label: 'Rectangle 12134.png', src: '/wix/87fc13_5299fc2afac246a99d0def94c92bc3c1~mv2.webp' },
      { label: 'Dr Zaid Teebi medical weight loss consultant Malta', src: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.webp' },
      { label: 'Rectangle 12135.png', src: '/wix/87fc13_d8caba88b3084d04aef31e39cc2a6b2e~mv2.webp' },
      { label: 'Dr Giovanni Scornavacca aesthetic doctor at Carisma Malta', src: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.webp' },
      { label: 'Dr Francesca Chircop aesthetic doctor at Carisma Malta', src: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.webp' },
      { label: 'lineVector.png', src: '/wix/87fc13_7502c14a8f8c4a5d8e75362f7366465a~mv2.webp' },
      { label: 'Carisma Slimming Guide - sustainable weight loss management Malta', src: '/wix/87fc13_fae77cba7c5843e1ae57040ac00c3cce~mv2.webp' },
      { label: 'Carisma Spa & Wellness', src: '/wix/87fc13_a62cc8038b274204a2fe70fd3d4879d0~mv2.webp' },
      { label: 'SpaLogo.png', src: '/wix/87fc13_e2e5f077c0024cbc9a3d975e4a009b7e~mv2.png' },
      { label: 'Carisma Aesthetics Malta medical aesthetics treatments', src: '/wix/87fc13_bdc2b69242844d529915c2f20b2584ac~mv2.webp' },
      { label: 'aeslogo.png', src: '/wix/87fc13_b5a7ec4b11f445b4879c36d7268ba6d1~mv2.png' },
      { label: 'Group 1707481632.png', src: '/wix/87fc13_6e75c766df9749f48a8a564a1a88f57b~mv2.png' },
      { label: 'telephone.png', src: '/wix/87fc13_ed26f88b483840519efa6093c563b6f6~mv2.png' },
      { label: 'mail.png', src: '/wix/87fc13_ae79398aefc9410a9e412c39555ce540~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 1.png', src: '/wix/87fc13_da080776ce53414b9227e41f9c0c4fc9~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 2.png', src: '/wix/87fc13_0a6cf5f4a62b4f539db1cfd671363e68~mv2.png' },
    ],
  },
  'muscle-stimulation': {
    id: 'muscle-stimulation',
    liveSlug: 'muscle-stimulation',
    liveUrl: 'https://www.carismaslimming.com/muscle-stimulation',
    treatment: 'Muscle Stimulation (EMSculpt NEO)',
    seoTitle: 'EMSculpt NEO Malta | Build Muscle & Burn Fat | Carisma Slimming',
    seoDescription: '',
    hero: {
      eyebrow:
        "#1 voted slimming clinic in malta ▫️ Malta's most comprehensive slimming program ▫️ Medically qualified doctors",
      heading: 'EMSculpt NEO MALTA - 3 in 1 body sculpt protocol',
      description:
        'Stronger, tighter, more defined in 4 focused sessions. Our 3-in-1 EMSculpt NEO course combines HIFEM + RF to stimulate powerful contractions, support local fat reduction and improve firmness, with outcomes varying by body and adherence.',
    },
    title: 'EMSculpt NEO Malta',
    subtitle: '3 in 1 body sculpt protocol',
    tagline: 'Stronger, tighter, more defined in 4 focused sessions.',
    description:
      'A treatment combining electromagnetic muscle stimulation with radiofrequency technology. Published device studies report changes in fat thickness, muscle growth and strength after a standard course, with each session delivering powerful supramaximal contractions.',
    cardDescription:
      'High-intensity electromagnetic pulses with the effect of 20,000 sit-ups in one 30 minute session. Tones, supports posture and refines shape with no downtime.',
    narrativeSections: [
      {
        heading: 'The Secret to a More Defined, Confident Look',
        body: 'You\'re eating well, staying active, and making an effort — yet certain areas still feel soft or undefined. Your tummy doesn\'t feel as firm as it should, your hips or bum lack shape, and your clothes don\'t reflect the work you\'re putting in. The scale may move slightly, but your body definition doesn\'t.\n\nYou exercise regularly, but some areas still won\'t tone up. Your stomach feels soft rather than firm and sculpted. You want visible muscle definition without spending hours at the gym. You\'re tired of doing "more reps" without seeing real shape change.\n\nIf this sounds familiar, effort isn\'t the issue. Some areas need direct muscle activation and targeted fat reduction. EMSculpt Neo uses high-intensity electromagnetic energy combined with radiofrequency to stimulate powerful muscle contractions, reduce local fat, and tighten the skin — helping your body finally look stronger, firmer, and more defined.',
      },
      {
        heading: 'The Carisma Difference',
        body: "We're a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don't just lose weight, you step into your strongest form.\n\n- Doctor led: full medical check and body scan\n- One integrated program: medical, diet, movement and treatments together\n- Real gym included: Technogym facility, semi-private classes and PT\n- High touch support: weekly check ins, progress reports and WhatsApp follow up\n- Evidence based devices: Emsculpt NEO, coolsculpting and RF skin tightening\n- Selective entry and measurable progress tracked with body composition data",
      },
      {
        heading: 'EMSculpt Neo Technology',
        body: 'Builds muscle, burns fat and tightens skin in one 30 minute treatment.\n\nEMSculpt NEO combines high-intensity focused electromagnetic (HIFEM) pulses with radiofrequency heating. The RF gently warms the tissue and fat, while HIFEM drives thousands of powerful muscle contractions that you could never achieve in a normal workout. Over the next weeks your body responds by building muscle fibres, using local fat as fuel and firming the area.\n\nClinical studies show up to about 30 percent fat reduction, 25 percent muscle growth and around 29 percent increase in muscle strength in the treated area after a standard course. Each session delivers up to 20,000 supra-maximal contractions for the chosen muscle group. Results typically start to show from 4–12 weeks after the final session as muscle adapts and fat reduces. No needles, no surgery and little to no downtime for most people. You lie back while the device does the work, with each treatment lasting about 30 minutes.\n\nMuscle strengthening, tone & metabolic support',
      },
      {
        heading: 'The Carisma Difference (Commitment)',
        body: 'Visible inch loss and shape change, not vague promises. Plans that work with your age, hormones and metabolism. No crash diets, no banned foods, no endless hours of cardio. Medical grade technology and treatments delivered by trained professionals.',
      },
      {
        heading: 'FAQ',
        body: 'What is included in the EMSculpt Neo Ultimate 3-in-1 Body Sculpt Protocol?\nThe protocol includes four EMSculpt Neo sessions combining high-intensity electromagnetic muscle stimulation with radiofrequency. Treatments are planned after an in-person consultation to target specific areas such as the tummy, hips, bum, or thighs.\n\nAm I a good candidate for EMSculpt Neo?\nEMSculpt Neo is best suited for people who are close to their goal weight but want improved muscle definition, firmness, and contouring. It is not intended for significant weight loss and works best when combined with a healthy lifestyle.\n\nHow does EMSculpt Neo actually work?\nEMSculpt Neo uses HIFEM technology to trigger powerful muscle contractions that cannot be achieved through voluntary exercise. At the same time, radiofrequency energy helps support fat reduction and skin tightening in the treated area.\n\nDoes EMSculpt Neo replace the gym?\nEMSculpt Neo is not a replacement for exercise, but it can significantly enhance results. Many people use it to target areas that are hard to tone or to accelerate muscle definition when gym workouts alone are not delivering visible changes.\n\nHow many areas can be treated?\nEach session typically focuses on one main area. During your consultation, the practitioner will advise which areas can be treated and how sessions should be scheduled to achieve balanced results.\n\nDoes the treatment hurt?\nThe sensation feels like very strong muscle contractions combined with warmth. It is intense but generally well tolerated, and intensity can be adjusted to your comfort level. No anaesthesia or needles are required.\n\nIs there any downtime after EMSculpt Neo?\nThere is no downtime. You can return to normal activities immediately after your session. Some people experience temporary muscle soreness similar to post-workout fatigue.\n\nWhen will I start seeing results?\n[Answer truncated in source extraction — not retrievable via WebFetch; per the technology section, results typically start to show from 4–12 weeks after the final session.]',
      },
      {
        heading: 'Primary CTA',
        body: 'CLAIM YOUR SPOT NOW\n\nTotal Value: €625 Today: €199 Only',
      },
    ],
    namedBenefits: [
      {
        heading: 'TARGETED BODY SCULPTING',
        body: 'Focus on the areas that matter most — tummy, hips, bum or thighs — using targeted EMSculpt Neo technology to improve muscle definition and firmness where exercise often falls short.',
      },
      {
        heading: 'DUAL-ACTION RESULTS',
        body: 'EMSculpt Neo combines high-intensity electromagnetic muscle stimulation with radiofrequency to build muscle, reduce local fat, and tighten the skin in a single treatment protocol.',
      },
      {
        heading: 'EXPERT DESIGNED PLAN',
        body: 'Your in-person consultation maps out which areas to treat, how sessions are scheduled, and what realistic sculpting and toning results you can expect.',
      },
      {
        heading: 'SAFE AND CLINICALLY CERTIFIED',
        body: 'Treatments are performed by trained medical professionals using EU-approved, clinically proven body sculpting technology with no surgery and no downtime.',
      },
    ],
    benefits: [
      '30% Fat reduction across the protocol',
      '25% Muscle growth across the protocol',
      '29% Muscle strength across the protocol',
      'The effect of 20,000 sit ups per session',
      'No downtime',
    ],
    packages: [
      {
        name: 'EMSculpt NEO Ultimate 3-in-1 Body Sculpt Protocol',
        price: '€199 (Total/Regular value: €625; individual sessions €100 each)',
        includes: [
          { label: '4x Muscle Stimulation sessions with EMSculpt NEO', value: '€400' },
          { label: '4x access to spa & fitness facilities', value: '€140' },
          { label: 'Tanita Body Composition Analysis', value: '€60' },
          { label: '€25 Carisma Aesthetics credit', value: '€25' },
          { label: 'Complimentary Parking Validation' },
        ],
        notes: 'Includes four sessions to be followed over the course of 2 - 4 weeks.',
      },
    ],
    packageName: 'EMSculpt NEO Ultimate 3-in-1 Body Sculpt Protocol',
    packagePrice: '€199',
    packageValue: '€625',
    packageIncludes: [
      { label: '4x Muscle Stimulation sessions with EMSculpt NEO', value: '€400' },
      { label: '4x access to spa & fitness facilities', value: '€140' },
      { label: 'Tanita Body Composition Analysis', value: '€60' },
      { label: '€25 Carisma Aesthetics credit', value: '€25' },
      { label: 'Complimentary Parking Validation' },
    ],
    treatableAreas: [
      'Abdomen/Core',
      'Tummy',
      'Glutes/Buttocks (bum)',
      'Hips',
      'Thighs (front and back)',
      'Calves',
      'Upper Arms (biceps and triceps)',
    ],
    duration: 'Each treatment lasts about 30 minutes; four sessions over 2-4 weeks.',
    imagePlaceholder: 'EMSculpt NEO device + before/after photo',
    heroImage: '/wix/87fc13_a965179046514c2a8ad7bec0b7f44127~mv2.jpg',
    imagesNeeded: [
      { label: 'Group 1707481377.png', src: '/wix/87fc13_7685319028a14ef0ace54298d2e74acb~mv2.png' },
      { label: 'Backgroung.png', src: '/wix/87fc13_f0e92ac188af4582a4dcab0d17d5d2ed~mv2.webp' },
      { label: 'google.png', src: '/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png' },
      { label: 'Screen-Shot-2024-12-16-at-09.58.11-300x183-removebg-preview.png', src: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png' },
      { label: 'EMSculpt', src: '/wix/87fc13_a965179046514c2a8ad7bec0b7f44127~mv2.jpg' },
      { label: 'malta-today-logo.jpg', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.14.jpeg', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.15 (1).jpeg', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
      { label: 'timesmalta.png', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
      { label: 'mttoday.png', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
      { label: '78 4.png', src: '/wix/87fc13_8e99d1d5c7ad4fd78b70f1f0de0d7ab6~mv2.png' },
      { label: '79 4.png', src: '/wix/87fc13_5ace280de18f431d8d590aefa10f27e8~mv2.png' },
      { label: '81 1.png', src: '/wix/87fc13_b4783b8ab4ad480fa01394e449f91d34~mv2.png' },
      { label: '78 1.png', src: '/wix/87fc13_729173bc08764a74bee017b037d95d5b~mv2.png' },
      { label: 'Vector (30).png', src: '/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.webp' },
      { label: 'Group 1707479766.png', src: '/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png' },
      { label: 'EMSculpt Neo', src: '/wix/87fc13_1a54a17987f64e6fb275b2721b8dc7f4~mv2.webp' },
      { label: '254.png', src: '/wix/87fc13_d3785f87c3e5437faaf5ea75ec9c4e55~mv2.png' },
      { label: 'Line 1803.png', src: '/wix/87fc13_a33e3307da684fa0a47f3105d09dc796~mv2.png' },
      { label: 'location.png', src: '/wix/87fc13_387683ad0f4c499c8cab338b5f800aa0~mv2.png' },
      { label: 'rise.png', src: '/wix/87fc13_9011dffd287245ed9d60f5663e21edba~mv2.png' },
      { label: 'dollar-symbol.png', src: '/wix/87fc13_c4cf7001e0324fbd84551191d2a27bd1~mv2.png' },
      { label: 'parking-sign (1).png', src: '/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png' },
      { label: '415483.png', src: '/wix/87fc13_0b07a9fc055e494aa7490b9c55eb935b~mv2.webp' },
      { label: '415484.png', src: '/wix/87fc13_9fd33781c744437abdb94bb6766a47fe~mv2.webp' },
      { label: '415485.png', src: '/wix/87fc13_f7421e199b2e4fe7b08156e14260c090~mv2.webp' },
      { label: '415486.png', src: '/wix/87fc13_846e99e2270a4d76b876c07a7cfe8915~mv2.webp' },
      { label: 'Rectangle 12134.png', src: '/wix/87fc13_5299fc2afac246a99d0def94c92bc3c1~mv2.webp' },
      { label: 'Dr Zaid Teebi medical weight loss consultant Malta', src: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.webp' },
      { label: 'Rectangle 12135.png', src: '/wix/87fc13_d8caba88b3084d04aef31e39cc2a6b2e~mv2.webp' },
      { label: 'Dr Giovanni Scornavacca aesthetic doctor at Carisma Malta', src: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.webp' },
      { label: 'Dr Francesca Chircop aesthetic doctor at Carisma Malta', src: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.webp' },
      { label: 'lineVector.png', src: '/wix/87fc13_7502c14a8f8c4a5d8e75362f7366465a~mv2.webp' },
      { label: 'Carisma Slimming Guide - sustainable weight loss management Malta', src: '/wix/87fc13_fae77cba7c5843e1ae57040ac00c3cce~mv2.webp' },
      { label: 'Carisma Spa & Wellness', src: '/wix/87fc13_a62cc8038b274204a2fe70fd3d4879d0~mv2.webp' },
      { label: 'SpaLogo.png', src: '/wix/87fc13_e2e5f077c0024cbc9a3d975e4a009b7e~mv2.png' },
      { label: 'Carisma Aesthetics Malta medical aesthetics treatments', src: '/wix/87fc13_bdc2b69242844d529915c2f20b2584ac~mv2.webp' },
      { label: 'aeslogo.png', src: '/wix/87fc13_b5a7ec4b11f445b4879c36d7268ba6d1~mv2.png' },
      { label: 'Group 1707481632.png', src: '/wix/87fc13_6e75c766df9749f48a8a564a1a88f57b~mv2.png' },
      { label: 'telephone.png', src: '/wix/87fc13_ed26f88b483840519efa6093c563b6f6~mv2.png' },
      { label: 'mail.png', src: '/wix/87fc13_ae79398aefc9410a9e412c39555ce540~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 1.png', src: '/wix/87fc13_da080776ce53414b9227e41f9c0c4fc9~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 2.png', src: '/wix/87fc13_0a6cf5f4a62b4f539db1cfd671363e68~mv2.png' },
    ],
  },
  'skin-tightening': {
    id: 'skin-tightening',
    liveSlug: 'skin-tightening',
    liveUrl: 'https://www.carismaslimming.com/skin-tightening',
    treatment: 'Skin Tightening (VelaShape III)',
    seoTitle: 'VelaShape III Malta | Skin Tightening | Carisma Slimming',
    seoDescription: 'VelaShape III skin tightening in Malta. Reduce cellulite, contour your body, tighten loose skin. Non-invasive with no downtime. Book your free assessment.',
    ogImage: 'https://static.wixstatic.com/media/f940f0_91c17052f86d48088597ba76c4ac8057~mv2.png/v1/fill/w_2500,h_2523,al_c/f940f0_91c17052f86d48088597ba76c4ac8057~mv2.png',
    hero: {
      eyebrow:
        "#1 voted slimming clinic in malta ▫️ Malta's most comprehensive slimming program ▫️ Medically qualified doctors",
      heading: 'VELASHAPE III IN MALTA - 4-in-1 skin tightening protocol',
      description:
        'Smoother, firmer, and tighter skin in 4 focused sessions. Our 4 in 1 course with the VelaShape III uses radiofrequency, infrared heat, vacuum and mechanical massage together to stimulate collagen to tighten and smoothen your skin.',
    },
    title: 'VelaShape III in Malta',
    subtitle: '4-in-1 skin tightening protocol',
    tagline: 'Smoother, firmer, and tighter skin in 4 focused sessions.',
    description:
      'VelaShape III combines radiofrequency, infrared heat, vacuum and mechanical massage together to stimulate collagen to tighten and smoothen your skin. The approach targets individuals who have achieved weight loss but experience persistent loose or uneven skin in areas like the abdomen, hips, thighs, or buttocks.',
    cardDescription:
      'Combines radiofrequency, infrared light, vacuum and massage to stimulate collagen, improve texture, reduce mild laxity and smooth the appearance of cellulite.',
    narrativeSections: [
      {
        heading:
          'THE SECRET TO A MORE DEFINED, CONFIDENT LOOK — tighten loose skin and smooth stubborn areas — without surgery',
        body: 'You\'ve done the hard part. You\'re close to your goal weight, eating better, moving more yet certain areas still don\'t look the way you want. Loose skin around the tummy, hips or bum can linger, even when the scale says you\'re doing everything right.\n\n- You\'ve lost weight, but mild loose or uneven skin remains\n- Cellulite makes skin look bumpy or less firm in certain areas\n- You want visible tightening without surgery or downtime\n- You\'re tired of being told to "just wait" or "work out more"\n\nIf this sounds familiar, it\'s not a lack of effort. Skin laxity and cellulite often need targeted stimulation, not more dieting. Our 4-in-1 VelaShape III Skin Tightening Protocol combines advanced technologies to stimulate collagen, improve firmness, and smooth texture helping your skin finally reflect the progress you\'ve already made.',
      },
      {
        heading: 'THE CARISMA DIFFERENCE — we are not another diet clinic.',
        body: "We're a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don't just lose weight, you step into your strongest form.",
      },
      {
        heading: 'OUR TECHNOLOGY — internationally renowned, FDA-approved modalities',
        body: 'VELASHAPE III\n\nSmooths cellulite, tightens skin and improves contour in one comfortable treatment.\n\nVelaShape III combines four technologies in a single session: radiofrequency, infrared heat, vacuum suction and mechanical rollers. The heat stimulates collagen, the suction boosts circulation and lymph flow, and the mechanical massage smooths the surface of the skin. Over the next weeks your skin becomes firmer, tighter and more even looking.\n\n- Proven efficacy: Shown to reduce the appearance of cellulite and improve skin firmness in clinical studies.\n- Visible smoothing: Skin can look more even and refined after a short series of treatments.\n- Gentle tightening: Helps mild loose skin from weight loss, pregnancy or natural ageing.\n- Non invasive: No needles, no surgery and no downtime for most people.\n- Comfortable sessions: Feels like a warm, deep massage with each treatment lasting about 30 minutes.',
      },
      {
        heading: "MALTA'S MOST EFFECTIVE 4-IN-1 SKIN TIGHTENING STARTER PROTOCOL",
        body: 'Targeted SKIN TIGHTENING: Four focused VelaShape III sessions designed to treat one or more priority areas such as the tummy, hips, thighs or bum, depending on your goals.\n\nVisible, NOTICEABLE IMPROVEMENT: Skin feels firmer and smoother over the course of treatments, with improvements you can see in clothes and feel to the touch — not just on a machine.\n\nCOLLAGEN-STIMULATING TECHNOLOGY: Radiofrequency and infrared energy work together with vacuum and mechanical massage to support collagen production and improve skin texture.',
      },
      {
        heading: 'FAQ — What is included in the 4-in-1 Skin Tightening Protocol?',
        body: 'The protocol includes four VelaShape III sessions combining radiofrequency, infrared heat, vacuum suction, and mechanical massage. Together, these technologies work to tighten skin, smooth uneven texture, and improve firmness.',
      },
      {
        heading: 'FAQ — Who is this treatment best suited for?',
        body: 'This treatment is ideal for people who are close to their goal weight but have mild loose or uneven skin around areas such as the tummy, hips, thighs, or bum, often after weight loss or pregnancy.',
      },
      {
        heading: 'FAQ — Does VelaShape III help with weight loss?',
        body: 'No. VelaShape III is not a weight-loss treatment. It is designed to tighten skin, smooth texture, and improve firmness, rather than reduce overall body weight.',
      },
      {
        heading: 'FAQ — How does VelaShape III tighten the skin?',
        body: 'VelaShape III gently heats the deeper layers of the skin using radiofrequency and infrared energy. This stimulates collagen remodelling while vacuum and mechanical massage improve circulation, helping the skin look firmer and smoother over time.',
      },
      {
        heading: 'FAQ — Does the treatment hurt?',
        body: 'The treatment is generally comfortable. Most clients describe a warm, deep massage sensation. Intensity can be adjusted to ensure comfort throughout the session.',
      },
      {
        heading: 'FAQ — Is there any downtime after treatment?',
        body: 'No downtime is required. You can return to normal activities immediately after your session. Mild redness or warmth may occur temporarily but usually resolves quickly.',
      },
      {
        heading: 'FAQ — When will I start seeing results?',
        body: 'Some people notice smoother skin after the first few sessions. Visible tightening and improved firmness typically develop gradually over the course of the treatment plan and continue to improve in the weeks following completion.',
      },
      {
        heading: 'FAQ — How long do the results last?',
        body: 'Results can be long-lasting when supported by a healthy lifestyle and stable weight. Maintenance sessions may be recommended depending on individual skin quality and goals.',
      },
    ],
    namedBenefits: [
      {
        heading: 'TARGETED SKIN TIGHTENING',
        body: 'Focus on your biggest trouble spot first so love handles, lower belly or double chin start to look smoother in clothes and photos.',
      },
      {
        heading: '4-IN-1 TECHNOLOGY APPROACH',
        body: 'We focus on the areas that concern you most tummy, hips, bum or thighs using targeted technology to improve firmness and skin texture where it matters most.',
      },
      {
        heading: 'EXPERT DESIGNED PLAN',
        body: 'Your in-person consultation determines the right areas to treat, how sessions are scheduled, and what realistic tightening results you can expect.',
      },
      {
        heading: 'SAFE AND CLINICALLY CERTIFIED',
        body: 'All treatments are performed by trained medical professionals using EU-approved, clinically tested technology with no surgery and no downtime.',
      },
    ],
    benefits: [
      'Tightens and smoothens skin',
      'Stimulates collagen',
      'Improves texture',
      'Reduces mild laxity',
      'Smooths the appearance of cellulite',
      'Feels like a warm, deep massage',
    ],
    packages: [
      {
        name: '4-in-1 Skin Tightening Protocol with VelaShape III',
        price: '€199 for 4 sessions (Total Value: €625) — Individual sessions: €100 per session',
        includes: [
          { label: '4x Skin tightening sessions with VelaShape III', value: '€400 value' },
          { label: '4x access to spa & fitness facilities', value: '€140 value' },
          { label: 'Tanita Body Composition Analysis', value: '€60 value' },
          { label: '€25 Carisma Aesthetics credit', value: '€25 value' },
          { label: 'Complimentary Parking Validation' },
        ],
        notes: 'Individual sessions available at €100 per session.',
      },
    ],
    packageName: '4-in-1 Skin Tightening Protocol with VelaShape III',
    packagePrice: '€199',
    packageValue: '€625',
    packageIncludes: [
      { label: '4x Skin tightening sessions with VelaShape III', value: '€400' },
      { label: '4x access to spa & fitness facilities', value: '€140' },
      { label: 'Tanita Body Composition Analysis', value: '€60' },
      { label: '€25 Carisma Aesthetics credit', value: '€25' },
      { label: 'Complimentary Parking Validation' },
    ],
    treatableAreas: [
      'Tummy/Abdomen',
      'Neck',
      'Arms',
      'Buttocks and under-butt crease',
      'Thighs (front, back, inner and outer)',
      'Hips',
    ],
    duration:
      '4 sessions followed over the course of 2-4 weeks. Individual sessions approximately 30 minutes each.',
    imagePlaceholder: 'VelaShape III before/after photo',
    heroImage: '/wix/87fc13_9b8bca36cbde4c16b23d79ab96ac5286~mv2.webp',
    imagesNeeded: [
      { label: 'Group 1707481377.png', src: '/wix/87fc13_7685319028a14ef0ace54298d2e74acb~mv2.png' },
      { label: 'Backgroung.png', src: '/wix/87fc13_f0e92ac188af4582a4dcab0d17d5d2ed~mv2.webp' },
      { label: 'google.png', src: '/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png' },
      { label: 'Screen-Shot-2024-12-16-at-09.58.11-300x183-removebg-preview.png', src: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png' },
      { label: 'Velashape III device', src: '/wix/87fc13_76c7882984cf42de95304b10e6fd263f~mv2.webp' },
      { label: 'malta-today-logo.jpg', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.14.jpeg', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.15 (1).jpeg', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
      { label: 'timesmalta.png', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
      { label: 'mttoday.png', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
      { label: '79 5.png', src: '/wix/87fc13_010fe195cd7146cd8569b0d7aa447125~mv2.png' },
      { label: '78 5.png', src: '/wix/87fc13_d4665eee701b4f84b1d08c331fb0b1da~mv2.png' },
      { label: '81 1.png', src: '/wix/87fc13_b4783b8ab4ad480fa01394e449f91d34~mv2.png' },
      { label: '78 1.png', src: '/wix/87fc13_729173bc08764a74bee017b037d95d5b~mv2.png' },
      { label: 'CarismaSlim_Batch-48 1.png', src: '/wix/87fc13_9b8bca36cbde4c16b23d79ab96ac5286~mv2.webp' },
      { label: 'Vector (30).png', src: '/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.webp' },
      { label: 'Group 1707479766.png', src: '/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png' },
      { label: 'Velashape III Before & After', src: '/wix/87fc13_056fc4bfc20b42c1ad5b0fbaddb94718~mv2.webp' },
      { label: 'Line 1803.png', src: '/wix/87fc13_a33e3307da684fa0a47f3105d09dc796~mv2.png' },
      { label: 'location.png', src: '/wix/87fc13_387683ad0f4c499c8cab338b5f800aa0~mv2.png' },
      { label: 'rise.png', src: '/wix/87fc13_9011dffd287245ed9d60f5663e21edba~mv2.png' },
      { label: 'dollar-symbol.png', src: '/wix/87fc13_c4cf7001e0324fbd84551191d2a27bd1~mv2.png' },
      { label: 'parking-sign (1).png', src: '/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png' },
      { label: '415487.png', src: '/wix/87fc13_d160679a5a4f4729ac97ef7172222e36~mv2.webp' },
      { label: '415488.png', src: '/wix/87fc13_c7f1f5fa97a24c65b42f750c0d47af08~mv2.webp' },
      { label: '415489.png', src: '/wix/87fc13_93af23f487254333a309ca13e8732d59~mv2.webp' },
      { label: '415490.png', src: '/wix/87fc13_880b5c63634f410b999a6d5b329e67d8~mv2.webp' },
      { label: 'Rectangle 12134.png', src: '/wix/87fc13_5299fc2afac246a99d0def94c92bc3c1~mv2.webp' },
      { label: 'Dr Zaid Teebi medical weight loss consultant Malta', src: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.webp' },
      { label: 'Rectangle 12135.png', src: '/wix/87fc13_d8caba88b3084d04aef31e39cc2a6b2e~mv2.webp' },
      { label: 'Dr Giovanni Scornavacca aesthetic doctor at Carisma Malta', src: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.webp' },
      { label: 'Dr Francesca Chircop aesthetic doctor at Carisma Malta', src: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.webp' },
      { label: 'lineVector.png', src: '/wix/87fc13_7502c14a8f8c4a5d8e75362f7366465a~mv2.webp' },
      { label: 'Carisma Slimming Guide - sustainable weight loss management Malta', src: '/wix/87fc13_fae77cba7c5843e1ae57040ac00c3cce~mv2.webp' },
      { label: 'Carisma Spa & Wellness', src: '/wix/87fc13_a62cc8038b274204a2fe70fd3d4879d0~mv2.webp' },
      { label: 'SpaLogo.png', src: '/wix/87fc13_e2e5f077c0024cbc9a3d975e4a009b7e~mv2.png' },
      { label: 'Carisma Aesthetics Malta medical aesthetics treatments', src: '/wix/87fc13_bdc2b69242844d529915c2f20b2584ac~mv2.webp' },
      { label: 'aeslogo.png', src: '/wix/87fc13_b5a7ec4b11f445b4879c36d7268ba6d1~mv2.png' },
      { label: 'Group 1707481632.png', src: '/wix/87fc13_6e75c766df9749f48a8a564a1a88f57b~mv2.png' },
      { label: 'telephone.png', src: '/wix/87fc13_ed26f88b483840519efa6093c563b6f6~mv2.png' },
      { label: 'mail.png', src: '/wix/87fc13_ae79398aefc9410a9e412c39555ce540~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 1.png', src: '/wix/87fc13_da080776ce53414b9227e41f9c0c4fc9~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 2.png', src: '/wix/87fc13_0a6cf5f4a62b4f539db1cfd671363e68~mv2.png' },
    ],
  },
  'lipocavitation': {
    id: 'lipocavitation',
    liveSlug: 'lipocavitation-malta',
    liveUrl: 'https://www.carismaslimming.com/lipocavitation-malta',
    treatment: 'Lipocavitation',
    seoTitle: 'Lipocavitation Malta | Fat Reduction | Carisma Slimming',
    seoDescription: 'Lipocavitation Fat Redultion in Malta. Reduce cellulite, contour your body, tighten loose skin. Non-invasive with no downtime. Book your free assessment.',
    ogImage: 'https://static.wixstatic.com/media/f940f0_91c17052f86d48088597ba76c4ac8057~mv2.png/v1/fill/w_2500,h_2523,al_c/f940f0_91c17052f86d48088597ba76c4ac8057~mv2.png',
    hero: {
      eyebrow: 'NON-INVASIVE FAT CONTOURING IN MALTA',
      heading: 'stubborn fat, met its match',
      description:
        'For the belly that doesn\'t budge. The flanks that ignore every diet. The areas that have resisted everything until now. No surgery, no needles, no downtime.',
    },
    title: 'Non-invasive fat contouring in Malta',
    subtitle: 'Lipocavitation Malta',
    description:
      'Certain fat deposits resist diet and exercise due to biology rather than behaviour. Carisma is a doctor-led transformation program combining medical oversight, nutrition guidance, and body contouring technology. Lipocavitation uses low-frequency ultrasound waves to target fat cell membranes. The disrupted fat cells release their contents, which are then processed and cleared by your body’s own lymphatic system.',
    cardDescription:
      'Advanced low-frequency ultrasound breaks down fat cell membranes for natural elimination through your lymphatic system. Non-invasive, no scarring.',
    narrativeSections: [
      {
        heading: 'THE SECRET TO A MORE DEFINED, CONFIDENT LOOK',
        body: "some fat simply doesn't respond to effort. that's not a personal failing.\n\nYou've been consistent. You eat well, you move your body, you've put in the work — and for the most part, it shows. But there are areas that just won't shift. The lower belly. The flanks. The inner thighs. No matter what you do, they stay exactly where they are.\n\nThat's not a discipline problem. That's not something you missed or didn't try hard enough. Certain fat deposits are physiologically resistant to diet and exercise — they're held in place by biology, not behaviour. And that distinction matters.\n\nMost of the women who come to us aren't starting from scratch. They're already doing the right things. They just want support in the one area where effort alone isn't enough. That's exactly what we're here for.",
      },
      {
        heading: "MALTA'S TRUSTED CLINIC FOR NON SURGICAL BODY CONTOURING",
        body: '[Section header only; no body text present on page.]',
      },
      {
        heading: 'THE CARISMA DIFFERENCE',
        body: "we are not another diet clinic.\n\nWe're a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don't just lose weight, you step into your strongest form.",
      },
      {
        heading: 'OUR COMMITMENT',
        body: '- Visible inch loss and shape change, not vague promises\n- Plans that work with your age, hormones and metabolism\n- No crash diets, no banned foods, no endless hours of cardio\n- Medical grade technology and treatments delivered by trained professionals',
      },
      {
        heading: 'WHY MALTA CHOOSES CARISMA',
        body: '- Created by the team behind Malta\'s leading spa and medical aesthetics centres\n- Doctor led medical slimming, not a beauty salon "diet program"\n- All in one approach: assessment, nutrition, movement and treatments\n- High touch support with weekly check ins and WhatsApp coaching',
      },
      {
        heading: 'HOW LIPOCAVITATION WORKS',
        body: "Lipocavitation works by directing low-frequency ultrasound waves into the targeted fat layer beneath the skin. This creates a process called acoustic cavitation — microscopic bubbles form and implode around fat cell membranes, causing them to break down and release their contents. The liquefied fat is then transported to the liver and eliminated naturally by the body's lymphatic system, the same process your body uses to clear waste every day. Surrounding skin, nerves and blood vessels are unaffected throughout.",
      },
      {
        heading: 'FAQ — How many sessions will I need?',
        body: 'Most clients complete a course of 6 to 8 sessions, spaced one week apart. Your doctor will recommend a personalised plan at your initial assessment based on your body composition and goals. The starter pack includes 4 sessions, designed to let you see measurable progress before committing to a full course.',
      },
      {
        heading: 'FAQ — Does it hurt?',
        body: 'No. The sensation is typically described as warm and massage-like. There is no pain, no discomfort, and nothing invasive at any point during the treatment.',
      },
      {
        heading: 'FAQ — When will I see results?',
        body: 'Most clients begin to notice a visible reduction in the treated area from around the third or fourth session. Results continue to develop as your body eliminates the broken-down fat between sessions — improvement is gradual and measurable, not instant.',
      },
      {
        heading: 'FAQ — Are the results permanent?',
        body: 'The fat cells affected during treatment are gradually processed by your body. Remaining fat cells can still expand with significant weight gain, so maintaining a balanced diet and active lifestyle supports long-term results.',
      },
      {
        heading: 'FAQ — Which areas can be treated?',
        body: 'Lipocavitation is effective on the lower belly, flanks, inner and outer thighs, hips, upper arms, and back fat. Your clinician will confirm the most appropriate areas for you at your assessment.',
      },
      {
        heading: 'FAQ — Can I combine this with other treatments?',
        body: 'Yes — many clients combine lipocavitation with VelaShape skin tightening to improve texture and firmness in the same area, or with EMSculpt NEO for simultaneous muscle toning. Your doctor will advise which combination is best suited to your goals.',
      },
      {
        heading: 'FAQ — Is there any downtime?',
        body: 'None at all. You can return to work, exercise, or your normal routine immediately after your session. There is no redness, swelling, or recovery period.',
      },
      {
        heading: 'FAQ — Who is not a suitable candidate?',
        body: 'Lipocavitation is not suitable during pregnancy or breastfeeding, or for anyone with a pacemaker, active implanted electronic device, active cancer, severe liver or kidney disease, metal implants in the treatment area, or active skin conditions or open wounds at the target site. Suitability is always confirmed by our doctor before treatment begins.',
      },
      {
        heading: 'CALL TO ACTION',
        body: 'claim your spot now',
      },
    ],
    namedBenefits: [
      {
        heading: 'ULTRASOUND PRECISION',
        body: 'Low-frequency ultrasound waves are directed to targeted areas beneath the skin. The energy is specific enough to act on fat cell membranes without affecting the surrounding tissue.',
      },
      {
        heading: 'NATURAL FAT ELIMINATION',
        body: "The disrupted fat cells release their contents, which are then processed and cleared by your body's own lymphatic system — a natural, gradual elimination process that continues working between sessions.",
      },
      {
        heading: 'VISIBLE, MEASURABLE RESULTS',
        body: "As your body eliminates the broken-down fat, you'll notice a reduction in inches and circumference in the treated area, along with smoother, firmer-looking skin texture over the course of your treatment plan.",
      },
      {
        heading: 'SAFE AND CLINICALLY CERTIFIED',
        body: 'All treatments are performed by trained medical professionals using EU-approved, clinically tested technology with no surgery and no downtime.',
      },
    ],
    benefits: [
      'Non-invasive treatment',
      'Natural fat elimination via the lymphatic system',
      'No scarring',
      'Comfortable procedure',
      'Gradual, natural results',
    ],
    packages: [
      {
        name: "The Contour Starter Pack (Malta's Targeted Fat Contouring Starter Pack)",
        price: '€199 for 4 sessions (Total Value: €625)',
        includes: [
          { label: '4x Lipocavitation sessions', value: '€400' },
          { label: '4x access to spa & fitness facilities', value: '€140' },
          { label: 'Tanita Body Composition Analysis', value: '€60' },
          { label: '€25 Carisma Aesthetics credit', value: '€25' },
          { label: 'Complimentary Parking Validation' },
        ],
        notes: 'Individual sessions priced at €100. Four sessions to be followed over 2 weeks per pricing note.',
      },
    ],
    packageName: "The Contour Starter Pack (Malta's Targeted Fat Contouring Starter Pack)",
    packagePrice: '€199',
    packageValue: '€625',
    packageIncludes: [
      { label: '4x Lipocavitation sessions', value: '€400' },
      { label: '4x access to spa & fitness facilities', value: '€140' },
      { label: 'Tanita Body Composition Analysis', value: '€60' },
      { label: '€25 Carisma Aesthetics credit', value: '€25' },
      { label: 'Complimentary Parking Validation' },
    ],
    treatableAreas: [
      'Tummy / Abdomen',
      'Back Fat & Bra Line',
      'Flanks & Love Handles',
      'Hips',
      'Buttocks & Banana Roll',
      'Thighs (front, back, inner and outer)',
      'Upper arms (per FAQ)',
    ],
    duration:
      'Each session lasts approximately 30 to 45 minutes. The starter pack of four sessions runs over 2-4 weeks (2 weeks per pricing note). Most clients complete a full course of 6 to 8 sessions, spaced one week apart.',
    imagePlaceholder: 'Lipocavitation treatment / before/after photo',
    heroImage: '/wix/f940f0_3959a9b1203c41b09ca238cd2c75ee35~mv2.webp',
    imagesNeeded: [
      { label: 'Group 1707481377.png', src: '/wix/87fc13_7685319028a14ef0ace54298d2e74acb~mv2.png' },
      { label: 'Backgroung.png', src: '/wix/87fc13_f0e92ac188af4582a4dcab0d17d5d2ed~mv2.webp' },
      { label: 'google.png', src: '/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png' },
      { label: 'daily story_apr26.png', src: '/wix/f940f0_e59104c7159440e4bb3ce6643acd584e~mv2.webp' },
      { label: 'Screen-Shot-2024-12-16-at-09.58.11-300x183-removebg-preview.png', src: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png' },
      { label: 'Untitled design.png', src: '/wix/f940f0_3959a9b1203c41b09ca238cd2c75ee35~mv2.webp' },
      { label: 'malta-today-logo.jpg', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.14.jpeg', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.15 (1).jpeg', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
      { label: 'timesmalta.png', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
      { label: 'mttoday.png', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
      { label: '79 5.png', src: '/wix/87fc13_010fe195cd7146cd8569b0d7aa447125~mv2.png' },
      { label: '78 5.png', src: '/wix/87fc13_d4665eee701b4f84b1d08c331fb0b1da~mv2.png' },
      { label: '81 1.png', src: '/wix/87fc13_b4783b8ab4ad480fa01394e449f91d34~mv2.png' },
      { label: '78 1.png', src: '/wix/87fc13_729173bc08764a74bee017b037d95d5b~mv2.png' },
      { label: 'Untitled design (1).png', src: '/wix/f940f0_4e251e5949424e95ab95d965c3b63716~mv2.webp' },
      { label: 'Vector (30).png', src: '/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.webp' },
      { label: 'Group 1707479766.png', src: '/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png' },
      { label: 'Velashape III Before & After', src: '/wix/87fc13_056fc4bfc20b42c1ad5b0fbaddb94718~mv2.webp' },
      { label: 'Line 1803.png', src: '/wix/87fc13_a33e3307da684fa0a47f3105d09dc796~mv2.png' },
      { label: 'Group 1707480366.png', src: '/wix/f940f0_5d528cb2d0ad4c86bf19428948598716~mv2.png' },
      { label: 'Vector.png', src: '/wix/f940f0_32bb31b8ebf8486fa96cc4209fd89686~mv2.png' },
      { label: 'Group.png', src: '/wix/f940f0_723eda38368c4415885adb03e592dc99~mv2.png' },
      { label: 'parking-sign (1).png', src: '/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png' },
      { label: '415487.png', src: '/wix/87fc13_d160679a5a4f4729ac97ef7172222e36~mv2.webp' },
      { label: '415488.png', src: '/wix/87fc13_c7f1f5fa97a24c65b42f750c0d47af08~mv2.webp' },
      { label: '415489.png', src: '/wix/87fc13_93af23f487254333a309ca13e8732d59~mv2.webp' },
      { label: '415490.png', src: '/wix/87fc13_880b5c63634f410b999a6d5b329e67d8~mv2.webp' },
      { label: 'Rectangle 12134.png', src: '/wix/87fc13_5299fc2afac246a99d0def94c92bc3c1~mv2.webp' },
      { label: 'Dr Zaid Teebi medical weight loss consultant Malta', src: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.webp' },
      { label: 'Rectangle 12135.png', src: '/wix/87fc13_d8caba88b3084d04aef31e39cc2a6b2e~mv2.webp' },
      { label: 'Dr Giovanni Scornavacca aesthetic doctor at Carisma Malta', src: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.webp' },
      { label: 'Dr Francesca Chircop aesthetic doctor at Carisma Malta', src: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.webp' },
      { label: 'lineVector.png', src: '/wix/87fc13_7502c14a8f8c4a5d8e75362f7366465a~mv2.webp' },
      { label: 'Carisma Slimming Guide - sustainable weight loss management Malta', src: '/wix/87fc13_fae77cba7c5843e1ae57040ac00c3cce~mv2.webp' },
      { label: 'Carisma Spa & Wellness', src: '/wix/87fc13_a62cc8038b274204a2fe70fd3d4879d0~mv2.webp' },
      { label: 'SpaLogo.png', src: '/wix/87fc13_e2e5f077c0024cbc9a3d975e4a009b7e~mv2.png' },
      { label: 'Carisma Aesthetics Malta medical aesthetics treatments', src: '/wix/87fc13_bdc2b69242844d529915c2f20b2584ac~mv2.webp' },
      { label: 'aeslogo.png', src: '/wix/87fc13_b5a7ec4b11f445b4879c36d7268ba6d1~mv2.png' },
      { label: 'Group 1707481632.png', src: '/wix/87fc13_6e75c766df9749f48a8a564a1a88f57b~mv2.png' },
      { label: 'telephone.png', src: '/wix/87fc13_ed26f88b483840519efa6093c563b6f6~mv2.png' },
      { label: 'mail.png', src: '/wix/87fc13_ae79398aefc9410a9e412c39555ce540~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 1.png', src: '/wix/87fc13_da080776ce53414b9227e41f9c0c4fc9~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 2.png', src: '/wix/87fc13_0a6cf5f4a62b4f539db1cfd671363e68~mv2.png' },
    ],
  },
  'anti-cellulite': {
    id: 'anti-cellulite',
    liveSlug: 'anti-cellulite',
    liveUrl: 'https://www.carismaslimming.com/anti-cellulite',
    treatment: 'Anti Cellulite',
    seoTitle: 'Cellulite Treatment Malta | VelaShape III | Carisma Slimming',
    seoDescription: 'Cellulite treatment in Malta using VelaShape III technology to support smoother-looking skin. Non-invasive, no downtime for most clients.',
    hero: {
      eyebrow: 'ADVANCED CELLULITE SMOOTHING',
      heading: 'cellulift & contour protocol',
      description:
        'Our cellulite protocol combines three VelaShape vacuum roller sessions with one lymphatic drainage massage to smooth the appearance of cellulite, uneven texture, and support circulation',
    },
    title: 'Advanced Cellulite Smoothing',
    subtitle: 'CelluLift & contour protocol',
    description:
      'Cellulite results from circulation, fluid retention, and connective tissue structure - not weight alone. CelluLift combines targeted VelaShape vacuum roller treatments with lymphatic drainage massage to smooth texture and improve circulation. You may exercise regularly, but the bumpy texture never fully smooths out - CelluLift addresses visible dimpling that persists despite fitness efforts.',
    cardDescription:
      'Targeted VelaShape vacuum roller treatments combined with lymphatic drainage to smooth texture, improve circulation and reduce visible dimpling.',
    narrativeSections: [
      {
        heading: 'the secret to a more defined, confident look',
        body: 'smooth stubborn cellulite and uneven texture with precision\n\nYou eat well, stay active, and take care of yourself — yet cellulite on your thighs, bum or hips still shows through... CelluLift combines targeted VelaShape vacuum roller treatments with lymphatic drainage massage to help smooth texture, improve circulation, and leave skin looking more even and contoured.',
      },
      {
        heading: 'we are not another diet clinic.',
        body: "We're a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don't just lose weight, you step into your strongest form.",
      },
      {
        heading: "malta's trusted clinic for non surgical fat reduction",
        body: 'Featured in local media including Malta Today, Times Malta, and MT Today. Carisma is positioned as a recognized provider of non-surgical fat reduction in the region. The integrated program includes: Doctor-led medical assessment and body scans; an integrated program combining medical, diet, movement, and treatments; an on-site Technogym facility with semi-private classes and PT; weekly check-ins, progress reports, and WhatsApp support; FDA-approved devices (Emsculpt NEO, CoolSculpting, RF skin tightening); and selective entry with measurable progress tracking.',
      },
      {
        heading: 'internationally renowned, FDA-approved modalities',
        body: 'The protocol uses internationally renowned, FDA-approved modalities.',
      },
      {
        heading: 'VELASHAPE III (CELLULIFT PROTOCOL)',
        body: 'Smooths the appearance of cellulite, improves skin texture and refines contour in one comfortable treatment. CelluLift uses VelaShape III vacuum roller technology to target the structural causes of visible cellulite. Each session combines radiofrequency, infrared heat, vacuum suction and mechanical rollers to soften fibrous tissue, boost circulation and support lymphatic flow...',
      },
      {
        heading: 'FAQ',
        body: 'What is included in the CelluLift protocol?\nThe protocol includes three VelaShape vacuum roller sessions combined with one lymphatic drainage massage, designed to smooth cellulite, improve circulation, and refine skin texture.\n\nWho is this treatment best suited for?\nCelluLift is ideal for people who are close to their goal weight but have visible cellulite on areas such as the thighs, bum, or hips that hasn\'t improved with diet or exercise.\n\nDoes CelluLift help with weight loss?\nNo. CelluLift is not a weight-loss treatment. It focuses on cellulite smoothing, skin texture improvement, and contour refinement, not reducing overall body weight.\n\nHow does CelluLift improve the appearance of cellulite?\nIt works by improving circulation, mobilising stiff tissue, supporting lymphatic flow, and softening the fibrous structures that create the dimpled look of cellulite.\n\nDoes the treatment hurt?\nThe treatment feels like a deep mechanical massage. Some areas may feel intense, especially where cellulite is denser, but sessions are generally well tolerated and adjusted for comfort.\n\nIs there any downtime after treatment?\nNo downtime is required. You can return to normal activities immediately after each session.\n\nWhen will I start seeing results?\nMany clients notice smoother skin and improved texture after a few sessions. Results develop progressively over the course of the protocol and may continue improving afterwards.\n\nAre the results permanent?\nCellulite can return over time due to genetics, hormones, and lifestyle factors. Results can be long-lasting with maintenance sessions and healthy habits, but no treatment permanently eliminates cellulite.\n\nIs CelluLift safe?\n[Answer truncated in source document]',
      },
    ],
    namedBenefits: [
      {
        heading: 'TARGETED CELLULITE CONTOURING',
        body: 'Focus on areas most affected by cellulite — thighs, bum and hips — using targeted VelaShape vacuum roller treatments to improve texture and contour.',
      },
      {
        heading: 'MULTI-ACTION SMOOTHING APPROACH',
        body: 'CelluLift combines VelaShape vacuum roller sessions with lymphatic drainage massage to improve circulation, reduce fluid retention, and smooth the appearance of cellulite.',
      },
      {
        heading: 'EXPERT DESIGNED PLAN',
        body: 'Your in-person consultation determines the right areas to treat, how sessions are scheduled, and what realistic tightening results you can expect.',
      },
      {
        heading: 'SAFE AND CLINICALLY CERTIFIED',
        body: 'All treatments are performed by trained medical professionals using EU-approved, clinically tested technology with no surgery and no downtime.',
      },
    ],
    benefits: [
      'Smooths cellulite texture',
      'Improves circulation',
      'Reduces fluid retention',
      'Targets connective tissue structure',
      'Feels like a warm, deep mechanical massage',
    ],
    packages: [
      {
        name: 'cellulift & contour protocol',
        price: '€199 (Total Value: €625)',
        includes: [
          { label: '4x Anti Cellulite sessions with VelaShape', value: '€400' },
          { label: '4x access to spa & fitness facilities', value: '€140' },
          { label: 'Tanita Body Composition Analysis', value: '€60' },
          { label: '€25 Carisma Aesthetics credit', value: '€25' },
          { label: 'Complimentary Parking Validation' },
        ],
        notes: 'Due to high demand, packages are offered based on availability and may not always be guaranteed.',
      },
      {
        name: 'Individual VelaShape III session',
        price: '€100 per session',
        includes: [{ label: '1x VelaShape III session' }],
        notes: 'Single-session pricing.',
      },
    ],
    packageName: 'cellulift & contour protocol',
    packagePrice: '€199',
    packageValue: '€625',
    packageIncludes: [
      { label: '4x Anti Cellulite sessions with VelaShape', value: '€400' },
      { label: '4x access to spa & fitness facilities', value: '€140' },
      { label: 'Tanita Body Composition Analysis', value: '€60' },
      { label: '€25 Carisma Aesthetics credit', value: '€25' },
      { label: 'Complimentary Parking Validation' },
    ],
    treatableAreas: [
      'Thighs (front, back, inner, outer)',
      'Buttocks and under-butt crease',
      'Hips',
      'Arms',
    ],
    duration: 'Around 30 minutes per treatment. Protocol: 4 sessions over 2-4 weeks.',
    imagePlaceholder: 'Anti-cellulite (CelluLift) before/after photo',
    heroImage: '/wix/87fc13_8e6b2be93835401caee6402885a0fb6c~mv2.jpg',
    imagesNeeded: [
      { label: 'Group 1707481377.png', src: '/wix/87fc13_7685319028a14ef0ace54298d2e74acb~mv2.png' },
      { label: 'Backgroung.png', src: '/wix/87fc13_f0e92ac188af4582a4dcab0d17d5d2ed~mv2.webp' },
      { label: 'google.png', src: '/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png' },
      { label: 'Screen-Shot-2024-12-16-at-09.58.11-300x183-removebg-preview.png', src: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png' },
      { label: 'Velashape III Anti-Cellulite', src: '/wix/87fc13_8e6b2be93835401caee6402885a0fb6c~mv2.jpg' },
      { label: 'malta-today-logo.jpg', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.14.jpeg', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.15 (1).jpeg', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
      { label: 'timesmalta.png', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
      { label: 'mttoday.png', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
      { label: '78.png', src: '/wix/87fc13_83de975f116646a795c9db7ebdc3b4be~mv2.png' },
      { label: '79.png', src: '/wix/87fc13_3b19a298b5204a2283ceb70900d421b0~mv2.png' },
      { label: '81 1.png', src: '/wix/87fc13_b4783b8ab4ad480fa01394e449f91d34~mv2.png' },
      { label: '78 1.png', src: '/wix/87fc13_729173bc08764a74bee017b037d95d5b~mv2.png' },
      { label: 'CarismaSlim_Batch-64 1_edited.jpg', src: '/wix/87fc13_2b03ae3db08f45929726527724060704~mv2.jpg' },
      { label: 'Vector (30).png', src: '/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.webp' },
      { label: 'Group 1707479766.png', src: '/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png' },
      { label: 'Velashape III', src: '/wix/87fc13_056fc4bfc20b42c1ad5b0fbaddb94718~mv2.webp' },
      { label: 'Line 1803.png', src: '/wix/87fc13_a33e3307da684fa0a47f3105d09dc796~mv2.png' },
      { label: 'location.png', src: '/wix/87fc13_387683ad0f4c499c8cab338b5f800aa0~mv2.png' },
      { label: 'rise.png', src: '/wix/87fc13_9011dffd287245ed9d60f5663e21edba~mv2.png' },
      { label: 'dollar-symbol.png', src: '/wix/87fc13_c4cf7001e0324fbd84551191d2a27bd1~mv2.png' },
      { label: 'parking-sign (1).png', src: '/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png' },
      { label: 'Frame 1707482799.png', src: '/wix/87fc13_be8c4316bfbb46e9898da45f3e483bb2~mv2.webp' },
      { label: 'Frame 1707482800.png', src: '/wix/87fc13_377a0ff5d9774c708ec911dee12739ce~mv2.webp' },
      { label: 'Frame 1707482801.png', src: '/wix/87fc13_f1e71bcbbd304341985eb29e68c5e6c4~mv2.webp' },
      { label: 'Frame 1707482802.png', src: '/wix/87fc13_24d04796e297434fb9b4f7682f7a9384~mv2.webp' },
      { label: 'Rectangle 12134.png', src: '/wix/87fc13_5299fc2afac246a99d0def94c92bc3c1~mv2.webp' },
      { label: 'Dr Zaid Teebi medical weight loss consultant Malta', src: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.webp' },
      { label: 'Rectangle 12135.png', src: '/wix/87fc13_d8caba88b3084d04aef31e39cc2a6b2e~mv2.webp' },
      { label: 'Dr Giovanni Scornavacca aesthetic doctor at Carisma Malta', src: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.webp' },
      { label: 'Dr Francesca Chircop aesthetic doctor at Carisma Malta', src: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.webp' },
      { label: 'lineVector.png', src: '/wix/87fc13_7502c14a8f8c4a5d8e75362f7366465a~mv2.webp' },
      { label: 'Carisma Slimming Guide - sustainable weight loss management Malta', src: '/wix/87fc13_fae77cba7c5843e1ae57040ac00c3cce~mv2.webp' },
      { label: 'Carisma Spa & Wellness', src: '/wix/87fc13_a62cc8038b274204a2fe70fd3d4879d0~mv2.webp' },
      { label: 'SpaLogo.png', src: '/wix/87fc13_e2e5f077c0024cbc9a3d975e4a009b7e~mv2.png' },
      { label: 'Carisma Aesthetics Malta medical aesthetics treatments', src: '/wix/87fc13_bdc2b69242844d529915c2f20b2584ac~mv2.webp' },
      { label: 'aeslogo.png', src: '/wix/87fc13_b5a7ec4b11f445b4879c36d7268ba6d1~mv2.png' },
      { label: 'Group 1707481632.png', src: '/wix/87fc13_6e75c766df9749f48a8a564a1a88f57b~mv2.png' },
      { label: 'telephone.png', src: '/wix/87fc13_ed26f88b483840519efa6093c563b6f6~mv2.png' },
      { label: 'mail.png', src: '/wix/87fc13_ae79398aefc9410a9e412c39555ce540~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 1.png', src: '/wix/87fc13_da080776ce53414b9227e41f9c0c4fc9~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 2.png', src: '/wix/87fc13_0a6cf5f4a62b4f539db1cfd671363e68~mv2.png' },
    ],
  },
  'lymphatic-drainage': {
    id: 'lymphatic-drainage',
    liveSlug: 'lymphatic-drainage',
    liveUrl: 'https://www.carismaslimming.com/lymphatic-drainage',
    treatment: 'Lymphatic Drainage',
    seoTitle: 'Lymphatic Drainage Malta | Fluid Support | Carisma Slimming',
    hero: {
      eyebrow:
        "#1 VOTED SLIMMING CLINIC IN MALTA ▫️ MALTA'S MOST COMPREHENSIVE SLIMMING PROGRAM ▫️ MEDICALLY QUALIFIED DOCTORS",
      heading: 'EXPERT LED LYMPHATIC & CIRCULATION SUPPORT',
      description:
        'Our Lymphatic Drainage Therapy is a gentle, expert-guided treatment designed to stimulate lymph flow, support fluid balance, reduce fluid retention, and ease puffiness.',
    },
    title: 'Expert Led Lymphatic & Circulation Support',
    subtitle: 'Lymphatic drainage therapy',
    description:
      'Our Lymphatic Drainage Therapy is a gentle, expert-guided treatment designed to stimulate lymph flow, support fluid balance, reduce fluid retention, and ease puffiness. If you wake up swollen, experience recurring bloating, feelings of tightness, and slower recovery rates, it may suggest lymphatic flow needs support rather than lifestyle failures.',
    cardDescription:
      'Gentle, expert-guided compressive microvibration and massage that stimulates the lymphatic system to reduce fluid, support circulation and ease that puffy, heavy feeling.',
    narrativeSections: [
      {
        heading: 'WHEN HUNGER, NOT WILLPOWER, IS HOLDING YOU BACK',
        body: 'You eat well, try to stay active, and take care of yourself yet your body still feels bloated, tight, or sluggish. Swelling comes and goes, your skin feels puffy, and recovery feels slower than it should. You know something feels "off," but it\'s hard to explain and harder to fix on your own.\n\n- You wake up feeling swollen or heavy\n- Bloating or fluid retention comes back repeatedly\n- Your body feels tight, congested, or slow to recover\n- You\'re tired of solutions that don\'t address the root cause\n\nIf you\'re reading this and thinking, "This sounds like me," the issue may not be lifestyle or effort. Often, your lymphatic flow may need support to drain efficiently. When lymph flow is sluggish, fluid can accumulate in the body.\n\nLymphatic Drainage Therapy gently stimulates your lymphatic system, supporting circulation and reduced fluid retention — helping your body feel lighter, more balanced, and refreshed again.',
      },
      {
        heading: 'we are not another diet clinic.',
        body: "We're a doctor led transformation program that blends medical insight, sustainable nutrition, and modern body tech into one high touch system, so you don't just lose weight, you step into your strongest form.",
      },
      {
        heading: 'LYMPHATIC DRAINAGE THERAPY',
        body: 'The lymphatic system plays a vital role in fluid balance and immune support. When lymph flow becomes sluggish, fluid and waste products can accumulate in the body leading to bloating, swelling, heaviness, and slow recovery.\n\nLymphatic Drainage Therapy uses gentle, targeted techniques to stimulate lymph flow, helping the body move excess fluid while supporting circulation and overall wellbeing.\n\nAt our clinic, lymphatic drainage is used as a therapeutic support, not a cosmetic shortcut:\n\n- You begin with a professional consultation to assess your health history, symptoms, and suitability for treatment.\n- Your practitioner explains how lymphatic drainage works, what results to expect, and how often sessions may be recommended.\n- Treatment is delivered using controlled, medically guided techniques — never aggressively or without assessment.\n- We monitor your response and adjust frequency or approach as needed, ensuring comfort, safety, and effectiveness.\n\nIf lymphatic drainage is not appropriate for you, we are clear and transparent — and guide you toward alternative therapies that better support your health and goals.',
      },
      {
        heading: 'SUPPORTS LYMPHATIC FLOW, CIRCULATION & FLUID BALANCE',
        body: '- Helps reduce fluid retention, swelling, and bloating\n- Supports lymphatic flow and fluid movement\n- Designed to promote a lighter, more balanced feeling in the body\n- Always provided as part of a medically guided wellness approach',
      },
      {
        heading: 'FAQ — What is lymphatic drainage therapy?',
        body: 'Lymphatic drainage therapy is a gentle, non-invasive treatment designed to stimulate the lymphatic system. It helps support the natural movement of lymph fluid in the body, reducing fluid retention and improving circulation and overall wellbeing.',
      },
      {
        heading: 'FAQ — What concerns can lymphatic drainage help with?',
        body: 'Lymphatic drainage is commonly used to support bloating, swelling, fluid retention, feelings of heaviness, sluggish circulation, and post-procedure recovery. It may also help promote relaxation and a lighter, more balanced feeling in the body.',
      },
      {
        heading: 'FAQ — Is lymphatic drainage a massage?',
        body: 'No. While the treatment uses light, manual techniques, medical lymphatic drainage is not a traditional massage. The pressure and movements are specifically designed to stimulate lymph flow rather than muscles, and it is delivered with clinical intent rather than relaxation alone.',
      },
      {
        heading: 'FAQ — How many sessions will I need?',
        body: 'The number of sessions varies depending on your individual needs, goals, and how your body responds. Some people notice benefits after one session, while others may be advised to follow a short course of treatments for optimal support. This will be discussed during your consultation.',
      },
      {
        heading: 'FAQ — Is lymphatic drainage safe?',
        body: 'When performed by trained professionals following medical guidelines, lymphatic drainage is considered a safe and gentle therapy. A consultation is always required to ensure the treatment is appropriate for your health history and current condition.',
      },
      {
        heading: 'FAQ — Does the treatment hurt?',
        body: '[Answer present on page but could not be fully extracted verbatim — content was truncated by the source fetch. Rebuild step should re-capture this FAQ answer directly from the live page.]',
      },
    ],
    namedBenefits: [
      {
        heading: 'MEDICALLY GUIDED APPROACH',
        body: 'Your lymphatic drainage treatment is overseen by medical professionals, with careful assessment of your health history to ensure the therapy is safe, appropriate, and effective for your body.',
      },
      {
        heading: 'LYMPHATIC FLOW & FLUID SUPPORT',
        body: 'Gentle, targeted techniques are used to stimulate lymph flow, helping reduce fluid retention and relieve feelings of heaviness and congestion.',
      },
      {
        heading: 'EXPERT-DESIGNED TREATMENT PLAN',
        body: 'Your in-person consultation helps determine suitability, treatment frequency, and realistic outcomes — ensuring lymphatic drainage is delivered as part of a structured, personalised wellness plan.',
      },
      {
        heading: 'SAFE AND CLINICALLY CERTIFIED',
        body: 'All treatments are performed under clinical standards, using medically approved techniques, with professional supervision to prioritise comfort, safety, and results at every stage.',
      },
    ],
    benefits: [
      'Reduces fluid retention, swelling, and bloating',
      'Supports lymphatic flow and fluid movement',
      'Promotes a lighter, more balanced bodily sensation',
      'Delivered through a medically guided wellness approach',
    ],
    packages: [
      {
        name: '4x Lymphatic drainage massage',
        price: 'Total Value €665 | Today €299 ONLY',
        includes: [
          { label: '4x Lymphatic drainage massage', value: '€440' },
          { label: '4x access to spa & fitness facilities', value: '€140' },
          { label: 'Tanita Body Composition Analysis', value: '€60' },
          { label: '€25 Carisma Aesthetics credit', value: '€25' },
          { label: 'Complimentary Parking Validation' },
        ],
        notes: 'Individual sessions: €100. Total Value €665. Today €299 ONLY.',
      },
    ],
    packageName: '4x Lymphatic drainage massage',
    packagePrice: '€299',
    packageValue: '€665',
    packageIncludes: [
      { label: '4x Lymphatic drainage massage', value: '€440' },
      { label: '4x access to spa & fitness facilities', value: '€140' },
      { label: 'Tanita Body Composition Analysis', value: '€60' },
      { label: '€25 Carisma Aesthetics credit', value: '€25' },
      { label: 'Complimentary Parking Validation' },
    ],
    treatableAreas: [],
    duration: 'Not specified on the page.',
    imagePlaceholder: 'Lymphatic drainage therapy photo',
    heroImage: '/wix/87fc13_597101dd5e634161a957161a595de331~mv2.webp',
    imagesNeeded: [
      { label: 'Group 1707481377.png', src: '/wix/87fc13_7685319028a14ef0ace54298d2e74acb~mv2.png' },
      { label: 'Backgroung.png', src: '/wix/87fc13_f0e92ac188af4582a4dcab0d17d5d2ed~mv2.webp' },
      { label: 'google.png', src: '/wix/87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png' },
      { label: 'Screen-Shot-2024-12-16-at-09.58.11-300x183-removebg-preview.png', src: '/wix/f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png' },
      { label: 'Group 1707481653.png', src: '/wix/87fc13_c574290d2c144ad4b92ad39b34ba62d5~mv2.webp' },
      { label: 'Lympathic Drainage', src: '/wix/87fc13_597101dd5e634161a957161a595de331~mv2.webp' },
      { label: 'malta-today-logo.jpg', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.14.jpeg', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
      { label: 'WhatsApp Image 2025-10-30 at 02.54.15 (1).jpeg', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
      { label: 'timesmalta.png', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
      { label: 'mttoday.png', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
      { label: '80.png', src: '/wix/87fc13_cd0cd40707e34315b2ad2d4bb6ca67d4~mv2.png' },
      { label: '81.png', src: '/wix/87fc13_e504472e668d4f3c916d7c048696cde3~mv2.png' },
      { label: '81 1.png', src: '/wix/87fc13_b4783b8ab4ad480fa01394e449f91d34~mv2.png' },
      { label: '78 1.png', src: '/wix/87fc13_729173bc08764a74bee017b037d95d5b~mv2.png' },
      { label: 'Vector (30).png', src: '/wix/87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.webp' },
      { label: 'Group 1707479766.png', src: '/wix/87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png' },
      { label: 'Consultation', src: '/wix/87fc13_69b82cafbcc744d39a475402cf8fd33e~mv2.jpg' },
      { label: 'location.png', src: '/wix/87fc13_387683ad0f4c499c8cab338b5f800aa0~mv2.png' },
      { label: 'rise.png', src: '/wix/87fc13_9011dffd287245ed9d60f5663e21edba~mv2.png' },
      { label: 'dollar-symbol.png', src: '/wix/87fc13_c4cf7001e0324fbd84551191d2a27bd1~mv2.png' },
      { label: 'parking-sign (1).png', src: '/wix/87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png' },
      { label: 'Frame 1707482803.png', src: '/wix/87fc13_e7c53ad0e27445729ba68a17dd836565~mv2.webp' },
      { label: 'Frame 1707482804.png', src: '/wix/87fc13_100cadcde0c24b41b6960e00c3e3a096~mv2.webp' },
      { label: 'Frame 1707482805.png', src: '/wix/87fc13_48415cf7a9494953959c243e2171a5c4~mv2.webp' },
      { label: 'Frame 1707482806.png', src: '/wix/87fc13_764464d670ba4b96823c473518ceddd4~mv2.webp' },
      { label: 'Rectangle 12134.png', src: '/wix/87fc13_5299fc2afac246a99d0def94c92bc3c1~mv2.webp' },
      { label: 'Dr Zaid Teebi medical weight loss consultant Malta', src: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.webp' },
      { label: 'Rectangle 12135.png', src: '/wix/87fc13_d8caba88b3084d04aef31e39cc2a6b2e~mv2.webp' },
      { label: 'Dr Giovanni Scornavacca aesthetic doctor at Carisma Malta', src: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.webp' },
      { label: 'Dr Francesca Chircop aesthetic doctor at Carisma Malta', src: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.webp' },
      { label: 'lineVector.png', src: '/wix/87fc13_7502c14a8f8c4a5d8e75362f7366465a~mv2.webp' },
      { label: 'Carisma Slimming Guide - sustainable weight loss management Malta', src: '/wix/87fc13_fae77cba7c5843e1ae57040ac00c3cce~mv2.webp' },
      { label: 'Carisma Spa & Wellness', src: '/wix/87fc13_a62cc8038b274204a2fe70fd3d4879d0~mv2.webp' },
      { label: 'SpaLogo.png', src: '/wix/87fc13_e2e5f077c0024cbc9a3d975e4a009b7e~mv2.png' },
      { label: 'Carisma Aesthetics Malta medical aesthetics treatments', src: '/wix/87fc13_bdc2b69242844d529915c2f20b2584ac~mv2.webp' },
      { label: 'aeslogo.png', src: '/wix/87fc13_b5a7ec4b11f445b4879c36d7268ba6d1~mv2.png' },
      { label: 'Group 1707481632.png', src: '/wix/87fc13_6e75c766df9749f48a8a564a1a88f57b~mv2.png' },
      { label: 'telephone.png', src: '/wix/87fc13_ed26f88b483840519efa6093c563b6f6~mv2.png' },
      { label: 'mail.png', src: '/wix/87fc13_ae79398aefc9410a9e412c39555ce540~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 1.png', src: '/wix/87fc13_da080776ce53414b9227e41f9c0c4fc9~mv2.png' },
      { label: 'Playground IG - 2026-02-05T164219.207 2.png', src: '/wix/87fc13_0a6cf5f4a62b4f539db1cfd671363e68~mv2.png' },
    ],
  },
};

export const serviceOrder: string[] = [
  'fat-freezing',
  'fat-dissolving',
  'muscle-stimulation',
  'skin-tightening',
  'lipocavitation',
  'anti-cellulite',
  'lymphatic-drainage',
];

export function getOrderedServices(): Service[] {
  return serviceOrder.map((id) => services[id]).filter(Boolean);
}
