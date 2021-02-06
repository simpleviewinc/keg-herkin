import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { devLog } from 'SVUtils'

const { CATEGORIES, SCREENS } = Values

/**
 * Sets the active tab screen
 * @param {string} id - screen id 
 */
export const setScreen = (id='') => {
  const screenId = id && SCREENS[id.toUpperCase()]
  !screenId
  ? devLog(`warn`, `Screen ${screenId} does not exist!`, SCREENS)
  : dispatch({
      type: ActionTypes.SET_ITEMS,
      payload: {
        category: CATEGORIES.ACTIVE_TAB,
        items: {
          id: screenId
        },
      },
    })
}
