import { dispatch } from 'SVStore'
import { noPropArr } from '@keg-hub/jsutils'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Dispatches the passed in features to the Store
 * @type function
 * @param {Array} features - Parsed features matching the filesModel
 *
 * @returns {void}
 */
export const upsertFeatures = (features=noPropArr) => {
  features && dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.FEATURES,
      items: features,
    },
  })
}