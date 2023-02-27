export default function generateTime(time1: Date) {
  const time = new Date(time1);
  return `${time.getUTCFullYear()}-${
    time.getUTCMonth() + 1
  }-${time.getUTCDate()}`;
}
