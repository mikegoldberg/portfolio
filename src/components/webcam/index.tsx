import { forwardRef } from "react";
import ReactWebcam from "react-webcam";
import { WebcamProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const Webcam = forwardRef(({ hide = false }: WebcamProps, ref: any) => {
  return (
    <ReactWebcam
      data-testid={TEST_DRIVERS.WEBCAM}
      audio={false}
      ref={ref}
      mirrored={true}
      width="100%"
      height="100%"
      style={{
        visibility: hide ? "hidden" : "visible",
        left: 0,
        top: 0,
      }}
    />
  );
});

export default Webcam;
