import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { signalSmithDescription } from "@/content/brand";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://signalsmith.online"),
  title: "SignalSmith — Business Problems × Data",
  description: signalSmithDescription,
  alternates: { canonical: "https://signalsmith.online/" },
  openGraph: {
    title: "SignalSmith — Business Problems × Data",
    description: signalSmithDescription,
    url: "https://signalsmith.online/",
    siteName: "SignalSmith",
    type: "website",
    images: [{ url: "/assets/linkedin-banner.png", width: 2056, height: 765, alt: "SignalSmith — Business Problems × Data" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SignalSmith — Business Problems × Data",
    description: signalSmithDescription,
    images: ["/assets/linkedin-banner.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/assets/signalsmith-icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-scroll-behavior="smooth"><body className={`${manrope.variable} ${geistMono.variable}`}><AnalyticsProvider>{children}</AnalyticsProvider></body></html>; }
