import React from 'react'
import { View, H5 } from '@keg-hub/keg-components'

/**
 * NoActiveDefinition - Displays when not definition is active as an activeAltFile 
 * @param {Object} props
 * @param {Object} props.styles - Custom styles for displaying the component
 *
 * @returns {Component}
 */
export const NoActiveDefinition = ({ styles=noOpObj }) => {
  return (
    <View
      className={'empty-definitions-main'}
      style={styles.main}
    >
      <H5
        className={'empty-definitions-text'}
        style={styles.text}
      >
        No Active Definition
      </H5>
    </View>
  )
}