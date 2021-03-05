import { dispatch, getStore } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { noPropArr, noOpObj, deepMerge, uuid } from '@keg-hub/jsutils'
const { CATEGORIES } = Values

const buildToast = (toast=noOpObj) => {
  const type = toast.type || 'info'
  switch(type) {
    case 'success':
      return deepMerge({
        id: uuid(),
        title: 'Success',
        type: 'success',
        message: 'This is a success toast component',
      }, toast)
    case 'danger':
      return deepMerge({
        id: uuid(),
        title: 'Danger',
        type: 'danger',
        message: 'This is an error toast component',
      }, toast)
    case 'info':
      return deepMerge({
        id: uuid(),
        title: 'Info',
        type: 'info',
        message: 'This is an info toast component',
      }, toast)
    case 'warning': {
      return deepMerge({
        id: uuid(),
        title: 'Warning',
        type: 'warning',
        message: 'This is a warning toast component',
      }, toast)
    }
  }
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