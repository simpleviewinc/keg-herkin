import { devLog } from '../devLog'

export const replaceScenarioStep = (scenario, replaceWith) => {

  if(!scenario || !scenario?.steps) 
    return devLog.warn(`Scenario steps missing, can't replace step!`, scenario) || scenario

  if(!replaceWith || !replaceWith?.uuid) 
    return devLog.warn(`Invalid steps, can't replace scenario step!`, replaceWith) || scenario

  const replaced = scenario.steps.map(step => {
    return step.uuid === replaceWith.uuid ? replaceWith : step
  })

  return { ...scenario, steps: replaced }

}