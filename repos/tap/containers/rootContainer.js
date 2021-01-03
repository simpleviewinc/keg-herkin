import React, { useEffect, useState, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import {
  View,
  Sidebar,
  FeatureList,
  withAppHeader
} from 'SVComponents'
import { init } from 'SVActions'
import { Screen } from './screens/screen'

export const RootContainer = withAppHeader('KeGherkin Editor', props => {
  const theme = useTheme()
  const containerStyles =  theme.containers.root

  useEffect(() => {
    init()
  }, [])

  return (
    <View className={`tap-main`} style={containerStyles.main}>
      <Sidebar 
        initial={-250}
        to={0}
        toggled={false}
      >
        <FeatureList />
      </Sidebar>
      <Screen />
    </View>
  )
})
