import { forwardRef, Ref } from "react";
import { PredictionCanvasProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const PredictionCanvas = forwardRef(
  (
    { hide = false, width, height }: PredictionCanvasProps,
    ref: Ref<HTMLCanvasElement>
  ) => {
    return (
      <canvas
        data-testid={TEST_DRIVERS.PREDICTION_CANVAS_CANVAS}
        ref={ref}
        style={{
          width,
          height,
          position: "absolute",
          zIndex: 100,
          display: hide ? "none" : "block",
        }}
      />
    );
  }
);

export default PredictionCanvas;
