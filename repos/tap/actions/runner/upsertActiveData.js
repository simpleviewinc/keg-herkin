
import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * Upserts active data to redux
 * @function
 * 
 * @param {Object} data 
 */
export const upsertActiveData = (data) => {
  data && dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.ACTIVE_DATA,
      items: data,
    },
  })
}