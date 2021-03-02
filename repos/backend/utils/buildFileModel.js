const { getType } = require('mime')
const { fileModel } = require('HerkinModels')
const { getLastModified } = require('../libs/fileSys')
const { HERKIN_ROOT } = require('HerkinBackConstants')
const { validFilename, uuid } = require('@keg-hub/jsutils')

const buildFileModel = async ({ location, ...modelData }) => {
  return fileModel({
    ...modelData,
    location,
    uuid: uuid(),
    mime: getType(location),
    name: location.split('/').pop(),
    relative: location.replace(HERKIN_ROOT, ''),
    lastModified: await getLastModified(location)
  })
}

module.exports = {
  buildFileModel
}