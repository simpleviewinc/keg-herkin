import { Values } from 'SVConstants'
import { useDefinitions } from './useDefinitions'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

const { CATEGORIES } = Values

/**
 * gets the feature and definitions obj for a specific feature name or filepath
 * @param {Object} props
 * @param {string=} props.name
 * @param {string=} props.path 
 * @returns {Object}
 */
export const useFeature = ({ name, path }) => {
  if (!name && !path) return
  const { features=[], definitions } = useStoreItems([
    CATEGORIES.ACTIVE_DATA,
    CATEGORIES.FEATURES,
    CATEGORIES.DEFINITIONS
  ])

  const feature = features.select((feature) => {
    return name
      ? feature?.ast?.feature === name
      : path && feature?.location === path
  })

  const defs = useDefinitions(feature, definitions)

  return { feature, definitions: defs }
}
