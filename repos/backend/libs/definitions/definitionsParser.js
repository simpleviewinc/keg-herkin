const fs = require('fs')
const { isArr } = require('@keg-hub/jsutils')
const { Definition } = require("./definition")
const { REGEX_VARIANT, EXPRESSION_VARIANT } = require('../../constants')
const { stripComments } = require('../../utils/stripComments')
const { buildFileModel } = require('../../utils/buildFileModel')

let defCache = {}
const DEFINITION_REGEX = new RegExp(/(Given|When|Then|test)\(('|"|`|\/)(.*)('|"|`|\/),/, 'gm')

const getDefinitionContent = definitionMatch => {
  const content = definitionMatch.input.split(definitionMatch[0]).pop()
  return `${definitionMatch[0]}${content.split(definitionMatch[1]).shift()}`
}

class DefinitionsParser {

  constructor(){
    this.resetDefinitions()
  }

  resetDefinitions = () => { 
    // Holds the loaded defs
    // Used to check if a definition was already loaded
    defCache = {}
  }

  getDefinitions = async filePath => {
    if(defCache[filePath]) return defCache[filePath]

    // Holds the loaded defs fileModels by file name
    // This is what will be returned to the frontend
    defCache[filePath] = []

    const { fileModel, definitions } = await this.parseDefinition(filePath)

    definitions.map(({ match, type, variant, content }) => {
      if(!this.validateMatch(filePath, match, type)) return

      const definition = this.definitions[match] || new Definition(match, type, variant, content)
      !this.definitions[match] && (this.definitions[match] = definition)
      
      // Add a reference back to the parent
      definition.parentUuid = fileModel.uuid

      // Add the definition to the fileModels ast.definition array
      fileModel.ast.definitions.push(definition)
      
      return definition
    })

    defCache[filePath] = fileModel

    return defCache[filePath]
  }

  parseDefinition = (filePath) => {
    return new Promise((res, rej) => {
      const definitions = []
      fs.readFile(filePath, async (err, content) => {
        if(err) return rej(err)

        const contentStr = content.toString()
        const definitionFile = stripComments(contentStr)

        let definitionMatch
        while (definitionMatch = DEFINITION_REGEX.exec(definitionFile)) {
          const [ _, type, identifier, match ] = definitionMatch
          const variant = identifier === `/` ? REGEX_VARIANT : EXPRESSION_VARIANT
          definitions.push({
            type,
            variant,
            match: variant === REGEX_VARIANT ? new RegExp(match, `gm`) : match,
            content: getDefinitionContent(definitionMatch)
          })
        }

        const fileModel = await buildFileModel({
          location: filePath,
          content: contentStr,
          fileType: 'definition',
          // Set definitions as an empty array placeholder
          // Later we will add instances of the Definition class into it
          ast: { definitions: [] },
        })

        return res({ fileModel, definitions })
      })
    })
  }

  validateMatch = (filePath, match, type) => {
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