import * as THREE from 'three';
import type { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { labMaterials, C } from './materials';
import { scrollState } from '@/lib/scroll-store';

const { damp } = THREE.MathUtils;

/**
 * Every builder returns a root object plus an optional per-frame update.
 * Updates receive elapsed seconds and delta seconds from THREE.Timer, so
 * motion is identical at 60, 120 or 144 Hz.
 *
 * Lab objects are real model files (public/models/lab, credits in
 * lib/model-credits.ts). They load asynchronously into their group; the
 * station is simply empty for the few ms before a file arrives.
 */
export interface LabObject {
  object: THREE.Object3D;
  update?: (t: number, dt: number) => void;
}

/** Deterministic PRNG (mulberry32): same layout on every load */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const mesh = (g: THREE.BufferGeometry, m: THREE.Material, p?: THREE.Vector3Tuple, r?: THREE.Vector3Tuple) => {
  const o = new THREE.Mesh(g, m);
  if (p) o.position.set(...p);
  if (r) o.rotation.set(...r);
  return o;
};

/* ───────────────────────────── Model loading ──────────────────────── */
const LAB = '/models/lab/';
const cache = new Map<string, Promise<GLTF>>();
const load = (loader: GLTFLoader, file: string) => {
  if (!cache.has(file)) cache.set(file, loader.loadAsync(LAB + file));
  return cache.get(file)!;
};
/** Clear between scene instances (React StrictMode / reduced-motion toggle) */
export const clearModelCache = () => cache.clear();

type Recolor = (src: THREE.MeshStandardMaterial, hsl: { h: number; s: number; l: number }) => THREE.Material | undefined;

const flatCache = new Map<THREE.Material, THREE.Material>();
const flat = (m: THREE.Material) => {
  if (!flatCache.has(m)) {
    const c = (m as THREE.MeshStandardMaterial).clone();
    c.flatShading = true;
    flatCache.set(m, c);
  }
  return flatCache.get(m)!;
};

/**
 * Map a model's original material onto the brand palette by colour, so every
 * third-party file reads as one art-directed set (Saffron & Neel).
 */
function brandMaterial(src: THREE.MeshStandardMaterial, override?: Recolor): THREE.Material {
  const m = labMaterials();
  const hsl = { h: 0, s: 0, l: 0 };
  src.color.getHSL(hsl);
  const o = override?.(src, hsl);
  if (o) return o;
  if (src.transparent || src.opacity < 0.99) return m.glass;
  if (src.map) return src; // textured models keep their artwork
  const { h, s, l } = hsl;
  if (s < 0.15) return l > 0.72 ? m.enamel : l < 0.2 ? m.inkMetal : m.chrome;
  if (h < 0.07 || h > 0.93) return m.saffron;
  if (h < 0.17) return m.marigold;
  if (h < 0.45) return m.tulsi;
  if (h < 0.55) return m.chrome;
  return m.ink;
}

interface ModelOpts {
  /** largest dimension after normalising, in world units */
  size: number;
  recolor?: Recolor;
  /** model ships without normals (welded for size) → flat shading */
  flatShade?: boolean;
  /** keep original materials */
  keepMaterials?: boolean;
  /** drop parts of the file we don't want (e.g. a display plinth) */
  drop?: (src: THREE.MeshStandardMaterial) => boolean;
}

/** Centre a model on its bounding box and scale its largest side to `size`. */
function normalise(obj: THREE.Object3D, size: number) {
  const box = new THREE.Box3().setFromObject(obj);
  const dim = box.getSize(new THREE.Vector3());
  const ctr = box.getCenter(new THREE.Vector3());
  const s = size / Math.max(dim.x, dim.y, dim.z);
  obj.scale.setScalar(s);
  obj.position.copy(ctr).multiplyScalar(-s);
}

function prepare(scene: THREE.Object3D, o: ModelOpts) {
  if (o.drop) {
    const doomed: THREE.Object3D[] = [];
    scene.traverse((n) => {
      const mesh = n as THREE.Mesh;
      if (mesh.isMesh && o.drop!(mesh.material as THREE.MeshStandardMaterial)) doomed.push(mesh);
    });
    doomed.forEach((d) => d.removeFromParent());
  }
  scene.traverse((n) => {
    const mesh = n as THREE.Mesh;
    if (!mesh.isMesh) return;
    // some files ship without normals (welded for size): unlit-black otherwise
    if (!mesh.geometry.attributes.normal) mesh.geometry.computeVertexNormals();
    if (o.keepMaterials) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const next = mats.map((mat) => {
      const b = brandMaterial(mat as THREE.MeshStandardMaterial, o.recolor);
      return o.flatShade && b !== labMaterials().glass ? flat(b) : b;
    });
    mesh.material = Array.isArray(mesh.material) ? next : next[0];
    if (next.includes(labMaterials().glass)) mesh.renderOrder = 2;
  });
}

/** Load a model file into a group (normalised + brand-recoloured). */
function model(loader: GLTFLoader, file: string, o: ModelOpts, onReady?: (root: THREE.Object3D) => void) {
  const group = new THREE.Group();
  load(loader, file).then((gltf) => {
    const scene = gltf.scene.clone(true);
    prepare(scene, o);
    const holder = new THREE.Group();
    holder.add(scene);
    normalise(scene, o.size);
    group.add(holder);
    onReady?.(holder);
  });
  return group;
}

const spin = (obj: THREE.Object3D, animate: boolean, y = 0.22, x = 0) => (_: number, dt: number) => {
  if (!animate) return;
  obj.rotation.y += dt * y;
  obj.rotation.x += dt * x;
};

/* ─────────────────────────────── DNA ──────────────────────────────── */
export function dnaHelix(loader: GLTFLoader, { size = 5.2, animate = true } = {}): LabObject {
  const g = model(loader, 'dna.glb', { size });
  return { object: g, update: spin(g, animate) };
}

/* ─────────────────────────── Red blood cells ──────────────────────── */
export function bloodCells(loader: GLTFLoader, { count = 9, spread = 3, animate = true, seed = 11, cellSize = 0.75 } = {}): LabObject {
  const group = new THREE.Group();
  const rand = rng(seed);
  // Non-overlapping layout: centres stay further apart than the largest cell
  // diameter (+ bob room), so cells never touch whatever way they rotate.
  const S_MAX = 1.15;
  const minDist = cellSize * S_MAX + 0.3;
  const cells: { x: number; y: number; z: number; rx: number; ry: number; s: number; v: number }[] = [];
  let area = spread;
  for (let tries = 0; cells.length < count; tries++) {
    if (tries > 0 && tries % 200 === 0) area *= 1.15; // too crowded: widen the cluster
    const p = { x: (rand() - 0.5) * area, y: (rand() - 0.5) * area, z: (rand() - 0.5) * 1.2 };
    if (cells.some((c) => Math.hypot(c.x - p.x, c.y - p.y, c.z - p.z) < minDist)) continue;
    cells.push({ ...p, rx: rand() * 6, ry: rand() * 6, s: 0.85 + rand() * (S_MAX - 0.85), v: 0.15 + rand() * 0.3 });
  }
  let im: THREE.InstancedMesh | null = null;
  let base = 1;
  const o = new THREE.Object3D();
  const place = (t: number) => {
    if (!im) return;
    cells.forEach((c, i) => {
      o.position.set(c.x, c.y + Math.sin(t * c.v + i) * 0.12, c.z);
      o.rotation.set(c.rx + t * c.v, c.ry + t * c.v * 0.7, 0);
      o.scale.setScalar(c.s * base);
      o.updateMatrix();
      im!.setMatrixAt(i, o.matrix);
    });
    im.instanceMatrix.needsUpdate = true;
  };

  load(loader, 'rbc.glb').then((gltf) => {
    let src: THREE.Mesh | null = null;
    gltf.scene.traverse((n) => {
      if (!src && (n as THREE.Mesh).isMesh) src = n as THREE.Mesh;
    });
    if (!src) return;
    const geo = (src as THREE.Mesh).geometry.clone();
    geo.computeBoundingBox();
    geo.center();
    const dim = geo.boundingBox!.getSize(new THREE.Vector3());
    base = cellSize / Math.max(dim.x, dim.y, dim.z);
    if (!geo.attributes.normal) geo.computeVertexNormals();
    im = new THREE.InstancedMesh(geo, labMaterials().blood, count);
    im.frustumCulled = false;
    group.add(im);
    place(0);
  });

  return { object: group, update: (t) => animate && place(t) };
}

/* ───────────────────── Test tubes (services index) ────────────────── */
// Real sample colours: whole blood, serum, plasma, urine-ish, clot, heparin
const FILLS = ['#8E1F12', '#E8B04A', '#B9372A', '#D9A441', '#7A1A10', '#C2410C'];

export function testTubes(loader: GLTFLoader, count = 6): LabObject {
  const root = new THREE.Group();
  const spacing = 0.5;
  const lifts: THREE.Group[] = [];
  const fills = FILLS.map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.25 }));
  for (let i = 0; i < count; i++) {
    const lift = new THREE.Group();
    lift.position.x = (i - (count - 1) / 2) * spacing;
    // liquid = the opaque material; recolour it per tube
    lift.add(model(loader, 'tube.glb', { size: 1.9, recolor: (src) => (src.transparent ? undefined : fills[i % fills.length]) }));
    root.add(lift);
    lifts.push(lift);
  }
  return {
    object: root,
    // Services list hover lifts the matching tube
    update: (_, dt) =>
      lifts.forEach((g, i) => {
        const on = scrollState.hoverService === i;
        g.position.y = damp(g.position.y, on ? 0.6 : 0, 8, dt);
        g.rotation.z = damp(g.rotation.z, on ? -0.1 : 0, 6, dt);
      }),
  };
}

