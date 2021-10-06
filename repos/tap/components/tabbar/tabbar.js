import { Tab } from './tab'
import { Values } from 'SVConstants'
import { TabChildren } from './tabChildren'
import { TabbarPortal } from './tabbarPortal'
import { useStyle } from '@keg-hub/re-theme'
import { checkCall, noPropArr } from '@keg-hub/jsutils'
import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { View } from '@keg-hub/keg-components'

const { CATEGORIES } = Values

/**
 * Hooks to Set the active tab id when a tab is selected
 * Calls the onTabSelect method when it exists
 * If onTabSelect returns true, updating the active tab ID is skipped
 * @param {Array} tabs - Tab Objects that can be selected
 * @param {function} onTabSelect - Callback for when a tab is selected
 * @param {function} setActiveId - Method to update the active Tab ID
 *
 * @returns {function} - Callback function for when a tab is clicked
 */
const useTabSelect = (tabs, onTabSelect, setActiveId) => useCallback(id => {
  if(!tabs) return

  // Call the event hook, and if it returns true, then skip the state update
  const skip = checkCall(onTabSelect, id, tabs)
  // If nothing is returned, then update the tab id
  skip !== true && setActiveId(id)

}, [tabs, onTabSelect])

/**
 * Finds the active tab object from the passed in activeTab id
 * @param {Array} tabs - Tab Objects that can be selected
 * @param {string|number} activeId - The active tabs ID
 *
 * @returns {Object} - Found activeTab Object
 */
const useCurrentTab = (tabs, activeId) => useMemo(() =>
  tabs.find(tab => tab.id === activeId),
  [tabs, activeId]
)

/**
 * Finds the active tab object from the passed in activeTab id
 * @param {Array} tabs - Tab Objects that can be selected
 * @param {string|number} activeId - The active tabs ID
 * @param {function} setActiveId - Method to update the active Tab ID
 *
 * @returns {Void}
 */
const useCheckActiveTab = (activeTab, activeId, setActiveId) => useEffect(() => 
  { activeTab !== activeId && setActiveId(activeTab) },
  [activeTab, activeId, setActiveId]
)

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

  const barStyles = useStyle(`tabbar.default`, `tabbar.${type}`)
  const [activeId, setActiveId] = useState(activeTab)
  const CurrentTab = useCurrentTab(tabs, activeId)
  const onSelectTab = useTabSelect(tabs, onTabSelect, setActiveId)

  useCheckActiveTab(activeTab, activeId, setActiveId)

  return (
    <View className='tabbar-main' style={ barStyles.main } >
      {tabs && (
        <TabChildren
          tabs={tabs}
          fixed={fixed}
          activeId={activeId}
          location={location}
          barStyles={barStyles}
          CurrentTab={CurrentTab}
          onSelectTab={onSelectTab}
        />
      )}
    </View>
  )

}


