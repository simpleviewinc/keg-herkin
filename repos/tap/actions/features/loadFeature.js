import { setScreen } from 'SVActions/setScreen'
import { setFeatureActive } from 'SVActions/features/setFeatureActive'


/**
 * Loads the feature content and changes the screen if valid
 * @param {Object} feature 
 * @param {string} screenId 
 */
export const loadFeature = (feature, screenId) => {
  setFeatureActive(feature)
  screenId && setScreen(screenId)
}