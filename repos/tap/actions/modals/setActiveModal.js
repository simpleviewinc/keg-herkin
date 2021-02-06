import { dispatch } from 'SVStore'
import { ActionTypes } from 'SVConstants'
import { Values } from 'SVConstants'
import { mapObj } from '@keg-hub/jsutils'

const { CATEGORIES, MODAL_TYPES } = Values

/**
 * 
 * @param {string} modalType - modal types from values.MODAL_TYPES
 * @param {Boolean} visible
 * @returns
 */
export const setActiveModal = (modalType, visible=true) => {
  mapObj(MODAL_TYPES, (__, value) => {
    if (value === modalType) {
      dispatch({
        type: ActionTypes.SET_ITEMS,
        payload: {
          category: CATEGORIES.MODALS,
          items: {
            activeModal: modalType,
            visible,
          },
        },
      })
    }
  })
}