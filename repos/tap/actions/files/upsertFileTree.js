import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * upsertFileTree
 * @param {Array<Object>} tree 
 */
export const upsertFileTree = (tree) => {
  dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.FILE_TREE,
      items: tree,
    },
  })
}