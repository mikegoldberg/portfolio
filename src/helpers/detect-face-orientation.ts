import { FaceLandmarksDetector } from "@tensorflow-models/face-landmarks-detection";
import calculateFaceAngle, { NamedVector3d } from "./calculate-face-angle";
import { calculate3dDistance, Vector3 } from "./calculate-vector-distance";

enum FACE_KEYPOINT_MAP {
  LIP_UPPER = 13,
  LIP_LOWER = 14,
  RIGHT_EYE_UPPER = 386,
  RIGHT_EYE_LOWER = 374,
  LEFT_EYE_UPPER = 159,
  LEFT_EYE_LOWER = 145,
}

type DetectFaceOrientation = {
  detector: FaceLandmarksDetector;
  video: HTMLVideoElement;
};

export default async function detectFaceOrientation({
  detector,
  video,
}: DetectFaceOrientation) {
  const options = {
    flipHorizontal: true,
  };
  const prediction = (await detector.estimateFaces(video, options)).at(0);

  if (typeof prediction === "undefined") {
    return;
  }

  const { keypoints } = prediction;
  const { pitch, yaw } = calculateFaceAngle(keypoints as Array<NamedVector3d>);
  const [
    lipUpper,
    lipLower,
    rightEyeUpper,
    rightEyeLower,
    leftEyeUpper,
    leftEyeLower,
  ] = [
    keypoints[FACE_KEYPOINT_MAP.LIP_UPPER],
    keypoints[FACE_KEYPOINT_MAP.LIP_LOWER],
    keypoints[FACE_KEYPOINT_MAP.RIGHT_EYE_UPPER],
    keypoints[FACE_KEYPOINT_MAP.RIGHT_EYE_LOWER],
    keypoints[FACE_KEYPOINT_MAP.LEFT_EYE_UPPER],
    keypoints[FACE_KEYPOINT_MAP.LEFT_EYE_LOWER],
  ];
  const mouthMorph =
    (Math.round(
      calculate3dDistance(lipLower as Vector3, lipUpper as Vector3) * 10
    ) /
      300) *
    0.8;
  const rightEyeMorph =
    Math.round(
      calculate3dDistance(rightEyeLower as Vector3, rightEyeUpper as Vector3) -
        6
    ) /
      3 -
    0.3;
  const leftEyeMorph =
    Math.round(
      calculate3dDistance(leftEyeLower as Vector3, leftEyeUpper as Vector3) - 6
    ) /
      3 -
    0.3;

  const { xMin, width, yMin, height } = prediction.box;
  const { height: webcamHeight, width: webcamWidth } =
    video.getBoundingClientRect();
  const xPosition = ((xMin + width / 2) / webcamWidth) * 2 - 1;
  const yPosition = ((yMin + height / 2) / webcamHeight) * -2 + 1;
  const headPosition = [xPosition, yPosition, 0];

  const headRotation = [pitch < 0 ? 0 : pitch, yaw < -0.5 ? -0.5 : yaw, 0];

  return {
    prediction,
    headRotation,
    headPosition,
    mouthMorph,
    leftEyeMorph,
    rightEyeMorph,
  };
}
