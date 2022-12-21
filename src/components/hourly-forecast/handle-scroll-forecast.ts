import { getDayOfWeek } from "../../helpers";
import { FORECAST_ITEM_GAP, FORECAST_ITEM_WIDTH } from "./constants";
import { HourlyForecastHandler } from "./types";

function handleScrollForecast(
  value: number,
  hourlyForecast: HourlyForecastHandler,
  activeDayOfWeek: string,
  setActiveDayOfWeek: (dayOfWeek: string) => void,
  setScrollPosition: (position: number) => void
) {
  const scrollIdx = Math.round(
    value / (FORECAST_ITEM_WIDTH + FORECAST_ITEM_GAP)
  );
  setScrollPosition(scrollIdx);

  if (hourlyForecast) {
    const startTime = hourlyForecast.getDayOfWeekAtItemIdx(scrollIdx);
    const targetDayOfWeek = getDayOfWeek(startTime);

    if (activeDayOfWeek !== targetDayOfWeek) {
      setActiveDayOfWeek(targetDayOfWeek);
    }
  }
}

export default handleScrollForecast;
