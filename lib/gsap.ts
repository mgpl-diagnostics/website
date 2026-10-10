'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, CustomEase, useGSAP);

  // Same curves as the CSS tokens in globals.css (--ease-out, --ease-in-out, --ease-drawer)
  CustomEase.create('ui-out', '0.23, 1, 0.32, 1');
  CustomEase.create('ui-in-out', '0.77, 0, 0.175, 1');
  CustomEase.create('ui-drawer', '0.32, 0.72, 0, 1');

  gsap.defaults({ ease: 'ui-out', duration: 0.6 });
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Scroll to a selector/element. Uses ScrollSmoother when it is running,
 * otherwise ScrollToPlugin (reduced-motion visitors get an instant jump).
 */
export function scrollToTarget(target: string | Element, offset = 96) {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true, `top ${offset}px`);
    return;
  }
  gsap.to(window, {
    duration: prefersReducedMotion() ? 0 : 0.9,
    ease: 'ui-in-out',
    scrollTo: { y: target, offsetY: offset, autoKill: true },
  });
}

/** Pause smooth scrolling (or native scroll) while a modal is open. */
export function setScrollLocked(locked: boolean) {
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.paused(locked);
  else document.documentElement.style.overflow = locked ? 'hidden' : '';
}

export { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, useGSAP };
