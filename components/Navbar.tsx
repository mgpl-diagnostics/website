'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why MGPL', href: '#why-choose' },
  { label: 'Home Collection', href: '#home-collection' },
  { label: 'Reports', href: '#reports' },
  { label: 'About', href: '#doctors' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
      style={{ borderBottom: scrolled ? '1px solid var(--border)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.name}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              priority
              className="object-contain w-auto"
              style={{ height: `${siteConfig.logo.navbarHeight}px` }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
                style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saffron)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--charcoal)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={siteConfig.phone.primaryTel}
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'var(--navy)', fontFamily: 'var(--font-body)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--saffron)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--navy)')}
            >
              <Phone className="w-4 h-4" />
              <span>{siteConfig.phone.primary}</span>
            </a>
            <Link
              href="#book"
              className="px-5 py-2.5 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-px transition-all duration-200"
              style={{ background: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--saffron-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--saffron)')}
            >
              Book a Test
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg"
            style={{ color: 'var(--navy)' }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-1 border-t" style={{ borderColor: 'var(--border)' }}>
                <Link
                  href="#book"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center py-3 text-white font-semibold rounded-full mt-2 text-sm"
                  style={{ background: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
                >
                  Book a Test
                </Link>
                <a
                  href={siteConfig.phone.primaryTel}
                  className="block text-center py-2 text-sm font-medium mt-2"
                  style={{ color: 'var(--navy)' }}
                >
                  {siteConfig.phone.primary}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
