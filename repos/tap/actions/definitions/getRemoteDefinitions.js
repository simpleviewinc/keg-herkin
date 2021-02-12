import { apiRequest } from 'SVUtils/api/apiRequest'
import { upsertDefinitions } from './upsertDefinitions'

export const getRemoteDefinitions = async () => {
  const definitions = await apiRequest(`/definitions`)
  definitions && upsertDefinitions(definitions)
}