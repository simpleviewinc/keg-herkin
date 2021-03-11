
/**
 * Formats a string input into a valid file name
 * @function
 * @param {string} input - The input to be formatted into a valid file name 
 *
 * @returns {string} - Formatted input as a valid file name
 */
export const formatFileName = input => {
  return input.replace(/(^\.|[\s\\:\*\?'"<>;,`*()\|+$])/g, '')
}