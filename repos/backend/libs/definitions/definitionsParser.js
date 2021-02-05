const fs = require('fs')
const { isArr } = require('@keg-hub/jsutils')
const { Definition } = require("./definition")
const { REGEX_VARIANT, EXPRESSION_VARIANT } = require('../../constants')
const { stripComments } = require('../../utils/stripComments')

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
    this.definitions = {}
  }

  getDefinitions = async filePath => {
    if(defCache[filePath]) return defCache[filePath]

    // Holds the loaded defs by file name
    // This is what will be returned to the frontend
    defCache[filePath] = []

    const definitions = await this.parseDefinition(filePath)

    const loadedDefs = definitions.map(({ match, type, variant, content }) => {
      if(!this.validateMatch(filePath, match, type)) return

      const definition = this.definitions[match] || new Definition(match, type, variant, content)
      !this.definitions[match] && (this.definitions[match] = definition)

      return definition
    })

    defCache[filePath] = loadedDefs

    return defCache[filePath]
  }

  parseDefinition = (filePath) => {
    return new Promise((res, rej) => {
      const definitions = []
      fs.readFile(filePath, (err, content) => {
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

        return res(definitions)
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