
/**
 * Check if the given string is in the URL path
 * @param  {String}   falseCase       Whether to check if the given string is in
 *                                    the URL path or not
 * @param  {String}   expectedUrlPart The string to check for
 */
const checkInURLPath = (falseCase, expectedUrlPart) => {
  const currentUrl = browser.getUrl()
  falseCase
    ? expect(currentUrl).not.toContain(
        expectedUrlPart,
        "Expected URL \""
          .concat(currentUrl, "\" not to contain ") + "\""
          .concat(expectedUrlPart, "\"")
      )
    :  expect(currentUrl).toContain(
        expectedUrlPart,
        "Expected URL \""
          .concat(currentUrl, "\" to contain \"")
          .concat(expectedUrlPart, "\"")
      )
}

module.exports = {
  checkInURLPath
}
