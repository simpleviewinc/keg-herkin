import { dispatch, getStore } from 'SVStore'
import { addToast } from '../../toasts/addToast'
import { Values, ActionTypes } from 'SVConstants'
import { updateUrlQuery } from 'SVUtils/url/updateUrlQuery'
import { getActiveScreen } from 'SVUtils/helpers/getActiveScreen'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * setActiveFile
 * @param {Object} fileModel - file to set as the activeFile 
 */
export const setActiveFile = (fileModel, screenId) => {
  const { items } = getStore().getState()
  const screenModel = getActiveScreen(items, screenId)

  if(!screenModel)
    return addToast({
      type: `error`,
      timeout: 6000,
      message: `Can not find screen from id: ${screenId}`,
    })

  const updatedFile = { ...fileModel }

  // If the current screen is active, then also update the browser url
  screenModel.active &&
    updateUrlQuery({ file: fileModel.name }, true)

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.SCREENS,
      key: screenModel.id,
      item: {
        ...screenModel,
        [SUB_CATEGORIES.ACTIVE_FILE]: updatedFile,
      },
    },
  })

  return updatedFile
}


