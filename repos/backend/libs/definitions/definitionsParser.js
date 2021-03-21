const fs = require('fs')
const { parkin } = require('HerkinParkin/instance')
const { isArr, capitalize } = require('@keg-hub/jsutils')
const { stripComments } = require('../../utils/stripComments')
const { buildFileModel } = require('../../utils/buildFileModel')

class DefinitionsParser {

  getDefinitions = async filePath => {
    const { fileModel } = await this.parseDefinition(filePath)

    // The definitions get auto-loaded into the parkin instance
    // from the require call in the parseDefinition method below
    const definitions = parkin.steps.list()

    definitions.map(def => {
      // If the file model contains the step def
      // And it's a valid match string
      // Then add the def to the fileModels ast.definitions array
      fileModel.content.includes(def.match.toString()) &&
        this.validateMatch(def.match, def.type) &&
        fileModel.ast.definitions.push({
          ...def,
          // Add a reference back to the parent
          location: filePath
        })
    })

    return fileModel
  }

  parseDefinition = (filePath) => {
    return new Promise((res, rej) => {
      // We still want to load the file content
      // Even if the require call fails
      // So wrap if in a try catch, and log the error if it happends
      let response
      try {

        // Always clear out the node require cache
        // This ensure we get a fresh file every time
        // Otherwise changed files would not get reloaded
        if(require.cache[filePath])
          delete require.cache[filePath]

        // Require the file, to auto-load the definitions into parkin
        // Later we'll pull them from parkin
        response = require(filePath)
      }
      catch(err){
        console.log(`Could not load step definition file ${filePath}`)
        console.log('')
        console.error(err.message)
      }

      // Read the file to get it's content and build the fileModel
      fs.readFile(filePath, async (err, content) => {
        if(err) return rej(err)

        const fileModel = await buildFileModel({
          location: filePath,
          content: content.toString(),
          fileType: 'definition',
          ast: { definitions: [] },
        })

        return res({ fileModel })
      })
    })
  }

  validateMatch = (match, type) => {
    if(!match)
      return console.warn(
        `Found a ${type} definition that contains an empty match in the definition definition files!`
      )

    return match
  }

}

const definitionsParser = new DefinitionsParser()

module.exports = {
  DefinitionsParser: definitionsParser
}