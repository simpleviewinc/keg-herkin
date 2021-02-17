import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { devLog } from 'SVUtils'
import { loadApiFile } from 'SVUtils/api'
import { loadFeature } from 'SVActions/features'

const { CATEGORIES } = Values

/**
 * setActiveFile
 * @param {string} path 
 */
export const setActiveFile = async (path) => {
  try {
    // if file is a feature, also set active feature
    const { items } = getStore().getState()
    const features = items[CATEGORIES.FEATURES] || []
    const feature = features.find(feature => feature.fullPath === path)

    const result = await loadApiFile(path)

    dispatch({
      type: ActionTypes.SET_ITEMS,
      payload: {
        category: CATEGORIES.ACTIVE_FILE,
        items: {
          isFeature: Boolean(feature),
          ...result
        },
      },
    })
  } 
  catch (error) {
    devLog('warn', `setActiveFile error: ${error}`)
  }
}