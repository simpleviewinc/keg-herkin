import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { devLog } from 'SVUtils'

const { CATEGORIES } = Values

/**
 * setActiveFile
 * @param {string} path 
 * @param {string=} content - use as content as opposed to pulling from api
 */
export const setActiveFile = async (model, content) => {
  try {
    dispatch({
      type: ActionTypes.SET_ITEMS,
      payload: {
        category: CATEGORIES.ACTIVE_FILE,
        items: { ...model, modified: content || model.modified },
      },
    })
  } 
  catch (error) {
    devLog('warn', `setActiveFile error: ${error}`)
  }
}