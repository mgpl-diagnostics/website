'use client';

import { cfg } from '@/lib/config';
import { scrollState } from '@/lib/scroll-store';
import { useBookTest } from '@/context/BookTestContext';
import Icon from '@/components/ui/Icon';
import SectionHeading from '@/components/ui/SectionHeading';

const s = cfg.services;

/**
 * Editorial service index. Hovering/focusing a row lifts the matching
 * test tube in the 3D rack on the left (scrollState.hoverService).
 */
export default function ServicesGrid() {
  const { openDialog } = useBookTest();
  const focus = (i: number) => () => void (scrollState.hoverService = i);
  const blur = () => void (scrollState.hoverService = -1);

  return (
    <section id="services" data-station aria-label="Our services" className="section-pad relative">
      <div className="station-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-side="right">
          <SectionHeading heading={s.heading} accent={s.headingAccent} subtext={s.subtext} />

          <ul className="border-t border-navy/10" onMouseLeave={blur}>
            {s.items.map((service, i) => (
              <li key={service.title} data-reveal className="border-b border-navy/10">
                <button
                  type="button"
                  onClick={openDialog}
                  onMouseEnter={focus(i)}
                  onFocus={focus(i)}
                  onBlur={blur}
                  className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 text-left"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 ease-out-strong group-hover:-rotate-6 group-hover:scale-105"
                    style={{ background: service.iconBg, color: service.iconColor }}
                  >
                    <Icon name={service.icon} size={26} />
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-semibold text-navy transition-colors duration-200 group-hover:text-saffron">
                      {service.title}
                    </span>
                    <span className="mt-1 block max-w-[52ch] text-sm leading-relaxed text-muted">{service.description}</span>
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-[background-color,color,border-color,transform] duration-300 ease-out-strong group-hover:-rotate-45 group-hover:border-saffron group-hover:bg-saffron group-hover:text-white">
                    <Icon name="ArrowRight" size={16} weight="bold" />
                    <span className="sr-only">Book {service.title}</span>
                  </span>
                  {/* hover rule grows from the left */}
                  <span aria-hidden="true" className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-saffron transition-transform duration-500 ease-out-strong group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
