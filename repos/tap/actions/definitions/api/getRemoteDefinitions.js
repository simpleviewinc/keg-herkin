import { apiRequest } from 'SVUtils/api/apiRequest'
import { upsertDefinitions } from '../local/upsertDefinitions'

export const getRemoteDefinitions = async () => {
  const definitions = await apiRequest(`/definitions`)
  definitions && upsertDefinitions(definitions)
}