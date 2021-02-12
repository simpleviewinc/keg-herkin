import { isStr } from '@keg-hub/jsutils'

/**
 * Adds quotes to a string if they don't exist
 * @function
 * @public
 * @export
 * @param {string} str - String to have quotes added to it if needed
 *
 * @return {string} - Updated str with quotes added as needed
 */
export const addQuotes = str => {
  return !isStr(str)
    ? str
    : `${str[0] !== '"' ? '"' : ''}${str}${str[str.length -1] !== '"' ? '"' : ''}`
}