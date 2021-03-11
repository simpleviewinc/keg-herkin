import React, { useCallback } from 'react'
import { Values } from 'SVConstants'
import { Save } from 'SVAssets/icons'
import { useStyle } from '@keg-hub/re-theme'
import { noOpObj, get, noOp } from '@keg-hub/jsutils'
import { View, Button, Text } from 'SVComponents'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { saveFile } from 'SVActions/files/api/saveFile'

const { SCREENS, CATEGORIES } = Values

/**
 * Hook to save the activeFile by calling the saveFile action
 * @param {Object} props
 *
 * @returns {function} - Callback to call when running tests on the active file
 */
const useSaveAction = props => {
  const {
    activeFile:propsActiveFile,
    onSave=noOp,
  } = props

  const { activeFile } = useActiveFile()
  const testFile = propsActiveFile || activeFile || noOpObj

  return useCallback(async event => {
    // Call the passed in onSave callback
    // If it returns false, then don't do anything else in this callback
    const shouldContinue = await onSave(event, testFile)

    shouldContinue && saveFile(testFile)
  }, [onSave, testFile])
}


/**
 * SaveFileButton - Component saving a file
 * @param {Object} props
 * @param {Object} props.activeFile - Current active fileModel
 * @param {Object} props.onSave - Callback called when the button is clicked
 *
 */
export const SaveFileButton = props => {
  const { children, disabled, text="Save File", styles, ...args } = props

  const onSave = useSaveAction(args)
  const builtStyles = useStyle(`buttons.saveFile`, styles)

  return (
    <View
      style={builtStyles.main}
      className={`save-file-button.main`}
    >
      <Button
        type='primary'
        disabled={disabled}
        onClick={onSave}
        styles={builtStyles.button}
        className={`save-file-button`}
      >
        <Save
          style={builtStyles.icon}
          className={`save-file-button-icon`}
        />
        <Text
          style={builtStyles.text}
          className={`save-file-button-text`}
        >
          {children || text}
        </Text>
      </Button>
    </View>
  )

}
