import React from 'react'
import { EmptyScreen } from './emptyScreen'
import { useStyle } from '@keg-hub/re-theme'
import { capitalize } from '@keg-hub/jsutils'
import { View } from '@keg-hub/keg-components'
import { Runner } from 'SVComponents/runner/runner'
import { useActiveFile } from 'SVHooks/useActiveFile'
import { CmdOutput } from 'SVComponents/cmdOutput/cmdOutput'


export const RunnerScreen = props => {
  const builtStyles = useStyle(`screens.runner`)
  const activeFile = useActiveFile(props.id)

  return !activeFile?.fileType
    ? (<EmptyScreen message={'No file selected!'} />)
    : (
        <View
          className={`runner-screen`}
          style={builtStyles.main}
        >
          <CmdOutput activeFile={activeFile} />
          <Runner
            activeFile={activeFile}
            tests={activeFile?.modified || activeFile?.content || ''}
            title={capitalize(activeFile?.fileType || '')}
            parentMethods={null}
          />
        </View>
      )
}
