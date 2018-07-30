let seconds = 0
let minutes = 0
let hours = 0

const startWatch = () => {
  /* check if seconds is equal to 60 and add a +1 to minutes, and set seconds to 0 */
  if (seconds === 60) {
    seconds = 0;
    minutes = minutes + 1;
  }
  /* you use the javascript tenary operator to format how the minutes should look and add 0 to minutes if less than 10 */
  // mins = minutes < 10 ? `0${minutes}: ` : `${minutes}: `
  /* check if minutes is equal to 60 and add a +1 to hours set minutes to 0 */
  if ( minutes === 60 ) {
    minutes = 0
    hours = hours + 1
  }

  seconds++
  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`
  return `${hoursStr}:${minutesStr}:${secondsStr}`
}

const resetWatch = () => {
  seconds = 0
  minutes = 0
  hours = 0
}

export {
  startWatch,
  resetWatch
}
