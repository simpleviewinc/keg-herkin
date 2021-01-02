
import { useMemo } from 'react'
import { doIt, uuid, eitherArr } from '@keg-hub/jsutils'

export const useIds = (arr) => {
  const deps = eitherArr(arr, [arr])
  return useMemo(() => {
    return doIt(arr.length, null, () => uuid())
  }, [ ...deps ])
}