
/**
 * Check if a new window or tab is opened
 * @param  {String}   obsolete  The type of opened object (window or tab)
 * @param  {String}   falseCase Whether to check if a new window/tab was opened
 *                              or not
 */
const checkNewWindow = (obsolete, falseCase) => {
  const windowHandles = browser.getWindowHandles();

  falseCase
    ? expect(windowHandles).toHaveLength(1, 'A new window should not have been opened')
    : expect(windowHandles).not.toHaveLength(1, 'A new window has been opened')

}

module.exports = {
  checkNewWindow
}