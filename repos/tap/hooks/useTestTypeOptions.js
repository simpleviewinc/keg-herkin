import { useMemo } from 'react'
import { Values } from 'SVConstants'
import { mapObj, capitalize } from '@keg-hub/jsutils'
const { FILE_TYPES } = Values

/**
 * Goes through the FILE_TYPES constants and creates the options array to pass onto Select Component
 * @returns {Array<{label:string, value:any}>}
 */
export const useTestTypeOptions = () => useMemo(() => {
  return mapObj(FILE_TYPES, (__, val) => {
    return {
      label: capitalize(val),
      value: val
    }
  })
}, [FILE_TYPES])