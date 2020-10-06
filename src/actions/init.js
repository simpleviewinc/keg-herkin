import { apiRequest } from 'SVUtils/apiRequest'
import { upsertDefinitions }  from './definitions/upsertDefinitions'
import { upsertFeatures }  from './features/upsertFeatures'

// Just here for now to test, should remove later
import { setFeatureActive } from './features/setFeatureActive'

export const init = async () => {
  const { features, definitions } = await apiRequest(`/bdd`)

  features && upsertFeatures(features)
  definitions && upsertDefinitions(definitions)

  // Just here for now to test, should remove later
  features.length && setFeatureActive(features[0])

}