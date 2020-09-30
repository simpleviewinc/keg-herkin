import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Values } from 'SVConstants'
import { Feature, View } from 'SVComponents'
import { EmptyScreen } from './emptyScreen'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'

const { CATEGORIES } = Values

export const Screen = props => {
  const theme = useTheme()
  const { activeFeature } = useSelector(({ items }) => pickKeys(
    items,
    [ CATEGORIES.ACTIVE_FEATURE ]
  ), shallowEqual)

  const screenProps = {
    feature: activeFeature,
    // Add more screen props here
  }

  // Get the screen based on the passed in props
  const ScreenComp = activeFeature
    ? Feature
    : EmptyScreen

  return (
    <View className={`screen-main`} style={theme?.screens?.main} >
      <ScreenComp { ...screenProps } />
    </View>
  )


}