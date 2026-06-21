// ───────────────────────────────────────────────────────────────────────────
// Carisma Slimming — REDESIGN content & brand tokens
//
// SINGLE SOURCE OF TRUTH for the /preview redesign. Every fact, claim, asset
// path, doctor credential and CTA link below is taken verbatim from the live
// site / existing codebase. Nothing here is invented:
//   • copy/claims  → live carismaslimming.com + app/page.tsx + components/*
//   • doctor bios  → components/BrandBlock.tsx
//   • assets       → public/wix/* (real downloaded Wix media), public/*
//   • booking URL  → lib/services.ts BOOKING_URL (Fresha free body analysis)
//   • reviews      → lib/reviews.ts (real Google listing: 4.7★, 303 reviews)
// ───────────────────────────────────────────────────────────────────────────

/** Brand palette — sampled from the live site computed styles. */
export const C = {
  sage: '#8EB093',        // primary brand accent
  sageDeep: '#5F7E66',    // deeper sage for text on light / strong accents
  sageInk: '#3C5142',     // darkest sage — headings on light
  taupe: '#9B8D83',       // primary body text
  taupeLt: '#AFA39D',     // secondary text
  blue: '#6391AB',        // CTA blue-grey (live button colour)
  blueDeep: '#4F7B95',
  cream: '#F6F2EA',       // warm page base
  creamDeep: '#EBE5D6',
  sageMist: '#F2F6EF',    // gradient panel top
  sageSoft: '#C9D8C1',    // gradient panel bottom
  line: '#E6E1DC',
  white: '#ffffff',
  ink: '#2B2B28',
} as const;

export const FONT = {
  serif: '"Trajan Pro", "Trajan Pro Regular", Georgia, serif',
  wide: '"Novecento Wide Book", "Novecento Wide", sans-serif',
  body: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
} as const;

/** Primary conversion link — the free body analysis booking on Fresha. */
export const BOOKING_URL =
  'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191';

export const CONTACT = {
  phone: '+356 27802062',
  phoneHref: 'tel:+35627802062',
  whatsappHref: 'https://wa.me/35627802062',
  email: 'info@carismaslimming.com',
  instagram: 'https://www.instagram.com/carismaslimming/',
  facebook: 'https://www.facebook.com/carismaaesthetics/',
  address: 'Grand Hotel Excelsior, Great Siege Road, Floriana FRN 1810, Malta',
  mapsEmbed:
    'https://maps.google.com/maps?q=Grand%20Hotel%20Excelsior%2C%20Great%20Siege%20Road%2C%20Floriana%20FRN%201810%2C%20Malta&z=15&output=embed',
} as const;

export const REVIEWS = { rating: 4.7, total: 303 } as const;

