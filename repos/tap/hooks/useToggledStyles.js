import { useMemo } from 'react'
import { deepMerge } from '@keg-hub/jsutils'
import { noOpObj } from 'SVUtils/helpers/noop'

export const useToggledStyles = (toggled, styles=noOpObj, openKey='open', closedKey='closed') => {
  return useMemo(() => {
    const toggleStyles = toggled ? styles[openKey] : styles[closedKey]
    return deepMerge(styles.default || styles, toggleStyles)
  }, [ toggled, styles ])
}