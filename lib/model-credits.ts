/**
 * Third-party 3D models used by the Living Lab scene. CC-BY requires visible
 * credit (title, author, source, licence) — rendered in the footer.
 * Files in public/models are optimised copies (quantised, recoloured at runtime).
 */
export interface ModelCredit {
  file: string;
  title: string;
  author: string;
  source: string;
  license: 'CC-BY 3.0' | 'CC0 1.0';
}

const CC_BY = 'CC-BY 3.0' as const;

export const MODEL_CREDITS: ModelCredit[] = [
  { file: '/models/lab/dna.glb', title: 'DNA', author: 'Zoe XR', source: 'https://poly.pizza/m/0e5xgkdcuEW', license: CC_BY },
  // Generated in-house from the Evans & Fung (1972) measured erythrocyte shape (no third-party file)
  { file: '/models/lab/rbc.glb', title: 'Red blood cell (Evans–Fung geometry)', author: 'MGPL Diagnostics', source: 'https://doi.org/10.1016/0026-2862(72)90069-6', license: 'CC0 1.0' },
  { file: '/models/lab/wbc.glb', title: 'White blood cell', author: 'Poly by Google', source: 'https://poly.pizza/m/aoZ4DjiO35h', license: CC_BY },
  { file: '/models/lab/tube.glb', title: 'Test Tube, red liquid', author: 'Jakob Hippe', source: 'https://poly.pizza/m/cXYIYXO9mVP', license: CC_BY },
  { file: '/models/lab/microscope.glb', title: 'Omax compound microscope', author: '3Donimus', source: 'https://poly.pizza/m/dcuaH6bEkwn', license: CC_BY },
  { file: '/models/lab/syringe.glb', title: 'Syringe', author: 'J-Toastie', source: 'https://poly.pizza/m/MURJ8NK4N9', license: CC_BY },
  { file: '/models/lab/flask.glb', title: 'Flask, red Liquid', author: 'Jakob Hippe', source: 'https://poly.pizza/m/2bzNXmBoUqD', license: CC_BY },
  { file: '/models/lab/rack.glb', title: 'Lab Equipment', author: 'matt bower', source: 'https://poly.pizza/m/fSWYfMERNak', license: CC_BY },
  { file: '/models/lab/molecule.glb', title: 'DNA Molecule', author: 'Anonymous', source: 'https://poly.pizza/m/a4pekMRs78t', license: CC_BY },
  { file: '/models/lab/capsule.glb', title: 'Pill', author: 'Poly by Google', source: 'https://poly.pizza/m/3jgxGDHuIwh', license: CC_BY },
  { file: '/models/lab/pill-a.glb', title: 'Pill', author: 'Poly by Google', source: 'https://poly.pizza/m/2_WoeCdMxYH', license: CC_BY },
  { file: '/models/lab/pill-b.glb', title: 'Pill', author: 'Poly by Google', source: 'https://poly.pizza/m/9v2OSNjwUNw', license: CC_BY },
  { file: '/models/human.glb', title: '3D Male Base Mesh', author: 'orange-juice-games', source: 'https://github.com/BoQsc/Godot-Male-Base-Mesh', license: 'CC0 1.0' },
];
