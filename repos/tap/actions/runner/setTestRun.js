import { devLog } from 'SVUtils'
import { get } from '@keg-hub/jsutils'
import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values


export const setTestRun = testRunModel => {
  testRunModel
    ? dispatch({
        type: ActionTypes.SET_ITEM,
        payload: {
          category: CATEGORIES.TEST_RUNS,
          key: testRunModel.file,
          item: testRunModel,
        }
      })
    : devLog(`error`, `Can not update test run. A test run model is required!`)
}