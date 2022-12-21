export default function getDayOfWeek(date: string) {
  const day = new Date(date).getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return dayNames[day];
}
