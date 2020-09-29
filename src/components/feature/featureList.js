import React, { useEffect, useState, useCallback } from 'react'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { useSelector, shallowEqual } from 'react-redux'
import { getRemoteFeatures, setFeatureActive } from 'SVActions/features'
import { getRemoteSteps } from 'SVActions/steps'

import {
  View,
  SimpleList,
  Loading,
} from 'SVComponents'
import { Values } from 'SVConstants'
const { CATEGORIES } = Values


const onHeaderPress = () => {}

const builtFeatureList = (features, activeFeature={}) => {
  return {
    features: {
      group: 'Features',
      items: features.map(feature => ({
        title: feature.feature,
        active: activeFeature.feature === feature.feature
      }))
    }
  }
}

const drawerProps = { variant: 'sideBar' }
export const FeatureList = props => {

  const { features, activeFeature } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.FEATURES, CATEGORIES.ACTIVE_FEATURE ]
  ), shallowEqual)

  const theme = useTheme()
  useEffect(() => {
    getRemoteSteps()
    getRemoteFeatures()
  }, [])

  const onItemPress = useCallback((event, item) => {
    const match = features.find(feature => feature.feature === item.title)
    match && setFeatureActive(match)
    
  }, [ features ])

  return !features
    ? (<Loading />)
    : (
        <View style={theme?.features?.list?.main}>
          <SimpleList
            items={ builtFeatureList(features, activeFeature) }
            onHeaderPress={ onHeaderPress }
            onItemPress={ onItemPress }
            drawerProps={ drawerProps }
          />
        </View>
      )

}