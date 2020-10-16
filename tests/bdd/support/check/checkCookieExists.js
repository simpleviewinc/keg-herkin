
/**
 * Check if a cookie with the given name exists
 * @param  {[type]}   name      The name of the cookie
 * @param  {[type]}   falseCase Whether or not to check if the cookie exists or
 *                              not
 */
const checkCookieExists = (name, falseCase) => {
  const cookie = browser.getCookies(name)

  falseCase
    ? expect(cookie).toHaveLength(
        0,
        "Expected cookie \"".concat(name, "\" not to exists but it does")
      )
    : expect(cookie).not.toHaveLength(
        0,
        "Expected cookie \"".concat(name, "\" to exists but it does not")
      )
}

module.exports = {
  checkCookieExists
}