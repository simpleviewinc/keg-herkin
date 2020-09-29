
/**
 * Pause execution for a given number of milliseconds
 * @param  {String}   ms   Number of milliseconds to pause
 */
const pause = (ms) => {
  const intMs = parseInt(ms, 10)
  browser.pause(intMs)
}

module.exports = {
  pause
}