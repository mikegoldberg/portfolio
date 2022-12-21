import {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Box, Slider, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { MdGraphicEq } from "react-icons/md";
import { CustomScrollbarsProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const CustomScrollbars = forwardRef(
  ({ onScrollFrame, children }: CustomScrollbarsProps, ref: Ref<any>) => {
    const [sliderValue, setSliderValue] = useState(0);
    const content = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      scrollToPosition: (x: number, y: number) => {
        if (content.current) {
          content.current.scrollTo(x, y);
        }
      },
    }));

    const handleChange = (value: number) => {
      setSliderValue(value);

      if (content.current) {
        content.current.scrollTo(
          ((content.current.scrollWidth - content.current.offsetWidth) / 100) *
            value,
          0
        );
      }
    };

    const onScroll = useCallback(() => {
      if (content.current && slider.current) {
        const progress = Math.round(
          (content.current.scrollLeft /
            (content.current.scrollWidth - content.current.offsetWidth)) *
            100
        );
        setSliderValue(progress);
        onScrollFrame(content.current.scrollLeft);
      }
    }, [onScrollFrame]);

    return (
      <Box>
        <Box
          overflow="auto"
          ref={content}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          onScroll={onScroll}
        >
          <Box data-testid={TEST_DRIVERS.CONTENT}>{children}</Box>
        </Box>
        <Box padding="0 10px">
          <Slider
            aria-label="slider-ex-4"
            defaultValue={30}
            value={sliderValue}
            onChange={handleChange}
            ref={slider}
          >
            <SliderTrack bg="brand.blue" />
            <SliderThumb boxSize={6}>
              <Box color="brand.blue" as={MdGraphicEq} />
            </SliderThumb>
          </Slider>
        </Box>
      </Box>
    );
  }
);

export default CustomScrollbars;
