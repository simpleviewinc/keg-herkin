import React, { isValidElement, useMemo, useCallback, useState } from 'react'
import { Tab } from './tab'
import { TabView } from './tabview'
import { checkCall, mapColl } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { isValidComponent } from 'SVUtils/validate'

const barStyles = {
  main: {
    flex: 1,
    flexGrow: 1,
  },
  fixed: {
    main: {
      position: 'fixed',
      right: 0,
      left: 0,
    },
    top: {
      top: 0,
    },
    bottom: {
      bottom: 0
    }
  },
  container: {
  },
  tabview: {
    main: {
      flex: 1,
      flexDirection: 'row',
      borderTopWidth: 1,
    },
    container: {
      padding: 30,
    },
    scroll: {
      
    },
  },
  bar: {
    bottom: {
      minHeight: 50,
      flexDirection: 'row',
    },
    top: {
      minHeight: 30,
      flexDirection: 'row',
    }
  },
  tab: {
    default: {
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
      },
      text: {
        textAlign: 'center',
        marginBottom: 0,
      },
      icon: {
        before: {
          
        },
        after: {
          
        },
      }
    },
    active: {
      
    },
  }
}

const _onScroll = event => {}

const Bar = ({ children, styles }) => {
  return (
    <View style={ styles } >
      { children }
    </View>
  )
}

const Tabs = ({ activeIndex, tabs, styles, onTabSelect }) => {
  return useMemo(() => {
    return mapColl(tabs, (index, tab) => {
      const { Component, component, id, key, ...tabProps } = tab
      const keyId = key || id || index
      return (
        <Tab
          className='tabbar-tab'
          key={ keyId }
          id={ keyId }
          { ...tabProps }
          styles={ styles }
          onTabSelect={ onTabSelect }
          active={ activeIndex === index }
        >
          { Component || component }
        </Tab>
      )
    })
  }, [ activeIndex, tabs, styles ])
}

const ActiveScreen = ({ tab, styles }) => {
  const Screen = tab && (tab.Screen || tab.screen)
  return isValidComponent(Screen)
    ? (<Screen { ...tab } styles={ styles } />)
    : null
}

export const Tabbar = props => {
  const {
    activeTab,
    location='bottom',
    fixed,
    onScroll,
    onTabSelect,
    scroll,
    styles,
    tabs,
    themePath,
    type='default',
  } = props
  
  const theme = useTheme()

  const scrollEvent = useCallback((event) => {
    checkCall(onScroll, event)
    _onScroll(event)
  }, [ _onScroll, onScroll ])

  const [ activeIndex, setActiveIndex ] = useState(activeTab)
  const active = tabs[activeIndex]

  const tabSelectEvent = useCallback((index) => {
    if(!tabs) return

    // Call the event hook, and if it returns true, then skip the state update
    const skip = checkCall(onTabSelect, index, tabs)

    // If nothing is returned, then update the tab index
    !skip && setActiveIndex(index)

  }, [ tabs ])


  const TabComponents = []
  const addMethod = location === 'bottom' ? 'unshift' : 'push'

  tabs && TabComponents.push(
    <Bar
      className='tabbar-bar'
      key={ 'tabbar' }
      styles={theme.join(
        barStyles.bar[location],
        fixed && { ...barStyles.fixed.main, ...barStyles.fixed[location] }
      )}
    >
    { tabs && (
      <Tabs 
        tabs={ tabs }
        activeIndex={ activeIndex }
        styles={ barStyles.tab }
        onTabSelect={ tabSelectEvent }
      />
    )}
    </Bar>
  )

  tabs && TabComponents[addMethod](
    <TabView
      className='tabbar-view'
      key={ 'tabview' }
      scroll={ scroll }
      onScroll={ scrollEvent }
      styles={ barStyles.tabview }
    >
      <ActiveScreen tab={ active } styles={ barStyles } />
    </TabView>
  )

  return (
    <View className='tabbar-main' style={ barStyles.main } >
      { TabComponents }
    </View>
  )

}


