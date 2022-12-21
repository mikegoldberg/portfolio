export default function formatDate(date: Date) {
  const [month, day, year] = date.toLocaleDateString().split("/");

  return [year, month, day].join("-");
}
