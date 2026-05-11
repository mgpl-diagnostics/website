// ─────────────────────────────────────────────────────────────
//  MGPL Diagnostics — Site Configuration
//  Edit this file to update contact info, links, and branding across
//  the entire website. No component code needs to change.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  // ── Brand ────────────────────────────────────────────────────
  name: 'MGPL Diagnostics',
  fullName: 'MGPL Diagnostics — Maa Gayatri Path Lab',
  tagline: 'Accurate Diagnostics. Compassionate Care.',
  subTagline: "Your family's trusted diagnostic partner.",
  description:
    'MGPL Diagnostics offers trusted pathology and diagnostic services: blood tests, full body checkups, thyroid profiles, diabetes screening, and home sample collection. NABL standard processes, expert pathologists, same-day reports.',
  foundedYear: 2010,

  // ── Logo & Banner (files go in /public/) ─────────────────────
  logo: {
    src: '/logo.png',
    // Original dimensions for next/image optimisation
    width: 1536,
    height: 587,
    // Rendered height in navbar (px) — width is calculated automatically
    navbarHeight: 44,
  },
  banner: {
    src: '/banner.png',
    // Original dimensions for next/image optimisation
    width: 1774,
    height: 87,
    alt: 'MGPL Diagnostics — Maa Gayatri Path Lab • Advanced Testing. Trusted Care.',
  },

  // ── Contact ──────────────────────────────────────────────────
  phone: {
    primary: '+91 98765 43210',       // ← Change to real number
    primaryTel: 'tel:+919876543210',
    secondary: '+91 98765 43211',     // ← Optional second line
    secondaryTel: 'tel:+919876543211',
    whatsapp: 'https://wa.me/919876543210', // ← WhatsApp click-to-chat
  },

  email: {
    info: 'info@mgpldiagnostics.in',     // ← Change to real email
    reports: 'reports@mgpldiagnostics.in', // for report queries
  },

  // ── Address ──────────────────────────────────────────────────
  address: {
    line1: '123 Medical Colony',          // ← Street address
    line2: 'Near Civil Hospital',         // ← Landmark
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    pin: '221001',
    full: '123 Medical Colony, Near Civil Hospital, Varanasi, UP 221001',
  },

  // ── Google Maps ──────────────────────────────────────────────
  googleMaps: {
    // Paste your "Share" link from Google Maps here
    shareLink: 'https://maps.google.com/?q=MGPL+Diagnostics+Varanasi',
    // Embed src for <iframe> (from "Embed a map" on Google Maps)
    embedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606!2d83.0!3d25.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE4JzAwLjAiTiA4M8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
  },

  // ── Working Hours ─────────────────────────────────────────────
  hours: {
    display: 'Mon–Sun: 7:00 AM – 8:00 PM',
    short: '7 AM – 8 PM, All Days',
  },

  // ── Social & Online Presence ──────────────────────────────────
  social: {
    website: 'https://mgpldiagnostics.in',
    facebook: 'https://facebook.com/mgpldiagnostics',   // ← Update
    instagram: 'https://instagram.com/mgpldiagnostics', // ← Update
    youtube: 'https://youtube.com/@mgpldiagnostics',    // ← Update
  },

  // ── SEO ───────────────────────────────────────────────────────
  seo: {
    title: 'MGPL Diagnostics | Maa Gayatri Path Lab — Accurate Diagnostics, Compassionate Care',
    description:
      'MGPL Diagnostics offers trusted pathology and diagnostic services: blood tests, full body checkups, thyroid profiles, diabetes screening, and home sample collection. NABL standard processes, expert pathologists, same-day reports.',
    keywords:
      'MGPL Diagnostics, Maa Gayatri Path Lab, pathology lab, blood test, home collection, diagnostic center Varanasi',
    locale: 'en_IN',
  },
} as const;

export type SiteConfig = typeof siteConfig;
