import { devLog } from 'SVUtils'
import { isObj } from '@keg-hub/jsutils'
import { getStore } from 'SVStore'
import { Values } from 'SVConstants'
import { setActiveFile } from '../../files/local/setActiveFile'

const { CATEGORIES } = Values

/**
 * Helper to find the feature fileModel in the store
 * @type function
 * @param {Object|string} feature - Feature fileModel, name or location of the feature
 * @param {Object} location - Location on the host file system where the feature exists
 *
 * @returns {Object} - Found feature fileModel
 */
const getFeatureFromName = (feature, location) => {
  const { items } = getStore()?.getState()
  if(!items || !items.features)
    return devLog(`warn`, `No features exist in the store!`, items)

  return items.features.find(feat => (
    feat === feature ||
      (feat.location === location || feat.location === feature) ||
      feat.name === feature
  ))
}

/**
 * Sets a feature active relative to a screen
 * @type function
 * @param {Object|string} feature - Feature fileModel, name or location of the feature
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 *
 * @returns {void}
 */
export const setFeatureActive = async (feature, screenId) => {
  const activeFeature = isObj(feature)
    ? getFeatureFromName(feature.name, feature.location)
    : getFeatureFromName(feature)

  await setActiveFile(activeFeature, screenId)
}
