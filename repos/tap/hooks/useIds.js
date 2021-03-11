
import { useMemo } from 'react'
import { doIt, uuid, eitherArr } from '@keg-hub/jsutils'

/**
 * Hook create and memoize a set of ids based on the passed in arguments
 * @function
 * @param {Array} arr - Items to create the IDs for
 *
 * @returns {Array} - Memoized set of Ids matching the length of the passed in array
 */
export const useIds = (arr) => {
  const deps = eitherArr(arr, [arr])
  return useMemo(() => {
    return doIt(arr.length, null, () => uuid())
  }, [ ...deps ])
}