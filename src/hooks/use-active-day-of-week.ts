import { useEffect, useState } from "react";
import { getDayOfWeek } from "../helpers";
import { WeatherByDay } from "./use-weather";

interface UseActiveDayOfWeekProps {
  weatherByDay: Record<string, Array<WeatherByDay>>;
}

const useActiveDayOfWeek = ({ weatherByDay }: UseActiveDayOfWeekProps) => {
  const [activeDayOfWeek, setActiveDayOfWeek] = useState<string>("");

  useEffect(() => {
    const [date] = Object.keys(weatherByDay);
    const dayOfWeek = getDayOfWeek(date);

    setActiveDayOfWeek(dayOfWeek);
  }, [weatherByDay]);

  return { activeDayOfWeek, setActiveDayOfWeek };
};

export default useActiveDayOfWeek;
