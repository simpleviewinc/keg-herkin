
/**
 * Check if the given URL was opened in a new window
 * @param  {String}   expectedUrl The URL to check for
 */
const checkIsOpenedInNewWindow = (expectedUrl, type) => {

  const windowHandles = browser.getWindowHandles()
  expect(windowHandles).not.toHaveLength(1, 'A popup was not opened')
  const lastWindowHandle = windowHandles.slice(-1)

  browser.switchToWindow(lastWindowHandle[0])

  const windowUrl = browser.getUrl()
  expect(windowUrl).toContain(expectedUrl, 'The popup has a incorrect getUrl')
  browser.closeWindow()

}

module.exports = {
  checkIsOpenedInNewWindow
}