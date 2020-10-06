import { apiRequest } from 'SVUtils/apiRequest'
import { upsertDefinitions } from './upsertDefinitions'



export const getRemoteDefinitions = () => {
  const definitions = await apiRequest(`/definitions`)
  definitions && upsertDefinitions(definitions)
}