"use strict"

const { Step } = require("./step")
let stepCache = {}

const validateSignature = (signature, type) => {
  if(!signature)
    return console.warn(
      `Found a ${type} definition that contains an empty signature in the step definition files!`
    )
  
  if(stepCache[signature])
    return console.warn(
      `Found 2 ${type} definitions with the same signature of ${signature} in the definition files!`
    )
  
  return signature
}

class StepParser {

  constructor(){
    this.When = this.addStep('When')
    this.And = this.addStep('And' , `When`)
    this.Given = this.addStep('Given')
    this.Then = this.addStep('Then')
  }
  async getSteps(file) {
    this.steps = []
    require(file).apply(this)
    const steps = await Promise.resolve(this.steps)
    this.stepsLoaded = true

    return steps
  }

  addStep(type, altType) {
    return (signature, fn) => {
      if(!this.stepsLoaded && !validateSignature(signature, altType || type)) return

      const step = stepCache[signature] || new Step(signature, type, altType)
      !stepCache[signature] && (stepCache[signature] = step)

      this.steps.push(step)
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

const stepParser = new StepParser()

module.exports = {
  StepParser: stepParser
}