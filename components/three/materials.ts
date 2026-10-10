import * as THREE from 'three';

/** Brand palette in linear-ready THREE.Color form */
export const C = {
  saffron: new THREE.Color('#C2410C'),
  marigold: new THREE.Color('#E9A23B'),
  ink: new THREE.Color('#14264A'),
  inkMid: new THREE.Color('#22396B'),
  tulsi: new THREE.Color('#1E7A4F'),
  cream: new THREE.Color('#FAF6EF'),
  enamel: new THREE.Color('#F1EBE0'),
  blood: new THREE.Color('#A8321A'),
};

let cache: ReturnType<typeof build> | null = null;

function build() {
  const glass = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.06,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.32,
    envMapIntensity: 1.4,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  return {
    glass,
    inkMetal: new THREE.MeshStandardMaterial({ color: C.ink, metalness: 0.55, roughness: 0.32 }),
    enamel: new THREE.MeshStandardMaterial({ color: C.enamel, metalness: 0.05, roughness: 0.45 }),
    chrome: new THREE.MeshStandardMaterial({ color: '#D7DCE4', metalness: 1, roughness: 0.18 }),
    saffron: new THREE.MeshStandardMaterial({ color: C.saffron, roughness: 0.4 }),
    marigold: new THREE.MeshStandardMaterial({ color: C.marigold, roughness: 0.4 }),
    tulsi: new THREE.MeshStandardMaterial({ color: C.tulsi, roughness: 0.45 }),
    cream: new THREE.MeshStandardMaterial({ color: C.cream, roughness: 0.5 }),
    ink: new THREE.MeshStandardMaterial({ color: C.ink, roughness: 0.45 }),
    blood: new THREE.MeshPhysicalMaterial({
      color: C.blood,
      roughness: 0.38,
      sheen: 1,
      sheenColor: new THREE.Color('#FF9B7A'),
      sheenRoughness: 0.5,
      clearcoat: 0.35,
    }),
    lamp: new THREE.MeshStandardMaterial({ color: C.marigold, emissive: C.marigold, emissiveIntensity: 1.6 }),
  };
}

/** Shared materials (one instance per material for the whole scene) */
export function labMaterials() {
  if (!cache) cache = build();
  return cache;
}
