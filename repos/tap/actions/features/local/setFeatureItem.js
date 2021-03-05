import { isObj } from '@keg-hub/jsutils'
import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * setFeatureItem
 * @param {Object} feature 
 */
export const setFeatureItem = (feature) => {
  isObj(feature) && dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.FEATURES,
      key: feature?.location,
      item: feature,
    },
  })
}