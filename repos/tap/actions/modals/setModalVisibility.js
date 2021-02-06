import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'


const { CATEGORIES } = Values
/**
 * updates the current active modal visibility
 */
export const setModalVisibility = (visible) => {
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.MODALS,
      key: 'visible',
      item: visible,
    },
  })
}