export interface PlaneConfig {
  id: string;
  name: string;
  modelUrl: string;
  /** Extra heading rotation (radians) to point the model nose-forward. */
  headingOffset: number;
}

export const planes: PlaneConfig[] = [
  {
    id: "f22",
    name: "F-22 Raptor",
    modelUrl: "/models/lockheed_martin_f-22_raptor.glb",
    headingOffset: Math.PI,
  },
  {
    id: "f35",
    name: "F-35 Lightning II",
    modelUrl: "/models/f-35a_lightning_ii.glb",
    headingOffset: -Math.PI / 2,
  },
];
