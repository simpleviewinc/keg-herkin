import React from 'react'
import { View, ScrollView } from '@keg-hub/keg-components'


export const TabView = ({ children, onScroll, scroll, styles }) => {
  return (
    <ScrollView
      scrollEventThrottle={ (scroll && scroll.throttle) || 16 }
      { ...scroll }
      contentContainerStyle={ styles.main }
      style={ styles.scroll }
      onScroll={ onScroll }
    >
      <View style={ styles.container } >
        { children }
      </View>
    </ScrollView>
    
  )
}