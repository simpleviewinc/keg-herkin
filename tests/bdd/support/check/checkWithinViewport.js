
/**
 * Check if the given element is visible inside the current viewport
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the element is visible
 *                              within the current viewport or not
 */
const checkWithinViewport = (selector, falseCase) => {
  /**
   * The state of visibility of the given element inside the viewport
   * @type {Boolean}
   */
  var isDisplayed = $(selector).isDisplayedInViewport();

  if (falseCase) {
    expect(isDisplayed).not.toEqual(true, "Expected element \"".concat(selector, "\" to be outside the viewport"));
  } else {
    expect(isDisplayed).toEqual(true, "Expected element \"".concat(selector, "\" to be inside the viewport"));
  }
};

module.exports = {
  checkWithinViewport
}