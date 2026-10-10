---
name: mgpl-ship
description: Build, verify and ship checklist for the MGPL Diagnostics Next.js 16 site — commands, the browser screenshot/FPS check, deprecation scan, accessibility and performance gates, and what blocks a release. Use before saying any change is done, before committing, and before deploying.
---

# MGPL Ship Checklist

Stack: Next.js 16.2 (App Router, Turbopack), React 19.2, Tailwind v4, TypeScript, GSAP 3.15, three r186. Read `node_modules/next/dist/docs/` before using any Next API (AGENTS.md: this Next differs from training data).

## 1. Static gates (all must pass, zero output)

```bash
npx tsc --noEmit
npx eslint components app lib context      # React Compiler rules: purity, refs, immutability
npm run build
```

Common lint fixes on this codebase:
- `react-hooks/purity` → seeded `rng(seed)`, not `Math.random()` in render or memo.
- `react-hooks/immutability` → mutate through `ref.current` or inside non-React modules (three.js lives in `engine.ts`/`objects.ts` for this reason).
- `react-hooks/refs` → don't call `contextSafe(...)` during render; call it inside the handler.
- `react-hooks/set-state-in-effect` → media queries via `useSyncExternalStore`.

## 2. Deprecation scan (user rule: nothing deprecated)

```bash
grep -rn "THREE.Clock\|FormEvent\|bg-gradient-to\|from 'lucide-react'\|framer-motion\|@react-three" components app lib
```
Must return nothing. Also open the browser console: the only allowed message is Windows ANGLE's `X4122 … double precision`. It's a Direct3D shader-compiler precision note about three.js's own shaders, not a deprecation, and it only appears on Windows/D3D.

## 3. Browser check (desktop + mobile, every station)

`scripts/check.mjs` drives the installed Chrome via `puppeteer-core`. Install it **outside the repo** (e.g. the session scratchpad: `npm i puppeteer-core@24`), never as a project dependency.

```bash
npm run build && npx next start -p 3100     # keep the user's dev server on 3000 untouched
# copy scripts/check.mjs next to the puppeteer-core install, then:
node check.mjs http://localhost:3100 ./out
```
It saves `desktop-NN.png` / `mobile-NN.png` per `[data-station]` plus the footer, prints console warnings and errors, and reports rAF fps. Headless Chrome is capped at 60, so 120 Hz can only be confirmed on a real 120 Hz screen.

Look for, at 1440×900 and 390×844:
- [ ] Hero: h1 is 2 lines on desktop, the readout rail is visible without scrolling, the DNA doesn't reach the navbar.
- [ ] No 3D object covers headings, copy or buttons. On phones the canvas is faint (40%).
- [ ] No blank gaps. If you see one, a `data-reveal` element is probably outside `SmoothScroll`.
- [ ] Content fades before it slides under the navbar (scroll-edge fade). No text shows through the glass.
- [ ] Footer logo is the navy artwork (`logo-dark.svg`), not a filtered white blob.
- [ ] No horizontal scroll on mobile.

## 4. Behaviour checks
- [ ] Nav links scroll smoothly to sections (ScrollSmoother) and keep the URL hash in sync.
- [ ] Book a Test dialog: opens from every CTA, Escape and backdrop click close it with the exit animation, focus is trapped, scrolling is locked while open.
- [ ] Services hover lifts the matching test tube. Test categories move the body-scan focus. Search filters across all categories with an empty state.
- [ ] Report form: inline errors, OTP-sent state, "Use a different number" resets.
- [ ] Emulate `prefers-reduced-motion: reduce` in DevTools: native scroll, no reveals hidden, static 3D frame, no SplitText.

## 5. Performance gates
- 3D engine loads on idle and never blocks LCP (the hero text is SSR).
- Models: `public/models/lab/*.glb` total ~576 KB, `human.glb` ~94 KB. Keep any new model ≤ 200 KB after gltf-transform quantize (see mgpl-motion-3d).
- Every third-party model is listed in `lib/model-credits.ts`, so it shows in the footer's "3D model credits". CC-BY requires this.
- No new animation library and no second smooth-scroll engine.

## 6. Release hygiene
- Don't commit `.next/`, `tsconfig.tsbuildinfo` or screenshot output.
- Commit or push only when the user asks. Branch off `master` first.
- In the final message to the user: what changed, what was verified (commands + browser check), and what wasn't (e.g. a real 120 Hz device).
