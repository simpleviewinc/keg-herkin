import React, { useCallback, useState, useMemo } from 'react'
import { devLog } from 'SVUtils'
import { Values } from 'SVConstants'
import { useTheme } from '@keg-hub/re-theme'
import { Input } from 'SVComponents/form/input'
import { Select } from 'SVComponents/form/select'
import { useCloseModal } from 'SVHooks/useCloseModal'
import { setModalVisibility } from 'SVActions/modals'
import { setScreen } from 'SVActions/screens/setScreen'
import { createFile } from 'SVActions/files/api/createFile'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useActiveScreenTab } from 'SVHooks/useActiveScreenTab'
import { useTestTypeOptions } from 'SVHooks/useTestTypeOptions'
import { formatFileName } from 'SVUtils/helpers/formatFileName'
import { mapObj, capitalize, wordCaps, noPropArr } from '@keg-hub/jsutils'
import { Modal, Button, ItemHeader, View, Text } from '@keg-hub/keg-components'

const { CATEGORIES, SCREENS, FILE_TYPES } = Values

/**
 * Modal component for creating new test files
 * @param {Object} props 
 * @returns
 */
export const CreateFileModal = props => {
  const {
    title = 'Create Test File',
    visible=false
  } = props

  const theme = useTheme()
  const builtStyles = theme.get(`modals.createFile`)
  
  const activeTab = useActiveScreenTab()
  const [testName, setTestName] = useState('')
  const [testType, setTestType] = useState(FILE_TYPES.FEATURE)

  const onNameChange = useCallback(event => {
    const fileName = formatFileName(event.target.value || '')

    setTestName(fileName)
  }, [formatFileName, testName, setTestName])

  const options = useTestTypeOptions()
  const onTypeChange = useCallback(type => setTestType(type), [setTestType])

  const onCreate = useCallback(() => {
    createFile(testType, testName)
    // setModalVisibility(false)
  }, [testType, testName])

  const onBackdropTouch = useCloseModal(activeTab?.id)

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
        <Input
          title={'Name'}
          onChange={onNameChange}
          value={testName}
        />
        <Select
          options={options}
          title={'Type'}
          onValueChange={onTypeChange}
          styles={builtStyles?.form?.select}
        />
        <Button
          themePath='button.contained.primary'
          styles={builtStyles?.form?.button}
          content={(
            <Text style={builtStyles?.form?.buttonText} >
              Create Test File
            </Text>
          )}
          onPress={onCreate}
        />
      </View>
    </Modal>
  )
}