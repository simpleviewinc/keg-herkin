import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { View, Button } from '@keg-hub/keg-components'
import { isFunc, deepMerge, noPropArr, noOpObj } from '@keg-hub/jsutils'
import { RunTestsButton, Tabbar } from 'SVComponents'


/**
 * TestActions Component - Displays results screen actions for updating test files
 * @param {Object} props
 */
const TestActions = props => {
  const {
    actionStyles=noOpObj,
    onRun,
  } = props

  return (
    <View
      style={actionStyles?.main}
      className={`results-tab-actions`}
    >
      <View
        style={actionStyles?.run}
        className={`results-tab-actions-save`}
      >
        <RunTestsButton
          onRun={onRun}
          runAllTests={false}
        />
      </View>
    </View>
  )
}

/**
 * Helper hook to memoizing the tabs to be displayed
 * @param {Object} tabs - Tabs for the Editor screen
 * @param {String} TestActions - React Component to render the test actions
 * @param {Object} options - Options for configuring the tabs
 *
 * @returns {Array} - Tabs to be rendered for the Editor Component
 */
const useActionsTab = (
  tabs=noPropArr,
  TestActions,
  { onRun, styles }
) => useMemo(() => {

  const extraActionTabs = [{
    onRun,
    id: `test-actions`,
    Tab: TestActions,
    disableTab: true,
    actionStyles: styles?.default,
  }]

  return tabs.concat(extraActionTabs)

}, [
  tabs,
  onRun,
  styles,
  TestActions,
])

/**
 * Helper callback hook for memoizing switching between results tabs
 * @param {Object} tab - Current tab that is active
 * @param {String} setTab - Method of update the current tab in the local state
 * @param {Object} onTabSelect - Callback passed in from props
 *
 * @returns {function} - Callback called when a tab is clicked
 */
const useOnTabSelect = (tab, setTab, onTabSelect) => useCallback(newTab => {
  if(newTab === `test-actions`) return
  
    return isFunc(onTabSelect)
      ? onTabSelect(newTab, tab)
      : (tab !== newTab && setTab(newTab)) || true
}, [ tab, setTab, onTabSelect ])

/**
 * EditorTabs Component - Displays the tabs for the results screen
 * @param {Object} props
 * @param {Object} props.activeTab - Currently active tab
 * @param {Object} props.onTabSelect - Callback for when the tab is changed
 */
export const ResultsTabs = props => {
  const { activeTab, onTabSelect, tabs=noPropArr } = props

  const [tab, setTab] = useState(activeTab)
  const tabSelect = useOnTabSelect(tab, setTab, onTabSelect)

  useEffect(() => {
    isFunc(onTabSelect) &&
      activeTab !== tab &&
      setTab(activeTab)
  }, [activeTab, onTabSelect, tab, setTab])

  const barTabs = useActionsTab(tabs, TestActions, props)

  console.log(`---------- barTabs ----------`)
  console.log(barTabs)

  return (
    <Tabbar
      type='results'
      fixed
      tabs={barTabs}
      activeTab={tab}
      location='bottom'
      onTabSelect={tabSelect}
    />
  )
  
}
