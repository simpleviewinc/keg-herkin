import React from 'react'
import { Loading, View, Text } from '@keg-hub/keg-components'

/**
 * TestsRunning
 * @param {Object} props
 * @param {Object} props.styles - Custom styles
 * 
 * @returns {Component}
 */
export const TestsRunning = ({ styles }) => {
  return (
    <View
      style={styles?.main}
      className={`tests-running-main`}
    >
      <Loading
        style={styles?.loading}
        size={styles?.loading?.size || 'large'}
        color={styles?.loading?.color}
      />
      <Text
        style={styles?.text}
        className={`tests-running-text`}
      >
        Tests Running
      </Text>
    </View>
  )
}
