import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { noPropArr, noOpObj, deepMerge, uuid, capitalize } from '@keg-hub/jsutils'
const { CATEGORIES } = Values

const buildToast = (toast=noOpObj) => {
  const type = toast.type || 'info'
  return deepMerge({
    type,
    id: uuid(),
    icon: type,
    title: capitalize(type),
    message: `This is a ${type} toast component`,
  }, toast)
}

export const addToast = toast => {
  const { items } = getStore().getState()
  const updated = Array.from([ ...(items[CATEGORIES.TOASTS] || noPropArr), buildToast(toast) ])

  dispatch({
    type: ActionTypes.SET_ITEMS,
    payload: {
      category: CATEGORIES.TOASTS,
      items: updated,
    },
  })
}