/**
 * Check the selected state of the given element
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the element is elected or
 *                              not
 */
const checkSelected = (selector, falseCase) => {
  const isSelected = $(selector).isSelected();
  falseCase
    ? expect(isSelected).not.toEqual(true, "\"".concat(selector, "\" should not be selected"))
    : expect(isSelected).toEqual(true, "\"".concat(selector, "\" should be selected"))
}

module.exports = {
  checkSelected
}