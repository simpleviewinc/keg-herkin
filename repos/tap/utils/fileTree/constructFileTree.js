import { noPropArr, applyToCloneOf } from '@keg-hub/jsutils'
import { findNode } from 'SVUtils/fileTree'
/**
 * Recursively constructs the fileTree array
 * @param {Array<string>} rootPaths - array of path strings
 * @param {Array<Object>} nodes - { children, id, location, name, type }
 * 
 * @param {Array}
 */
export const constructFileTree = (rootPaths=noPropArr, nodes=noPropArr) => {
  return rootPaths?.map(path => {
    const node = findNode(path, nodes)
    const result = applyToCloneOf(node, (clone) => {
      clone.children = (node.children?.length && constructFileTree(node?.children, nodes)) || []
    })
    return result
  })
}