import { forwardRef, useImperativeHandle, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import HourlyForecastCard from "./card";
import CustomScrollbars from "../custom-scrollbars";
import { FORECAST_ITEM_GAP, FORECAST_ITEM_WIDTH } from "./constants";
import {
  HourlyForecastHandler,
  HourlyForecastItemProps,
  HourlyForecastProps,
} from "./types";

const HourlyForecast = forwardRef<HourlyForecastHandler, HourlyForecastProps>(
  ({ items, onScrollFrame }: any, ref: any) => {
    const CustomScrollbarsRef = useRef<any>(null);
    const itemContainerRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      scrollToDate: (date: string) => {
        const idx = Object.values(items)
          .flat()
          .map(({ formattedDay }: any) => formattedDay)
          .indexOf(date);
        CustomScrollbarsRef?.current?.scrollToPosition(
          idx * (FORECAST_ITEM_WIDTH + FORECAST_ITEM_GAP),
          0
        );
      },
      getDayOfWeekAtItemIdx: (idx: number) => {
        const focusedEl =
          itemContainerRef.current.querySelectorAll("[data-start-time]")[idx];
        return focusedEl.dataset.startTime;
      },
    }));

    return (
      <CustomScrollbars onScrollFrame={onScrollFrame} ref={CustomScrollbarsRef}>
        <Flex
          gap={`${FORECAST_ITEM_GAP}px`}
          ref={itemContainerRef}
          paddingBottom="10px"
        >
          {items.map((item: HourlyForecastItemProps, idx: number) => {
            const {
              startTime,
              temperature,
              temperatureUnit,
              windDirection,
              temperatureChange,
              windSpeedValue,
              windSpeedUnit,
              iconLarge,
              shortForecast,
            } = item;

            return (
              <HourlyForecastCard
                key={idx}
                startTime={startTime}
                temperature={temperature}
                temperatureUnit={temperatureUnit}
                windDirection={windDirection}
                temperatureChange={temperatureChange}
                windSpeedValue={windSpeedValue}
                windSpeedUnit={windSpeedUnit}
                iconLarge={iconLarge}
                shortForecast={shortForecast}
              />
            );
          })}
        </Flex>
      </CustomScrollbars>
    );
  }
);

export default HourlyForecast;
