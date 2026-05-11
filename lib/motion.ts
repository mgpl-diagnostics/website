import type { Variants } from 'framer-motion';

/** Fade up on enter — use with `whileInView` or `animate` */
export const fadeUpVariant: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/** Stagger children container */
export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.08 } },
};

/** Fade in only */
export const fadeInVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};
