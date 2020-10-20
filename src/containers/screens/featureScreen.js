import React from 'react'
import { Values } from 'SVConstants'
import { Feature, Text, View } from 'SVComponents'
import { pickKeys } from '@keg-hub/jsutils'
import { useSelector, shallowEqual } from 'react-redux'

const { CATEGORIES } = Values

export const FeatureScreen = props => {
  const { activeData, features } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.ACTIVE_DATA, CATEGORIES.FEATURES ]
  ), shallowEqual)

  return !features || !activeData
    ? (
        <View>
          <Text>No feature selected!</Text>
        </View>
      )
    : (<Feature feature={features[activeData?.feature]} />)
}