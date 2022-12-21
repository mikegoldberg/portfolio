// @ts-nocheck
import { Suspense, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { SceneProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

export default function Scene({
  mouthMorph,
  leftEyeMorph,
  rightEyeMorph,
  headRotation,
  headPosition,
}: SceneProps) {
  const modelRef = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, `ar-demo-assets/alligator.glb`); // TOOD: make model name dynamic

  useEffect(() => {
    if (modelRef.current) {
      const alligator = modelRef.current.children
        .find(({ name }) => name === "alligator_armature")
        .children.find(({ name }) => name === "alligator");
      alligator.morphTargetInfluences = [mouthMorph];
      const rightEyelid = modelRef.current.children.find(
        ({ name }) => name === "right_eyelid"
      );
      const leftEyelid = modelRef.current.children.find(
        ({ name }) => name === "left_eyelid"
      );
      rightEyelid.morphTargetInfluences = [rightEyeMorph];
      leftEyelid.morphTargetInfluences = [leftEyeMorph];
    }
  }, [mouthMorph, leftEyeMorph, rightEyeMorph]);

  return (
    <>
      <directionalLight
        position={[-2, 12, 0]}
        color={"#ccccee"}
        intensity={0.3}
        castShadow
        shadowBias={1}
      />
      <group position={[0, 0, 0]} rotation={[-0.4, 0, 0]}>
        <Suspense fallback={null}>
          <primitive
            castShadow
            receiveShadow
            ref={modelRef}
            object={gltf.scene}
            position={headPosition}
            rotation={headRotation}
            color={"#ff0000"}
          />
        </Suspense>
      </group>
    </>
  );
}
