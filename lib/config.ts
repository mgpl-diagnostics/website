// ─────────────────────────────────────────────────────────────
//  MGPL Diagnostics — Site Configuration
//
//  Every JSON file is validated against its TypeScript interface
//  (lib/types.ts) at compile time via the `satisfies` operator.
//  If a field is missing or wrong type in a JSON, tsc will fail.
//
//  Content is split across focused files in lib/config/:
//
//    brand.json           → BrandConfig
//    contact.json         → ContactConfig
//    nav.json             → NavConfig
//    hero.json            → HeroConfig
//    metrics.json         → MetricsConfig
//    services.json        → ServicesConfig
//    why-choose.json      → WhyChooseConfig
//    home-collection.json → HomeCollectionConfig
//    catalogue.json       → CatalogueConfig
//    testimonials.json    → TestimonialsConfig
//    doctors.json         → DoctorsConfig
//    faq.json             → FaqConfig
//    footer.json          → FooterConfig
// ─────────────────────────────────────────────────────────────

import type {
  BrandConfig,
  ContactConfig,
  NavConfig,
  HeroConfig,
  MetricsConfig,
  ServicesConfig,
  WhyChooseConfig,
  HomeCollectionConfig,
  CatalogueConfig,
  TestimonialsConfig,
  DoctorsConfig,
  FaqConfig,
  FooterConfig,
  SiteConfig,
} from './types';

import _brand          from './config/brand.json';
import _contact        from './config/contact.json';
import _nav            from './config/nav.json';
import _hero           from './config/hero.json';
import _metrics        from './config/metrics.json';
import _services       from './config/services.json';
import _whyChoose      from './config/why-choose.json';
import _homeCollection from './config/home-collection.json';
import _catalogue      from './config/catalogue.json';
import _testimonials   from './config/testimonials.json';
import _doctors        from './config/doctors.json';
import _faq            from './config/faq.json';
import _footer         from './config/footer.json';

// Validate each JSON slice against its interface at compile time.
// `satisfies` keeps the literal types while enforcing the shape.
const brand          = _brand          satisfies BrandConfig;
const contact        = _contact        satisfies ContactConfig;
const nav            = _nav            satisfies NavConfig;
const hero           = _hero           satisfies HeroConfig;
const metrics        = _metrics        satisfies MetricsConfig;
const services       = _services       satisfies ServicesConfig;
const whyChoose      = _whyChoose      satisfies WhyChooseConfig;
const homeCollection = _homeCollection satisfies HomeCollectionConfig;
const catalogue      = _catalogue      satisfies CatalogueConfig;
const testimonials   = _testimonials   satisfies TestimonialsConfig;
const doctors        = _doctors        satisfies DoctorsConfig;
const faq            = _faq            satisfies FaqConfig;
const footer         = _footer         satisfies FooterConfig;

// Full typed config — spread from all validated slices.
export const cfg: SiteConfig = {
  ...brand,
  ...contact,
  ...nav,
  ...hero,
  ...metrics,
  ...services,
  ...whyChoose,
  ...homeCollection,
  ...catalogue,
  ...testimonials,
  ...doctors,
  ...faq,
  ...footer,
};

// Backward-compatible flat shape used by legacy components.
export const siteConfig = {
  name:        cfg.brand.name,
  fullName:    cfg.brand.fullName,
  tagline:     cfg.brand.tagline,
  subTagline:  cfg.brand.subTagline,
  description: cfg.brand.description,
  foundedYear: cfg.brand.foundedYear,

  logo:       cfg.assets.logo,

  phone:      cfg.contact.phone,
  email:      cfg.contact.email,

  address:    cfg.address,
  googleMaps: cfg.maps,

  hours:      cfg.hours,
  social:     cfg.social,
  seo:        cfg.seo,
} as const;

export type { SiteConfig } from './types';
