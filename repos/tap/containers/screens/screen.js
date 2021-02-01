import React, { useMemo, useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Values } from 'SVConstants'
import { View, Tabbar } from 'SVComponents'
import { EmptyScreen } from './emptyScreen'
import { BuilderScreen } from './builderScreen'
import { EditorScreen } from './editorScreen'
import { RunnerScreen } from './runnerScreen'
import { setScreen } from 'SVActions'
import { pickKeys } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'

const { CATEGORIES, SCREENS } = Values

const tabs = [
  {
    id: SCREENS.EMPTY,
    View: EmptyScreen,
  },
  {
    id: SCREENS.BUILDER,
    View: BuilderScreen,
    title: `Feature Builder`,
  },
  {
    id: SCREENS.EDITORS,
    View: EditorScreen,
    title: `Code Editor`,
  },
  {
    id: SCREENS.RUNNER,
    View: RunnerScreen,
    title: `Tests Runner`,
  },
]

const useScreen = screen => useMemo(() => {
  return tabs.find(item => item.id === screen) || tabs[3]
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