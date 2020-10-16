
/**
 * Check the title of the current browser window
 * @param  {Type}     falseCase     Whether to check if the title matches the
 *                                  expected value or not
 * @param  {Type}     expectedTitle The expected title
 */
var _default = function _default(falseCase, expectedTitle) {
  /**
   * The title of the current browser window
   * @type {String}
   */
  var title = browser.getTitle();

  if (falseCase) {
    expect(title).not.toEqual(expectedTitle, "Expected title not to be \"".concat(expectedTitle, "\""));
  } else {
    expect(title).toEqual(expectedTitle, "Expected title to be \"".concat(expectedTitle, "\" but found \"").concat(title, "\""));
  }
};

exports["default"] = _default;