
/**
 * Check the title of the current browser window contains expected text/title
 * @param  {Type}     falseCase     Whether to check if the title contains the
 *                                  expected value or not
 * @param  {Type}     expectedTitle The expected title
 */
var _default = function _default(falseCase, expectedTitle) {
  /**
   * The actual title of the current browser window
   * @type {String}
   */
  var title = browser.getTitle();

  if (falseCase) {
    expect(title).not.toContain(expectedTitle, "Expected title not to contain \"".concat(expectedTitle, "\""));
  } else {
    expect(title).toContain(expectedTitle, "Expected title to contain \"".concat(expectedTitle, "\" but found \"").concat(title, "\""));
  }
};

exports["default"] = _default;