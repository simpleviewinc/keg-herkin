import { dispatch } from 'SVStore'
import { noOpObj } from '@keg-hub/jsutils'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Dispatches the passed in features to the Store
 * @type function
 * @param {Array} features - Parsed features matching the filesModel
 *
 * @returns {void}
 */
export const upsertFeatures = (features=noOpObj) => {

  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.FEATURES,
      items: features,
    },
  })
}