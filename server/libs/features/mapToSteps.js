const addStepError = (feature, step) => {
  feature.errors = feature.errors || {}
  feature.errors.steps = feature.errors.steps || {}
  feature.errors.steps[step.uuid] = (
    `Could not find step definition for this step!\n` +
    `To fix this issue, either change the step definition in the feature file\n` +
    `Or add a valid matching the step definition.`
  )
}

const matchExpressionDefinition = (step, definitions) => {
  
}

const matchRegExDefinition = (step, definition) => {
  if(!definition || !definition.name) return
  const regEx = new RegExp(definition.name)

  const match = regEx.test(step.step)
  match && (step.definition = definition.uuid)

  return match
}

const mapStepToDefinition = (feature, step, definitions) => {
  const foundMatch = definitions.reduce((hasMatch, definition) => {
    return hasMatch
      ? hasMatch
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
            definitions[step.type] &&
              mapStepToDefinition(feature, step, definitions[step.type])
          })
      })

   })

   return features
 }
 
 module.exports = {
   mapToSteps
 }