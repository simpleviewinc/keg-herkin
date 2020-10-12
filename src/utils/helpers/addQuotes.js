import { isStr } from '@keg-hub/jsutils'

export const addQuotes = str => {
  return !isStr(str)
    ? str
    : `${str[0] !== '"' ? '"' : ''}${str}${str[str.length -1] !== '"' ? '"' : ''}`
}