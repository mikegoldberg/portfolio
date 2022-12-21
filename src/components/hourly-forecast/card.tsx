import { Box, Text, Flex } from "@chakra-ui/react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { formatAMPM, getDayOfWeek } from "../../helpers";
import { FORECAST_ITEM_WIDTH } from "./constants";
import Temperature from "./temperature";
import { HourlyForecastItemProps } from "./types";
import WindDirection from "./wind-direction";
import * as TEST_DRIVERS from "./__test__/drivers";

const HourlyForecastItem = ({
  startTime,
  temperature,
  temperatureUnit,
  windDirection,
  temperatureChange,
  windSpeedValue,
  windSpeedUnit,
  iconLarge,
  shortForecast,
}: HourlyForecastItemProps) => {
  return (
    <Box data-start-time={startTime} minWidth={`${FORECAST_ITEM_WIDTH}px`}>
      <Box
        width="100%"
        backgroundImage={iconLarge}
        backgroundSize={"cover"}
        color="#fff"
        position="relative"
        height="140px"
        data-testid={TEST_DRIVERS.ICON_LARGE}
      >
        <Flex
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          position="relative"
          padding="10px"
          _before={{
            content: "' '",
            background: "rgba(0, 0, 0, 0.3)",
            width: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
          }}
        >
          <Text position="relative" data-testid={TEST_DRIVERS.SHORT_FORECAST}>
            {shortForecast}
          </Text>
          <Flex
            position={"relative"}
            top="2px"
            data-testid={TEST_DRIVERS.TEMPERATURE_CHANGE}
          >
            <Text fontSize="14px" whiteSpace={"nowrap"}>
              {`${temperatureChange}\u00B0 ${
                temperatureChange === 0 ? "-" : ""
              }`}
            </Text>
            <Box padding="2px 0">
              {temperatureChange > 0 ? <MdArrowDropUp /> : null}
              {temperatureChange < 0 ? <MdArrowDropDown /> : null}
            </Box>
          </Flex>
        </Flex>
        <Flex
          textShadow="1px 1px 2px rgba(0, 0, 0, 0.6)"
          textAlign={"right"}
          width="100%"
          padding="10px"
          position={"absolute"}
          bottom="0"
          alignItems={"flex-end"}
        >
          <Text
            fontSize="25px"
            position="relative"
            top="3px"
            data-testid={TEST_DRIVERS.START_TIME}
          >
            {getDayOfWeek(startTime)}
          </Text>
          <Temperature temp={temperature} unit={temperatureUnit} />
        </Flex>
      </Box>
      <Flex
        fontSize="md"
        flexDirection={"row"}
        justifyContent="space-between"
        width="100%"
        padding="10px 15px"
        backgroundColor="brand.light"
        border="1px solid #bbb"
        borderTop="none"
        fontWeight="400"
      >
        <Text>{formatAMPM(new Date(startTime))}</Text>
        <WindDirection
          windDirection={windDirection}
          windSpeed={windSpeedValue}
          windSpeedUnit={windSpeedUnit}
        />
      </Flex>
    </Box>
  );
};

export default HourlyForecastItem;
