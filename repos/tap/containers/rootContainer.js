import React, {useState} from 'react'
import { useTheme } from '@keg-hub/re-theme'
import {
  View,
  Sidebar,
  withAppHeader,
} from 'SVComponents'
import { SidebarContent } from 'SVComponents/sidebar'
import { Screen } from './screens/screen'
import { useActiveFile, useVisibleModal } from 'SVHooks'

const sideBarConfig = {
  speed: 1,
  bounciness: 1,
}

export const RootContainer = withAppHeader('KeGherkin Editor', props => {
  const theme = useTheme()
  const containerStyles =  theme.containers.root

  const activeFile = useActiveFile()
  // Auto open the sidebar to allow selecting a file, if no file is already active
  const [sidebarToggled, setSidebarToggled] = useState(
    !useVisibleModal() && !Boolean(activeFile.location)
  )

  return (
    <View className={`tap-main`} style={containerStyles.main}>
      <Sidebar 
        initial={-250}
        to={0}
        type={'spring'}
        config={sideBarConfig}
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
