/**
 * Helper to help map the fileModel array to object with location as the unique key
 * @param {Array} fileModels
 * 
 * @returns {Object} { fileModel.location: fileModel, fileModel2.location: fileModel2, ... }
 */
const fileModelArrayToObj = (fileModels) => {
  return fileModels && fileModels.reduce((map, fileModel) => {
    map[fileModel?.location] = fileModel
    return map
  }, {})
}

module.exports = {
  fileModelArrayToObj
}