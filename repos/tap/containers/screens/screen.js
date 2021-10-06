import { Values } from 'SVConstants'
import { View, Tabbar } from 'SVComponents'
import { EmptyScreen } from './emptyScreen'
import { useTheme } from '@keg-hub/re-theme'
import { RunnerScreen } from './runnerScreen'
import { ResultsScreen } from './resultsScreen'
import { EditorScreen } from './editorScreen'
import { BuilderScreen } from './builderScreen'
import React, { useMemo, useCallback } from 'react'
import { ClipboardCheck, Code } from 'SVAssets/icons'
import { useScreenSelect } from 'SVHooks/useScreenSelect'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { deepMerge, isEmpty, exists } from '@keg-hub/jsutils'
import { setScreenById } from 'SVActions/screens/setScreenById'

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
    Icon: Code,
    title: `Code Editor`,
  },
  {
    id: SCREENS.RUNNER,
    View: RunnerScreen,
    Icon: Code,
    title: `Tests Runner`,
  },
  {
    id: SCREENS.RESULTS,
    View: ResultsScreen,
    Icon: ClipboardCheck,
    title: `Tests Results`,
  },
]

/**
 * Hook to merge the local tabs with the screenModels to make a screenTab
 * @type function
 * @param {string} id - Id of the active screen, uses the stores active screen if not passed
 *
 * @returns {Object} screenTab - screenModel and screenTab objects merged
 */
const useScreenTab = (id, screenModels) => {
  return useMemo(() => {
    // If an id is passed use that for finding the screen, otherwise use the active 
    const foundTab = screenTabs.find(item => (
      id ? item.id === id : screenModels[item.id].active
    )) 

    // Default to returning an empty screen
    return foundTab
      ? deepMerge(screenModels[foundTab.id], foundTab)
      : screenTabs[0]

  }, [id, screenModels])
}

/**
 * Screen - Renders Tabs component of screen tabs, from the props or active screen in the store
 * @param {object} props
 * @param {object} [props.activeScreen] - Currently active screen
 */
export const Screen = props => {

  const theme = useTheme()
  const screenModels = useStoreItems(CATEGORIES.SCREENS)
  const screenTab = useScreenTab(props?.activeScreen, screenModels)
  const onTabSelect = useScreenSelect(screenTab, screenModels)

  return screenTab && (
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
  ) || null

}