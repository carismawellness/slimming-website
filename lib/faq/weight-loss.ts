/**
 * Weight-loss page FAQ content — single source of truth.
 *
 * Consumed by both the visible FAQ accordion (app/weight-loss/page.tsx) and the
 * FAQPage JSON-LD in app/weight-loss/layout.tsx, so the structured data always
 * matches what users see (Google FAQ policy requirement).
 */
export interface WeightLossFaq {
  q: string;
  intro?: string;
  bullets?: string[];
  paras?: string[];
  outro?: string;
}

export const weightLossFaqs: WeightLossFaq[] = [
  {
    q: 'How is this transformation program different from a normal diet or gym plan?',
    intro: 'Most diets give you a meal plan and leave you alone. Most gyms give you machines and leave you alone. This program brings everything together under one roof:',
    bullets: [
      'Medical grade assessment and body scan',
      'Personalised nutrition with real accountability',
      'A movement plan that fits your level and lifestyle',
      'Access to premium devices like Emsculpt NEO, CoolSculpting and VelaShape where appropriate',
    ],
    outro: 'You are not guessing. You have a doctor led plan, a team watching your progress, and tools that work with your age, hormones and metabolism, not against them.',
  },
  {
    q: 'Who is this program really for, and do I need to be over 30 or in menopause to qualify?',
    paras: [
      'The program is for adults who feel stuck with their weight and want a safe, clinically guided solution. Many clients are in their thirties, forties and fifties, dealing with stress, work, family and sometimes hormonal changes such as peri menopause or menopause.',
      'You do not have to be a certain age or in a specific life stage to qualify. We look at your health, your goals and your capacity, then tell you honestly if this is the right fit for you.',
    ],
  },
  {
    q: 'How much weight can I realistically expect to lose, and how quickly will I start seeing changes?',
    paras: [
      'If you qualify for the program and follow the plan, many clients see steady weekly progress. Results vary and depend on your starting weight, body composition, health, medication, program length and how closely you follow your nutrition, movement and treatment plan.',
      'Typically, people feel a difference in energy, digestion and how clothes fit within the first 2 to 3 weeks. Visible changes in measurements and shape usually build steadily from weeks 4 to 6 onward. We track progress with body composition scans and measurements so you see changes in fat, muscle and inches, not just a single number on the scale.',
    ],
  },
  {
    q: 'What exactly happens in the medical assessment and body composition scan? Is it safe if I have existing health issues?',
    paras: [
      'In your assessment you sit with our doctor and go through your medical history, medications, past diets and any hormonal or metabolic concerns. We take clinical measurements and perform a body composition scan so we can see fat, muscle, visceral fat and water, not just your weight. We also talk about how you feel day to day, including fatigue, cravings, sleep, mood, digestion and joint pain.',
      'If needed, we may recommend blood tests, blood pressure checks or food intolerance tests before starting. Many clients already have conditions like high blood pressure, thyroid issues or early diabetes. That is exactly why we screen you properly and adapt the plan around your safety.',
    ],
  },
  {
    q: 'Will I have to follow a strict meal plan, or can I still eat bread, pasta, wine and eat out socially?',
    paras: [
      'You will have structure, not prison. We use a Mediterranean style framework with enough protein, vegetables and healthy fats, then fit it to your culture and lifestyle. We teach portions and timing so bread, pasta, wine and dessert can fit in the right way.',
      'We plan from the start for weekends, events and eating out. No food is automatically banned. The focus is on what you can consistently follow in real life, not a perfect plan you can only keep up for a week.',
    ],
  },
  {
    q: 'How much support do I actually get? Who checks on me, and what happens if I fall off track?',
    paras: [
      'You are supported from day one. You have weekly check ins with weigh ins and measurements, plus regular progress updates with small, clear adjustments. You can message your coach on WhatsApp when you are stuck, tempted or confused.',
      'One person follows your case from start to finish, so you are not repeating your story. If you fall off track or go quiet, we do not disappear. We reach out, understand what is happening and help you restart without judgement.',
    ],
  },
  {
    q: 'Do I have to use the gym and classes if I am very unfit, in pain or anxious about exercising?',
    paras: [
      'No. Movement is a tool, not a punishment. We always start from where you are.',
      'If you are very unfit or in pain, we may begin with simple step goals and low impact movement. If you feel ready, you can train in our Technogym equipped facilities with a clear written plan. You can choose between open gym, personal training and small semi private group classes.',
      'You and the team decide what makes sense for your body and your schedule. You will never be pushed into something you are not ready for.',
    ],
  },
  {
    q: 'Are treatments like Emsculpt NEO, CoolSculpting and VelaShape included, and how do you decide which ones I need?',
    paras: [
      'These treatments are powerful add ons, not magic on their own. Some transformation packages include a set number of sessions, others allow you to add treatments based on your goals and budget.',
      'We decide what is right for you by looking at your body composition, target areas, medical assessment and priorities, such as muscle, fat reduction, skin tightening or fluid retention. You will always know what is recommended, why it is recommended and what it costs before you decide.',
    ],
  },
  {
    q: 'Do I have to take GLP 1 medication (for example Ozempic)? How do you decide who it is right for and what about side effects?',
    paras: [
      'No. GLP 1 is an option, not a requirement.',
      'We consider GLP 1 for clients who meet the medical criteria, have health risks linked to their weight, and have already tried lifestyle changes without enough progress. If we think it may help, the doctor will explain how it works, review your medical history, check for contraindications and monitor you closely while you are on it.',
      'If it is not right for you, or you simply prefer not to use medication, we focus on lifestyle, movement and treatments instead.',
    ],
  },
  {
    q: 'How does the guarantee work, what does it cost, and are there payment plans available?',
    paras: [
      'Our extended support commitment means we only accept you if we believe we can help. If you complete your program as agreed and your follow up body scan shows no measurable change in key metrics, we may extend your structured support at no extra program fee.',
      'For extended support to apply you need to attend your agreed sessions and check ins, follow your nutrition and movement plan as best as possible, and inform us of major health or medication changes.',
      'Pricing depends on program length and which elements you include, such as treatments and personal training. We are fully transparent about costs before you start and can discuss payment options so you can spread your investment over time.',
    ],
  },
];

/** Flattens a structured FAQ answer into one plain-text string for JSON-LD. */
export function flattenWeightLossAnswer(f: WeightLossFaq): string {
  return [f.intro, ...(f.bullets ?? []), ...(f.paras ?? []), f.outro]
    .filter(Boolean)
    .join(' ');
}
