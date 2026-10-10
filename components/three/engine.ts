import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from '@/lib/gsap';
import { scrollState } from '@/lib/scroll-store';
import { bloodCells, clearModelCache, dnaHelix, flask, holoHuman, microscope, molecule, particles, pills, rack, sampleKit, testTubes, whiteCell, type LabObject } from './objects';

const { damp } = THREE.MathUtils;

/** World-space distance between stations along -Y */
export const STEP = 8;
const FOV = 35;
const CAM_Z = 11;

interface Ctx {
  animate: boolean;
  loader: GLTFLoader;
  /** half the visible world width at z=0 */
  halfW: number;
}

interface Station {
  /** which side the object occupies; the section puts its copy on the other side */
  side: -1 | 0 | 1;
  scale: number;
  tilt?: THREE.Vector3Tuple;
  y?: number;
  build: (c: Ctx) => LabObject[];
}

const at = (o: LabObject, x: number, y: number, z: number): LabObject => (o.object.position.set(x, y, z), o);

/**
 * One entry per [data-station] section, in page order (see app/page.tsx).
 * Every lab object is a real model file (public/models/lab, credits in
 * lib/model-credits.ts); only the body scan shader and particles are authored.
 */
const STATIONS: Station[] = [
  /* 0 hero      */ { side: 1, scale: 0.85, tilt: [0.1, 0, -0.28], y: -0.3, build: (c) => [dnaHelix(c.loader, { animate: c.animate }), at(bloodCells(c.loader, { count: 4, spread: 1.8, cellSize: 0.62, animate: c.animate }), -2.1, -1.7, -0.6)] },
  /* 1 services  */ { side: -1, scale: 1.2, tilt: [0.22, 0.45, 0], build: (c) => [testTubes(c.loader)] },
  /* 2 why       */ { side: 1, scale: 1.15, tilt: [0.1, -0.5, 0], y: -0.2, build: (c) => [microscope(c.loader, c.animate)] },
  /* 3 home      */ { side: -1, scale: 1.05, tilt: [0.1, 0.3, 0], build: (c) => [sampleKit(c.loader, c.animate)] },
  /* 4 tests     */ { side: 1, scale: 1.05, tilt: [0.05, -0.3, 0], y: -1.75, build: (c) => [holoHuman(c.loader, c.animate)] },
  /* 5 reports   */ { side: -1, scale: 1.1, tilt: [0.25, 0.6, 0], build: (c) => [rack(c.loader)] },
  /* 6 reviews   */ { side: 1, scale: 1, build: (c) => [molecule(c.loader, c.animate)] },
  /* 7 doctors   */ { side: -1, scale: 1, build: (c) => [whiteCell(c.loader, c.animate), at(bloodCells(c.loader, { count: 4, spread: 2, cellSize: 0.6, animate: c.animate, seed: 21 }), -1.8, -1.2, -0.4)] },
  /* 8 faq       */ { side: 1, scale: 1, build: (c) => [pills(c.loader, { animate: c.animate }), at(flask(c.loader, c.animate), 0.3, -0.2, -1)] },
  /* 9 final cta */ { side: 0, scale: 1, build: (c) => [at(bloodCells(c.loader, { count: 6, spread: 1.6, animate: c.animate, seed: 5 }), -c.halfW * 0.95, 1.5, -1.8), at(bloodCells(c.loader, { count: 6, spread: 1.6, animate: c.animate, seed: 9 }), c.halfW * 0.95, -1.6, -1.8)] },
];

export interface LabScene {
  dispose: () => void;
}

/**
 * Vanilla three.js lab scene (no React renderer): THREE.Timer clock,
 * renderer.setAnimationLoop (display refresh rate: 60/120/144 Hz), dt-based
 * damping everywhere, adaptive pixel ratio, full disposal.
 */
