---
name: mgpl-motion-3d
description: How motion and 3D work on the MGPL Diagnostics site — GSAP (ScrollSmoother, ScrollTrigger, SplitText, ScrollToPlugin, CustomEase, useGSAP), the vanilla three.js "Living Lab" engine with stations, THREE.Timer, DOM↔3D coupling, reduced motion and 120 Hz rules. Use before adding or changing any animation, scroll effect, 3D object, station, or anything in components/motion, components/three, lib/gsap.ts or lib/scroll-store.ts.
---

# MGPL Motion & 3D

## Stack (and what's deliberately absent)

| Use | Don't use | Why |
|---|---|---|
| `gsap` + `@gsap/react` (`useGSAP`) | Framer Motion, Motion, anime.js | One animation system; GSAP drives DOM *and* three.js |
| GSAP **ScrollSmoother** | Lenis, Locomotive | Exactly one smooth-scroll engine |
| **Vanilla three.js** (`components/three/engine.ts`) | `@react-three/fiber`, `@react-three/drei` | R3F 9.x calls the deprecated `THREE.Clock`; zero-deprecation rule |
| `THREE.Timer` + `renderer.setAnimationLoop` | `THREE.Clock`, manual rAF loops | Timer is the replacement; the loop follows display Hz |
| `three/addons/*` (RoomEnvironment, RoundedBoxGeometry, GLTFLoader) | HDR files from CDNs | No network for lighting |

**Zero-deprecation rule (user requirement):** nothing deprecated anywhere. Before using an API, check `@deprecated` in its `.d.ts`. Known traps: `THREE.Clock`, non-suffixed Phosphor icons, `React.FormEvent` (use `React.SubmitEvent<HTMLFormElement>`), Tailwind `bg-gradient-to-*` (use `bg-linear-to-*`).

## GSAP setup — `lib/gsap.ts`

- Import GSAP **only** from `@/lib/gsap`. It registers ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, CustomEase and useGSAP once.
- Eases come from the Emil/animate skill tables, as CustomEase: `ui-out` (0.23,1,0.32,1, the default), `ui-in-out` (0.77,0,0.175,1), `ui-drawer` (0.32,0.72,0,1). Don't invent curves. Never use `ease-in` on UI.
- Helpers: `scrollToTarget(el)` (smoother.scrollTo, falling back to ScrollToPlugin), `setScrollLocked(bool)` (pauses the smoother for modals), `prefersReducedMotion()`, `hasFinePointer()`.

## Page motion root — `components/motion/SmoothScroll.tsx`

Wraps `<main>` + `<Footer>` in `#smooth-wrapper/#smooth-content`. Fixed things (Navbar, BackgroundScene, dialog) live **outside** the wrapper.

