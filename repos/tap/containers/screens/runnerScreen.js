import React from 'react'
import { EmptyScreen } from './emptyScreen'
import { useStyle } from '@keg-hub/re-theme'
import { capitalize } from '@keg-hub/jsutils'
import { View } from '@keg-hub/keg-components'
import { Runner } from 'SVComponents/runner/runner'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { CmdOutput } from 'SVComponents/cmdOutput/cmdOutput'
import { Values } from 'SVConstants'

const { SCREENS, FILE_TYPES } = Values

export const RunnerScreen = props => {
  const builtStyles = useStyle(`screens.runner`)
  const activeFile = useActiveFile(SCREENS.RUNNER)

  return !activeFile?.fileType
    ? (<EmptyScreen message={'No file selected!'} />)
    : (
        <View
          className={`runner-screen`}
          style={builtStyles.main}
        >
          {activeFile?.fileType && (
            <CmdOutput activeFile={activeFile} />
          )}
          <Runner
            parentMethods={null}
            activeFile={activeFile}
            title={capitalize(activeFile?.fileType || '')}
            tests={activeFile?.modified || activeFile?.content || ''}
          />
        </View>
      )
}
