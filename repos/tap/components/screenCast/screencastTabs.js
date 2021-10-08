import { Tabbar } from 'SVComponents'
import { Values } from 'SVConstants'
import { isFunc } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { View, Button } from '@keg-hub/keg-components'
import React, { useCallback, useEffect, useState } from 'react'
import { startBrowser } from 'SVActions/screencast/api/startBrowser'
import { restartBrowser } from 'SVActions/screencast/api/restartBrowser'

const tabs = []

// TODO: Add browser actions and button here
const TestActions = props => {
  const styles = useStyle('runner.tabs')

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
      <View className='runner-tab-action-run' style={styles.actions.run} >
        <Button
          onClick={() => startBrowser()}
        >
          Start Browser
        </Button>
      </View>
      <View className='runner-tab-action-restart' style={styles.actions.run} >
        <Button
          onClick={() => restartBrowser()}
        >
          Restart Browser
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

export const ScreencastTabs = props => {

  const { activeTab, onTabSelect, onRun } = props

  const [tab, setTab] = useState(activeTab)

  const onSelectTab = useOnTabSelect(tab, setTab, onTabSelect)
  
  useEffect(() => {
    isFunc(onTabSelect) &&
      activeTab !== tab &&
      setTab(activeTab)
  }, [activeTab, onTabSelect, tab, setTab])

  return (
    <Tabbar
      type='code'
      activeTab={tab}
      location='bottom'
      onTabSelect={onSelectTab}
      tabs={[ ...tabs, { onRun, id: `test-actions`, Tab: TestActions }]}
    />
  )
  
}