const { exists } = require('@keg-hub/jsutils')
const { NOT_PARAMETER, NOT_REPLACE, NOT_INDEX } = require('../../constants')

const addStepError = (feature, step) => {
  feature.errors = feature.errors || {}
  feature.errors.steps = feature.errors.steps || {}
  feature.errors.steps[step.uuid] = (
    `Could not find step definition for this step!\n` +
    `To fix this issue, either change the step in the feature file\n` +
    `Or create a matching step definition.`
  )
}

const mapDynamicIndexes = (step, definition) => {
  step.definition = definition.uuid

  const stepSplit = step.step.split(' ')

  if(definition.NOT_INDEX && !step.step.includes(` not `))
    stepSplit.splice(definition.NOT_INDEX, 0, NOT_PARAMETER)

  step.dynamicMap = definition.tokens.reduce((mapped, token) => {
    if(!token || !token.dynamic || !exists(token.index)){
      !token &&
        !exists(token.index) &&
        console.warn(`Invalid token found in step definition`, token, definition)

      return mapped
    }

    const value = stepSplit[token.index]
    mapped[token.index] = value === NOT_PARAMETER ? '' : stepSplit[token.index]

    return mapped
  }, {})

}

const matchExpressionDefinition = (step, definition) => {
  const cleanedStep = step.step.replace(/\s*".*"\s*/g, '')
  const cleanedDef = definition.name.replace(/\s*{.*}\s*/g, '')
  if(cleanedStep !== cleanedDef) return false
  mapDynamicIndexes(step, definition)
}

const matchRegExDefinition = (step, definition) => {
  if(!definition || !definition.name) return
  const regEx = new RegExp(definition.name)


  const match = regEx.test(step.step)
  match && mapDynamicIndexes(step, definition)

  return match
}

const mapStepToDefinition = (feature, step, definitions) => {
  const foundMatch = definitions.reduce((hasMatch, definition) => {
    
    return hasMatch
      ? hasMatch
      : definition.variant === 'expression'
        ? matchExpressionDefinition(step, definition)
        : matchRegExDefinition(step, definition)
  }, false)

  !step.definition && addStepError(feature, step)
 }
 
 const mapToSteps = (features, definitions) => {
   features.map(feature => {
     feature &&
      feature.scenarios &&
      feature.scenarios.map(scenario => {
        scenario &&
          scenario.steps && 
          scenario.steps.map(step => {
            const stepType = step.altType || step.type
            definitions[stepType] &&
              mapStepToDefinition(feature, step, definitions[stepType])
          })
      })

   })

   return features
 }
 
 module.exports = {
   mapToSteps
 }