const fs = require('fs')
const path = require('path')
const { pathExists, readFile } = require('../libs/fileSys/fileSys')

const getFileContent = async location => {
  const [ err, exists ] = await pathExists(location)
  if(!exists || err) return undefined
  
  const [ __, content ] = await readFile(location)
  return content
}

module.exports = {
  getFileContent
}