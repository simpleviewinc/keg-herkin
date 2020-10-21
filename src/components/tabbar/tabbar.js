import { Tab } from './tab'
import { useTheme } from '@keg-hub/re-theme'
import { checkCall, mapColl } from '@keg-hub/jsutils'
import React, { useMemo, useCallback, useState, useLayoutEffect } from 'react'
import { View, isValidComponent, renderFromType } from '@keg-hub/keg-components'

const useTabSelect = (tabs, activeTab, onTabSelect, setActiveId) => useCallback((id) => {
  if(!tabs) return

  // Call the event hook, and if it returns true, then skip the state update
  const skip = checkCall(onTabSelect, id, tabs)

  // If nothing is returned, then update the tab id
  !skip && setActiveId(id)

}, [tabs, activeTab, onTabSelect, setActiveId])

const useCurrentTab = (tabs, activeId) => useMemo(() =>
  tabs.find(tab => tab.id === activeId),
  [tabs, activeId]
)

const useCheckActiveTab = (activeTab, activeId, setActiveId) => useLayoutEffect(() => 
  { activeTab !== activeId && setActiveId(activeTab) },
  [activeTab, activeId, setActiveId]
)

const Bar = ({ children, styles }) => {
  return (
    <View
      className='tabbar'
      style={ styles }
    >
      { children }
    </View>
  )
}

const Tabs = ({ activeId, tabs, styles, onTabSelect }) => {
  return useMemo(() => {
    return mapColl(tabs, (index, tab) => {
      const { Tab:Component, tab:component, id, key, title, ...tabProps } = tab

      const keyId = key || id || index
      return !Component && !component && !title
        ? null
        : (
            <Tab
              className='tabbar-tab'
              key={ keyId }
              id={ id }
              { ...tabProps }
              title={title}
              styles={ styles }
              onTabSelect={ onTabSelect }
              active={ activeId === id }
            >
              { renderFromType(Component || component) }
            </Tab>
          )
    })
  }, [ activeId, tabs, styles ])
}

const ActiveTabView = ({ tab, styles }) => {
  const ViewComponent = tab && (tab.View || tab.view)
  return isValidComponent(ViewComponent)
    ? (<ViewComponent { ...tab } styles={ styles } />)
    : null
}

export const Tabbar = props => {
  const {
    activeTab,
    location='bottom',
    fixed,
    onTabSelect,
    styles,
    tabs,
    type='default',
  } = props
  
  const addMethod = location === 'bottom' ? 'unshift' : 'push'

  const theme = useTheme()
  const barStyles = theme.get(`tabbar.${type}`)
  const [ activeId, setActiveId ] = useState(activeTab)
  const CurrentTab = useCurrentTab(tabs, activeId)
  const tabSelectEvent = useTabSelect(tabs, activeId, onTabSelect, setActiveId)

  useCheckActiveTab(activeTab, activeId, setActiveId)

  const TabComponents = []

  tabs && TabComponents.push(
    <Bar
      className='tabbar-bar'
      key={'tabbar'}
      styles={theme.join(
        barStyles.bar.main,
        barStyles.bar[location],
        fixed && { ...barStyles.fixed.main, ...barStyles.fixed[location] }
      )}
    >
    { tabs && (
      <Tabs 
        tabs={ tabs }
        activeId={ activeId }
        styles={ barStyles.tab }
        onTabSelect={ tabSelectEvent }
      />
    )}
    </Bar>
  )

  tabs && TabComponents[addMethod](
    <View
      className='tabview-main'
      key='tabview-main'
      style={barStyles.tabview}
    >
      <ActiveTabView tab={ CurrentTab } styles={ barStyles } />
    </View>
  )

  return (
    <View className='tabbar-main' style={ barStyles.main } >
      { TabComponents }
    </View>
  )

}


