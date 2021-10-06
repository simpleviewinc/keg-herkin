import { Values } from 'SVConstants'
import { RunnerTabs } from './runnerTabs'
import { useStyle } from '@keg-hub/re-theme'
import React, { useCallback, useState, useMemo } from "react"

const { SCREENS } = Values

const useTabSelect = (activeTab, setActiveTab) => useCallback(tab => {
  activeTab !== tab && setActiveTab(tab)
  return true
}, [activeTab, setActiveTab])

export const Runner = props => {

  const {
    activeFile,
    autoRun=false,
    activeTab,
    parentMethods,
    prefix,
    tests,
    title,
  } = props

  const runnerStyles = useStyle('runner')
  const [tab, setTab] = useState(activeTab)
  const tabSelect = useTabSelect(tab, setTab)

  // TODO: Add VNC screenCast here code here
  // Remove from results screen
  return (
    <>
      <RunnerTabs
        activeTab={tab}
        onTabSelect={tabSelect}
      />
    </>
  )
}
