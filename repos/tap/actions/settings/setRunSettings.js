import { dispatch, getStore } from 'SVStore'
import { addToast } from '../toasts/addToast'
import { Values, ActionTypes } from 'SVConstants'
const { CATEGORIES, DEF_TEST_RUN_SETTINGS } = Values

/**
 * setRunSettings - Updates the store with settings that define how tests should be run
 * @param {Object} settings - Options for how tests should run
 * 
 */
export const setRunSettings = (settings, showAlert=true) => {
  const { items } = getStore().getState()
  const currentSettings = items[CATEGORIES.RUN_SETTINGS] || DEF_TEST_RUN_SETTINGS

  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: CATEGORIES.RUN_SETTINGS,
      items: {
        ...currentSettings,
        ...settings
      },
    },
  })

  showAlert &&
    addToast({
      type: `success`,
      message: `Test run settings updated!`,
    })

}