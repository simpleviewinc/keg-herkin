import { upsertFileTree } from '../local/upsertFileTree'
import { apiRequest } from 'SVUtils/api/apiRequest'

export const getRemoteFileTree = async () => {
  const fileTree = await apiRequest(`/files/tree`) || {}
  // load the file tree from root tests folder
  return upsertFileTree(fileTree)
}