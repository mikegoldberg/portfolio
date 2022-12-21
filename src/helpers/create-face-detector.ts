import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

const FACE_DETECTION_SOLUTION_PATH =
  "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh";

function createFaceDetector() {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detectorConfig = {
    runtime: "mediapipe",
    solutionPath: FACE_DETECTION_SOLUTION_PATH,
  };

  const promise = new Promise((resolve) => {
    faceLandmarksDetection
      .createDetector(
        model,
        // @ts-ignore
        detectorConfig
      )
      .then(resolve);
  });

  return promise;
}

export default createFaceDetector;
