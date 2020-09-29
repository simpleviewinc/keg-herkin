/**
 * Check if the given element is (not) visible
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Check for a visible or a hidden element
 */
const isDisplayed = (selector, falseCase) => {
  const displayed = $(selector).displayed()
  falseCase
    ? expect(displayed)
        .not.toEqual(true, "Expected element \"".concat(selector, "\" not to be displayed"))
    : expect(displayed)
        .toEqual(true, "Expected element \"".concat(selector, "\" to be displayed"))
}

module.exports = {
  isDisplayed
}