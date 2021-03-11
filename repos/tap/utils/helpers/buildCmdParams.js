import { checkCall, noPropArr, noOpObj } from '@keg-hub/jsutils'

/**
 * Builds the params for feature file commands
 * @function
 * @private
 * @param {Object} command - Command to be run
 * @param {Object} fileModel - Model of the file the command is being run for
 *
 * @return {Array} - Built params for the command
 */
const buildFeatureParams = (command, fileModel) => {
  return [
    `context=${fileModel.relative || fileModel.location}`,
    `slowMo=5`,
  ]
}

/**
 * Builds the params for waypoint commands
 * @function
 * @private
 * @param {Object} command - Command to be run
 * @param {Object} fileModel - Model of the file the command is being run for
 *
 * @return {Array} - Built params for the command
 */
const buildWaypointParams = (command, fileModel) => {
  return [
    `context=${fileModel.relative || fileModel.location}`,
  ]
}

/**
 * Builds the params for unit commands
 * @function
 * @private
 * @param {Object} command - Command to be run
 * @param {Object} fileModel - Model of the file the command is being run for
 *
 * @return {Array} - Built params for the command
 */
const buildUnitParams = (command, fileModel) => {
  return [
    `context=${fileModel.relative || fileModel.location}`,
  ]
}

const parmBuildMap = {
  unit: buildUnitParams,
  feature: buildFeatureParams,
  waypoint: buildWaypointParams,
}

/**
 * Finds the param build method based on file type and calls it
 * @function
 * @public
 * @export
 * @param {Object} command - Command to be run
 * @param {Object} fileModel - Model of the file the command is being run for
 *
 * @return {Array} - Built params for the command
 */
export const buildCmdParams = (command, fileModel=noOpObj) => {
  return checkCall(
    parmBuildMap[fileModel.fileType],
    command,
    fileModel
  ) || noPropArr

}