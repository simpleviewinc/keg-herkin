import { apiRequest } from 'SVUtils/api/apiRequest'
import { upsertFeatures } from '../local/upsertFeatures'

/**
 * Calls the API backend to load the parsed feature definitions
 * Then calls upsertFeatures, to add them to the Store
 * @type function
 *
 * @returns {void}
 */
export const getRemoteFeatures = async () => {
  const features = await apiRequest(`/features`)
  upsertFeatures(features)
}