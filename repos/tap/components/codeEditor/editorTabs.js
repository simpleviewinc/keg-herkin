import { Tabbar } from 'SVComponents'
import { Values } from 'SVConstants'
import { isFunc, noOpObj, deepMerge } from '@keg-hub/jsutils'
import { View, Button } from '@keg-hub/keg-components'
import React, { useCallback, useEffect, useState, useMemo } from 'react'

const { EDITOR_TABS } = Values

/**
 * TestActions Component - Displays editor screen actions for updating test files
 * @param {Object} props
 */
const TestActions = ({ actionStyles, onRun, onSave, showFeatureTabs, isDefinitionsTab }) => {
  const [ isSaving, setIsSaving ] = useState(false)
  return (
    <View
      style={actionStyles.main}
      className={`editor-tab-actions`}
    >
      <View
        style={actionStyles.save}
        className={`editor-tab-actions-save`}
      >
        <Button
          type='primary'
          disabled={isSaving}
          onClick={() => onSave(setIsSaving)}
          className={`editor-tab-actions-save-button`}
        >
          {
            isSaving
              ? 'Saving in progress..'
              : 'Save'
          }
        </Button>
      </View>
      { onRun && (
        <View
          style={actionStyles.run}
          className={`editor-tab-actions-save`}
        >
          <Button
            type='secondary'
            onClick={onRun}
            className={`editor-tab-actions-run-button`}
          >
            Run
          </Button>
        </View>
      )}
    </View>
  )
}

/**
 * Group of tabs that can be displayed 
 * @type Object
 */
const tabs = [
  EDITOR_TABS.FEATURE,
  EDITOR_TABS.DEFINITIONS,
  EDITOR_TABS.BDD_SPLIT,
]

/**
 * Helper hook to memoizing the tabs to be displayed
 * @param {Object} tabs - Tabs for the Editor screen
 * @param {String} TestActions - React Component to render the test actions
 * @param {Object} options - Options for configuring the tabs
 *
 * @returns {Array} - Tabs to be rendered for the Editor Component
 */
const useActionsTab = (
  tabs,
  TestActions,
  { onRun, onSave, showFeatureTabs, showRun, styles }
) => useMemo(() => {

  const extraActionTabs = [{
    onSave,
    showFeatureTabs,
    id: `test-actions`,
    Tab: TestActions,
    disableTab: true,
    ...(showRun && { onRun }),
    actionStyles: deepMerge(styles?.default, showRun ? styles?.showRun : null),
  }]

  return showFeatureTabs
    ? tabs.concat(extraActionTabs)
    : extraActionTabs

}, [
  tabs,
  onRun,
  onSave,
  styles,
  showRun,
  TestActions,
  showFeatureTabs,
])

/**
 * Helper callback hook for memoizing switching between editor tabs
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
 * EditorTabs Component - Displays the tabs for the editor screen
 * @param {Object} props
 * @param {Object} props.activeTab - Currently active tab
 * @param {Object} props.onTabSelect - Callback for when the tab is changed
 */
export const EditorTabs = props => {
  const { activeTab, onTabSelect } = props

  const [tab, setTab] = useState(activeTab)
  const tabSelect = useOnTabSelect(tab, setTab, onTabSelect)

  useEffect(() => {
    isFunc(onTabSelect) &&
      activeTab !== tab &&
      setTab(activeTab)
  }, [activeTab, onTabSelect, tab, setTab])

  const barTabs = useActionsTab(tabs, TestActions, props)

  return (
    <Tabbar
      type='code'
      fixed
      tabs={barTabs}
      activeTab={tab}
      location='bottom'
      onTabSelect={tabSelect}
    />
  )
  
}