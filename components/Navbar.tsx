'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { cfg } from '@/lib/config';
import { gsap, ScrollTrigger, useGSAP, setScrollLocked } from '@/lib/gsap';
import { useBookTest } from '@/context/BookTestContext';
import Icon from '@/components/ui/Icon';

const logo = cfg.assets.logo;
const links = cfg.nav.links;

export default function Navbar() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const hoverPill = useRef<HTMLSpanElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { openDialog } = useBookTest();

  const { contextSafe } = useGSAP(
    () => {
      // Intro: drop in from above
      gsap.from(bar.current, { yPercent: -140, autoAlpha: 0, duration: 1, delay: 0.2 });

      // Hide on scroll down, show on scroll up; denser glass after the hero
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll();
          if (menuTl.current?.isActive() || overlay.current?.dataset.open === 'true') return;
          gsap.to(bar.current, {
            yPercent: self.direction === 1 && y > 320 ? -160 : 0,
            duration: 0.45,
            ease: 'ui-out',
            overwrite: 'auto',
          });
        },
      });

      // Active section tracking
      links.forEach((l) => {
        const el = document.querySelector(l.href);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && setActive(l.href),
          onLeaveBack: () => l.href === links[0].href && setActive(null),
        });
      });

      // Mobile menu timeline (built once, played/reversed)
      const items = overlay.current!.querySelectorAll('[data-menu-item]');
      menuTl.current = gsap
        .timeline({ paused: true })
        .set(overlay.current, { autoAlpha: 1 })
        .fromTo(overlay.current, { clipPath: 'inset(0 0 100% 0 round 0 0 32px 32px)' }, { clipPath: 'inset(0 0 0% 0 round 0 0 0px 0px)', duration: 0.55, ease: 'ui-drawer' })
        .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.05 }, '-=0.3');
    },
    { scope: root },
  );

  // Event handlers: wrap in contextSafe at call time so tweens join the GSAP context
  const moveHoverPill = (target: HTMLElement | null) =>
    contextSafe(() => {
      const pill = hoverPill.current;
      if (!pill) return;
      if (!target) {
        gsap.to(pill, { autoAlpha: 0, duration: 0.2 });
        return;
      }
      gsap.to(pill, {
        x: target.offsetLeft,
        width: target.offsetWidth,
        autoAlpha: 1,
        duration: 0.35,
        ease: 'ui-out',
      });
    })();

  const toggleMenu = (next: boolean) => {
    setOpen(next);
    overlay.current!.dataset.open = String(next);
    setScrollLocked(next);
    if (next) menuTl.current?.timeScale(1).play();
    else menuTl.current?.timeScale(1.6).reverse();
  };

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-40">
      {/* scroll-edge fade: content dissolves before it slides under the floating bar */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-cream via-cream/85 to-transparent sm:h-32" />
      <div className="px-3 pt-3 sm:px-6 sm:pt-5">
        <div
          ref={bar}
          className="glass relative mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2"
        >
          <a href="#top" aria-label={`${cfg.brand.name} home`} className="relative z-50 shrink-0">
            <Image
              src={logo.compactSrc}
              alt={cfg.brand.name}
              width={logo.compactWidth}
              height={logo.compactHeight}
              priority
              unoptimized
              className="h-9 w-auto sm:h-10"
            />
          </a>

          {/* Desktop links with travelling hover pill */}
          <nav aria-label="Primary" className="relative hidden lg:block" onMouseLeave={() => moveHoverPill(null)}>
            <span ref={hoverPill} aria-hidden="true" className="invisible absolute left-0 top-0 h-full rounded-full bg-navy-pale opacity-0" />
            <ul className="relative flex items-center">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onMouseEnter={(e) => moveHoverPill(e.currentTarget)}
                    onFocus={(e) => moveHoverPill(e.currentTarget)}
                    aria-current={active === l.href ? 'true' : undefined}
                    className="relative block rounded-full px-4 py-2 text-sm font-medium text-charcoal/80 transition-colors duration-200 hover:text-navy aria-[current]:text-navy"
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-saffron transition-[opacity,transform] duration-300 ease-out-strong ${
                        active === l.href ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={cfg.contact.phone.primaryTel}
              aria-label={`Call ${cfg.contact.phone.primary}`}
              className="press hidden h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-navy transition-colors duration-200 hover:bg-navy-pale md:flex"
            >
              <Icon name="Phone" size={18} />
              <span className="font-mono text-[13px]">{cfg.contact.phone.primary}</span>
            </a>
            <button
              type="button"
              onClick={openDialog}
              className="press group hidden items-center gap-2 rounded-full bg-saffron py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-saffron-deep sm:inline-flex"
            >
              {cfg.nav.ctaLabel}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <Icon name="ArrowUpRight" size={15} weight="bold" />
              </span>
            </button>

            {/* Hamburger → X morph */}
            <button
              type="button"
              onClick={() => toggleMenu(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="press relative z-50 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[1.5px] w-5 rounded bg-current transition-transform duration-300 ease-out-strong ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-[1.5px] w-5 rounded bg-current transition-transform duration-300 ease-out-strong ${open ? 'top-1/2 -rotate-45' : 'top-full'}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        ref={overlay}
        id="mobile-menu"
        data-open="false"
        className="invisible fixed inset-0 z-40 flex flex-col bg-cream/95 px-6 pb-10 pt-28 opacity-0 backdrop-blur-2xl lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li key={l.href} className="overflow-hidden">
                <a
                  data-menu-item
                  href={l.href}
                  onClick={() => toggleMenu(false)}
                  className="flex items-baseline gap-4 py-2 font-display text-4xl font-medium text-navy"
                >
                  <span className="font-mono text-xs text-saffron">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto space-y-3 overflow-hidden">
          <div data-menu-item>
            <button
              type="button"
              onClick={() => {
                toggleMenu(false);
                openDialog();
              }}
              className="press w-full rounded-full bg-saffron py-4 text-base font-semibold text-white"
            >
              {cfg.nav.ctaLabel}
            </button>
          </div>
          <div data-menu-item>
            <a
              href={cfg.contact.phone.primaryTel}
              className="flex items-center justify-center gap-2 rounded-full border border-line py-4 font-mono text-sm font-semibold text-navy"
            >
              <Icon name="Phone" size={18} />
              {cfg.contact.phone.primary}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
