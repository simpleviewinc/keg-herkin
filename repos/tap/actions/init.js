import { setScreen } from './setScreen'
import { loadFile } from './api/files/loadFile'
import { apiRequest } from 'SVUtils/apiRequest'
import { Values, ActionTypes } from 'SVConstants'
import { upsertFeatures }  from './features/upsertFeatures'
import { setFeatureActive } from './features/setFeatureActive'
import { queryToObj, noOpObj, isEmptyColl } from '@keg-hub/jsutils'
import { upsertDefinitions }  from './definitions/upsertDefinitions'
import { upsertActiveRunnerTest }  from './runner/upsertActiveRunnerTest'
import { setActiveModal } from 'SVActions/modals'
const { MODAL_TYPES } = Values

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

const initDefs = definitions => {
  // Add all definitions to the store
  definitions && upsertDefinitions(definitions)
}

const initTestFile = async (activeFeat, queryFile) => {
  if(activeFeat && activeFeat.content)
    return upsertActiveRunnerTest(activeFeat)

  const testFile = activeFeat && activeFeat.testPath || queryFile

  // loading example test data from <root>/tests/tests
  await loadFile(exampleFile, (testFile) => upsertActiveRunnerTest(testFile))
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

  // display options modal if no valid querystring passed in
  ;(!queryObj || isEmptyColl(queryObj)) &&
    setActiveModal(MODAL_TYPES.TEST_SELECTOR_MODAL)

  // Update the current screen to match the query.tab value
  setScreen(queryObj.tab || 'empty')

}