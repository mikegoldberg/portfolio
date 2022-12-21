import { Vector2 } from "./types";

const drawCanvas = (
  context: CanvasRenderingContext2D,
  event: string,
  params: Vector2
) => {
  if (event === "beginPath") {
    context?.beginPath();
  }
  if (event === "moveTo") {
    const { x, y } = params;
    context?.moveTo(x, y);
  }
  if (event === "lineTo") {
    const { x, y } = params;
    context?.lineTo(x, y);
  }
  if (event === "stroke") {
    context?.stroke();
  }
  if (event === "closePath") {
    context?.closePath();
  }
};

export default drawCanvas;
