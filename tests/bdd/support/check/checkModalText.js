
/**
 * Check the text of a modal
 * @param  {String}   modalType     The type of modal that is expected
 *                                  (alertbox, confirmbox or prompt)
 * @param  {String}   falseState    Whether to check if the text matches or not
 * @param  {String}   expectedText  The text to check against
 */
const checkModalText = (modalType, falseState, expectedText) => {
  try {
    const text = browser.getAlertText()

    if (falseState) {
      expect(text).not.toEqual(expectedText, "Expected the text of ".concat(modalType, " not to equal ") + "\"".concat(expectedText, "\""))
    }
    else {
      expect(text).toEqual(expectedText, "Expected the text of ".concat(modalType, " to equal ") + "\"".concat(expectedText, "\", instead found \"").concat(text, "\""))
    }

  }
  catch (e) {
    throw new Error("A ".concat(modalType, " was not opened when it should have been opened"))
  }
}

module.exports = {
  checkModalText
}