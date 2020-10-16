
/**
 * Check the dimensions of the given element
 * @param  {String}   selector         Element selector
 * @param  {String}   falseCase    Whether to check if the dimensions match or
 *                                 not
 * @param  {String}   expectedSize Expected size
 * @param  {String}   dimension    Dimension to check (broad or tall)
 */
const checkDimension = (selector, falseCase, expectedSize, dimension) => {
  const elementSize = $(selector).getSize()
  const intExpectedSize = parseInt(expectedSize, 10)
  let originalSize = elementSize.height
  let label = 'height'

  if (dimension === 'broad') {
    originalSize = elementSize.width
    label = 'width'
  }

  falseCase
    ? expect(originalSize).not.toBe(
        intExpectedSize,
        "Element \""
          .concat(selector, "\" should not have a ")
          .concat(label, " of ") + ""
          .concat(intExpectedSize, "px")
      )
    : expect(originalSize).toBe(
        intExpectedSize,
        "Element \""
          .concat(selector, "\" should have a ")
          .concat(label, " of ") + ""
          .concat(intExpectedSize, "px, but is ")
          .concat(originalSize, "px")
      )

}

module.exports = {
  checkDimension
}