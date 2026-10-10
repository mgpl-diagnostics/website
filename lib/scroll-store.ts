/**
 * Mutable state shared between the DOM (GSAP/ScrollTrigger, React handlers)
 * and the Three.js scene. Read it inside useFrame; never put it in React
 * state — it changes every frame.
 */
export const scrollState = {
  /** 0 → 1 across the whole page */
  progress: 0,
  /** px/s, signed */
  velocity: 0,
  /**
   * Continuous station index: 0 at the hero, 1 when the second
   * [data-station] section is centred, and so on. Drives the camera.
   */
  station: 0,
  /** Services list hover → matching test tube lifts. -1 = none */
  hoverService: -1,
  /** Test catalogue category → body-scan focus region (see BODY_REGIONS) */
  bodyRegion: null as string | null,
};
