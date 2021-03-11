import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { addToast } from '../toasts/addToast'
import { get, noOpObj } from '@keg-hub/jsutils'
import { setTestRun } from '../runner/setTestRun'
import { getResultsActiveFile } from 'SVUtils/helpers/getResultsActiveFile'

const { CATEGORIES } = Values

/**
 * Updates a testRunModel to no longer be running
 * @param {Object} data - Message data from the socket
 * @param {Object} testRunModel - The test run model to set running to false
 *
 * @returns {void}
 */
export const cmdEnd = (data, testRunModel) => {
  const { items } = getStore().getState()
  const activeFile = getResultsActiveFile() || noOpObj
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, activeFile.location])

  testRunModel
    ? setTestRun({ ...testRunModel, running: false })
    : addToast({
        type: `error`,
        timeout: 6000,
        message: `Can not set testRun model running. A testRun model is required!`
      })

}
