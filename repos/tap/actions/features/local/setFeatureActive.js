import { setActiveFile } from '../../files/local/setActiveFile'
import { setFeatureItem } from './setFeatureItem'

/**
 * Sets a feature active relative to a screen
 * @type function
 * @param {Object|string} feature - Feature fileModel, name or location of the feature
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 *
 * @returns {void}
 */
export const setFeatureActive = (feature, screenId) => {
  setFeatureItem(feature)
  return setActiveFile(feature, screenId)
}