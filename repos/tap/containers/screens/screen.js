import { Values } from 'SVConstants'
import { View, Tabbar } from 'SVComponents'
import { EmptyScreen } from './emptyScreen'
import { deepMerge } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { RunnerScreen } from './runnerScreen'
import { ResultsScreen } from './resultsScreen'
import { EditorScreen } from './editorScreen'
import { BuilderScreen } from './builderScreen'
import React, { useMemo, useCallback } from 'react'
import { setScreen } from 'SVActions/screens/setScreen'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

const { CATEGORIES, SCREENS } = Values

/**
 * Local tabs matching the screenModels in the store
 * @type Array
 */
const screenTabs = [
  {
    id: SCREENS.EMPTY,
    View: EmptyScreen,
  },
  // {
  //   id: SCREENS.BUILDER,
  //   View: BuilderScreen,
  //   title: `Feature Builder`,
  // },
  {
    id: SCREENS.EDITOR,
    View: EditorScreen,
    title: `Code Editor`,
  },
  {
    id: SCREENS.RESULTS,
    View: ResultsScreen,
    title: `Tests Results`,
  },
  // {
  //   id: SCREENS.RUNNER,
  //   View: RunnerScreen,
  //   title: `Tests Runner`,
  // },
]

/**
 * Hook to merge the local tabs with the screenModels to make a screenTab
 * @type function
 * @param {string} id - Id of the active screen, uses the stores active screen if not passed
 *
 * @returns {Object} screenTab - screenModel and screenTab objects merged
 */
const useScreenTab = id => {
  const screenModels = useStoreItems(CATEGORIES.SCREENS)

  return useMemo(() => {
    // If an id is passed use that for finding the screen, otherwise use the active 
    const foundTab = screenTabs.find(item => (
      id ? item.id === id : screenModels[item.id].active
    )) 

    // Default to returning an empty screen
    return foundTab
      ? deepMerge(screenModels[foundTab.id], foundTab)
      : screenTabs[0]

  }, [id, screenModels, screenTabs])
}

/**
 * Screen - Renders Tabs component of screen tabs, from the props or active screen in the store
 * @param {object} props
 * @param {object} [props.activeScreen] - Currently active screen
 */
export const Screen = props => {

  const theme = useTheme()
  const screenTab = useScreenTab(props?.activeScreen)

  const onTabSelect = useCallback(screenId => {
    screenId !== screenTab?.id && setScreen(screenId)
    return true
  }, [ screenTab, setScreen ])

  if(!screenTab) return null

  return (
    <View
      className={`screen-parent-main`}
      style={theme?.screens?.parent?.main}
    >
      <Tabbar
        location={'top'}
        tabs={screenTabs}
        fixed
        type={'screens'}
        activeTab={screenTab.id}
        onTabSelect={onTabSelect}
      />
    </View>
  )

}