import React from 'react'
import { View, Text, Touchable } from 'SVComponents'
import { useTheme } from '@keg-hub/re-theme'
import { addScenario } from 'SVActions/scenarios'

export const AddScenario = ({ feature, styles }) => {
  const theme = useTheme()
  const addStyles = theme.get(`scenarios.add`, styles)

  return (
    <View 
      className={`add-scenario-main`}
      style={addStyles.main}
    >
      <Touchable
        className={`add-scenario-action`}
        style={addStyles.action}
        onPress={() => addScenario(feature)}
      >
        <Text style={addStyles.text} >
          Add Scenario
        </Text>
      </Touchable>
    </View>
  )

}