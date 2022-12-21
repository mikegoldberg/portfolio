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

const ENDPOINT_LOCATION_BY_USER =
  "https://webkitstudio.com/services/ip-api.php";
const ENDPOINT_WEATHER_POINTS = "https://api.weather.gov/points";
const ENDPOINT_LOCATION_BY_NAME = "https://api.api-ninjas.com/v1/city";
const MAX_DAYS_FORECAST = 5;
const CODE_NINJAS_API = "CODE_NINJAS_API";

const useWeather = () => {
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [weatherByDay, setWeatherByDay] = useState({});

  useEffectOnce(() => {
    fetchWeatherByUserLocation();
  });

  const fetchWeatherByUserLocation = async () => {
    const locationRes = await axios
      .get(ENDPOINT_LOCATION_BY_USER)
      .catch(() => setError("Error finding user city info."));

    const { lat, lon, city } = locationRes?.data;
    const endpoint = await fetchForecastHourlyEndpoint(lat, lon);
    const forecastHourly = await fetchForecastHourly(endpoint);
    const weatherByDay = getWeatherByDay(forecastHourly);

    setWeatherByDay(weatherByDay);
    setCity(city);
    setLoaded(true);
  };

  const changeWeatherLocation = async (name: string) => {
    setError(null);
    const { lat, lon } = await fetchCityCoodinates(name);
    const endpoint = await fetchForecastHourlyEndpoint(lat, lon);
    const forecastHourly = await fetchForecastHourly(endpoint);
    const weatherByDay = getWeatherByDay(forecastHourly);

    setWeatherByDay(weatherByDay);
  };

  const fetchCityCoodinates = async (name: string) => {
    const cityResponse = await axios
      .get(`${ENDPOINT_LOCATION_BY_NAME}?name=${name}&country=US`, {
        headers: {
          "X-Api-Key": CODE_NINJAS_API,
        },
      })
      .catch(() => setError("Error finding city info."));
    const [{ latitude: lat, longitude: lon }] = cityResponse?.data;

    if (!lat || !lon) {
      setError("Error finding city coordinates.");
    }

    return { lat, lon };
  };

  const getWeatherByDay = (forecastHourly: Array<HourForecastProps>) => {
    const weatherByDay: WeatherByDay = {};

    forecastHourly.forEach((hourForecast: HourForecastProps, idx: number) => {
      const { startTime, temperature, icon, windSpeed } = hourForecast;
      const { windSpeedValue, windSpeedUnit } = parseWindSpeed(windSpeed);
      const date = new Date(startTime);
      const day = formatDay(date);

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

  const fetchForecastHourlyEndpoint = async (lat: number, lon: number) => {
    const pointsDataUrl = `${ENDPOINT_WEATHER_POINTS}/${lat},${lon}`;
    const pointResult = await axios
      .get(pointsDataUrl)
      .catch(() => setError("Error requesting data from service."));
    const { forecastHourly } = pointResult?.data.properties;

    return forecastHourly;
  };

  const fetchForecastHourly = async (endpoint: string) => {
    const forecastHourlyResponse = await axios
      .get(endpoint)
      .catch(() => setError("Error fetching forecast."));
    const forecastHourly = forecastHourlyResponse?.data.properties.periods;

    return forecastHourly;
  };

  return {
    city,
    weatherByDay,
    loaded,
    error,
    changeWeatherLocation,
  };
};

export default useWeather;
