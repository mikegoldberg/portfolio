export default function formatAMPM(date: Date) {
  const hours = date.getHours();
  const ampm = hours >= 12 ? "pm" : "am";

  let hour = hours % 12;
  hour = hour === 0 ? 12 : hour; // the hour '0' should be '12'

  return hour + ampm;
}
