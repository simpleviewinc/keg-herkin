
/**
 * Check the content of a cookie against a given value
 * @param  {String}   name          The name of the cookie
 * @param  {String}   falseCase     Whether or not to check if the value matches
 *                                  or not
 * @param  {String}   expectedValue The value to check against
 */
const checkCookieContent = (name, falseCase, expectedValue) => {
  const cookie = browser.getCookies(name)[0]
  expect(cookie.name).toBe(name, "no cookie found with the name \"".concat(name, "\""))

  falseCase
    ? expect(cookie.value).not.toBe(
        expectedValue,
        "expected cookie \""
          .concat(name, "\" not to have value \"")
          .concat(expectedValue, "\"")
      )
    : expect(cookie.value).toBe(
        expectedValue,
        "expected cookie \""
          .concat(name, "\" to have value \"")
          .concat(expectedValue, "\"") + " but got \""
          .concat(cookie.value, "\"")
      )

}

module.exports = {
  checkCookieContent
}