import React, { useCallback } from 'react'
import { pickKeys, exists, noOp } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { useSelector, shallowEqual } from 'react-redux'
import { setActiveFile } from 'SVActions/files/local/setActiveFile'
import {
  View,
  SimpleList,
  Loading,
} from 'SVComponents'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values
const onHeaderPress = noOp
const drawerProps = { variant: 'sidebar' }

/**
 * builtFeatureList - Helper to get a formatted list of features to work with SimpleList
 * @param {Array} features - Features group to build the formatted list from
 * @param {Object} activeFeature - Active feature or the active screen
 *
 * @returns {Object} - Formatted list that works with Simple List component
 */
const builtFeatureList = (features, activeFeature={}) => {
  return {
    features: {
      group: 'Features',
      items: features.map(feature => ({
        title: feature?.ast?.feature,
        active: feature?.ast?.feature === activeFeature?.ast?.feature
      }))
    }
  }
}

/**
 * FeatureList - Displays a list of features
 * @param {Object} props
 *
 * @returns {Component}
 */
export const FeatureList = props => {

  const theme = useTheme()

  const { features, activeFeature } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.FEATURES, CATEGORIES.ACTIVE_FEATURE ]
  ), shallowEqual)

  const onItemPress = useCallback((event, item) => {
    const match = features.find(feature => feature?.ast?.feature === item.title)
    match && setActiveFile(match)
    
  }, [ features ])


  const feature = exists(activeFeature?.index) && features[activeFeature?.index]

  return !features
    ? (<Loading />)
    : (
        <View style={theme?.features?.list?.main}>
          <SimpleList
            items={ builtFeatureList(features, feature) }
            onHeaderPress={ onHeaderPress }
            onItemPress={ onItemPress }
            drawerProps={ drawerProps }
          />
        </View>
      )

}