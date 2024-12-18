export default function formatTime(dateInput: Date, _timeZoneOffset: number) {
  const date = new Date(dateInput);
  const dayOfMonth = date.getDate();
  const month = date.toLocaleString("en", { month: "short" });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; 
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${month} ${dayOfMonth}, ${year} at ${hours}:${minutesStr} ${ampm}`;
}