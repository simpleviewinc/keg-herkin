import { apiRequest } from 'SVUtils/apiRequest'
import { upsertDefinitions }  from './definitions/upsertDefinitions'
import { upsertFeatures }  from './features/upsertFeatures'

export const init = async () => {
  const { features, definitions } = await apiRequest(`/bdd`)

  features && upsertFeatures(features)
  definitions && upsertDefinitions(definitions)

}