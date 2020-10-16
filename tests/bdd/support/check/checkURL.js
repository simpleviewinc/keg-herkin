
/**
 * Check the URL of the given browser window
 * @param  {String}   falseCase   Whether to check if the URL matches the
 *                                expected value or not
 * @param  {String}   expectedUrl The expected URL to check against
 */
const checkURL = (falseCase, expectedUrl) => {
  const currentUrl = browser.getUrl()

  if (falseCase) {
    expect(currentUrl).not.toEqual(expectedUrl, "expected url not to be \"".concat(currentUrl, "\""))
  }
  else {
    expect(currentUrl).toEqual(expectedUrl, "expected url to be \"".concat(expectedUrl, "\" but found ") + "\"".concat(currentUrl, "\""))
  }
}

module.exports = {
  checkURL
}