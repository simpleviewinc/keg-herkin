import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { loadApiFile } from 'SVUtils/api'
import { addToast } from '../../toasts/addToast'
import { getActiveScreen } from 'SVUtils/helpers/getActiveScreen'
import { setResultsScreen } from '../../screens/setResultsScreen'
import { setActiveFileFromType } from '../local/setActiveFileFromType'

const { CATEGORIES, SCREENS } = Values

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
 * @param {string} screenId - Id of the screen to load the fileModel for
 *
 * @return {void}
 */
export const loadTestFile = async (testFile, screenId) => {
  const { items } = getStore()?.getState()
  if(!items) return

  const fileTree = items[CATEGORIES.FILE_TREE]

  const nodeToLoad = findFileInTree(fileTree.nodes, testFile)
  if(!nodeToLoad)
    return addToast({
        type: `warn`,
        message: `Could not load file ${testFile}. It does not exist in the file tree`,
      })

  const screenModel = getActiveScreen(items, screenId)

  const fileModel = await loadApiFile(nodeToLoad.location)
  return fileModel
    ? screenModel.id === SCREENS.RESULTS
      ? setResultsScreen(fileModel)
      : setActiveFileFromType(fileModel, screenId)
    : addToast({
        type: `warn`,
        message: `Could not load file ${testFile} from the API!`,
      })

}