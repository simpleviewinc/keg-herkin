const fs = require('fs')
const { parkin } = require('HerkinParkin/instance')
const { isArr, capitalize } = require('@keg-hub/jsutils')
const { stripComments } = require('../../utils/stripComments')
const { buildFileModel } = require('../../utils/buildFileModel')

let defCache = {}

class DefinitionsParser {

  constructor(){
    this.resetDefinitions()
  }

  resetDefinitions = () => { 
    // Holds the loaded defs
    // Used to check if a definition was already loaded
    this.definitions = {}
    defCache = {}
  }

  getDefinitions = async filePath => {
    if(defCache[filePath]) return defCache[filePath]

    // Holds the loaded defs fileModels by file name
    // This is what will be returned to the frontend
    defCache[filePath] = {}

    const { fileModel } = await this.parseDefinition(filePath)
    const definitions = parkin.steps.list()

    definitions.map(def => {
      const fileHasDef = fileModel.content.includes(def.match)
      const isValidDef = this.validateMatch(def.match, def.type)

      // If the file model contains the step def
      // And it's a valid match string
      // Then add the def to the fileModels ast.definitions array
      fileHasDef &&
        isValidDef &&
        fileModel.ast.definitions.push({
          ...def,
          // Add a reference back to the parent
          parentUuid: fileModel.uuid
        })
    })

    defCache[filePath] = fileModel

    return defCache[filePath]
  }

  parseDefinition = (filePath) => {
    return new Promise((res, rej) => {

      // Require the file, to auto-load the definitions into parkin
      // Later we'll pull them from parkin
      const response = require(filePath)
      
      // Read the file to get it's content and build the fileModel
      fs.readFile(filePath, async (err, content) => {
        if(err) return rej(err)

        const contentStr = content.toString()
        const fileModel = await buildFileModel({
          location: filePath,
          content: contentStr,
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
    
    if(this.definitions[match])
      return console.warn(
        `Found 2 ${type} definitions with the same match of ${match} in the definition files!`
      )
    
    return match
  }

}

const definitionsParser = new DefinitionsParser()

module.exports = {
  DefinitionsParser: definitionsParser
}