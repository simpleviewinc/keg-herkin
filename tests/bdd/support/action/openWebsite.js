"use strict";

/**
 * Open the given URL
 * @param  {String} type Type of navigation (getUrl or site)
 * @param  {String} page The URL to navigate to
 */
const openWebsite = (type, page) => {
  const url = type === 'url'
    ? page
    : browser.options.baseUrl + page

  browser.url(url)
}

module.exports = {
  openWebsite
}