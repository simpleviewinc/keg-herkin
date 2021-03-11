import { Values } from 'SVConstants'
import { getStore } from 'SVStore'
import { pickKeys } from '@keg-hub/jsutils'
import { getActiveFile } from './getActiveFile'

const { CATEGORIES, SCREENS } = Values

/**
 * Gets the active results file, or the active screen activeFile
 * @param {Object} items - Redux store items containing the features and activeData
 *
 * @returns {Object} - fileModel of the activeFile for the results screen
 */
export const getResultsActiveFile = (items) => {
  const storeItems = items || getStore()?.getState()?.items
  const resultsScreen = storeItems[CATEGORIES.SCREENS][SCREENS.RESULTS]

  return resultsScreen.activeFile || getActiveFile(items)
}