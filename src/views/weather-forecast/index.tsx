import { useRef, useState } from "react";
import { Box, Text, Flex, Spinner } from "@chakra-ui/react";
import { useWeather } from "../../hooks";
import { TbAlertTriangle } from "react-icons/tb";
import {
  WeatherChart,
  HourlyForecast,
  DayOfWeekSelection,
  CitySelection,
} from "../../components";
import { useActiveDayOfWeek } from "../../hooks";
import handleScrollForecast from "../../components/hourly-forecast/handle-scroll-forecast";
import { HourlyForecastHandler } from "../../components/hourly-forecast/types";

const WeatherForecast = () => {
  const hourlyForecastRef = useRef<HourlyForecastHandler>(null);
  const { weatherByDay, city, loaded, error, fetchWeather } = useWeather();
  const { activeDayOfWeek, setActiveDayOfWeek } = useActiveDayOfWeek({
    weatherByDay,
  });
  const [scrollPosition, setScrollPosition] = useState(0);

  const onDaySelectedHandler = (date: string) => {
    if (hourlyForecastRef.current) {
      hourlyForecastRef.current.scrollToDate(date);
    }
  };

  return loaded === false ? (
    <Flex minHeight="560px" alignItems={"center"} justifyContent="center">
      <Spinner size="xl" />
    </Flex>
  ) : (
    <Box>
      <Flex alignItems={"center"} justifyContent="space-between">
        <CitySelection
          city={city}
          onSubmit={(name: string) => fetchWeather(name)}
        />
        {error ? (
          <Flex alignItems={"center"} gap="5px" color="red">
            <TbAlertTriangle />
            <Text fontWeight="400">{error}</Text>
          </Flex>
        ) : null}
      </Flex>
      <>
        <HourlyForecast
          onScrollFrame={(value: number) => {
            if (hourlyForecastRef.current) {
              handleScrollForecast(
                value,
                hourlyForecastRef.current,
                activeDayOfWeek,
                setActiveDayOfWeek,
                setScrollPosition
              );
            }
          }}
          items={Object.values(weatherByDay).flat()}
          ref={hourlyForecastRef}
        />
        <DayOfWeekSelection
          dates={Object.keys(weatherByDay)}
          activeDayOfWeek={activeDayOfWeek}
          onDaySelected={onDaySelectedHandler}
        />
        <Flex
          height={["460px", "460px", "240px"]}
          padding="20px 0"
          gap="20px"
          direction={["column", "column", "row"]}
        >
          <WeatherChart
            data={Object.values(weatherByDay).flat()}
            scrollPosition={scrollPosition}
            label={"Temperature (f)"}
            dataKey={"temperature"}
          />
          <WeatherChart
            data={Object.values(weatherByDay).flat()}
            scrollPosition={scrollPosition}
            label={"Wind Speed (mph)"}
            dataKey={"windSpeedValue"}
          />
        </Flex>
      </>
    </Box>
  );
};

export default WeatherForecast;
