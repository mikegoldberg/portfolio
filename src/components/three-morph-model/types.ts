export type ThreeMorphModelProps = {
  width: number;
  height: number;
  mouthMorph: Array<number>;
  leftEyeMorph: Array<number>;
  rightEyeMorph: Array<number>;
  headRotation: Array<number>;
  headPosition: Array<number>;
  hide: boolean;
};

export type SceneProps = {
  mouthMorph: Array<number>;
  leftEyeMorph: Array<number>;
  rightEyeMorph: Array<number>;
  headRotation: Array<number>;
  headPosition: Array<number>;
};