/* ───────────────────────────── Microscope ─────────────────────────── */
export function microscope(loader: GLTFLoader, animate = true): LabObject {
  const g = model(loader, 'microscope.glb', {
    size: 3,
    flatShade: true,
    // the source file stands on a steel-blue display plinth; keep only the instrument
    drop: ({ color: c }) => c.b > c.r * 1.6 && c.b < 0.2 && c.g < 0.15,
  });
  return { object: g, update: spin(g, animate, 0.12) };
}

/* ───────────────── Home collection: syringe + sample tube ─────────── */
export function sampleKit(loader: GLTFLoader, animate = true): LabObject {
  const root = new THREE.Group();
  const syringe = model(loader, 'syringe.glb', { size: 2.8 });
  syringe.rotation.set(0.2, 0, -0.75);
  const tube = model(loader, 'tube.glb', { size: 1.6, recolor: (src) => (src.transparent ? undefined : labMaterials().blood) });
  tube.position.set(0.9, -0.5, 0.4);
  tube.rotation.z = 0.25;
  root.add(syringe, tube);
  return {
    object: root,
    update: (t) => {
      if (!animate) return;
      syringe.position.y = Math.sin(t * 0.8) * 0.08;
      tube.position.y = -0.5 + Math.sin(t * 0.8 + 1.4) * 0.1;
    },
  };
}

