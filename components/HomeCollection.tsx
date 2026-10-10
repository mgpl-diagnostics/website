'use client';

import { useRef } from 'react';
import { cfg } from '@/lib/config';
import { gsap, useGSAP } from '@/lib/gsap';
import Icon from '@/components/ui/Icon';
import BookButton from '@/components/ui/BookButton';
import SectionHeading from '@/components/ui/SectionHeading';
import Tilt3D from '@/components/motion/Tilt3D';

const hc = cfg.homeCollection;

export default function HomeCollection() {
  const root = useRef<HTMLElement>(null);

  // The step line fills as you scroll through the steps (scrubbed)
  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-progress]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-steps]', start: 'top 70%', end: 'bottom 55%', scrub: 0.6 } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="home-collection" data-station aria-label="Home sample collection" className="section-pad relative">
      <div className="station-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-side="right">
          <SectionHeading heading={hc.heading} accent={hc.headingAccent} subtext={hc.subtext} />

          <ol data-steps className="relative space-y-8 pl-16">
            <span aria-hidden="true" className="absolute bottom-2 left-[1.4rem] top-2 w-px bg-navy/10" />
            <span aria-hidden="true" data-progress className="absolute bottom-2 left-[1.4rem] top-2 w-px origin-top bg-saffron" />
            {hc.steps.map((step) => (
              <li key={step.number} data-reveal className="relative">
                <span className="absolute -left-16 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white shadow-[0_8px_20px_-8px_rgba(20,38,74,0.6)]">
                  <Icon name={step.icon} fallback="Phone" size={20} />
                </span>
                <p className="text-xs font-semibold text-saffron">Step {step.number}</p>
                <h3 className="mt-0.5 font-display text-xl font-semibold text-navy">{step.title}</h3>
                <p className="mt-1.5 max-w-[50ch] text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>

          <div data-reveal="scale" className="mt-14">
            <Tilt3D max={5} radius="1rem">
              <div className="relative overflow-hidden rounded-2xl bg-navy p-7 shadow-[0_30px_60px_-30px_rgba(20,38,74,0.7)] sm:p-9">
                <span aria-hidden="true" className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-saffron/25 blur-3xl" />
                <div className="relative grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="flex items-center gap-2 font-display text-xl font-semibold text-white">
                      <Icon name="Truck" size={24} className="text-amber" />
                      {hc.cardTitle}
                    </p>
                    <p className="mt-1 text-sm text-white/60">{hc.cardSubtitle}</p>
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {hc.features.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-white/85">
                          <Icon name="CheckCircle2" size={17} weight="fill" className="shrink-0 text-[#5FD39B]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 flex items-center gap-2 text-sm text-white/70">
                      <Icon name="Clock" size={17} className="text-amber" />
                      Available {cfg.hours.short}
                    </p>
                  </div>
                  <BookButton>{hc.ctaLabel}</BookButton>
                </div>
              </div>
            </Tilt3D>
          </div>
        </div>
      </div>
    </section>
  );
}
