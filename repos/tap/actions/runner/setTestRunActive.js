import { devLog } from 'SVUtils'
import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { get } from '@keg-hub/jsutils'
import { setTestRun } from './setTestRun'

const { CATEGORIES } = Values

/**
 * Updates the active property of a testRunModel
 * @param {Object} testRunModel - The testRun model to set active
 *
 * @returns {void}
 */
export const setTestRunActive = testRunModel => {
  const { items } = getStore().getState()
  const { location } = get(items, CATEGORIES.ACTIVE_TEST_FILE, {})
  testRunModel = testRunModel || get(items, [CATEGORIES.TEST_RUNS, location])

  testRunModel
    ? setTestRun({ ...testRunModel, active: true })
    : devLog(`error`, `Can not set testRun active. A testRun model is required!`)

}
