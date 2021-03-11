import { addToast } from '../toasts/addToast'
import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { setScreenInactive } from './setScreenInactive'
import { updateUrlQuery } from 'SVUtils/helpers/updateUrlQuery'

const { CATEGORIES, SCREENS } = Values

/**
 * Updates the url with the currently active screen
 * @param {Object} screenModel - Meta data for the screen being set to active
 *
 * @returns {void}
 */
const updateUrl = screenModel => {
  const query = { screen: screenModel.id }
  screenModel.activeFile && (query.file = screenModel.activeFile.name)
  updateUrlQuery(query, true)
}

/**
 * Sets the active tab screen
 * @type function
 * @param {string} screenId - Id of the screen to make active
 *
 * @returns {void}
 */
export const setScreen = (screenId, screenModel) => {
  const { items } = getStore().getState()
  screenModel = screenModel || items[CATEGORIES.SCREENS][screenId]

  if(!screenModel)
    return addToast({ type: `warn`, message: `Screen ${screenId} does not exist!` })

  setScreenInactive()
  updateUrl(screenModel)

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.SCREENS,
      key: screenId,
      item: { ...screenModel, active: true },
    },
  })
}
