import React, { useCallback, useState } from 'react'
import { Modal, Button, ItemHeader, View, Text } from '@keg-hub/keg-components'
import { Select } from 'SVComponents/form/select'
import { useTheme } from '@keg-hub/re-theme'
import { setActiveFileFromType } from 'SVActions/files/local/setActiveFileFromType'
import { createFeatureFile } from 'SVActions/features/local/createFeatureFile'
import { setModalVisibility } from 'SVActions/modals'
import { Values } from 'SVConstants'
import { mapObj, capitalize, wordCaps, noPropArr } from '@keg-hub/jsutils'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useFeature } from 'SVHooks/useFeature'
import { devLog } from 'SVUtils'
import { setScreen } from 'SVActions/screens/setScreen'
import { useActiveScreenTab } from 'SVHooks'

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
const getTestNamesOptions = () => {
  const newFileOption = {
    label: wordCaps(Values.CREATE_NEW_FILE),
    value: Values.CREATE_NEW_FILE
  }
  const features = useStoreItems(CATEGORIES.FEATURES) || []
  const options = features.map((feature) => {
    return {
      label: feature.name,
      value: feature.location
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
  const { features=noPropArr } = useStoreItems([
    CATEGORIES.FEATURES,
  ])
  const activeTab = useActiveScreenTab()
  const [testName, setTestName] = useState(Values.CREATE_NEW_FILE)
  const [selectedTab, setSelectedtab] = useState(SCREENS.EDITOR)
  const { feature } = useFeature({ name: testName }) || {}

  const loadTests = useCallback(() => {
    testName === Values.CREATE_NEW_FILE
      ? createFeatureFile(selectedTab)
      : feature 
        ? setActiveFileFromType(feature, selectedTab) && setScreen(selectedTab)
        : devLog(`warn`, `Feature from '${location}' does not exist!`)

      setModalVisibility(false)
  }, 
  [
    testName, 
    feature,
    selectedTab
  ])

  return (
    <Modal
      visible={visible}
      styles={builtStyles?.modal}
      onBackdropTouch={() => activeTab?.id !== SCREENS.EMPTY && setModalVisibility(false)}
    >
      <ItemHeader
        title={title}
        styles={builtStyles?.itemHeader}
      />
      <View style={builtStyles?.form?.main}>
        <Select
          title={'Tab'}
          onValueChange={setSelectedtab}
          options={getTabOptions()}
        />
        <Select
          title={'Test Type'}
          onValueChange={(props) => console.log(props)}
          options={getTypeOptions()}
        />
        <TestNameSelect 
          styles={builtStyles?.form?.TestNameSelect}
          features={features}
          setTestName={setTestName}
        />
        <Button
          themePath='button.contained.primary'
          styles={builtStyles?.form?.button}
          content={(
            <Text style={builtStyles?.form?.buttonText} >
              Do It
            </Text>
          )}
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
 * @param {Function} props.setTestName
 * 
 * @returns {Component}
 */
const TestNameSelect = ({styles, features, setTestName}) => {

  const onValueChange = useCallback((location) => {
    // fetch the feature file content from redux
    const feature = features.find((feature) => feature.location === location)
    setTestName(feature?.name)
  }, [features, setTestName])

  return (
    <View style={styles?.main}>
      <Select
        styles={styles?.dropDown}
        title={'Test File'}
        onValueChange={onValueChange}
        options={getTestNamesOptions()}
      />
      
    </View>
  )
}