import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * setActiveFilePendingContent
 * @param {string} pendingContent 
 */
export const setActiveFilePendingContent = (pendingContent) => {
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.ACTIVE_FILE,
      key: SUB_CATEGORIES.PENDING_CONTENT,
      item: pendingContent,
    },
  })
}