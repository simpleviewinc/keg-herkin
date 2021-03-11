import { exists } from '@keg-hub/jsutils'
import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES, SCREENS } = Values


export const toggleTestRunning = toggle => {
  const { items } = getStore().getState()

  const isRunning = exists(toggle)
    ? Boolean(toggle)
    : !Boolean(items[CATEGORIES.CMD_RUNNING])
  
  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: CATEGORIES.CMD_RUNNING,
      items: {
        running: isRunning,
      },
    }
  })

}