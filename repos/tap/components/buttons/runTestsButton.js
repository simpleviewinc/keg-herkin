import { useCallback, useMemo } from 'react'
import { Values } from 'SVConstants'
import { useSockr } from '@ltipton/sockr'
import { useStyle } from '@keg-hub/re-theme'
import { noOpObj, get } from '@keg-hub/jsutils'
import { View, Button, Text } from 'SVComponents'
import { addToast } from 'SVActions/toasts/addToast'
import { runTests } from 'SVActions/runner/runTests'
import { saveFile } from 'SVActions/files/api/saveFile'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

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
const useRunAction = ({ activeFile, checkPending=true, runAllTests=false }) => {

  const { commands=noOpObj } = useSockr()
  const hasPending = usePendingCheck(checkPending, activeFile.location)
  const testCommand = useTestCommand(commands, activeFile.fileType)

  return useCallback, useMemo(async event => {

    if(!testCommand)
      return addToast({
        type: 'danger',
        message: `Can not run tests for this file. It is not a test file!`
      })

    // Save the file first if it has pending changes
    const canRun = hasPending
      ? await savePendingContent(content, activeFile)
      : true

    canRun
      ? runAllTests
        ? runTests(RUN_ALL_TESTS, testCommand, SCREENS.EDITOR)
        : runTests(activeFile, testCommand, SCREENS.EDITOR)
      : addToast({
          type: 'danger',
          message: `Can not run test on a file with pending changes!\n The file must be saved first!`,
        })
  }, [
    hasPending,
    runAllTests,
    activeFile,
    testCommand,
    SCREENS.EDITOR,
  ])
}


/**
 * RunTestsButton - Component for start a test run using sockr
 * @param {Object} props
 * @param {Object} props.activeFile - Current active fileModel
 * @param {boolean} props.checkPending - Check if the activeFile has pending changes
 * @param {boolean} props.runAllTests - Run all tests or just the ActiveFiles tests
 *
 */
export const RunTestsButton = props => {
  const { text="Run Tests", styles, ...args } = props
  const onRun = useRunAction(args)
  
  const builtStyles = useStyle(`button.runTests`, styles)

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
        <Text
          style={builtStyles.text}
          className={`run-tests-button-text`}
        >
          {text}
        </Text>
      </Button>
    </View>
  )

}