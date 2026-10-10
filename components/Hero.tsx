'use client';

import { useRef } from 'react';
import { cfg } from '@/lib/config';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import BookButton from '@/components/ui/BookButton';
import Icon from '@/components/ui/Icon';

const h = cfg.hero;
const fmt = (n: number) => Math.round(n).toLocaleString('en-IN');

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // SplitText keeps an aria-label with the unsplit text for screen readers
        const split = SplitText.create('[data-split]', { type: 'lines,words', mask: 'lines', aria: 'auto' });
        const nums = gsap.utils.toArray<HTMLElement>('[data-count]');

        const tl = gsap.timeline({ delay: 0.5 });
        tl.set('[data-hero]', { autoAlpha: 1 })
          .from(split.words, { yPercent: 115, duration: 1.15, stagger: 0.06 })
          .from('[data-hero="sub"]', { y: 18, autoAlpha: 0, filter: 'blur(6px)', duration: 0.9, clearProps: 'filter' }, '-=0.75')
          .from('[data-hero="cta"] > *', { y: 16, autoAlpha: 0, stagger: 0.07, duration: 0.7 }, '-=0.6')
          .from('[data-hero="proof"]', { autoAlpha: 0, duration: 0.7 }, '-=0.45')
          .from('[data-readout] > li', { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.8 }, '-=0.5')
          .add(() => {
            nums.forEach((el) => {
              const o = { v: 0 };
              gsap.to(o, { v: Number(el.dataset.count), duration: 1.8, ease: 'power3.out', onUpdate: () => void (el.textContent = fmt(o.v)) });
            });
          }, '<');
        return () => split.revert();
      });
      mm.add('(prefers-reduced-motion: reduce)', () => gsap.set('[data-hero]', { autoAlpha: 1 }));
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" data-station aria-label="Introduction" className="relative flex min-h-[100dvh] flex-col pt-24 lg:pt-28">
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 sm:px-6 lg:px-8">
        <div className="station-grid w-full">
          <div data-side="left" className="max-w-3xl py-6">
            <h1 data-hero data-split className="font-display text-[2.5rem] font-semibold leading-[1.02] text-navy sm:text-[3.4rem] xl:text-[4rem]">
              <span className="sm:whitespace-nowrap">
                {h.headline.line1} {h.headline.line2}
              </span>
              <br />
              <span className="font-light text-saffron">
                {h.headline.line3} {h.headline.line4}
              </span>
            </h1>

            <p data-hero="sub" className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
              {h.subtext}
            </p>

            <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-3">
              <BookButton>{h.ctaPrimary}</BookButton>
              <a
                href="#reports"
                className="press inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-6 py-3.5 text-sm font-semibold text-navy transition-colors duration-200 hover:border-navy/35 hover:bg-white"
              >
                <Icon name="Download" size={18} />
                {h.ctaSecondary}
              </a>
            </div>

            <div data-hero="proof" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <span className="flex text-amber">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Icon key={s} name="Star" size={14} weight="fill" />
                  ))}
                </span>
                <span className="font-semibold text-charcoal">
                  {h.socialProof.rating}/{h.socialProof.ratingOutOf}
                </span>
              </span>
              <span>
                <span className="font-semibold text-charcoal">{h.socialProof.patientsServed}</span> {h.socialProof.patientsLabel}
              </span>
              <span className="flex items-center gap-1.5 text-forest">
                <Icon name="BadgeCheck" size={16} weight="fill" />
                {h.badge}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lab readout */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <ul data-readout className="grid grid-cols-2 border-t border-navy/10 lg:grid-cols-4">
          {cfg.trustMetrics.map((m, i) => (
            <li key={m.label} data-hero className={`flex items-baseline gap-3 py-4 ${i % 2 ? 'pl-5' : ''} ${i > 0 ? 'lg:border-l lg:border-navy/10 lg:pl-6' : ''}`}>
              <span className="font-display text-3xl font-semibold text-navy lg:text-4xl">
                <span data-count={m.end} className="tabular-nums">
                  {fmt(m.end)}
                </span>
                <span className="text-saffron">{m.suffix}</span>
              </span>
              <span className="text-xs leading-tight text-muted">
                <span className="block font-semibold text-charcoal">{m.label}</span>
                {m.sub}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
