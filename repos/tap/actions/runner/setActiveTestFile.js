
import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Sets the currently active test file
 * This is the file that is having it's tests run
 * @function
 * @param {Object} testFile - file to set as the activeFile 
 * 
 */
export const setActiveTestFile = (testFile) => {
  testFile && dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.ACTIVE_TEST_FILE,
      item: testFile,
    },
  })
}