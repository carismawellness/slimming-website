import type { Metadata } from 'next';
import { JsonLd } from '@/lib/seo/JsonLd';
import { SITE_URL, breadcrumbList, faqPage, serviceSchema } from '@/lib/seo/schema';
import { weightLossFaqs, flattenWeightLossAnswer } from '@/lib/faq/weight-loss';

export const metadata: Metadata = {
  title: "Medical Weight Loss Programs Malta | Carisma Slimming",
  description: "Doctor-led medical weight loss programs in Malta. Personalised slimming plans combining GLP-1 medications, non-invasive treatments and nutritional guidance.",
  alternates: { canonical: 'https://www.carismaslimming.com/weight-loss' },
};

const jsonLd = [
  breadcrumbList([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Medical Weight Loss', url: `${SITE_URL}/weight-loss` },
  ]),
  serviceSchema({
    name: 'Medical Weight Loss Programme',
    description:
      'Doctor-led medical weight loss programme in Malta combining GLP-1 medication support, personalised nutrition, body composition tracking and ongoing medical supervision.',
    url: `${SITE_URL}/weight-loss`,
    serviceType: 'Medical weight loss',
  }),
  faqPage(weightLossFaqs.map((f) => ({ q: f.q, a: flattenWeightLossAnswer(f) }))),
];

export default function WeightLossLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
