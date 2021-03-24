import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { loadApiFile } from 'SVUtils/api'
import { addToast } from '../../toasts/addToast'
import { isEmptyColl } from '@keg-hub/jsutils'
import { setAltActiveFile } from './setAltActiveFile'
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
  if(!reportFile)
    return addToast({
        type: `error`,
        message: `Can not set report active. A location is required!`,
      })

  const { items } = getStore()?.getState()
  if(!items) return
  const fileTree = items[CATEGORIES.FILE_TREE]

  // Try to find the relative node
  const relativeNode = findRelatedFile(fileTree.nodes, reportFile)

  // If found load it from the API, and set it active in the results screen
  const fileModel = relativeNode && await loadApiFile(relativeNode.location)
  const activeFile = !fileModel || isEmptyColl(fileModel) ? false : fileModel

  // Then try to load the report file model
  const altFileModel = await loadApiFile(reportFile)

  ;(activeFile || altFileModel)
    ? setResultsScreen(activeFile, altFileModel)
    : addToast({
        type: `error`,
        message: `Report file could not be loaded. Invalid server response!`,
      })

}