/* ─────────────────────────── Flask / rack / molecule ──────────────── */
export function flask(loader: GLTFLoader, animate = true): LabObject {
  const g = model(loader, 'flask.glb', { size: 2.2, recolor: (src) => (src.transparent ? undefined : labMaterials().saffron) });
  return { object: g, update: spin(g, animate, 0.18) };
}

export function rack(loader: GLTFLoader): LabObject {
  const m = labMaterials();
  // the wooden frame becomes Neel ink so it reads against the cream page
  return { object: model(loader, 'rack.glb', { size: 2.4, recolor: (_, { h, s, l }) => (h < 0.1 && s > 0.5 && l < 0.5 ? m.inkMetal : undefined) }) };
}

export function molecule(loader: GLTFLoader, animate = true): LabObject {
  const g = model(loader, 'molecule.glb', { size: 5.2 });
  return { object: g, update: spin(g, animate, 0.3, 0.08) };
}

/* ─────────────────────────── White blood cell ─────────────────────── */
export function whiteCell(loader: GLTFLoader, animate = true): LabObject {
  const g = model(loader, 'wbc.glb', { size: 1.8, keepMaterials: true }, (root) =>
    root.traverse((n) => {
      const mesh = n as THREE.Mesh;
      if (mesh.isMesh) {
        const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
        mat.color = C.cream.clone().lerp(C.marigold, 0.12);
        mat.roughness = 0.55;
        mesh.material = mat;
      }
    }),
  );
  return { object: g, update: spin(g, animate, 0.16, 0.05) };
}

