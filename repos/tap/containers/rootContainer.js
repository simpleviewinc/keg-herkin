import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import {
  View,
  Sidebar,
  withAppHeader,
} from 'SVComponents'
import { SidebarContent } from 'SVComponents/sidebar'
import { Screen } from './screens/screen'

export const RootContainer = withAppHeader('KeGherkin Editor', props => {
  const theme = useTheme()
  const containerStyles =  theme.containers.root

  return (
    <View className={`tap-main`} style={containerStyles.main}>
      <Sidebar 
        initial={-250}
        to={0}
        toggled={false}
      >
        <SidebarContent />
      </Sidebar>
      <Screen />
    </View>
  )
})
