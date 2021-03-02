import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { loadApiFile } from 'SVUtils/api'
import { setActiveFileFromType } from '../local/setActiveFileFromType'

const { CATEGORIES } = Values

const findFileInTree = (nodes, file) => nodes.find(node => (
  node === file || node.location === file ||  node.name === file
))

export const loadTestFile = async testFile => {
  const { items } = getStore()?.getState()
  if(!items) return

  const fileTree = items[CATEGORIES.FILE_TREE]

  const nodeToLoad = findFileInTree(fileTree.nodes, testFile)
  if(!nodeToLoad)
    return console.warn(`Could not load file ${testFile}. It does not exist in the file tree`)
  
  const fileModel = await loadApiFile(nodeToLoad.location)

  return fileModel
    ? setActiveFileFromType(fileModel, items)
    : console.warn(`Could not load file ${testFile} from the API!`)

}