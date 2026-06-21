import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Medical Weight Loss Programs Malta | Carisma Slimming",
  description: "Doctor-led medical weight loss programs in Malta. Personalised slimming plans combining GLP-1 medications, non-invasive treatments and nutritional guidance.",
  alternates: { canonical: 'https://www.carismaslimming.com/weight-loss' },
};

// NOTE: JSON-LD lives on the /weight-loss PAGE (not here) so it does not leak
// onto the nested /weight-loss/thank-you route, which shares this layout.
export default function WeightLossLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
