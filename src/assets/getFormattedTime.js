export default function getFormattedTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;

  if (minutes < 10 && seconds < 10) {
    return `0${minutes}:0${seconds}`;
  } else if (minutes < 10 && seconds > 10) {
    return `0${minutes}:${seconds}`;
  } else if (minutes >= 10 && seconds < 10) {
    return `${minutes}:0${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}
