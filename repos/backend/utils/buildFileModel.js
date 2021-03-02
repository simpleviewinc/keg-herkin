const { getType } = require('mime')
const { fileModel } = require('HerkinModels')
const { HERKIN_ROOT } = require('HerkinBackConstants')
const { getTestFileType } = require('./getTestFileType')
const { validFilename, uuid } = require('@keg-hub/jsutils')
const { getLastModified } = require('../libs/fileSys/fileSys')

const buildFileModel = async ({ location, ...modelData }) => {
  return fileModel({
    ...modelData,
    location,
    uuid: uuid(),
    mime: getType(location),
    name: location.split('/').pop(),
    fileType: getTestFileType(location),
    relative: location.replace(HERKIN_ROOT, ''),
    lastModified: await getLastModified(location)
  })
}

module.exports = {
  buildFileModel
}