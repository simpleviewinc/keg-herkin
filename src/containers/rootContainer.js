import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import {
  View,
  Sidebar,
  Row,
  FeatureList,
  withAppHeader
} from 'SVComponents'

import { Screen } from './screens/screen'

export const RootContainer = withAppHeader('KeGherkin Editor', props => {
  const theme = useTheme()
  const containerStyles =  theme.containers.root

  return (
    <View className={`tap-main`} style={containerStyles.main}>
      <Sidebar style={ theme?.sideBar?.main } >
        <FeatureList />
      </Sidebar>
      <Screen />
    </View>
  )
})
