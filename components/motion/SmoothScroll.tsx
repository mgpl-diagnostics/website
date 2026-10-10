'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, ScrollSmoother, useGSAP, scrollToTarget } from '@/lib/gsap';
import { scrollState } from '@/lib/scroll-store';

/**
 * Page-level motion root.
 *  - ScrollSmoother (skipped for reduced motion) with data-speed/data-lag effects
 *  - [data-reveal]  → batched ScrollTrigger fade-up (values: up | fade | scale | left | right)
 *  - [data-pin]     → pinned inside its parent on ≥1024px (replaces CSS sticky,
 *                     which can't work inside a transformed smoother)
 *  - in-page #anchor links → smoother.scrollTo / ScrollToPlugin
 *  - page progress  → scrollState for the 3D scene camera
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
          desktop: '(min-width: 1024px)',
        },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as Record<string, boolean>;

          if (motion) {
            ScrollSmoother.create({
              wrapper: wrapper.current!,
              content: content.current!,
              smooth: 1.1,
              smoothTouch: 0.1,
              effects: true,
            });
          }

          // Feed the 3D scene
          ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => {
              scrollState.progress = self.progress;
              scrollState.velocity = self.getVelocity();
            },
          });

          // Stations: continuous index for the 3D camera. The hero runs 0 → 0.5,
          // every later section runs i-0.5 → i+0.5 while its centre passes the
          // viewport centre, so the object arrives exactly with its content.
          gsap.utils.toArray<HTMLElement>('[data-station]').forEach((el, i) => {
            ScrollTrigger.create({
              trigger: el,
              start: i === 0 ? 'top top' : 'top center',
              end: 'bottom center',
              onUpdate: (self) => {
                scrollState.station = i === 0 ? self.progress * 0.5 : i - 0.5 + self.progress;
              },
            });
          });

          // Reveals
          const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]');
          if (!motion) {
            gsap.set(targets, { autoAlpha: 1 });
          } else {
            const from = (el: HTMLElement): gsap.TweenVars => {
              switch (el.dataset.reveal) {
                case 'fade': return { autoAlpha: 0 };
                case 'scale': return { autoAlpha: 0, scale: 0.96 };
                case 'left': return { autoAlpha: 0, x: -40 };
                case 'right': return { autoAlpha: 0, x: 40 };
                default: return { autoAlpha: 0, y: 40 };
              }
            };
            targets.forEach((el) => gsap.set(el, from(el)));
            ScrollTrigger.batch(targets, {
              start: 'top 90%',
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.9,
                  stagger: 0.06,
                  overwrite: true,
                  clearProps: 'transform',
                }),
            });
          }

          // Desktop pins
          if (desktop) {
            gsap.utils.toArray<HTMLElement>('[data-pin]').forEach((el) => {
              const parent = el.parentElement!;
              ScrollTrigger.create({
                trigger: el,
                start: 'top 128px',
                end: () => `+=${Math.max(0, parent.offsetHeight - el.offsetHeight)}`,
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
              });
            });
          }
        },
      );

      // Anchor links
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute('href')!;
        const target = id.length > 1 ? document.querySelector(id) : null;
        if (!target) return;
        e.preventDefault();
        scrollToTarget(target);
        history.replaceState(null, '', id);
      };
      document.addEventListener('click', onClick);

      // Web fonts change line heights → re-measure triggers once they land
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        document.removeEventListener('click', onClick);
        mm.revert();
      };
    },
    { scope: wrapper },
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
