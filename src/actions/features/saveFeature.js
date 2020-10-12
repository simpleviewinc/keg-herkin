

export const saveFeature = (feature, scenario, step, param, value) => {
  const stepIndex = scenario.steps.indexOf(step)
  if(stepIndex === -1)
    console.warn(`Step does in exist in this scenario.\nOr the step prop was mutated!`)

  console.log(step.step.split(' '))


  console.log(`---------- param ----------`)
  console.log(param)
  console.log(`---------- value ----------`)
  console.log(value)

  console.log(`Parameter action Action not implemented!`)

}