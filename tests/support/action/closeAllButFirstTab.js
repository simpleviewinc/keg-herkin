
/**
 * Close all but the first tab
 * @param  {String}   obsolete Type of object to close (window or tab)
 */
const closeAllButFirstTab = (obsolete) => {
  const windowHandles = browser.getWindowHandles()

  windowHandles.reverse()
  windowHandles.forEach((handle, index) => {
    browser.switchToWindow(handle)
    if (index < windowHandles.length - 1) browser.closeWindow()
  })

}

module.exports = {
  closeAllButFirstTab
}
