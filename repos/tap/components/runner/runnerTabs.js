import { useTheme } from '@keg-hub/re-theme'
import { Tabbar } from 'SVComponents'
import { Values } from 'SVConstants'
import { isFunc } from '@keg-hub/jsutils'
import { View, Button } from '@keg-hub/keg-components'
import React, { useCallback, useEffect, useState } from 'react'

// TODO: Setup tabs for displaying test running info
// Create tabs for:
// Tests only / Results only / Both

const tabs = []

const TestActions = props => {
  const theme = useTheme()
  const styles = theme.get('runner.tabs')

  return (
    <View className='runner-tab-action-save' style={styles.main} >
      <View style={styles.actions.save} >
        <Button type='primary'>
          Save
        </Button>
      </View>
      <View className='runner-tab-action-run' style={styles.actions.run} >
        <Button
          type='secondary'
          onClick={props.onRun}
        >
          Run
        </Button>
      </View>
    </View>
  )
}

const useOnTabSelect = (tab, setTab, onTabSelect) => useCallback(newTab => {
  if(newTab ===  `test-actions`) return

  return isFunc(onTabSelect)
    ? onTabSelect(newTab, tab)
    : (tab !== newTab && setTab(newTab)) || true

}, [ tab, setTab, onTabSelect ])

export const RunnerTabs = props => {
  const { activeTab, onTabSelect, onRun } = props
  const [tab, setTab] = useState(activeTab)
  const tabSelect = useOnTabSelect(tab, setTab, onTabSelect)
  
  useEffect(() => {
    isFunc(onTabSelect) &&
      activeTab !== tab &&
      setTab(activeTab)
  }, [activeTab, onTabSelect, tab, setTab])

  return (
    <Tabbar
      type='editor'
      tabs={[ ...tabs, { onRun, id: `test-actions`, Tab: TestActions }]}
      activeTab={tab}
      location='bottom'
      onTabSelect={tabSelect}
    />
  )
  
}