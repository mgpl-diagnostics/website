// ─────────────────────────────────────────────────────────────
//  Search metadata: canonical origin and the JSON-LD graph.
//
//  Everything comes from lib/config/*.json, so structured data
//  always says what the page says. Only add a fact here if it is
//  printed on the page too, and never add ratings or reviews that
//  are not real, verifiable Google reviews.
// ─────────────────────────────────────────────────────────────

import { cfg } from '@/lib/config';

/** Canonical origin without a trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || cfg.seo.siteUrl).replace(/\/+$/, '');

export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString();

const sameAs = [cfg.social.facebook, cfg.social.instagram, cfg.social.youtube].filter(Boolean);

/** Every test in the catalogue as an Offer (names only: prices change and live on the page). */
function offers() {
  return cfg.testCatalogue.allTests.flatMap((group) =>
    group.tests.map((test) => ({
      '@type': 'Offer',
      category: group.category,
      itemOffered: { '@type': 'MedicalTest', name: test.name },
    })),
  );
}

export function jsonLd() {
  const org = `${siteUrl}/#lab`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: absoluteUrl('/'),
        name: cfg.brand.name,
        alternateName: cfg.brand.fullName,
        inLanguage: 'en-IN',
        publisher: { '@id': org },
      },
      {
        // DiagnosticLab is the precise medical type; MedicalBusiness makes it a LocalBusiness
        // so address, hours and geo apply.
        '@type': ['DiagnosticLab', 'MedicalBusiness'],
        '@id': org,
        name: cfg.brand.name,
        alternateName: 'Maa Gayatri Path Lab',
        description: cfg.seo.description,
        url: absoluteUrl('/'),
        logo: absoluteUrl('/icon-512.png'),
        image: absoluteUrl('/opengraph-image'),
        telephone: cfg.contact.phone.primaryTel.replace(/^tel:/, ''),
        email: cfg.contact.email.info,
        foundingDate: String(cfg.brand.foundedYear),
        address: {
          '@type': 'PostalAddress',
          streetAddress: cfg.address.line1,
          addressLocality: cfg.address.city,
          addressRegion: cfg.address.state,
          postalCode: cfg.address.pin,
          addressCountry: 'IN',
        },
        hasMap: cfg.maps.shareLink,
        openingHoursSpecification: cfg.hours.rules.map((rule) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: rule.days.map((day) => `https://schema.org/${day}`),
          opens: rule.opens,
          closes: rule.closes,
        })),
        areaServed: cfg.seo.areaServed.map((name) => ({ '@type': 'Place', name })),
        sameAs,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Laboratory tests',
          itemListElement: offers(),
        },
      },
    ],
  };
}

/** JSON for a <script type="application/ld+json">: `<` is escaped so no value can close the tag. */
export const jsonLdString = () => JSON.stringify(jsonLd()).replace(/</g, '\\u003c');
