import { hasDomAccess } from '@keg-hub/jsutils'

/**
* Checks if the current window has a different parent window
* @function
* @private
*
* @return {boolean} - True if window.parent is not the same as window
*/
export const checkIframe = () => {
  return Boolean(hasDomAccess() && window.parent !== window)
}