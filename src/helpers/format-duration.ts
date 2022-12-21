export default function formatDuration(duration: number) {
  const years = Math.floor(duration / 12);
  const months = duration % 12;
  const yearsText = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const monthsText = months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "";

  return `(${yearsText} ${monthsText})`;
}
