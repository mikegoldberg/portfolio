import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Scene from "./scene";
import { ThreeMorphModelProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const ThreeMorphModel = ({
  width,
  height,
  mouthMorph,
  leftEyeMorph,
  rightEyeMorph,
  headRotation,
  headPosition,
  hide = false,
}: ThreeMorphModelProps) => {
  return hide ? null : (
    <Canvas
      data-testid={TEST_DRIVERS.CANVAS}
      style={{
        width,
        height,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 400,
      }}
      camera={{ position: [0, 0, 12], fov: 15 }}
      shadows
    >
      <Environment files="ar-demo-assets/lauter_waterfall_1k.hdr" />
      <Scene
        mouthMorph={mouthMorph}
        leftEyeMorph={leftEyeMorph}
        rightEyeMorph={rightEyeMorph}
        headRotation={headRotation}
        headPosition={headPosition}
      />
    </Canvas>
  );
};

export default ThreeMorphModel;
