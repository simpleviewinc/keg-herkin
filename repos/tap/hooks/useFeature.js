import { Values } from 'SVConstants'
import { useDefinitions } from './useDefinitions'
import { pickKeys } from '@keg-hub/jsutils'
import { useSelector, shallowEqual } from 'react-redux'

const { CATEGORIES } = Values

/**
 * gets the feature and definitions obj for a specific feature name
 * @param {string} featureName 
 * @returns {Object}
 */
export const useFeature = (featureName) => {
  if (!featureName) return
  const { features=[], definitions } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.ACTIVE_DATA, CATEGORIES.FEATURES, CATEGORIES.DEFINITIONS ]
  ), shallowEqual)

  const feature = features.filter((feature) => feature?.feature === featureName)[0]
  const defs = useDefinitions(feature, definitions)

  return { feature, definitions: defs }
}
