import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { addToast } from '../toasts/addToast'
import { get, noOpObj } from '@keg-hub/jsutils'
import { setTestRun } from '../runner/setTestRun'
import { getResultsActiveFile } from 'SVUtils/helpers/getResultsActiveFile'

const { CATEGORIES } = Values

/**
 * Updates the output array of the active testRunModel with a stderr message
 * @param {Object} data - Message data from the socket
 * @param {Object} testRunModel - The test run model to update
 *
 * @returns {void}
 */
export const cmdErr = (data, testRunModel) => {
  const { items } = getStore().getState()
  const activeFile = getResultsActiveFile() || noOpObj
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, activeFile.location])

  testRunModel
    ? setTestRun({
        ...testRunModel,
        output: [
          ...testRunModel.output,
          // data.message
        ]
      })
    : addToast({
        type: `error`,
        timeout: 6000,
        message: `Can not set testRun output. A testRun model is required!`,
      })
    

}
