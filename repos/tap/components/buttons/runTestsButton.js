import React, { useCallback, useMemo } from 'react'
import { Values } from 'SVConstants'
import { Rabbit } from 'SVAssets/icons'
import { useSockr } from '@ltipton/sockr'
import { useStyle } from '@keg-hub/re-theme'
import { View, Button, Text } from 'SVComponents'
import { addToast } from 'SVActions/toasts/addToast'
import { runTests } from 'SVActions/runner/runTests'
import { noOpObj, get, noOp } from '@keg-hub/jsutils'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useIconProps } from 'SVHooks/useIconProps'
import { savePendingContent } from 'SVActions/files/local/savePendingContent'

const { SCREENS, CATEGORIES, RUN_ALL_TESTS } = Values

/**
 * Hook to memoize if the activeFile has pending content
 * @param {boolean} checkPending - If pending content should be checked
 * @param {string} location - Location property of the activeFile
 *
 * @returns {boolean} - If the activeFile has pending content
 */
const usePendingCheck = (checkPending, location) => {
  const { pendingFiles=noOpObj } = useStoreItems([CATEGORIES.PENDING_FILES])
  const pendingContent = pendingFiles[location]

  return useMemo(
    () => checkPending && Boolean(pendingContent),
    [checkPending, pendingContent]
  )
}

/**
 * Hook to memoize the command to run through sockr
 * @param {Object} commands - Commands loaded from the backend
 * @param {string} cmdName - Name of the command to get
 *
 * @returns {Object} - Found command object from the cmdName prop
 */
const useTestCommand = (commands, cmdName) => useMemo(
  () => get(commands, ['tests', cmdName ]),
  [commands, cmdName]
)

/**
 * Hook to run the tests of the active file by calling the runTests action
 * @param {Object} props
 *
 * @returns {function} - Callback to call when running tests on the active file
 */
const useRunAction = props => {
  const {
    activeFile:propsActiveFile,
    checkPending=true,
    runAllTests=false,
    onRun=noOp,
  } = props

  const activeFile = useActiveFile()
  const testFile = propsActiveFile || activeFile || noOpObj

  const { commands=noOpObj } = useSockr()
  const hasPending = usePendingCheck(checkPending, testFile.location)
  const testCommand = useTestCommand(commands, testFile.fileType)

  return useCallback(async event => {

    // Call the passed in onRun callback
    // If it returns false, then don't do anything else in this callback
    const shouldContinue = await onRun(
      event,
      testFile,
      testCommand,
      hasPending,
      runAllTests
    )

    if(shouldContinue === false) return

    if(!testCommand)
      return addToast({
        type: 'danger',
        message: `Can not run tests for this file. It is not a test file!`
      })

    // Save the file first if it has pending changes
    const canRun = hasPending
      ? await savePendingContent(content, testFile, false)
      : true

    canRun
      ? runAllTests
        ? runTests(RUN_ALL_TESTS, testCommand, SCREENS.EDITOR)
        : runTests(testFile, testCommand, SCREENS.EDITOR)
      : addToast({
          type: 'danger',
          message: `Can not run test on a file with pending changes!\n The file must be saved first!`,
        })
  }, [
    onRun,
    hasPending,
    runAllTests,
    testFile,
    testCommand,
    SCREENS.EDITOR,
  ])
}


/**
 * RunTestsButton - Component for start a test run using sockr
 * @param {Object} props
 * @param {Object} props.activeFile - Current active fileModel
 * @param {Object} props.onRun - Callback called when the button is clicked
 * @param {boolean} props.checkPending - Check if the activeFile has pending changes
 * @param {boolean} props.runAllTests - Run all tests or just the ActiveFiles tests
 *
 */
export const RunTestsButton = props => {
  const { children, text='Run Tests', styles, ...args } = props
  const onRun = useRunAction(args)
  
  const builtStyles = useStyle(`buttons.runTests`, styles)
  const iconProps = useIconProps(props, builtStyles.icon)

  return (
    <View
      style={builtStyles.main}
      className={`run-tests-button.main`}
    >
      <Button
        type='secondary'
        onClick={onRun}
        styles={builtStyles.button}
        className={`run-tests-button`}
      >
        <Rabbit
          {...iconProps}
          className={`run-tests-button-icon`}
        />
        <Text
          style={builtStyles.text}
          className={`run-tests-button-text`}
        >
          {children || text}
        </Text>
      </Button>
    </View>
  )

}