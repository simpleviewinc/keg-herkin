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
import { useStoreItems } from 'SVHooks/store/useStoreItems'

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
    id: SCREENS.EDITOR,
    View: EditorScreen,
    title: `Code Editor`,
  },
  {
    id: SCREENS.RUNNER,
    View: RunnerScreen,
    title: `Tests Runner`,
  },
]

const useScreen = id => useMemo(() => {
  return tabs.find(item => item.id === id) || tabs[2]
}, [id])

export const Screen = props => {

  const theme = useTheme()
  const activeTab  = useStoreItems(CATEGORIES.ACTIVE_TAB) || {}

  const screen = useScreen(activeTab?.id)
  const onTabSelect = useCallback(tabId => {
    tabId !== activeTab?.id && setScreen(tabId)
    return true
  }, [ activeTab, setScreen ])

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