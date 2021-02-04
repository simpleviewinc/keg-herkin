import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { View, Text } from '@keg-hub/keg-components'


export const StepsDefinitionScreen = props => {
  const theme = useTheme()

  return (
    <View
      className={`steps-definition-screen`}
      style={theme.get(`screens.editors.main`)}
    >
      <Text>TBA</Text>
    </View>
  )
}