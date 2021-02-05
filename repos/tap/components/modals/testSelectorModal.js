import React, { useCallback } from 'react'
import { Modal, Button, ItemHeader, View, Text } from '@keg-hub/keg-components'
import { Select } from 'SVComponents/form/select'
import { useTheme } from '@keg-hub/re-theme'
import { createNewFeature } from 'SVActions/features'
import { Values } from 'SVConstants'
import { mapObj, capitalize } from '@keg-hub/jsutils'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { upsertActiveRunnerTest }  from 'SVActions/runner/upsertActiveRunnerTest'

const { TEST_TYPE, CATEGORIES } = Values

/**
 * Goes through the TEST_TYPE constants and creates the options array to pass onto Select Component
 * @returns {Array<{label:string, value:any}>}
 */
const getTypeOptions = () => {
  return mapObj(TEST_TYPE, (__, val) => {
    return {
      label: capitalize(val),
      value: val
    }
  })
}

/**
 * Gets the options for the test file selector
 * adds an empty value as the first index
 * @returns {Array<{label:string, value:string}>}
 */
const getTestFilesOptions = () => {
  const features = useStoreItems(CATEGORIES.FEATURES) || []
  const options = features.map((feature) => {
    return {
      label: feature?.feature,
      value: feature?.feature
    }
  })
  return [null, ...options]
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
  const features = useStoreItems(CATEGORIES.FEATURES) || []
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
        <Select
          title={'Select test type:'}
          onValueChange={(props) => console.log(props)}
          options={getTypeOptions()}
        />
        <TestFileSelect 
          styles={builtStyles?.form?.testFileSelect}
          features={features}
        />
      </View>
    </Modal>
  )
}

/**
 * 
 */
const TestFileSelect = ({styles, features}) => {

  return (
    <View style={styles?.main}>
      <Select
        styles={styles?.dropDown}
        title={'Select test file:'}
        onValueChange={(val) => {
          const feature = features.find((feature) => feature.feature === val)
          console.log(feature, 'ye')
          upsertActiveRunnerTest(feature?.text)
        }}
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