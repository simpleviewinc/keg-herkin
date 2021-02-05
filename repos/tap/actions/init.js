import { queryToObj, noOpObj } from '@keg-hub/jsutils'
import { setScreen } from './setScreen'
import { apiRequest } from 'SVUtils/apiRequest'
import { Values, ActionTypes } from 'SVConstants'
import { upsertFeatures }  from './features/upsertFeatures'
import { setFeatureActive } from './features/setFeatureActive'
import { upsertDefinitions }  from './definitions/upsertDefinitions'
import { upsertActiveRunnerTest }  from './runner/upsertActiveRunnerTest'

const { CATEGORIES, SCREENS } = Values

const exampleFile = 'example/exampleTests.js'


const getQueryData = () => {
  return typeof document === 'undefined'
    ? noOpObj
    : queryToObj(document?.location?.search)
}

const cleanFeatName = feat => feat.toLowerCase().replace(/ /g, '')

const initFeatures = (features, queryFeat) => {
  if(!features || !features.length) return

  // Add all features to the store
  upsertFeatures(features)

  // Check for an active feature from the current url query object
  const activeFeat = queryFeat &&
    features &&
    features.length &&
    features.find(feat => cleanFeatName(feat.feature) === cleanFeatName(queryFeat))

  activeFeat && setFeatureActive(activeFeat)
  
  return activeFeat
}

// ?tab=builder&feature=Google%20Search

const initDefs = definitions => {
  // Add all definitions to the store
  definitions && upsertDefinitions(definitions)
}

const initTestFile = async (activeFeat, queryFile) => {
  if(activeFeat && activeFeat.content)
    return upsertActiveRunnerTest(activeFeat)

  const testFile = activeFeat && activeFeat.testPath || queryFile
  // loading example test data from <root>/tests/tests
  const { content } = await apiRequest(`/files/load?file=${exampleFile}`)
  upsertActiveRunnerTest(content)
}


/**
 * Init action
 * executes on first app load
 * @function
 */
export const init = async () => {
  const { features, definitions } = await apiRequest(`/bdd`)
  const queryObj = getQueryData()
  const activeFeat = initFeatures(features, queryObj.feature)

  initDefs(definitions)

  initTestFile(activeFeat, queryObj.file || exampleFile)

  // Update the current screen to match the query.tab value
  setScreen(queryObj.tab || 'empty')

}