/* ─────────────────────────────── Pills ────────────────────────────── */
export function pills(loader: GLTFLoader, { animate = true, spread = 2.6, seed = 3 } = {}): LabObject {
  const root = new THREE.Group();
  const rand = rng(seed);
  const files = ['capsule.glb', 'pill-a.glb', 'pill-b.glb', 'capsule.glb', 'pill-a.glb', 'capsule.glb'];
  const items = files.map((file) => {
    const g = model(loader, file, { size: 0.75, keepMaterials: file === 'capsule.glb' });
    g.position.set((rand() - 0.5) * spread, (rand() - 0.5) * spread, (rand() - 0.5) * 1.2);
    g.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    root.add(g);
    return { g, v: 0.2 + rand() * 0.4 };
  });
  return {
    object: root,
    update: (_, dt) => {
      if (!animate) return;
      for (const { g, v } of items) {
        g.rotation.x += dt * v;
        g.rotation.z += dt * v * 0.6;
      }
    },
  };
}

/* ───────────────────────── Holographic body scan ──────────────────── */
// Model: "3D Male Base Mesh" by orange-juice-games, CC0 1.0 (public domain)
// https://github.com/BoQsc/Godot-Male-Base-Mesh → public/models/human.glb
export const HUMAN_URL = '/models/human.glb';
const HUMAN_HEIGHT = 3.4;

/** Focus height (feet at 0, body 3.4 tall) per test category */
export const BODY_REGIONS: Record<string, number> = {
  Endocrinology: 2.8, // thyroid
  Cardiology: 2.42, // heart
  Immunology: 2.55, // chest lymph nodes
  Biochemistry: 2.15, // liver
  Diabetology: 2.02, // pancreas
  Gynaecology: 1.72, // pelvis
  Haematology: 1.95,
  Pathology: 1.95,
  Paediatrics: 1.95,
  General: 1.95,
};

const holoVertex = /* glsl */ `
  uniform float uMinY;
  uniform float uScale;
  varying vec3 vN;
  varying vec3 vV;
  varying float vY;
  void main() {
    vY = (position.y - uMinY) * uScale;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vV = -mv.xyz;
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;
const holoFragment = /* glsl */ `
  uniform float uTime;
  uniform float uScan;
  uniform float uFocus;
  uniform float uFocusAmt;
  uniform vec3 uInk;
  uniform vec3 uHot;
  varying vec3 vN;
  varying vec3 vV;
  varying float vY;
  void main() {
    float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.0);
    float band = smoothstep(0.14, 0.0, abs(vY - uScan));
    float lines = smoothstep(0.42, 0.5, fract(vY * 26.0 - uTime * 0.4)) * 0.16;
    float focus = smoothstep(0.3, 0.0, abs(vY - uFocus)) * uFocusAmt;
    vec3 col = mix(uInk, uHot, clamp(band + focus, 0.0, 1.0));
    float a = fres * 0.9 + band * 0.55 + focus * 0.5 + lines * fres + 0.05;
    gl_FragColor = vec4(col, clamp(a, 0.0, 0.95));
  }
