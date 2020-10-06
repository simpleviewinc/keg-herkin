import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Label, Row, Text, View } from '@keg-hub/keg-components'
import { Parameter } from './parameter'

export const Parameters = props => {
  const { definition, step, styles } = props
  const theme = useTheme()
  const paramStyles = theme.get('editStep.parameters', styles)

  return (
    <>
      <Label
        className={`step-edit-parameters-label`}
        style={paramStyles?.label}
      >
        Parameters
      </Label>
      <View
        className={`step-edit-parameters-main`}
        style={paramStyles?.container}
      >
        <Text>
          All Parameters here
        </Text>
      </View>
    </>
  )
}
