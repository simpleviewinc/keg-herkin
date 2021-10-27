import React, { useCallback, useEffect, useState } from 'react'
import { Tabbar } from 'SVComponents'
import { Values } from 'SVConstants'
import { isFunc, checkCall, noOpObj } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { View, Button } from '@keg-hub/keg-components'
import { startBrowser } from 'SVActions/screencast/api/startBrowser'
import { restartBrowser } from 'SVActions/screencast/api/restartBrowser'

const tabs = []

const useHandleEvent = (cb, data=noOpObj) => {
  return useCallback((event) => {
    event.stopPropagation()
    event.preventDefault()
    checkCall(cb, data, event)
  }, [cb, data])
}

// TODO: Add browser actions and button here
const TestActions = props => {
  const styles = useStyle('runner.tabs')
  const onStartClick = useHandleEvent(startBrowser)
  const onRestartClick = useHandleEvent(restartBrowser)

  return (
    <View className='runner-tab-action-save' style={styles.main} >
      <View className='runner-tab-action-run' style={styles.actions.run} >
        <Button
          type='secondary'
          onClick={props.onRun}
        >
          Run Tests
        </Button>
      </View>
      <View className='runner-tab-action-run' style={styles.actions.run} >
        <Button
          onClick={onStartClick}
        >
          Start Browser
        </Button>
      </View>
      <View className='runner-tab-action-restart' style={styles.actions.run} >
        <Button
          onClick={onRestartClick}
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

  const {
    noVnc,
    onRun,
    canvasRef,
    activeTab,
    onTabSelect,
    // TODO: Pass in all custom actions for interacting with the Vnc Canvas
    actions,
  } = props

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