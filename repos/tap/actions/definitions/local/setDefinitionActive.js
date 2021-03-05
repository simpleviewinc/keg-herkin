import { setActiveFile } from 'SVActions/files/local'

/**
 * Sets a step definitions active relative to a screen
 * @type function
 * @param {Object} fileModel - Definition fileModel
 * @param {Object} screenId - Id of the screen to set the fileModel as the activeFile
 *
 * @returns {void}
 */
export const setDefinitionActive = (fileModel, screenId) => {
  // TODO
  setActiveFile(fileModel)
}