| Attribute | Effect |
|---|---|
| `data-reveal` (`up` default, `fade`, `scale`, `left`, `right`) | Batched ScrollTrigger reveal, 0.9s, 60ms stagger |
| `data-station` | Feeds `scrollState.station` for the 3D camera |
| `data-pin` | Pinned inside its parent on ≥1024px (CSS `sticky` can't work inside ScrollSmoother) |
| `data-speed` / `data-lag` | ScrollSmoother parallax effects |
| `href="#id"` links | Intercepted → `scrollToTarget` (the native jump breaks under the smoother) |

- `html.motion-ok` (set by an inline `beforeInteractive` script) pre-hides `[data-reveal]` and `[data-hero]` to avoid a flash. **Any element with `data-reveal` must sit inside SmoothScroll**, or it stays invisible. That was the cause of the "gaps" bug.
- Reduced motion: no ScrollSmoother, reveals set visible instantly, no scrubbed timelines.
- After layout changes (filtering, expanding), call `ScrollTrigger.refresh()` (TestCategories does).

## Component motion rules

- `useGSAP(fn, { scope })` always, with a scope. Wrap event-handler tweens with `contextSafe` **at call time** (`contextSafe(() => {...})()`), not during render (React Compiler lint).
- Use `gsap.matchMedia()` for reduced-motion branches inside components.
- Hover/press/state = CSS transitions (`.press`, `.lift`, Tailwind `transition-*` with `ease-out-strong`), gated by `@media (hover:hover) and (pointer:fine)`. GSAP is for sequences, scroll and 3D.
- Transform/opacity only (blur/clip-path allowed for reveals). No `transition: all`. UI ≤ 300ms. Never scale from 0.
- SplitText: `SplitText.create(el, { type: 'lines,words', mask: 'lines', aria: 'auto' })` and `split.revert()` on cleanup. Only on headings without links.
- Counters: tween a plain object and write `textContent` (no React state per frame).
- `Tilt3D` (`components/motion/Tilt3D.tsx`): pointer tilt via `gsap.quickTo`; children with `data-depth="1|2|3"` sit on translateZ planes. Every layer between `.tilt` and a depth child must stay `preserve-3d`: no `overflow-hidden`, `backdrop-blur` or filters on those layers. Don't animate an element that also has `data-depth`; wrap it.

## 3D engine — `components/three/`

- `BackgroundScene.tsx`: fixed canvas at `z-0` (content `#smooth-wrapper` is `z-2`). Imports `engine.ts` on idle. Fades to 100% on lg and **40% on phones** (legibility). Reduced motion renders one static hero frame.
- `engine.ts`: `createLabScene(canvas, { animate, onReady }) → { dispose }`. Camera fov 35 at z 11; `STEP = 8` world units between stations; camera y damps to `-station*STEP`; pointer parallax on fine pointers; GSAP intro dolly; adaptive pixel ratio (cap 1.75, drops when frames run > 25ms); full disposal of geometries, materials, textures and the renderer.
- `objects.ts`: builders return `{ object, update?(t, dt) }`. Lab objects are **real model files** loaded with `GLTFLoader` from `public/models/lab/` (DNA, red and white blood cells, test tubes, microscope, syringe, flask, rack, molecule, pills). Only the body-scan shader and the particles are authored in code. **Every** motion uses `t`/`dt` from THREE.Timer and `THREE.MathUtils.damp`. **Why:** identical speed at 60, 120 and 144 Hz, just smoother.
- Randomness = seeded `rng(seed)` (mulberry32), never `Math.random()`. Layouts stay stable across reloads.
- Shared materials: `materials.ts` `labMaterials()` (singletons). Glass is transparent with `depthWrite:false` and `renderOrder 2`.
### Real model pipeline (how to add or replace a model)
1. **Source:** only CC0 or CC-BY with a direct download, e.g. Poly Pizza (`poly.pizza/m/<id>`, page has `static.poly.pizza/<uuid>.glb`), Smithsonian Open Access (CC0) or NIH 3D. Never paid, "editorial only" or personal-use files (CGTrader, TurboSquid, RenderHub, free3d). Sketchfab needs a login, so it's out.
2. **Preview** every candidate through three.js before choosing (contact sheet: render each GLB in a scissored viewport, `preserveDrawingBuffer: true`).
3. **Optimise** with `npx @gltf-transform/cli@4 optimize in.glb out.glb --compress quantize --instance false --palette false --texture-compress false`. `--palette false` is required: palette textures break brand recolouring. Quantisation is decoded natively by GLTFLoader (no Draco or Meshopt decoder to ship). Flat-shaded CAD-like files: strip NORMAL and TEXCOORD, then weld and simplify with a gltf-transform script (the microscope went 2.26 MB → 113 KB). Budget: about 200 KB per model.
4. **Load** through `model(loader, file, { size, recolor?, flatShade?, keepMaterials?, drop? })`. It centres the model, scales its largest side to `size`, maps materials onto the brand palette by hue (translucent → glass, red → saffron, yellow → marigold, green → tulsi, blue/purple → ink, grey → chrome/enamel) and computes normals if the file has none (otherwise it renders black). Use `drop` to remove unwanted parts such as display plinths.
   - **Red blood cell exception:** no free, commercially licensed file has the real shape (the Poly Pizza one is a flat 24-sided coin). `public/models/lab/rbc.glb` is generated from the Evans & Fung (1972) measured erythrocyte profile (doi 10.1016/0026-2862(72)90069-6) by a gltf-transform script, quantized to 58 KB. `bloodCells()` places cells with a minimum centre distance larger than the biggest diameter, so they never overlap or clump.
5. **Credit:** add the model to `lib/model-credits.ts` (title, author, source, licence). The footer renders the CC-BY attribution from that list. Shipping without it violates the licence.

- Human: `public/models/human.glb`, "3D Male Base Mesh" by orange-juice-games, **CC0**, rendered in bind pose (A-pose) with the hologram ShaderMaterial. Only use CC0/CC-BY models with provenance noted in code.

### Adding a station (in order)
1. Add the section with `data-station` in `app/page.tsx`, at the right position.
2. Insert a `STATIONS` entry at the **same index**: `side` opposite the content, `scale`, optional `tilt`/`y`, and `build(ctx)` returning LabObjects.
3. If the DOM should drive the object, add a field to `lib/scroll-store.ts` and read it in the object's `update`. Examples: `hoverService` lifts a test tube, `bodyRegion` sets the body-scan focus.
4. Check at 1440×900 and 390×844 that the object doesn't cover copy.

### DOM ↔ 3D coupling
`lib/scroll-store.ts` is a plain mutable object: `progress`, `velocity`, `station`, `hoverService`, `bodyRegion`. Write it from handlers or ScrollTrigger; read it in `update`. **Never** put it in React state (it changes every frame).

## Performance budget
- Draw calls stay low: instancing for repeats (DNA, blood cells), stations > 1.4 away are `visible=false`.
- No per-frame allocation inside `update` (reuse `Object3D`/vectors).
- Canvas DPR ≤ 1.75; particles 520 (260 when static).
- rAF-driven everything → runs at the device refresh rate (120 Hz included). Don't cap with `gsap.ticker.fps`.
