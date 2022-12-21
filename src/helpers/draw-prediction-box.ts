import { Face } from "@tensorflow-models/face-landmarks-detection";

const boxColor = "#f00";

export default function drawPredictionBox(
  ctx: CanvasRenderingContext2D,
  prediction: Face
) {
  const x = prediction.box.xMin;
  const y = prediction.box.yMin;
  const width = prediction.box.width;
  const height = prediction.box.height;

  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.strokeStyle = boxColor;
  ctx.stroke();
}
