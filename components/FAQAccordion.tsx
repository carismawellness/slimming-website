'use client';

import { useState } from 'react';

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
const green = '#8EB093';
const taupe = '#9B8D83';
const taupeLight = '#AFA39D';

const FAQS: { q: string; a: string }[] = [
  { q: "What is medical weight loss and how does it work?", a: "Medical weight loss is a doctor-supervised approach to losing weight that addresses the biological, behavioural, and lifestyle factors behind weight gain. At Carisma Slimming in Malta, our program begins with a full medical assessment including blood tests, body composition analysis, and health screening. Based on your results, your doctor creates a personalised plan that may include Ozempic (semaglutide) or Mounjaro (tirzepatide) prescription support, structured nutrition, movement guidance, and weekly monitoring. Unlike fad diets, medical weight loss treats the root causes — appetite regulation, metabolic health, and sustainable habits." },
  { q: "How much does medical weight loss cost in Malta?", a: "The cost of medical weight loss at Carisma Slimming depends on your individual program, which is determined during your consultation. Your doctor will assess your health, goals, and the level of support you need — then provide clear, transparent pricing before you commit to anything. There are no hidden fees. The Ozempic price in Malta and Mounjaro price in Malta vary depending on the prescribed dose and treatment duration — your doctor will discuss medication costs separately if GLP-1 is recommended. Book a medical weight loss consultation at our St Julian's clinic for a personalised quote." },
  { q: "What is included in the medical weight loss program?", a: "Our program includes a full medical consultation, eligibility assessment, personalised treatment planning, and ongoing doctor monitoring. If suitable, Ozempic or Mounjaro prescription support is recommended as part of a wider plan that includes nutrition guidance, body composition analysis, movement programming, weekly check-ins, and a defined maintenance strategy. Everything is delivered under one roof at our weight loss clinic in Malta." },
  { q: "Am I a good candidate for medical weight loss?", a: "You may be a good candidate for medical weight loss if you have a BMI of 27 or above, struggle with constant hunger or food cravings, experience weight regain despite lifestyle efforts, or are dealing with menopause-related weight gain or insulin resistance. Your doctor will determine whether Ozempic, Mounjaro, or a non-medication pathway is most appropriate during your consultation, as this program requires a professional medical assessment." },
  { q: "What are GLP-1 medications like Ozempic and Mounjaro, and how do they help with weight loss?", a: "GLP-1 medications such as Ozempic (semaglutide) and Mounjaro (tirzepatide) are prescription-only treatments that support weight loss by mimicking natural fullness signals in your body. Mounjaro for weight loss has shown particularly strong results in clinical trials — tirzepatide achieved 20.2% average weight loss compared to 13.7% for semaglutide. Both medications help you feel satisfied sooner, reduce food cravings, and quiet persistent hunger. At our weight loss clinic in Malta, GLP-1 medications are never prescribed in isolation — they are always part of a structured medical weight loss program that includes nutrition, movement, and ongoing doctor supervision." },
  { q: "Are weight loss injections available in Malta?", a: "Yes. At Carisma Slimming, we offer GLP-1 weight loss injections including Ozempic and Mounjaro as part of our doctor-led medical weight loss program in Malta. These injections are prescription-only and are only prescribed after a full medical assessment confirms you are a suitable candidate. Weight loss injections work best when combined with structured nutrition, movement, and regular medical monitoring — which is exactly how our program is designed." },
  { q: "How soon will I see results from medical weight loss?", a: "Many patients notice reduced appetite and fewer cravings within the first two to three weeks of starting Ozempic or Mounjaro. Progress varies from person to person, but our target is up to 1 kg per week of safe, sustainable fat reduction. Your progress is tracked through regular body composition measurements, not just the scale. Results are monitored during weekly follow-up appointments with your doctor." },
  { q: "Are there side effects with GLP-1 weight loss medications?", a: "As with any prescription treatment, some patients may experience mild side effects when starting Ozempic or Mounjaro. The most common include nausea, constipation, and fatigue — all of which are managed through careful dose titration, nutrition adjustments, and regular monitoring. At our clinic in Malta, your doctor monitors your response to Ozempic or Mounjaro closely and adjusts your plan to keep you comfortable and progressing safely." },
  { q: "What makes Carisma Slimming the best weight loss clinic in Malta?", a: "Carisma Slimming is the only clinic in Malta to offer a doctor-led program with an extended care commitment — meaning if you complete your program and do not reach your target weight, we extend it at no extra fee. Our approach combines full medical assessment, Ozempic or Mounjaro prescription support where appropriate, personalised nutrition, Technogym training facilities, evidence-based body treatments (CoolSculpting, EMSculpt NEO), weekly doctor-supervised check-ins, and a defined maintenance plan. We are selective about who we accept because we stand behind every result." },
  { q: "How do I start a medical weight loss program in Malta?", a: "The first step is booking a consultation at our clinic in St Julian's, Malta. During this consultation, your doctor will review your health history, run initial assessments, and determine whether Ozempic, Mounjaro, or a non-medication pathway is right for you. You will receive a clear plan and transparent pricing before starting. Call +356 2780 2062 or book online to get started." },
  { q: "What is the difference between Mounjaro and Ozempic for weight loss?", a: "Mounjaro (tirzepatide) and Ozempic (semaglutide) are both GLP-1 medications used for weight loss, but they work differently. Mounjaro is a dual-agonist that targets both GLP-1 and GIP receptors, while Ozempic targets GLP-1 only. In clinical trials, Mounjaro for weight loss achieved an average of 20.2% body weight reduction compared to 13.7% for semaglutide. Both are effective, and the right choice depends on your medical history, how your body responds, and your doctor's recommendation. At Carisma Slimming, your doctor will assess whether Ozempic or Mounjaro is most appropriate for you during your consultation." },
  { q: "What is Ozempic face and how do you prevent it?", a: "Ozempic face refers to facial volume loss that can occur during rapid weight reduction, particularly on Ozempic or Mounjaro. When you lose a significant amount of weight quickly, fat in the face decreases, which can make the skin appear loose or aged. At our medical weight loss clinic in Malta, we mitigate this risk through controlled, gradual weight loss (up to 1 kg per week, not crash-pace), protein-first nutrition to preserve lean mass, strength training guidance to support overall body composition, and regular body composition monitoring. Our sister clinic Carisma Aesthetics also offers dermal filler treatments if facial volume restoration is desired after weight loss." },
  { q: "Is medical weight loss better than bariatric surgery?", a: "Medical weight loss and bariatric surgery serve different needs. Bariatric surgery such as gastric sleeve or gastric bypass is typically recommended for patients with a BMI over 40 or a BMI over 35 with serious health complications. Medical weight loss with Ozempic or Mounjaro support is a non-surgical option suitable for patients with a BMI of 27 or above who want to lose weight without the risks, recovery time, and permanence of surgery. Many patients explore Ozempic or Mounjaro before considering surgical options. At Carisma Slimming in Malta, our doctor-led program offers a structured alternative to bariatric surgery that includes Ozempic or Mounjaro, nutrition planning, body composition tracking, and a maintenance strategy — all without going under the knife." },
  { q: "What results can I expect in 6 weeks on the medical weight loss program?", a: "In the first 6 weeks on Ozempic or Mounjaro, most patients can expect to lose up to 5 to 6 kg when following the plan consistently. During this period, your body is adjusting to the medication — appetite typically reduces within the first two to three weeks, and measurable weight loss follows. Our Extended Care Commitment guarantees a 5 kg loss in 6 weeks. Progress is tracked through weekly body composition measurements, not just the scale, so you can see changes in body fat and muscle mass. Your doctor adjusts your plan at every check-in based on how your body is responding." }
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const visible = FAQS.map((f, i) => ({ f, i })).filter(({ f }) => f.q.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-10">
          <h2 className="text-center" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Frequently asked questions
          </h2>
          <div className="mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mx-auto" style={{ maxWidth: '300px' }}>
            <div className="flex items-center gap-2" style={{ borderBottom: `1px solid ${taupeLight}`, paddingBottom: '6px' }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Looking for something?"
                className="w-full bg-transparent outline-none"
                style={{ color: taupe, fontFamily: bodyFont, fontSize: '15px' }}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={taupeLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          {visible.map(({ f, i }) => {
            const isOpen = open === i;
            return (
              <div key={f.q} style={{ borderBottom: '1px solid #e6e6e1' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                  style={{ padding: '22px 4px', cursor: 'pointer', background: 'transparent' }}
                  aria-expanded={isOpen}
                >
                  <span style={{ color: taupe, fontFamily: wideFont, fontSize: '15px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>
                    {i + 1}. {f.q}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={taupe} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 4px 24px' }}>
                    <p style={{ color: taupe, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7 }}>{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
          {visible.length === 0 && (
            <p className="text-center py-8" style={{ color: taupe, fontFamily: bodyFont, fontSize: '15px' }}>No questions match your search.</p>
          )}
        </div>
      </div>
    </section>
  );
}