export function createLabScene(canvas: HTMLCanvasElement, { animate, onReady }: { animate: boolean; onReady: () => void }): LabScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  let dprCap = Math.min(window.devicePixelRatio, 1.75);
  renderer.setPixelRatio(dprCap);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#FAF6EF', 10, 24);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.04).texture;
  room.dispose();
  pmrem.dispose();
  scene.environmentIntensity = 0.9;

  scene.add(new THREE.AmbientLight('#ffffff', 0.45));
  scene.add(new THREE.HemisphereLight('#ffffff', '#E9D8C0', 0.5));
  const key = new THREE.DirectionalLight('#FFF4E6', 1.6);
  key.position.set(5, 8, 6);
  const rim = new THREE.DirectionalLight('#E9A23B', 0.7);
  rim.position.set(-6, -2, -4);
  scene.add(key, rim);

  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 60);
  camera.position.set(0, 0, CAM_Z);

  const loader = new GLTFLoader();
  const updates: NonNullable<LabObject['update']>[] = [];
  const add = (o: LabObject, parent: THREE.Object3D) => {
    parent.add(o.object);
    if (o.update) updates.push(o.update);
  };

  const halfWidth = () => Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAM_Z * camera.aspect;
  const size = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  size();

  add(particles(animate ? 520 : 260, STATIONS.length * STEP + 8), scene);

  const ctx: Ctx = { animate, loader, halfW: halfWidth() };
  const groups = STATIONS.map((s, i) => {
    const g = new THREE.Group();
    if (s.tilt) g.rotation.set(...s.tilt);
    s.build(ctx).forEach((o) => add(o, g));
    scene.add(g);
    return { g, s, i, baseRotY: s.tilt?.[1] ?? 0 };
  });

  const layout = () => {
    const halfW = halfWidth();
    const wide = halfW * 2 > 7.5;
    for (const { g, s, i } of groups) {
      // Phones: objects ride the right edge, further back and smaller (canvas is also faded in CSS)
      g.position.set(wide ? s.side * Math.min(halfW * 0.54, 4.4) : halfW * 0.78, -i * STEP + (s.y ?? 0), wide ? 0 : -3);
      g.userData.base = s.scale * (wide ? 1 : 0.5);
      g.scale.setScalar(g.userData.base * 0.82);
    }
  };
  layout();

  // Pointer parallax for fine pointers only
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const pointer = { x: 0 };
  const onPointer = (e: PointerEvent) => (pointer.x = (e.clientX / window.innerWidth) * 2 - 1);
  if (fine) window.addEventListener('pointermove', onPointer, { passive: true });

  const onResize = () => {
    size();
    layout();
    if (!animate) render();
  };
  window.addEventListener('resize', onResize);

  const timer = new THREE.Timer();
  timer.connect(document); // Page Visibility API: no giant delta after a hidden tab

  // Adaptive resolution: drop pixel ratio if frames run slow for ~1.5s
  let slow = 0;
  const adapt = (dt: number) => {
    slow = dt > 1 / 40 ? slow + dt : Math.max(0, slow - dt * 0.5);
    if (slow > 1.5 && dprCap > 1) {
      dprCap = Math.max(1, dprCap - 0.5);
      renderer.setPixelRatio(dprCap);
      slow = 0;
    }
  };

  const render = () => renderer.render(scene, camera);

  const frame = (time: number) => {
    timer.update(time);
    const dt = Math.min(timer.getDelta(), 0.1);
    const t = timer.getElapsed();

    camera.position.y = damp(camera.position.y, -scrollState.station * STEP, 3.2, dt);
    if (fine) camera.position.x = damp(camera.position.x, pointer.x * 0.45, 2, dt);
    camera.lookAt(camera.position.x * 0.4, camera.position.y, 0);

    for (const { g, i, baseRotY } of groups) {
      const d = Math.abs(scrollState.station - i);
      g.visible = d < 1.4;
      if (!g.visible) continue;
      const active = 1 - Math.min(d, 1);
      g.scale.setScalar(damp(g.scale.x, g.userData.base * (0.82 + active * 0.18), 4, dt));
      g.rotation.y = damp(g.rotation.y, baseRotY + (scrollState.station - i) * 0.6, 3, dt);
    }
    for (const u of updates) u(t, dt);
    adapt(dt);
    render();
  };

  let intro: gsap.core.Tween | null = null;
  if (animate) {
    intro = gsap.fromTo(camera.position, { z: 17, y: 2.5 }, { z: CAM_Z, y: 0, duration: 2.4, ease: 'ui-out', delay: 0.2 });
    renderer.setAnimationLoop(frame);
  } else {
    // Reduced motion: one static frame of the hero station, no moving background
    camera.lookAt(0, 0, 0);
    groups.forEach(({ g, i }) => (g.visible = i === 0));
    render();
  }
  requestAnimationFrame(onReady);

  return {
    dispose() {
      intro?.kill();
      renderer.setAnimationLoop(null);
      timer.dispose();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      const seen = new Set<unknown>();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry && !seen.has(m.geometry)) {
          seen.add(m.geometry);
          m.geometry.dispose();
        }
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        for (const mat of mats) {
          if (seen.has(mat)) continue;
          seen.add(mat);
          for (const v of Object.values(mat)) if (v instanceof THREE.Texture) v.dispose();
          mat.dispose();
        }
      });
      scene.environment?.dispose();
      clearModelCache();
      renderer.dispose();
    },
  };
}
