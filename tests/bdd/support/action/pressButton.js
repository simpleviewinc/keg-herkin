
/**
 * Perform a key press
 * @param  {String}   key  The key to press
 */
const pressButton = (key) => {
  browser.keys(key)
}

module.exports = {
  pressButton
}