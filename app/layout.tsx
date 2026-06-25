import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter, SiteCookieBanner } from "@/components/PreviewChromeGate";
import PageLoader from "@/components/PageLoader";
import ConsultationModal from "@/components/ConsultationModal";
import GuideOrderModal from "@/components/GuideOrderModal";
import QuizModal from "@/components/QuizModal";
import StickyBookingBar from "@/components/StickyBookingBar";
import AnalyticsClickTracker from "@/components/AnalyticsClickTracker";
import { JsonLd } from "@/lib/seo/JsonLd";
import { organizationSchema, webSiteSchema } from "@/lib/seo/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carisma Slimming | Doctor-Led Weight Loss Clinic Malta",
  description: "Doctor-led medical weight loss, GLP-1 support where suitable, body composition analysis and non-surgical body contouring in Malta.",
  keywords: "weight loss Malta, slimming clinic Malta, fat freezing, fat dissolving, GLP-1 medication, medical weight loss, body contouring Malta",
  metadataBase: new URL('https://www.carismaslimming.com'),
  openGraph: {
    type: 'website',
    locale: 'en_MT',
    siteName: 'Carisma Slimming',
    title: 'Carisma Slimming | Doctor-Led Weight Loss Clinic Malta',
    description: 'Medical weight loss, GLP-1 support where clinically appropriate, body analysis and body contouring in Malta.',
    images: [{ url: '/og-image.png', width: 1677, height: 936, alt: 'Carisma Slimming doctor-led weight loss clinic in Malta' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carisma Slimming | Doctor-Led Weight Loss Clinic Malta',
    description: 'Medical weight loss, GLP-1 support where suitable, body analysis and body contouring in Malta.',
    images: [{ url: '/og-image.png', alt: 'Carisma Slimming doctor-led weight loss clinic in Malta' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Hero poster — inline img in PageHero server component is the LCP element;
            this preload fires simultaneously to ensure zero extra RTT */}
        <link rel="preload" as="image" href="/Thumbnail.webp" fetchPriority="high" type="image/webp" />
        {/* Preconnect to speed up third-party origins */}
        <link rel="preconnect" href="https://link.msgsndr.com" />
        <link rel="dns-prefetch" href="https://link.msgsndr.com" />
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KL52M3K8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <PageLoader />
        <SiteHeader />
        <div className="flex-grow">{children}</div>
        <SiteFooter />
        <SiteCookieBanner />
        <ConsultationModal />
        <GuideOrderModal />
        <QuizModal />
        <StickyBookingBar />
        <AnalyticsClickTracker />
      </body>
    </html>
  );
}
