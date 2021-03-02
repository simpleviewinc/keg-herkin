import { getStore, dispatch } from 'SVStore'
import { Values, ActionTypes } from 'SVConstants'
import { applyToCloneOf } from '@keg-hub/jsutils'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Update the specific node in the fileTree 
 * @param {string} content
 * @param {string} location
 */
export const setNodePendingContent = (content, location) => {
  const { items } = getStore().getState()
  const { fileTree, activeFile } = items
  const { nodes } = fileTree

  // use the path from activeFile if 'location' is not passed in
  const nodePath = location || activeFile?.location
  // update the item in the array
  const updated = nodes?.map(node => {
    return applyToCloneOf(node, (clone) => {
      clone?.id === nodePath && (clone.pendingContent = content)
    })
  })

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.FILE_TREE,
      key: SUB_CATEGORIES.NODES,
      item: updated,
    },
  })

}