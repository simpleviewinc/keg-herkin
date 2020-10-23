import { useTheme } from '@keg-hub/re-theme'
import { Tabbar } from 'SVComponents'
import { Values } from 'SVConstants'
import { isFunc } from '@keg-hub/jsutils'
import { View, Button } from '@keg-hub/keg-components'
import React, { useCallback, useEffect, useState } from 'react'


const { EDITOR_MODES } = Values

const TestActions = props => {
  return (
    <View style={{ flexDirection: 'row' }} >
      <View style={{ marginRight: 15 }} >
        <Button type='primary'>
          Save
        </Button>
      </View>
      <View >
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

const tabs = [
  {
    id: EDITOR_MODES.SPLIT,
    title: `Split`,
  },
  {
    id: EDITOR_MODES.FEATURE,
    title: `Feature`,
  },
  {
    id: EDITOR_MODES.DEFINITIONS,
    title: `Definitions`,
  },
]



const useOnTabSelect = (tab, setTab, onTabSelect) => useCallback(newTab => {
  if(newTab ===  `test-actions`) return
  
    return isFunc(onTabSelect)
      ? onTabSelect(newTab, tab)
      : (tab !== newTab && setTab(newTab)) || true
}, [ tab, setTab, onTabSelect ])

export const EditorTabs = props => {
  const { activeTab, onTabSelect, onRun } = props
  const [tab, setTab] = useState(activeTab || EDITOR_MODES.SPLIT)
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