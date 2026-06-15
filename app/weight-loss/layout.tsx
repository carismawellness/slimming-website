import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Medical Weight Loss Programs Malta | Carisma Slimming",
  description: "Doctor-led medical weight loss programs in Malta. Personalised slimming plans combining GLP-1 medications, non-invasive treatments and nutritional guidance.",
  alternates: { canonical: 'https://www.carismaslimming.com/weight-loss' },
};

export default function WeightLossLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
