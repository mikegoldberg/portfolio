import { useState } from "react";
import { useInterval, useTimeout } from "usehooks-ts";
import "@mediapipe/face_mesh";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { createFaceDetector, detectFaceOrientation } from "../helpers";

type UseFaceDetectionProps = {
  canvas?: any;
  webcam?: any;
};

const useFaceDetection = ({ webcam }: UseFaceDetectionProps) => {
  const [faceDetector, setFaceDetector] = useState<any>(null);
  const [headRotation, setHeadRotation] = useState([0, 0, 0]);
  const [headPosition, setHeadPosition] = useState<Array<number>>([0, 0, 0]);
  const [mouthMorph, setMouthMorph] = useState([0]);
  const [leftEyeMorph, setLeftEyeMorph] = useState([0]);
  const [rightEyeMorph, setRightEyeMorph] = useState([0]);
  const [prediction, setPrediction] = useState(null);

  useTimeout(() => createFaceDetector().then(setFaceDetector), 10);

  useInterval(async () => {
    const readyState = webcam?.current?.video?.readyState;

    if (faceDetector && readyState === 4) {
      const detection = await detectFaceOrientation({
        detector: faceDetector,
        video: webcam.current.video,
      });

      if (detection) {
        const {
          prediction,
          headRotation,
          headPosition,
          mouthMorph,
          leftEyeMorph,
          rightEyeMorph,
        } = detection as any;

        setHeadRotation(headRotation);
        setHeadPosition(headPosition);
        setMouthMorph(mouthMorph);
        setLeftEyeMorph(leftEyeMorph);
        setRightEyeMorph(rightEyeMorph);
        setPrediction(prediction);
      }
    }
  }, 40);

  return {
    prediction,
    mouthMorph,
    leftEyeMorph,
    rightEyeMorph,
    headRotation,
    headPosition,
  };
};

export default useFaceDetection;
