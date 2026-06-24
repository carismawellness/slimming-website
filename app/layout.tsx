import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter, SiteCookieBanner } from "@/components/PreviewChromeGate";
import ConsultationModal from "@/components/ConsultationModal";
import GuideOrderModal from "@/components/GuideOrderModal";
import QuizModal from "@/components/QuizModal";
import StickyBookingBar from "@/components/StickyBookingBar";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carisma Slimming | #1 Voted Slimming Clinic in Malta",
  description: "Malta's most comprehensive slimming program, led by medically qualified doctors. Lose up to 1kg a week with GLP-1s, fat freezing, and body contouring.",
  keywords: "weight loss Malta, slimming clinic Malta, fat freezing, fat dissolving, GLP-1 medication, medical weight loss, body contouring Malta",
  metadataBase: new URL('https://www.carismaslimming.com'),
  openGraph: {
    type: 'website',
    locale: 'en_MT',
    url: 'https://www.carismaslimming.com',
    siteName: 'Carisma Slimming',
    title: 'Carisma Slimming | #1 Voted Slimming Clinic in Malta',
    description: "Malta's most comprehensive slimming program, led by medically qualified doctors.",
    images: [{ url: '/og-image.png', width: 1677, height: 936, alt: 'Carisma Slimming — Lose up to 1kg per week, guaranteed' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carisma Slimming | #1 Voted Slimming Clinic in Malta',
    description: "Malta's most comprehensive slimming program, led by medically qualified doctors.",
    images: [{ url: '/og-image.png', alt: 'Carisma Slimming — Lose up to 1kg per week, guaranteed' }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "HealthAndBeautyBusiness"],
  "name": "Carisma Slimming",
  "alternateName": "#1 Voted Slimming Clinic in Malta",
  "description": "Malta's most comprehensive slimming program, led by medically qualified doctors. Lose up to 1kg a week with weight loss, GLP-1s, and non-invasive body contouring packages.",
  "url": "https://www.carismaslimming.com",
  "telephone": "+35627802062",
  "email": "info@carismaslimming.com",
  "priceRange": "€€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Grand Hotel Excelsior, Great Siege Road",
    "addressLocality": "Floriana",
    "addressRegion": "MT",
    "postalCode": "FRN 1810",
    "addressCountry": "MT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.8976,
    "longitude": 14.5101
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.instagram.com/carismaslimming",
    "https://www.facebook.com/carismaslimming"
  ],
  "medicalSpecialty": "Weight Loss",
  "availableService": [
    {"@type": "MedicalTherapy", "name": "GLP-1 Weight Loss Injections"},
    {"@type": "MedicalTherapy", "name": "Fat Freezing (Cryolipolysis)"},
    {"@type": "MedicalTherapy", "name": "Fat Dissolving Injections"},
    {"@type": "MedicalTherapy", "name": "Medical Weight Loss"},
    {"@type": "MedicalTherapy", "name": "Muscle Stimulation (EMSculpt)"},
    {"@type": "MedicalTherapy", "name": "Skin Tightening"},
    {"@type": "MedicalTherapy", "name": "Lymphatic Drainage"}
  ]
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KL52M3K8');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Hero poster — inline img in PageHero server component is the LCP element;
            this preload fires simultaneously to ensure zero extra RTT */}
        <link rel="preload" as="image" href="/Thumbnail.webp" fetchPriority="high" type="image/webp" />
        {/* Preconnect to speed up third-party origins */}
        <link rel="preconnect" href="https://link.msgsndr.com" />
        <link rel="dns-prefetch" href="https://link.msgsndr.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
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
        <SiteHeader />
        <div className="flex-grow">{children}</div>
        <SiteFooter />
        <SiteCookieBanner />
        <ConsultationModal />
        <GuideOrderModal />
        <QuizModal />
        <StickyBookingBar />
        <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
