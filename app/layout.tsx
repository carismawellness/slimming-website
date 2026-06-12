import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalBottom from "@/components/GlobalBottom";

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
  description: "Malta's most comprehensive slimming program, led by medically qualified doctors. Lose up to 1kg a week with weight loss, GLP-1s, and non-invasive body contouring packages.",
  keywords: "weight loss Malta, slimming clinic Malta, fat freezing, fat dissolving, GLP-1 medication, medical weight loss, body contouring Malta",
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
      <body className="min-h-full flex flex-col">
        <GlobalHeader />
        <main className="flex-grow">{children}</main>
        <GlobalBottom />
      </body>
    </html>
  );
}
