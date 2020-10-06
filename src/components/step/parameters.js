import React from 'react'
import { Label, Row, Text, View } from '@keg-hub/keg-components'
import { Parameter } from './parameter'

export const Parameters = props => {
  const { styles, step } = props

  return (
    <>
      <Label
        className={`step-edit-parameters-label`}
        style={styles?.label}
      >
        Parameters
      </Label>
      <View
        className={`step-edit-parameters-main`}
        style={styles?.container}
      >
        <Text>
          All Parameters here
        </Text>
      </View>
    </>
  )
}
