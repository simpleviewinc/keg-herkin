import { upsertFileTree } from '../local/upsertFileTree'
import { apiRequest } from 'SVUtils/api/apiRequest'

/**
 * Gets the tests file tree from the backend API
 * Then calls upsertFileTree, to add it to the store
 * @type function
 *
 * @return {void}
 */
export const getRemoteFileTree = async () => {
  const fileTree = await apiRequest(`/files/tree`) || {}
  // Load the file tree from root tests folder
  fileTree && upsertFileTree(fileTree)
}