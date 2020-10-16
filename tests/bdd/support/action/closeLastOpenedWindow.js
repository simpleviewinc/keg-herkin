
/**
 * Close the last opened window
 * @param  {String}   obsolete Type of object to close (window or tab)
 */
const closeLastOpenedWindow = obsolete => {
  const lastWindowHandle = browser.getWindowHandles().slice(-1)[0]
  browser.closeWindow()
  browser.switchToWindow(lastWindowHandle)
}

module.exports = {
  closeLastOpenedWindow
}