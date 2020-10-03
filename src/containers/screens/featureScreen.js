import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Values } from 'SVConstants'
import { Feature } from 'SVComponents'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'

const { CATEGORIES } = Values

export const FeatureScreen = props => {
  const { activeData, features } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.ACTIVE_DATA, CATEGORIES.FEATURES ]
  ), shallowEqual)

  return (
    <Feature feature={features[activeData?.feature]} />
  )
}