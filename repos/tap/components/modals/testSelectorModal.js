import React from 'react'
import { Modal, Button, ItemHeader, View, Text } from '@keg-hub/keg-components'
import { DropDown } from 'SVComponents'
import { useTheme } from '@keg-hub/re-theme'
import { createNewFeature } from 'SVActions/features'
import { Values } from 'SVConstants'
import { mapObj, capitalize } from '@keg-hub/jsutils'

const { TEST_TYPE } = Values

/**
 * Goes through the TEST_TYPE constants and creates the options array to pass onto DropDown Component
 * @returns {Array<{label:string, value:string}>}
 */
const getTypeOptions = () => {
  return mapObj(TEST_TYPE, (__, val) => {
    return {
      label: capitalize(val),
      value: val
    }
  })
}

const getTestFilesOptions = () => {
  return ['',]
}

/**
 * 
 * @param {Object} props 
 * @returns
 */
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
          options={getTypeOptions()}
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
        options={getTestFilesOptions()}
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