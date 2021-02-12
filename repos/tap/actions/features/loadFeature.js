import { setScreen } from 'SVActions/setScreen'
import { setFeatureActive } from 'SVActions/features/setFeatureActive'
import { upsertActiveRunnerTest } from 'SVActions/runner/upsertActiveRunnerTest'


/**
 * Loads the feature content and changes the screen if valid
 * @param {Object} feature 
 * @param {string} screenId 
 */
export const loadFeature = (feature, screenId) => {
  setFeatureActive(feature)
  upsertActiveRunnerTest(feature)
  screenId && setScreen(screenId)
}