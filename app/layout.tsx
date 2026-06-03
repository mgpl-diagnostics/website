import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import { cfg } from "@/lib/config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
