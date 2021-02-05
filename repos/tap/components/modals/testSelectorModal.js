import React, { useCallback, useState } from 'react'
import { Modal, Button, ItemHeader, View} from '@keg-hub/keg-components'
import { Select } from 'SVComponents/form/select'
import { useTheme } from '@keg-hub/re-theme'
import { createNewFeature } from 'SVActions/features'
import { upsertActiveRunnerTest }  from 'SVActions/runner/upsertActiveRunnerTest'
import { setModalVisibility } from 'SVActions/modals'
import { Values } from 'SVConstants'
import { mapObj, capitalize, wordCaps } from '@keg-hub/jsutils'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { devLog } from 'SVUtils'

const { TEST_TYPE, CATEGORIES, SCREENS } = Values

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
 * Gets the options for the the tab screens
 * @returns {Array<{label:string, value:string}>}
 */
const getTabOptions = () => {
  const { EMPTY , ...VISIBLE_SREENS } = SCREENS
  return mapObj(VISIBLE_SREENS, (__, val) => {
    return {
      label: capitalize(val),
      value: val
    }
  })
}

/**
 * Gets the options for the test file selector
 * @returns {Array<{label:string, value:string}>}
 */
const getTestFilesOptions = () => {
  const newFileOption = {
    label: wordCaps(Values.CREATE_NEW_FILE),
    value: Values.CREATE_NEW_FILE
  }
  const features = useStoreItems(CATEGORIES.FEATURES) || []
  const options = features.map((feature) => {
    return {
      label: feature?.feature,
      value: feature?.feature
    }
  })
  return [newFileOption, ...options]
}

/**
 * 
 * @param {Object} props 
 * @returns
 */
export const TestSelectorModal = (props) => {
  const {
    title = 'Test Settings',
    visible=false
  } = props

  const theme = useTheme()
  const builtStyles = theme.get(`modals.testSelectorModal`)
  const features = useStoreItems(CATEGORIES.FEATURES) || []

  const [testFile, setTestFile] = useState(Values.CREATE_NEW_FILE)
  const loadTests = useCallback(() => {
    testFile === Values.CREATE_NEW_FILE
      ? createNewFeature()
      : loadFeature()

      setModalVisibility(false)
  }, [Values.CREATE_NEW_FILE])

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
          title={'Select initial tab:'}
          onValueChange={(props) => console.log(props)}
          options={getTabOptions()}
        />
        <Select
          title={'Select test type:'}
          onValueChange={(props) => console.log(props)}
          options={getTypeOptions()}
        />
        <TestFileSelect 
          styles={builtStyles?.form?.testFileSelect}
          features={features}
          setTestFile={setTestFile}
        />
        <Button
          themePath='button.contained.primary'
          styles={builtStyles?.form?.button}
          content={'Start'}
          onPress={loadTests}
        />
      </View>
    </Modal>
  )
}

/**
 * setup the Test file selection UI
 * @param {Object} props 
 * @param {Object} props.styles
 * @param {Array} props.features
 * @param {Function} props.setTestFile
 * 
 * @returns {Component}
 */
const TestFileSelect = ({styles, features, setTestFile}) => {

  const onValueChange = useCallback((val) => {
    // fetch the feature file content from redux
    const feature = features.find((feature) => feature.feature === val)
    feature 
      ? upsertActiveRunnerTest(feature?.text)
      : devLog(`warn`, `Feature '${val}' does not exist!`)

    setTestFile(val)
  }, [features, setTestFile])

  return (
    <View style={styles?.main}>
      <Select
        styles={styles?.dropDown}
        title={'Select test file:'}
        onValueChange={onValueChange}
        options={getTestFilesOptions()}
      />
      
    </View>
  )
}