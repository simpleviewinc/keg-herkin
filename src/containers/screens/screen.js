import React, { useMemo, useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Values } from 'SVConstants'
import { View, Tabbar } from 'SVComponents'
import { EmptyScreen } from './emptyScreen'
import { FeatureScreen } from './featureScreen'
import { EditorScreen } from './editorScreen'
import { setScreen } from 'SVActions'
import { pickKeys, capitalize } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'

const { CATEGORIES, SCREENS } = Values

const tabs = [
  {
    id: SCREENS.EMPTY,
    View: EmptyScreen,
  },
  {
    id: SCREENS.FEATURES,
    View: FeatureScreen,
    title: `Feature Builder`,
  },
  {
    id: SCREENS.EDITORS,
    View: EditorScreen,
    title: `Code Editor`,
  },
]

const useScreen = screen => useMemo(() => {
  return tabs.find(item => item.id === screen) || tabs[0]
}, [screen])

export const Screen = props => {

  const theme = useTheme()
  const { activeData } = useSelector(({ items }) => pickKeys(
    items,
    [CATEGORIES.ACTIVE_DATA]
  ), shallowEqual) || {}

  const screen = useScreen(activeData?.screen)
  
  const onTabSelect = useCallback(tabId => {
    setScreen(tabId)
    return true
  }, [ screen.index ])


  return (
    <View
      className={`screen-parent-main`}
      style={theme?.screens?.parent?.main}
    >
      <Tabbar
        location='top'
        tabs={tabs}
        activeTab={screen.id}
        onTabSelect={onTabSelect}
      />
    </View>
  )

}