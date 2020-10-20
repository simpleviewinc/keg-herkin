import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { devLog } from 'SVUtils'

const { CATEGORIES, SCREENS } = Values

export const setScreen = async (screen='') => {
  const itemScreen = screen && SCREENS[screen.toUpperCase()]
  const { items } = getStore()?.getState()

  // Check if the screen was changed
  items?.activeData?.screen === screen
    ? null
    : !itemScreen
      ? devLog(`warn`, `Screen ${itemScreen} exist!`, SCREENS)
      : dispatch({
          type: ActionTypes.SET_ITEM,
          payload: {
            category: CATEGORIES.ACTIVE_DATA,
            key: CATEGORIES.SCREEN,
            item: itemScreen,
          },
        })

}
