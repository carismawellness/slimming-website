import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weight Loss Program Malta | Carisma Slimming',
  description:
    "Malta's most comprehensive, medically guided slimming program. Lose up to 1kg a week with doctor-led plans, GLP-1 medication, fat freezing and body sculpting treatments.",
};

export default function WeightLossLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
