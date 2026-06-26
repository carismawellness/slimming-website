// NOTE: Metadata lives on app/weight-loss/page.tsx (not here) so it does not
// bleed onto nested routes like /weight-loss/thank-you, which share this layout.
// JSON-LD also lives on the page for the same reason.
export default function WeightLossLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
