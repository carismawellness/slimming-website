const bodyStyle: React.CSSProperties = {
  color: '#9B8D83',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '12px',
  lineHeight: 1.4,
};

/* Live renders the entire T&C as one continuous block of plain 12px body
   lines — headings, subheadings and enumerations have no special styling,
   no bullets, no indentation and no extra margins. */
function Para({ children }: { children: React.ReactNode }) {
  return <p style={bodyStyle}>{children}</p>;
}

function Heading({ children }: { children: React.ReactNode }) {
  return <p style={bodyStyle}>{children}</p>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <p style={bodyStyle}>{children}</p>;
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <>
      {items.map((item, i) => (
        <p key={i} style={bodyStyle}>
          {item}
        </p>
      ))}
    </>
  );
}

export default function TermsPage() {
  return (
    <main className="w-full">
      {/* Title */}
      <section className="bg-white">
        <div className="text-center px-4" style={{ paddingTop: '42px' }}>
          <h1 style={{ color: '#B0A68F', fontFamily: 'Trajan Pro, serif', fontWeight: 400, fontSize: '30px', lineHeight: '42px' }}>
            Terms &amp; Conditions
          </h1>
          <div className="mx-auto" style={{ width: '541px', maxWidth: '100%', borderTop: '1px solid #B0A68F' }} />
        </div>
      </section>

      {/* Content */}
      <section className="bg-white" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
        <div className="mx-auto px-4 lg:px-0" style={{ maxWidth: '980px' }}>

          <Para>TERMS AND CONDITIONS</Para>
          <Para>Carisma Aesthetics Ltd., trading as Carisma Slimming</Para>
          <Para>Last updated: 12 February, 2026</Para>

          {/* ====================== PART A ====================== */}
          <Para>PART A: GENERAL TERMS</Para>

          <Heading>1. Acceptance of Terms</Heading>
          <Para>1.1. By booking, attending, or using any of our slimming, weight management, body contouring, or related wellness services, you agree to be bound by these Terms and Conditions (“Terms”), our Cancellation and Rescheduling Policy (Section 18), our Privacy Notice (Part B), and any clinic instructions provided to you.</Para>
          <Para>1.2. These Terms should be read in conjunction with any Patient Consent Form signed by you. In the event of any conflict between these Terms and the Patient Consent Form, the Patient Consent Form shall prevail to the extent of the conflict, unless these Terms provide greater protection to you.</Para>
          <Para>1.3. If you do not agree to these Terms, you should not book or attend any appointments or use any of our services.</Para>

          <Heading>2. About the Clinic</Heading>
          <Para>2.1. Carisma Aesthetics Ltd. (the “Clinic”, “we”, “us”, or “our”) is a private limited liability company incorporated under the laws of Malta, with company registration number C 106006, and has its registered address at 35/16B Hever Court, Triq Moletta, Swieqi, SWQ 3532, Malta.</Para>

          <Heading>3. Definitions</Heading>
          <Para>3.1. In these Terms, the following definitions apply:</Para>
          {[
            ['Baseline Date', 'means the date of the Patient’s first medical consultation at which the weight loss target and measurement period are agreed in writing.'],
            ['Body Contouring Devices', 'means non-invasive body contouring devices and similar procedures used during the Treatment, including but not limited to devices using cryolipolysis, High Intensity Focused Electromagnetic (“HIFEM”) muscle stimulation, and radiofrequency.'],
            ['Clinic', 'means Carisma Aesthetics Ltd., trading as Carisma Slimming.'],
            ['Clinician', 'means a registered medical practitioner or other regulated health professional working with or on behalf of the Clinic. All prescriptions for Medication are issued by a registered medical practitioner. Other elements of the Treatment may be delivered by registered health professionals operating under the direction and supervision of a registered medical practitioner.'],
            ['Consultation', 'means the initial medical consultation conducted before or at the start of the Treatment.'],
            ['Extension Period', 'means the additional period of support that may be provided under the Weight Loss Guarantee Treatment, as described in Section 16.'],
            ['Injections', 'means injectable treatments for aesthetic body contouring and fat dissolving administered during the Treatment.'],
            ['Lifestyle Intervention', 'means nutrition, lifestyle and exercise plans, coaching and monitoring provided as part of the Treatment.'],
            ['Medication', 'means prescription weight loss medicines prescribed as part of the Treatment, including but not limited to GLP-1 receptor agonists and dual GIP/GLP-1 receptor agonists.'],
            ['Patient” or “you', 'means the individual participating in the Treatment.'],
            ['Personal Data', 'means both personal data and medical data collected, stored, and processed by the Clinic, as described in the Privacy Notice (Part B).'],
            ['Prescribing Clinician', 'means the registered medical practitioner responsible for prescribing Medication and overseeing the clinical aspects of the Treatment.'],
            ['Slimming Card', 'means the card provided by the Clinic to record participation in scheduled sessions, check-ins, and adherence to nutrition, lifestyle and exercise plans.'],
            ['Supportive Therapy', 'means supportive therapies such as lymphatic drainage massage provided as part of the Treatment.'],
            ['Treatment', 'means the elective medical and aesthetic weight-management programme provided by the Clinic, which may include Medication, Body Contouring Devices, Injections, Lifestyle Intervention, and Supportive Therapy.'],
            ['Treating Practitioner', 'means a registered health professional who delivers elements of the Treatment under the direction and supervision of the Prescribing Clinician.'],
            ['Weight Loss Guarantee Treatment', 'means the weight loss guarantee programme, if offered as part of the Patient’s package, subject to the terms in Section 16.'],
          ].map(([term, def], i) => (
            <Para key={i}>&ldquo;{term}&rdquo; {def}</Para>
          ))}

          <Heading>4. Services</Heading>
          <Para>4.1. We provide elective medical and aesthetic weight-management services, which may include body contouring treatments, weight management support, nutrition and lifestyle guidance, and related wellness services (the “Services”).</Para>
          <Para>4.2. Specific treatments and suitability vary by individual and may change as our offerings evolve.</Para>
          <Para>4.3. The Services do not constitute emergency medical care. The Clinic does not provide emergency medical services, and participation in the Treatment does not replace care from your general practitioner, doctors, or any other health specialist providers.</Para>
          <Para>4.4. All Medication is prescribed by a registered medical practitioner. Other elements of the Treatment may be delivered by registered health professionals (including aesthetic practitioners) operating under the direction and supervision of the Prescribing Clinician. The Prescribing Clinician retains clinical responsibility for the Treatment.</Para>

          <Heading>5. Consultation and Suitability</Heading>
          <Para>5.1. A Consultation is required before starting any Treatment that includes Medication, Body Contouring Devices, or Injections. During the Consultation, we will ask for health and lifestyle information and, where relevant, request clearance from your doctor.</Para>
          <Para>5.2. We reserve the right to decline or postpone a service if it is not clinically appropriate or if required information is incomplete.</Para>
          <Para>5.3. Suitability for Treatment depends on your medical history, ongoing health status, and regular monitoring. The Clinic may request blood tests, body measurements, and photographs as part of treatment planning and progress monitoring. Where blood tests are required, the Patient consents to the drawing of blood by a qualified practitioner. Blood draws may cause temporary discomfort, bruising, minor bleeding, lightheadedness, fainting, or, in rare cases, infection at the puncture site.</Para>
          <Para>5.4. The Clinician may, in their professional judgment, delay, modify, or discontinue the Treatment at any time if it is deemed unsafe, inappropriate, or not in your best interests.</Para>
          <Para>5.5. You must inform the Clinic and/or the Clinician of any pre-existing medical conditions, contra-indications, allergies (including drug allergies and latex allergies), or changes to your health at the Consultation and at any time during the Treatment.</Para>
          <Para>5.6. You must inform the Clinic of any previous weight loss surgery, bariatric procedures, or other weight management treatments, as these may affect the suitability, safety, and expected outcomes of the Treatment.</Para>
          <Para>5.7. We acknowledge that weight management programmes may affect psychological wellbeing and body image. You agree to inform the Clinic of any history of eating disorders, disordered eating, depression, anxiety, or other mental health conditions. The Clinic may recommend psychological support or decline certain elements of the Treatment if, in the Clinician’s professional judgment, they may pose a risk to your mental health.</Para>

          <Heading>6. The Treatment</Heading>
          <Para>6.1. At the start of the Treatment, the Clinic will provide you with a Slimming Card to record participation in scheduled sessions, check-ins, and adherence to nutrition, lifestyle and exercise plans. You agree to bring the Slimming Card to every in-clinic session or scheduled check-in. The Clinic will review and date-stamp the Slimming Card at each visit to confirm attendance and participation.</Para>
          <Para>6.2. Depending on your Consultation and agreed plan, your Treatment may include one or more of the following:</Para>
          <List items={[
            'Prescription weight loss medicines (e.g., GLP-1 receptor agonists) (“Medication”);',
            'Body contouring devices and similar procedures (“Body Contouring Devices”);',
            'Where clinically appropriate, injections for aesthetic body contouring and fat dissolving (“Injections”);',
            'Nutrition, lifestyle and exercise plans, coaching and monitoring (“Lifestyle Intervention”); and',
            'Where appropriate, supportive therapies such as lymphatic drainage massage (“Supportive Therapy”).',
          ]} />
          <Para>6.3. Medication, Body Contouring Devices, Injections, and Supportive Therapy shall only be prescribed or recommended if, in the Clinician’s professional opinion, they are appropriate for you. The Clinician reserves the right to change the Treatment based on your response, any side effects, safety monitoring, and the availability of products.</Para>
          <Para>6.4. The Treatment may not be appropriate during pregnancy. You agree to immediately inform the Clinic and/or the Clinician if you are pregnant, think you may be pregnant, are planning a pregnancy, or if you become pregnant at any stage of the Treatment. Should you become pregnant, the Treatment may be discontinued, and medical advice from your personal doctor must be obtained.</Para>
          <Para>6.5. Not all Treatments are compatible with breastfeeding. If you are breastfeeding, you agree to disclose this to the Clinic/Clinician. Your Clinician will advise accordingly.</Para>
          <Para>6.6. If you experience severe or potentially life-threatening symptoms, including but not limited to severe chest pain, shortness of breath, fainting, severe abdominal pain, signs of an allergic reaction, or symptoms of low blood sugar, you must seek immediate medical attention from an appropriate healthcare provider or by calling Malta emergency services. You agree to inform the Clinic of any such event as soon as reasonably possible.</Para>

          <Heading>7. Medication</Heading>
          <Para>7.1. The Clinician may prescribe you Medication. The Medication used during the Treatment is prescribed to support weight management and may act through a range of mechanisms that may vary between individuals. These include reducing appetite, affecting glucose regulation and gastric emptying. The prescribed Medication may include but is not limited to:</Para>
          <List items={[
            'GLP-1 receptor agonists (e.g., semaglutide);',
            'dual GIP/GLP-1 receptor agonists (e.g., tirzepatide); and',
            'any other weight management medication prescribed by the Clinician.',
          ]} />
          <Para>7.2. All Medication is prescribed by a registered medical practitioner. The Medication may be administered on-site by the Clinician or Treating Practitioner. Where you are required to obtain Medication for self-administration, you will receive a prescription that may be dispensed by any licensed pharmacy of your choice.</Para>
          <Para>7.3. The Clinic does not claim to diagnose and/or cure any existing medical concern. The Medication is not a cure for obesity and does not replace proper nutrition, physical activity, and/or lifestyle changes.</Para>
          <Para>7.4. The duration of the use of the Medication varies between individuals and cannot be predicted or guaranteed. Ongoing or long-term use of the Medication may be required to ensure and maintain Treatment outcomes.</Para>
          <Para>7.5. There is no guarantee of permanent weight loss. Discontinuation, reduction, or misuse of the Medication may result in weight regain. You agree to follow the dosing schedule and escalation plan as prescribed by the Clinician and not self-adjust doses.</Para>
          <Para>7.6. You acknowledge that certain Medications may be prescribed for uses, doses, or patient populations that differ from the uses for which they have been formally approved by regulatory authorities (commonly referred to as “off-label” prescribing). Where this applies, the Clinician will inform you and explain the reasons for the off-label use, the expected benefits, and any additional risks.</Para>

          <SubHeading>Side Effects of Medication</SubHeading>
          <Para>7.7. Side effects vary between individuals and may occur even when the Medication is used correctly and as prescribed. The Clinician will discuss the potential side effects most relevant to your individual circumstances during the Consultation. Without limiting the generality of the foregoing, you acknowledge the following known side effects and risks:</Para>
          <Para>Common side effects (experienced by a significant proportion of patients) may include, but are not limited to:</Para>
          <List items={[
            'nausea;', 'vomiting;', 'diarrhoea;', 'constipation;', 'abdominal pain or discomfort;', 'headache;', 'fatigue;', 'dizziness;', 'injection site reactions (redness, swelling, itching); and', 'decreased appetite.',
          ]} />
          <Para>Serious side effects (less common but medically significant) may include, but are not limited to:</Para>
          <List items={[
            'Pancreatitis (inflammation of the pancreas), which may present as severe abdominal pain radiating to the back, nausea and vomiting. Pancreatitis can be life-threatening and requires immediate medical attention;',
            'Gallbladder disease (including gallstones and cholecystitis), which may require medical or surgical intervention including removal of the gallbladder;',
            'Thyroid tumour risk: GLP-1 receptor agonists have been associated with thyroid C-cell tumours in animal studies. While the relevance to humans has not been confirmed, patients with a personal or family history of medullary thyroid carcinoma (“MTC”) or Multiple Endocrine Neoplasia syndrome type 2 (“MEN2”) must not use these medications and must inform the Clinician of any such history;',
            'Gastroparesis (severe slowing or paralysis of stomach emptying), which may cause persistent nausea, vomiting, bloating and abdominal pain. In some reported cases, gastroparesis has persisted after discontinuation of the Medication;',
            'Hypoglycaemia (low blood sugar), particularly if the Medication is combined with other diabetes medications or used in non-diabetic patients. Symptoms may include shakiness, sweating, confusion, and, in severe cases, loss of consciousness;',
            'Acute kidney injury, including in the context of severe dehydration resulting from gastrointestinal side effects such as vomiting or diarrhoea;',
            'Allergic reactions, including, in rare cases, anaphylaxis. Symptoms may include rash, itching, swelling of the face, lips, tongue or throat, and difficulty breathing;',
            'Changes in mood or mental health: Reports of suicidal ideation and depression have been investigated by regulatory authorities including the European Medicines Agency (EMA). You must immediately inform the Clinic and seek medical attention if you experience changes in mood, feelings of depression, anxiety, or thoughts of self-harm;',
            'Intestinal obstruction, which may present as severe abdominal pain, bloating, vomiting, and inability to pass stool or gas. This is a medical emergency requiring immediate attention; and',
            'Increased heart rate (tachycardia), which has been observed in some patients taking GLP-1 receptor agonists.',
          ]} />
          <Para>This list is not exhaustive and unforeseen side effects or adverse reactions may occur. You agree to report any unusual symptoms to the Clinic promptly.</Para>

          <SubHeading>Contraindications</SubHeading>
          <Para>7.8. The Medication is contraindicated (must not be used) in patients with:</Para>
          <List items={[
            'a personal or family history of medullary thyroid carcinoma (MTC);',
            'Multiple Endocrine Neoplasia syndrome type 2 (MEN2);',
            'a history of pancreatitis;',
            'a known hypersensitivity or allergy to the active substance or any of its excipients; and',
            'any other condition identified by the Clinician as a contraindication based on your individual medical history.',
          ]} />
          <Para>You confirm that you have disclosed any history of the above conditions to the Clinician and understand that failure to do so may significantly increase the risk of serious adverse events.</Para>

          <SubHeading>Contraception and Drug Interactions</SubHeading>
          <Para>7.9. The Medication may reduce the effectiveness of oral contraceptive pills due to its effect on gastric emptying and absorption. If you use oral contraceptives, you are advised to discuss alternative or additional methods of contraception with your prescribing doctor or general practitioner. The Clinic recommends that patients of childbearing potential use reliable contraception throughout the Treatment and for a period following discontinuation as advised by the Clinician.</Para>
          <Para>7.10. The Medication may interact with other medicines, supplements, or substances. You agree to inform the Clinician of all current medications, including over-the-counter medicines, herbal supplements, and vitamins, and to inform the Clinician before starting any new medication during the Treatment. The Medication may affect the absorption of other oral medicines taken at the same time.</Para>

          <SubHeading>Anaesthesia and Surgical Procedures</SubHeading>
          <Para>7.11. Due to the Medication’s delaying of gastric emptying, the risk of regurgitation or aspiration while under general anaesthesia or deep sedation is increased. Any medical professional conducting a medical intervention involving anaesthesia or sedation must be informed by you of your use of the Medication.</Para>
          <Para>7.12. You shall inform the Clinic and/or the Clinician of any surgery or other medical procedures (“Medical Procedures”) that may be undertaken by you. The Clinician may advise pausing or discontinuing use of the Medication before such Medical Procedures, depending on the current clinical guidance and your individual risk profile.</Para>

          <SubHeading>Medication Supply</SubHeading>
          <Para>7.13. Prescription weight management Medications may be subject to supply chain disruptions, shortages, or changes in availability that are outside the Clinic’s control. In such cases, the Clinician may recommend an alternative Medication, adjust the dosing schedule, or temporarily pause the Medication component of the Treatment. The Clinic shall not be liable for delays or interruptions caused by medication shortages.</Para>
          <Para>7.14. You agree to contact the Clinic and/or Clinician promptly should you experience side effects. Should you experience severe symptoms, you should seek immediate urgent care. You must not discontinue, reduce or adjust the dosage of the Medication without first consulting the Clinician, except in an emergency.</Para>

          <Heading>8. Body Contouring Devices</Heading>
          <Para>8.1. The Clinician may recommend the use of Body Contouring Devices. These devices use non-invasive technology to help reshape specific areas of the body. Body Contouring Devices which may be used include but are not limited to:</Para>
          <List items={[
            'devices using cryolipolysis;',
            'devices using High Intensity Focused Electromagnetic (“HIFEM”) muscle stimulation; and',
            'devices using radiofrequency.',
          ]} />
          <Para>8.2. Body Contouring Devices are not suitable for weight loss and do not guarantee a specific change in body weight, body measurements or physical appearance. They are for cosmetic purposes only and are intended to support improvements in body proportions and visible definition in selected areas.</Para>
          <Para>8.3. You agree to inform the Clinic/Clinician of any and all medical conditions, health concerns, implanted devices, recent procedures, or changes in health which may preclude you from using Body Contouring Devices. Body Contouring Devices may be unsuitable, require postponement, or require written medical clearance in the presence of certain conditions, including but not limited to:</Para>
          <List items={[
            'pregnancy or breastfeeding;',
            'less than six (6) months post-pregnancy;',
            'cardiac conditions, pacemakers, defibrillators, or other implanted electronic devices;',
            'metal implants, orthopaedic hardware, or metallic foreign objects in or near the treatment area;',
            'aesthetic implants, including breast or gluteal implants in or near the treatment area;',
            'active cancer, history of cancer, or cancer affecting the lymphatic system;',
            'epilepsy or seizure disorders;',
            'multiple sclerosis or other neurological disorders;',
            'hernias in or near the treatment area;',
            'blood clotting disorders or use of anticoagulant medications;',
            'any conditions causing reduced skin sensation; and',
            'any other medical or health condition which, in the opinion of the Clinic and/or Clinician, may make treatment unsafe or inappropriate.',
          ]} />
          <Para>Failure to disclose relevant medical information may increase the risk of adverse effects and may result in the Treatment being declined or discontinued for safety reasons.</Para>
          <Para>8.4. The use of Body Contouring Devices may cause side effects or adverse reactions. These are not experienced by all patients and may vary in type, severity, and duration. Common side effects include but are not limited to: redness, swelling, bruising, tenderness, skin irritation, uneven results and contour irregularity, temporary numbness, and/or altered skin sensation in the treated area.</Para>
          <Para>8.5. Although uncommon, more serious adverse reactions and complications may occur, including but not limited to: blistering, burns, prolonged pain, nerve irritation, scarring, persistent numbness or altered sensation, skin ulceration, and/or fat necrosis.</Para>
          <Para>8.6. In the case of Body Contouring Devices using cryolipolysis, a rare but recognised complication known as paradoxical adipose hyperplasia (“PAH”) may occur. PAH is a condition in which fatty tissue in the treated area enlarges rather than reduces and may require medical or surgical intervention to correct.</Para>
          <Para>8.7. This list is not exhaustive and unforeseen complications may occur. The risk of adverse reactions may be increased by undisclosed medical conditions, failure to follow post-Treatment instructions, and/or individual physiological response.</Para>

          <Heading>9. Injections</Heading>
          <Para>9.1. Following the Consultation, the Clinician may recommend the use of Injections. The Injections utilised during the Treatment cause a controlled chemical reaction within fat cells, resulting in the permanent destruction of targeted fat tissue. Injections which may be used include but are not limited to:</Para>
          <List items={[
            'fat dissolving injections; and',
            'supplementation injections.',
          ]} />
          <Para>9.2. Some injectable products used in the Treatment may not be registered medicines or CE-marked medical devices in the EU. Where this applies, the Clinician will inform you of the regulatory status of the product, and you will be asked to provide specific informed consent. The Clinic will provide you with information about the product, its intended use, and known risks before administration.</Para>
          <Para>9.3. Injections may only be administered by the Clinician or Treating Practitioner and shall only be used in accordance with the plan approved by the Clinician.</Para>
          <Para>9.4. You agree that Injections shall not be combined with any other injectable products, fat-dissolving substances, supplements, or similar treatments unless expressly approved by the Clinician. Use of non-approved injections, products obtained elsewhere, or treatments provided by third parties may significantly increase the risk of adverse reactions and complications.</Para>
          <Para>9.5. Injections may cause temporary discomfort at injection sites and other side effects or adverse reactions, which vary between individuals. Common side effects may include but are not limited to: pain, swelling, bruising, redness, tenderness, firmness, nodules, itching, and/or inflammation.</Para>
          <Para>9.6. More serious but less common side effects may include: infection, abscess formation, skin ulceration, tissue necrosis, scarring, pigmentation changes, contour irregularities, asymmetry, nerve injury, vascular injury, and/or prolonged swelling.</Para>
          <Para>9.7. Significant swelling and firmness are expected following the administration of Injections and may persist for several weeks.</Para>
          <Para>9.8. The Clinician will discuss the potential side effects most relevant to your individual circumstances based on the outcome of the Consultation.</Para>

          <Heading>10. Lifestyle Intervention</Heading>
          <Para>10.1. Any Lifestyle Intervention provided by the Clinic is for educational and informational purposes only. These services are intended to complement and support general wellness, healthy habits, and fitness goals, and are not a substitute for medical advice or diagnosis.</Para>
          <Para>10.2. Any plan or monitoring provided by the Clinic may be adapted or updated based on your progress, health, and/or new information.</Para>
          <Para>10.3. You agree to actively participate and attend all scheduled in-clinic sessions and weekly check-ins, follow the personalised food plan, and perform the physical exercise set by the Clinician. Failure to follow these responsibilities may reduce the effectiveness of the programme, increase the risk of adverse outcomes, and limit the Clinic’s ability to achieve intended results.</Para>
          <Para>10.4. You agree to avoid crash diets, extreme caloric restriction, or any outside weight loss treatments that could negatively impact your safety, wellbeing, or the effectiveness of the programme. The Clinic is not responsible for adverse outcomes resulting from failure to follow safe practices or from interventions outside the approved programme.</Para>
          <Para>10.5. You agree to promptly inform the Clinic of any difficulties, challenges, injuries, pain, or other health-related issues encountered while following the Lifestyle Intervention, including but not limited to inability to follow the food plan, discomfort during physical activity, or changes in health status.</Para>

          <Heading>11. Supportive Therapy</Heading>
          <Para>11.1. The Clinic may offer Supportive Therapy, such as lymphatic drainage massage, to complement any other form of Treatment. These therapies are intended to support circulation, reduce fluid retention, and assist in the overall effectiveness of the Treatment, but are not guaranteed to provide specific results.</Para>
          <Para>11.2. Supportive Therapy will only be provided when, in the Clinician’s professional judgment, it is safe, appropriate, and likely to benefit you. The Clinician may decline or postpone such therapies if there are medical, procedural, or safety concerns.</Para>
          <Para>11.3. While generally low-risk, Supportive Therapy may occasionally cause mild side effects such as temporary redness, tenderness, soreness, or mild bruising. Serious complications are uncommon but may occur. You agree to promptly inform the Clinic of any discomfort or adverse reactions.</Para>

          <Heading>12. Results and Expectations</Heading>
          <Para>12.1. Results vary between individuals and depend on factors including baseline health, adherence to the Treatment, lifestyle, individual physiology, and other variables beyond the Clinic’s control.</Para>
          <Para>12.2. Unless you are following the Weight Loss Guarantee Treatment as per Section 16, the Clinic makes no representations, warranties, or guarantees regarding the degree of fat reduction, body contour, weight change, aesthetic improvement, or any other specific outcome.</Para>
          <Para>12.3. We do not guarantee specific outcomes including exact weight loss, inch loss, or body composition changes. Any progress estimates are guidance only.</Para>

          <Heading>13. Alternatives and Right to Refuse</Heading>
          <Para>13.1. You have the right to refuse and/or discontinue the Treatment at any time. The Clinic shall stop the Treatment immediately upon your instruction, subject to the Cancellation and Rescheduling Policy in Section 18 and the refund provisions in Section 15.</Para>
          <Para>13.2. You have the right to seek medical advice from a personal doctor and/or healthcare provider if you have any concerns regarding any part of the Treatment.</Para>
          <Para>13.3. Alternatives to the Treatment may include lifestyle changes alone, treatment with alternative medications, and referral to a personal doctor for ongoing care.</Para>
          <Para>13.4. You are encouraged to seek additional information independently, including through reputable sources, in order to better understand the Treatment, associated risks, and benefits.</Para>

          <Heading>14. Patient Responsibilities</Heading>
          <Para>14.1. You will be informed of known risks, side effects, aftercare requirements, and alternatives before proceeding with any Treatment. You agree to:</Para>
          <List items={[
            'provide accurate and complete information about your medical history, medications, allergies, and health status;',
            'inform the Clinic of all current medications, supplements, and over-the-counter medicines;',
            'follow pre and post-treatment instructions;',
            'inform us promptly of any adverse reactions or changes in health;',
            'attend all scheduled appointments and check-ins;',
            'bring the Slimming Card to every in-clinic session;',
            'seek medical care when needed; and',
            'provide complete and truthful information regarding adherence, food intake, alcohol use, activity levels, and any other factors requested by the Clinic.',
          ]} />

          <Heading>15. Fees and Payment</Heading>
          <Para>15.1. Treatment fees, prescribed Medication, laboratory tests, diagnostic services, and Injections or Body Contouring Device-based sessions may be charged separately, depending on the package selected.</Para>
          <Para>15.2. Payment is due as communicated at the time of booking or service. We accept cash and major credit cards and any additional methods stated at reception or online. Packages, memberships, or multi-session programmes must be paid according to the agreed schedule.</Para>
          <Para>15.3. Where Medications, laboratory testing, or other services are supplied by a pharmacy or third party, the Clinic is not responsible for third-party pricing, availability, delays, or manufacturer defects. Any fees charged by third parties are payable directly by you in accordance with the third party’s terms and conditions.</Para>
          <Para>15.4. Where a deposit is required to secure a booking, the deposit will be applied towards the cost of the Treatment. Deposits are non-refundable except: (i) where you cancel within the fourteen (14) day cooling-off period and no services have been provided; (ii) where the Clinic cancels the appointment or discontinues the Treatment for clinical or operational reasons; or (iii) where required by applicable law.</Para>
          <SubHeading>Packages and Prepaid Sessions</SubHeading>
          <Para>15.5. If you purchase a package or programme:</Para>
          <List items={[
            'sessions are valid only for the person named on the purchase;',
            'sessions cannot be exchanged for cash;',
            'any expiry period (if applicable) will be stated at purchase;',
            'missed sessions will be forfeited in line with the Cancellation and Rescheduling Policy in Section 18; and',
            'sessions within a package must be used within the validity period specified at the time of purchase.',
          ]} />
          <SubHeading>Withdrawal from a Package</SubHeading>
          <Para>15.6. If you wish to withdraw from a prepaid package:</Para>
          <List items={[
            'Within the cooling-off period: If you cancel the package within fourteen (14) days of purchase, and no sessions have been commenced, you are entitled to a full refund of all amounts paid. If one or more sessions have been commenced within the cooling-off period with your express consent, you will be charged for sessions used at the individual session rate, and the remainder will be refunded.',
            'After the cooling-off period: You will be charged for sessions completed at the individual session rate (which may be higher than the per-session package rate). The non-refundable deposit, if applicable, will not be refunded. Any remaining balance, after deducting the individual session costs and the deposit, will be refunded within thirty (30) days.',
          ]} />
          <Para>15.7. Where the Treatment has been discontinued by the Clinic for clinical reasons, a pro-rata refund will be provided for unused sessions.</Para>
          <Para>15.8. Refunds are not provided for completed services, except where required by applicable law.</Para>

          <Heading>16. Weight Loss Guarantee Treatment</Heading>
          <Para>16.1. Where the Clinic offers a weight loss guarantee as part of the package (the “Weight Loss Guarantee Treatment”), you acknowledge that the guarantee is subject to all terms and conditions outlined in this section.</Para>
          <Para>16.2. The guarantee is intended to provide additional guidance and support, and does not constitute a promise, warranty, or assurance of a specific medical or aesthetic outcome.</Para>
          <Para>16.3. Individual results may vary based on factors including adherence to the programme, medical history, lifestyle, and other variables outside the Clinic’s control.</Para>
          <SubHeading>Setting the Target</SubHeading>
          <Para>16.4. During the Baseline Date, you and the Clinician will set the following in writing:</Para>
          <List items={[
            'a minimum weight loss target, which may be expressed in kilograms, as a percentage of your body weight at the Baseline Date, or as body composition or circumference measurements; and',
            'a measurement period, expressed in weeks.',
          ]} />
          <Para>16.5. The minimum weight loss target shall be clinically reasonable and shall be agreed between you and the Clinician based on your individual health profile.</Para>
          <SubHeading>Measurement Standards</SubHeading>
          <Para>16.6. To ensure consistency and accuracy, weight will be measured at the Clinic using the same calibrated scale. Measurements will be taken under similar conditions wherever practicable, including similar clothing and time of day.</Para>
          <Para>16.7. In cases where the minimum weight loss target is expressed in body composition or circumference measurements, the Clinic shall use the same calibrated measurement tools and the same measurement sites and methodology throughout the measurement period.</Para>
          <SubHeading>Eligibility Requirements</SubHeading>
          <Para>16.8. To be eligible for the Weight Loss Guarantee Treatment, you must meet all of the following requirements, unless the Clinician documents a medical reason to modify them in writing:</Para>
          <List items={[
            'attend all scheduled in-clinic sessions and weekly check-ins, bringing the Slimming Card to obtain the date stamp at each visit;',
            'consistently follow your personalised food plan and complete the agreed physical activities, discussing any pain, obstacles, or difficulties with the Clinician before making changes;',
            'use only the Treatment and Medication prescribed by the Clinician and not use any other prescription weight loss medicines, compounded injections, or external slimming treatments during the measurement period;',
            'promptly inform the Clinic of any side effects, difficulties, major health changes (including but not limited to cardiovascular conditions), or changes to medications that may affect the Treatment;',
            'avoid crash diets, extreme caloric restriction, or any outside weight loss regimens that could compromise safety or Treatment outcomes; and',
            'provide complete and truthful information regarding adherence, food intake, alcohol use, activity levels, and any other factors requested by the Clinic.',
          ]} />
          <SubHeading>Exclusions from Eligibility</SubHeading>
          <Para>16.9. You will not be eligible for the Weight Loss Guarantee Treatment where any of the following apply:</Para>
          <List items={[
            'the Treatment is stopped, reduced, or modified for safety reasons, side effects, contra-indications, pregnancy, or any other medical reason;',
            'you do not follow the prescribed Treatment, miss appointments or check-ins, self-adjust doses, or fail to disclose relevant medical information;',
            'a new medical condition is found or new medication is started that is reasonably expected to affect weight, Treatment safety, or efficacy, and is not promptly disclosed to the Clinic;',
            'a disruption or shortage of the prescribed Treatment outside the Clinic’s control prevents timely administration or dosing; or',
            'the Clinician determines, in their professional judgment, that further escalation or continuation of the Treatment is unsafe or not clinically appropriate.',
          ]} />
          <SubHeading>Extension Period</SubHeading>
          <Para>16.10. The Clinic acknowledges that, due to individual physiology and other medical factors, you may be eligible for the Weight Loss Guarantee Treatment but not achieve the agreed weight loss target within the initial measurement period. In such cases, provided you have met all eligibility requirements, the Clinic will provide an additional four (4) weeks of support (the “Extension Period”). During the Extension Period, an additional Consultation with the Clinician will be held and, where necessary, a revised Treatment plan will be provided. The Extension Period includes weekly check-ins and nutrition coaching. The cost of Medications or any third-party services shall not be included in the Extension Period unless expressly confirmed in writing by the Clinic prior to commencement.</Para>
          <Para>16.11. If the agreed weight loss target is not achieved by the end of the Extension Period despite full compliance with all eligibility requirements, the Clinic will discuss next steps with you, which may include a further revised Treatment plan or other options at the Clinic’s discretion.</Para>
          <Para>16.12. The Weight Loss Guarantee Treatment is personal to you, non-transferable, and may not be assigned, transferred, or exchanged for cash or any other benefit, except where required by applicable law.</Para>

          <Heading>17. Consumer Rights and Cooling-Off Period</Heading>
          <Para>17.1. Where the Treatment agreement is concluded at a distance (including where you sign the consent form digitally before attending the Clinic), you may have a right to withdraw from the agreement within fourteen (14) days of the date the agreement is concluded, in accordance with the Consumer Rights Regulations (SL 378.17).</Para>
          <Para>17.2. If you wish to exercise your right of withdrawal, you must notify the Clinic in writing (by email to info@carismaslimming.com or by post) within the fourteen (14) day period. You may use the model withdrawal form available from the Clinic upon request.</Para>
          <Para>17.3. If you request that the performance of services begins before the end of the withdrawal period, you must give express consent and acknowledge that you will lose your right of withdrawal once the services have been fully performed. You will be charged for services already provided up to the point of withdrawal, calculated on a pro-rata basis.</Para>
          <Para>17.4. Refunds under the right of withdrawal will be processed within fourteen (14) days of the Clinic receiving your withdrawal notice, using the original payment method.</Para>

          <Heading>18. Cancellation, Rescheduling and Attendance Policy</Heading>
          <SubHeading>General</SubHeading>
          <Para>18.1. This Cancellation, Rescheduling and Attendance Policy applies to all appointments, sessions, check-ins, and consultations booked with the Clinic, whether booked by telephone, in person, online, or through any other channel.</Para>
          <Para>18.2. By booking an appointment with the Clinic, you agree to be bound by the terms of this section.</Para>
          <Para>18.3. All references to “session fee” in this section mean the fee applicable to the specific appointment, session, or service being cancelled. Where you have purchased a package, the session fee shall be calculated as the total package price divided by the number of sessions included in the package.</Para>
          <SubHeading>Cancellations</SubHeading>
          <Para>18.4. You may cancel a scheduled appointment by contacting the Clinic by telephone, email (info@carismaslimming.com), or in person during the Clinic’s opening hours. Cancellations made outside of opening hours will be treated as received at the start of the next business day.</Para>
          <Para>18.5. Cancellation fees are determined by the notice period provided before the scheduled appointment time. These fees reflect the Clinic’s genuine pre-estimate of the loss incurred due to the late cancellation, including the Clinician’s allocated time, preparation, and the inability to offer the appointment to another patient at short notice:</Para>
          <Para>18.6. Cancellation fees will be deducted from any prepaid balance or charged to your account, as applicable. Cancellation fees are non-refundable.</Para>
          <Para>18.7. The Clinic reserves the right to waive or reduce a cancellation fee at its discretion, including in cases of:</Para>
          <List items={[
            'medical emergencies supported by reasonable evidence;',
            'bereavement of an immediate family member;',
            'severe adverse weather or civil disruption preventing safe travel to the Clinic; or',
            'other exceptional circumstances at the Clinic’s reasonable discretion.',
          ]} />
          <Para>Requests for a fee waiver must be made in writing within seven (7) days of the missed appointment.</Para>
          <SubHeading>Rescheduling</SubHeading>
          <Para>18.8. You may reschedule a scheduled appointment by contacting the Clinic using the methods described above. Rescheduling is subject to availability, and the rescheduled appointment must be booked within fourteen (14) days of the original appointment date.</Para>
          <Para>18.9. The first reschedule made with at least 24 hours’ notice before the original appointment is free of charge. Subsequent rescheduling fees are set out in the table above.</Para>
          <Para>18.10. If a rescheduled appointment is subsequently cancelled or rescheduled again, the applicable fee will be calculated based on the notice period provided before the rescheduled appointment time.</Para>
          <SubHeading>Late Arrivals</SubHeading>
          <Para>18.11. You are expected to arrive at the Clinic at your scheduled appointment time, or at such earlier time as may be communicated by the Clinic for preparation purposes.</Para>
          <Para>18.12. If you arrive more than fifteen (15) minutes after the scheduled appointment time, the Clinic reserves the right to: (i) proceed with a shortened session in the remaining time, without reduction in fee; or (ii) treat the appointment as a no-show, in which case the full session fee will be forfeited and you will need to rebook.</Para>
          <SubHeading>No-Shows</SubHeading>
          <Para>18.13. A no-show occurs when you fail to attend a scheduled appointment without prior notice. No-shows will be charged at 100% of the session fee.</Para>
          <Para>18.14. In the case of patients enrolled in the Weight Loss Guarantee Treatment, two (2) or more no-shows during the measurement period may result in you being deemed ineligible for the guarantee.</Para>
          <SubHeading>Clinic-Initiated Cancellations</SubHeading>
          <Para>18.15. The Clinic may cancel or reschedule an appointment due to Clinician unavailability, equipment failure, or other operational reasons. In such cases, we will provide as much notice as reasonably practicable and offer an alternative appointment at no additional cost.</Para>
          <Para>18.16. If the Clinic cancels an appointment and you do not wish to reschedule, or no alternative appointment is available within a reasonable period, you will receive a full refund of any fee paid for that session.</Para>
          <Para>18.17. The Clinic may also cancel or postpone an appointment where, in the Clinician’s professional judgment, it is not clinically appropriate to proceed. In such cases, you will not be charged.</Para>

          <Heading>19. Medical Emergencies</Heading>
          <Para>19.1. If you experience concerning symptoms or a medical emergency, seek immediate medical help by calling Malta emergency services. We may provide basic assistance on-site where appropriate, but we do not replace emergency services.</Para>

          <Heading>20. Client Conduct and Clinic Rules</Heading>
          <Para>20.1. You must behave respectfully toward staff and other guests.</Para>
          <Para>20.2. We may refuse service or ask you to leave if there is abusive, threatening, unsafe, or inappropriate behaviour, or if clinic rules are not followed.</Para>
          <Para>20.3. Persistent non-compliance with clinic rules, repeated failure to attend appointments, non-payment of fees, or conduct that, in the Clinic’s reasonable opinion, is detrimental to the safe operation of the Clinic may result in termination of the Treatment in accordance with Section 22.</Para>

          <Heading>21. Photography and Progress Tracking</Heading>
          <Para>21.1. We may offer to take before/after photos and measurements for progress monitoring. These are for clinical tracking and form part of your clinical record unless you give separate written consent for marketing use.</Para>
          <Para>21.2. You may decline to have photographs taken, and such refusal will not affect your access to treatment or care. However, declining photographs may limit the Clinic’s ability to assess and document visual progress.</Para>
          <Para>21.3. Where you consent to the use of photographs for marketing, promotional, educational, or publication purposes, you may withdraw that consent at any time by notifying the Clinic in writing. Upon withdrawal of marketing consent, the Clinic will remove your images from its marketing materials within thirty (30) days, to the extent reasonably practicable.</Para>

          <Heading>22. Refusal or Termination of Services</Heading>
          <Para>22.1. We may refuse or end services in cases including non-payment, repeated late cancellations or no-shows, unsafe conduct, or where Treatment is no longer clinically appropriate.</Para>
          <Para>22.2. Where the Clinic terminates the Treatment, you will be entitled to a pro-rata refund for any unused prepaid sessions, calculated at the individual session rate, unless the termination is due to your breach of these Terms.</Para>

          <Heading>23. Limitation of Liability</Heading>
          <Para>23.1. You acknowledge that the Treatments, procedures, and programmes carry inherent risks, including but not limited to side effects, allergic reactions, or unexpected outcomes, and agree that participation is voluntary. You further acknowledge that the Clinic has provided information on known risks and reasonable precautions and that you have had the opportunity to ask questions before commencing the Treatment.</Para>
          <Para>23.2. To the maximum extent permitted by law, the Clinic’s liability to you for any loss, injury, claim, or damage arising out of or in connection with treatments, services, or advice provided is limited to the amount of fees actually paid by you for the specific service giving rise to the claim. The Clinic shall not be liable for:</Para>
          <List items={[
            'indirect, consequential, or economic loss;',
            'adverse outcomes caused by factors outside the Clinic’s control, including individual physiology, adherence, lifestyle, medical conditions, or third-party actions;',
            'loss or damage arising from third-party products, Medications, or services, even if recommended by the Clinic; or',
            'any failure to achieve a specific weight loss, aesthetic, or medical outcome, including where the Weight Loss Guarantee Treatment is in place.',
          ]} />
          <Para>23.3. Nothing in these Terms is intended to exclude or limit liability for fraud, or for death or personal injury caused by negligence, or any other liability that cannot be excluded or limited under applicable law.</Para>
          <Para>23.4. Nothing in these Terms limits any rights you have under applicable consumer and health laws.</Para>

          <Heading>24. Patient Responsibilities and Acknowledgements</Heading>
          <Para>24.1. You accept responsibility for providing accurate, complete, and truthful information to the Clinic regarding your medical history, medications, allergies, health status, and adherence to the Treatment.</Para>
          <Para>24.2. You accept responsibility for following the prescribed Treatment plan, Medication instructions, lifestyle and exercise programmes, and other Treatment requirements as directed by the Clinician.</Para>
          <Para>24.3. You acknowledge that failure to provide accurate information or to follow the prescribed Treatment plan may increase the risk of adverse outcomes and may affect the results of the Treatment.</Para>

          <Heading>25. Intellectual Property</Heading>
          <Para>25.1. All treatment plans, food plans, exercise programmes, and materials provided by the Clinic are the intellectual property of the Clinic and are provided for your personal use only. You agree not to reproduce, distribute, or share these materials without the Clinic’s written consent.</Para>

          <Heading>26. Force Majeure</Heading>
          <Para>26.1. The Clinic shall not be liable for any delay or failure to provide the Treatment caused by circumstances beyond its reasonable control, including but not limited to supply chain disruptions, medication shortages, regulatory changes, pandemics, severe weather, civil unrest, or other force majeure events. In such cases, the Clinic will use reasonable efforts to provide an alternative treatment or reschedule.</Para>

          <Heading>27. Complaints</Heading>
          <Para>27.1. The Clinic operates a formal complaint handling procedure. Complaints may be submitted in writing to info@carismaslimming.com.</Para>
          <Para>27.2. The Clinic will acknowledge complaints within five (5) business days and provide a substantive response within twenty (20) business days.</Para>
          <Para>27.3. If you are not satisfied with the outcome, you may escalate the complaint to the relevant regulatory authority or seek independent resolution.</Para>

          <Heading>28. Governing Law and Disputes</Heading>
          <Para>28.1. These Terms shall be governed by and construed in accordance with the laws of Malta.</Para>
          <Para>28.2. Before commencing any formal proceedings, both parties will first attempt to resolve any concerns or disputes promptly through the Clinic’s internal complaint and resolution process.</Para>
          <Para>28.3. If a dispute cannot be resolved through the Clinic’s complaint process within a reasonable period, either party may propose submission to arbitration at the Maltese Arbitration Centre (the “MAC”), in accordance with its rules. Both parties must agree to arbitration. Nothing in this clause prevents either party from pursuing their rights through the competent courts of Malta.</Para>
          <Para>28.4. Nothing in these Terms limits your right to bring a complaint before the Malta Competition and Consumer Affairs Authority (MCCAA) or any other competent regulatory body.</Para>

          <Heading>29. Severability</Heading>
          <Para>29.1. If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court or competent authority, the remaining provisions shall continue in full force and effect.</Para>

          <Heading>30. Entire Agreement</Heading>
          <Para>30.1. These Terms, together with any Patient Consent Form, treatment plans, and policies referenced herein, constitute the entire agreement between you and the Clinic in relation to the Treatment. You acknowledge that you have not relied on any oral or written representations, warranties, or promises not contained in these Terms or the Patient Consent Form.</Para>

          <Heading>31. Updates to These Terms</Heading>
          <Para>31.1. The Clinic reserves the right to update these Terms from time to time. The current version will always be available on the Clinic’s website at www.carismaslimming.com.</Para>
          <Para>31.2. Material changes will be communicated to existing patients by email or at their next appointment. Changes will not apply retrospectively to appointments already booked or packages already purchased at the time of the change, unless the change is more favourable to you.</Para>

          <Heading>32. Language</Heading>
          <Para>32.1. These Terms are provided in English. By accepting these Terms, you confirm that you have sufficient understanding of English to comprehend this document. You have had the opportunity to seek translation or independent advice in your preferred language before agreeing.</Para>

          <Heading>33. Treatment of Minors</Heading>
          <Para>33.1. The Treatment is generally intended for patients aged 18 and over.</Para>
          <Para>33.2. Where the Clinic agrees to treat a patient under the age of 18, the following additional requirements apply:</Para>
          <List items={[
            'the written consent of a parent or legal guardian is required before any Treatment commences;',
            'the parent or legal guardian must attend the Consultation and be present during the consent process;',
            'the Clinician will assess whether the minor has sufficient understanding and maturity to participate meaningfully in the Treatment;',
            'additional age-specific risk disclosures will be provided where the Medication or Treatment is being used outside its approved age indications; and',
            'the Clinic reserves the right to decline treatment of a minor where, in the Clinician’s professional judgment, the Treatment is not appropriate.',
          ]} />
          <Para>33.3. These Terms apply to the parent or legal guardian in respect of any minor patient, and all references to “you” and “Patient” shall be read accordingly.</Para>

          <Heading>34. Contact</Heading>
          <Para>34.1. For any queries about these Terms, or to contact the Clinic:</Para>
          <Para>Email: info@carismaslimming.com</Para>
          <Para>Address: 114 Triq il-Mizura, Swieqi, Malta</Para>

          {/* ====================== PART B ====================== */}
          <p style={bodyStyle}>&nbsp;</p>
          <Para>PART B: PRIVACY NOTICE</Para>

          <Heading>1. Data Controller</Heading>
          <Para>1.1. The data controller for your Personal Data is Carisma Aesthetics Ltd. (C 106006), trading as Carisma Slimming, with its registered address at 35/16B Hever Court, Triq Moletta, Swieqi, SWQ 3532, Malta.</Para>
          <Para>1.2. For any data protection queries, you may contact us at info@carismaslimming.com.</Para>

          <Heading>2. Personal Data We Collect</Heading>
          <Para>2.1. We may collect the following categories of Personal Data:</Para>
          <List items={[
            'identity and contact details (name, address, email, telephone number, date of birth, ID/passport number);',
            'health and lifestyle information relevant to slimming, suitability, and safety (including medical history, current medications, allergies, and health conditions);',
            'appointment history, treatment notes, progress tracking, and clinical records;',
            'photographs and body measurements taken for clinical monitoring purposes;',
            'payment and billing information; and',
            'emergency contact details.',
          ]} />
          <Para>2.2. Health data constitutes a “special category” of personal data under GDPR and is subject to enhanced protections.</Para>

          <Heading>3. Legal Bases for Processing</Heading>
          <Para>3.1. The processing of your Personal Data is carried out on the following legal bases:</Para>
          <List items={[
            'Article 6(1)(b) GDPR (performance of a contract): processing necessary for the provision of the Treatment;',
            'Article 9(2)(h) GDPR (provision of health care or treatment): processing of health data necessary for the provision of health care, subject to appropriate safeguards and professional duties of confidentiality;',
            'Article 6(1)(c) GDPR (legal obligation): processing necessary to comply with applicable laws and regulations; and',
            'Article 6(1)(a) GDPR (consent): where processing is not strictly necessary for the provision of the Treatment, such as the use of photographs for marketing purposes, the Clinic will rely on your explicit consent.',
          ]} />
          <Para>3.2. Where consent is the legal basis for processing, you have the right to withdraw your consent at any time, without affecting the lawfulness of processing carried out before withdrawal. Withdrawal of consent for data processing that is necessary for the Treatment may result in the Treatment being unable to continue.</Para>

          <Heading>4. How We Use Your Data</Heading>
          <Para>4.1. Personal Data will be used solely for:</Para>
          <List items={[
            'administration of patient records and appointments;',
            'designing and delivering the Treatment;',
            'monitoring your progress;',
            'providing health guidance or support within the scope of the Treatment;',
            'processing payments and managing billing;',
            'compliance with applicable laws, regulations, or professional standards; and',
            'improving our services and internal reporting (using anonymised or aggregated data only).',
          ]} />
          <Para>4.2. We only use data for research or marketing where you provide clear, separate consent.</Para>

          <Heading>5. Data Sharing</Heading>
          <Para>5.1. Personal Data shall not be disclosed or made available to third parties except where:</Para>
          <List items={[
            'such disclosure is necessary for the provision of the Treatment (including laboratories, pharmacies, medical professionals, or service providers acting under the Clinic’s instructions);',
            'required to comply with legal or regulatory obligations; or',
            'you have provided explicit consent for such disclosure.',
          ]} />
          <Para>5.2. Any third-party service providers involved in the processing of Personal Data shall be bound by contractual obligations to ensure equivalent standards of data protection and confidentiality.</Para>

          <Heading>6. International Data Transfers</Heading>
          <Para>6.1. Personal Data may be processed using cloud-based systems. Where data is transferred outside the European Economic Area (“EEA”), appropriate safeguards are in place in accordance with GDPR Article 46, including Standard Contractual Clauses or adequacy decisions.</Para>
          <Para>6.2. You may request information about the specific safeguards applied to international data transfers by contacting us at info@carismaslimming.com.</Para>

          <Heading>7. Data Storage and Security</Heading>
          <Para>7.1. Personal Data will be stored securely using appropriate technical and organisational measures, including encryption, access controls, and regular audits, to protect against unauthorised access, disclosure, or loss.</Para>
          <Para>7.2. Access to Personal Data is limited to programme staff and authorised medical professionals on a need-to-know basis.</Para>

          <Heading>8. Data Retention</Heading>
          <Para>8.1. Personal Data will be retained only for as long as necessary to provide the Treatment or as required by law and professional standards.</Para>
          <Para>8.2. Clinical records will be retained in accordance with applicable Maltese law and professional medical record-keeping requirements.</Para>
          <Para>8.3. Once retention is no longer necessary, data will be securely deleted, anonymised, or irreversibly destroyed.</Para>

          <Heading>9. Your Rights</Heading>
          <Para>9.1. Subject to the conditions and limitations set out in applicable law, you have the right to:</Para>
          <List items={[
            'access your Personal Data;',
            'rectify inaccurate or incomplete Personal Data;',
            'request erasure of Personal Data where it is no longer required, unlawfully processed, or where consent has been withdrawn and no other lawful basis applies;',
            'restrict processing in certain circumstances;',
            'data portability (receiving your data in a structured, commonly used format); and',
            'object to processing in certain circumstances.',
          ]} />
          <Para>9.2. You may request permanent erasure of your Personal Data at any time where: (i) the data is no longer required for the purposes for which it was collected; (ii) consent is withdrawn and no other legal basis for processing exists; (iii) the data has been unlawfully processed; and/or (iv) erasure is required by applicable law. Requests will be processed without undue delay, subject to legal obligations to retain certain information.</Para>
          <Para>9.3. You may also lodge a complaint with the Office of the Information and Data Protection Commissioner (IDPC) at idpc.org.mt.</Para>

          <Heading>10. Data Breach Notification</Heading>
          <Para>10.1. In the event of a data breach affecting your Personal Data, you will be notified promptly as required by applicable law, and appropriate steps will be taken to mitigate any potential harm.</Para>

          <Heading>11. Contact for Data Protection</Heading>
          <Para>11.1. For any data protection queries, requests to exercise your rights, or complaints, please contact:</Para>
          <Para>Email: info@carismaslimming.com</Para>
          <Para>Address: Carisma Aesthetics Ltd., 114 Triq il-Mizura, Swieqi, Malta</Para>
        </div>
      </section>
    </main>
  );
}
