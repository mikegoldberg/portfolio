import { HStack, Text } from "@chakra-ui/react";
import { TemperatureProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

const Temperature = ({ temp, unit }: TemperatureProps) => {
  return (
    <HStack
      alignItems="flex-start"
      fontWeight={"500"}
      width="100%"
      justifyContent={"flex-end"}
    >
      <Text
        fontSize="5xl"
        lineHeight={"50px"}
        data-testid={TEST_DRIVERS.TEMPERATURE}
      >
        {temp}
        {"\u00B0"}
      </Text>
      <Text
        position="relative"
        fontSize="xl"
        data-testid={TEST_DRIVERS.TEMPERATURE_UNIT}
      >
        {unit}
      </Text>
    </HStack>
  );
};

export default Temperature;
