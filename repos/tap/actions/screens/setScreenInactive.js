import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Sets the currently active screen to be inactive
 * @type function
 *
 * @returns {void}
 */
export const setScreenInactive = () => {
  const { items } = getStore().getState()
  const activeScreen = Object.values(items[CATEGORIES.SCREENS]).find(screen => screen.active)

  activeScreen &&
    dispatch({
      type: ActionTypes.SET_ITEM,
      payload: {
        category: CATEGORIES.SCREENS,
        key: activeScreen.id,
        item: { ...activeScreen, active: false },
      },
    })
}