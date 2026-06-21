export type Doctor = {
  name: string;
  role: string;
  years: string;
  highlight: string; // 2-3 line distilled summary (shown by default)
  fullBio: string; // full text (revealed via "Read more")
  image: string; // portrait in /public
};

export const DOCTORS: Doctor[] = [
  {
    name: 'Dr. Zaid Teebi',
    role: 'Medical Consultant',
    years: '30+ years',
    highlight:
      'Leads our medical weight-loss programme. 30+ years in general medicine and geriatrics, with sports-medicine training (ACSM) and pain-management study at Harvard.',
    fullBio:
      'Dr Zaid Teebi is the medical consultant leading our weight loss and slimming programs, with over 30+ years of clinical experience. He holds credentials in general medicine, geriatrics, and specialised allergy training, allowing him to combine broad clinical insight with focused care. He also holds a certificate in Sports Medicine from the American College of Sports Medicine and completed training in Pain Management at Harvard Medical School (USA) and Allergy and allergy therapy at the Imperial College London (UK). Dr Teebi personally conducts detailed medical weight loss consultations and prescribes personalised meal plans: a comprehensive medical and allergy history, symptom chronology, family history, environmental and occupational factors, followed by a full clinical examination before recommending targeted diagnostic tests and therapy.',
    image: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.png',
  },
  {
    name: 'Dr. Giovanni Scornavacca',
    role: 'Aesthetic Doctor',
    years: '20+ years',
    highlight:
      'Italian aesthetic doctor, 20+ years across Rome and Bologna. Specialises in regenerative medicine (PRP, skin boosters) — restoration, not change; subtle and natural.',
    fullBio:
      "Dr. Giovanni is an Italian aesthetic doctor at Carisma Aesthetics, trained and practised for 20+ years in Italy with continued advanced education across leading universities in Rome, Bologna and other centres. He specialises in aesthetic medicine with a particular interest in regenerative approaches such as PRP, stem cells, pairing medical rigour with a calm, human manner. His philosophy is restoration, not change: every consultation begins with listening to your story and how you want to feel in your skin, then shaping a conservative, precisely paced plan that prioritises safety, clarity and natural balance. From softening expression lines and refining contour to improving tone, texture and early laxity, his results are subtle and harmonious—refreshed, never overdone. At our St Julian's clinic, Dr. Giovanni offers evidence-based treatments including dermal fillers, collagen stimulators, skin boosters, microneedling with mesotherapy, PRP and medical-grade laser therapies, guiding you thoughtfully through each step so you can glow with confidence.",
    image: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.png',
  },
  {
    name: 'Dr. Francesca Chircop',
    role: 'Medical Aesthetics',
    years: '8+ years',
    highlight:
      'London-trained aesthetic doctor with an orthopaedic-surgery foundation. Leads our Lip Flip and medical-grade laser care — precise, conservative, authentically you.',
    fullBio:
      'Dr. Francesca is a London-trained aesthetic doctor with 8+ years in medical aesthetics and a foundation in orthopaedic surgery, bringing precise anatomical insight to subtle, balanced results. Her philosophy is restoration, not change: every consultation begins with listening to your story and how you want to feel in your skin before shaping a conservative, personalised plan that prioritises safety, clarity, and natural harmony. She leads our Lip Flip enhancements and oversees the majority of our medical-grade laser hair removal care, pairing meticulous technique with advanced protocols for smooth, long-term results. Across anti-wrinkle injections, dermal fillers, skin boosters, PRP/regenerative techniques, microneedling with mesotherapy, and medical-grade lasers, she guides you thoughtfully through each step so the outcome feels authentically you—refreshed, never overdone.',
    image: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.png',
  },
];
