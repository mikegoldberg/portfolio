import { Flex, Button } from "@chakra-ui/react";
import { getDayOfWeek } from "../../helpers";
import { DayOfWeekSelectionProps } from "./types";
import * as TEST_DRIVERS from "./__test__/drivers";

export const ACTIVE_OPACITY_VALUE = "1";
export const INACTIVE_OPACITY_VALUE = "0.4";
export const INACTIVE_OPACITY_HOVER_VALUE = "0.8";

const DayOfWeekSelection = ({
  dates,
  activeDayOfWeek,
  onDaySelected,
}: DayOfWeekSelectionProps) => {
  return (
    <Flex gap="10px" margin="15px 0">
      {dates.map((date: string) => {
        const dayOfWeek = getDayOfWeek(date);
        const isActive = dayOfWeek === activeDayOfWeek;

        return (
          <Button
            flex="1"
            key={date}
            padding="15px"
            textAlign={"center"}
            backgroundColor={"brand.blue"}
            opacity={isActive ? ACTIVE_OPACITY_VALUE : INACTIVE_OPACITY_VALUE}
            color={"#fff"}
            _hover={{
              background: "brand.blue",
              opacity: isActive
                ? ACTIVE_OPACITY_VALUE
                : INACTIVE_OPACITY_HOVER_VALUE,
            }}
            _active={{
              backgroundColor: "brand.blue",
              opacity: isActive
                ? ACTIVE_OPACITY_VALUE
                : INACTIVE_OPACITY_HOVER_VALUE,
            }}
            data-date={date}
            onClick={(e) => {
              const date = e.currentTarget.dataset.date || "";
              onDaySelected(date);
            }}
            data-testid={TEST_DRIVERS.DAY_OF_WEEK}
          >
            {dayOfWeek}
          </Button>
        );
      })}
    </Flex>
  );
};

export default DayOfWeekSelection;
