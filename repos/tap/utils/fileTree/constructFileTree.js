import { noPropArr, applyToCloneOf } from '@keg-hub/jsutils'
import { findNode } from 'SVUtils/fileTree'
/**
 * Recursively constructs the fileTree array
 * @param {Array<string>} rootPaths - array of path strings
 * @param {Array<Object>} nodes - { children, id, location, name, type }
 * @param {Array<string>} filters - File paths to filter out of the fileTree
 * 
 * @param {Array}
 */
export const constructFileTree = (rootPaths=noPropArr, nodes=noPropArr, filters=noPropArr) => {

  const filtered = rootPaths?.filter(rootLoc => {
    return !Boolean(filters.find(filter => !filter.includes(rootLoc)))
  })

  return filtered?.map(path => {
    const node = findNode(path, nodes)
    const result = applyToCloneOf(node, (clone) => {
      clone.children = (node.children?.length && constructFileTree(node?.children, nodes, filters)) || []
    })
    return result
  })
}