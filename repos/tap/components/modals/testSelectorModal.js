import React, { useCallback, useState, useMemo } from 'react'
import { Modal, Button, ItemHeader, View, Text } from '@keg-hub/keg-components'
import { Select } from 'SVComponents/form/select'
import { useStyle } from '@keg-hub/re-theme'
import { setActiveFileFromType } from 'SVActions/files/local/setActiveFileFromType'
import { createFeatureFile } from 'SVActions/features/local/createFeatureFile'
import { setModalVisibility } from 'SVActions/modals'
import { Values } from 'SVConstants'
import { mapObj, capitalize, wordCaps, noPropArr } from '@keg-hub/jsutils'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useFeature } from 'SVHooks/useFeature'
import { devLog } from 'SVUtils'
import { setScreen } from 'SVActions/screens/setScreen'
import { useActiveScreenTab } from 'SVHooks/useActiveScreenTab'
import { useTestTypeOptions } from 'SVHooks/useTestTypeOptions'
import { setActiveModal } from 'SVActions/modals'
import { addToast } from 'SVActions/toasts'

const { CATEGORIES, SCREENS, MODAL_TYPES, CREATE_NEW_FILE } = Values

/**
 * Gets the options for the the tab screens
 * @returns {Array<{label:string, value:string}>}
 */
const useTabOptions = () => useMemo(() => {
  const { EMPTY , ...VISIBLE_SCREENS } = SCREENS
  return mapObj(VISIBLE_SCREENS, (__, val) => {
    return {
      label: capitalize(val),
      value: val
    }
  })
}, [SCREENS])

/**
 * Gets the options for the test file selector
 * @returns {Array<{label:string, value:string}>}
 */
const useTestNamesOptions = () => {
  const features = useStoreItems(CATEGORIES.FEATURES) || {}

  return useMemo(() => {
    const options = [{ label: CREATE_NEW_FILE, value: CREATE_NEW_FILE }]

    mapObj(features, (__, feature) => (
      options.push({ label: feature.name, value: feature.location })
    ))

    return options
  }, [
    features,
    CREATE_NEW_FILE,
    MODAL_TYPES.CREATE_FILE
  ])

}

const useLoadTest = (testName, feature, selectedTab) => useCallback(() => {
  if(testName === CREATE_NEW_FILE)
    return setActiveModal(MODAL_TYPES.CREATE_FILE)
  else if(!feature)
    return addToast({ type: `warn`, message: `Feature from '${location}' does not exist!` })

  setActiveFileFromType(feature, selectedTab)
  setScreen(selectedTab)
  setModalVisibility(false)

}, [
  testName,
  feature,
  selectedTab,
  CREATE_NEW_FILE,
  MODAL_TYPES.CREATE_FILE
])

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
    const feature = features[location]
    setTestName(feature?.name)
  }, [features, setTestName])

  const options = useTestNamesOptions()

  return (
    <View style={styles?.main}>
      <Select
        styles={styles?.select}
        title={'Test File'}
        onValueChange={onValueChange}
        options={options}
      />
      
    </View>
  )
}

/**
 * Modal Component to modify active settings of the Application
 * @param {Object} props
 * @returns
 */
export const TestSelectorModal = (props) => {
  const {
    title = 'Test Settings',
    visible=false
  } = props

  const builtStyles = useStyle(`modals.testSelector`)
  const { features=noPropArr } = useStoreItems([CATEGORIES.FEATURES])

  const activeTab = useActiveScreenTab()
  const [selectedTab, setSelectedtab] = useState(SCREENS.EDITOR)
  const [testName, setTestName] = useState(CREATE_NEW_FILE)

  const tabOptions = useTabOptions()
  const typeOptions = useTestTypeOptions()
  const { feature } = useFeature({ name: testName }) || {}
  const loadTests = useLoadTest(testName, feature, selectedTab)

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
          options={tabOptions}
        />
        <Select
          title={'Test Type'}
          onValueChange={(props) => console.log(props)}
          options={typeOptions}
        />
        <TestNameSelect
          styles={builtStyles?.form?.select}
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
