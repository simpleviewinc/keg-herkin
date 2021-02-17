
import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Upserts active data to redux
 * @function
 * 
 * @param {string} data
 */
export const upsertActiveRunnerTest = ({ content }) => {
  content && dispatch({
    type: ActionTypes.UPSERT_ITEM,
    payload: {
      category: CATEGORIES.ACTIVE_RUNNER_TESTS,
      key: SUB_CATEGORIES.RUNNER_CONTENT,
      item: content,
    },
  })
}