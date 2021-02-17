import React from 'react'
import { Values } from 'SVConstants'
import { useTheme } from '@keg-hub/re-theme'
import { View, Text } from '@keg-hub/keg-components'
import { useSelector, shallowEqual } from 'react-redux'
const { CATEGORIES, EDITOR_TABS } = Values

export const DefinitionList = props => {
  return (
    <View>
      <Text>Def List</Text>
    </View>
  )
}