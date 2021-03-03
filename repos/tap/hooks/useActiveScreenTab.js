import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { reduceObj } from '@keg-hub/jsutils'
import { useMemo } from 'react'
import { Values } from 'SVConstants'

const { CATEGORIES, SCREENS } = Values
/**
 * @type function
 * @param {string} id - Id of the active screen, uses the stores active screen if not passed
 *
 * @returns {Object} screenModel - screenModel
 */
export const useActiveScreenTab = id => {
  const screenModels = useStoreItems(CATEGORIES.SCREENS)
  console.log(screenModels[SCREENS.EMPTY])
  return useMemo(() => {
    if (screenModels && screenModels[id]) return screenModels[id]
    const model = reduceObj(screenModels, (__, screenModel, obj) => {
      return screenModel?.active
        ? screenModel
        : obj
    })

    // return empty screen if nothing is found
    return model
      ? model
      : screenModels[SCREENS.EMPTY]

  }, [id, screenModels])
}