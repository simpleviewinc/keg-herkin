const fs = require('fs')
const path = require('path')
const { treeNodeModel } = require('HerkinModels')
const { isDirectory } = require('./fileSys')

/**
 * Recursively checks to find the parent node for a given item
 * if a parent exists, it will add it as a child
 * @param {Array<Object>} nodes 
 * @param {string} parentPath 
 * @param {Object} newItem
 * 
 * @returns {Boolean} - whether a parent node exists and push was successful
 */
const parentNodeExists = (nodes, parentPath, newItem) => {
  const found = nodes.find((node) => {
    return node.location === parentPath
      ? Boolean(node.children.push(newItem?.id)) && nodes.push(newItem)
      : node.children?.length && parentNodeExists(node.children, parentPath, newItem)
  })

  return Boolean(found)
}

/**
 * Gets the metadata of a path from the local filesystem
 * @param {string} filePath - full path to the folder or file i.e '/keg/tap/tests/bdd/features'
 * 
 * @returns {Object} - Meta data containing {name, parent, type ( folder || file )} properties
 */
const getPathMeta = async filePath => {
  const isDir = await isDirectory(filePath)

  return {
    id: filePath,
    location: filePath,
    name: path.basename(filePath),
    parent: path.dirname(filePath),
    type: isDir ? 'folder' : 'file',
  }
}

/**
 * Transforms the paths string to a specific data object
 * @param {Array<string>} paths - full paths to the folder or file i.e '/keg/tap/tests/bdd/features'
 * 
 * @returns {Array<Object>} - each object has the form: 
 *                            {id, location, children: [], modified}
 */
const getPathNodes = async paths => {
   /**
   * 1. create new object for each 'path' item
   * 2. if the parent path of current 'path' item exists, add it as the child
   */
  return await paths.reduce(async (toResolve, path) => {
    const nodes = await toResolve

    // Get the meta data for this path
    const { parent, ...pathMeta } = await getPathMeta(path)
    
    // Ignore hidden files that start with a .
    if (pathMeta.type === 'file' && pathMeta.name.startsWith('.')) return nodes
  
    const node = treeNodeModel({
      children: [],
      modified: false,
      ...pathMeta,
    })

    // either push the node or add it to an existing node.children
    ;(!nodes.length || !parentNodeExists(nodes, parent, node)) &&
      nodes.push(node)

    return nodes
  }, Promise.resolve([]))

}

/**
 * Returns an array of root paths
 * @param {Array<string>} fullPaths
 * @param {string} testsRootPath
 * 
 * @returns {Array<string>}
 */
const getRootPaths = (fullPaths, testsRootPath) => {
  return fullPaths.filter(fullPath => 
    path.dirname(fullPath) === testsRootPath
  )
}


module.exports = {
  getPathMeta,
  getPathNodes,
  getRootPaths,
  parentNodeExists,
}