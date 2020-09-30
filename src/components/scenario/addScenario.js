import React from 'react'
import { View, Text, Button } from 'SVComponents'

export const AddScenario = props => {

  return (
    <View 
      className={`add-scenario-main`}
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        padding: 15,
      }}
    >
      <Button className={`add-scenario-button`}>
        <Text>
          Add Scenario
        </Text>
      </Button>
    </View>
  )

}