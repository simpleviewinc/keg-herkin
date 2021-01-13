import { apiRequest } from 'SVUtils/apiRequest'
import { upsertDefinitions }  from './definitions/upsertDefinitions'
import { upsertFeatures }  from './features/upsertFeatures'
import { upsertActiveData }  from './runner/upsertActiveData'

const exampleFile = 'exampleTests.js'

/**
 * Init action
 * executes on first app load
 * @function
 */
export const init = async () => {
  const { features, definitions } = await apiRequest(`/bdd`)

  features && upsertFeatures(features)
  definitions && upsertDefinitions(definitions)

  // loading example test data from <root>/tests/tests
  const data = await apiRequest(`/files/load?file=${exampleFile}`)
  upsertActiveData(data)
}