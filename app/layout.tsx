import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

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
  title: "MGPL Diagnostics | Maa Gayatri Path Lab — Accurate Diagnostics, Compassionate Care",
  description:
    "MGPL Diagnostics offers trusted pathology and diagnostic services: blood tests, full body checkups, thyroid profiles, diabetes screening, and home sample collection. NABL standard processes, expert pathologists, same-day reports.",
  keywords:
    "MGPL Diagnostics, Maa Gayatri Path Lab, pathology lab, blood test, home collection, diagnostic center India",
  openGraph: {
    title: "MGPL Diagnostics | Maa Gayatri Path Lab",
    description:
      "Your family's trusted diagnostic partner. Accurate reports, expert pathologists, same-day results.",
    type: "website",
    locale: "en_IN",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
