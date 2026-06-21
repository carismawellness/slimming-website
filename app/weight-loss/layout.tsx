import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Medical Weight Loss Malta — Doctor-Led & Guaranteed | Carisma Slimming",
  description: "Doctor-led medical weight loss programs in Malta. Personalised slimming plans combining GLP-1 medications, non-invasive treatments and nutritional guidance.",
  alternates: { canonical: 'https://www.carismaslimming.com/weight-loss' },
  openGraph: {
    title: "Medical Weight Loss Malta — Doctor-Led & Guaranteed | Carisma Slimming",
    description: "Doctor-led medical weight loss programs in Malta. Personalised slimming plans combining GLP-1 medications, non-invasive treatments and nutritional guidance.",
    url: 'https://www.carismaslimming.com/weight-loss',
    images: [{ url: '/background.avif', width: 1200, height: 630, alt: 'Medical Weight Loss Malta — Carisma Slimming' }],
  },
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
