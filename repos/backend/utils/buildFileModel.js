const { getType } = require('mime')
const { uuid } = require('@keg-hub/jsutils')
const { fileModel } = require('HerkinModels')
const { getTestFileType } = require('./getTestFileType')
const { getLastModified } = require('../libs/fileSys/fileSys')
const { HERKIN_ROOT, TEST_TYPES } = require('HerkinBackConstants')
const { FeatureParser } = require('../libs/features/featureParser')
const { DefinitionsParser } = require('../libs/definitions/definitionsParser')

const checkForAstParsing = async fileModel => {

  if(fileModel.fileType === 'feature')
    fileModel.ast = FeatureParser.parse(fileModel)

  // else if(fileModel.fileType === 'definition')
  //   return fileModel

  return fileModel
}


/**
 * Builds a fileModel from the fileModel object and passed arguments
 * @param {Object} fileModel - Partial fileModel merged with the default
 * 
 * @returns {Object} - Built fileModel object containing all fileModel properties
 */
const buildFileModel = async ({ location, fileType, uuid, ...modelData }) => {
  fileType = fileType || getTestFileType(location, TEST_TYPES)

  const builtModel = fileModel({
    ...modelData,
    fileType,
    location,
    uuid: location,
    mime: getType(location),
    name: location.split('/').pop(),
    relative: location.replace(HERKIN_ROOT, ''),
    lastModified: await getLastModified(location),
  })

  return checkForAstParsing(builtModel)

}

module.exports = {
  buildFileModel
}