export const NAV = [
  { label: 'Method', href: '#method' },
  { label: 'How it works', href: '#journey' },
  { label: 'GLP-1', href: '#glp1' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
] as const;

/** Rotating trust-bar items (top announcement strip). */
export const TRUST_BAR = [
  '#1 voted slimming clinic in Malta 2025–2026',
  'Doctor-led medical weight loss',
  'Free body analysis & consultation',
  '4.7★ from 300+ reviews',
  'Complimentary on-site parking',
] as const;

export const HERO = {
  eyebrow: 'Doctor-led slimming in Malta',
  titleTop: 'Lose up to 1kg a week,',
  titleEm: 'with doctors by your side.',
  sub: "Malta's most comprehensive slimming program — medical weight loss, GLP-1 support where appropriate, personalised meal plans and body contouring, in one doctor-led plan.",
  bullets: [
    'Medical assessment with prescription GLP-1 support if appropriate',
    'Personalised meal plan with weekly check-ins',
    'In-clinic treatments to burn fat, tone muscle, tighten skin',
    'Habit-based training that protects long-term health',
  ],
  primaryCta: 'Get your free body analysis',
  secondaryCta: 'See how it works',
  video: '/IVana.mp4',
  videoPoster: '/Thumbnail.png',
  award: '/Malta.png',
} as const;

/** "As seen on" press logos (real assets from public/wix). */
export const PRESS = [
  { label: 'Malta Today', src: '/wix/f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg' },
  { label: 'Bay Radio Malta', src: '/wix/f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg' },
  { label: 'Lovin Malta', src: '/wix/f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg' },
  { label: 'Times of Malta', src: '/wix/f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png' },
  { label: 'MaltaToday', src: '/wix/f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png' },
] as const;

/** Headline trust counters. */
export const STATS = [
  { value: 35, suffix: '+', label: 'years in wellness, aesthetics & slimming' },
  { value: 300, suffix: '+', label: 'reviews across the group' },
  { value: 4.7, suffix: '★', label: 'average Google rating', decimals: 1 },
  { value: 1, prefix: 'up to ', suffix: 'kg', label: 'a week, measured & verified' },
] as const;

/** Problem section — why diets fail (empathetic framing, derived from site copy). */
export const PROBLEM = {
  eyebrow: 'Why most diets fail',
  title: "It was never about willpower.",
  body: "Discipline rarely holds under stress, busy schedules and decision fatigue. Generic diets ignore your age, hormones and metabolism — so the weight comes back. What's missing isn't effort. It's medical guidance, real accountability and a plan built around your life.",
  pains: [
    { t: 'No medical guidance', d: 'Crash diets with no assessment of your hormones, metabolism or bloods.' },
    { t: 'No accountability', d: 'You start strong, then drift — with no one tracking your progress.' },
    { t: 'One-size-fits-all', d: "Plans that don't fit your routine, culture or goals, so they never last." },
    { t: 'No body composition', d: 'The scale lies. Without measuring fat vs. muscle, you fly blind.' },
  ],
} as const;

/** The 4 core pillars (verbatim from app/page.tsx). */
export const PILLARS = [
  {
    n: '01',
    title: 'Medical weight loss assessment',
    tagline: 'Know your body before starting any program',
    icon: '/wix/87fc13_e4efa875484546fca9d640d39b9f0100~mv2.png',
    items: [
      'Tanita body composition analysis',
      'Doctor consultation for weight loss goals',
      'GLP-1 support if appropriate (Ozempic, Mounjaro)',
      'Fat dissolving injections for stubborn areas',
      'Blood tests and metabolic screening',
    ],
  },
  {
    n: '02',
    title: 'Personalised nutrition & accountability',
    tagline: 'Doctor-prescribed meal plan with a buddy',
    icon: '/wix/87fc13_d751907d21e84894ae37b1b33136d812~mv2.png',
    items: [
      'Meal plan that fits your routine, culture and goals',
      'Weekly weigh-ins to track your slimming progress',
      'One-to-one accountability with a weight loss coach',
      'Supplement support for metabolism and energy',
      'WhatsApp coaching between sessions',
    ],
  },
  {
    n: '03',
    title: 'Exercise & movement program',
    tagline: 'Realistic movement that fits your life',
    icon: '/wix/87fc13_1fdf47007d8a45c18e39603447edbb23~mv2.png',
    items: [
      'Open gym access at our Grand Hotel Excelsior',
      'Group classes for fat loss, strength and maintenance',
      'Personal training for guidance and motivation',
      'Customised workout plan for your level',
      'Flexible scheduling to fit your routine',
    ],
  },
  {
    n: '04',
    title: 'Targeted body contouring treatments',
    tagline: 'Clinic-grade treatments that speed up change',
    icon: '/wix/87fc13_da70307b66154a24b141dfb4fd26a1bb~mv2.png',
    items: [
      'EMSculpt NEO — build muscle and reduce fat',
      'CoolSculpting fat freezing — permanent fat reduction',
      'VelaShape III — smooth and firm loose skin',
      'Lymphatic drainage to reduce fluid retention',
      'Non-invasive with no downtime required',
    ],
  },
] as const;

/** Consultation journey — 5 steps (derived from site flow). */
export const JOURNEY = [
  { n: 1, t: 'Book your free body analysis', d: 'A no-pressure Tanita body composition scan and a conversation about your goals.' },
  { n: 2, t: 'Meet the medical team', d: 'Review your history, bloods and metabolism with a doctor who actually listens.' },
  { n: 3, t: 'Understand your body & goals', d: 'See exactly where you stand — fat, muscle, water — and what is realistic for you.' },
  { n: 4, t: 'Receive your personalised plan', d: 'Nutrition, movement, treatments and GLP-1 support if medically appropriate.' },
  { n: 5, t: 'Start with weekly support', d: 'Weekly check-ins, WhatsApp coaching and accountability that keeps you consistent.' },
] as const;

export const GLP1 = {
  eyebrow: 'Medical weight loss in Malta',
  title: 'GLP-1 support, used responsibly.',
  intro:
    'GLP-1s are naturally occurring hormones that help regulate appetite and blood sugar. Prescription GLP-1 medications — such as Ozempic and Mounjaro — mimic these signals so you feel full sooner and think about food less, when combined with a structured slimming plan and personalised meal plan.',
  note: 'At our clinic, GLP-1 is an optional tool within your program — not a shortcut for everyone.',
  steps: [
    'You first have a full medical assessment, body scan and review of your history and bloods',
    'If you medically qualify, the doctor explains your options, expected results and side effects so you can decide with confidence',
    'Any prescription is paired with a personalised meal plan, movement and accountability — never used on its own',
    'We monitor your progress and symptoms, adjust or stop treatment when needed, and plan for life after the medication',
    'If GLP-1 is not right for you, we tell you clearly and focus on non-medication routes that match your health and goals',
  ],
  capacity:
    'To protect quality of care, our transformation programs are limited to a small number of clients each month.',
  image: '/wix/87fc13_3028fef86af2454fa2fbdbb5dcd55d87~mv2.webp',
} as const;

/** Body contouring modalities (verbatim treatment descriptions from live site). */
export const TREATMENTS = [
  {
    name: 'GLP-1 (Mounjaro & Ozempic)',
    blurb: 'Prescription-only medical weight loss medication, used when medically appropriate, to calm appetite and support steady fat reduction alongside your personalised slimming plan.',
    img: '/wix/87fc13_6495820e70764a1fa3caddfb20d80fe0~mv2.webp',
    href: 'https://www.carismaslimming.com/medical-weight-loss',
  },
  {
    name: 'CoolSculpting — Fat Freezing',
    blurb: 'Targeted non-surgical fat removal using CoolSculpting fat freezing (cryolipolysis), with medical guidance for those last stubborn areas. FDA-cleared, performed at our Malta clinic.',
    img: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
    href: 'https://www.carismaslimming.com/fat-reduction',
  },
  {
    name: 'EMSculpt NEO — Muscle & Fat',
    blurb: 'High-intensity electromagnetic body sculpting that contracts your muscles thousands of times to build strength and reduce fat — without surgery or downtime.',
    img: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
    href: 'https://www.carismaslimming.com/muscle-stimulation',
  },
  {
    name: 'VelaShape III — Skin Tightening',
    blurb: 'Smooth and firm loose skin and reduce the appearance of cellulite, helping refine your silhouette as the weight comes off.',
    img: '/wix/87fc13_08e868147da2475ba4b9638849be145e~mv2.jpg',
    href: 'https://www.carismaslimming.com/skin-tightening',
  },
] as const;

/** "The Carisma difference" — commitment + why bullets (verbatim). */
export const WHY = {
  commitment: [
    'Visible inch loss and shape change through a medically supervised slimming program',
    'Weight loss plans that work with your age, hormones and metabolism',
    'No crash diets, no banned foods, no endless hours of cardio — just medical guidance and personalised meal plans',
    'Medical-grade slimming treatments and fat freezing technology delivered by trained professionals',
  ],
  why: [
    "Created by the team behind Malta's leading spa and medical aesthetics centres",
    'Doctor-led medical weight loss and slimming, not a beauty salon diet program',
    'All-in-one approach: medical assessment, personalised meal plans, movement and body contouring',
    'High-touch support with weekly check-ins, WhatsApp coaching and dedicated accountability',
  ],
  group:
    'Carisma Wellness Group brings over 35+ years of expertise in wellness, aesthetics and slimming. Guided by medical excellence and a passion for confidence.',
} as const;

/** Extended Care Commitment (verbatim). */
export const COMMITMENT = {
  promise:
    'We are selective about who joins our transformation programs — we only accept clients we genuinely believe we can help. If you qualify, complete your program and do not hit your target weight, we will extend your program at no extra program fee until we achieve your desired result.',
  agree: [
    'Attend all scheduled in-clinic sessions and weekly check-ins',
    'Follow your personalised food plan consistently and tell us when you struggle',
    'Complete your agreed physical activities and discuss any pain or obstacles',
    'Use only the treatments and medications recommended by our medical team',
    'Inform us of any major health or medication changes',
    'Avoid crash diets, extreme restriction or outside treatments that could affect your results',
  ],
} as const;

/** Doctors — photos + credentials verbatim from BrandBlock.tsx. */
export const DOCTORS = [
  {
    name: 'Dr. Zaid Teebi',
    role: 'Medical Consultant — Weight Loss',
    exp: '30+ years',
    img: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.webp',
    bio: 'Leads our weight loss and slimming programs with 30+ years of clinical experience across general medicine, geriatrics and specialised allergy training. Holds a certificate in Sports Medicine (American College of Sports Medicine) and completed Pain Management training at Harvard Medical School (USA) and allergy therapy at Imperial College London (UK). Personally conducts detailed medical weight loss consultations.',
  },
  {
    name: 'Dr. Giovanni Scornavacca',
    role: 'Aesthetic Doctor',
    exp: '20+ years',
    img: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.webp',
    bio: 'Italian aesthetic doctor trained and practised for 20+ years in Italy, with advanced education across leading universities in Rome and Bologna. Pairs medical rigour with a calm, human manner — his philosophy is restoration, not change: conservative, precisely paced plans that prioritise safety, clarity and natural balance.',
  },
  {
    name: 'Dr. Francesca Chircop',
    role: 'Medical Aesthetics',
    exp: '8+ years',
    img: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.webp',
    bio: 'London-trained aesthetic doctor with 8+ years in medical aesthetics and a foundation in orthopaedic surgery, bringing precise anatomical insight to subtle, balanced results. Every consultation begins with listening to your story before shaping a conservative, personalised plan that prioritises safety and natural harmony.',
  },
] as const;

/** Objection-led FAQ (answers grounded in real site content). */
export const FAQ = [
  {
    q: 'Who qualifies for the program?',
    a: 'We are selective — we only accept clients we genuinely believe we can help reach a healthy weight. Your free body analysis and medical assessment determine the right path for you. If a program is not right for you, we will tell you clearly.',
  },
  {
    q: 'Is the consultation really free?',
    a: 'Yes. Your first body analysis and consultation are complimentary, with no obligation. It includes a Tanita body composition scan and a conversation with our team about your goals.',
  },
  {
    q: 'Is GLP-1 suitable for everyone?',
    a: 'No. GLP-1 is an optional tool used only when medically appropriate, after a full assessment, body scan and review of your history and bloods. It is always paired with nutrition, movement and accountability — never used on its own.',
  },
  {
    q: 'How quickly can I see results?',
    a: 'With a medically supervised program, many clients work towards up to 1kg a week — measured and verified. Results vary by individual; your doctor will set realistic, healthy expectations for you.',
  },
  {
    q: 'Is this just another diet?',
    a: 'No. It is a doctor-led, all-in-one program: medical assessment, personalised meal plans, movement and body contouring — with weekly check-ins and coaching. No crash diets, no banned foods, no endless cardio.',
  },
  {
    q: 'What happens after I book?',
    a: 'You start with a free body analysis, meet the medical team, understand your body and goals, receive a personalised plan, and begin with weekly support and WhatsApp coaching between sessions.',
  },
  {
    q: 'Do I need to exercise?',
    a: 'Movement is one of four pillars, but it is realistic and built around your life — open gym access, group classes, personal training or a customised plan for your level. We meet you where you are.',
  },
  {
    q: 'Are body contouring treatments included?',
    a: 'Targeted treatments such as EMSculpt NEO, CoolSculpting fat freezing, VelaShape III and lymphatic drainage are part of the method and recommended when they will help your specific goals.',
  },
  {
    q: 'Is it safe and medically supervised?',
    a: 'Yes. The program is doctor-led and delivered by trained professionals, with metabolic screening, monitoring and adjustments throughout — not a beauty-salon diet program.',
  },
  {
    q: 'Where are you located?',
    a: 'At the Grand Hotel Excelsior, Great Siege Road, Floriana, Malta — with complimentary on-site parking.',
  },
] as const;

export const FINAL_CTA = {
  eyebrow: 'Your next step',
  title: 'Start with a free body analysis.',
  sub: 'Understand your body, learn your options, and begin with medical guidance — no pressure, no obligation. Spaces each month are limited to protect quality of care.',
  cta: 'Get your free body analysis',
} as const;
