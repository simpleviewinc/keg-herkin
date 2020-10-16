
/**
 * Delete a cookie
 * @param  {String}   name The name of the cookie to delete
 */
const deleteCookies = name => {
  browser.deleteCookies(name)
};

module.exports = {
  deleteCookies
}