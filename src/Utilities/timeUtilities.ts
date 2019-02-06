export function getElapsedTime(duration: number): string {
  let seconds = Math.floor(duration / 1000);
  let minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hour = Math.floor(minute / 60);
  minute = minute % 60;
  hour = hour % 24;
  return `${hour}:${minute}:${seconds}`;
}