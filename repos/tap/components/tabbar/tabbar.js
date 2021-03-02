import { Tab } from './tab'
import { useStyle } from '@keg-hub/re-theme'
import { checkCall, mapColl, noOpObj } from '@keg-hub/jsutils'
import React, { useMemo, useCallback, useState, useLayoutEffect } from 'react'
import { View, isValidComponent, renderFromType } from '@keg-hub/keg-components'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants'

const { CATEGORIES } = Values

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

  /**
   * TODO: should extract useStoreItem ACTIVE_FILE method once we build out the separation of content by tabs
   *  * store fileModel per valid tab - allowing different files to be loaded on each tab
   *  * we should then be able to `showIndicator` based on the current tab.activeFile.modified
   */
  const { activeFile=noOpObj, pendingFiles=noOpObj } = useStoreItems([CATEGORIES.ACTIVE_FILE, CATEGORIES.PENDING_FILES])

  return mapColl(tabs, (index, tab) => {
    const { Tab:Component, tab:component, id, key, title, disableTab, ...tabProps } = tab

    const keyId = key || id || index
    return !Component && !component && !title
      ? null
      : (
          <Tab
            disabled={disableTab}
            className='tabbar-tab'
            key={ keyId }
            id={ id }
            { ...tabProps }
            title={title}
            styles={ styles }
            onTabSelect={ onTabSelect }
            active={ activeId === id }
            showIndicator={pendingFiles[activeFile?.location]}
          >
            { renderFromType(Component || component) }
          </Tab>
        )
  })
}

const ActiveTabView = ({ tab, styles }) => {
  const ViewComponent = tab && (tab.View || tab.view)
  return isValidComponent(ViewComponent)
    ? (<ViewComponent { ...tab } styles={ styles } />)
    : null
}

/**
 * 
 * @param {Object} props
 * @param {string} props.activeTab - active tab id
 * @param {Object} props.location - default 'bottom'
 * @param {Boolean} props.fixed
 * @param {Function} props.onTabSelect
 * @param {Array} props.tabs
 * @param {string} props.type
 */
export const Tabbar = props => {
  const {
    activeTab,
    location='bottom',
    fixed,
    onTabSelect,
    styles,
    tabs,
    type,
  } = props
  
  const addMethod = location === 'bottom' ? 'unshift' : 'push'

  const barStyles = useStyle(`tabbar.default`, `tabbar.${type}`)
  const mainStyles = useStyle(
    fixed && { ...barStyles.fixed.main, ...barStyles.fixed[location] },
    barStyles.bar.main,
    barStyles.bar[location],
  )

  const [ activeId, setActiveId ] = useState(activeTab)
  const CurrentTab = useCurrentTab(tabs, activeId)
  const tabSelectEvent = useTabSelect(tabs, activeId, onTabSelect, setActiveId)

  useCheckActiveTab(activeTab, activeId, setActiveId)

  const TabComponents = []

  tabs && TabComponents.push(
    <Bar
      className='tabbar-bar'
      key={'tabbar'}
      styles={mainStyles}
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

  tabs &&
    CurrentTab &&
    (CurrentTab.View || CurrentTab.view) &&
    TabComponents[addMethod](
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