`;

export function holoHuman(loader: GLTFLoader, animate = true): LabObject {
  const root = new THREE.Group();
  const uniforms = {
    uTime: { value: 0 },
    uScan: { value: 1.7 },
    uFocus: { value: 1.95 },
    uFocusAmt: { value: 0 },
    uMinY: { value: 0 },
    uScale: { value: 1 },
    uInk: { value: C.ink.clone() },
    uHot: { value: C.saffron.clone() },
  };
  const mat = new THREE.ShaderMaterial({ vertexShader: holoVertex, fragmentShader: holoFragment, uniforms, transparent: true, depthWrite: false });

  loader.load(HUMAN_URL, (gltf) => {
    let src: THREE.BufferGeometry | null = null;
    gltf.scene.traverse((o) => {
      if (!src && (o as THREE.Mesh).isMesh) src = (o as THREE.Mesh).geometry;
    });
    if (!src) return;
    // Static A-pose: the skinned mesh's bind-pose geometry, no skeleton needed
    const geo = (src as THREE.BufferGeometry).clone();
    geo.computeVertexNormals();
    geo.computeBoundingBox();
    const bb = geo.boundingBox!;
    const scale = HUMAN_HEIGHT / (bb.max.y - bb.min.y);
    uniforms.uMinY.value = bb.min.y;
    uniforms.uScale.value = scale;
    const body = new THREE.Mesh(geo, mat);
    body.scale.setScalar(scale);
    body.rotation.y = -Math.PI / 2; // model faces +x; turn it toward the camera
    body.position.y = -bb.min.y * scale;
    root.add(body);
  });

  const heart = mesh(new THREE.SphereGeometry(0.065, 16, 16), new THREE.MeshStandardMaterial({ color: C.saffron, emissive: C.saffron, emissiveIntensity: 0.9 }), [0.08, BODY_REGIONS.Cardiology, 0.14]);
  const ring = mesh(new THREE.RingGeometry(0.62, 0.66, 64), new THREE.MeshBasicMaterial({ color: C.saffron, transparent: true, opacity: 0.7 }), [0, 0.01, 0], [-Math.PI / 2, 0, 0]);
  const disc = mesh(new THREE.CircleGeometry(0.62, 64), new THREE.MeshBasicMaterial({ color: C.ink, transparent: true, opacity: 0.08 }), [0, 0, 0], [-Math.PI / 2, 0, 0]);
  root.add(heart, ring, disc);

  return {
    object: root,
    update: (t, dt) => {
      uniforms.uTime.value = t;
      uniforms.uScan.value = animate ? 0.1 + ((Math.sin(t * 0.6) + 1) / 2) * (HUMAN_HEIGHT - 0.2) : BODY_REGIONS.Cardiology;
      const region = scrollState.bodyRegion ? BODY_REGIONS[scrollState.bodyRegion] : undefined;
      uniforms.uFocusAmt.value = damp(uniforms.uFocusAmt.value, region !== undefined ? 1 : 0, 5, dt);
      if (region !== undefined) uniforms.uFocus.value = damp(uniforms.uFocus.value, region, 6, dt);
      if (animate) heart.scale.setScalar(1 + Math.max(0, Math.sin(t * 7)) * 0.18);
    },
  };
}

/* ─────────────────────────── Ambient particles ────────────────────── */
export function particles(count = 500, depth = 70): LabObject {
  const g = new THREE.BufferGeometry();
  const p = new Float32Array(count * 3);
  const rand = rng(101);
  for (let i = 0; i < count; i++) {
    p[i * 3] = (rand() - 0.5) * 18;
    p[i * 3 + 1] = 4 - rand() * depth;
    p[i * 3 + 2] = -7 + rand() * 8;
  }
  g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  const grd = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 64, 64);
  const mat = new THREE.PointsMaterial({ map: new THREE.CanvasTexture(c), color: C.saffron, size: 0.09, sizeAttenuation: true, transparent: true, opacity: 0.55, depthWrite: false });
  return { object: new THREE.Points(g, mat) };
}
