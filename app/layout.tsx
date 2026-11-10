import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit, Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import { cfg } from "@/lib/config";
import { jsonLdString, siteUrl } from "@/lib/seo";

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
  metadataBase: new URL(siteUrl),
  title: { default: cfg.seo.title, template: `%s | ${cfg.brand.name}` },
  description: cfg.seo.description,
  keywords: cfg.seo.keywords,
  applicationName: cfg.brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: cfg.brand.fullName,
    title: cfg.seo.shareTitle,
    description: cfg.seo.description,
    locale: cfg.seo.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: cfg.seo.shareTitle,
    description: cfg.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
  category: "health",
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
        <script
          type="application/ld+json"
          // Built from lib/config at build time; `<` is escaped in jsonLdString.
          dangerouslySetInnerHTML={{ __html: jsonLdString() }}
        />
        <Script id="motion-pref" strategy="beforeInteractive">
          {motionPref}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
