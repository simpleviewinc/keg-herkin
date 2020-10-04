import { apiRequest } from 'SVUtils/apiRequest'
import { upsertSteps }  from './steps/upsertSteps'
import { upsertFeatures }  from './features/upsertFeatures'

// Just here for now to test, should remove later
import { setFeatureActive } from './features/setFeatureActive'

export const init = async () => {
  const { features, steps } = await apiRequest(`/bdd`)

  features && upsertFeatures(features)
  steps && upsertSteps(steps)

  // Just here for now to test, should remove later
  features.length && setFeatureActive(features[0])

}