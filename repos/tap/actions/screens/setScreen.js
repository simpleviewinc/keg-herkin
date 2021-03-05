import { devLog } from 'SVUtils'
import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { setScreenInactive } from './setScreenInactive'

const { CATEGORIES, SCREENS } = Values

/**
 * Sets the active tab screen
 * @type function
 * @param {string} screenId - Id of the screen to make active
 *
 * @returns {void}
 */
export const setScreen = screenId => {
  const { items } = getStore().getState()
  const screenModel = items[CATEGORIES.SCREENS][screenId]

  if(!screenModel) return devLog(`warn`, `Screen ${screenId} does not exist!`, SCREENS)

  setScreenInactive()

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.SCREENS,
      key: screenId,
      item: { ...screenModel, active: true },
    },
  })
}
