import { devLog } from 'SVUtils'
import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { get, noOpObj } from '@keg-hub/jsutils'
import { addToast } from 'SVActions/toasts'
import { setTestRun } from './setTestRun'
import { getResultsActiveFile } from 'SVUtils/helpers/getResultsActiveFile'

const { CATEGORIES } = Values

/**
 * Updates the active property of a testRunModel
 * @param {Object} testRunModel - The testRun model to set active
 * @param {Object} activeFile - Active fileModel for the currently active screen
 *
 * @returns {void}
 */
export const setTestRunActive = (testRunModel, activeFile) => {
  const { items } = getStore().getState()
  activeFile = activeFile || getResultsActiveFile() || noOpObj
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, activeFile.location])

  testRunModel
    ? setTestRun({ ...testRunModel, active: true })
    : addToast({
        type: `error`,
        timeout: 6000,
        message: `Can not set testRun active. A testRun model is required!`
      })

}
