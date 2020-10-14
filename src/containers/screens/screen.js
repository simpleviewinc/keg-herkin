import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Values } from 'SVConstants'
import { View } from 'SVComponents'
import { EmptyScreen } from './emptyScreen'
import { FeatureScreen } from './featureScreen'
import { EditorScreen } from './editorScreen'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'

const { CATEGORIES, SCREENS } = Values

export const Screen = props => {

  const theme = useTheme()
  const { activeData } = useSelector(({ items }) => pickKeys(
    items,
    [CATEGORIES.ACTIVE_DATA]
  ), shallowEqual) || {}

  let RenderScreen = EmptyScreen

  switch(activeData?.screen){
    case SCREENS.FEATURES: {
      RenderScreen = FeatureScreen
      break
    }
    case SCREENS.EDITORS: {
      RenderScreen = EditorScreen
      break
    }
  }

  return (
    <View
      className={`screen-parent-main`}
      style={theme?.screens?.parent?.main}
    >
      <EditorScreen {...props} />
    </View>
  )

}