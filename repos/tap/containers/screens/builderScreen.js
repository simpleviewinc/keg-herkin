import React from 'react'
import { Feature, Text, View } from 'SVComponents'
import { useActiveFile } from 'SVHooks/useActiveFile'

export const BuilderScreen = props => {
  const feature = useActiveFile()

  return !features
    ? (
        <View>
          <Text>No feature selected!</Text>
        </View>
      )
    : (<Feature feature={feature} />)
}