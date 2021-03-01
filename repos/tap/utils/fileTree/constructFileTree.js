import { noPropArr } from '@keg-hub/jsutils'
import { findNode } from 'SVUtils/fileTree'
/**
 * Recursively constructs the fileTree array
 * @param {Array<string>} rootPaths - array of path strings
 * @param {Array<Object>} nodes - { children, id, fullPath, name, type }
 * 
 * @param {Array}
 */
export const constructFileTree = (rootPaths=noPropArr, nodes=noPropArr) => {
  return rootPaths?.map(path => {
    const node = findNode(path, nodes)
    node.children = (node.children?.length && constructFileTree(node.children, nodes)) || []
    return node
  })
}