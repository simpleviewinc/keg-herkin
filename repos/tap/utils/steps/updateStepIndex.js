import { devLog } from '../devLog'
import { addQuotes } from '../helpers/addQuotes'
import { exists } from '@keg-hub/jsutils'

const checkInputValue = (value, current, param) => {
  return param?.type !== 'string' || current.indexOf('"') !== 0 ? value : addQuotes(value)
}

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