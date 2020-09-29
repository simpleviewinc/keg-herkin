
/**
 * Focus the last opened window
 * @param  {String}   obsolete Type of object to focus to (window or tab)
 */
const focusLastOpenedWindow = obsolete => {
  const lastWindowHandle = browser.getWindowHandles().slice(-1)[0]
  browser.switchToWindow(lastWindowHandle)
};

module.exports = {
  focusLastOpenedWindow
}