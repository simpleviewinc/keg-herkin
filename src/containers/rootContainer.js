import React, { useEffect } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import {
  View,
  Sidebar,
  Row,
  FeatureList,
  withAppHeader
} from 'SVComponents'

export const RootContainer = withAppHeader('KeGherkin Editor', props => {
  const theme = useTheme()
  const containerStyles =  theme.containers.root

  return (
    <View style={containerStyles.main}>
      <Sidebar style={ theme?.sideBar?.main } >
        <FeatureList />
      </Sidebar>
      <View style={ containerStyles.screen } >
        <Row>
        </Row>
      </View>
    </View>
  )
})
