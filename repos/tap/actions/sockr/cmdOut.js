import { devLog } from 'SVUtils'
import { get } from '@keg-hub/jsutils'
import { getStore } from 'SVStore'
import { setTestRun } from '../runner/setTestRun'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Updates the output array of the active testRunModel with a stdout message
 * @param {Object} data - Message data from the socket
 * @param {Object} testRunModel - The test run model to update
 *
 * @returns {void}
 */
export const cmdOut = (data, testRunModel) => {
  const { items } = getStore().getState()
  const { location } = get(items, CATEGORIES.ACTIVE_TEST_FILE, {})
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, location])

  testRunModel
    ? setTestRun({
        ...testRunModel,
        output: [
          ...testRunModel.output,
          // data.message
        ]
      })
    : devLog(`error`, `Can not set testRun output. A testRun model is required!`)

}
