import { Flex, Text } from "@chakra-ui/react";
import { MdNorth } from "react-icons/md";
import { WIND_DIRECTION_ANGLE } from "./constants";
import { WindDirectionProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const WindDirection = ({
  windDirection,
  windSpeed,
  windSpeedUnit,
}: WindDirectionProps) => {
  return (
    <Flex alignItems={"center"} gap="2px">
      <MdNorth
        transform={`rotate(${WIND_DIRECTION_ANGLE[windDirection]})`}
        data-testid={TEST_DRIVERS.WIND_DIRECTION}
      />
      <Text data-testid={TEST_DRIVERS.WIND_SPEED}>
        {windSpeed} {windSpeedUnit}
      </Text>
    </Flex>
  );
};

export default WindDirection;
