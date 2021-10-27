import React, { useMemo } from 'react'
import { Tab } from './tab'
import { mapColl } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { TabbarPortal } from './tabbarPortal'
import { View, isValidComponent, renderFromType } from '@keg-hub/keg-components'

/**
 * Renders the TabBar Tabs from the passed in tabs array prop
 * @param {Object} props
 */
const Tabs = React.memo(({ activeId, tabs, styles, onTabSelect }) => {
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
          >
            { renderFromType(Component || component) }
          </Tab>
        )
  })
})

/**
 * Active View component of the currently Active Tab
 * @param {Object} props
 */
const ActiveTabView = React.memo(({ tab, styles }) => {
  const ViewComponent = tab && (tab.View || tab.view)
  return isValidComponent(ViewComponent)
    ? (<ViewComponent { ...tab } styles={styles} />)
    : null
})

/**
 * Renders the Bar that wraps the passed in Tabs
 * @param {Object} props
 */
const BarComponent = React.memo(props => {

  const {
    fixed,
    tabs,
    location,
    activeId,
    barStyles,
    onSelectTab,
  } = props

  const containerStyles = useStyle(
    fixed && { ...barStyles?.fixed?.main, ...barStyles?.fixed[location] },
    barStyles?.bar?.main,
    barStyles?.bar[location],
  )

  return (
    <View
      className='tabbar-bar'
      style={containerStyles}
    >
      <Tabs
        tabs={tabs}
        activeId={activeId}
        styles={barStyles.tab}
        onTabSelect={onSelectTab}
      />
    </View>
  )
})

/**
 * Component children of the TabBar Component
 * Renders the Tabs in a bar based on location and the Active Tabs view
 * @param {Object} props
 *
 */
export const TabChildren = props => {
  const {
    tabs,
    fixed,
    activeId,
    location,
    barStyles,
    CurrentTab,
    onSelectTab,
  } = props

  const TabView = useMemo(() => (
    CurrentTab && (CurrentTab.View || CurrentTab.view)
      ? (
          <View
            className='tabview-main'
            key='tabview-main'
            style={barStyles.tabview}
          >
            <ActiveTabView
              tab={CurrentTab}
              styles={barStyles}
            />
          </View>
        )
      : null
  ), [barStyles, CurrentTab])

  const Bar = (
    <BarComponent
      key={'tabbar'}
      tabs={tabs}
      fixed={fixed}
      activeId={activeId}
      location={location}
      barStyles={barStyles}
      onSelectTab={onSelectTab}
    />
  )

  return location === 'bottom'
    ? (
        <TabbarPortal>
          {TabView}
          {Bar}
        </TabbarPortal>
      )
    : [Bar, TabView]
}
