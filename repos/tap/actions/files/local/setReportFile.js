import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { loadApiFile } from 'SVUtils/api'
import { addToast } from '../../toasts/addToast'
import { setResultsScreen } from '../../screens/setResultsScreen'

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
const findRelatedFile = (nodes, reportFile) => {
  const locSplit = reportFile.replace('.html', '').split('/')
  const nodeName = locSplit.pop()
  const nodeType = locSplit.pop()
  return nodes.find(node => (node.name === nodeName && node.testType === nodeType))
}

/**
 * Uses the passed in reportFile to set the activeFile for the results screen
 * Then sets the results screen active, so it can load the latest test file
 * @param {string} reportFile - Path the to html test results file
 *
 * @returns {void}
 */
export const setReportFile = async reportFile => {

  const { items } = getStore()?.getState()
  if(!items) return

  const fileTree = items[CATEGORIES.FILE_TREE]

  const relativeNode = findRelatedFile(fileTree.nodes, reportFile)

  if(!relativeNode)
    return addToast({
        type: `warn`,
        message: `Could not load related file for ${reportFile}. It does not exist in the file tree`,
      })

  const fileModel = await loadApiFile(relativeNode.location)

  setResultsScreen(fileModel)
}