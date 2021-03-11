import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { addToast } from '../toasts/addToast'
import { get, noOpObj } from '@keg-hub/jsutils'
import { setTestRun } from '../runner/setTestRun'
import { getResultsActiveFile } from 'SVUtils/helpers/getResultsActiveFile'

const { CATEGORIES } = Values

/**
 * Updates the messages array of the active testRunModel with a stdout message
 * @param {Object} data - Message data from the socket
 * @param {Object} testRunModel - The test run model to update
 *
 * @returns {void}
 */
export const cmdOut = (data, testRunModel) => {
  const { items } = getStore().getState()
  const activeFile = getResultsActiveFile() || noOpObj
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, activeFile.location])

  testRunModel
    ? setTestRun({
        ...testRunModel,
        messages: {
          ...testRunModel.messages,
          [data.timestamp]: {
            message: data.message,
            timestamp: data.timestamp,
          },
        }
      })
    : addToast({
        type: `error`,
        timeout: 6000,
        message: `Can not add testRun messages. A testRun model is required!`
      })

}
