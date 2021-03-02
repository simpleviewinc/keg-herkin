import { apiRequest } from 'SVUtils/api/apiRequest'
import { upsertFeatures } from '../../features/local'
import { upsertDefinitions } from '../../definitions/local'

export const loadBddTests = async () => {
  const { features, definitions } = await apiRequest('/bdd')
  upsertFeatures(features)
  upsertDefinitions(definitions)

  return true
}