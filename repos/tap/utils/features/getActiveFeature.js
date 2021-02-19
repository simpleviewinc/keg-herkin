import { Values } from 'SVConstants'
import { getStore } from 'SVStore'
import { pickKeys } from '@keg-hub/jsutils'
const { CATEGORIES } = Values

/**
 * Gets the currently active feature form the passed in items or redux store
 * @function
 * @public
 * @export
 * @param {Object} items - Redux store items containing the features and activeData
 *
 * @return {Object} - Found active feature
 */
export const getActiveFeature = items => {
  const storeItems = items || getStore()?.getState()?.items

  const { activeData, features } = pickKeys(storeItems, [
    CATEGORIES.FEATURES,
    CATEGORIES.ACTIVE_DATA,
  ])

  return features && features[activeData?.feature]
}