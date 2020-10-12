import { devLog } from '../devLog'
import { addQuotes } from '../helpers/addQuotes'

const spaceHolder = `__PARAM_SPACE__`

const checkInputValue = (value, current, param) => {
  const updated = param?.type !== 'string' || current.indexOf('"') !== 0 ? value : addQuotes(value)

  // Replace any spaces, so our step split does not get messed up
  return updated.replace(/\s/g, spaceHolder)
}

export const updateStepIndex = (step, value, row, param) => {

  if(!step || !step.step) 
    return devLog.warn(`Step string missing, can't update step index!`, step) || step
  
  const { index, value:current } = row
  const valueUpdate = checkInputValue(value, current, param)

  // TODO: fix spacers for inputs
  // Because we are splitting on space
  // It's causing issues updating the value
  // Need to figure out better way to handle this

  const stepStr = step.step
  const replaced = stepStr.split(' ')
    .map((word, i) => i === index ? valueUpdate : word)
    .join(' ')

  const updated = step.step !== replaced

  return {
    ...step,
    step: replaced,
    dynamicMap: {
      ...step?.dynamicMap,
      ...(step.step !== replaced && { [index]: valueUpdate })
    }
  }
}