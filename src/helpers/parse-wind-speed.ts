export default function parseWindSpeed(windSpeed: string) {
  const windSpeedValueString = String(windSpeed.match(/[0-9]*[0-9]/g));
  const windSpeedUnit = String(windSpeed.match(/[a-z]*[a-z]/g));

  return {
    windSpeedValue: parseInt(windSpeedValueString, 10),
    windSpeedUnit,
  };
}
