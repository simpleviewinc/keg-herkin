import { devLog } from 'SVUtils'
import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { getActiveScreen } from 'SVUtils/helpers/getActiveScreen'

const { CATEGORIES } = Values

/**
 * setActiveFile
 * @param {Object} fileModel - file to set as the activeFile 
 * @param {string=} content - use as content as opposed to pulling from api
 */
export const setActiveFile = async (model, content, screenId) => {
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

/*


export const setActiveFile = async (fileModel, content, screenId) => {
  const { items } = getStore().getState()
  const activeScreen = getActiveScreen(items)

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.SCREENS,
      key: activeScreen.id,
      item: {
        ...activeScreen,
        [CATEGORIES.ACTIVE_FILE]: {
          ...fileModel,
          modified: content || fileModel.modified
        }
      },
    },
  })
}


*/