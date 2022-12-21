import ARFaceMask from "../ar-face-mask";
import AstronomyPictureOfTheDay from "../astronomy-picture-of-the-day";
import WeatherForecast from "../weather-forecast";
import WebRtcCanvasExample from "../webrtc-canvas-example";

const POSTER_BASE_URL = "/poster-images";
const demoComponents = [
  {
    title: "Weather Hourly Forecast",
    view: WeatherForecast,
    poster: `${POSTER_BASE_URL}/weather.jpg`,
    source:
      "https://github.com/mikegoldberg/portfolio/blob/main/src/views/weather-forecast/index.tsx",
  },
  {
    title: "NASA Picture of The Day",
    view: AstronomyPictureOfTheDay,
    poster: `${POSTER_BASE_URL}/apod.jpg`,
    source:
      "https://github.com/mikegoldberg/portfolio/blob/main/src/views/astronomy-picture-of-the-day/index.tsx",
  },
  {
    title: "WebRTC Canvas",
    view: WebRtcCanvasExample,
    poster: `${POSTER_BASE_URL}/webrtc.jpg`,
    source:
      "https://github.com/mikegoldberg/portfolio/blob/main/src/views/webrtc-canvas-example/index.tsx",
  },
  {
    title: "AR Tensorflow + Three.js",
    view: ARFaceMask,
    poster: `${POSTER_BASE_URL}/ar.jpg`,
    source:
      "https://github.com/mikegoldberg/portfolio/blob/main/src/views/ar-face-mask/index.tsx",
  },
];

export default demoComponents;
