import { isStr } from '@keg-hub/jsutils'

export const removeQuotes = str => {
  return !isStr(str)
    ? str
    : str.substring(
        str[0] === '"' ? 1 : 0,
        str[str.length -1 ] === '"' ? str.length - 1 : str.length 
      )
}