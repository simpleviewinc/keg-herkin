import { apiRequest } from 'SVUtils/apiRequest'
import { upsertFeatures } from './upsertFeatures'

// Just here for now to test, should remove later
import { setFeatureActive } from './setFeatureActive'

export const getRemoteFeatures = async () => {
  const features = await apiRequest(`/features`)

  upsertFeatures(features)

  // Just here for now to test, should remove later
  features.length && setFeatureActive(features[0])

}