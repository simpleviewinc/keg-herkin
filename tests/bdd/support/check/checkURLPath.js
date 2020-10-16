
/**
 * Check if the current URL path matches the given path
 * @param  {String}   falseCase    Whether to check if the path matches the
 *                                 expected value or not
 * @param  {String}   expectedPath The expected path to match against
 */
const checkURLPath = (falseCase, expectedPath) => {
  var currentUrl = browser.getUrl().replace(/http(s?):\/\//, '')
  var domain = "".concat(currentUrl.split('/')[0])
  currentUrl = currentUrl.replace(domain, '')

  if (falseCase) {
    expect(currentUrl).not.toEqual(expectedPath, "expected path not to be \"".concat(currentUrl, "\""))
  }
  else {
    expect(currentUrl).toEqual(expectedPath, "expected path to be \"".concat(expectedPath, "\" but found ") + "\"".concat(currentUrl, "\""))
  }

}

module.exports = {
  checkURLPath
}