'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Globe, Clock } from 'lucide-react';
import { siteConfig, cfg } from '@/lib/config';
import { useBookTest } from '@/context/BookTestContext';

const f = cfg.footer;

export default function Footer() {
  const { openDialog } = useBookTest();

  return (
    <footer id="contact" aria-label="Site footer" style={{ background: 'var(--navy)' }}>

      {/* Emergency CTA strip */}
      <div className="py-4" style={{ background: 'var(--saffron)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-display font-semibold text-white text-lg">{f.emergencyText}</p>
          <a
            href={siteConfig.phone.primaryTel}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-sm font-semibold rounded-full shrink-0 hover:bg-gray-50 transition-colors"
            style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
          >
            <Phone className="w-4 h-4" />
            {f.emergencyCtaLabel} {siteConfig.phone.primary}
          </a>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-start mb-5 w-fit group" aria-label="MGPL Diagnostics home">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.name}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="object-contain w-auto brightness-0 invert"
                style={{ height: '46px' }}
              />
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-60" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>
              {f.brandTagline} {siteConfig.foundedYear}.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              {[
                { icon: Phone,  text: siteConfig.phone.primary,                              href: siteConfig.phone.primaryTel           },
                { icon: Mail,   text: siteConfig.email.info,                                 href: `mailto:${siteConfig.email.info}`      },
                { icon: MapPin, text: `${siteConfig.address.city}, ${siteConfig.address.state}`, href: siteConfig.googleMaps.shareLink    },
                { icon: Clock,  text: siteConfig.hours.display,                              href: '#'                                    },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-2.5 text-sm transition-opacity hover:opacity-100 group"
                  style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" color="var(--saffron)" />
                  <span className="group-hover:text-white transition-colors">{text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-5">{f.columns.services.heading}</h3>
            <ul className="space-y-2.5">
              {f.columns.services.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saffron)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information column */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-5">{f.columns.information.heading}</h3>
            <ul className="space-y-2.5">
              {f.columns.information.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saffron)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Book / CTA column */}
          <div>
            <h3 className="font-display font-semibold text-white text-lg mb-5">{f.quickBook.heading}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>
              {f.quickBook.subtext}
            </p>
            <button
              onClick={openDialog}
              className="block w-full text-center py-3 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--saffron-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--saffron)')}
            >
              {f.quickBook.ctaLabel}
            </button>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { label: 'Website',  icon: Globe, href: siteConfig.social.website                    },
                { label: 'WhatsApp', icon: Phone, href: siteConfig.phone.whatsapp                    },
                { label: 'Email',    icon: Mail,  href: `mailto:${siteConfig.email.info}`            },
              ].map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--saffron)'; e.currentTarget.style.borderColor = 'var(--saffron)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>
            © {new Date().getFullYear()} {f.copyrightSuffix}
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>
            {f.footerTagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
