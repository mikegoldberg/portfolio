import { Box, Text } from "@chakra-ui/react";
import { PointerEvent, useEffect, useRef, useState } from "react";
import usePeerJS, { CONNECTION_STATES } from "../../hooks/use-peerjs";
import { DrawPosition, OnDataProps, WebRtcCanvasProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";
import drawCanvas from "./draw-canvas";

export const HOST_LABEL = "Host";
export const CLIENT_LABEL = "Client";

const WebRtcCanvas = ({
  onOpen = () => {},
  isHost = false,
  hostId = null,
}: WebRtcCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawPosition, setDrawPosition] = useState<DrawPosition | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(200);
  const [canvasHeight, setCanvasHeight] = useState<number>(200);
  const { sendData, connectionState } = usePeerJS({
    onOpen,
    onData: (data: OnDataProps) => {
      const { event, params } = data;
      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          drawCanvas(context, event, params);
        }
      }
    },
    isHost,
    hostId,
  });

  useEffect(() => {
    if (containerRef.current) {
      setCanvasHeight(containerRef.current.getBoundingClientRect().height);
      setCanvasWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, [containerRef]);

  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (drawPosition !== null) {
      const canvas = e.currentTarget;
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;
      const context = canvas.getContext("2d");

      context?.lineTo(x, y);
      context?.stroke();

      sendData("lineTo", { x, y });
      sendData("stroke");
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;
    const context = canvas.getContext("2d");

    context?.beginPath();
    context?.moveTo(x, y);

    setDrawPosition({ x, y });
    sendData("beginPath");
    sendData("moveTo", { x, y });
  };

  const onPointerUp = (e: PointerEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const context = canvas?.getContext("2d");

    context?.closePath();

    sendData("closePath");
    setDrawPosition(null);
  };

  return (
    <Box
      border="1px solid #888"
      position="relative"
      width="100%"
      height="100%"
      ref={containerRef}
      fontSize="sm"
      color="#fff"
      userSelect={"none"}
    >
      <canvas
        id="peer-1"
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        width={canvasWidth}
        height={canvasHeight}
        data-testid={TEST_DRIVERS.CANVAS}
      />
      <Text
        padding="4px 8px"
        background={isHost ? "green" : "#aaa"}
        top={0}
        position="absolute"
        data-testid={TEST_DRIVERS.INSTANCE_LABEL}
      >
        {isHost ? HOST_LABEL : CLIENT_LABEL}
      </Text>
      <Text
        padding="4px 8px"
        whiteSpace={"nowrap"}
        top={0}
        right={0}
        position="absolute"
        background={"#888"}
        width="140px"
        data-testid={TEST_DRIVERS.CONNECTION_STATUS}
      >
        {`Status: ${CONNECTION_STATES[connectionState]}`}
      </Text>
    </Box>
  );
};

export default WebRtcCanvas;
