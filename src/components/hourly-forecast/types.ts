export type HourlyForecastItemProps = {
  startTime: string;
  temperature: string;
  temperatureUnit: string;
  windDirection: string;
  temperatureChange: number;
  windSpeedValue: string;
  windSpeedUnit: string;
  iconLarge: string;
  shortForecast: string;
};

export interface HourlyForecastProps {
  items: Array<HourlyForecastItemProps> | unknown[];
  onScrollFrame: (position: number) => void;
}

export interface HourlyForecastHandler {
  scrollToDate: (date: string) => void;
  getDayOfWeekAtItemIdx: (idx: number) => string;
}

export interface TemperatureProps {
  temp: string;
  unit: string;
}

export interface WindDirectionProps {
  windDirection: string;
  windSpeed: string;
  windSpeedUnit: string;
}
