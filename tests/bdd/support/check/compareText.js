
/**
 * Compare the contents of two elements with each other
 * @param  {String}   selector1  Element selector for the first element
 * @param  {String}   falseCase Whether to check if the contents of both
 *                              elements match or not
 * @param  {String}   selector2  Element selector for the second element
 */
const compareText = (selector1, falseCase, selector2) => {
  const text1 = $(selector1).getText();
  const text2 = $(selector2).getText();

  falseCase
    ? expect(text1).not.toEqual(
        text2,
        "Expected text not to be \"".concat(text1, "\"")
      )
    : expect(text1).toEqual(
        text2,
        "Expected text to be \"".concat(text1, "\" but found \"").concat(text2, "\"")
      )
}

module.exports = {
  compareText
}