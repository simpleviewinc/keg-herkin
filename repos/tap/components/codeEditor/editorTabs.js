import { Tabbar } from 'SVComponents'
import { Values } from 'SVConstants'
import { isFunc, noOpObj, deepMerge } from '@keg-hub/jsutils'
import { View, Button } from '@keg-hub/keg-components'
import React, { useCallback, useEffect, useState, useMemo } from 'react'

const { EDITOR_TABS } = Values

const TestActions = ({ actionStyles, onRun, onSave, showFeatureTabs }) => {
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
      { showFeatureTabs && (
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

const tabs = [
  EDITOR_TABS.FEATURE,
  EDITOR_TABS.DEFINITIONS,
  EDITOR_TABS.BDD_SPLIT,
]

const useActionsTab = (
  tabs,
  TestActions,
  { onRun, onSave, showFeatureTabs, styles }
) => useMemo(() => {
  const extraActionTabs = [{
    onRun,
    onSave,
    showFeatureTabs,
    id: `test-actions`,
    Tab: TestActions,
    disableTab: true,
    actionStyles: deepMerge(styles?.default, showFeatureTabs ? styles?.feature : null),
  }]

  return showFeatureTabs
    ? tabs.concat(extraActionTabs)
    : extraActionTabs

}, [
  tabs,
  onRun,
  onSave,
  styles,
  TestActions,
  showFeatureTabs,
])

const useOnTabSelect = (tab, setTab, onTabSelect) => useCallback(newTab => {
  if(newTab === `test-actions`) return
  
    return isFunc(onTabSelect)
      ? onTabSelect(newTab, tab)
      : (tab !== newTab && setTab(newTab)) || true
}, [ tab, setTab, onTabSelect ])

export const EditorTabs = props => {
  const { activeTab, onTabSelect } = props

  const [tab, setTab] = useState(activeTab || EDITOR_TABS.BDD_SPLIT.id)
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
      tabs={barTabs}
      activeTab={tab}
      location='bottom'
      onTabSelect={tabSelect}
    />
  )
  
}