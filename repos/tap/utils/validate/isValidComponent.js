import { isValidElement } from 'react'
import { isFunc } from '@keg-hub/jsutils'

/**
 * Checks is a passed in argument is a valid React Component or function
 * @function
 * @export
 * @public
 * @param {*} Component - Item to check if it's a React Component or function
 *
 * @returns {boolean} - True if Component is a React Component or function
 */
export const isValidComponent = Component =>
  isValidElement(Component) || isFunc(Component)
