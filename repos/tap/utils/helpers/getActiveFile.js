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
 * @param {string} screenId - Id of the screen the file is active on
 *
 * @return {Object} - Found active feature
 */
export const getActiveFile = (items, itemId) => {
  const storeItems = items || getStore()?.getState()?.items
  const screenModels = storeItems[CATEGORIES.SCREENS]

  return Object.values(screenModels)
    .reduce((found, model) => {
      return found
        ? found
        : itemId
          ? screenModels[itemId].activeFile
          : model.active && model.activeFile
    }, false)

}