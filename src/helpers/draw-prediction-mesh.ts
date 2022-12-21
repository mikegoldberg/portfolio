import { Face, Keypoint } from "@tensorflow-models/face-landmarks-detection";

const KEYPOINT_COLOR = "rgba(0, 255, 0, 1)";
const PREDICTION_POINT_SIZE = 3;

export default function drawPredicitionMesh(
  ctx: CanvasRenderingContext2D,
  prediction: Face
) {
  prediction.keypoints.forEach((item: Keypoint) => {
    const x = item.x;
    const y = item.y;

    ctx.fillRect(
      x - PREDICTION_POINT_SIZE / 2,
      y - PREDICTION_POINT_SIZE / 2,
      PREDICTION_POINT_SIZE,
      PREDICTION_POINT_SIZE
    );
    ctx.fillStyle = KEYPOINT_COLOR;
  });
}
