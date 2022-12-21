import { HourForecast } from "../../hooks/use-weather";

export interface WeatherChartProps {
  data: Array<HourForecast> | any;
  scrollPosition: number;
  dataKey: string;
  label: string;
}
