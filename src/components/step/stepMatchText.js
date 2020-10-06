import React, { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Text, View } from '@keg-hub/keg-components'
import { buildStepFromDefinition } from 'SVUtils'

export const StepMatchText = props => {
  const theme = useTheme()
  const { styles, step, definition } = props
  const matchStyles = theme.get('step.matchText', styles)

  return (
    <View className={`step-text-container`} style={matchStyles.main} >
      <Text className={`step-text-text`} style={matchStyles.text} >
        {step.step}
      </Text>
    </View>
  )
}