import React, { useMemo } from 'react'
import { checkCall } from '@keg-hub/jsutils'
import { useTheme, useThemeHover } from '@keg-hub/re-theme'
import { Text, View, Touchable } from '@keg-hub/keg-components'
import { buildStepFromDefinition } from 'SVUtils'
import { noOpObj } from 'SVUtils/helpers/noop'
import { Values } from 'SVConstants'

const { EMPTY_PARAM } = Values

const ParameterText = props => {
  const {
    styles,
    onPress,
    text,
    uuid,
  } = props

  const [ ref, paramStyles] = useThemeHover({
    ...styles?.main,
    ...( text.trim() === EMPTY_PARAM ? styles?.empty : noOpObj )
  }, styles?.hover)

  return (
    <Touchable
      className={`step-parameter-text`}
      style={styles.touchable}
      onPress={() => checkCall(onPress, uuid)}
    >
      <Text
        ref={ref}
        style={[styles.text, paramStyles]}
      >
        {text}
      </Text>
    </Touchable>
  )
}

const useStepMatchText = (step, definition, matchStyles, onPress) => {
  return useMemo(() => {
    return definition.tokens.reduce((matchText, token) => {
      matchText.push(
        !token.dynamic
          ? (
              <Text
                key={token.uuid}
                style={matchStyles.text}
              >
                {`${token.value} `}
              </Text>
            )
          : (
              <ParameterText
                key={token.uuid}
                uuid={token.uuid}
                styles={matchStyles?.parameter}
                text={`${step.dynamicMap[token.index] || EMPTY_PARAM} `}
                onPress={onPress}
              />
            )
      )

      return matchText
    }, [])
  }, [step, definition, matchStyles.text, matchStyles.parameter])
  
}

export const StepMatchText = props => {
  const theme = useTheme()
  const { styles, step, definition, highlightAction } = props
  const matchStyles = theme.get('step.matchText', styles)
  const matchText = useStepMatchText(step, definition, matchStyles, highlightAction)

  return (
    <View className={`step-text-container`} style={matchStyles.main} >
      <Text className={`step-text-text`} style={matchStyles.text} >
        {matchText}
      </Text>
    </View>
  )
}