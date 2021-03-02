import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { devLog } from 'SVUtils'
import { loadApiFile } from 'SVUtils/api'
import { loadFeature } from 'SVActions/features'

const { CATEGORIES } = Values

/**
 * setActiveFile
 * @param {string} path 
 * @param {string=} content - use as content as opposed to pulling from api
 */
export const setActiveFile = async (path, content) => {
  try {
    // if file is a feature, also set active feature
    const { items } = getStore().getState()
    const features = items[CATEGORIES.FEATURES] || []
    const feature = features.find(feature => feature.fullPath === path)
    const isFeature = Boolean(feature)
    isFeature && loadFeature(feature)

    // if pending/custom content passed in, show that. otherwise load from file
    let result = {}
    if (content) {
      result.fullPath = path
      result.content = content
    }
    else {
      console.log('loading fresh file-------')
      result = await loadApiFile(path)
    }
      

    dispatch({
      type: ActionTypes.SET_ITEMS,
      payload: {
        category: CATEGORIES.ACTIVE_FILE,
        items: {
          isFeature,
          ...result,
        },
      },
    })
  } 
  catch (error) {
    devLog('warn', `setActiveFile error: ${error}`)
  }
}