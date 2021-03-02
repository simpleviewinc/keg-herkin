import { dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'

const { CATEGORIES } = Values

/**
 * upsertFileTree
 * @param {Array} rootPaths
 * @param {Array} nodes
 */
export const upsertFileTree = ({rootPaths, nodes}) => {
  return dispatch({
    type: ActionTypes.UPSERT_ITEMS,
    payload: {
      category: CATEGORIES.FILE_TREE,
      items: {
        rootPaths,
        nodes
      },
    },
  })
}