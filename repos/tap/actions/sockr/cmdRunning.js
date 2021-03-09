import { devLog } from 'SVUtils'
import { get } from '@keg-hub/jsutils'
import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { setScreen } from 'SVActions/screens/setScreen'

const { CATEGORIES, SCREENS } = Values

/**
 * Dispatches that a command is running
 * Makes call to toggleIsRunning, to turn it off
 * @param {Object} data - Message data from the socket
 *
 * @returns {void}
 */
export const cmdRunning = data => {
  const { items } = getStore().getState()
  const activeTestFile = get(items, CATEGORIES.ACTIVE_TEST_FILE)

  if(!activeTestFile || !activeTestFile.fileType)
    return devLog(`error`, `Can not set command running. No active test file exists!`)

  const currentOutput = get(items, [CATEGORIES.TEST_FILE_OUTPUT, activeTestFile.location], {})

  // Build the testFile model
  const testFileOutput = {
    ...currentOutput,
    lastRun: data.timestamp,
    runs: {
      ...currentOutput.runs,
      [data.timestamp]: [
        `Running ${activeTestFile.fileType} tests for ${activeTestFile.name}`
      ]
    }
  }

  // Update the store with the updated test output
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.TEST_FILE_OUTPUT,
      key: activeTestFile.location,
      item: testFileOutput,
    }
  })

  // Switch to the results screen automatically
  setScreen(SCREENS.RESULTS)

}
