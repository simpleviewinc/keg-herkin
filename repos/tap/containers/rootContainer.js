import React, {useState} from 'react'
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

  const [sidebarToggled, setSidebarToggled] = useState(false)
  return (
    <View className={`tap-main`} style={containerStyles.main}>
      <Sidebar 
        initial={-250}
        to={0}
        toggled={sidebarToggled}
        onToggled={setSidebarToggled}
      >
        <SidebarContent
          sidebarToggled={sidebarToggled} 
          onSidebarToggled={setSidebarToggled}
        />
      </Sidebar>
      <Screen />
    </View>
  )
})
