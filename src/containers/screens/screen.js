import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Values } from 'SVConstants'
import { Feature, View } from 'SVComponents'
import { EmptyScreen } from './emptyScreen'
import { FeatureScreen } from './featureScreen'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'

const { CATEGORIES, SCREENS } = Values


export const Screen = props => {
  const { sideToggled } = props

  const theme = useTheme()
  const { activeData } = useSelector(({ items }) => pickKeys(
    items,
    [CATEGORIES.ACTIVE_DATA]
  ), shallowEqual) || {}


  // Get the screen based on the passed in props
  const ScreenComp = activeData?.screen === CATEGORIES.FEATURES
    ? FeatureScreen
    : EmptyScreen

  return (
    <View
      className={`screen-main`}
      style={theme.get(
        theme?.screens?.root?.main,
        !sideToggled && theme?.screens?.root?.closed
      )}
    >
      <ScreenComp {...props} />
    </View>
  )


}