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
  
  const [ toggled, setToggled ] = useState(true)
  
  const onToggled = useCallback(toggledUpdate => {
    setToggled(toggledUpdate)
  }, [ toggled, setToggled ])
  

  return (
    <View className={`tap-main`} style={containerStyles.main}>
      <Sidebar 
        initial={-250}
        to={0}
        toggled={toggled}
        onToggled={onToggled}
      >
        <FeatureList />
      </Sidebar>
      <Screen sideToggled={toggled} />
    </View>
  )
})
