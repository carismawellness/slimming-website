import type { Metadata } from 'next';
import './preview.css';

export const metadata: Metadata = {
  title: 'Carisma Slimming | Doctor-led weight loss in Malta',
  description:
    "Lose up to 1kg a week with Malta's most comprehensive, doctor-led slimming program — medical weight loss, GLP-1 support where appropriate, personalised meal plans and body contouring. Book your free body analysis.",
  // Concept/preview redesign — keep it out of the index while it's evaluated.
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
