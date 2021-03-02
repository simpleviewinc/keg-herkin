import { dispatch } from 'SVStore'
import { noPropArr } from '@keg-hub/jsutils'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Dispatches the passed in step definitions to the Store
 * @type function
 * @param {Array} definitions - Parsed definitions matching the filesModel
 *
 * @returns {void}
 */
export const upsertDefinitions = (definitions=noPropArr) => {
  definitions && dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.DEFINITIONS,
      items: definitions,
    },
  })
}