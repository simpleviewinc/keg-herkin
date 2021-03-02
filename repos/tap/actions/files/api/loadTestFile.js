import { devLog } from 'SVUtils'
import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { loadApiFile } from 'SVUtils/api'
import { setActiveFileFromType } from '../local/setActiveFileFromType'

const { CATEGORIES } = Values

/**
 * Helper to find the treeNodeModel of the passed in file
 * Matches a node, a node's location or a node's name
 * @type function
 * @param {Array} nodes - Loaded treeNodeModels from the Store
 * @param {Object|string} file - treeNodeModel, name or location of the test file
 *
 * @return {Object} - Found treeNodeModel of the passed in file
 */
const findFileInTree = (nodes, file) => nodes.find(node => (
  node === file || node.location === file ||  node.name === file
))

/**
 * Sets a test file as the activeFile, after loading it's fileModel from the backend
 * Then calls setActiveFileFromType to set the file Active
 * @type function
 * @param {Object|string} testFile - treeNodeModel, name or location of the test file
 *
 * @return {void}
 */
export const loadTestFile = async testFile => {
  const { items } = getStore()?.getState()
  if(!items) return

  const fileTree = items[CATEGORIES.FILE_TREE]
  const pendingFiles = items[CATEGORIES.PENDING_FILES] || {}

  const nodeToLoad = findFileInTree(fileTree.nodes, testFile)
  if(!nodeToLoad)
    return devLog(`Could not load file ${testFile}. It does not exist in the file tree`, `warn`)
  
  const fileModel = pendingFiles[nodeToLoad.location] || await loadApiFile(nodeToLoad.location)
  return fileModel
    ? setActiveFileFromType(fileModel)
    : devLog(`Could not load file ${testFile} from the API!`, `warn`)

}