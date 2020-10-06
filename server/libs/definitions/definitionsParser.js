"use strict"

const { Definition } = require("./definition")
let definitionCache = {}

const validateSignature = (signature, type) => {
  if(!signature)
    return console.warn(
      `Found a ${type} definition that contains an empty signature in the definition definition files!`
    )
  
  if(definitionCache[signature])
    return console.warn(
      `Found 2 ${type} definitions with the same signature of ${signature} in the definition files!`
    )
  
  return signature
}

class DefinitionsParser {

  constructor(){
    this.When = this.addStep('When')
    this.And = this.addStep('And' , `When`)
    this.Given = this.addStep('Given')
    this.Then = this.addStep('Then')
  }
  async getDefinitions(file) {
    this.definitions = []
    require(file).apply(this)
    const definitions = await Promise.resolve(this.definitions)
    this.definitionsLoaded = true

    return definitions
  }

  addStep(type, altType) {
    return (signature, fn) => {
      if(!this.definitionsLoaded && !validateSignature(signature, altType || type)) return

      const definition = definitionCache[signature] || new Definition(signature, type, altType)
      !definitionCache[signature] && (definitionCache[signature] = definition)

      this.definitions.push(definition)
    }
  }

  getComponents(file) {
    let components = []
    try {
      components = require(file).components
    }
    catch(err){}

    return Promise.resolve(components)
  }

}

const definitionsParser = new DefinitionsParser()

module.exports = {
  DefinitionsParser: definitionsParser
}