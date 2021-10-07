import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { addToast } from '../../toasts/addToast'
import { noOpObj } from '@keg-hub/jsutils'

const { CATEGORIES } = Values

export const setBrowserOptions = (options=noOpObj) => {

  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.BROWSER_OPTIONS,
      item: options,
    },
  })

}