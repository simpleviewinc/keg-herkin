import { devLog } from '../devLog'

/**
 * Replaces a step in a scenario based on matching uuid of the steps
 * @function
 * @public
 * @export
 * @param {Object} scenario - Parsed scenario object to replace the step in
 * @param {Object} replaceWith - Step to replace the scenario step with
 *
 * @return {Object} - Scenario object with the matching step replaced by replaceWith param
 */
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