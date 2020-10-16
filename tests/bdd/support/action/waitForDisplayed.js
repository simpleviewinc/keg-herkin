
/**
 * Wait for the given element to become visible
 * @param  {String}   selector      Element selector
 * @param  {String}   falseCase Whether or not to expect a visible or hidden
 *                              state
 *
 * @todo  merge with waitfor
 */
const waitForDisplayed = (selector, falseCase) => {
  const ms = 10000
  $(selector).waitForDisplayed(ms, !!falseCase)
};

module.exports = {
  waitForDisplayed
}