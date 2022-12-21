import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { useEffect, useRef, useState } from "react";
import { Box, Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import { useFaceDetection } from "../../hooks";
import { drawPredictionBox, drawPredicitionMesh } from "../../helpers";
import { ThreeMorphModel, PredictionCanvas, Webcam } from "../../components";
import ReactWebcam from "react-webcam";
import { MdInfoOutline } from "react-icons/md";

const ARFaceMask = () => {
  const webcam = useRef<ReactWebcam>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [hidePredictionCanvas, setHidePredictionCanvas] = useState(false);
  const [hideThreeMorphModel, setHideThreeMorphModel] = useState(false);
  const [hideWebcam, setHideWebcam] = useState(false);

  const {
    prediction,
    mouthMorph,
    leftEyeMorph,
    rightEyeMorph,
    headRotation,
    headPosition,
  } = useFaceDetection({ canvas, webcam });

  useEffect(() => {
    if (webcam.current && webcam.current.video) {
      const { width, height } = webcam.current.video?.getBoundingClientRect();
      setViewportWidth(width);
      setViewportHeight(height);
    }
  }, [webcam]);

  useEffect(() => {
    if (
      canvas.current &&
      webcam.current &&
      webcam.current.video &&
      prediction
    ) {
      const { width, height } = webcam.current.video?.getBoundingClientRect();
      setViewportWidth(width);
      setViewportHeight(height);

      const webcamCurrent = webcam.current as any;
      const video = webcamCurrent.video;
      const { videoWidth, videoHeight } = video;
      const ctx = canvas.current.getContext("2d");

      canvas.current.width = videoWidth;
      canvas.current.height = videoHeight;

      if (ctx) {
        drawPredictionBox(ctx, prediction);
        drawPredicitionMesh(ctx, prediction);
      }
    }
  }, [prediction]);

  return (
    <Box paddingBottom="20px">
      <Flex paddingBottom="10px" gap="5px" alignItems={"start"}>
        <Box padding="3px" fontSize="2xl">
          <MdInfoOutline />
        </Box>
        <Text>
          {
            "Tensorflow generates face landmarks from a webcam input. The keypoints are drawn onto a canvas. The 3d model was created in Blender and is rendered with Three.js. The eye lids and mouth on the mesh are transformed using morph targets."
          }
        </Text>
      </Flex>
      <Box position="relative" background="#000">
        <PredictionCanvas
          width={viewportWidth}
          height={viewportHeight}
          ref={canvas}
          hide={hidePredictionCanvas}
        />
        <Webcam ref={webcam} hide={hideWebcam} />
        <ThreeMorphModel
          width={viewportWidth}
          height={viewportHeight}
          mouthMorph={mouthMorph}
          leftEyeMorph={leftEyeMorph}
          rightEyeMorph={rightEyeMorph}
          headRotation={headRotation}
          headPosition={headPosition}
          hide={hideThreeMorphModel}
        />
        <Stack
          spacing={[1, 7]}
          direction={"row"}
          position="absolute"
          top="0"
          right={"0"}
          background={"#fff"}
          margin="4px"
          borderRadius={"4px"}
          zIndex={400}
          padding="5px 20px"
        >
          <Checkbox
            size="lg"
            variant={"demo"}
            defaultChecked={!hideWebcam}
            onChange={(e) => setHideWebcam(!e.target.checked)}
          >
            {"Webcam"}
          </Checkbox>
          <Checkbox
            size="lg"
            variant={"demo"}
            defaultChecked={!hidePredictionCanvas}
            onChange={(e) => setHidePredictionCanvas(!e.target.checked)}
          >
            {"Landmarks"}
          </Checkbox>
          <Checkbox
            size="lg"
            variant={"demo"}
            defaultChecked={!hideThreeMorphModel}
            onChange={(e) => setHideThreeMorphModel(!e.target.checked)}
          >
            {"3d Model"}
          </Checkbox>
        </Stack>
      </Box>
    </Box>
  );
};

export default ARFaceMask;
