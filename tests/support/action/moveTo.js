
/**
 * Move to the given selector with an optional offset on a X and Y position
 * @param  {String}   selector  Element selector
 * @param  {String}   x        X coordinate to move to
 * @param  {String}   y        Y coordinate to move to
 */
const moveTo = (selector, x, y) => {
  const intX = parseInt(x, 10) || undefined
  const intY = parseInt(y, 10) || undefined
  
  $(selector).moveTo(intX, intY)
}

module.exports = {
  moveTo
}