"use strict"

const { Step } = require("./step")

const stepCache = {}

class StepParser {

  constructor(){
    this.When = this.addStep('When')
    this.Given = this.addStep('Given')
    this.Then = this.addStep('Then')
  }
  getSteps(file) {
    this.steps = []
    require(file).apply(this)
    return Promise.resolve(this.steps)
  }

  addStep(type) {
    return (signature, fn) => {
      const step = stepCache[signature] || new Step(signature.source, type)
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