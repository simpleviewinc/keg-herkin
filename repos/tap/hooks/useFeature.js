import { Values } from 'SVConstants'
import { noPropArr } from '@keg-hub/jsutils'
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

  const { features=noPropArr, definitionTypes } = useStoreItems([
    CATEGORIES.FEATURES,
    CATEGORIES.DEFINITION_TYPES
  ])

  const feature = features.find((feature) => {
    return name
      ? feature.name === name
      : path && feature?.location === path
  })

  const definitions = useDefinitions(feature, definitionTypes)

  return { feature, definitions }
}
