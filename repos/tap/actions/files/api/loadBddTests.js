import { apiRequest } from 'SVUtils/api/apiRequest'
import { upsertFeatures } from '../../features/local'
import { upsertDefinitions } from '../../definitions/local'

/**
 * Gets the fileModels for the features and definitions from the backend API
 * Then calls upsertFeatures and upsertDefinitions, to add them to the Store
 * @type function
 *
 * @return {void}
 */
export const loadBddTests = async () => {
  const { features, definitions } = await apiRequest('/bdd')
  upsertFeatures(features)
  upsertDefinitions(definitions)
}