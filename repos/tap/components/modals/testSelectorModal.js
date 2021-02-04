import React from 'react'
import { Modal, Button, ItemHeader, View, Text } from '@keg-hub/keg-components'
import { DropDown } from 'SVComponents'
import { useTheme } from '@keg-hub/re-theme'
import { createNewFeature } from 'SVActions/features'

export const TestSelectorModal = (props) => {
  const {
    title = 'Test Settings',
    visible=true
  } = props

  const theme = useTheme()
  const builtStyles = theme.get(`modals.testSelectorModal`)

  return (
    <Modal
      visible={visible}
      styles={builtStyles?.modal}
    >
      <ItemHeader
        title={title}
        styles={builtStyles?.itemHeader}
      />
      <View style={builtStyles?.form?.main}>
        <DropDown
          title={'Select test type:'}
          onValueChange={(props) => console.log(props)}
          // options={[]}
        />
        <TestFileSelect styles={builtStyles?.form?.testFileSelect} />
      </View>
    </Modal>
  )
}

/**
 * 
 */
const TestFileSelect = ({styles}) => {

  return (
    <View style={styles?.main}>
      <DropDown
        styles={styles?.dropDown}
        title={'Select test file:'}
        onValueChange={(props) => console.log(props)}
        // options={[]}
      />
      <Text style={styles?.orText}>OR</Text>
      <Button
        themePath='button.contained.primary'
        styles={styles?.button}
        content={'Create new file'}
        onPress={createNewFeature}
      />
    </View>
  )
}