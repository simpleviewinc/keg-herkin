import { isStr } from '@keg-hub/jsutils'

/**
 * Removes quotes from a string if they exist
 * @function
 * @public
 * @export
 * @param {string} str - String to have quotes removed if needed
 *
 * @return {string} - Updated str with out quotes
 */
export const removeQuotes = str => {
  return !isStr(str)
    ? str
    : str.substring(
        str[0] === '"' ? 1 : 0,
        str[str.length -1 ] === '"' ? str.length - 1 : str.length 
      )
}