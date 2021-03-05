import { useTheme } from '@keg-hub/re-theme'
import { Tabbar } from 'SVComponents'
import { Values } from 'SVConstants'
import { isFunc } from '@keg-hub/jsutils'
import { View, Button } from '@keg-hub/keg-components'
import React, { useCallback, useEffect, useState } from 'react'

const { DEFINITION_TABS } = Values

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
    id: DEFINITION_TABS.LIST,
    title: `List`,
  },
  {
    id: DEFINITION_TABS.ACTIVE,
    title: `Active`,
  },
]

const useOnTabSelect = (tab, setTab, onTabSelect) => useCallback(newTab => {
    return isFunc(onTabSelect)
      ? onTabSelect(newTab, tab)
      : (tab !== newTab && setTab(newTab)) || true
}, [ tab, setTab, onTabSelect ])

export const DefinitionTabs = props => {

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
      type='definitions'
      tabs={tabs}
      activeTab={tab}
      location='top'
      onTabSelect={tabSelect}
    />
  )
  
}
