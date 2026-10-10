'use client';

import { useRef } from 'react';
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion } from '@/lib/gsap';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Max tilt in degrees */
  max?: number;
  as?: 'div' | 'article' | 'li';
  /** Corner radius of the glare clip — match the card */
  radius?: string;
}

/**
 * 3D pointer tilt. Children marked data-depth="1|2|3" sit on raised
 * planes (translateZ in CSS), so the card reads as layered hardware.
 * Only runs for fine pointers without reduced motion.
 */
export default function Tilt3D({ children, className = '', style, max = 7, as: Tag = 'div', radius = '2rem' }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (!hasFinePointer() || prefersReducedMotion() || !card.current || !contextSafe) return;
      const el = card.current;
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' });
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' });
      const gx = gsap.quickTo(glare.current, 'xPercent', { duration: 0.6, ease: 'power3' });
      const gy = gsap.quickTo(glare.current, 'yPercent', { duration: 0.6, ease: 'power3' });

      const move = contextSafe((e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * max * 2);
        rx(-py * max * 2);
        gx(px * 60);
        gy(py * 60);
      });
      const enter = contextSafe(() => gsap.to(glare.current, { autoAlpha: 1, duration: 0.3 }));
      const leave = contextSafe(() => {
        rx(0);
        ry(0);
        gsap.to(glare.current, { autoAlpha: 0, duration: 0.4 });
      });

      el.addEventListener('pointermove', move);
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerenter', enter);
        el.removeEventListener('pointerleave', leave);
      };
    },
    { scope: stage },
  );

  return (
    <div ref={stage} className="tilt-stage h-full">
      <Tag ref={card as never} className={`tilt relative h-full ${className}`} style={style}>
        {children}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" style={{ borderRadius: radius }}>
          <div
            ref={glare}
            className="invisible absolute -inset-1/2 opacity-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.6), transparent 45%)',
              mixBlendMode: 'soft-light',
            }}
          />
        </div>
      </Tag>
    </div>
  );
}
