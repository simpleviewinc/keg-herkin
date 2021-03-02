import { apiRequest } from 'SVUtils/api/apiRequest'
import { upsertFeatures } from '../local/upsertFeatures'

// Just here for now to test, should remove later
import { setFeatureActive } from '../local/setFeatureActive'

export const getRemoteFeatures = async () => {
  const features = await apiRequest(`/features`)

  upsertFeatures(features)

  // Just here for now to test, should remove later
  features.length && setFeatureActive(features[0])

}