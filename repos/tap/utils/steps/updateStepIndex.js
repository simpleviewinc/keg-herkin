import { devLog } from '../devLog'
import { addQuotes } from '../helpers/addQuotes'
import { exists } from '@keg-hub/jsutils'

/**
 * Checks the param type and adds quotes the the value if needed
 * @function
 * @private
 * @param {string} value - Dynamic value to add to the step string
 * @param {Object} current - Current value of the step to be replaced
 * @param {Object} param - The step param that can be dynamically set
 *
 * @return {string} Updated value with quotes when needed
 */
const checkInputValue = (value, current, param) => {
  return param?.type !== 'string' || current.indexOf('"') !== 0 ? value : addQuotes(value)
}

/**
 * Updates the parameter of a step within a scenario
 * Maps dynamic values of a Steps matcher to the value
 * @function
 * @public
 * @export
 * @param {Object} step - Parsed step object of a step definition
 * @param {string} value - Dynamic value to add to the step string
 * @param {Object} row - Current row of a step being evaluated
 * @param {Object} param - The step param that can be dynamically set
 *
 * @return {Object} - Updated step with the matching text updated 
 */
export const updateStepIndex = (step, value, row, param) => {

  if(!step || !exists(step.step)) 
    return devLog.warn(`Step string missing, can't update step index!`, step) || step
  
  const { index, value:current } = row
  const quoted = checkInputValue(value, current, param)
  const replaced = step.step.replace(current, quoted)

  return {
    ...step,
    step: replaced,
    dynamicMap: {
      ...step?.dynamicMap,
      ...(step.step !== replaced && { [index]: quoted })
    }
  }
}