import React, { useCallback, useState, useMemo } from 'react'
import { Values } from 'SVConstants'
import { addToast } from 'SVActions/toasts'
import { useStyle } from '@keg-hub/re-theme'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { Select } from 'SVComponents/form/select'
import { useCloseModal } from 'SVHooks/useCloseModal'
import { setScreenById } from 'SVActions/screens/setScreenById'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useActiveScreenTab } from 'SVHooks/useActiveScreenTab'
import { useTestTypeOptions } from 'SVHooks/useTestTypeOptions'
import { setActiveModal } from 'SVActions/modals/setActiveModal'
import { setModalVisibility } from 'SVActions/modals/setModalVisibility'
import { mapObj, capitalize, wordCaps, noPropArr } from '@keg-hub/jsutils'
import { Modal, Button, ItemHeader, View, Text } from '@keg-hub/keg-components'
import { setActiveFileFromType } from 'SVActions/files/local/setActiveFileFromType'

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
  const activeFiles = useStoreItems(CATEGORIES.FEATURES) || {}

  return useMemo(() => {
    const options = [{ label: CREATE_NEW_FILE, value: CREATE_NEW_FILE }]

    mapObj(activeFiles, (__, activeFile) => (
      options.push({ label: activeFile.name, value: activeFile.location })
    ))

    return options
  }, [
    activeFiles,
    CREATE_NEW_FILE,
    MODAL_TYPES.CREATE_FILE
  ])

}

const useLoadTest = (location, fileModels, screenId) => useCallback(() => {
  if(location === CREATE_NEW_FILE)
    return setActiveModal(MODAL_TYPES.CREATE_FILE)

  if(!fileModels[location])
    return addToast({ type: `warn`, message: `Feature from '${location}' does not exist!` })

  const activeFile = fileModels[location]

  setScreenById(screenId)
  setActiveFileFromType(activeFile, screenId)
  setModalVisibility(false)

}, [
  fileModels,
  location,
  screenId,
  CREATE_NEW_FILE,
  MODAL_TYPES.CREATE_FILE
])

/**
 * setup the Test file selection UI
 * @param {Object} props 
 * @param {Object} props.styles
 * @param {Array} props.fileModels
 * @param {Function} props.setTestLocation
 * 
 * @returns {Component}
 */
const TestNameSelect = ({styles, fileModels, setTestLocation}) => {

  const onValueChange = useCallback((location) => {
    // Check if location is set to create a new file || check for the fileModel
    location === CREATE_NEW_FILE
      ? setTestLocation(CREATE_NEW_FILE)
      : fileModels[location] && setTestLocation(location)

  }, [fileModels, setTestLocation, CREATE_NEW_FILE])

  const options = useTestNamesOptions()

  return (
    <View style={styles?.main}>
      <Select
        styles={styles?.select}
        title={'Test File'}
        onValueChange={onValueChange}
        options={options}
        className={'modal-test-settings-field-test-file'}
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
  const { features } = useStoreItems([CATEGORIES.FEATURES])
  const fileModels = features || noPropArr

  const tabOptions = useTabOptions()
  const activeTab = useActiveScreenTab()
  const typeOptions = useTestTypeOptions()
  const [selectedTab, setSelectedTab] = useState(SCREENS.EDITOR)

  const activeFile = useActiveFile()
  const [testLocation, setTestLocation] = useState(CREATE_NEW_FILE)

  const onBackdropTouch = useCloseModal(activeTab?.id)
  const loadTests = useLoadTest(testLocation, fileModels, selectedTab)

  return (
    <Modal
      visible={visible}
      styles={builtStyles?.modal}
      onBackdropTouch={onBackdropTouch}
    >
      <ItemHeader
        title={title}
        styles={builtStyles?.itemHeader}
      />
      <View style={builtStyles?.form?.main}>
        <Select
          title={'Tab'}
          onValueChange={setSelectedTab}
          options={tabOptions}
          className={'modal-test-settings-field-tab'}
        />
        <Select
          title={'Test Type'}
          onValueChange={(props) => console.log(props)}
          options={typeOptions}
          className={'modal-test-settings-field-test-type'}
        />
        <TestNameSelect
          styles={builtStyles?.form?.select}
          fileModels={fileModels}
          setTestLocation={setTestLocation}
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
