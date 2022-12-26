import { useState } from "react";
import axios from "axios";
import { useEffectOnce } from "usehooks-ts";
import { formatDay, parseWindSpeed } from "../helpers";

export interface HourForecast {
  windSpeedValue: number;
  windSpeedUnit: string;
  iconLarge: string;
  formattedDay: string;
  temperatureChange: string;
}

export interface WeatherByDay {
  [name: string]: Array<HourForecast>;
}

export interface HourForecastProps {
  startTime: Date;
  temperature: number;
  icon: string;
  windSpeed: string;
}

const WEATHER_ENDPOINT = "https://webkitstudio.com/services/weather.php";
const MAX_DAYS_FORECAST = 5;

const getWeatherByDay = (forecastHourly: Array<HourForecastProps>) => {
  const weatherByDay: WeatherByDay = {};

  forecastHourly.forEach((hourForecast: HourForecastProps, idx: number) => {
    const { startTime, temperature, icon, windSpeed } = hourForecast;
    const { windSpeedValue, windSpeedUnit } = parseWindSpeed(windSpeed);
    const date = new Date(startTime);
    const day = formatDay(date);

    if (date.getTime() < Date.now()) {
      return;
    }

    if (
      weatherByDay.hasOwnProperty(day) === false &&
      Object.keys(weatherByDay).length < MAX_DAYS_FORECAST &&
      idx > 0
    ) {
      weatherByDay[day] = [];
    }

    if (weatherByDay.hasOwnProperty(day) && idx > 0) {
      const forecast: HourForecast = {
        ...hourForecast,
        windSpeedValue,
        windSpeedUnit,
        iconLarge: icon.replace("small", "large"),
        formattedDay: formatDay(startTime),
        temperatureChange:
          idx === 0
            ? "N/A"
            : String(temperature - forecastHourly[idx - 1].temperature),
      };

      weatherByDay[day].push(forecast);
    }
  });

  return weatherByDay;
};

const useWeather = () => {
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [weatherByDay, setWeatherByDay] = useState({});

  useEffectOnce(() => {
    fetchWeather();
  });

  const fetchWeather = async (name?: string) => {
    const queryParams =
      name && name.length > 0 ? `?city=${encodeURIComponent(name)}` : "";
    const cityForecast = await axios
      .get(`${WEATHER_ENDPOINT}${queryParams}`)
      .catch(() => setError("Error getting weather."));

    if (cityForecast?.data.code !== 200) {
      setError(cityForecast?.data.message);
    }

    if (cityForecast?.data.code === 200) {
      const weatherByDay = getWeatherByDay(cityForecast?.data.forecast);

      setWeatherByDay(weatherByDay);
      setCity(cityForecast?.data.city);
      setError(null);
    }

    setLoaded(true);
  };

  return {
    city,
    weatherByDay,
    loaded,
    error,
    fetchWeather,
  };
};

export default useWeather;
