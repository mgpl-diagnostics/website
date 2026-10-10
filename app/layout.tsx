import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit, Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import { cfg } from "@/lib/config";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: cfg.seo.title,
  description: cfg.seo.description,
  keywords: cfg.seo.keywords,
  openGraph: {
    title: cfg.brand.name,
    description: cfg.brand.description,
    type: "website",
    locale: cfg.seo.locale,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAF6EF",
};

// Runs before first paint: lets CSS pre-hide elements GSAP will reveal,
// but only when the visitor hasn't asked for reduced motion.
const motionPref = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ok')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Script id="motion-pref" strategy="beforeInteractive">
          {motionPref}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
